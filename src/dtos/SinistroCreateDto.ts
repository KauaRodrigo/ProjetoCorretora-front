export default class SinistroCreateDto {
    numeroSinistro: string   = '';
    nome:           string   = '';
    tipo:           string   = '';
    terceiro:       boolean  = false;
    placa:          string   = '';
    numeroApolice:  string   = '';
    seguradora:     string   = '';
    evento:         string   = '';
    observacoes:    string   = '';
    dataOcorrencia: string     = '';
    fotos:          string[] = [];
}