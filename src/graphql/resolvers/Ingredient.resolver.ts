import { Arg, Mutation, Resolver, Query } from 'type-graphql'
import { Ingredient, IngredientInput } from '../types'
import { IngredientRepository } from '../../database/repository'

@Resolver(() => Ingredient)
export class IngredientResolver {
    repository: IngredientRepository
    constructor() { 
        this.repository = new IngredientRepository()
    }

    @Mutation(() => Ingredient,
        {
            description: "Create a ingredient"
        })
    async createIngredient(
        @Arg("ingredient",
            {
                description: "The object of the ingredient"
            })
        ingredientInput: IngredientInput
    ) {
        console.log(IngredientRepository)
        const ingredient = await this.repository.create(ingredientInput)
        return ingredient
    }

    @Query(() => [Ingredient],
        {
            description: "Get all ingredients"
        })
    async getAllIngredients() {
        const ingredients = await this.repository.getAll()
        return ingredients
    }
}