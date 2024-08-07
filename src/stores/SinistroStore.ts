import api from "@/axios";
import type { AccidentStatus } from "@/enums/accidentStatus";
import { defineStore } from "pinia";

const useSinistroStore = defineStore('sinistro', {
    state: () => ({
        filters: {
            type: ''
        }
    }),

    actions: {
        addComment: async (id: number, content: string): Promise<boolean> => {
            try {
                return api.post(`sinistros/`+id+`/comment`, {
                    content
                })
            } catch (error) {
                throw(error);
            }
        },

        deleteAccident: async (payload: any): Promise<boolean> => {
            try {
                return api.post(`sinistros/excluir/${payload.id}`)
            } catch (error) {
                throw(error);
            }
        },

        updateStatus: async (payload: { id: number, status: AccidentStatus }): Promise<boolean> => {
            try {
                return api.post(`sinistros/atualizar/${payload.id}`, {
                    status: payload.status
                })
            } catch (error) {
                throw(error);
            }
        },

        getComments: async (id: number): Promise<{ rows: any }> => {
            try {
                const { data } = await api.get(`sinistros/`+id+`/comments`);
                return data;
            } catch(error) {
                throw(error);
            }
        },

        getSquareData: async (type: string): Promise<{ aberto: number, retorno_reparo: number }> => {
            try {
                const { data } = await api.get('sinistros/resumo', {
                    params: {
                        tipo: type
                    }
                })            
                return data;
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