import { ObjectType, InputType, Field, ID } from "type-graphql";

@ObjectType()
export class Step {
    @Field(() => ID,
        {
            description: "The id of the step"
        })
    id!: String

    @Field(() => String,
        {
            description: "The name of the step"
        })
    description!: string

    @Field(() => ID,
        {
            description: "The recipe id of the Step"
        })
    recipeId!: string
}

@InputType()
export class StepInput {
    @Field(() => String,
        {
            description: "The name of the step"
        })
    description!: string

    @Field(() => ID,
        {
            description: "The recipe id of the Step"
        })
    recipeId!: string
}