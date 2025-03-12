var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'GET all messages' });
});

router.get('/:id', (req, res) => {
    res.json({ message: `GET message with ID: ${req.params.id}` });
});

router.post('/', (req, res) => {
    res.json({ message: 'POST new message', data: req.body });
});

router.put('/:id', (req, res) => {
    res.json({ message: `PUT update message with ID: ${req.params.id}`, data: req.body });
});

router.delete('/:id', (req, res) => {
    res.json({ message: `DELETE message with ID: ${req.params.id}` });
});

module.exports = router;