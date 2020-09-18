DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS weather;

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    formatted_query VARCHAR(255),
    latitude DECIMAL(14,7),
    longitude DECIMAL(14,7)
);

CREATE TABLE weather (
    id SERIAL PRIMARY KEY,
    latitude DECIMAL(14,7),
    longitude DECIMAL(14,7),
    forecast VARCHAR(255),
    time VARCHAR(255),
    timeupdated VARCHAR(255)
)