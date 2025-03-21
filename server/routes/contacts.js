var express = require('express');
var router = express.Router();
const Contact = require('../models/contact')
const SequenceGenerator = require('./sequenceGenerator');

var sequenceGenerator = new SequenceGenerator();

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().populate('group');  // Populate the 'group' field with full Contact objects
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching contacts", error: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findOne({ id: req.params.id }).populate('group');  // Populate the 'group' field for a specific contact
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ message: "Error fetching the contact", error: err });
    }
});

router.post('/', async (req, res) => {
    const { name, email, phone, group } = req.body;  // Assuming `group` is passed in the request body as an array of ObjectIds

    const nextContactId = sequenceGenerator.nextId('contacts');

    if (nextContactId === -1) {
        return res.status(400).json({ message: 'Error generating ID for the contact' });
    }

    const newContact = new Contact({
        id: nextContactId,
        name,
        email,
        phone,
        group  // Set the group reference to the passed ObjectId array
    });

    try {
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        res.status(400).json({ message: "Error creating contact", error: err });
    }
});

// Update an existing contact
router.put('/:id', async (req, res) => {
    try {
        const contact = await Contact.findOne({ id: req.params.id });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.group = req.body.group;  // Update the group references if provided

        await Contact.updateOne({ id: req.params.id }, contact);
        res.status(204).json({ message: 'Contact updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact', error: error });
    }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findOneAndDelete({ id: req.params.id });
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ message: "Error deleting contact", error: err });
    }
});

module.exports = router;