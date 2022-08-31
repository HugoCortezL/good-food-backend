import ingredientModel from '../models/Ingredient'
import { Ingredient, IngredientInput } from '../../graphql/types'

import { RecipeIngredientRepository } from './'
export class IngredientRepository {
    recipeIngredientRepository: RecipeIngredientRepository
    constructor() {
        this.recipeIngredientRepository = new RecipeIngredientRepository()
    }

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
        const hasRecipeWith = await this.recipeIngredientRepository.existsByIngredient(id)
        if (!hasRecipeWith) {
            const success = await ingredientModel.deleteOne({ _id: id })
            return success.acknowledged
        }
        return false
    }
}