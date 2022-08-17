import ingredientModel from '../models/Ingredient'
import { Ingredient, IngredientInput } from '../../graphql/types'

export class IngredientRepository {

    async getAll(): Promise<Ingredient[]> {
        const ingredients = await ingredientModel.find()
        return (ingredients as unknown as Ingredient[])
    }

    async create(item: IngredientInput): Promise<Ingredient> {
        const ingredient = await ingredientModel.create(item)
        return (ingredient as unknown as Ingredient)
    }

    async update(id: String, item: IngredientInput): Promise<Boolean> {
        const success = await ingredientModel.updateOne({ _id: id }, { $set: { name: item.name } })
        return success.acknowledged
    }

    async delete(id: String): Promise<Boolean> {
        const success = await ingredientModel.deleteOne({ _id: id })
        return success.acknowledged
    }
}