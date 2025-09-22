-- Table des rôles
CREATE TABLE role (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Table des utilisateurs
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    locale VARCHAR(10),
    currency VARCHAR(10),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table de jointure User <-> Role (many-to-many)
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

-- Table des agences
CREATE TABLE agency (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6)
);

-- Table des véhicules
CREATE TABLE vehicle (
    id BIGSERIAL PRIMARY KEY,
    acriss_code VARCHAR(10),
    license_plate VARCHAR(20) UNIQUE,
    status VARCHAR(20),
    daily_rate DECIMAL(10,2),
    agency_id BIGINT NOT NULL,
    FOREIGN KEY (agency_id) REFERENCES agency(id) ON DELETE CASCADE
);

-- Table des réservations
CREATE TABLE booking (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    vehicle_id BIGINT NOT NULL,
    pickup_agency_id BIGINT,
    return_agency_id BIGINT,
    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NOT NULL,
    total_amount DECIMAL(10,2),
    currency VARCHAR(10),
    status VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id) ON DELETE CASCADE,
    FOREIGN KEY (pickup_agency_id) REFERENCES agency(id),
    FOREIGN KEY (return_agency_id) REFERENCES agency(id)
);

-- Table des paiements
CREATE TABLE payment (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL UNIQUE,
    amount DECIMAL(10,2),
    currency VARCHAR(10),
    status VARCHAR(20),
    psp_transaction_id VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES booking(id) ON DELETE CASCADE
);

-- Table des conversations (chat)
CREATE TABLE conversation (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT,
    client_id BIGINT NOT NULL,
    agent_id BIGINT,
    status VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES booking(id) ON DELETE SET NULL,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (agent_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table des messages
CREATE TABLE message (
    id BIGSERIAL PRIMARY KEY,
    conversation_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (conversation_id) REFERENCES conversation(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);
