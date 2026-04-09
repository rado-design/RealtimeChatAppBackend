import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    participants: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['ADMIN', 'MEMBER'],
            default: 'MEMBER'
        }
    }],
    title: {
        type: String,
        trim: true
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
}, { timestamps: true });

export default mongoose.model('Conversation', conversationSchema);
