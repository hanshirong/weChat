//app.js
const regeneratorRuntime=require('./utils/rgRt.js')
const {wrapAsync,apiGet}=require('/utils/util.js')
App({
 
 onLaunch: function () {
    // 登录
    
    wx.login({
      success: function(res) {
        //  res.code 到后台换取 openId, sessionKey, unionId
        var code=res.code;
        if(code){
         console.log('获取用户登陆凭证code获取成功:'+code);
          var appId = 'wxea9e847f73db8423';
          var secret ='b73908be0281bfea9db648a64ad2c121';
          //获取token
          wx.request({
            url: 'https://hducp.hduhelp.com/oauth/token',
            data: { code: code },
            header: {
              'content-type': 'application/json;charest=utf-8'
            },
            success:function(res){
                  var globalDate.token = res.data.data.accessToken;
                  
                  console.log('Token:'+ res.data.data.accessToken);   
            }
          })
        }else{
                    console.log('获取用户凭证code失败');
        }
         

      }
    })
 },

//全局变量
  globalDate:{
    token:''
  }
})