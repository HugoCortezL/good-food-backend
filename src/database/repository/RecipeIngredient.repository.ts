import recipeIngredientModel from '../models/RecipeIngredient'
import { RecipeIngredient, RecipeIngredientInput } from '../../graphql/types'

export class RecipeIngredientRepository {

    async getAllByRecipeId(recipeId: String): Promise<RecipeIngredient[]> {
        const recipeIngredients = await recipeIngredientModel.find({recipeId: recipeId})
            .populate("portion")
            .populate("ingredient")
        return (recipeIngredients as unknown as RecipeIngredient[])
    }

    async existsByIngredient(ingredientId: String): Promise<RecipeIngredient> {
        const recipeIngredient = await recipeIngredientModel.findOne({ ingredient: ingredientId })
        return (recipeIngredient as unknown as RecipeIngredient)
    }
    
    async existsByPortion(portionId: String): Promise<RecipeIngredient> {
        const recipePortion = await recipeIngredientModel.findOne({ portion: portionId })
        return (recipePortion as unknown as RecipeIngredient)
    }

    async create(item: RecipeIngredientInput): Promise<RecipeIngredient> {
        const recipeIngredients = await recipeIngredientModel.create(item)
        return (recipeIngredients as unknown as RecipeIngredient)
    }

    async update(id: String, item: RecipeIngredientInput): Promise<Boolean> {
        const success = await recipeIngredientModel.updateOne({ _id: id },
            {
                $set: {
                    quantity: item.quantity,
                    portion: item.portion,
                    ingredient: item.ingredient,
                    recipeId: item.recipeId
                }
            })
        return success.acknowledged
    }

    async delete(id: String): Promise<Boolean> {
        const success = await recipeIngredientModel.deleteOne({ _id: id })
        return success.acknowledged
    }
}