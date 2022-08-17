import { Arg, Mutation, Resolver } from 'type-graphql'
import { RecipeIngredient, RecipeIngredientInput } from '../types'
import { RecipeIngredientRepository } from '../../database/repository'

@Resolver(() => RecipeIngredient)
export class RecipeIngredientResolver {
    repository: RecipeIngredientRepository
    constructor() {
        this.repository = new RecipeIngredientRepository()
    }

    /*@Query(() => [RecipeIngredient],
        {
            description: "Get recipeIngredient by id"
        })
    async getRecipeIngredientByIds(
        @Arg("ids",
            {
                description: "The id of the RecipeIngredient"
            })
        ids: String[]
    ): Promise<RecipeIngredient[]> {
        const recipeIngredient = await this.repository.getByIds(ids)
        return recipeIngredient
    }*/

    @Mutation(() => RecipeIngredient,
        {
            description: "Create an RecipeIngredient"
        })
    async createRecipeIngredient(
        @Arg("recipeIngredient",
            {
                description: "The object of the RecipeIngredient"
            })
        recipeIngredientInput: RecipeIngredientInput
    ): Promise<RecipeIngredient> {
        const recipeIngredient = await this.repository.create(recipeIngredientInput)
        return recipeIngredient
    }

    @Mutation(() => Boolean,
        {
            description: "update an recipeIngredient"
        })
    async updateRecipeIngredient(
        @Arg("id",
            {
                description: "The id of the recipeIngredient"
            })
        id: String,

        @Arg("recipeIngredient",
            {
                description: "The object of the recipeIngredient"
            })
        recipeIngredientInput: RecipeIngredientInput
    ): Promise<Boolean> {
        const success = await this.repository.update(id, recipeIngredientInput)
        return success
    }

    @Mutation(() => Boolean,
        {
            description: "delete an recipeIngredient"
        })
    async deleteRecipeIngredient(
        @Arg("id",
            {
                description: "The id of the recipeIngredient"
            })
        id: String
    ): Promise<Boolean> {
        const success = await this.repository.delete(id)
        return success
    }
}