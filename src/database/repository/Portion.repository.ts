import portionModel from '../models/Portion'
import { Portion, PortionInput } from '../../graphql/types'

import { RecipeIngredientRepository } from './'
export class PortionRepository {
    recipeIngredientRepository: RecipeIngredientRepository
    constructor() {
        this.recipeIngredientRepository = new RecipeIngredientRepository()
    }

    async getAll(): Promise<Portion[]> {
        const portions = await portionModel.find()
        return (portions as unknown as Portion[])
    }

    async create(item: PortionInput): Promise<Portion> {
        const portion = await portionModel.create(item)
        return (portion as unknown as Portion)
    }

    async update(id: String, item: PortionInput): Promise<Boolean> {
        const success = await portionModel.updateOne({ _id: id }, { $set: { name: item.name } })
        return success.acknowledged
    }

    async delete(id: String): Promise<Boolean> {
        const hasRecipeWith = await this.recipeIngredientRepository.existsByPortion(id)
        if (!hasRecipeWith) {
            const success = await portionModel.deleteOne({ _id: id })
            return success.acknowledged
        }
        return false
        
    }
}