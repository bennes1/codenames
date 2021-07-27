FROM mongo:latest

COPY setup.sh /docker-entrypoint-initdb.d/
COPY scripts /scripts/
COPY load_pictures /load_pictures/
COPY load_words /load_words/

RUN chmod 1755 /data/db && \
chown mongodb:mongodb /data/db

RUN chmod 1755 /var/log/mongodb && \
chown mongodb:mongodb /var/log/mongodb

RUN mkdir /home/mongodb && \
chown mongodb:mongodb /home/mongodb
