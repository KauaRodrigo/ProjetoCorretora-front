import api from "@/axios";
import type { AccidentStatus } from "@/enums/accidentStatus";
import { defineStore } from "pinia";

const useSinistroStore = defineStore('sinistro', {
    state: () => ({
        filtros: {
            tipo: ''
        },
        data: <any> {}
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

        cancelarSinistro: async (payload: any) => {
            try {
                return api.post(`sinistros/cancelar/${payload.id}`)
            }
            catch(error) {
                throw(error);
            }
        },

        updateStatus: async (payload: { id: number, status: AccidentStatus, descricao: string }): Promise<boolean> => {            
            try {
                return api.post(`sinistros/atualizar/${payload.id}`, {
                    status: payload.status,
                    descricao: payload.descricao
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

        async getSquareData(type: string): Promise<{ aberto: number, retorno_reparo: number }> {
            try {
                const { data } = await api.get('sinistros/resumo', {
                    params: {
                        tipo: type
                    }
                })    
                this.data[type] = data;                        
                return data;
            } catch (error) {
                throw(error)
            }
        },

        squareData(type: string) {            
            return this.data[type];
        },

        getFilters(payload: any) {
            this.filtros = payload; 
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

        buscaSinistros: async (oFiltros?: any): Promise<{ rows: any, count: number }> => {
            try {
                const { data } = await api.post('sinistros', {
                    ...oFiltros
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
                const { data } = await api.post(
                    'sinistros/criar', 
                    payload, 
                    { 
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                );
                return data;
            }catch (error) {
                throw(error);
            }
        },

/*        atualizarDadosSinistro: async (id:number): Promise<boolean> => {            
            try {
                const { data } = await api.post('sinistros/editar/'+id);
                return true;
            }catch (error) {
                throw(error);
            }
        },*/

        editarDadosSinistro: async (id:number, payload:any): Promise<any> => {
            try {
                const { data } = await api.post(`sinistros/editar/${id}`, payload);
                return data;
            } catch(error) {
                throw(error);
            }
        },

        excluirSinistro: async(id:number): Promise<any> => {
            try {
                const { data } = await api.post(`sinistros/excluir/${id}`);
                return true
            } catch(error){
                throw(error);
            }
        },
        
        getClientes: async (): Promise<any[]> => {
            try {
                const { data } = await api.get('clientes');

                return data;
            }
            catch(error) {
                throw(error)
            }
        },

        getClientesPorNome: async (sNome: string): Promise<any[]> => {
            try {
                const { data } = await api.post(
                    'clientes',
                    { sNome: sNome }
                )

                return data;
            }
            catch(oErro) {
                throw(oErro);
            }            
        },

        getSeguradorasPorNome: async (sNome: string): Promise<any[]> => {
            try {
                const { data } = await api.post(
                    'seguradoras',
                    { sNome: sNome }
                )

                return data;
            }
            catch(oErro) {
                throw(oErro);
            }            
        },

        getSeguradoras: async(): Promise<any[]> => {
            try {
                const { data } = await api.post('seguradoras', {
                    orderBy: 'nome',
                    order: 'ASC',
                    page: 0,
                    perPage: 999999
                });

                return data;
            }
            catch (oErro) {
                throw(oErro);
            }
        },

        exportarConsulta: async (oFiltros): Promise<any> => {
            try {
                const { data } = await api.post('sinistros/exportar', {
                    ...oFiltros,
                    headers: {
                        "Content-Type": "text/csv"
                    },                    
                });
                
                
                const url = window.URL.createObjectURL(new Blob([data]));                
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'dados.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                return data;
            } catch (error) {
                throw(error);
            }
        }
    }
})

export default useSinistroStore