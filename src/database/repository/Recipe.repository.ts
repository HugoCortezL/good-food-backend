import recipeModel from '../models/Recipe'
import { Recipe, RecipeInput, RecipeView } from '../../graphql/types'

import { StepRepository, RecipeIngredientRepository } from './'
export class RecipeRepository {
    stepRepository: StepRepository
    recipeIngredientRepository: RecipeIngredientRepository
    constructor() {
        this.stepRepository = new StepRepository()
        this.recipeIngredientRepository = new RecipeIngredientRepository()
    }

    async getAll(): Promise<Recipe[]> {
        const recipes = await recipeModel.find()
            .populate("principalTag")
            .populate("generalTags")
        return (recipes as unknown as Recipe[])
    }

    async existsByPrincipalTag(principalTagId: String): Promise<Recipe> {
        const recipe = await recipeModel.findOne({ principalTag: principalTagId })
        return (recipe as unknown as Recipe)
    }

    async getById(id: String): Promise<RecipeView> {
        const recipe = await recipeModel.findOne({ _id: id })
            .populate("principalTag")
            .populate("generalTags")
        return (recipe as unknown as RecipeView)
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
                principalTag: item.principalTag,
                generalTags: item.generalTags
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
        const stepsResult = await this.stepRepository.deleteByRecipeId(id)
        const ingredientsResult = await this.recipeIngredientRepository.deleteByRecipeId(id)
        const success = await recipeModel.deleteOne({ _id: id })
        return success.acknowledged && stepsResult && ingredientsResult
    }

    async addGeneralTagToRecipe(recipeId: String, tagId: string): Promise<Boolean> {
        const recipe = await recipeModel.findOne({_id: recipeId})
        if(recipe){
            const generalTags = [...(recipe as unknown as RecipeView).generalTags, tagId]
            const success = await recipeModel.updateOne({ _id: recipeId }, {
                $set: {
                    generalTags: generalTags
                }
            })
            return success.acknowledged            
        }
        return false

    }

}