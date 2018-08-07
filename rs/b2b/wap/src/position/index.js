import Vue from 'vue'
import router from '@/router'
import VueJsonp from 'vue-jsonp'
import Cookies from 'js-cookie'
import { MessageBox } from 'mint-ui'
import { isWeiXin } from '@/utils'
Vue.use(VueJsonp)

Cookies.remove('AREA_LNG')
Cookies.remove('AREA_LAT')
Cookies.remove('AREA_NAME')
Cookies.remove('DEFAULT_CITY')

  getLocation()
  //opsitionSite ()

export function getLocation(){
  if (navigator.geolocation){ 
    navigator.geolocation.getCurrentPosition(showPosition,showError); 
  }else{ 
    changeSite()
  } 
}

function showPosition(position){ 
  var lng = position.coords.longitude //经度
  var lat = position.coords.latitude //纬度
  geoconvBaiDu(lng,lat)
  geocoderBaiDu(lng,lat)
}

// $.ajax({
//   url:'http://api.map.baidu.com/geocoder/v2/?location=120.2157,30.2077&output=json&ak=r2uHqLPb2mFh3kKGLw52GS3hgQwpEIhO',
//   type:'GET',
//   dataType:'JSONP',
//   success:function(data,status,xhr){
//     console.log(data)
//   }
// })

function showError(error){
  switch(error.code) {
    case error.PERMISSION_DENIED:
      //console.log("定位失败,用户拒绝请求地理定位")
      changeSite()
      break;
    case error.POSITION_UNAVAILABLE:
      //console.log("定位失败,位置信息是不可用")
      changeSite()
      break;
    case error.TIMEOUT:
      //console.log("定位失败,请求获取用户位置超时")
      changeSite()
      break;
    case error.UNKNOWN_ERROR:
      //console.log("定位失败,定位系统失效")
      changeSite()
      break;
  } 
} 

// if(isWeiXin() === true){
//   console.log('微信端：'+isWeiXin())
//   // getLocation()
//   // opsitionSite ()
// }else{
//   // 百度地图API功能
//   // var map = new BMap.Map("allmap");
//   // var point = new BMap.Point(116.331398,39.897445);
//   // map.centerAndZoom(point,12);
//   console.log('微信端：'+isWeiXin())
  
//   // getLocation()
//   // opsitionSite ()
//   //关于状态码
//   //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
//   //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
//   //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
//   //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
//   //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
//   //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
//   //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
//   //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
//   //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
// }

function opsitionSite () {
  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
    //if(this.getStatus() == BMAP_STATUS_SUCCESS){
    if(false){
        // var mk = new BMap.Marker(r.point);
      // map.addOverlay(mk);
      // map.panTo(r.point);
      Cookies.set('AREA_LNG', r.point.lng)
      Cookies.set('AREA_LAT', r.point.lat)
      Cookies.set('AREA_NAME', r.address.city)
      Cookies.set('DEFAULT_CITY', r.address.city)
      // alert('您的位置：'+r.point.lng+','+r.point.lat);
      // alert('您的位置：'+r.address.province+','+r.address.city);
      alert('您的位置：'+r.point.lng+','+r.point.lat);
      console.log('您的位置：'+r.point.lng+','+r.point.lat);
      console.log("定位对象:",r);
      console.log(r.address.province,r.address.city);
    }
    else {
      alert('failed'+this.getStatus());
      changeSite()
    }        
  },{enableHighAccuracy: true})
}

function changeSite(){
  MessageBox.alert('无法定位到您当前位置，请手动选择').then(action => {
    router.push({ path: '/SeachSite' })
  })
}

function geoconvBaiDu(lng,lat){
  Vue.jsonp('http://api.map.baidu.com/geoconv/v1/?coords='+ lng +','+ lat +'&from=1&to=3&ak=r2uHqLPb2mFh3kKGLw52GS3hgQwpEIhO').then(json => {
    const _data = json.result[0]
    const G_lng = _data.x
    const G_lat = _data.y
  }).catch(err => {
  　console.log(err,'经纬度转码报错')
  })
}
function geocoderBaiDu(lng,lat){
  Vue.jsonp('http://api.map.baidu.com/geocoder/v2/?location='+ lat +','+ lng +'&coordtype=wgs84ll&pois=1&output=json&ak=r2uHqLPb2mFh3kKGLw52GS3hgQwpEIhO').then(json => {
    const _data = json.result
    Cookies.set('AREA_NAME', _data.formatted_address)
    Cookies.set('DEFAULT_CITY', _data.addressComponent.city)
  }).catch(err => {
    　console.log(err,'逆转码报错')
  })
}