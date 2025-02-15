import api from "@/axios";
import { defineStore } from "pinia";

const useSeguradoraStore = defineStore('seguradoras', {
    state: () => ({
        seguradoras: []
    }),
    actions: {
        async cadastrarSeguradora(oDados) {
            try {
                const { data } = await api.post('seguradoras/cadastrar', {
                    ...oDados
                });

                this.seguradoras = [{ nome: 'Teste' }];
            }
            catch(error) {
                throw(error);
            }
        }
    },
    getters: {
        getSeguradoras: (state) => (state.seguradoras)
    }
})

export default useSeguradoraStore;