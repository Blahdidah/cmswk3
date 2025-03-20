const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    id: { type: String, required: true },
    maxDocumentId: { type: Number, required: true },
    maxMessageId: { type: Number, required: true },
    maxContactId: { type: Number, required: true }
});

module.exports = mongoose.model('Sequence', sequenceSchema, 'sequences');
