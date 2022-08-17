import { Arg, Mutation, Resolver, Query } from 'type-graphql'
import { Recipe, RecipeInput } from '../types'
import { RecipeRepository } from '../../database/repository'

@Resolver(() => Recipe)
export class RecipeResolver {
    repository: RecipeRepository
    constructor() {
        this.repository = new RecipeRepository()
    }

    @Query(() => [Recipe],
        {
            description: "Get all recipes"
        })
    async getAllRecipes(): Promise<Recipe[]> {
        const recipes = await this.repository.getAll()
        return recipes
    }

    @Query(() => Recipe,
        {
            description: "Get recipe by id"
        })
    async getRecipeById(
        @Arg("id",
            {
                description: "The id of the recipe"
            })
        id: String
    ): Promise<Recipe> {
        const recipe = await this.repository.getById(id)
        return recipe
    }

    @Mutation(() => Recipe,
        {
            description: "Create a recipe"
        })
    async createRecipe(
        @Arg("recipe",
            {
                description: "The object of the recipe"
            })
        recipeInput: RecipeInput
    ): Promise<Recipe> {
        const recipe = await this.repository.create(recipeInput)
        return recipe
    }

    @Mutation(() => Boolean,
        {
            description: "update a recipe"
        })
    async updateRecipe(
        @Arg("id",
            {
                description: "The id of the recipe"
            })
        id: String,

        @Arg("recipe",
            {
                description: "The object of the recipe"
            })
        recipeInput: RecipeInput
    ): Promise<Boolean> {
        const success = await this.repository.update(id, recipeInput)
        return success
    }
    
    @Mutation(() => Boolean,
        {
            description: "favorite a recipe"
        })
    async favoriteRecipe(
        @Arg("id",
            {
                description: "The id of the recipe"
            })
        id: String
    ): Promise<Boolean> {
        const recipe = await this.repository.favorite(id)
        return recipe
    }

    @Mutation(() => Boolean,
        {
            description: "delete an recipe"
        })
    async deleteRecipe(
        @Arg("id",
            {
                description: "The id of the recipe"
            })
        id: String
    ): Promise<Boolean> {
        const success = await this.repository.delete(id)
        return success
    }
}