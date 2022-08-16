import mongoose from 'mongoose'
import { Ingredient } from '../../graphql/types'

const ingredientSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true,
        lowercase: true
    }
})

export default mongoose.model<Ingredient>('Ingredient', ingredientSchema)