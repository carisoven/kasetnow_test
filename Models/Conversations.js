const mongoose = require("mongoose");

// Create Schema for Users
const ConversationSchema = new mongoose.Schema({
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  lastMessage: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = Conversation = mongoose.model(
  "conversations",
  ConversationSchema
);
