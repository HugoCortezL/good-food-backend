import mongoose from 'mongoose'
import { RecipeIngredient } from '../../graphql/types'

const recipeIngredientSchema = new mongoose.Schema({
    quantity: {
        type: String,
        required: true
    },
    portion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portion"
    },
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient"
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
    }

})

export default mongoose.model<RecipeIngredient>('RecipeIngredient', recipeIngredientSchema)