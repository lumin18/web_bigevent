$(function () {
    const form = layui.form;
    const layer = layui.layer;

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo();
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                form.val('formUserInfo', res.data)
                // form.val('', object) 用于给指定表单的元素赋值和取值
            }
        })
    }


    // 重置表单的数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 重新获取用户信息
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // "username" is not allowed, 所以需要删除
        const inputParams = form.val('formUserInfo'); // 取值
        delete inputParams.username;

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: inputParams,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // console.log(window.parent)
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                // 父亲身上的所有属性和方法都能使用 window.parent
                window.parent.getUserInfo();
            }
        })
    })
})