var express = require('express');
var router = express.Router();
const Document = require('../models/document');
const SequenceGenerator = require('./sequenceGenerator');

var sequenceGenerator = new SequenceGenerator

router.get('/', async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (err) {
        res.status(500).json({ message: "Error fetching documents", error: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(document);
    } catch (err) {
        res.status(500).json({ message: "Error fetching the document", error: err });
    }
});

router.post('/', async (req, res) => {
    const { name, url, description } = req.body;

    const nextDocumentId = sequenceGenerator.nextId('documents');
    
    if (nextDocumentId === -1) {
        return res.status(400).json({ message: 'Error generating ID for the document' });
    }
    const newDocument = new Document({
        id: nextDocumentId,
        name,
        url,
        description
    });
    try {
        const savedDocument = await newDocument.save();
        res.status(201).json(savedDocument);
    } catch (err) {
        res.status(400).json({ message: "Error creating document", error: err });
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const document = await Document.findOne({ id: req.params.id });
        if (!document) {
            return res.status(404).json({ message: 'Document not found.' });
        }

        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;

        await Document.updateOne({ id: req.params.id }, document);
        res.status(204).json({ message: 'Document updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating document', error: error });
    }
});

router.delete('/:id',  async (req, res) => {
    try {
        const deletedDocument = await Document.findByIdAndDelete(req.params.id);
        if (!deletedDocument) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'Document deleted' });
    } catch (err) {
        res.status(500).json({ message: "Error deleting document", error: err });
   }
});

module.exports = router;