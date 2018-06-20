<template>
  <div id="typeList"> 
		<ul class="">
			<li class="con-item" 
			v-for="(item, index) in goodsList"
			:key="index" >
				<figure>
						<img class="con-item-img" :src="item.proImg"/>
				</figure>
				<figcaption> 
					<div class="con-item-info">
						<p class="con-item-info-title">{{item.title}}</p>
						<p class="con-item-info-price">
							<strong><b>¥</b>{{item.price}}</strong>
							<s>¥{{item.price}}</s>
						</p>
					</div>
					<div class="con-item-btn"><i class="ico-cart"></i></div>
				</figcaption> 	
			</li>
		</ul>
  </div>
</template>

<script>
export default {
  name: 'TypeList',
  data() {
    return {
      goodsList: [
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"9999.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"9999.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
              ]
    }
	},
	created(){
		// console.log(this.proinfo,'proinfo')
	},
	mounted(){
		// this.proList = this.proinfo;
	},
	props:{
		// proinfo:{
		// 		type: Array,
		// 		required: true
		// }
	}
};
</script>

<style scoped>	
#typeList{
	background: #efefef
}

#typeList ul{
	display: flex;
	flex-wrap: wrap;
}

.con-item{
	background: #fff;
	flex: 0 0 48.5%;
	/* margin-top: 10px; */
	margin-bottom: 10px;
	margin-left: .75%;
	margin-right: .75%;
	line-height: 60px;
	padding: 10px;
	text-align:left; 
	font-size: 26px;
}

/* figure {
} */

.con-item-info-title{
	  overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.con-item-info-price{
	line-height: 50px;
	height: 50px;
	color: #fa4d3e;
}

.con-item-info-price s{
	  color: #8f8f94;
    float: right;
		font-size: 18px;
		float: right;
}

.con-item-btn{
	background: rgb(93, 230, 116);
	border-radius: 40px;
	overflow: hidden;
}

.ico-cart{
	width: 40px;
	height: 40px;
	display: block;
	font-size: 24px;
	margin:10px auto;
	background: url("../../static/images/public/nav-cart.png") no-repeat;
	background-size: 100%;
}

</style>
