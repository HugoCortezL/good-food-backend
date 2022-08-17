import { ObjectType, InputType, Field, ID } from "type-graphql";
import { Step } from './index'
@ObjectType()
export class Recipe {
    @Field(() => ID,
        {
            description: "The id of the recipe"
        })
    id!: String

    @Field(() => String,
        {
            description: "The name of the recipe"
        })
    name!: string

    @Field(() => Number,
        {
            description: "The time in minutes to do the recipe"
        })
    time!: number

    @Field(() => Number,
        {
            description: "How many people the recipe serving"
        })
    servings!: number

    @Field(() => String,
        {
            description: "Image url of the recipe"
        })
    imageUrl!: string

    @Field(() => Number,
        {
            description: "The rate of the recipe"
        })
    rate!: number

    @Field(() => Number,
        {
            description: "The difficulty of the recipe"
        })
    difficulty!: number

    @Field(() => [Step],
        {
            description: "The difficulty of the recipe"
        })
    steps!: Step[]
}

@InputType()
export class RecipeInput {
    @Field(() => String,
        {
            description: "The name of the recipe"
        })
    name!: string

    @Field(() => Number,
        {
            description: "The time in minutes to do the recipe"
        })
    time!: number

    @Field(() => Number,
        {
            description: "How many people the recipe serving"
        })
    servings!: number

    @Field(() => String,
        {
            description: "Image url of the recipe"
        })
    imageUrl!: string

    @Field(() => Number,
        {
            description: "The rate of the recipe"
        })
    rate!: number

    @Field(() => Number,
        {
            description: "The difficulty of the recipe"
        })
    difficulty!: number

    @Field(() => [String],
        {
            description: "The difficulty of the recipe"
        })
    steps!: String[]
}