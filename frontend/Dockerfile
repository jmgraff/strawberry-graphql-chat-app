from node:16-alpine

workdir /opt/container

copy . .

run npm install && npm install serve

entrypoint ["./entrypoint.sh"]
