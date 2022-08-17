import { Arg, Mutation, Resolver, Query } from 'type-graphql'
import { Tag, TagInput } from '../types'
import { TagRepository } from '../../database/repository'

@Resolver(() => Tag)
export class TagResolver {
    repository: TagRepository
    constructor() {
        this.repository = new TagRepository()
    }

    @Query(() => [Tag],
        {
            description: "Get all tags"
        })
    async getAllTags(): Promise<Tag[]> {
        const tags = await this.repository.getAll()
        return tags
    }

    @Mutation(() => Tag,
        {
            description: "Create an tag"
        })
    async createTag(
        @Arg("tag",
            {
                description: "The object of the tag"
            })
        tagInput: TagInput
    ): Promise<Tag> {
        const tag = await this.repository.create(tagInput)
        return tag
    }

    @Mutation(() => Boolean,
        {
            description: "update an tag"
        })
    async updateTag(
        @Arg("id",
            {
                description: "The id of the tag"
            })
        id: String,

        @Arg("tag",
            {
                description: "The object of the tag"
            })
        tagInput: TagInput
    ): Promise<Boolean> {
        const success = await this.repository.update(id, tagInput)
        return success
    }

    @Mutation(() => Boolean,
        {
            description: "delete an tag"
        })
    async deleteTag(
        @Arg("id",
            {
                description: "The id of the tag"
            })
        id: String
    ): Promise<Boolean> {
        const success = await this.repository.delete(id)
        return success
    }
}