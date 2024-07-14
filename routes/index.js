const express = require('express');
const flatpickr = require("flatpickr");
const Russian = require("flatpickr/dist/l10n/ru.js").default.ru;
const { Room, Person, Booking } = require('../models');
flatpickr.localize(flatpickr.l10ns.ru);

const router = express.Router();

router.get('/api/v1/room', async (req, res) => {
  try {
    const rooms = await Room.findAll({
        attributes: ['id', 'name'],
        order: [['id','ASC']]
    });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/v1/room/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const bookings = await Booking.findAll({
      where: { RoomId: roomId },
      attributes: ['date', 'PersonId'],
      order: [['date','ASC']]
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/v1/person', async (req, res) => {
  try {
    const persons = await Person.findAll();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/api/v1/person/:personId/room/:roomId/date/:date', async (req, res) => {
  try {
    const { personId, roomId, date } = req.params;
    const existingBooking = await Booking.findOne({
      where: {
        RoomId: roomId,
        date,
      },
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Комната уже зарегистрирована на эту дату' });
    }

    const booking = await Booking.create({ RoomId: roomId, PersonId: personId, date });
    //console.log('Booking created successfully:', booking);
    res.json({ message: 'Комната успешно зарегистрирована.', booking });
  } catch (err) {
    //console.error('Error creating booking:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/api/v1/room/:roomId/date/:date', async (req, res) => {
  try {
    const { roomId, date } = req.params;
    const booking = await Booking.findOne({ 
      where: {
        RoomId: roomId,
        date,
      },
    });

    if (!booking) {
      return res.status(404).json({ message: 'На эту дату нет регистраций.' });
    }

    await booking.destroy();
    res.json({ message: 'Регистрация удалена.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;