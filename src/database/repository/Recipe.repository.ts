import recipeModel from '../models/Recipe'
import { Recipe, RecipeInput } from '../../graphql/types'

export class RecipeRepository {

    async getAll(): Promise<Recipe[]> {
        const recipes = await recipeModel.find()
        return (recipes as unknown as Recipe[])
    }

    async getById(id: String): Promise<Recipe> {
        const recipe = await recipeModel.findOne({ _id: id })
        return (recipe as unknown as Recipe)
    }

    async create(item: RecipeInput): Promise<Recipe> {
        const recipe = await recipeModel.create(item)
        return (recipe as unknown as Recipe)
    }

    async update(id: String, item: RecipeInput): Promise<Boolean> {
        const success = await recipeModel.updateOne({ _id: id }, { $set: { name: item.name } })
        return success.acknowledged
    }

    async delete(id: String): Promise<Boolean> {
        const success = await recipeModel.deleteOne({ _id: id })
        return success.acknowledged
    }
}