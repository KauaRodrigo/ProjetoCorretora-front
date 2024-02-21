import api from "@/axios";
import { defineStore } from "pinia";

const useSinistroStore = defineStore('sinistro', {
    actions: {
        getSquareData: async (type: string): Promise<{ aberto: number, indenizado: number }> => {
            try {
                const { data } = await api.get('sinistros/resumo', {
                    params: {
                        tipo: type
                    }
                })
                return data
            } catch (error) {
                throw(error)
            }
        },

        getLastRecords: async (): Promise<{ rows: any, count: number}> => {
            try {
                const { data } = await api.get('sinistros/last-records')
                return data
            } catch (error) {
                throw(error)
            }
        }
    }
})

export default useSinistroStore