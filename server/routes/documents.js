var express = require('express');
var router = express.Router();
const SequenceGenerator = require('./sequenceGenerator');

// Sample response for documents route
router.get('/', (req, res, next) => {
    res.json({ message: 'GET all documents' });
});

router.get(':/id', (req, res) => {
    res.json({ message: `GET document with ID: ${req.params.id}` })
});

router.post('/', (req, res, next) => {
    const newId = SequenceGenerator.nextId('documents');

    const document = new Document({
        id: newId.toString(),
        name: req.body.name,
        url: req.body.url,
        description: req.body.description
    });

    document.save()
        .then(createdDocument => {
            res.status(201).json({
                message: 'Document added successfully',
                newDocument: createdDocument
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a document failed!',
                error: error
            });
        });
});

router.put('/:id', (req, res) => {
    res.json({ message: `PUT update document with ID: ${req.params.id}`, data: req.body });
});

router.delete('/:id', (req, res) => {
    res.json({ message: `DELETE document with ID: ${req.params.id}` });
});

module.exports = router;