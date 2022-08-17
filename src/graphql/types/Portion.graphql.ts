import { ObjectType, InputType, Field, ID } from "type-graphql";

@ObjectType()
export class Portion {
    @Field(() => ID,
        {
            description: "The id of the portion"
        })
    id!: String

    @Field(() => String,
        {
            description: "The name of the portion"
        })
    name!: string
}

@InputType()
export class PortionInput {
    @Field(() => String,
        {
            description: "The name of the portion"
        })
    name!: string
}