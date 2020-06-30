$(function () {
    const form = layui.form;

    // 自定义密码的 验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 判断旧密码 和 新密码 是否相同
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) { //当新设密码等于旧密码
                return '新旧密码不能相同!!!'
            }
        },

        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '二次密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        // 剔除 repwd 属性
        let params = $(this).serialize().split("&");
        params.length = 2;

        $.ajax({
            method: 'POST',
            url: '/my/udatepwd',
            data: params.join('&'),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败!!!')
                }
                layui.layer.mag('更新密码成功喽')
                // jq对象 转成 dom  重置表单
                $('.layui-form')[0].reset();
            }
        })
    })
})