import mongoose from 'mongoose'
import { Tag } from '../../graphql/types'

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    color: {
        type: String,
        required: true,
        uppercase: true,
        min: 7,
        max: 7
    },
})

export default mongoose.model<Tag>('Tag', tagSchema)