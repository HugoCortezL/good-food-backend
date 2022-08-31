import { RecipeIngredient, Step, Tag } from "./index";
import { ObjectType, InputType, Field, ID } from "type-graphql";
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

    @Field(() => Boolean,
        {
            description: "if the recipe is favorite"
        })
    favorite!: boolean

    @Field(() => ID,
        {
            description: "The principal tag of the recipe"
        })
    principalTag!: String
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

    @Field(() => Boolean,
        {
            description: "The difficulty of the recipe",
            nullable: true
        })
    favorite!: boolean

    @Field(() => ID,
        {
            description: "The principal tag of the recipe"
        })
    principalTag: String

    @Field(() => [ID],
        {
            description: "The general tags of the recipe",
            nullable: true
        })
    generalTags: String[]
}

@ObjectType()
export class RecipeView {
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

    @Field(() => Boolean,
        {
            description: "The difficulty of the recipe"
        })
    favorite!: boolean

    @Field(() => Tag,
        {
            description: "The principal tag of the recipe"
        })
    principalTag: Tag

    @Field(() => [Tag],
        {
            description: "The general tags of the recipe",
            nullable: true
        })
    generalTags: Tag[]

    @Field(() => [RecipeIngredient],
        {
            description: "The general tags of the recipe",
            nullable: true
        })
    ingredients: RecipeIngredient[]

    @Field(() => [Step],
        {
            description: "The general tags of the recipe",
            nullable: true
        })
    steps: Step[]
}