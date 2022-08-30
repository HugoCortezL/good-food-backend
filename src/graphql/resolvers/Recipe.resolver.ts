import { Arg, Mutation, Resolver, Query } from 'type-graphql'
import { Recipe, RecipeInput, RecipeView } from '../types'
import { RecipeRepository, RecipeIngredientRepository, StepRepository } from '../../database/repository'

@Resolver(() => Recipe)
export class RecipeResolver {
    repository: RecipeRepository
    recipeIngredientRepository: RecipeIngredientRepository
    stepRepository: StepRepository

    constructor() {
        this.repository = new RecipeRepository(),
        this.recipeIngredientRepository = new RecipeIngredientRepository()
        this.stepRepository = new StepRepository()
    }

    @Query(() => [Recipe],
        {
            description: "Get all recipes"
        })
    async getAllRecipes(): Promise<Recipe[]> {
        const recipes = await this.repository.getAll()
        return recipes
    }

    @Query(() => RecipeView,
        {
            description: "Get recipe by id"
        })
    async getRecipeById(
        @Arg("id",
            {
                description: "The id of the recipe"
            })
        id: String
    ): Promise<RecipeView> {
        const recipe:RecipeView = await this.repository.getById(id)
        const ingredients = await this.recipeIngredientRepository.getAllByRecipeId(id)
        const steps = await this.stepRepository.getAllByRecipeId(id)
        recipe.ingredients = ingredients
        recipe.steps = steps
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