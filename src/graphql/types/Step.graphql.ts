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
}

@InputType()
export class StepInput {
    @Field(() => String,
        {
            description: "The name of the step"
        })
    description!: string
}