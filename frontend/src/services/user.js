import http from "../http-common.js"

class userDataService{
    getUser(email){
        return http.get(`/users?email=${email}`)
    }

    updateIncome(id, income){
        return http.put(`/users?businessId=${id}`, income)
    }

    login(Business){
        return http.post(`/login`, Business)
    }
}

export default new userDataService()