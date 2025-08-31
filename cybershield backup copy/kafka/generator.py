# # generator.py

# import random
# import json

# # Load users data from users.json
# with open('./kafka/users.json', 'r') as f:
#     users_data = json.load(f)
# users_tuple = tuple(users_data)

# transaction_types = ['CASH-IN', 'CASH-OUT', 'DEBIT', 'PAYMENT', 'TRANSFER']
# fraud_probability = 180 / 180  # Desired fraud rate

# def generate_transaction():
#     transaction_type = random.choice(transaction_types)
#     amount = random.randint(100, 100000)
#     oldbalanceOrg = random.randint(amount, 10000000)
#     oldbalanceDest = random.randint(0, 10000000)

#     nameOrig = random.choice(users_tuple)
#     nameDest = random.choice(users_tuple)

#     while nameOrig == nameDest:
#         nameDest = random.choice(users_tuple)

#     isFraud = 1 if random.random() < fraud_probability else 0

#     if transaction_type in ['CASH-OUT', 'TRANSFER']:
#         newbalanceOrig = oldbalanceOrg - amount
#         newbalanceDest = oldbalanceDest + amount
#     elif transaction_type in ['PAYMENT', 'DEBIT']:
#         newbalanceOrig = oldbalanceOrg - amount
#         newbalanceDest = oldbalanceDest
#     elif transaction_type == 'CASH-IN':
#         newbalanceOrig = oldbalanceOrg
#         newbalanceDest = oldbalanceDest + amount
#     else:
#         newbalanceOrig = oldbalanceOrg
#         newbalanceDest = oldbalanceDest

#     # Generate a step value (time step/hour) - typically 1-744 for a month of hourly data
#     step = random.randint(1, 744)

#     return {
#         'step': step,
#         'type': transaction_type,
#         'amount': amount,
#         'nameOrig': nameOrig,
#         'oldbalanceOrg': oldbalanceOrg,
#         'newbalanceOrig': newbalanceOrig,
#         'nameDest': nameDest,
#         'oldbalanceDest': oldbalanceDest,
#         'newbalanceDest': newbalanceDest,
#         'isFraud': isFraud
#     }

# print(generate_transaction())




# ---------------------------------



# import random
# import time
# import json

# # Load users data
# with open('./kafka/users.json', 'r') as f:
#   users_data = json.load(f)
# users_tuple = tuple(users_data)

# # Define transaction types and columns
# transaction_types = ['CASH-IN', 'CASH-OUT', 'DEBIT', 'PAYMENT', 'TRANSFER']
# transaction_columns = ['type', 'amount', 'nameOrig', 'oldbalanceOrg', 'newbalanceOrig', 'nameDest', 'oldbalanceDest', 'newbalanceDest', 'isFraud']

# # Calculate the fraud probability (still keeping a base probability)
# base_fraud_probability = 60 / 180

# def generate_transaction():
#     """Generates a single transaction with increased probability of fraudulent characteristics."""
#     transaction_type = random.choice(transaction_types)
#     amount = random.randint(100, 100000)
#     oldbalanceOrg = random.randint(amount, 10000000)
#     oldbalanceDest = random.randint(0, 10000000)

#     nameOrig = random.choice(users_tuple)
#     nameDest = random.choice(users_tuple)

#     # Ensure nameOrig and nameDest are different
#     while nameOrig == nameDest:
#         nameDest = random.choice(users_tuple)

#     # Determine if the transaction is fraudulent
#     # Increase probability for 'CASH-OUT' and 'TRANSFER' which are often associated with fraud
#     fraud_multiplier = 5 # Increase fraud likelihood for certain types

#     if transaction_type in ['CASH-OUT', 'TRANSFER'] and random.random() < base_fraud_probability * fraud_multiplier:
#         isFraud = 1
#         # Adjust features to be more "fraudulent-like"
#         amount = random.randint(50000, 500000) # Higher amounts
#         oldbalanceOrg = random.randint(amount, 20000000) # Ensure sufficient balance
#         oldbalanceDest = random.randint(0, 10000000) # Can be any balance
#     elif random.random() < base_fraud_probability:
#          isFraud = 1
#     else:
#         isFraud = 0


#     # Calculate new balances based on transaction type
#     if transaction_type == 'CASH-OUT' or transaction_type == 'TRANSFER':
#         newbalanceOrig = oldbalanceOrg - amount
#         newbalanceDest = oldbalanceDest + amount
#     elif transaction_type == 'PAYMENT' or transaction_type == 'DEBIT':
#         newbalanceOrig = oldbalanceOrg - amount
#         newbalanceDest = oldbalanceDest
#     elif transaction_type == 'CASH-IN':
#         newbalanceOrig = oldbalanceOrg
#         newbalanceDest = oldbalanceDest + amount
#     else: # For any other type, assume no change in balances
#         newbalanceOrig = oldbalanceOrg
#         newbalanceDest = oldbalanceDest

#     # Ensure balances don't go below zero for the origin account in debit/payment types
#     if transaction_type in ['DEBIT', 'PAYMENT']:
#         if newbalanceOrig < 0:
#             newbalanceOrig = 0 # Or handle this differently, e.g., regenerate transaction

#     transaction = {
#         'type': transaction_type,
#         'amount': amount,
#         'nameOrig': nameOrig,
#         'oldbalanceOrg': oldbalanceOrg,
#         'newbalanceOrig': newbalanceOrig,
#         'nameDest': nameDest,
#         'oldbalanceDest': oldbalanceDest,
#         'newbalanceDest': newbalanceDest,
#         'isFraud': isFraud
#     }

#     return transaction

# # Transaction generation loop
# generated_transactions = []

# queries_per_second = 3
# duration_seconds = 30
# total_transactions = queries_per_second * duration_seconds
# delay_between_queries = 1 / queries_per_second

# print("Starting transaction generation script...")
# print(f"Generating {total_transactions} transactions over {duration_seconds} seconds at {queries_per_second} queries per second.")
# print(f"Delay between queries: {delay_between_queries:.2f} seconds.")

# fraud_count = 0
# total_count = 0

# for i in range(total_transactions):
#     transaction = generate_transaction()
#     generated_transactions.append(transaction)
#     total_count += 1
#     if transaction['isFraud'] == 1:
#         fraud_count += 1

#     print(transaction) # Print each transaction

#     time.sleep(delay_between_queries) # Uncommented to control the rate

# print("Transaction generation complete.")
# print(f"Total transactions generated: {total_count}")
# print(f"Total fraudulent transactions generated: {fraud_count}")

# # Calculate expected fraud range
# expected_min_fraud = (3/60) * duration_seconds
# expected_max_fraud = (5/60) * duration_seconds

# print(f"Expected number of fraudulent transactions in {duration_seconds} seconds based on base probability: between {expected_min_fraud:.2f} and {expected_max_fraud:.2f}")





# -------------------------------

# import random
# import json
# import time

# # Load users data from users.json
# with open('./kafka/users.json', 'r') as f:
#     users_data = json.load(f)
# users_tuple = tuple(users_data)

# transaction_types = ['CASH-IN', 'CASH-OUT', 'DEBIT', 'PAYMENT', 'TRANSFER']
# base_fraud_probability = 180 / 180  # Base probability for fraud

# def generate_transaction():
#     """Generates a single transaction, possibly fraudulent."""
#     transaction_type = random.choice(transaction_types)
#     amount = random.randint(100, 100000)
#     oldbalanceOrg = random.randint(amount, 10000000)
#     oldbalanceDest = random.randint(0, 10000000)

#     nameOrig = random.choice(users_tuple)
#     nameDest = random.choice(users_tuple)
#     while nameOrig == nameDest:
#         nameDest = random.choice(users_tuple)

#     # Determine if transaction is fraudulent
#     fraud_multiplier = 5  # Increase fraud likelihood for risky types
#     if transaction_type in ['CASH-OUT', 'TRANSFER'] and random.random() < base_fraud_probability * fraud_multiplier:
#         isFraud = 1
#         amount = random.randint(50000, 500000)
#         oldbalanceOrg = random.randint(amount, 20000000)
#         oldbalanceDest = random.randint(0, 10000000)
#     elif random.random() < base_fraud_probability:
#         isFraud = 1
#     else:
#         isFraud = 0

#     # Calculate new balances
#     if transaction_type in ['CASH-OUT', 'TRANSFER']:
#         newbalanceOrig = oldbalanceOrg - amount
#         newbalanceDest = oldbalanceDest + amount
#     elif transaction_type in ['PAYMENT', 'DEBIT']:
#         newbalanceOrig = oldbalanceOrg - amount
#         newbalanceDest = oldbalanceDest
#         if newbalanceOrig < 0:
#             newbalanceOrig = 0
#     elif transaction_type == 'CASH-IN':
#         newbalanceOrig = oldbalanceOrg
#         newbalanceDest = oldbalanceDest + amount
#     else:
#         newbalanceOrig = oldbalanceOrg
#         newbalanceDest = oldbalanceDest

#     return {
#         'type': transaction_type,
#         'amount': amount,
#         'nameOrig': nameOrig,
#         'oldbalanceOrg': oldbalanceOrg,
#         'newbalanceOrig': newbalanceOrig,
#         'nameDest': nameDest,
#         'oldbalanceDest': oldbalanceDest,
#         'newbalanceDest': newbalanceDest,
#         'isFraud': isFraud
#     }

# # Example usage
# if __name__ == "__main__":
#     print(generate_transaction())

# print("done xxx")



# ---------------------------------------------------------------




# from os import name
# import random
# import time
# import pandas as pd
# import json # Import the json library

# # Possible transaction types (matching your one-hot encoding setup)
# TRANSACTION_TYPES = ["PAYMENT", "TRANSFER", "CASH_OUT"]

# # Load users data from users.json
# try:
#     with open('./kafka/users.json', 'r') as f:
#         users_data = json.load(f)
#     users_tuple = tuple(users_data) # Convert the list to a tuple for efficient random selection
#     print("Users data loaded successfully.")
# except FileNotFoundError:
#     print("Error: users.json not found. Please upload the users.json file.")
#     # You might want to exit or handle this error appropriately
#     users_tuple = () # Set to empty tuple if file not found
# except json.JSONDecodeError:
#     print("Error: Could not decode JSON from users.json. Please check the file format.")
#     users_tuple = () # Set to empty tuple if there's a JSON error


# def generate_transaction(is_fraud=False):
#     """
#     Generate a single synthetic transaction with features similar to your model.
#     Fraud transactions are designed to trigger anomalies.
#     """
#     if not users_tuple:
#         print("Cannot generate transaction: users data is not loaded.")
#         return None

#     tx_type = random.choice(TRANSACTION_TYPES)
#     amount = random.randint(100, 50000)

#     # Select origin and destination users, ensuring they are different
#     nameOrig = random.choice(users_tuple)
#     nameDest = random.choice(users_tuple)
#     while nameOrig == nameDest:
#         nameDest = random.choice(users_tuple)


#     if is_fraud:
#         # Fraud pattern → large suspicious transfer, balance mismatch, dormant activation
#         oldbalanceOrg = 0 if random.random() < 0.5 else random.randint(0, 1000)
#         newbalanceOrig = oldbalanceOrg - amount if oldbalanceOrg > 0 else random.randint(1000, 5000)
#         oldbalanceDest = random.randint(0, 1000)
#         newbalanceDest = oldbalanceDest + amount + random.randint(100, 5000)  # mismatch
#         fraud_label = 1
#     else:
#         # Normal transaction → balances match correctly
#         oldbalanceOrg = random.randint(1000, 10000)
#         newbalanceOrig = oldbalanceOrg - amount
#         oldbalanceDest = random.randint(1000, 10000)
#         newbalanceDest = oldbalanceDest + amount
#         fraud_label = 0

#     # Ensure newbalanceOrig is not negative for non-fraudulent transactions where oldbalanceOrg was sufficient
#     if not is_fraud and newbalanceOrig < 0:
#         newbalanceOrig = 0 # Or handle this scenario differently if needed


#     tx = {
#         "amount": amount,
#         "oldbalanceOrg": oldbalanceOrg,
#         "newbalanceOrig": max(newbalanceOrig, 0), # Ensure balance is not negative
#         "oldbalanceDest": oldbalanceDest,
#         "newbalanceDest": max(newbalanceDest, 0), # Ensure balance is not negative
#         "type": tx_type,
#         "nameOrig": nameOrig, # Add nameOrig
#         "nameDest": nameDest, # Add nameDest
#         "isFraud": fraud_label
#     }
#     return tx


# def stream_transactions(duration=10, rate=3, fraud_rate=1):
#     """
#     Stream transactions at rate per second.
#     Ensure fraud_rate frauds per second.
#     Runs for duration seconds.
#     """
#     total_tx = duration * rate
#     frauds_per_sec = fraud_rate
#     normal_per_sec = rate - fraud_rate

#     print(f"Starting stream: {rate} tx/sec, {fraud_rate} fraud/sec, {duration} sec total...\n")
#     for second in range(duration):
#         tx_batch = []
#         # Generate fraud transactions
#         for _ in range(frauds_per_sec):
#             tx = generate_transaction(is_fraud=True)
#             if tx: tx_batch.append(tx)
#         # Generate normal transactions
#         for _ in range(normal_per_sec):
#             tx = generate_transaction(is_fraud=False)
#             if tx: tx_batch.append(tx)

#         random.shuffle(tx_batch)  # mix fraud & normal
#         for tx in tx_batch:
#             print(tx)
#             time.sleep(1 / rate)  # control pacing


# if name == "main":
#     # Example usage: stream transactions for 30 seconds at 3 tx/sec with 1 fraud/sec
#     stream_transactions(duration=30, rate=3, fraud_rate=1)
#     print(stream_transactions())

# from os import name
# import random
# import time
# import pandas as pd
# import json # Import the json library

# # Possible transaction types (matching your one-hot encoding setup)
# TRANSACTION_TYPES = ["PAYMENT", "TRANSFER", "CASH_OUT"]

# # Load users data from users.json
# try:
#     with open('./kafka/users.json', 'r') as f:
#         users_data = json.load(f)
#     users_tuple = tuple(users_data) # Convert the list to a tuple for efficient random selection
#     print("Users data loaded successfully.")
# except FileNotFoundError:
#     print("Error: users.json not found. Please upload the users.json file.")
#     # You might want to exit or handle this error appropriately
#     users_tuple = () # Set to empty tuple if file not found
# except json.JSONDecodeError:
#     print("Error: Could not decode JSON from users.json. Please check the file format.")
#     users_tuple = () # Set to empty tuple if there's a JSON error


# def generate_transaction(is_fraud=False):
#     """
#     Generate a single synthetic transaction with features similar to your model.
#     Fraud transactions are designed to trigger anomalies.
#     """
#     if not users_tuple:
#         print("Cannot generate transaction: users data is not loaded.")
#         return None

#     tx_type = random.choice(TRANSACTION_TYPES)
#     amount = random.randint(100, 50000)

#     # Select origin and destination users, ensuring they are different
#     nameOrig = random.choice(users_tuple)
#     nameDest = random.choice(users_tuple)
#     while nameOrig == nameDest:
#         nameDest = random.choice(users_tuple)


#     if is_fraud:
#         # Fraud pattern → large suspicious transfer, balance mismatch, dormant activation
#         oldbalanceOrg = 0 if random.random() < 0.5 else random.randint(0, 1000)
#         newbalanceOrig = oldbalanceOrg - amount if oldbalanceOrg > 0 else random.randint(1000, 5000)
#         oldbalanceDest = random.randint(0, 1000)
#         newbalanceDest = oldbalanceDest + amount + random.randint(100, 5000)  # mismatch
#         fraud_label = 1
#     else:
#         # Normal transaction → balances match correctly
#         oldbalanceOrg = random.randint(1000, 10000)
#         newbalanceOrig = oldbalanceOrg - amount
#         oldbalanceDest = random.randint(1000, 10000)
#         newbalanceDest = oldbalanceDest + amount
#         fraud_label = 0

#     # Ensure newbalanceOrig is not negative for non-fraudulent transactions where oldbalanceOrg was sufficient
#     if not is_fraud and newbalanceOrig < 0:
#         newbalanceOrig = 0 # Or handle this scenario differently if needed


#     tx = {
#         "amount": amount,
#         "oldbalanceOrg": oldbalanceOrg,
#         "newbalanceOrig": max(newbalanceOrig, 0), # Ensure balance is not negative
#         "oldbalanceDest": oldbalanceDest,
#         "newbalanceDest": max(newbalanceDest, 0), # Ensure balance is not negative
#         "type": tx_type,
#         "nameOrig": nameOrig, # Add nameOrig
#         "nameDest": nameDest, # Add nameDest
#         "isFraud": fraud_label
#     }
#     return tx


# def stream_transactions(duration=10, rate=3, fraud_rate=1):
#     """
#     Stream transactions at rate per second.
#     Ensure fraud_rate frauds per second.
#     Runs for duration seconds.
#     """
#     total_tx = duration * rate
#     frauds_per_sec = fraud_rate
#     normal_per_sec = rate - fraud_rate

#     print(f"Starting stream: {rate} tx/sec, {fraud_rate} fraud/sec, {duration} sec total...\n")
#     for second in range(duration):
#         tx_batch = []
#         # Generate fraud transactions
#         for _ in range(frauds_per_sec):
#             tx = generate_transaction(is_fraud=True)
#             if tx: tx_batch.append(tx)
#         # Generate normal transactions
#         for _ in range(normal_per_sec):
#             tx = generate_transaction(is_fraud=False)
#             if tx: tx_batch.append(tx)

#         random.shuffle(tx_batch)  # mix fraud & normal
#         for tx in tx_batch:
#             print(tx)
#             time.sleep(1 / rate)  # control pacing


# if name == "main":
#     # Example usage: stream transactions for 30 seconds at 3 tx/sec with 1 fraud/sec
#     stream_transactions(duration=30, rate=3, fraud_rate=1)
#     print(stream_transactions())



import random
import time
import pandas as pd
import json

# Possible transaction types (matching your one-hot encoding setup)
TRANSACTION_TYPES = ["PAYMENT", "TRANSFER", "CASH_OUT"]

# Load users data from users.json
try:
    with open('./kafka/users.json', 'r') as f:
        users_data = json.load(f)
    users_tuple = tuple(users_data)  # Convert the list to a tuple for efficient random selection
    print("Users data loaded successfully.")
except FileNotFoundError:
    print("Error: users.json not found. Please upload the users.json file.")
    users_tuple = ()
except json.JSONDecodeError:
    print("Error: Could not decode JSON from users.json. Please check the file format.")
    users_tuple = ()


def generate_transaction(is_fraud=False):
    """
    Generate a single synthetic transaction with features similar to your model.
    Fraud transactions are designed to trigger anomalies.
    """
    if not users_tuple:
        print("Cannot generate transaction: users data is not loaded.")
        return None

    tx_type = random.choice(TRANSACTION_TYPES)
    amount = random.randint(100, 50000)

    # Select origin and destination users, ensuring they are different
    nameOrig = random.choice(users_tuple)
    nameDest = random.choice(users_tuple)
    while nameOrig == nameDest:
        nameDest = random.choice(users_tuple)

    if is_fraud:
        # Fraud pattern → large suspicious transfer, balance mismatch
        oldbalanceOrg = 0 if random.random() < 0.5 else random.randint(0, 1000)
        newbalanceOrig = oldbalanceOrg - amount if oldbalanceOrg > 0 else random.randint(1000, 5000)
        oldbalanceDest = random.randint(0, 1000)
        newbalanceDest = oldbalanceDest + amount + random.randint(100, 5000)  # mismatch
        fraud_label = 1
    else:
        # Normal transaction → balances match correctly
        oldbalanceOrg = random.randint(1000, 10000)
        newbalanceOrig = oldbalanceOrg - amount
        oldbalanceDest = random.randint(1000, 10000)
        newbalanceDest = oldbalanceDest + amount
        fraud_label = 0

        if newbalanceOrig < 0:
            newbalanceOrig = 0

    tx = {
        "amount": amount,
        "oldbalanceOrg": oldbalanceOrg,
        "newbalanceOrig": max(newbalanceOrig, 0),
        "oldbalanceDest": oldbalanceDest,
        "newbalanceDest": max(newbalanceDest, 0),
        "type": tx_type,
        "nameOrig": nameOrig,
        "nameDest": nameDest,
        "isFraud": fraud_label
    }
    return tx


def stream_transactions(duration=10, rate=3, fraud_rate=1):
    """
    Stream transactions at rate per second.
    Ensure fraud_rate frauds per second.
    Runs for duration seconds.
    """
    print(f"Starting stream: {rate} tx/sec, {fraud_rate} fraud/sec, {duration} sec total...\n")
    for second in range(duration):
        tx_batch = []
        for _ in range(fraud_rate):
            tx = generate_transaction(is_fraud=True)
            if tx: tx_batch.append(tx)
        for _ in range(rate - fraud_rate):
            tx = generate_transaction(is_fraud=False)
            if tx: tx_batch.append(tx)

        random.shuffle(tx_batch)
        for tx in tx_batch:
            print(tx)
            time.sleep(1 / rate)


if __name__ == "__main__":
    # Example usage
    stream_transactions(duration=10, rate=3, fraud_rate=1)