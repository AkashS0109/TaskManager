import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started',
    },
    ProjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
