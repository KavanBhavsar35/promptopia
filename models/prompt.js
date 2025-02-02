import { Schema, model, models } from 'mongoose';

const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required!']
    },
    tags: {
        type: [String],
        required: [true, 'Tags is required!']
    }
});

const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;