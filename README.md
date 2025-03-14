1. Download python and docker
2. Run python -m venv ./env
3. inside of ./docker create a file called .env and post the contents with `DB, DB_USER, DB_PWD etc...` from discord
4. run this command inside of root `source ./env/bin/activate`


# back end 
pip install fastapi
pip install unicorn
pip install sqlalchemy
pip install psycopg2-binary
# to test fastapi
uvicorn main:app --reload

curl -X POST -H "Content-Type:application/json" 'http://127.0.0.1:8000/items?item=apple'