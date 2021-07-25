/**
 * Block one of the option. Depending on the checkbox if this is a interval payment
 */
function activate() {
    var interval = document.getElementById('interval-payment-dropdown');
    var date = document.getElementById('date');
    var start_date = document.getElementById('start_date');
    var amount_interval = document.getElementById('amount_interval');
    var no_interval = document.getElementById('no-interval');
    var an_interval = document.getElementById('interval-border');



    if(document.getElementById('interval-payment-check').checked == true){
        interval.style.pointerEvents = "auto";
        interval.style.opacity = 1;
        amount_interval.style.pointerEvents = "auto";
        amount_interval.style.opacity = 1;
        start_date.style.pointerEvents = "auto";
        start_date.style.opacity = 1;
        date.style.pointerEvents = "none";
        date.style.opacity = 0.6;
        no_interval.style.border = "none"
        an_interval.style.border = "2px solid #b3b3ff";
        an_interval.style.borderRadius = "10px";
        an_interval.style.padding = "10px";

    } else{
        interval.style.pointerEvents = "none";
        interval.style.opacity = 0.6;
        amount_interval.style.pointerEvents = "none";
        amount_interval.style.opacity = 0.6;
        start_date.style.pointerEvents = "none";
        start_date.style.opacity = 0.6;
        date.style.pointerEvents = "auto";
        date.style.opacity = 1;
        no_interval.style.border = "2px solid #b3b3ff";
        no_interval.style.borderRadius = "10px";
        no_interval.style.padding = "10px";
        an_interval.style.border = "none"
    }
}

/**
 * Check user input
 * @returns {boolean}
 */
function check_input() {
    if(document.getElementById('interval-payment-check').checked == true){
        var interval_type =document.forms["interval-form"]["interval_type"].value

        if(interval_type == null){
            alert("Kies een interval");
            return false;
        }
    } else{
        var date =document.forms["interval-form"]["date"].value

        if(date == null){
            alert("Kies een datum om de betaling uit te voeren");
            return false;
        }
    }

    return true;
}