<template>
	<div id="seach-site">
    <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>    
    <div class="seachCon">
      <router-link to="/SeachCity" class="city">
        <span>{{defaultCity}}</span>
        <i class="rsiconfont rsicon-jiangxu"></i>
      </router-link>
      <div class="seachIntOut">
        <i class="rsiconfont rsicon-sousuo"></i>
        <input 	type="text"
          id="suggestId"
          class="seachInt"
          placeholder="请输入地址"/>
      </div>
    </div>
		<main class="main">
      <div id="areaNow" v-if="areaNow">当前定位：{{areaNow}}</div>
      <div id="l-map" style="height:100%" v-show="false"></div>
      <div id="searchResultPanel"></div>
		</main>		
	</div>
</template>

<script>
import CommonHeader from '@/components/common-header'
import Cookies from 'js-cookie'

export default {
	name: 'SeachSite',
	data(){
		return {
      commonHeaderObj: {
          bgStyle: {
              color:"#fff",
              backgroundColor:"#1655bf"
          },
          title: "定位当前位置",
          isOtherShow: false,
          otherIconClass: "rsicon-gengduo"
      },
      H:null,
      defaultCity: null,
      areaNow: null
		}
	},
	components: {
    CommonHeader
  },
  created(){
    const key1= 'DEFAULT_CITY'
    const key2 = 'AREA_NAME'
    const defaultCity = Cookies.get(key1)
    const areaNow = Cookies.get(key2)
    if(defaultCity !== undefined) {
      this.defaultCity = defaultCity
    }else {
      this.defaultCity = '杭州市'
    }
    if(areaNow !== undefined) {
      this.areaNow = areaNow
    }else {
      this.areaNow = '暂无定位'
    }
  },
	mounted(){
    console.log('mounted')
    var map = new BMap.Map("l-map");
	  map.centerAndZoom(this.defaultCity,12); 
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
      {"input" : "suggestId"
    });
    let that = this
    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
      var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }    
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
        
        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }    
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        //that.G("searchResultPanel").innerHTML = str;
    });

    var myValue;    
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
      var _value = e.item.value;
      myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
      //that.G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
     
      Cookies.set('DEFAULT_CITY', _value.city)
      that.defaultCity = _value.city

      const myFun = function(){
        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
        map.centerAndZoom(pp, 18);
        map.addOverlay(new BMap.Marker(pp));    //添加标注
        that.H = pp
        Cookies.set('AREA_LNG', pp.lng)
        Cookies.set('AREA_LAT', pp.lat)
        Cookies.set('AREA_NAME', myValue)
        
        that.areaNow = myValue
        
        that.$jsonp('http://api.map.baidu.com/geoconv/v1/?coords='+ that.H.lng +','+ that.H.lat +'&from=5&to=3&ak=r2uHqLPb2mFh3kKGLw52GS3hgQwpEIhO').then(json => {
          const _data = json.result[0]
          const G_lng = _data.x
          const G_lat = _data.y
          Cookies.set('AREA_LNG', G_lng)
          Cookies.set('AREA_LAT', G_lat)
          
        }).catch(err => {
          console.log(err,'经纬度转码报错')
        })
        that.$router.push({ path: '/Home' })
      }
      map.clearOverlays();
      var local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
      });
      local.search(myValue);

    });

	},
	methods:{
		goBack(){
      window.history.go(-1)
    },      
    G(id) {
      return document.getElementById(id);
    }
	}
}
</script>
