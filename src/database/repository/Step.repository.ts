import stepModel from '../models/Step'
import { Step, StepInput } from '../../graphql/types'

export class StepRepository {

    async getAllByRecipeId(recipeId: String): Promise<Step[]> {
        const steps = await stepModel.find({recipeId: recipeId})
        return (steps as unknown as Step[])
    }

    async create(item: StepInput): Promise<Step> {
        const steps = await stepModel.create(item)
        return (steps as unknown as Step)
    }

    async update(id: String, item: StepInput): Promise<Boolean> {
        const success = await stepModel.updateOne({ _id: id }, 
            { $set: 
                { 
                    description: item.description,
                    recipeId: item.recipeId
                } 
            })
        return success.acknowledged
    }

    async delete(id: String): Promise<Boolean> {
        const success = await stepModel.deleteOne({ _id: id })
        return success.acknowledged
    }
}