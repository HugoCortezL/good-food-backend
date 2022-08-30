import { ObjectType, InputType, Field, ID } from "type-graphql";
import { Portion, Ingredient } from './index'

@ObjectType()
export class RecipeIngredient {
    @Field(() => ID,
        {
            description: "The id of the RecipeIngredient"
        })
    id!: String

    @Field(() => String,
        {
            description: "The name of the RecipeIngredient"
        })
    quantity!: string
    
    @Field(() => Portion,
        {
            description: "The name of the RecipeIngredient"
        })
    portion!: Portion
    
    @Field(() => Ingredient,
        {
            description: "The name of the RecipeIngredient"
        })
    ingredient!: Ingredient

    @Field(() => ID,
        {
            description: "The recipe id of the RecipeIngredient"
        })
    recipeId!: string
}

@InputType()
export class RecipeIngredientInput {
    @Field(() => String,
        {
            description: "The name of the RecipeIngredient"
        })
    quantity!: string
    
    @Field(() => ID,
        {
            description: "The name of the RecipeIngredient"
        })
    portion!: String
    
    @Field(() => ID,
        {
            description: "The name of the RecipeIngredient"
        })
    ingredient!: String

    @Field(() => ID,
        {
            description: "The recipe id of the RecipeIngredient"
        })
    recipeId!: string
}