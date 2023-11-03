use reservasDB;

INSERT INTO room (capacity, name, officer, internalSchedule, publicSchedule, startHour, endHour, betweenSession, building_id)
VALUES 
(50, 'pabellón 1', 'Silvia Salazar', 'Horario interno', 'Horario público', '08:00', '20:00', '30 minutos', 1),
(15, 'sala Rivera', 'Tomás García', 'Horario interno', 'Horario público', '09:00', '19:00', '1 hora', 1),
(10, 'aula estudio 1', 'Gemma Rivera', 'Horario interno', 'Horario público', '10:00', '22:00', '45 minutos', 2),
(30, 'sala polivalente', 'Gemma Rivera', 'Horario interno', 'Horario público', '10:00', '22:00', '45 minutos', 2);