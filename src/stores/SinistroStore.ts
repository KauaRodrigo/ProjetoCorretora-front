import api from "@/axios";
import { defineStore } from "pinia";

const useSinistroStore = defineStore('sinistro', {
    state: () => ({
        filters: null
    }),

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

        getFilters(payload: any) {
            this.filters = payload; 
        },

        updateRegister: async (id: number, payload: any): Promise<any> => {
            try {
                const { data } = await api.post('sinistros/editar/'+id, {
                    ...payload
                });
                return data;
            } catch(error) {
                throw(error);
            }
        },

        getAccidentSingle: async (id: number): Promise<any> => {
            try {
                const { data } = await api.get(`sinistros/`+id);

                return data;
            } catch(error) {
                throw(error);
            }
        },

        getAccidentsByFilters: async (filters?: any): Promise<{ rows: any, count: number }> => {
            try {
                const { data } = await api.post('sinistros', {
                    ...filters
                })                            
                return data;
            } catch (error) {
                throw(error)
            }
        },

        getLastRecords: async (payload: any): Promise<{ rows: any, count: number}> => {
            try {
                const { data } = await api.get('sinistros/last-records', {
                    params: {
                        ...payload
                    }
                })
                return data
            } catch (error) {
                throw(error)
            }
        },

        registrarSinistro: async (payload: any): Promise<boolean> => {
            try {
                const { data } = await api.post('sinistros/criar', {
                    ...payload
                });
                return data;
            }catch (error) {
                throw(error);
            }
        }
    }
})

export default useSinistroStore