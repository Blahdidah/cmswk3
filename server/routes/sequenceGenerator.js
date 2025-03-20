const Sequence = require('../models/sequence');
const mongoose = require('mongoose');

class SequenceGenerator {
  constructor() {
    this.sequenceId = null;
    this.maxDocumentId = 0;
    this.maxMessageId = 0;
    this.maxContactId = 0;
  }

  async init() {
    try {
      // Fetch the first sequence document explicitly using its _id
      const sequence = await Sequence.findOne({ _id: mongoose.Types.ObjectId('67db8478e6ef921163b71240') });

      if (!sequence) {
        throw new Error('No sequence document found! Make sure it exists in the database.');
      }

      console.log("Fetched Sequence:", sequence); // Logs the sequence to confirm it’s being fetched correctly

      // Set the maximum ids
      this.sequenceId = sequence._id;
      this.maxDocumentId = sequence.maxDocumentId;
      this.maxMessageId = sequence.maxMessageId;
      this.maxContactId = sequence.maxContactId;

    } catch (err) {
      console.error("Error in init:", err);
      throw err; // Optionally re-throw the error to propagate it further
    }
  }

  async nextId(collectionType) {
    let updateObject = {};
    let nextId;

    switch (collectionType) {
      case 'documents':
        this.maxDocumentId++;
        updateObject = { maxDocumentId: this.maxDocumentId };
        nextId = this.maxDocumentId;
        break;
      case 'messages':
        this.maxMessageId++;
        updateObject = { maxMessageId: this.maxMessageId };
        nextId = this.maxMessageId;
        break;
      case 'contacts':
        this.maxContactId++;
        updateObject = { maxContactId: this.maxContactId };
        nextId = this.maxContactId;
        break;
      default:
        return -1;
    }

    try {
      await Sequence.updateOne({ _id: this.sequenceId }, { $set: updateObject }).exec();
      return nextId;
    } catch (err) {
      console.error('nextId error:', err);
      return null;
    }
  }
}

module.exports = SequenceGenerator;