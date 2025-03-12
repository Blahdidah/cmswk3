var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ message: 'GET all contacts' });
});

router.get('/:id', (req, res, next) => {
    res.json({ message: `GET contact with ID: ${req.params.id}` });
});

router.post('/', (req, res, next) => {
    res.json({ message: 'POST new contact', data: req.body });
});

router.put('/', (req, res, next) => {
    res.json({ message: `PUT update contact with ID: ${req.params.id}`, data: req.body });
});

router.delete('/:id', (req, res) => {
    res.json({ message: `DELETE contact with ID: ${req.params.id}` });
});

module.exports = router;