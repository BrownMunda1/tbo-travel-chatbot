FROM rasa/rasa-sdk

WORKDIR /app

USER root

COPY . /app/actions

RUN pip install -r requirements.txt

USER 1001
