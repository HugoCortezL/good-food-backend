import ingredientSchema from '../models/Ingredient'
import { Ingredient, IngredientInput } from '../../graphql/types'

export class IngredientRepository{

    async getAll(): Promise<Ingredient> {
        const ingredients = await ingredientSchema.find()
        return (ingredients as unknown as Ingredient)
    }

    async create(item: IngredientInput): Promise<Ingredient> {
        console.log("Chegou no repository")
        const ingredients = await ingredientSchema.create(item)
        return (ingredients as unknown as Ingredient)
    }
}