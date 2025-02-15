export class UtilsCampos {

    /**
     * Remove caracteres de texto para campos numéricos!
     * 
     * @param {string} sValor 
     * @returns {string}
     */
    static removeAlfaNumericos(sValor: string): string {
        return sValor.replace(/\D/g, '');
    }

    static tratarCampoCPF(oEvent: object) {
        const sValor = oEvent.target.value.replace(/\D/gi, '').trim();

        if(sValor.length < 11) {
            return;
        }

        oEvent.target.value = sValor.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4').trim();
    }

    static tratarCampoTelefone(oEvento: object) {
        const sValor = oEvento.target.value.replace(/\D/g, '').trim();

        if(sValor.length < 10) {            
            return;
        }

        if(sValor.length > 10) {
            return oEvento.target.value = sValor.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3').trim();
        }

        return oEvento.target.value = sValor.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, '($1) $2-$3').trim();
    }

}