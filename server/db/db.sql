CREATE TABLE restaurants(
    restaurant_id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_name VARCHAR(60) NOT NULL,
    restaurant_location VARCHAR(60) NOT NULL,
    restaurant_price_range INT NOT NULL check(restaurant_price_range >= 1 and restaurant_price_range <= 5)
);

INSERT INTO restaurants (restaurant_name, restaurant_location, restaurant_price_range)
VALUES ('rasna', 'surat', 4);