import tagModel from '../models/Tag'
import { Tag, TagInput } from '../../graphql/types'

import {RecipeRepository} from './'

export class TagRepository {
    recipeRepository: RecipeRepository
    constructor(){
        this.recipeRepository = new RecipeRepository()
    }

    async getAll(): Promise<Tag[]> {
        const tags = await tagModel.find()
        return (tags as unknown as Tag[])
    }

    async create(item: TagInput): Promise<Tag> {
        const tag = await tagModel.create(item)
        return (tag as unknown as Tag)
    }

    async update(id: String, item: TagInput): Promise<Boolean> {
        const success = await tagModel.updateOne({ _id: id }, { $set: { name: item.name, color: item.color } })
        return success.acknowledged
    }

    async delete(id: String): Promise<Boolean> {
        const hasRecipeWith = await this.recipeRepository.existsByPrincipalTag(id)
        if(!hasRecipeWith){
            const success = await tagModel.deleteOne({ _id: id })
            return success.acknowledged
        }
        return false
    }
}