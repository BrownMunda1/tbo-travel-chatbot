# Dockerfile
FROM rasa/rasa

# RUN python -m pip install rasa

# Set the working directory
WORKDIR /app

# Copy your Rasa project into the container
COPY . .

# Install dependencies (if needed)
USER 1001

# Expose the Rasa server port
EXPOSE 5005

# Start the Rasa server
CMD ["run", "--enable-api", "--cors", "*", "--model", "models/20231231-102135-quick-taco.tar.gz", "--port", "5005"]
