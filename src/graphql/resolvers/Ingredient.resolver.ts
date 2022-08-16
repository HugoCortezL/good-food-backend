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
    async getAllIngredients() {
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
    ) {
        const ingredient = await this.repository.create(ingredientInput)
        return ingredient
    }

    @Mutation(() => Boolean,
        {
            description: "update an ingredient"
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
    ) {
        const success = await this.repository.update(id, ingredientInput)
        return success
    }
    
    @Mutation(() => Boolean,
        {
            description: "delete an ingredient"
        })
    async deleteIngredient(
        @Arg("id",
            {
                description: "The id of the ingredient"
            })
        id: String
    ) {
        const success = await this.repository.delete(id)
        return success
    }

    
}