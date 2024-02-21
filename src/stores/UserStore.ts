import api from "@/axios";
import { defineStore } from "pinia";

const useUserStore = defineStore('users', { 
    actions: {
        auth: async (payload: { email: string, password: string }) => {
            try {
                const { data } = await api.post('/auth/login', {
                    ...payload
                })            
                localStorage.setItem('token', data.access_token)
                api.defaults.headers['Authorization'] = 'Bearer ' + data.access_token
                api.defaults.headers['user'] = data.user.id
                localStorage.setItem('user', data.user.id)
                return true
            } catch(error) {
                console.log(error)
                return({
                    message: 'Email ou senha incorretos!',
                    code: 400
                })
            }
        },
        getUserAndToken: (): boolean => {
            const token = localStorage.getItem('token')
            const user = localStorage.getItem('user')
            if(token && user) {
                api.defaults.headers['Authorization'] = 'Bearer ' + token
                api.defaults.headers['user'] = user
                return true
            } else {
                return false
            } 
        },
        logout: () => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            return true
        }
    }
})

export default useUserStore