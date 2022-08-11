import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let item

export default class ItemDAO{
    static async injectDB(conn){
        if (item){
            return
        }
        try{
            item = await conn.db(process.env.BUSINESS_NS).collection("items")
        }catch(e){
            console.error(`Unable to establish a collection handle in itemDAO ${e}`)
        }

    }

    static async getItem({
        filters = null,
        page = 0,
        itemPerPage = 20
    } = {}){
        let query
        console.log(filters)
        if (filters){
            if ("businessId" in filters){
                query = {"businessId": {$eq: ObjectId(filters["businessId"])}}
                console.log("query set")
            }
        }

        let cursor

        try{
            cursor = await item.find(query)            
        }catch(e){
            console.error(`unable to issue command ${e}`)
            return {itemList: [], totalNumItems: 0}
        }

        const displayCursor = cursor.limit(itemPerPage).skip(itemPerPage * page)
        try{
            const itemList = await displayCursor.toArray()
            const totalNumItems = await item.countDocuments(query)
                        
            return {itemList, totalNumItems}
        }catch (e){
            console.error(`Unable to convert cursor to Array or problem countig documents ${e}`)
        }
        return {itemList: [], totalNumItems: 0}
    }

    static async getBusiness(id){
        try{
            return business.findOne({id: ObjectId(id)})
        }catch(e){
            console.error(`Unable to get Business ${e}`)
        }
    }

    static async addItem(name, price, businessId){
        try{
            const itemDoc = {
                name: name,
                price: price,
                businessId: ObjectId(businessId)
            }
            return await item.insertOne(itemDoc)
        }catch (e){
            console.error(`unable to post item ${e}`)
        }
    }

    static async updateItem(itemId, name, price){
        try{
            const updateResponse = await item.updateOne(
                {_id: ObjectId(itemId)},
                {$set: {name: name, price: price}}
            )

            return updateResponse
        }catch (e){
            console.error(`unable to update item ${e}`)
            return {error: e}
        }
    }

    static async deleteItem(id){
        try{
            console.log(id)
            const deleteResponse = await item.deleteOne({_id : ObjectId(id)})
            return deleteResponse
        }catch (e){
            console.error(`unable to delete item ${e}`)
            return {error: e}
        }
    }
}