var express = require('express');
var router = express.Router();

// Sample response for documents route
router.get('/', (req, res, next) => {
    res.json({ message: 'GET all documents' });
});

router.get(':/id', (req, res) => {
    res.json({ message: `GET document with ID: ${req.params.id}` })
});

router.post('/', (req, res) => {
    res.json({ message: 'POST new document', data: req.body });
});

router.put('/:id', (req, res) => {
    res.json({ message: `PUT update document with ID: ${req.params.id}`, data: req.body });
});

router.delete('/:id', (req, res) => {
    res.json({ message: `DELETE document with ID: ${req.params.id}` });
});

module.exports = router;