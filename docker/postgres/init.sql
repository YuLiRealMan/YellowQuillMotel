-- Create the Customer table
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL, -- important 
    last_name VARCHAR(50) NOT NULL, -- important
    phone_number VARCHAR(15), -- important
    email VARCHAR(100),
    credit_card_number VARCHAR(20), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Room table
CREATE TABLE room (
    room_id SERIAL PRIMARY KEY, -- important
    room_number INTEGER NOT NULL UNIQUE, -- important
    bed_count INTEGER NOT NULL, -- e.g., single bed or double bed
    room_type VARCHAR(50) NOT NULL, -- e.g., 'One Double Bed', 'One Queen Bed (Large Room)'
    base_rate DECIMAL(6, 2) NOT NULL, -- e.g., 75.00
    is_pet_friendly BOOLEAN DEFAULT FALSE, -- Based on 'No Pets' notes
    is_smoking_friendly BOOLEAN DEFAULT FALSE, -- Assuming non-smoking by default
    is_available BOOLEAN DEFAULT TRUE,
    CONSTRAINT valid_room_number CHECK (room_number BETWEEN 1 AND 16) -- Assuming up to 20 rooms
    CONSTRAINT valid_bed_count CHECK (bed_count BETWEEN 1 AND 2) -- Assuming single or dobule bed.
);

-- Create the Order table
CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customer(customer_id) ON DELETE SET NULL,
    room_id INTEGER REFERENCES room(room_id) ON DELETE SET NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    num_adults INTEGER NOT NULL DEFAULT 1,
    num_children INTEGER DEFAULT 0,
    num_pets INTEGER DEFAULT 0,
    total_amount DECIMAL(8, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_dates CHECK (check_out_date > check_in_date),
);

-- Insert initial room data based on the image
INSERT INTO room (room_number, room_type, bed_count, base_rate, is_pet_friendly,is_smoking_friendly) VALUES
-- note, for one dobule bed, we can offer $4 off for single person
(3, 'One Double Bed', 1, 89.00,  TRUE, FALSE),
(8, 'One Double Bed', 1, 89.00,  TRUE, FALSE),
(15, 'One Double Bed', 1, 89.00,  TRUE, FALSE),
(16, 'One Double Bed', 1, 89.00,  TRUE, FALSE),
--
(11, 'One Queen Bed (Large Room)', 1, 89.00,  FALSE, FALSE),
(12, 'One Queen Bed (Large Room)', 1, 89.00,  TRUE, FALSE),
--
(4, 'One Queen Bed with Kitchenette', 1, 89.00,  FALSE, FALSE),
(5, 'One Queen Bed with Kitchenette', 1, 89.00,  FALSE, FALSE),
--
(1, 'Two Double Beds', 2, 89.00,  TRUE, TRUE), 
(6, 'Two Double Beds', 2, 89.00,  TRUE, FALSE),
(7, 'Two Double Beds', 2, 89.00,  TRUE, FALSE),
(9, 'Two Double Beds', 2, 89.00,  TRUE, FALSE),
(10, 'Two Double Beds', 2, 89.00,  TRUE, FALSE),
(14, 'Two Double Beds', 2, 89.00,  TRUE, FALSE),
--
(2, 'Two Queen Beds', 2, 100.00,  FALSE, FALSE)


-- Add indexes for better performance
CREATE INDEX idx_order_customer_id ON "order"(customer_id);
CREATE INDEX idx_order_room_id ON "order"(room_id);
CREATE INDEX idx_room_room_number ON room(room_number);