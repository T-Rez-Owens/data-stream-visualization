import $ from 'jquery';

class DefaultInputs {
    constructor() {
        this.inTakt = $(".taktLG");
        this.inXwidth = $(".widthLG");
        this.inYheight = $(".heightLG");
        this.inDataLength = $(".numberOfPointsLG");
        this.defaultInputs();
        this.logInputs();
    }

    defaultInputs() {
        this.inTakt.get(0).value = 250;
        this.inXwidth.get(0).value = 1000;
        this.inYheight.get(0).value = 500;
        this.inDataLength.get(0).value = 5;
    }

    logInputs() {
        console.log(this.inTakt.get(0).value + " , " + this.inXwidth.get(0).value + " , " + this.inYheight.get(0).value + " , " + this.inDataLength.get(0).value);
    }
}

export default DefaultInputs;