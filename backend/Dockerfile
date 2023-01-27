from python:3.9.16-alpine

workdir /opt/container

copy . .

run pip install -r requirements.txt

entrypoint ["python", "main.py"]
