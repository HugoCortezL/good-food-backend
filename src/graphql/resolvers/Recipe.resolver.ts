import { Arg, Mutation, Resolver, Query } from 'type-graphql'
import { Recipe, RecipeInput } from '../types'
import { RecipeRepository, RecipeIngredientRepository } from '../../database/repository'

@Resolver(() => Recipe)
export class RecipeResolver {
    repository: RecipeRepository
    recipeIngredientRepository: RecipeIngredientRepository
    constructor() {
        this.repository = new RecipeRepository(),
        this.recipeIngredientRepository = new RecipeIngredientRepository()
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
        const recipe:Recipe = await this.repository.getById(id)
        const ingredients = await this.recipeIngredientRepository.getByIds(recipe.ingredients)
        recipe.ingredients = ingredients
        console.log(ingredients)
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
            description: "Update a recipe"
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
            description: "Favorite a recipe"
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
            description: "Delete a recipe"
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