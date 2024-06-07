import os
import sqlite3

DB_FILE = "./data/sqlite.db"

def init_db():
    if not os.path.exists("./data"):
        os.makedirs("./data")
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        """CREATE TABLE IF NOT EXISTS history
                     (original_url TEXT PRIMARY KEY,
                      cached_url TEXT,
                      cache_time TIMESTAMP)"""
    )
    conn.commit()
    conn.close()
