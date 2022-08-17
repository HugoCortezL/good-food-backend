import { ObjectType, InputType, Field, ID } from "type-graphql";

@ObjectType()
export class Tag {
    @Field(() => ID,
        {
            description: "The id of the tag"
        })
    id: String

    @Field(() => String,
        {
            description: "The description of the tag"
        })
    name!: string
    
    @Field(() => String,
        {
            description: "The description of the tag"
        })
    color!: string
}

@InputType()
export class TagInput {
    @Field(() => String,
        {
            description: "The description of the tag"
        })
    name!: string
    
    @Field(() => String,
        {
            description: "The description of the tag"
        })
    color!: string
}