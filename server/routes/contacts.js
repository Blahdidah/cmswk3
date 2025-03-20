var express = require('express');
var router = express.Router();
const SequenceGenerator = require('./sequenceGenerator');

router.get('/', (req, res, next) => {
    res.json({ message: 'GET all contacts' });
});

router.get('/:id', (req, res, next) => {
    res.json({ message: `GET contact with ID: ${req.params.id}` });
});

router.post('/', (req, res, next) => {
    const newId = SequenceGenerator.nextId('contacts');

    const contact = new Contact({
        id: newId.toString(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    contact.save()
        .then(createdContact => {
            res.status(201).json({
                message: 'Contact added successfully',
                newContact: createdContact
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a contact failed!',
                error: error
            });
        });
});

router.put('/', (req, res, next) => {
    res.json({ message: `PUT update contact with ID: ${req.params.id}`, data: req.body });
});

router.delete('/:id', (req, res) => {
    res.json({ message: `DELETE contact with ID: ${req.params.id}` });
});

module.exports = router;