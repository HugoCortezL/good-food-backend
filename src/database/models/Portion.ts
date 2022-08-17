import mongoose from 'mongoose'
import { Portion } from '../../graphql/types'

const portionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model<Portion>('Portion', portionSchema)