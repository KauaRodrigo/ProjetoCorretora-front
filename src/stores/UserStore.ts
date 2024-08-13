import api from "@/axios";
import { defineStore } from "pinia";

const useUserStore = defineStore('users', { 
    state: () => ({        
          typeView: 'LIST'        
      }),

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
        changeViewType(type: string) {
            this.typeView = type;
            return this.typeView;
        }
    }
})

export default useUserStore