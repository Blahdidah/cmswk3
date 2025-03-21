const Sequence = require('../models/sequence');
const mongoose = require('mongoose');

class SequenceGenerator {
  constructor() {
    this.sequenceId = null;
    this.maxDocumentId = 0;
    this.maxMessageId = 0;
    this.maxContactId = 0;
  }

  // Initialize the sequence generator
  async init() {
    try {
      // Fetch the sequence document from the database
      const sequence = await Sequence.findOne({ _id: new mongoose.Types.ObjectId('67db8478e6ef921163b71240') });

      console.log("Fetched sequence:", sequence);

      if (!sequence) {
        console.log("Sequence document not found, initializing...");
        throw new Error('No sequence document found! Make sure it exists in the database.');
      }

      // Initialize the sequence values
      this.sequenceId = sequence._id;
      this.maxDocumentId = sequence.maxDocumentId || 200;
      this.maxMessageId = sequence.maxMessageId || 201;
      this.maxContactId = sequence.maxContactId || 201;

      console.log("Sequence initialized with values:");
      console.log(`maxDocumentId: ${this.maxDocumentId}`);
      console.log(`maxMessageId: ${this.maxMessageId}`);
      console.log(`maxContactId: ${this.maxContactId}`);
      console.log(`Sequence ID after initialization: ${this.sequenceId}`);  // Add this line to check

    } catch (err) {
      console.error("Error in init:", err);
      throw err;
    }
  }

  // Generate next ID for the specified collection type
  async nextId(collectionType) {
    if (!this.sequenceId) {
      console.error("Sequence ID not initialized. Calling init...");
      await this.init();
    }

    console.log(`Generating next ID for ${collectionType}...`);
    let updateObject = {};
    let nextId;

    switch (collectionType) {
      case 'documents':
        this.maxDocumentId++;
        updateObject = { maxDocumentId: this.maxDocumentId };
        nextId = this.maxDocumentId;
        console.log(`Next document ID: ${nextId}`);
        break;
      case 'messages':
        this.maxMessageId++;
        updateObject = { maxMessageId: this.maxMessageId };
        nextId = this.maxMessageId;
        console.log(`Next message ID: ${nextId}`);
        break;
      case 'contacts':
        this.maxContactId++;
        updateObject = { maxContactId: this.maxContactId };
        nextId = this.maxContactId;
        console.log(`Next contact ID: ${nextId}`);
        break;
      default:
        console.log("Invalid collection type, returning -1.");
        return -1;
    }

    console.log("Sequence ID before update:", this.sequenceId);
    console.log("Sequence Generator instance:", this);

    try {
      console.log(`Updating sequence with new ID for ${collectionType}:`, updateObject);
      const updateResult = await Sequence.updateOne({ _id: this.sequenceId }, { $set: updateObject }).exec();
      if (updateResult.nModified === 0) {
        console.error('No document was updated.');
      }
      console.log(`Updated ${collectionType} ID to:`, nextId);
      return nextId;
    } catch (err) {
      console.error('nextId error:', err);
      return null;
    }
  }
}

module.exports = SequenceGenerator;
