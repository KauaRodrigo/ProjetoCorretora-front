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
        }
    }

})

export default useClienteStore;