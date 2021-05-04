FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=pass

COPY setup.sh /docker-entrypoint-initdb.d/
COPY scripts /scripts/
