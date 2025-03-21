var express = require('express');
var router = express.Router();
const Message = require('../models/message')
const Contact = require('../models/contact')
const SequenceGenerator = require('./sequenceGenerator');

var sequenceGenerator = new SequenceGenerator();

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().lean();

        try {
            const contacts = await Contact.find();

            messages.forEach(message => {
                const senderContact = contacts.find(contact => contact.id === message.sender);
                if (senderContact) {
                    message.sender = senderContact;
                }
            });

            res.status(200).json(messages);
        } catch (err) {
            console.error("Error fetching contacts:", err);
            res.status(500).json({ message: "Error fetching contacts", error: err });
        }

    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ message: "Error fetching messages", error: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const message = await Message.findOne({id: req.params.id });
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({ message: "Error fetching the message", error: err });
    }
});

router.post('/', async (req, res) => {
    const { subject, msgText, sender } = req.body;

    // Get the next ID for the messages collection
    const nextMessageId = sequenceGenerator.nextId('messages');

    if (nextMessageId === -1) {
        return res.status(400).json({ message: 'Error generating ID for the message' });
    }

    const newMessage = new Message({
        id: nextMessageId,  // Assign the generated ID
        subject,
        msgText,
        sender
    });

    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(400).json({ message: "Error creating message", error: err });
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const message = await Message.findOne({ id: req.params.id });
        if (!message) {
            return res.status(404).json({ message: 'Message not found.' });
        }

        message.subject = req.body.subject;
        message.msgText = req.body.msgText;
        message.sender = req.body.sender;

        await Message.updateOne({ id: req.params.id }, message);
        res.status(204).json({ message: 'Message updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating message', error: error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete({ id: req.params.id });
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ message: "Error deleting message", error: err });
    }
});

module.exports = router;