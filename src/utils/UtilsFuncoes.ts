class UtilsFuncoes {
    static setResizeAcoes() {
        let oActions = $('#actions');
        let oPage    = $('.page');
        
        oPage.css('height', $('#app').height() - 87);
        oActions.css('margin-top', oPage.height() - 400);
    }
}

export default UtilsFuncoes;