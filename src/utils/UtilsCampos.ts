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

}

