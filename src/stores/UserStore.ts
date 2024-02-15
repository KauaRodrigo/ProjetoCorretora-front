import api from "@/axios";
import { defineStore } from "pinia";

const useUserStore = defineStore('users', { 
    actions: {
        auth: async (payload: { email: string, password: string }) => {
            const { data } = await api.post('/auth/login', {
                ...payload
            })
            api.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token
            localStorage.setItem('user', data.user.id)
            api.defaults.headers.common['user'] = +data.user.id 
        }
    }
})

export default useUserStore