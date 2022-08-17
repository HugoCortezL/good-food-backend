import mongoose from 'mongoose'
import { Step } from '../../graphql/types'

const stepSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    }
})

export default mongoose.model<Step>('Step', stepSchema)