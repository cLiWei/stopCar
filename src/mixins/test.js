import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
  data = {
    testUrl:"https://www.tohot.cn/"  // 服务器地址
  }
  methods = {
    
  }
  // 获取当前日期
  //return: 2018-01-01 
  getNowDate(){
    var now = new Date();
        return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  }
  //在给定年份上增加一年
  addYear(time,count){
      var date=new Date(time);
      var interval=parseInt(count);
      var year=date.getFullYear()+interval;
      var month=date.getMonth()+1<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
      var day = date.getDate()<10?'0'+date.getDate():date.getDate();
      return year+"-"+month+"-"+day;
  }
  //获取到年月日，数组形式
  //return [年，月，日]
  getYMD(){
      let arr=[];
      let date = new Date();
      arr[0] = date.getFullYear();
      arr[1] = date.getMonth() + 1;
      arr[2] = date.getDate()
      return arr;
  }
  //数据库返回申报期截止日期
  // nowData 格式：2018-01
  getSbEndDate(nowdate,callback){
    let url = this.testUrl;
    wepy.request(url+'main/getLastDate.php?nowdate='+nowdate)
    .then((d) => callback(d));
  }
  /**
   * [上传图片]
   * @param  {[string]}   imgurl    [图片地址]
   * @param  {Function} callback  [回调方法]
   *          callback(data), data 返回存放地址
   */
  uploadImg(imgurl,callback){
     let url = this.testUrl;
      wx.uploadFile({
        url: url+'upload/upload.php', 
        filePath: imgurl,
        name: 'file',
        formData: {
          'user': 'test'
        },
        success (res){
          const data = res.data
          callback(data)
        }
      })
  }
  // json对象转字符串
  obj_string(obj){
    let string = JSON.stringify(obj);
    return string;
  }
  // json字符串转对象
  string_obj(string){
    let obj = JSON.parse(string);
    return obj;
  }
  // 加载等待动画出现
  showLoad(){
    wx.showLoading({
      title:'请稍等...',
      mask:true
    })
  }
  // 加载等待动画消失
  hideLoad(){
    wx.hideLoading()
  }
  // 成功提示
  showSuccess(content){
    wx.showToast({
      icon:'success',
      title:content||''
    })
  }
  /**
   * [verifyTel 手机号码验证]
   * @param  {[number]} tel [手机号码]
   * @return {[boolean]}    
   */
  verifyTel(tel){
    let userTel = /^[1][3,4,5,7,8][0-9]{9}$/;
    let isTelNum=userTel.test(tel);
    let isTel = false;
    if(isTelNum){
      isTel = true;
    }
    return isTel;
  }
  /**
   * [提示框]
   * @param  {[string]} content    [提示内容]
   * @param  {[function]} confirm [点击确定]
   * @param  {[function]} cancel  [点击取消]
   * @param  {[string]} title      [标题]
   */
  openDialog(obj){
    var data = {
      title:obj.title||'提示',
      content:obj.content||'',
      confirm:obj.confirm ,
      cancel:obj.cancel 
    }
     wx.showModal({
      title: data.title,
      content: data.content,
      success(res){
        if(res.confirm) {
          if(typeof data.confirm === "function"){
            data.confirm()
          }
      }else if(res.cancel) {
          if(typeof data.cancel === "function"){
            data.cancel()
          }
      }
      }
    })
  }
/**
 * [compare 数组内对象排序]
 * @param  {[string]} prop [需要排序的属性]
 * @param  {[number]} num  [正数则为大的在前面，负数就是小的在前面]
 * @return {[arr]}      [排序后的数组]
 * 数据排序后调用排序：arr.sort( compare('primary',1));
 */
compare(prop,num) {
  return function (obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
      }
      if (val1 < val2) {
          return num;
      } else if (val1 > val2) {
          return -num;
      } else {
          return 0;
      }            
  } 
}
/** get 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  get(url,params){
    return new Promise((resolve,reject) => {
      wx.request({
        url:url,
        data:params,
        success(res){
          resolve(res.data);
        },
        fail(err){
          reject(err);
        }
      })
    })
  }
  /** post 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  post(url,params){
    return new Promise((resolve,reject) => {
      wx.request({
        url:url,
        type:'POST',
        data:params,
        success(res){
          resolve(res.data);
        },
        fail(err){
          reject(err);
        }
      })
    })
  }


  onShow() {
  }

  onLoad() {
  }
}
