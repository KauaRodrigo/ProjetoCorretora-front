import api from "@/axios";
import { defineStore } from "pinia";

const useSeguradoraStore = defineStore('seguradoras', {
    actions: {
        async buscarSeguradoras(oFiltros: any) {
            try {
                const { data } = await api.post(
                    'seguradoras',
                    {
                        ...oFiltros
                    }
                );
            
                return data;
            }
            catch(error) {
                throw(error);
            }
        },

        async cadastrarSeguradora(oDados: any) {
            try {
                const { data } = await api.post(
                    'seguradoras/cadastrar',
                    {
                        ...oDados
                    }
                );

                return data;
            }
            catch(error) {
                throw(error);
            }
        },

        async buscarSeguradoraById(id: number) {            
            try {
                const { data } = await api.get(`seguradoras/${id}`);

                return data;
            }
            catch(error) {
                throw(error);
            }
        },

        async atualizarSeguradora(id: number, oDados: any) {
            try {
                const { data } = await api.patch(
                    `seguradoras/${id}/alterar`,
                    {
                        ...oDados
                    }
                );

                return data;
            }
            catch(error) {
                throw(error);
            }
        },

        async ativarInativarSeguradora(id: number) {
            try {
                const { data } = await api.patch(`seguradoras/${id}/ativar-inativar`);

                return data;
            }
            catch(error) {
                throw(error);
            }
        },

        async buscarClientesAtivosSeguradora(id: number) {
            try {
                const { data } = await api.get(`seguradoras/${id}/clientes`);

                return data;
            }
            catch(error) {
                throw(error);
            }
        }
    }   
})

export default useSeguradoraStore;