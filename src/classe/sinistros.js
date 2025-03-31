import { UtilsCampos } from '../utils/UtilsCampos';
import UtilsData from '../utils/UtilsData';

export class Sinistros {

    static instance;
    static oCampos;
    static oBotoes;

    static getInstance() {
        if(!this.instance) {
            this.instance = new Sinistros();
        }

        return this.instance;
    }

    processaDadosOnLoad() {        
        this.mapearCampos();
        this.mapearBotoes();    
    }

    mapearCampos() {
        this.oCampos = {
            oNumeroSinistro: UtilsCampos.getCampo('numeroSinistro'),
            oNumeroApolice:  UtilsCampos.getCampo('numeroApolice'),
            oDataOcorrencia: UtilsCampos.getCampo('dataOcorrencia'),
            oSeguradora:     UtilsCampos.getCampo('seguradoras'),
            oTipo:           UtilsCampos.getCampo('tipoSinistro'),
            oTerceiro:       UtilsCampos.getCampo('terceiro'),
            oNomeTerceiro:   UtilsCampos.getCampo('nomeTerceiro'),
            oObservacoes:    UtilsCampos.getCampo('observacoes'),
            oEvento:         UtilsCampos.getCampo('evento'),
            oCliente:        UtilsCampos.getCampo('cliente'),
            oPlaca:          UtilsCampos.getCampo('placa')
        }        
    }

    mapearBotoes() {
        this.oBotoes = {
            oConfirmar: $('#confirmar'),
            oCancelar:  $('#cancelar')
        }
    }
    
    validaCamposConfirmar() {         
        // this.oBotoes.oConfirmar.prop('disabled', true);
        if(UtilsData.isDataMaior(this.oCampos.oDataOcorrencia.val(), new Date())) {
            this.oBotoes.oConfirmar.removeProp('disabled');
            return 'A Data da ocorrência não pode ser maior que a data atual!';
        }

        if(this.oCampos.oCliente.val() == '') {
            this.oBotoes.oConfirmar.removeProp('disabled');
            return 'O campo Cliente é obrigatório';
        }

        if(this.oCampos.oTipo.val() == '') {
            this.oBotoes.oConfirmar.removeProp('disabled');
            return 'O campo Tipo é obrigatório';
        }

        if(this.oCampos.oNumeroApolice.val() == '') {
            this.oBotoes.oConfirmar.removeProp('disabled');
            return 'O campo Numero da apólice é obrigatório';
        }

        console.log(this.oCampos.oPlaca.val())
        if(this.oCampos.oTipo.val() === 'VEICULAR' && !this.oCampos.oPlaca.val()) {            
            return 'O campo Placa é obrigatório';
        }
    }       

}