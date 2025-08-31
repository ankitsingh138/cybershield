# 

# producer.py

import time
import json
import random
from generator import generate_transaction

try:
    from kafka import KafkaProducer
    kafka_available = True
except Exception as e:
    print(f"Kafka client unavailable, skipping export: {e}")
    kafka_available = False


def produce_transactions(all_topic="transactions_topic", fraud_topic="onlyFraud",
                         qps=3, duration=30, fraud_ratio=0.3):
    """
    Produce synthetic transactions to Kafka.
    - all_topic: sends all transactions (WITHOUT isFraud field)
    - fraud_topic: sends ONLY fraudulent transactions (WITH isFraud=1)
    - qps = queries per second
    - duration = run time in seconds
    - fraud_ratio = fraction of fraudulent transactions
    """
    if not kafka_available:
        print("❌ Kafka producer not initialized.")
        return

    try:
        producer = KafkaProducer(
            bootstrap_servers='localhost:9092',
            value_serializer=lambda x: json.dumps(x).encode('utf-8')
        )

        total_tx = qps * duration
        delay = 1 / qps
        fraud_per_batch = max(1, int(qps * fraud_ratio))

        print(f"🚀 Sending {total_tx} transactions "
              f"({qps} tx/sec, {fraud_ratio*100:.0f}% fraud)")
        print(f"   → All transactions to topic: {all_topic} (no isFraud)")
        print(f"   → Fraud-only transactions to topic: {fraud_topic} (with isFraud=1)")

        for _ in range(duration):
            tx_batch = []
            # Fraudulent
            for _ in range(fraud_per_batch):
                tx_batch.append(generate_transaction(is_fraud=True))
            # Normal
            for _ in range(qps - fraud_per_batch):
                tx_batch.append(generate_transaction(is_fraud=False))

            random.shuffle(tx_batch)
            for tx in tx_batch:
                if tx:
                    # Send all tx to all_topic (without isFraud)
                    tx_copy = tx.copy()
                    tx_copy.pop("isFraud", None)
                    producer.send(all_topic, value=tx_copy)
                    print(f"Sent to {all_topic}: {tx_copy}")

                    # Send fraud-only tx to fraud_topic (keep isFraud=1)
                    if tx.get("isFraud") == 1:
                        producer.send(fraud_topic, value=tx)
                        print(f"   🔴 Sent to {fraud_topic}: {tx}")

                    time.sleep(delay)

        producer.flush()
        producer.close()
        print("✅ Finished exporting transactions to Kafka.")

    except Exception as e:
        print(f"❌ Kafka export failed: {e}")


if __name__ == "__main__":
    produce_transactions(all_topic="transactions_topic",
                         fraud_topic="onlyFraud",
                         qps=3, duration=30, fraud_ratio=0.3)