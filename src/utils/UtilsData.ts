export default class UtilsData {

    static isDataMaior(sDataInicial: string, sDataFinal: string): boolean {
        return new Date(sDataInicial).getTime() > new Date(sDataFinal).getTime();
    }

    static isDataIgual(sDataInicial: string, sDataFinal: string): boolean {
        return new Date(sDataInicial).getTime() == new Date(sDataFinal).getTime();
    }

    static isDataValida(sData: string) {
        const [dia, mes, ano] = sData.split('/').map(Number);

        const oData = new Date(ano, mes - 1, dia);

        return oData.getFullYear() === ano &&
               oData.getMonth() === mes - 1 &&
               oData.getDate() === dia;
    }

}