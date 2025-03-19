import api from "@/axios";
import { defineStore } from "pinia";

const useClienteStore = defineStore('clientes', {
    state: () => ({
        aClientes: [],
        oClienteSelecionado: null
    }),

    actions: {
        cadastrarClientes: async (oDados: any) => {
            try {
                const { data } = await api.post(
                    'clientes/cadastrar', 
                    {
                        ...oDados
                    }
                );

                return data;
            }
            catch(error) {
                throw(error)
            }
        },

        async buscarClientes(oFiltros: any) {
            try {
                const { data } = await api.post(
                    'clientes',
                    {
                        ...oFiltros
                    }
                );

                this.aClientes = data.rows;
                return data;
            }
            catch(error) {
                throw(error);
            }
        },

        buscarClienteById: async (iId: number) => {
            try {
                const { data } = await api.get(
                    `clientes/${iId}`
                );

                return data;
            }
            catch(error) {
                throw(error);
            }
        },

        atualizarCliente: async (iId: number, payload: any) => {
            try {
                const { data } = await api.patch(
                    `clientes/${iId}`,                    
                    payload                    
                )
            }
            catch(error) {
                throw(error);
            }
        },

        async ativarInativarCliente(iId: number) {
            try {
                const { data } = await api.patch(
                    `clientes/${iId}/ativar-inativar`
                );

                return data;
            }
            catch(error) {
                throw(error);
            }
        }
    }

})

export default useClienteStore;