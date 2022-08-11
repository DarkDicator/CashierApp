import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let business
export default class BusinessDAO {
    static async injectDB(conn){
        if (business){
            return
        }
        try{
            business = await conn.db(process.env.BUSINESS_NS).collection("Business")                 
        } catch (e){
            console.error(`Unable to establish a collection handle in businessDAO ${e}`)
        }
    }

    static async getBusiness(email){
        try{
            return business.findOne({email: email})
        }catch(e){  
            console.error(`Unable to get Business ${e}`)
        }
    }

    static async addBusiness(name, email, pass, income){
        try{
            const businessDoc = {
                name : name,
                email: email,
                pass: pass,
                income : income
            }
            return await business.insertOne(businessDoc)
        }catch(e){
            console.error(`unable to post Business ${e}`)
        }
    }

    static async updateIncome(id, income){
        try{
            const updateResponse = await business.updateOne(
                {_id: ObjectId(id)},
                {$set: {income: income}}
            )
            return updateResponse
        }catch (e){
            console.error(`unable to update item ${e}`)
            return {error: e}
        }
    }

    static async login(body){
        try{
            const {email, pass} = body
            console.log(body)
            const businessResponse = await business.findOne({email:email})
            if (businessResponse) {  
                // console.log(business.pass)                 
                // console.log(pass)
                
                if (businessResponse.pass === pass){                        
                    //console.log(business)
                    console.log(businessResponse)
                    return {message:"Login Success", business: businessResponse}
                }else{
                    return {message: "Wrong Credentials"}
                }
            }
        }catch(e){  
            console.error(`Unable to get Business ${e}`)
        }
    }
}