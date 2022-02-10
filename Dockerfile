FROM postgres:latest
COPY ./create-multiply-postgreql-database.sh /docker-entrypoint-initdb.d/