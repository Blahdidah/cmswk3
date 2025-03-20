var express = require('express');
var router = express.Router();
const SequenceGenerator = require('./sequenceGenerator');

router.get('/', (req, res) => {
    res.json({ message: 'GET all messages' });
});

router.get('/:id', (req, res) => {
    res.json({ message: `GET message with ID: ${req.params.id}` });
});

router.post('/', (req, res) => {
    const newId = SequenceGenerator.nextId('messages');

    const message = new Message({
        id: newId.toString(),
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                newMessage: createdMessage
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a message failed!',
                error: error
            });
        });
});

router.put('/:id', (req, res) => {
    res.json({ message: `PUT update message with ID: ${req.params.id}`, data: req.body });
});

router.delete('/:id', (req, res) => {
    res.json({ message: `DELETE message with ID: ${req.params.id}` });
});

module.exports = router;