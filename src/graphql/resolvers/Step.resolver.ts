import { Arg, Mutation, Resolver } from 'type-graphql'
import { Step, StepInput } from '../types'
import { StepRepository } from '../../database/repository'

@Resolver(() => Step)
export class StepResolver {
    repository: StepRepository
    constructor() {
        this.repository = new StepRepository()
    }

    @Mutation(() => Step,
        {
            description: "Create a step"
        })
    async createStep(
        @Arg("step",
            {
                description: "The object of the step"
            })
        stepInput: StepInput
    ): Promise<Step> {
        const step = await this.repository.create(stepInput)
        return step
    }

    @Mutation(() => Boolean,
        {
            description: "Update a step"
        })
    async updateStep(
        @Arg("id",
            {
                description: "The id of the step"
            })
        id: String,

        @Arg("step",
            {
                description: "The object of the step"
            })
        stepInput: StepInput
    ): Promise<Boolean> {
        const success = await this.repository.update(id, stepInput)
        return success
    }

    @Mutation(() => Boolean,
        {
            description: "Delete a step"
        })
    async deleteStep(
        @Arg("id",
            {
                description: "The id of the step"
            })
        id: String
    ): Promise<Boolean> {
        const success = await this.repository.delete(id)
        return success
    }
}