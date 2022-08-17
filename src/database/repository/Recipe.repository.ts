import recipeModel from '../models/Recipe'
import { Recipe, RecipeInput } from '../../graphql/types'

export class RecipeRepository {

    async getAll(): Promise<Recipe[]> {
        const recipes = await recipeModel.find().populate("steps")
        return (recipes as unknown as Recipe[])
    }

    async getById(id: String): Promise<Recipe> {
        const recipe = await recipeModel.findOne({ _id: id }).populate("steps")
        return (recipe as unknown as Recipe)
    }

    async create(item: RecipeInput): Promise<Recipe> {
        const recipe = await recipeModel.create(item)
        return (recipe as unknown as Recipe)
    }

    async update(id: String, item: RecipeInput): Promise<Boolean> {
        const success = await recipeModel.updateOne({ _id: id }, {
            $set: {
                name: item.name,
                time: item.time,
                servings: item.servings,
                imageUrl: item.imageUrl,
                rate: item.rate,
                difficulty: item.difficulty,
                steps: item.steps
            }
        })
        return success.acknowledged
    }

    async delete(id: String): Promise<Boolean> {
        const success = await recipeModel.deleteOne({ _id: id })
        return success.acknowledged
    }
}