import { Arg, Mutation, Resolver, Query } from 'type-graphql'
import { Ingredient, IngredientInput } from '../types'
import { IngredientRepository } from '../../database/repository'

@Resolver(() => Ingredient)
export class IngredientResolver {
    repository: IngredientRepository
    constructor() {
        this.repository = new IngredientRepository()
    }

    @Query(() => [Ingredient],
        {
            description: "Get all ingredients"
        })
    async getAllIngredients(): Promise<Ingredient[]> {
        const ingredients = await this.repository.getAll()
        return ingredients
    }

    @Mutation(() => Ingredient,
        {
            description: "Create an ingredient"
        })
    async createIngredient(
        @Arg("ingredient",
            {
                description: "The object of the ingredient"
            })
        ingredientInput: IngredientInput
    ): Promise<Ingredient> {
        const ingredient = await this.repository.create(ingredientInput)
        return ingredient
    }

    @Mutation(() => Boolean,
        {
            description: "Update an ingredient"
        })
    async updateIngredient(
        @Arg("id",
            {
                description: "The id of the ingredient"
            })
        id: String,

        @Arg("ingredient",
            {
                description: "The object of the ingredient"
            })
        ingredientInput: IngredientInput
    ): Promise<Boolean> {
        const success = await this.repository.update(id, ingredientInput)
        return success
    }

    @Mutation(() => Boolean,
        {
            description: "Delete an ingredient"
        })
    async deleteIngredient(
        @Arg("id",
            {
                description: "The id of the ingredient"
            })
        id: String
    ): Promise<Boolean> {
        const success = await this.repository.delete(id)
        return success
    }
}