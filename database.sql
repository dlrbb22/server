CREATE DATABASE resilia;

DROP TABLE notifications;

CREATE TABLE notifications(
    notif_id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    description VARCHAR(2048),
    received_at TIMESTAMP NOT NULL,
    viewed BOOLEAN DEFAULT false
);