use reservasDB;

INSERT INTO room (capacity, officer, internalSchedule, publicSchedule, startHour, endHour, betweenSession, building_id)
VALUES 
(50, 'Silvia Salazar', 'Horario interno', 'Horario público', '08:00', '20:00', '30 minutos', 1),
(15, 'Tomás García', 'Horario interno', 'Horario público', '09:00', '19:00', '1 hora', 1),
(10, 'Gemma Rivera', 'Horario interno', 'Horario público', '10:00', '22:00', '45 minutos', 2);
