const express = require('express');
const router = express.Router();
const { Room, Person, Booking } = require('../models');
const { Op } = require('sequelize');

// Получить список классов
router.get('/api/v1/room', async (req, res) => {
  const rooms = await Room.findAll();
  res.json(rooms);
});

// Получить забронированные даты конкретного класса
router.get('/api/v1/room/:roomId', async (req, res) => {
  const roomId = req.params.roomId;
  const bookings = await Booking.findAll({
    where: { RoomId: roomId },
    attributes: ['date'],
  });
  res.json(bookings.map(booking => booking.date));
});

// Получить список преподавателей
router.get('/api/v1/person', async (req, res) => {
  const persons = await Person.findAll();
  res.json(persons);
});

// Забронировать класс на дату за преподавателем
router.post('/api/v1/person/:personId/room/:roomId/date/:date', async (req, res) => {
  const { personId, roomId, date } = req.params;

  const existingBooking = await Booking.findOne({
    where: {
      RoomId: roomId,
      date,
    },
  });

  if (existingBooking) {
    return res.status(400).json({ message: 'Room is already booked on this date.' });
  }

  const booking = await Booking.create({ RoomId: roomId, PersonId: personId, date });
  res.json({ message: 'Room booked successfully.', booking });
});

// Удалить бронь на дату
router.post('/api/v1/room/:roomId/date/:date', async (req, res) => {
  const { roomId, date } = req.params;
  const booking = await Booking.findOne({
    where: {
      RoomId: roomId,
      date,
    },
  });

  if (!booking) {
    return res.status(404).json({ message: 'No booking found for this date.' });
  }

  await booking.destroy();
  res.json({ message: 'Booking deleted successfully.' });
});

module.exports = router;