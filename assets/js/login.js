// 入口函数
$(function () {
    // 点击 '去注册账号' 的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show();
    })
    // 点击 '去登录' 的链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $('.reg-box [name=password]').val()
            // const pwd = $('#password').val();
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 注册 ajax请求
    // 按钮点击或者表单被执行提交时触发，其中回调函数只有在验证全部通过后才会进入
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        const inputParams = {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val()
        }
        $.post('/api/reguser', inputParams, function (res) {
            if (res.status !== 0) {
                
                return layer.msg(res.message)
            }
            
            layer.msg('注册成功,请登录')
            $('#link_login').click();
        })
    })
    // 登录 ajax请求
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: `/api/login`,
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    // return console.log('登录失败');
                    return layer.msg('登录失败')
                }
                // console.log('登录成功');
                layer.msg('登录成功')
                // 将登录成功得到的 token 字符串，保存到 localStorage 
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '../../index.html'
            }
        })
    })


})