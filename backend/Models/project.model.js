import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;
