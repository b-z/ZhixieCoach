var canv, file;
$(document).ready(function() {
    $('.materialboxed').materialbox();
    $('.modal-trigger').leanModal();
    openPanel('coach');
});

function openPanel(name) {
    $('.data_col').html('');
    if (name == 'coach') {
        addCard(name, coachdata, 0);
    }
    if (name == 'activity') {
        addCard(name, activitydata, 0);
    }
}

function cardText(type, idx, item, size) {
    var id = type+idx;
    var text = '';
    if (type == 'coach_single') {
        var stars = '';
        var years = Math.max(Math.min(10, item.teach_years), 1);
        for (var i = 0; i < years; i++) {
            var fontsize = Math.min(24, 200 / years);
            stars += '<img src="icon/star.png" width="' + fontsize + '"></i>'
        }
        text =
            '<div id="' + id + '" class="single_view" onclick="">\
                <div class="waves-effect waves-block waves-light">\
                    <img class="circle" src="' + item.img_link + '">\
                    <div class="">\
                        <span>' + item.name + '</span>\
                    </div>\
                </div>\
                <div class="">\
                    <b>' + item.organization + ' ' + item.position + '</b>\
                    <span class="gender">' + (item.gender == '男' ? '♂' : '♀') + '</span>\
                    <br>\
                    <span>' + stars + '</span>\
                    <div class="">\
                            <p style="margin-top:0.6em"><b>个人简历：</b><br><span class="indent">' + item.cv + '</span></p>\
                            <p style="margin-top:0.6em"><b>单位介绍：</b><br><span class="indent">' + item.org_info + '</span></p>\
                            <p style="margin-top:0.6em"><b>教练寄语：</b><br><span class="indent">' + item.wishes + '</span></p>\
                    </div>\
                </div>\
            </div>';
    }
    if (type == 'coach_big') {
        var stars = '';
        var years = Math.max(Math.min(10, item.teach_years), 1);
        for (var i = 0; i < years; i++) {
            var fontsize = Math.min(24, 200 / years);
            stars += '<img src="icon/star.png" width="' + fontsize + '"></i>'
        }
        text = cardText('coach', idx, item, 'big')
        var onclick_big='toggle($(\'#coach_big'+idx+'\'));toggle($(\'#coach_big'+idx+'_hide\'));';
        text +=
            '<div id="' + id + '_hide" class="card hide_content" onclick="'+onclick_big+'">\
                <div class="card-image waves-effect waves-block waves-light">\
                    <img src="' + item.img_link + '">\
                    <div class="card-title">\
                        <span>' + item.name + '</span>\
                    </div>\
                </div>\
                <div class="card-content">\
                    <b>' + item.organization + ' ' + item.position + '</b>\
                    <span class="gender">' + (item.gender == '男' ? '♂' : '♀') + '</span>\
                    <br>\
                    <span>' + stars + '</span>\
                    <div class="">\
                            <p style="margin-top:0.6em"><b>个人简历：</b><br><span class="indent">' + item.cv + '</span></p>\
                            <p style="margin-top:0.6em"><b>单位介绍：</b><br><span class="indent">' + item.org_info + '</span></p>\
                            <p style="margin-top:0.6em"><b>教练寄语：</b><br><span class="indent">' + item.wishes + '</span></p>\
                    </div>\
                </div>\
            </div>';
    }

    if (type == 'coach') {
        if (size=='big'){
            id='coach_big'+idx;
        }
        var stars = '';
        var years = Math.max(Math.min(10, item.teach_years), 1);
        for (var i = 0; i < years; i++) {
            var fontsize = Math.min(16, 168 / years);
            stars += '<img src="icon/star.png" width="' + fontsize + '"></i>'
        }
        var onclick='showSingle(\'coach_single\','+idx+',coachdata['+idx+']);';
        var onclick_big='toggle($(\'#coach_big'+idx+'\'));toggle($(\'#coach_big'+idx+'_hide\'));';
        text='<ul class="collection" id="'+id+'">\
            <li class="collection-item avatar" onclick="'+(size=='big'?onclick_big:onclick)+'">\
                <img src="'+item.img_link+'" alt="" class="circle">\
                <span class="title">'+item.name+'</span>\
                <p>'+item.organization+'<br>\
                    '+item.position+'\
                </p>\
                <a class="secondary-content">'+stars+'</a>\
            </li></ul>';
    }
    if (type == 'activity') {

    }
    return text;
}

function showSingle(type, idx, item){
    var text = cardText(type, idx, item);
    $('.data_1col')[0].innerHTML = text;

    $('#search').hide();
    $('#back_btn').show();
}

function addCard(type, data, idx) {
    var item = data[idx];
    if (item == undefined) {
        return;
    }
    // console.log(type)
    var id = type + idx;
    var text = cardText(type, idx, item);
    var text_big = cardText(type+'_big', idx, item);
    var m = Infinity,
        mt = 0;
    for (j = 0; j < 3; j++) {
        var h = $($('.data_3col')[j]).height();
        if (h < m) {
            m = h;
            mt = j;
        }
    }
    $('.data_3col')[mt].innerHTML += text_big;
    $('.data_1col')[0].innerHTML += text;
    addCard(type, data, idx + 1);
}

function clickBack(type){
    $('#search').show();
    $('#back_btn').hide();
    $('#search_btn').show();
    $('#search_area').hide();
    openPanel(type);
}

function toggle(obj) {
    switch (obj.css('display')) {
        case 'block':
            obj.hide();
            break;
        case 'none':
            obj.fadeIn(500);
            break;
    }
}

function search(filename, ret) {
    filename = filename.split('.')[0];
    var result = {};
    if (result_lst[filename] != undefined) {
        result.status = 'success';
        result.paths = [];
        var lst = result_lst[filename];
        for (var i = 0; i < lst.length; i++) {
            result.paths.push(img_path + lst[i].fname);
        }
    } else {
        result.status = 'fail';
    }

    ret(result);
}
