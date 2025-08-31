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

# import json
# import joblib
# import numpy as np
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
#             yield message.value
#     except Exception as e:
#         print(f"❌ Kafka consumer failed: {e}")
#         # The generator must raise the exception to be handled by the caller
#         raise

# def process_and_predict():
#     """
#     Loads the ML model, consumes the Kafka stream, and makes predictions.
#     """
#     # --- 1. Load the ML Model and Scaler ---
#     try:
#         print("🔄 Loading ML model and scaler...")
#         scaler = joblib.load('./kafka/standard_scaler.joblib')
#         model = joblib.load('./kafka/fraud_detection_model.joblib')
#         print("✅ Models loaded successfully.")
#     except FileNotFoundError as e:
#         print(f"❌ Error: One of the model files was not found. Please ensure both files are in the script's directory. Details: {e}")
#         return

#     # --- 2. Use the Kafka stream generator to get data ---
#     try:
#         # Pass the generator parameters here if needed
#         transaction_stream = kafka_transaction_stream()
        
#         # --- 3. Process each transaction from the stream ---
#         for data_record in transaction_stream:
#             try:
#                 # Handle missing step field gracefully
#                 step = data_record.get('step', 1)  # Default to 1 if step is missing
                
#                 # Calculate derived features that the model expects
#                 orig_balance_error = data_record['newbalanceOrig'] + data_record['amount'] - data_record['oldbalanceOrg']
#                 dest_balance_error = data_record['newbalanceDest'] - data_record['amount'] - data_record['oldbalanceDest']
#                 is_dormant_active = 1 if (data_record['oldbalanceOrg'] == 0 and data_record['newbalanceOrig'] != 0) else 0
                
#                 # Assuming the features are in a consistent order (matching the training data)
#                 features = [
#                     step,  # Use the step value (defaults to 1 if missing)
#                     data_record['amount'],
#                     data_record['oldbalanceOrg'],
#                     data_record['newbalanceOrig'],
#                     data_record['oldbalanceDest'],
#                     data_record['newbalanceDest'],
#                     orig_balance_error,
#                     dest_balance_error,
#                     is_dormant_active,
#                     1 if data_record['type'] == 'CASH_OUT' else 0,
#                     1 if data_record['type'] == 'DEBIT' else 0,
#                     1 if data_record['type'] == 'PAYMENT' else 0,
#                     1 if data_record['type'] == 'TRANSFER' else 0,
#                 ]
            
#                 # Reshape for the model (1 sample, n features)
#                 features_np = np.array(features).reshape(1, -1)
                
#                 # Apply the pre-trained scaler
#                 scaled_features = scaler.transform(features_np)
                
#                 # Make the prediction
#                 prediction = model.predict(scaled_features)
                
#                 if prediction[0] == 1:
#                     print(f"🚨 FRAUD DETECTED! Record: {data_record}")
#                 else:
#                     print(f"✅ No fraud detected. Record: {data_record}")
                    
#             except KeyError as e:
#                 print(f"❌ Missing required field in transaction data: {e}")
#                 print(f"Available fields: {list(data_record.keys())}")
#             except Exception as e:
#                 print(f"❌ Error processing transaction: {e}")
#                 print(f"Transaction data: {data_record}")
    
#     except Exception as e:
#         print(f"❌ An error occurred during stream processing: {e}")

# if __name__ == "__main__":
#     process_and_predict()

# ---------------------------------*********-----------------------------------------------------------------------------------------






# from kafka import KafkaConsumer
# import json
# import joblib

# # Load the ML model and scaler
# model = joblib.load('./Cheetah_model/Fraud_Detection_Cheetah.joblib')
# scaler = joblib.load('./Cheetah_model/Data_Scaler_Cheetah.joblib')

# # Define the function to process each transaction
# def process_transaction(transaction_data):
#     # Convert 'type' to numeric features
#     type_mapping = {'CASH_OUT': [1,0,0,0],
#                     'DEBIT':    [0,1,0,0],
#                     'PAYMENT':  [0,0,1,0],
#                     'TRANSFER': [0,0,0,1]}
    
#     type_features = type_mapping.get(transaction_data['type'], [0,0,0,0])
    
#     # Build the feature vector in the order your model expects
#     features = [
#         transaction_data['amount'],
#         transaction_data['oldbalanceOrg'],
#         transaction_data['newbalanceOrig'],
#         transaction_data['oldbalanceDest'],
#         transaction_data['newbalanceDest']
#     ] + type_features

#     # Scale numeric features (excluding one-hot encoded type if scaler was trained on numeric only)
#     scaled_features = scaler.transform([features])  # Make sure features order matches training
    
#     # Predict
#     prediction = model.predict(scaled_features)
#     return prediction[0]

# # Kafka Consumer configuration
# consumer = KafkaConsumer(
#     'transactions_topic',
#     bootstrap_servers=['localhost:9092'],
#     auto_offset_reset='earliest',
#     enable_auto_commit=True,
#     group_id='my-group',
#     value_deserializer=lambda x: json.loads(x.decode('utf-8'))
# )
# # Consume messages
# for message in consumer:
#     transaction = message.value
#     print(f"Received transaction: {transaction}")

#     # Process the transaction using the ML model
#     is_fraud = process_transaction(transaction)

#     if is_fraud == 1:
#         print("Fraudulent transaction detected!")
#         # Add your logic for handling fraudulent transactions here
#     else:
#         print("Legitimate transaction.")



# ---------------==============-----------------------------------------------------------============================

# consumer.py
# import json
# from kafka import KafkaConsumer
# import joblib
# import numpy as np

# # -----------------------------
# # 1️⃣ Load your ML model and scaler
# # -----------------------------
# model = joblib.load('./Cheetah_model/Fraud_Detection_Cheetah.joblib')
# scaler = joblib.load('./Cheetah_model/Data_Scaler_Cheetah.joblib')

# # -----------------------------
# # 2️⃣ Function to process a transaction
# # -----------------------------
# def process_transaction(transaction_data):
#     """
#     Convert raw transaction dict into model features, scale them, and predict fraud.
#     """
#     # Derived features
#     step = transaction_data.get('step', 1)
#     orig_balance_error = transaction_data['newbalanceOrig'] + transaction_data['amount'] - transaction_data['oldbalanceOrg']
#     dest_balance_error = transaction_data['newbalanceDest'] - transaction_data['amount'] - transaction_data['oldbalanceDest']
#     is_dormant_active = 1 if (transaction_data['oldbalanceOrg'] == 0 and transaction_data['newbalanceOrig'] != 0) else 0

#     # One-hot encode transaction type
#     type_mapping = {
#         'CASH_OUT': [1, 0, 0, 0],
#         'DEBIT':    [0, 1, 0, 0],
#         'PAYMENT':  [0, 0, 1, 0],
#         'TRANSFER': [0, 0, 0, 1]
#     }
#     type_features = type_mapping.get(transaction_data['type'], [0, 0, 0, 0])

#     # Feature vector (must match the order used in training)
#     features = [
#         step,
#         transaction_data['amount'],
#         transaction_data['oldbalanceOrg'],
#         transaction_data['newbalanceOrig'],
#         transaction_data['oldbalanceDest'],
#         transaction_data['newbalanceDest'],
#         orig_balance_error,
#         dest_balance_error,
#         is_dormant_active
#     ] + type_features  # total 13 features

#     # Scale features
#     scaled_features = scaler.transform([features])

#     # Predict fraud (0 = legit, 1 = fraud)
#     prediction = model.predict(scaled_features)
#     return prediction[0]

# # -----------------------------
# # 3️⃣ Kafka Consumer setup
# # -----------------------------
# consumer = KafkaConsumer(
#     'transactions_topic',  # Replace with your Kafka topic name
#     bootstrap_servers=['localhost:9092'],  # Replace if your broker is different
#     auto_offset_reset='earliest',
#     enable_auto_commit=True,
#     group_id='fraud-consumer-group',
#     value_deserializer=lambda x: json.loads(x.decode('utf-8'))
# )

# print("✅ Kafka consumer connected. Listening for transactions...")

# # -----------------------------
# # 4️⃣ Consume messages and process
# # -----------------------------
# for message in consumer:
#     transaction = message.value
#     print(f"Received transaction: {transaction}")

#     try:
#         is_fraud = process_transaction(transaction)
#         if is_fraud == 1:
#             print("🚨 FRAUDULENT TRANSACTION DETECTED!")
#         else:
#             print("✅ Legitimate transaction.")
#     except KeyError as e:
#         print(f"❌ Missing expected field: {e}. Transaction skipped.")
#     except Exception as e:
#         print(f"❌ Error processing transaction: {e}. Transaction skipped.")

# -----------------------------

# # consumer.py
# import json
# from kafka import KafkaConsumer
# import joblib
# import numpy as np

# # -----------------------------
# # 1️⃣ Load your ML model and scaler
# # -----------------------------
# model = joblib.load('./NEW_ML_MODEL/Fraud_detection_cybershield.joblib')
# scaler = joblib.load('./NEW_ML_MODEL/scaler_cybershield.joblib')

# # -----------------------------
# # 2️⃣ Function to process a transaction
# # -----------------------------
# def process_transaction(transaction_data):
#     """
#     Convert raw transaction dict into model features, scale them, and predict fraud.
#     """
#     # Derived features
#     step = transaction_data.get('step', 1)
#     orig_balance_error = transaction_data['newbalanceOrig'] + transaction_data['amount'] - transaction_data['oldbalanceOrg']
#     dest_balance_error = transaction_data['newbalanceDest'] - transaction_data['amount'] - transaction_data['oldbalanceDest']
#     is_dormant_active = 1 if (transaction_data['oldbalanceOrg'] == 0 and transaction_data['newbalanceOrig'] != 0) else 0

#     # One-hot encode transaction type
#     type_mapping = {
#         'CASH_OUT': [1, 0, 0, 0],
#         'DEBIT':    [0, 1, 0, 0],
#         'PAYMENT':  [0, 0, 1, 0],
#         'TRANSFER': [0, 0, 0, 1]
#     }
#     type_features = type_mapping.get(transaction_data['type'], [0, 0, 0, 0])

#     # Feature vector (must match the order used in training)
#     features = [
#         step,
#         transaction_data['amount'],
#         transaction_data['oldbalanceOrg'],
#         transaction_data['newbalanceOrig'],
#         transaction_data['oldbalanceDest'],
#         transaction_data['newbalanceDest'],
#         orig_balance_error,
#         dest_balance_error,
#         is_dormant_active
#     ] + type_features  # total 13 features

#     # Scale features
#     scaled_features = scaler.transform([features])

#     # Predict fraud (0 = legit, 1 = fraud)
#     prediction = model.predict(scaled_features)
#     return prediction[0]

# # -----------------------------
# # 3️⃣ Main execution
# # -----------------------------
# if __name__ == "__main__":
#     # Choose mode: "kafka" or "test"
#     MODE = "test"  # change to "kafka" to use Kafka

#     if MODE == "kafka":
#         consumer = KafkaConsumer(
#             'transactions_topic',
#             bootstrap_servers=['localhost:9092'],
#             auto_offset_reset='earliest',
#             enable_auto_commit=True,
#             group_id='fraud-consumer-group',
#             value_deserializer=lambda x: json.loads(x.decode('utf-8'))
#         )
#         print("✅ Kafka consumer connected. Listening for transactions...")

#         for message in consumer:
#             transaction = message.value
#             print(f"Received transaction: {transaction}")

#             try:
#                 is_fraud = process_transaction(transaction)
#                 if is_fraud == 1:
#                     print("🚨 FRAUDULENT TRANSACTION DETECTED!")
#                 else:
#                     print("✅ Legitimate transaction.")
#             except Exception as e:
#                 print(f"❌ Error processing transaction: {e}. Transaction skipped.")

#     elif MODE == "test":
#         test_transaction = {
#     "step": 407,
#     "type": "CASH_OUT",
#     "amount": 243523454534574.39,
#     "nameOrig": "C123456789",
#     "oldbalanceOrg": 2085345274.39,
#     "newbalanceOrig": 0.0,  # Entire balance withdrawn → suspicious
#     "nameDest": "C987654321",
#     "oldbalanceDest": 3362434534524534535345607.02,
#     "newbalanceDest": 3362345345681.41  # Large mismatch → extreme anomaly
# }

#         print("✅ Running test transaction:")
#         print(json.dumps(test_transaction, indent=4))

#         try:
#             is_fraud = process_transaction(test_transaction)
#             if is_fraud == 1:
#                 print("🚨 FRAUDULENT TRANSACTION DETECTED!")
#             else:
#                 print("✅ Legitimate transaction.")
#         except Exception as e:
#             print(f"❌ Error during test: {e}")


# ---------------===-----------------

# # consumer.py
# import json
# from kafka import KafkaConsumer
# import joblib
# import numpy as np
# import pandas as pd

# # -----------------------------
# # 1️⃣ Load your ML model and scaler
# # -----------------------------
# model = joblib.load('./NEW_ML_MODEL/Fraud_detection_cybershield.joblib')
# scaler = joblib.load('./NEW_ML_MODEL/scaler_cybershield.joblib')

# # -----------------------------
# # 2️⃣ Function to process a transaction
# # -----------------------------


# def process_transaction(transaction_data):
#     """
#     Convert raw transaction dict into model features, scale them, and predict fraud.
#     """
#     # Derived features
#     step = transaction_data.get('step', 1)
#     balance_change = transaction_data['newbalanceOrig'] - transaction_data['oldbalanceOrg']
#     relative_change = balance_change / (transaction_data['oldbalanceOrg'] + 1e-9)
#     orig_balance_error = transaction_data['newbalanceOrig'] + transaction_data['amount'] - transaction_data['oldbalanceOrg']
#     dest_balance_error = transaction_data['newbalanceDest'] - transaction_data['amount'] - transaction_data['oldbalanceDest']
#     extreme_mismatch = int(abs(balance_change) > 1e6 or abs(dest_balance_error) > 1e6)
#     is_dormant_active = 1 if (transaction_data['oldbalanceOrg'] == 0 and transaction_data['newbalanceOrig'] != 0) else 0
#     extreme_anomaly_flag = 1 if extreme_mismatch or abs(orig_balance_error) > 1e6 else 0

#     # One-hot encode transaction type
#     type_mapping = {
#         'CASH_OUT': [1, 0, 0, 0],
#         'DEBIT':    [0, 1, 0, 0],
#         'PAYMENT':  [0, 0, 1, 0],
#         'TRANSFER': [0, 0, 0, 1]
#     }
#     type_features = type_mapping.get(transaction_data['type'], [0, 0, 0, 0])

#     # Feature vector in exact order expected by scaler
#     features = [
#         step,
#         transaction_data['amount'],
#         transaction_data['oldbalanceOrg'],
#         transaction_data['newbalanceOrig'],
#         transaction_data['oldbalanceDest'],
#         transaction_data['newbalanceDest'],
#         balance_change,
#         relative_change,
#         orig_balance_error,
#         dest_balance_error,
#         extreme_mismatch,
#         is_dormant_active,
#         extreme_anomaly_flag,
#         type_features[0],  # type_CASH_OUT
#         type_features[1],  # type_DEBIT
#         type_features[2],  # type_PAYMENT
#         type_features[3]   # type_TRANSFER
#     ]

#     # Column order must match training exactly
#     feature_columns = [
#         'step', 'amount', 'oldbalanceOrg', 'newbalanceOrig',
#         'oldbalanceDest', 'newbalanceDest', 'balance_change', 'relative_change',
#         'orig_balance_error', 'dest_balance_error', 'extreme_mismatch',
#         'is_dormant_active', 'extreme_anomaly_flag',
#         'type_CASH_OUT', 'type_DEBIT', 'type_PAYMENT', 'type_TRANSFER'
#     ]

#     df_features = pd.DataFrame([features], columns=feature_columns)

#     # Scale features
#     scaled_features = scaler.transform(df_features)

#     # Predict fraud
#     prediction = model.predict(scaled_features)
#     return prediction[0]

# # -----------------------------
# # 3️⃣ Main execution
# # -----------------------------
# if __name__ == "__main__":
#     # Choose mode: "kafka" or "test"
#     MODE = "kafka"  # change to "kafka" to use Kafka

#     if MODE == "kafka":
#         consumer = KafkaConsumer(
#             'transactions_topic',
#             bootstrap_servers=['localhost:9092'],
#             auto_offset_reset='earliest',
#             enable_auto_commit=True,
#             group_id='fraud-consumer-group',
#             value_deserializer=lambda x: json.loads(x.decode('utf-8'))
#         )
#         print("✅ Kafka consumer connected. Listening for transactions...")

#         for message in consumer:
#             transaction = message.value
#             print(f"Received transaction: {transaction}")

#             try:
#                 is_fraud = process_transaction(transaction)
#                 if is_fraud == 1:
#                     print("🚨 FRAUDULENT TRANSACTION DETECTED!")
#                 else:
#                     print("✅ Legitimate transaction.")
#             except Exception as e:
#                 print(f"❌ Error processing transaction: {e}. Transaction skipped.")

#     elif MODE == "test":
#         test_transaction = {
#             "step": 407,
#             "type": "CASH_OUT",
#             "amount": 243523454534574.39,
#             "nameOrig": "C123456789",
#             "oldbalanceOrg": 2085345274.39,
#             "newbalanceOrig": 0.0,
#             "nameDest": "C987654321",
#             "oldbalanceDest": 3362434534524534535345607.02,
#             "newbalanceDest": 3362345345681.41
#         }

#         print("✅ Running test transaction:")
#         print(json.dumps(test_transaction, indent=4))

#         try:
#             is_fraud = process_transaction(test_transaction)
#             if is_fraud == 1:
#                 print("🚨 FRAUDULENT TRANSACTION DETECTED!")
#             else:
#                 print("✅ Legitimate transaction.")
#         except Exception as e:
#             print(f"❌ Error during test: {e}")

# -------------------------------------------------------------------***************-------------------------------------------------------------------------------------


# consumer.py
# import json
# from kafka import KafkaConsumer
# import joblib
# import numpy as np

# # -----------------------------
# # 1️⃣ Load your ML model and scaler
# # -----------------------------
# model = joblib.load('./NEW_ML_MODEL/Fraud_detection_cybershield.joblib')
# scaler = joblib.load('./NEW_ML_MODEL/scaler_cybershield.joblib')

# # -----------------------------
# # 2️⃣ Function to process a transaction
# # -----------------------------
# def process_transaction(transaction_data):
#     """
#     Convert raw transaction dict into model features, scale them, and predict fraud.
#     """
#     # Derived features
#     step = transaction_data.get('step', 1)
#     balance_change = transaction_data['newbalanceOrig'] - transaction_data['oldbalanceOrg']
#     relative_change = balance_change / (transaction_data['oldbalanceOrg'] + 1e-9)
#     orig_balance_error = transaction_data['newbalanceOrig'] + transaction_data['amount'] - transaction_data['oldbalanceOrg']
#     dest_balance_error = transaction_data['newbalanceDest'] - transaction_data['amount'] - transaction_data['oldbalanceDest']
#     extreme_mismatch = int(abs(balance_change) > 1e6 or abs(dest_balance_error) > 1e6)
#     is_dormant_active = 1 if (transaction_data['oldbalanceOrg'] == 0 and transaction_data['newbalanceOrig'] != 0) else 0
#     extreme_anomaly_flag = 1 if extreme_mismatch or abs(orig_balance_error) > 1e6 else 0

#     # One-hot encode transaction type
#     type_mapping = {
#         'CASH_OUT': [1, 0, 0, 0],
#         'DEBIT':    [0, 1, 0, 0],
#         'PAYMENT':  [0, 0, 1, 0],
#         'TRANSFER': [0, 0, 0, 1]
#     }
#     type_features = type_mapping.get(transaction_data['type'], [0, 0, 0, 0])

#     # Feature vector (must match training order)
#     features = [
#         step,
#         transaction_data['amount'],
#         transaction_data['oldbalanceOrg'],
#         transaction_data['newbalanceOrig'],
#         transaction_data['oldbalanceDest'],
#         transaction_data['newbalanceDest'],
#         balance_change,
#         relative_change,
#         orig_balance_error,
#         dest_balance_error,
#         extreme_mismatch,
#         is_dormant_active,
#         extreme_anomaly_flag,
#         type_features[0],  # type_CASH_OUT
#         type_features[1],  # type_DEBIT
#         type_features[2],  # type_PAYMENT
#         type_features[3]   # type_TRANSFER
#     ]

#     # Convert to NumPy array, shape (1,17)
#     features_array = np.array([features], dtype=float)

#     # Scale features
#     scaled_features = scaler.transform(features_array)

#     # Predict fraud
#     prediction = model.predict(scaled_features)
#     print("xxx detector ", prediction)
#     return prediction[0]

# # -----------------------------
# # 3️⃣ Main execution
# # -----------------------------
# if __name__ == "__main__":
#     MODE = "kafka"  # "kafka" for real-time Kafka

#     if MODE == "kafka":
#         consumer = KafkaConsumer(
#             'transactions_topic',
#             bootstrap_servers=['localhost:9092'],
#             auto_offset_reset='earliest',
#             enable_auto_commit=True,
#             group_id='fraud-consumer-group',
#             value_deserializer=lambda x: json.loads(x.decode('utf-8'))
#         )
#         print("✅ Kafka consumer connected. Listening for transactions...")

#         for message in consumer:
#             transaction = message.value
#             print(f"Received transaction: {transaction}")

#             try:
#                 is_fraud = process_transaction(transaction)
#                 print("xxx isfraud", is_fraud)
#                 if is_fraud == 1:
#                     print("🚨 FRAUDULENT TRANSACTION DETECTED!")
#                 else:
#                     print("✅ Legitimate transaction.")
#             except Exception as e:
#                 print(f"❌ Error processing transaction: {e}. Transaction skipped.")

#     elif MODE == "test":
#         test_transaction = {
#     "step": 407,
#     "type": "CASH_OUT",
#     "amount": 5000000.0,  # Huge amount compared to origin balance
#     "nameOrig": "C123456789",
#     "oldbalanceOrg": 2085345.0,
#     "newbalanceOrig": 0.0,  # Entire balance withdrawn → suspicious
#     "nameDest": "C987654321",
#     "oldbalanceDest": 100000.0,
#     "newbalanceDest": 100000.0  # Destination balance not updated → mismatch
# }

#         print("✅ Running test transaction:")
#         print(json.dumps(test_transaction, indent=4))

#         try:
#             is_fraud = process_transaction(test_transaction)
#             if is_fraud == 1:
#                 print("🚨 FRAUDULENT TRANSACTION DETECTED!")
#             else:
#                 print("✅ Legitimate transaction.")
#         except Exception as e:
#             print(f"❌ Error during test: {e}")


# # # --------------------------------------------------------------



# import json
# from kafka import KafkaConsumer, KafkaProducer
# import joblib
# import numpy as np

# # -----------------------------
# # 1️⃣ Load your ML model and scaler
# # -----------------------------
# model = joblib.load('./NEW_ML_MODEL/Fraud_detection_cybershield.joblib')
# scaler = joblib.load('./NEW_ML_MODEL/scaler_cybershield.joblib')

# # -----------------------------
# # 2️⃣ Function to process a transaction
# # -----------------------------
# def process_transaction(transaction_data):
#     """
#     Convert raw transaction dict into model features, scale them, and predict fraud.
#     """
#     # Derived features
#     step = transaction_data.get('step', 1)
#     balance_change = transaction_data['newbalanceOrig'] - transaction_data['oldbalanceOrg']
#     relative_change = balance_change / (transaction_data['oldbalanceOrg'] + 1e-9)
#     orig_balance_error = transaction_data['newbalanceOrig'] + transaction_data['amount'] - transaction_data['oldbalanceOrg']
#     dest_balance_error = transaction_data['newbalanceDest'] - transaction_data['amount'] - transaction_data['oldbalanceDest']
#     extreme_mismatch = int(abs(balance_change) > 1e6 or abs(dest_balance_error) > 1e6)
#     is_dormant_active = 1 if (transaction_data['oldbalanceOrg'] == 0 and transaction_data['newbalanceOrig'] != 0) else 0
#     extreme_anomaly_flag = 1 if extreme_mismatch or abs(orig_balance_error) > 1e6 else 0

#     # One-hot encode transaction type
#     type_mapping = {
#         'CASH_OUT': [1, 0, 0, 0],
#         'DEBIT':    [0, 1, 0, 0],
#         'PAYMENT':  [0, 0, 1, 0],
#         'TRANSFER': [0, 0, 0, 1]
#     }
#     type_features = type_mapping.get(transaction_data['type'], [0, 0, 0, 0])

#     # Feature vector (must match training order)
#     features = [
#         step,
#         transaction_data['amount'],
#         transaction_data['oldbalanceOrg'],
#         transaction_data['newbalanceOrig'],
#         transaction_data['oldbalanceDest'],
#         transaction_data['newbalanceDest'],
#         balance_change,
#         relative_change,
#         orig_balance_error,
#         dest_balance_error,
#         extreme_mismatch,
#         is_dormant_active,
#         extreme_anomaly_flag,
#         type_features[0],  # type_CASH_OUT
#         type_features[1],  # type_DEBIT
#         type_features[2],  # type_PAYMENT
#         type_features[3]   # type_TRANSFER
#     ]

#     # Convert to NumPy array, shape (1,17)
#     features_array = np.array([features], dtype=float)

#     # Scale features
#     scaled_features = scaler.transform(features_array)

#     # Predict fraud
#     prediction = model.predict(scaled_features)
#     print("xxx detector ", prediction)
#     return int(prediction[0])   # ensure it's int not numpy type

# # -----------------------------
# # 3️⃣ Main execution
# # -----------------------------
# if __name__ == "__main__":
#     MODE = "kafka"  # "kafka" for real-time Kafka

#     # ✅ NEW: Kafka Producer setup
#     producer = KafkaProducer(
#         bootstrap_servers=['localhost:9092'],
#         value_serializer=lambda v: json.dumps(v).encode('utf-8')
#     )

#     if MODE == "kafka":
#         consumer = KafkaConsumer(
#             'transactions_topic',
#             bootstrap_servers=['localhost:9092'],
#             auto_offset_reset='earliest',
#             enable_auto_commit=True,
#             group_id='fraud-consumer-group',
#             value_deserializer=lambda x: json.loads(x.decode('utf-8'))
#         )
#         print("✅ Kafka consumer connected. Listening for transactions...")

#         for message in consumer:
#             transaction = message.value
#             print(f"Received transaction: {transaction}")

#             try:
#                 is_fraud = process_transaction(transaction)
#                 print("xxx isfraud", is_fraud)

#                 # ✅ Add is_Fraud to transaction
#                 transaction['is_Fraud'] = is_fraud

#                 if is_fraud == 1:
#                     print("🚨 FRAUDULENT TRANSACTION DETECTED!")
#                 else:
#                     print("✅ Legitimate transaction.")

#                 # ✅ Produce enriched message to Transactions_output
#                 producer.send('transactions_output', transaction)
#                 print("📤 Sent transaction with is_Fraud to Transactions_output")

#             except Exception as e:
#                 print(f"❌ Error processing transaction: {e}. Transaction skipped.")

#     elif MODE == "test":
#         test_transaction = {
#             "step": 407,
#             "type": "CASH_OUT",
#             "amount": 5000000.0,
#             "nameOrig": "C123456789",
#             "oldbalanceOrg": 2085345.0,
#             "newbalanceOrig": 0.0,
#             "nameDest": "C987654321",
#             "oldbalanceDest": 100000.0,
#             "newbalanceDest": 100000.0
#         }

#         print("✅ Running test transaction:")
#         print(json.dumps(test_transaction, indent=4))

#         try:
#             is_fraud = process_transaction(test_transaction)
#             test_transaction['is_Fraud'] = is_fraud

#             if is_fraud == 1:
#                 print("🚨 FRAUDULENT TRANSACTION DETECTED!")
#             else:
#                 print("✅ Legitimate transaction.")

#             # ✅ Send test transaction to Transactions_output
#             producer.send('Transactions_output', test_transaction)
#             print("📤 Sent test transaction with is_Fraud to Transactions_output")

#         except Exception as e:
#             print(f"❌ Error during test: {e}")



# ----------------------------

# 

import json
from kafka import KafkaConsumer, KafkaProducer
import joblib
import numpy as np

# -----------------------------
# 1️⃣ Load your ML model and scaler
# -----------------------------
model = joblib.load('./NEW_ML_MODEL/Fraud_detection_cybershield.joblib')
scaler = joblib.load('./NEW_ML_MODEL/scaler_cybershield.joblib')

# -----------------------------
# 2️⃣ Function to process a transaction
# -----------------------------
def process_transaction(transaction_data):
    """
    Convert raw transaction dict into model features, scale them, and predict fraud risk score.
    """

    # Derived features
    step = transaction_data.get('step', 1)
    balance_change = transaction_data['newbalanceOrig'] - transaction_data['oldbalanceOrg']
    relative_change = balance_change / (transaction_data['oldbalanceOrg'] + 1e-9)
    orig_balance_error = transaction_data['newbalanceOrig'] + transaction_data['amount'] - transaction_data['oldbalanceOrg']
    dest_balance_error = transaction_data['newbalanceDest'] - transaction_data['amount'] - transaction_data['oldbalanceDest']
    extreme_mismatch = int(abs(balance_change) > 1e6 or abs(dest_balance_error) > 1e6)
    is_dormant_active = 1 if (transaction_data['oldbalanceOrg'] == 0 and transaction_data['newbalanceOrig'] != 0) else 0
    extreme_anomaly_flag = 1 if extreme_mismatch or abs(orig_balance_error) > 1e6 else 0

    # One-hot encode transaction type
    type_mapping = {
        'CASH_OUT': [1, 0, 0, 0],
        'DEBIT':    [0, 1, 0, 0],
        'PAYMENT':  [0, 0, 1, 0],
        'TRANSFER': [0, 0, 0, 1]
    }
    type_features = type_mapping.get(transaction_data['type'], [0, 0, 0, 0])

    # Feature vector (must match training order)
    features = [
        step,
        transaction_data['amount'],
        transaction_data['oldbalanceOrg'],
        transaction_data['newbalanceOrig'],
        transaction_data['oldbalanceDest'],
        transaction_data['newbalanceDest'],
        balance_change,
        relative_change,
        orig_balance_error,
        dest_balance_error,
        extreme_mismatch,
        is_dormant_active,
        extreme_anomaly_flag,
        type_features[0],  # type_CASH_OUT
        type_features[1],  # type_DEBIT
        type_features[2],  # type_PAYMENT
        type_features[3]   # type_TRANSFER
    ]

    # Convert to NumPy array, shape (1,17)
    features_array = np.array([features], dtype=float)

    # Scale features
    scaled_features = scaler.transform(features_array)

    # Predict fraud probability
    fraud_score = model.predict_proba(scaled_features)[0][1] * 100  # in %
    fraud_score = round(fraud_score, 2)

    # Classify into risk levels
    if fraud_score < 30:
        risk_level = "Low"
    elif 30 <= fraud_score < 70:
        risk_level = "Medium"
    else:
        risk_level = "High"

    print(f"🔍 Fraud Score: {fraud_score}% | Risk: {risk_level}")

    return fraud_score, risk_level

# -----------------------------
# 3️⃣ Main execution
# -----------------------------
if __name__ == "__main__":
    MODE = "kafka"  # "kafka" for real-time Kafka

    # ✅ Kafka Producer setup
    producer = KafkaProducer(
        bootstrap_servers=['localhost:9092'],
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )

    if MODE == "kafka":
        consumer = KafkaConsumer(
            'transactions_topic',
            bootstrap_servers=['localhost:9092'],
            auto_offset_reset='earliest',
            enable_auto_commit=True,
            group_id='fraud-consumer-group',
            value_deserializer=lambda x: json.loads(x.decode('utf-8'))
        )
        print("✅ Kafka consumer connected. Listening for transactions...")

        for message in consumer:
            transaction = message.value
            print(f"Received transaction: {transaction}")

            try:
                fraud_score, risk_level = process_transaction(transaction)
                transaction['fraud_score'] = fraud_score
                transaction['risk_level'] = risk_level

                if risk_level == "High":
                    print("🚨 HIGH RISK TRANSACTION DETECTED!")
                elif risk_level == "Medium":
                    print("⚠️ Medium risk transaction.")
                else:
                    print("✅ Low risk transaction.")

                # ✅ Send enriched transaction to Transactions_output (all transactions)
                producer.send('transactions_output', transaction)
                print("📤 Sent to Transactions_output")

                # ✅ Send only HIGH risk cases to onlyFraud
                if risk_level == "High":
                    producer.send('onlyFraud', transaction)
                    print("📤 Sent HIGH RISK transaction to onlyFraud")

            except Exception as e:
                print(f"❌ Error processing transaction: {e}. Transaction skipped.")

    elif MODE == "test":
        test_transaction = {
          "step": 200,
    "type": "TRANSFER",
    "amount": 75000.0,
    "nameOrig": "C222222222",
    "oldbalanceOrg": 80000.0,
    "newbalanceOrig": 5000.0,
    "nameDest": "C888888888",
    "oldbalanceDest": 10000.0,
    "newbalanceDest": 85000.0
        }

        print("✅ Running test transaction:")
        print(json.dumps(test_transaction, indent=4))

        try:
            fraud_score, risk_level = process_transaction(test_transaction)
            test_transaction['fraud_score'] = fraud_score
            test_transaction['risk_level'] = risk_level

            if risk_level == "High":
                print("🚨 HIGH RISK TRANSACTION DETECTED!")
            elif risk_level == "Medium":
                print("⚠️ Medium risk transaction.")
            else:
                print("✅ Low risk transaction.")

            # ✅ Send enriched transaction to Transactions_output
            producer.send('transactions_output', test_transaction)
            print("📤 Sent to Transactions_output")

            # ✅ Send only HIGH risk cases
            if risk_level == "High":
                producer.send('onlyFraud', test_transaction)
                print("📤 Sent HIGH RISK transaction to onlyFraud")

        except Exception as e:
            print(f"❌ Error during test: {e}")