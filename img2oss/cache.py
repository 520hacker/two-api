import os
import requests
import shutil
import threading
import sqlite3
from urllib.parse import urlparse
from datetime import datetime, timedelta
from PIL import Image
from config import BUCKET, CDN, TMP_DIR
from database import DB_FILE

caching_tasks = {}

def async_cache_image(original_url):
    t = threading.Thread(target=cache_image, args=(original_url,))
    t.start()

def download_image_to_tmp(url):
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            file_path = os.path.join(TMP_DIR, urlparse(url).path.split("/")[-1])
            with open(file_path, "wb") as f:
                response.raw.decode_content = True
                shutil.copyfileobj(response.raw, f)
            return file_path
        else:
            print(f"Failed to download file, status code: {response.status_code}")
    except Exception as e:
        print(f"Error downloading file {url}: {e}")
    return None

def is_image(file_path):
    try:
        with Image.open(file_path) as img:
            img.verify()
        return True
    except Exception:
        return False

def check_path(original_url):
    return original_url.endswith(".txt") and "filesystem.site" in original_url

def cache_image(original_url):
    caching_tasks[original_url] = datetime.now()
    tmp_file_path = download_image_to_tmp(original_url)
    if tmp_file_path:
        try:
            oss_path = "cache/" + urlparse(original_url).path.lstrip("/")
            if check_path(original_url):
                png_file_path = tmp_file_path.replace(".txt", ".png")
                os.rename(tmp_file_path, png_file_path)
                tmp_file_path = png_file_path
                oss_path = oss_path.replace(".txt", ".png")

            with open(tmp_file_path, "rb") as f:
                BUCKET.put_object(oss_path, f)
                cached_url = f"{CDN}/{oss_path}"
                print("cached " + cached_url)
                with sqlite3.connect(DB_FILE) as conn:
                    cursor = conn.cursor()
                    cursor.execute(
                        "INSERT OR REPLACE INTO history (original_url, cached_url, cache_time) VALUES (?, ?, ?)",
                        (
                            original_url,
                            cached_url,
                            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                        ),
                    )
                    conn.commit()
        except Exception as e:
            print(f"Error caching image {original_url}: {e}")
        finally:
            os.remove(tmp_file_path)
            del caching_tasks[original_url]
