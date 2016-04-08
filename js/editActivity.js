var modals = [];

var empty = {
    "img_links": ["img/activity/act1.png", "img/activity/act2.png"],
    "activity_info": {
        "title": "活动标题",
        "subject": "活动主题",
        "time": "时间",
        "location": "地点",
        "detail": "活动详情"
    },
    "coach_info": {
        "name": "教练姓名",
        "organization": "教练单位",
        "position": "教练职位"
    },
    "coach_quotation": {
        "title": "教练语录标题",
        "detail": "教练语录内容"
    },
    "student_comment": [{
        "name": "小A",
        "comment": "评论1"
    }, {
        "name": "小B",
        "comment": "评论2"
    }]
};

function showActivity() {
    modals = [];
    $('#modals')[0].innerHTML = '';
    var text = '';
    activitydata.forEach(function(e, i) {
        text += '<tr>' +
            '<th>' + e[0].activity_info.subject + '</th>' +
            '<th><a class="waves-effect waves-light btn modal-trigger" href="#modal' + i + '_0" >编辑小组活动</a></th>' +
            '<th><a class="waves-effect waves-light btn modal-trigger" href="#modal' + i + '_1" >编辑行动环节</a></th>' +
            '<th><a onclick="addActivity('+i+');" class="waves-effect waves-light btn">新增</a></th>' +
            '<th><a onclick="deleteActivity('+i+');" class="waves-effect waves-light btn">删除</a></th>' +
            '</tr>';
        var text0 = activityModal(e[0], i + '_0');
        var text1 = activityModal(e[0], i + '_1');
        $('#modals').append(text0);
        $('#modals').append(text1);
        modals.push([text0, text1]);
    });
    $('tbody')[0].innerHTML = text;
    $('.modal-trigger').leanModal();
}

// 表格插入一行
// modals插入一个元素
// activity插入一个元素
// modals后边的编号相应变化
function addActivity(idx) {
    activitydata.splice(idx, 0, [empty, empty]);
    showActivity();
}

function deleteActivity(idx) {
    activitydata.splice(idx, 1);
    showActivity();
}

function activityModal(item, id) {
    var comments = '';
    item.student_comment.forEach(function(e, i) {
        comments += e.name + ':' + e.comment + '\n';
    });
    var modal = '<div id="modal' + id + '" class="modal modal-fixed-footer">' +
        '<div class="modal-content">' +
        '<h4>编辑活动</h4>' +
        '<div class="row">' +
        '<div class="input-field col s6">\
            <input id="title" type="text" class="validate" value="' + item.activity_info.title + '">\
            <label for="title">活动标题</label>\
        </div>' +
        '<div class="input-field col s6">\
            <input id="subject" type="text" class="validate" value="' + item.activity_info.subject + '">\
            <label for="subject">活动主题</label>\
        </div>' +
        '<div class="input-field col s6">\
            <input id="time" type="text" class="validate" value="' + item.activity_info.time + '">\
            <label for="time">活动时间</label>\
        </div>' +
        '<div class="input-field col s6">\
            <input id="location" type="text" class="validate" value="' + item.activity_info.location + '">\
            <label for="location">活动地点</label>\
        </div>' +
        '<div class="input-field col s6">\
            <textarea id="detail" type="text" class="materialize-textarea">' + item.activity_info.detail + '</textarea>\
            <label for="detail">活动详情</label>\
        </div></div><div class="row">' +
        '<div class="input-field col s6">\
            <input id="name" type="text" class="validate" value="' + item.coach_info.name + '">\
            <label for="name">教练姓名</label>\
        </div>' +
        '<div class="input-field col s6">\
            <input id="organization" type="text" class="validate" value="' + item.coach_info.organization + '">\
            <label for="organization">教练单位</label>\
        </div>' +
        '<div class="input-field col s6">\
            <input id="position" type="text" class="validate" value="' + item.coach_info.position + '">\
            <label for="position">教练职务</label>\
        </div></div><div class="row">' +
        '<div class="input-field col s6">\
            <input id="quot_title" type="text" class="validate" value="' + item.coach_quotation.title + '">\
            <label for="quot_title">教练语录标题</label>\
        </div>' +
        '<div class="input-field col s6">\
            <textarea id="quot_detail" type="text" class="materialize-textarea">' + item.coach_quotation.detail + '</textarea>\
            <label for="quot_detail">教练语录内容</label>\
        </div></div><div class="row">' +
        '<div class="input-field col s6">\
            <textarea id="comments" type="text" class="materialize-textarea">' + comments + '</textarea>\
            <label for="comments">学生评论，每行表示一个评论，学生名字和他的评论之间用":"分隔</label>\
        </div>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<a onclick="recover(\'#modal' + id + '\');" class=" modal-action modal-close waves-effect waves-green btn-flat">恢复初始</a>' +
        '<a onclick="confirm(\'#modal' + id + '\');" class=" modal-action modal-close waves-effect waves-green btn-flat">确认编辑</a>' +
        '</div>' +
        '</div>';
    return modal;
}

function confirmServer() {
    console.log({
        data: JSON.stringify(activitydata)
    });
    $.ajax({
        type: 'POST',
        url: 'editActivity',
        data: {
            data: JSON.stringify(activitydata)
        },
        dataType: 'json',
        success: function(data) {
            console.log(data.status);
            alert(data.status);
            location.reload();
        }
    });
}

function recover(id) {
    $(id).closeModal();
    var p = id.split('modal')[1];
    var q = p.split('_')[0] * 1;
    r = p.split('_')[1] * 1;
    $(id)[0].outerHTML = modals[q][r];
    // $('.modal-trigger').leanModal();
}

function confirm(id) {
    $(id).closeModal();
    var p = id.split('modal')[1];
    var q = p.split('_')[0] * 1;
    r = p.split('_')[1] * 1;

    var commentstmp = $(id + ' #comments').val()
    commentstmp = commentstmp.replace('\r', '');
    commentstmp = commentstmp.split('\n');
    var comments = [];
    for (var i = 0; i < commentstmp.length; i++) {
        var tmp = commentstmp[i].split(':');
        if (tmp.length != 2) {
            continue;
        }
        comments.push({
            name: tmp[0],
            comment: tmp[1]
        });
    }
    var item = {
        img_links: activitydata[q][r].img_links,
        activity_info: {
            title: $(id + ' #title').val(),
            subject: $(id + ' #subject').val(),
            time: $(id + ' #time').val(),
            location: $(id + ' #location').val(),
            detail: $(id + ' #detail').val()
        },
        coach_info: {
            name: $(id + ' #name').val(),
            organization: $(id + ' #organization').val(),
            position: $(id + ' #position').val()
        },
        coach_quotation: {
            title: $(id + ' #quot_title').val(),
            detail: $(id + ' #quot_detail').val()
        },
        student_comment: comments
    };
    activitydata[q][r] = item;
    console.log(item);
}

$(document).ready(function() {
    showActivity();
    // $('.modal-trigger').leanModal();

});
