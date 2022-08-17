import mongoose from 'mongoose'
import { Recipe } from '../../graphql/types'

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true,
        min: 1
    },
    servings: {
        type: Number,
        required: true,
        min: 1
    },
    imageUrl: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 3
    },
    favorite: {
        type: Boolean,
        default: false,
        required: true,
    },
    steps: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Step"
        }
    ],
    principalTag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    },
    generalTags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }
    ],
    ingredients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RecipeIngredient"
        }
    ]


})

export default mongoose.model<Recipe>('Recipe', recipeSchema)