# # consumer.py

# import json
# from kafka import KafkaConsumer

# def kafka_transaction_stream(topic='transactions_topic', bootstrap_servers='localhost:9092', group_id='transaction-consumer-group'):
#     """
#     Generator that yields transaction data (as dicts) from the Kafka topic.
#     This can be imported and used directly in a model script.
#     """
#     try:
#         consumer = KafkaConsumer(
#             topic,
#             bootstrap_servers=bootstrap_servers,
#             auto_offset_reset='earliest',
#             enable_auto_commit=True,
#             group_id=group_id,
#             value_deserializer=lambda x: json.loads(x.decode('utf-8'))
#         )

#         print("✅ Kafka consumer connected. Waiting for transactions...")
#         for message in consumer:
#             yield message.value  # <-- Return the raw transaction object (dict)

#     except Exception as e:
#         print(f"❌ Kafka consumer failed: {e}")
#         raise

# ----------------------------------------------------------------------------------------------------------------

# main.py

import json
import joblib
import numpy as np
from kafka import KafkaConsumer

def kafka_transaction_stream(topic='transactions_topic', bootstrap_servers='localhost:9092', group_id='transaction-consumer-group'):
    """
    Generator that yields transaction data (as dicts) from the Kafka topic.
    This can be imported and used directly in a model script.
    """
    try:
        consumer = KafkaConsumer(
            topic,
            bootstrap_servers=bootstrap_servers,
            auto_offset_reset='earliest',
            enable_auto_commit=True,
            group_id=group_id,
            value_deserializer=lambda x: json.loads(x.decode('utf-8'))
        )
        print("✅ Kafka consumer connected. Waiting for transactions...")
        for message in consumer:
            yield message.value
    except Exception as e:
        print(f"❌ Kafka consumer failed: {e}")
        # The generator must raise the exception to be handled by the caller
        raise

def process_and_predict():
    """
    Loads the ML model, consumes the Kafka stream, and makes predictions.
    """
    # --- 1. Load the ML Model and Scaler ---
    try:
        print("🔄 Loading ML model and scaler...")
        scaler = joblib.load('./kafka/standard_scaler.joblib')
        model = joblib.load('./kafka/fraud_detection_model.joblib')
        print("✅ Models loaded successfully.")
    except FileNotFoundError as e:
        print(f"❌ Error: One of the model files was not found. Please ensure both files are in the script's directory. Details: {e}")
        return

    # --- 2. Use the Kafka stream generator to get data ---
    try:
        # Pass the generator parameters here if needed
        transaction_stream = kafka_transaction_stream()
        
        # --- 3. Process each transaction from the stream ---
        for data_record in transaction_stream:
            try:
                # Handle missing step field gracefully
                step = data_record.get('step', 1)  # Default to 1 if step is missing
                
                # Calculate derived features that the model expects
                orig_balance_error = data_record['newbalanceOrig'] + data_record['amount'] - data_record['oldbalanceOrg']
                dest_balance_error = data_record['newbalanceDest'] - data_record['amount'] - data_record['oldbalanceDest']
                is_dormant_active = 1 if (data_record['oldbalanceOrg'] == 0 and data_record['newbalanceOrig'] != 0) else 0
                
                # Assuming the features are in a consistent order (matching the training data)
                features = [
                    step,  # Use the step value (defaults to 1 if missing)
                    data_record['amount'],
                    data_record['oldbalanceOrg'],
                    data_record['newbalanceOrig'],
                    data_record['oldbalanceDest'],
                    data_record['newbalanceDest'],
                    orig_balance_error,
                    dest_balance_error,
                    is_dormant_active,
                    1 if data_record['type'] == 'CASH_OUT' else 0,
                    1 if data_record['type'] == 'DEBIT' else 0,
                    1 if data_record['type'] == 'PAYMENT' else 0,
                    1 if data_record['type'] == 'TRANSFER' else 0,
                ]
            
                # Reshape for the model (1 sample, n features)
                features_np = np.array(features).reshape(1, -1)
                
                # Apply the pre-trained scaler
                scaled_features = scaler.transform(features_np)
                
                # Make the prediction
                prediction = model.predict(scaled_features)
                print(prediction)
                
                if prediction[0] == 1:
                    print(f"🚨 FRAUD DETECTED! Record: {data_record}")
                else:
                    print(f"✅ No fraud detected. Record: {data_record}")
                    
            except KeyError as e:
                print(f"❌ Missing required field in transaction data: {e}")
                print(f"Available fields: {list(data_record.keys())}")
            except Exception as e:
                print(f"❌ Error processing transaction: {e}")
                print(f"Transaction data: {data_record}")
    
    except Exception as e:
        print(f"❌ An error occurred during stream processing: {e}")

if __name__ == "__main__":
    process_and_predict()