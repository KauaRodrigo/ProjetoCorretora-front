import api from "@/axios";
import { defineStore } from "pinia";

const useUserStore = defineStore('users', {     
    actions: {
        auth: async (payload: { email: string, password: string }) => {
            try {
                const { data } = await api.post('/auth/login', {
                    ...payload
                })            
                api.defaults.headers['Authorization'] = 'Bearer ' + data.access_token                
                api.defaults.headers['user']          = JSON.stringify(data.user)

                localStorage.setItem('token', data.access_token)
                localStorage.setItem('user',  JSON.stringify(data.user))
                return true
            } catch(error) {                
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
        },

        verifyResetToken: async (token: string): Promise<boolean> => {
            const { data } = await api.get(`/auth/passwordreset/verify`, {
                params: {
                    token                
                }
            });            

            if(data) {
                return true;
            }

            return false;

        },

        updatePassword: async (password: any, token: string) => {            
            return api.post('/auth/passwordreset/update', {
                password,
                token
            })
        },

        createResetToken: async (email: string) => {
            const { data } = await api.post('/auth/passwordreset', {
                email
            })

            return data;
        }
    }
})

export default useUserStore