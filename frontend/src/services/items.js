import http from "../http-common.js"

class itemDataService{
    getItems(id){
        return http.get(`/items?businessId=${id}`)
    }

    addItem(data){
        console.log(data)
        return http.post("/items", data)
    }

    updateItem(data){
        console.log(data)
        return http.put("/items", data)
    }

    deleteItem(id){
        return http.delete(`/items?id=${id}`)
    }
}

export default new itemDataService()