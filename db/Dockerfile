# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Copy the dump file into the container
COPY ./db.sql /

# Use a custom script to restore the database from the dump file
COPY ./restore-db.sh /docker-entrypoint-initdb.d/restore-db.sh

# Set permissions for the script and make it executable
RUN chmod +x /docker-entrypoint-initdb.d/restore-db.sh

# Set the environment variable to run custom scripts and define the database
ENV POSTGRES_PASSWORD=1919
ENV POSTGRES_DB=db-inrae