class TabThroughForm {
    constructor() {
    
        this.event();
    }
    event() {
        $(document).on('focus', '.button',function(){
            $(this).css('border','1px dotted black');
        });
        $(document).on('keyup', '.button',function(e){
            if(e.which==13 || e.which==32)
                $(this).click();
        });
    }
    

}

export default TabThroughForm;