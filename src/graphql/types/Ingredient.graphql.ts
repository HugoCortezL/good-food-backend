import { ObjectType, InputType, Field, ID} from "type-graphql";

@ObjectType()
export class Ingredient {
    @Field(() => ID, 
    {
        description: "The id of the ingredient"
    })
    id: String
    
    @Field(() => String, 
    {
        description: "The description of the ingredient"
    })
    name!: string
}

@InputType()
export class IngredientInput {
    @Field(() => String, 
    {
        description: "The description of the ingredient"
    })
    name!: string
}