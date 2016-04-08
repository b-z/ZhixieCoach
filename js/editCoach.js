var modals = [];

var empty = {
    "img_link": "img/coach/default.png",
    "name": "姓名",
    "gender": "男",
    "organization": "单位",
    "position": "职位",
    "location":"北京校区",
    "teach_years": 1,
    "cv": "个人简历",
    "org_info": "单位信息",
    "wishes": "教练寄语"
};

function showCoach() {
    modals = [];
    $('#modals')[0].innerHTML = '';
    var text = '';
    console.log(coachdata)
    coachdata.forEach(function(e, i) {
        text += '<tr>' +
            '<th>' + e.name + '</th>' +
            '<th><a class="waves-effect waves-light btn modal-trigger" href="#modal' + i + '" >编辑教练信息</a></th>' +
            '<th><a onclick="addCoach(' + i + ');" class="waves-effect waves-light btn">新增</a></th>' +
            '<th><a onclick="deleteCoach(' + i + ');" class="waves-effect waves-light btn">删除</a></th>' +
            '</tr>';
        var text0 = coachModal(e, i);
        $('#modals').append(text0);
        modals.push(text0);
    });
    $('tbody')[0].innerHTML = text;
    $('.modal-trigger').leanModal();
}

// 表格插入一行
// modals插入一个元素
// coach插入一个元素
// modals后边的编号相应变化
function addCoach(idx) {
    if (idx == -1) {
        coachdata.push(empty);
        showCoach();
        return;
    }
    coachdata.splice(idx, 0, empty);
    showCoach();
}

function deleteCoach(idx) {
    coachdata.splice(idx, 1);
    showCoach();
}

function coachModal(item, id) {
    var modal = '<div id="modal' + id + '" class="modal modal-fixed-footer">' +
        '<div class="modal-content">' +
        '<h4>编辑教练信息</h4>' +
        '<div class="row">' +
        '<div class="input-field col s6">\
            <input id="name" type="text" class="validate" value="' + item.name + '">\
            <label for="name">教练姓名</label>\
        </div>' +
        '<div class="input-field col s6">\
            <input id="gender" type="text" class="validate" value="' + item.gender + '">\
            <label for="gender">教练性别</label>\
        </div>' +
        '<div class="input-field col s6">\
            <input id="organization" type="text" class="validate" value="' + item.organization + '">\
            <label for="organization">教练单位</label>\
        </div>' +
        '<div class="input-field col s6">\
            <input id="position" type="text" class="validate" value="' + item.position + '">\
            <label for="position">教练职位</label>\
        </div>' +
        '<div class="input-field col s6">\
            <input id="location" type="text" class="validate" value="' + item.location + '">\
            <label for="location">所在校区</label>\
        </div>' +
        '<div class="input-field col s6">\
            <input id="teach_years" type="text" class="validate" value="' + item.teach_years + '">\
            <label for="teach_years">教龄</label>\
        </div>' +
        '<div class="input-field col s6">\
            <textarea id="cv" type="text" class="materialize-textarea">' + item.cv + '</textarea>\
            <label for="cv">个人简历</label>\
        </div></div><div class="row">' +
        '<div class="input-field col s6">\
            <input id="org_info" type="text" class="validate" value="' + item.org_info + '">\
            <label for="org_info">单位介绍</label>\
        </div>' +
        '<div class="input-field col s6">\
            <input id="wishes" type="text" class="validate" value="' + item.wishes + '">\
            <label for="wishes">教练寄语</label>\
        </div>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<a onclick="recover(\'#modal' + id + '\');" class=" modal-action modal-close waves-effect waves-green btn-flat">恢复初始</a>' +
        '<a onclick="confirm(\'#modal' + id + '\');" class=" modal-action modal-close waves-effect waves-green btn-flat">确认编辑</a>' +
        '</div>' +
        '</div>';
    console.log(item.location);
    return modal;
}

function confirmServer() {
    console.log({
        data: JSON.stringify(coachdata)
    });
    $.ajax({
        type: 'POST',
        url: 'editCoach',
        data: {
            data: JSON.stringify(coachdata)
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

    $(id)[0].outerHTML = modals[p];
    // $('.modal-trigger').leanModal();
}

function confirm(id) {
    $(id).closeModal();
    var p = id.split('modal')[1];

    var item = {
        img_link: coachdata[p].img_link,
        name: $(id + ' #name').val(),
        organization: $(id + ' #organization').val(),
        position: $(id + ' #position').val(),
        location: $(id + ' #location').val(),
        gender: $(id + ' #gender').val(),
        teach_years: $(id + ' #teach_years').val(),
        org_info: $(id + ' #org_info').val(),
        cv: $(id + ' #cv').val(),
        wishes: $(id + ' #wishes').val(),
    };
    coachdata[p] = item;
    console.log(item);
}

$(document).ready(function() {
    showCoach();
    // $('.modal-trigger').leanModal();

});
