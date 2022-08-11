import BusinessDAO from "../dao/businessDAO.js";

export default class BusinessController{

    static async apiGetBusiness(req, res, next){
        try{
            const email = req.query.email

            const BusinessResponse = await BusinessDAO.getBusiness(email)
            let response = {
                Business: BusinessResponse
            }
            res.json(response)
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }

    static async apiPostBusiness(req, res, next){
        try{
            const name = req.body.name
            const email = req.body.email
            const pass = req.body.pass
            const income = 0

            const BusinessResponse = await BusinessDAO.addBusiness(
                name,
                email,
                pass,
                income
            )
            res.json({status: "success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }

    static async apiUpdateBusiness(req, res, next){
        try{
            const id = req.query.businessId
            const income = req.body.income
            const BusinessResponse = await BusinessDAO.updateIncome(id, income)
            res.json({status: "success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }

    static async apiLogin(req, res, next){
        try{
            const businessSchema = {
                email: req.body.email,
                pass: req.body.pass
            }
            console.log(businessSchema.pass)
            const BusinessResponse = await BusinessDAO.login(businessSchema)
            res.send(BusinessResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}