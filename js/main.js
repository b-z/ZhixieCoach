var timer;
var clock = 0;
var data_col;
var status = 'normal';
var show_now = 0;
$(document).ready(function() {
    $('.materialboxed').materialbox();
    $('.modal-trigger').leanModal();
    openPanel(page);
    $('.brand-logo').text(page == 'coach' ? '教练简介' : '精选活动');
    $('#search_input').change(search);
});

function openPanel(name, scroll) {
    // if (data_col!=undefined){
    //     $('.data_col').html(data_col);
    // }
    $('.data_col').html('');
    if (name == 'coach') {
        // for (var i=0;i<coachdata.length;i++)
        addCard(name, coachdata, 0);
    }
    if (name == 'activity') {
        // for (var i=0;i<activitydata.length;i++)
        addCard(name, activitydata, 0);
    }
    // data_col = $('.data_col').innerHTML;
}

function cardText(type, idx, item, size) {
    var id = type + idx;
    var text = '';
    if (type == 'coach_single') {
        var stars = '';
        var years = Math.max(Math.min(10, item.teach_years), 1);
        for (var i = 0; i < years; i++) {
            var fontsize = Math.min(24, 200 / years);
            stars += '<img src="icon/star.png" width="' + fontsize + '"></i>'
        }
        if (years >= 10) {
            stars = '<img src="icon/diamond.png" width="' + 24 + '"></i>';
        }
        text =
            '<div id="' + id + '" class="single_view" onclick="">\
                <div class="coach_single_top">\
                    <div style="width:100px;height:100px;overflow:hidden;margin:auto;border-radius: 50%;">\
                    <img class="" src="' + item.img_link + '" style="width:110px;">\
                    </div>\
                    <div class="">\
                        <b>' + item.name + '</b>\
                        <br>\
                        <span>' + item.organization + '<br>' + item.position + '</span>\
                        ' + //<span class="gender">' + (item.gender == '男' ? '♂' : '♀') + '</span>\
            '<br>\
                        <span>' + stars + '</span><div style="height:2px;"></div><span>所在校区: ' + item.location + '</span>\
                    </div>\
                </div>\
                <div class="coach_single_middle"></div>\
                <div class="coach_single_bottom">\
                    <div class="container">\
                        <p style="padding-top:1.6em;margin-top:0;"><b>个人简历：</b><br><span class="indent coach_content">' + item.cv.split('\n').join('<br>') + '</span></p>\
                        <p style="margin-top:0.6em"><b>单位介绍：</b><br><span class="indent coach_content">' + item.org_info + '</span></p>' +
            (item.wishes == '教练寄语' || item.wishes == '' ? '' : ('<p style="margin-top:0.6em"><b>教练寄语：</b><br><span class="indent coach_content">' + item.wishes + '</span></p>')) +
            '</div>\
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
        if (years >= 10) {
            stars = '<img src="icon/diamond.png" width="' + 24 + '"></i>';
        }
        text = cardText('coach', idx, item, 'big')
        var onclick_big = 'toggle($(\'#coach_big' + idx + '\'));toggle($(\'#coach_big' + idx + '_hide\'));';
        text +=
            '<div id="' + id + '_hide" class="card hide_content" onclick="' + onclick_big + '">\
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
                            <p style="margin-top:0.6em"><b class="coach_title">个人简历：</b><br><span class="indent coach_content">' + item.cv + '</span></p>\
                            <p style="margin-top:0.6em"><b class="coach_title">单位介绍：</b><br><span class="indent coach_content">' + item.org_info + '</span></p>\
                            <p style="margin-top:0.6em"><b class="coach_title">教练寄语：</b><br><span class="indent coach_content">' + item.wishes + '</span></p>\
                    </div>\
                </div>\
            </div>';
    }

    if (type == 'coach') {
        if (size == 'big') {
            id = 'coach_big' + idx;
        }
        var stars = '';
        var years = Math.max(Math.min(10, item.teach_years), 1);
        for (var i = 0; i < years; i++) {
            var fontsize = Math.min(16, 168 / years);
            stars += '<img src="icon/star.png" width="' + fontsize + '"></i>'
        }
        if (years >= 10) {
            stars = '<img src="icon/diamond.png" width="' + 16 + '"></i>';
        }
        var onclick = 'showSingle(\'coach_single\',' + idx + ',coachdata' + (size == 'search' ? '_search' : '') + '[' + idx + ']);';
        var onclick_big = 'toggle($(\'#coach_big' + idx + '\'));toggle($(\'#coach_big' + idx + '_hide\'));';
        text = '<ul class="collection" id="' + id + '">\
            <li class="collection-item avatar" onclick="' + (size == 'big' ? onclick_big : onclick) + '">\
                <img src="' + item.img_link + '" alt="" class="circle">\
                <b class="title">' + item.name + '</b>\
                <p style="color:#888;">' + item.organization + '<br>\
                    ' + item.position + '\
                </p>\
                <a class="secondary-content">' + stars + '</a>\
            </li></ul>';
    }
    if (type == 'activity_single') {
        // var stars = '';
        // var years = Math.max(Math.min(10, item.teach_years), 1);
        // for (var i = 0; i < years; i++) {
        //     var fontsize = Math.min(24, 200 / years);
        //     stars += '<img src="icon/star.png" width="' + fontsize + '"></i>'
        // }
        numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
        text =
            '<div id="' + id + '" class="single_view" onclick="">\
                <div class="activity_single_top">' +
            '<div class="slider"><ul class="slides">'
            //             '<div class="carousel carousel-slider">';
        item.img_links.forEach(function(e, i) {
            // text += '<img class="activity_img activity_img' + idx + '" src="' + e + '">';
            text += '<li>\
                <img src="' + e + '">' +
                '<div class="caption">' +
                // <h3>This is area A</h3>\
                '<h5 class="light grey-text text-lighten-3">' + item.coach_info.name + '教练小组活动</h5>\
                </div>\
                </li>';
        });
        text += '</ul></div>';

        var coach_info = '<b class="indent activity_content">' + item.coach_info.name + '</b><br>\
        <span class="indent activity_content" style="color:#888">' + item.coach_info.organization + ' ' + item.coach_info.position + '</span><br><br>\
        <b>教练语录：</b><br><span class="indent activity_content">' + item.coach_quotation.detail + '</span>';
        var activity_info = '<b>' + item.activity_info.subject + '</b><br>' +
            '<span style="color:#888;">' + item.activity_info.title + '</span><br><br>' +
            '<b>时间：</b><span>' + item.activity_info.time + '</span><br>' +
            '<b>地点：</b><span>' + item.activity_info.location + '</span><br><br>' +
            '<b>详情：</b></br><span>' + item.activity_info.detail + '</span>';
        var student_comment = '';
        item.student_comment.forEach(function(e, i) {
            student_comment += '<b>' + e.name + '：</b><span>' + e.comment + '</span><br>';
        });

        var collapsible = '<li>\
                            <div class="collapsible-header active">活动详情</div>\
                            <div class="collapsible-body"><p>' + activity_info + '</p></div>\
                        </li>\
                        <li>\
                            <div class="collapsible-header active">教练信息</div>\
                            <div class="collapsible-body"><p>' + coach_info + '</p></div>\
                        </li>\
                        <li>\
                            <div class="collapsible-header active">同学感言</div>\
                            <div class="collapsible-body"><p>' + student_comment + '</p></div>\
                        </li>';
        text += '<div class="">' +
            // <b>' + item.name + '</b>\
            // <br>\
            // <span>' + item.organization + ' ' + item.position + '</span>\
            // ' + //<span class="gender">' + (item.gender == '男' ? '♂' : '♀') + '</span>\
            // '<br>\
            // <span>' + stars + '</span>\
            '</div>\
                </div>\
                <div class="activity_single_middle"></div>\
                <div class="activity_single_bottom">\
                    <div class="">' +
            '<ul class="collapsible" data-collapsible="expandable">' +
            collapsible +
            '</ul>' +
            // <p style="padding-top:1.6em;margin-top:0;"><b>a：</b><br><span class="indent activity_content">' + item.cv + '</span></p>\
            // <p style="margin-top:0.6em"><b>b：</b><br><span class="indent activity_content">' + item.org_info + '</span></p>\
            // <p style="margin-top:0.6em"><b>c：</b><br><span class="indent activity_content">' + item.wishes + '</span></p>\
            '</div>\
                </div>\
            </div>';
    }
    if (type == 'activity_big') {
        var stars = '';
        var years = Math.max(Math.min(10, item.teach_years), 1);
        for (var i = 0; i < years; i++) {
            var fontsize = Math.min(24, 200 / years);
            stars += '<img src="icon/star.png" width="' + fontsize + '"></i>';
        }
        if (years >= 10) {
            stars = '<img src="icon/diamond.png" width="' + 24 + '"></i>';
        }
        text = cardText('activity', idx, item, 'big')
        var onclick_big = 'toggle($(\'#activity_big' + idx + '\'));toggle($(\'#activity_big' + idx + '_hide\'));';
        text +=
            '<div id="' + id + '_hide" class="card hide_content" onclick="' + onclick_big + '">\
                <div class="card-image waves-effect waves-block waves-light">\
                    <img src="' + item.img_links[0] + '">\
                    <div class="card-title">\
                        <span>' + item.coach_info.name + '</span>\
                    </div>\
                </div>\
                <div class="card-content">\
                    <b>' + item.coach_info.rganization + ' ' + item.coach_info.position + '</b>' +
            // <span class="gender">' + (item.gender == '男' ? '♂' : '♀') + '</span>\
            '<br>' +
            // '<span>' + stars + '</span>\
            '<div class="">\
                            <p style="margin-top:0.6em"><b class="activity_title">个人简历：</b><br><span class="indent activity_content">' + item.activity_info.subject + '</span></p>\
                            <p style="margin-top:0.6em"><b class="activity_title">单位介绍：</b><br><span class="indent activity_content">' + item.activity_info.subject + '</span></p>\
                            <p style="margin-top:0.6em"><b class="activity_title">教练寄语：</b><br><span class="indent activity_content">' + item.activity_info.subject + '</span></p>\
                    </div>\
                </div>\
            </div>';
    }

    if (type == 'activity') {
        if (size == 'big') {
            id = 'activity_big' + idx;
        }
        // var stars = '';
        // var years = Math.max(Math.min(10, item.teach_years), 1);
        // for (var i = 0; i < years; i++) {
        //     var fontsize = Math.min(16, 168 / years);
        //     stars += '<img src="icon/star.png" width="' + fontsize + '"></i>'
        // }
        var onclick = 'showSingle(\'activity_single\',' + idx + ',activitydata[' + idx + ']);';
        var onclick_big = 'toggle($(\'#activity_big' + idx + '\'));toggle($(\'#activity_big' + idx + '_hide\'));';
        text = '<ul class="collection" id="' + id + '">\
            <li class="collection-item avatar" onclick="' + (size == 'big' ? onclick_big : onclick) + '">\
                <img src="' + item.img_links[0] + '" alt="" class="circle">\
                <b class="title">' + item.activity_info.subject + '</b>\
                <p style="color:#888;">' + item.activity_info.title + '<br>\
                    ' + item.coach_info.name + '\
                </p>' +
            // <a class="secondary-content">' + stars + '</a>\
            '</li></ul>';
    }

    return text;
}

function showSingle(type, idx, item) {
    if (type=='coach_single') {
        window.location.href=item.name+'_'+item.organization+'.html';
        return;
    }
    status = 'single';
    show_now = idx;
    $('body').animate({
        scrollTop: 0
    }, 50);
    if (type == 'activity_single') {
        // console.log(item);
        var text0 = cardText(type, idx, item[0]);
        var text1 = cardText(type, idx, item[1]);
        $('.data_1col')[0].innerHTML =
            '<div id="activity_panel_0">' + text0 +
            '</div><div id="activity_panel_1">' + text1 + '</div>';
        $('#activity_panel_1').hide();
        $('.slider').slider({
            full_width: true,
            height: $(window).width() * 0.6,
            indicators: false,
            interval: 4000,
            transition: 1000
        });
        $('.collapsible').collapsible({
            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
        $('.tab_activity').show();
        $('ul.tabs').tabs();
    } else {
        var text = cardText(type, idx, item);
        $('.data_1col')[0].innerHTML = text;
    }
    $('#search').hide();
    $('#back_btn').show();
}

function openActivityPanel(idx) {
    $('#activity_panel_' + (1 - idx)).hide();
    $('#activity_panel_' + idx).show();
}

function addCard(type, data, idx, options) {
    if (status == 'single' || (options != 'search' && status == 'search')) {
        return;
    }
    var item = data[idx];
    if (item == undefined) {
        return;
    }
    // console.log(type)
    var id = type + idx;
    if (type == 'activity') {
        item = item[0];
    }
    var text = cardText(type, idx, item, options);
    var text_big = cardText(type + '_big', idx, item, options);
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
    if (idx <= show_now && type == 'coach') {
        $('body').animate({
            scrollTop:$('#coach' + idx).offset().top
        }, 50);
    }
    timer = setTimeout(function() {
        addCard(type, data, idx + 1, options);
    }, 20);
}

function clickBack() {
    $('#search').show();
    $('#back_btn').hide();
    $('#search_btn').show();
    $('#search_area').hide();
    $('.tab_activity').hide();
    status = 'normal';
    openPanel(page, show_now);
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
