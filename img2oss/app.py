from routes import app
from database import init_db

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0")
