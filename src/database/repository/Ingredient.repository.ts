import ingredientSchema from '../models/Ingredient'
import { Ingredient, IngredientInput } from '../../graphql/types'

export class IngredientRepository {

    async getAll(): Promise<Ingredient> {
        const ingredients = await ingredientSchema.find()
        return (ingredients as unknown as Ingredient)
    }

    async create(item: IngredientInput): Promise<Ingredient> {
        const ingredients = await ingredientSchema.create(item)
        return (ingredients as unknown as Ingredient)
    }

    async update(id: String, item: IngredientInput): Promise<Boolean> {
        const success = await ingredientSchema.updateOne({ _id: id }, { $set: { name: item.name } })
        return success.acknowledged
    }

    async delete(id: String): Promise<Boolean> {
        const success = await ingredientSchema.deleteOne({ _id: id })
        return success.acknowledged
    }
}