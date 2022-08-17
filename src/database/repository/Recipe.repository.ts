import recipeModel from '../models/Recipe'
import { Recipe, RecipeInput } from '../../graphql/types'

export class RecipeRepository {

    async getAll(): Promise<Recipe[]> {
        const recipes = await recipeModel.find()
            .populate("steps")
            .populate("principalTag")
            .populate("generalTags")
        return (recipes as unknown as Recipe[])
    }

    async getById(id: String): Promise<Recipe> {
        const recipe = await recipeModel.findOne({ _id: id })
            .populate("steps")
            .populate("principalTag")
            .populate("generalTags")
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
                steps: item.steps,
                principalTag: item.principalTag,
                generalTags: item.generalTags,
                ingredients: item.ingredients
            }
        })
        return success.acknowledged
    }

    async favorite(id: String): Promise<Boolean> {
        const recipeToEdit = await this.getById(id)
        const sucessToEdit = await recipeModel.updateOne({ _id: id }, {
            $set: {
                favorite: !recipeToEdit.favorite
            }
        })
        return sucessToEdit.acknowledged
    }

    async delete(id: String): Promise<Boolean> {
        const success = await recipeModel.deleteOne({ _id: id })
        return success.acknowledged
    }
}