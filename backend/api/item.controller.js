import ItemDAO from "../dao/itemDAO.js";

export default class ItemController{
    static async apiPostItem(req, res, next){
        try{
            const name = req.body.name
            const price = req.body.price
            const businessId = req.body.businessId

            console.log(name)

            const ItemResponse = await ItemDAO.addItem(
                name,
                price,
                businessId
            )
            res.json({status: "success"})
        }catch (e){
            res.status(500).json({error:e.message})
        }
    }

    static async apiGetItem(req, res, next){
        const itemPerPage = req.query.itemPerPage ? parseInt(req.query.itemPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.businessId){
            filters.businessId = req.query.businessId
        }
        console.log(filters)

        const { itemList, totalNumItems } = await ItemDAO.getItem({
            filters,
            page,
            itemPerPage
        })
        let response = {
            items: itemList,
            page: page,
            filters: filters,
            entries_per_page: itemPerPage,
            total_results: totalNumItems
        }
        res.json(response)
    }

    static async apiUpdateItem(req, res, next){
        try{
            const id = req.body.itemId
            const price = req.body.price
            const name = req.body.name

            console.log(id)
            const itemResponse = ItemDAO.updateItem(
                id,
                name,
                price
            )
            res.json({Status: "success"})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteItem(req, res, next){
        try{
            const id = req.query.id
            const itemREsponse = await ItemDAO.deleteItem(id)
            res.json({status: "Success"})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}