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

    static getCampo(sId: string) {
        return $('#'+sId);
    }

    static mascaraCpf(sValor: string) {        
        if(!sValor || (/(\d{0,3}).(\d{0,3}).(\d{0,3})-(\d{0,2})/).test(sValor)) {   
            return sValor;
        }

        const sValorNew = sValor.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4');

        if(sValorNew.length != 14) {
            // alert('O cpf informado é inválido.')
            return '';
        }

        return sValorNew;
    }

    static mascaraTelefone(sValor: string) {
        let sValorNew: string = '';

        if(!sValor) {
            return;
        }

        if(sValor.length == 8) {
            sValorNew = sValor.replace(/(\d{0,4})(\d{0,4})/, '$1-$2');
        } else if(sValor.length == 10) {
            sValorNew = sValor.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, '($1) 9$2-$3');
        } else if (sValor.length == 11) {
            sValorNew = sValor.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3');
        }        

        if(sValorNew.length > 11 && sValorNew.length < 9) {
            alert('O número de telefone informado é inválido.');
            return '';
        }
        
        return sValorNew;
    }    

}