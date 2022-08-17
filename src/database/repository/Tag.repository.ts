import tagModel from '../models/Tag'
import { Tag, TagInput } from '../../graphql/types'

export class TagRepository {

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
        const success = await tagModel.deleteOne({ _id: id })
        return success.acknowledged
    }
}