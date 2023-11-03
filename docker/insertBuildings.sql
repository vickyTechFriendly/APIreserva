USE reservasDB;

INSERT INTO building (name, accessibility, longitude, latitude)
VALUES ('Edificio A', 1, -75.123456, 40.789012),
('Edificio B', 0, -75.234567, 40.890123);

SELECT * from building;