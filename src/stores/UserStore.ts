import api from "@/axios";
import { defineStore } from "pinia";

const useUserStore = defineStore('users', { 
    actions: {
        auth: async (payload: { email: string, password: string }) => {
            const { data } = await api.post('/auth/login', {
                ...payload
            })            
            localStorage.setItem('token', data.access_token)
            api.defaults.headers['Authorization'] = 'Bearer ' + data.access_token
            api.defaults.headers['Authorization'] = 'Bearer ' + data.user.id
            localStorage.setItem('user', data.user.id)
        },
        getUserAndToken: (): boolean => {
            const token = localStorage.getItem('token')
            const user = localStorage.getItem('user')
            if(token && user) {
                api.defaults.headers['Authorization'] = 'Bearer ' + token
                api.defaults.headers['user'] = user
            } else {
                return false
            } 
            return true
        },
        logout: () => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
})

export default useUserStore