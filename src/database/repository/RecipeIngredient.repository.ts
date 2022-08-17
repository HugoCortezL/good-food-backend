import recipeIngredientModel from '../models/RecipeIngredient'
import { RecipeIngredient, RecipeIngredientInput } from '../../graphql/types'

export class RecipeIngredientRepository {

    async getByIds(ids: RecipeIngredient[]): Promise<RecipeIngredient[]> {
        const recipeIngredient = await recipeIngredientModel.find({_id : {$in : ids}}).populate("portion").populate("ingredient")
        return (recipeIngredient as unknown as RecipeIngredient[])
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
                    ingredient: item.ingredient
                }
            })
        return success.acknowledged
    }

    async delete(id: String): Promise<Boolean> {
        const success = await recipeIngredientModel.deleteOne({ _id: id })
        return success.acknowledged
    }

    async deleteMany(ids: String[]): Promise<Boolean> {
        const success = await recipeIngredientModel.deleteMany({ _id: { $in: ids } })
        return success.acknowledged
    }
}