from flask import Flask, request, redirect
import sqlite3
from datetime import datetime, timedelta
from cache import async_cache_image, caching_tasks
from database import DB_FILE

app = Flask(__name__)

@app.route("/")
@app.route("/list")
def list_cached_images():
    offset = int(request.args.get("offset", 0))
    limit = int(request.args.get("limit", 50))

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT original_url, cached_url, cache_time FROM history ORDER BY cache_time DESC LIMIT ? OFFSET ?",
        (limit, offset),
    )
    records = cursor.fetchall()

    cached_images = []
    for record in records:
        original_url, cached_url, cache_time = record
        cached_images.append(
            {
                "original_url": original_url,
                "cached_url": cached_url,
                "cache_time": cache_time,
            }
        )

    total_count = cursor.execute("SELECT COUNT(*) FROM history").fetchone()[0]

    return {"items": cached_images, "total": total_count}

@app.route("/o")
def redirect_image():
    original_url = request.args.get("url")
    plus_url = request.args.get("plus")
    print("try " + original_url)
    if not original_url:
        return "Missing url parameter", 400

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT cached_url, cache_time FROM history WHERE original_url = ?",
        (original_url,),
    )
    record = cursor.fetchone()

    if record:
        cached_url, cache_time = record
        if cached_url and (
            original_url.endswith(".mp3")
            or original_url.endswith(".mp4")
            or original_url.endswith(".mp5")
        ):
            return redirect(cached_url)
        else:
            print("to " + cached_url + "?x-oss-process=image/resize,m_fill," + plus_url)
            return redirect(
                cached_url + "?x-oss-process=image/resize,m_fill," + plus_url
            )

    if original_url in caching_tasks and datetime.now() - caching_tasks[
        original_url
    ] < timedelta(minutes=3):
        return redirect(original_url)

    async_cache_image(original_url)

    return redirect(original_url)
