function openNav() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}

$(document).ready(function () {
    $(".addFiveMinutes").click(function () {
        $(this).parent().find('.answers').append($(this).parent().find(".answers div:first").clone());
        $(this).parent().find("div.row:last select").val($(this).parent().find("div:last select option:first").val());
        $(this).parent().find("div.row:last input[name='fiveAnsId']").val(0);
        $(this).parent().find("div.row:last input[name='fiveAns']").val(0);
    });

    $(".addTimeEstimate").click(function () {
        $(this).parent().find('.answers').append($(this).parent().find(".answers div:first").clone());
        $(this).parent().find("div.row:last select").val($(this).parent().find("div:last select option:first").val());
        $(this).parent().find("div.row:last input[name='estAnsId']").val(0);
        $(this).parent().find("div.row:last input[name='estAns']").val(0);
    });

    $(".addMultiple").click(function () {
        $(this).parent().find('.answers').append($(this).parent().find(".answers div:first").clone());
        $(this).parent().find("div.row:last select[name='multiple']").val($(this).parent().find("div:last select[name='multiple'] option:first").val());
        $(this).parent().find("div.row:last select[name='multipleAns']").val($(this).parent().find("div:last select[name='multipleAns'] option:first").val());
        $(this).parent().find("div.row:last input[name='multipleAnsId']").val(0);
    });

    $(".addDistance").click(function () {
        $(this).parent().find('.answers').append($(this).parent().find(".answers div:first").clone());
        $(this).parent().find("div.row:last select[name='dist1']").val($(this).parent().find("div:last select[name='multiple'] option:first").val());
        $(this).parent().find("div.row:last select[name='dist2']").val($(this).parent().find("div:last select[name='multiple'] option:first").val());
        $(this).parent().find("div.row:last input[name='distAnsId']").val(0);
        $(this).parent().find("div.row:last input[name='distans']").val(0);
    });

    $(".addImage").click(function () {
        $(this).parent().find('.answers').append($(this).parent().find(".newAnswer div.row:last").clone());
        $(this).parent().find("div.row:last input[name='img']").val(0);
        $(this).parent().find("div.row:last input[name='imgAnsId']").val(0);
    });

    $(document).on('click', '.deleteAnswer', function () {
        if ($(this).parent().parent().parent().children().not(".hidden").length != 1) {
            $(this).parent().parent().find("input[name='fiveid'], input[name='estid'], input[name='multipleid'], input[name='distid']").val(-1);
            $(this).parent().parent().addClass("hidden");
            $(this).parent().parent().css("display", "none");
        }
    });

    $(document).on('click', '.deleteImageAnswer', function () {
            $(this).parent().parent().find("input[name='imgid']").val(-1);
            $(this).parent().parent().addClass("hidden");
            $(this).parent().parent().css("display", "none");
    });
});

function addImg(x) {
    var newimg = '<input type="file" name="img" />' +
        '<input class="form-control" type="hidden" name="imgid" value="'+ x + '" />';
    document.getElementById("imgs").innerHTML += newimg;
}

function addDist(choices, ids, id) {

    var options;
    for (i = 0; i < choices.length; i++) {
        options += '<option value="'+ ids[i] +'">'+ choices[i] +'</option>';
    }

    var newdist = '<br /><div class="row">' +
        '        <div class="col-xs-4">' +
        '            <select class="form-control" name="dist1">' +
                        options +
        '            </select>' +
        '        </div>' +
        '' +
        '        <div class="col-xs-4">' +
        '            <select class="form-control" name="dist2">' +
                        options +
        '            </select>' +
        '        </div>' +
        '' +
        '        <div class="col-xs-4">' +
        '            <input class="form-control" name="distans" value="" />' +
        '        </div>' +
        '        <input class="form-control" type="hidden" name="distid" value="'+ id +'" />' +
        '        <input type="hidden" name="distAnsId" value="0" />' +
        '    </div>';
    document.getElementById("dists").innerHTML += newdist;
}

function addMultiple(choices, multiple, ids, mids, id) {

    var options;
    for (i = 0; i < choices.length; i++) {
        options += '<option value="' + ids[i] + '">' + choices[i] + '</option>';
    }

    var multiplechoices;
    for (i = 0; i < multiple.length; i++) {
        multiplechoices += '<option value="' + mids[i] + '">' + multiple[i] + '</option>';
    }

    var newMultiple = '<br /><div class="row">' +
        '                                <div class="col-xs-6">' +
        '                                    <select class="form-control" name="multiple">' +
        '                                       <option></option>'  +
                                                options +
        '                                    </select>' +
        '                                </div>' +
        '                                <div class="col-xs-6">' +
        '                                    <select class="form-control" name="multipleAns">' +
        '                                       <option></option>' +
                                                multiplechoices +
        '                                    </select>' +
        '                                </div>' +
        '                                <input class="form-control" type="hidden" name="multipleid" value="' + id + '" />' +
        '                                <input type="hidden" name="distAnsId" value="0" />' +
        '                            </div>';


    document.getElementById("multiples").innerHTML += newMultiple;
}

function addEst(choices, ids, id) {

    var options;
    for (i = 0; i < choices.length; i++) {
        options += '<option value="' + ids[i] + '">' + choices[i] + '</option>';
    }

    var newest = '<br /><div class="row">' +
        '        <div class="col-xs-6">' +
        '            <select class="form-control" name="est">' +
        '               <option value=""></option>' +
                        options +
        '            </select>' +
        '        </div>' +
        '        <div class="col-xs-6">' +
        '            <input class="form-control" name="estAns" value="" />' +
        '        </div>' +
        '        <input class="form-control" type="hidden" name="estid" value="' + id + '" />' +
        '        <input type="hidden" name="estAnsId" value="0" />' +
        '    </div>';
    document.getElementById("ests").innerHTML += newest;
}

function addFive(choices, ids, id) {

    var options;
    for (i = 0; i < choices.length; i++) {
        options += '<option value="' + ids[i] + '">' + choices[i] + '</option>';
    }

    var newfive = '<br /><div class="row">' +
        '        <div class="col-xs-6">' +
        '            <select class="form-control" name="five">' +
        '               <option value=""></option>' +
        options +
        '            </select>' +
        '        </div>' +
        '        <div class="col-xs-6">' +
        '            <input class="form-control" name="fiveAns" value="" />' +
        '        </div>' +
        '        <input class="form-control" type="hidden" name="fiveid" value="' + id + '" />' +
        '        <input type="hidden" name="fiveAnsId" value="0" />' +
        '    </div>';
    document.getElementById("fives").innerHTML += newfive;
}