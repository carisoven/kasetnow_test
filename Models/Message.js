const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'conversations',
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
})

module.exports = Message = mongoose.model("message", MessageSchema);
