import { Arg, Mutation, Resolver, Query } from 'type-graphql'
import { Portion, PortionInput } from '../types'
import { PortionRepository } from '../../database/repository'

@Resolver(() => Portion)
export class PortionResolver {
    repository: PortionRepository
    constructor() {
        this.repository = new PortionRepository()
    }

    @Query(() => [Portion],
        {
            description: "Get all Portion"
        })
    async getAllPortions(): Promise<Portion[]> {
        const portions = await this.repository.getAll()
        return portions
    }

    @Mutation(() => Portion,
        {
            description: "Create a portion"
        })
    async createPortion(
        @Arg("portion",
            {
                description: "The object of the portion"
            })
        PortionInput: PortionInput
    ): Promise<Portion> {
        const portion = await this.repository.create(PortionInput)
        return portion
    }

    @Mutation(() => Boolean,
        {
            description: "Update a portion"
        })
    async updatePortion(
        @Arg("id",
            {
                description: "The id of the portion"
            })
        id: String,

        @Arg("portion",
            {
                description: "The object of the portion"
            })
            portionInput: PortionInput
    ): Promise<Boolean> {
        const success = await this.repository.update(id, portionInput)
        return success
    }

    @Mutation(() => Boolean,
        {
            description: "Delete a portion"
        })
    async deletePortion(
        @Arg("id",
            {
                description: "The id of the portion"
            })
        id: String
    ): Promise<Boolean> {
        const success = await this.repository.delete(id)
        return success
    }
}