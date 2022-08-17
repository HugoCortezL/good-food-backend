import "reflect-metadata"
import { ApolloServer } from 'apollo-server'
import "./database/connection"
import { buildSchema } from 'type-graphql'
import { IngredientResolver, RecipeResolver, StepResolver, TagResolver, PortionResolver, RecipeIngredientResolver } from './graphql/resolvers'

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [IngredientResolver, RecipeResolver, StepResolver, TagResolver, PortionResolver, RecipeIngredientResolver]
    })
    const server = new ApolloServer({
        schema
    })
    server.listen({ port: 4000 }, console.log("Server is running"))
}

bootstrap()