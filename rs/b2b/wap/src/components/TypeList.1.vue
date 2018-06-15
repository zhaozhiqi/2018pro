<template>
  <div id="typeList"> 
		<!-- <div class="topMenu">
			<nav>
				<div class="topMenu-item"><span>综合</span></div>
				<div class="topMenu-item"><span>销量</span></div>
				<div class="topMenu-item shengjia"><span>价格</span><i class="ico-price"></i></div>
			</nav>
		</div> -->
		<div class="main" flexcontainer> 
			<div class="leftMenu">
				<nav>
					<div class="leftMenu-item" 
					v-for="(item, index) in proList" 
					:key="index" 
					:class="{ active:false }"
					@click="getProIbnfo(index)">{{item.typeIIName}}</div>
				</nav>
			</div>
			<div class="con">
				<ul>
					<div class="con-item" 
					v-for="(item, index) in proList[0].content"
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
					</div>
				</ul>
			</div>
		<!-- <ul class="block-item" w-369 v-for="(item, index) in proList[this.typeII].content" :key="index"> 
			<li> 
				<figure> 
					<img :src="item.proImg" alt="" class="proImg"> 
				</figure> 
				<figcaption> 
					<h2>
						<span class="bable">{{item.bable}}</span>
						{{item.title}}</h2> 
					<div>
					<span><i>¥</i>{{item.price}}</span> 已有{{item.num}}人付款
					</div> 
				</figcaption>
			</li> 
		</ul> 		 -->
		</div>
  </div>
</template>

<script>
export default {
  name: 'TypeList',
  data() {
    return {
      proList: [
						{
              typeII:"1",
              typeIIName:"全部",
              content:[
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"9999.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"9999.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
              ]
            },
            {
              typeII:"2",
              typeIIName:"分类II-1",
              content:[
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
              ]
            },
            {
              typeII:"3",
              typeIIName:"分类II-2",
              content:[
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
                	{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"52度剑南春（新包装）500ml",price:"888.00",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
              ]
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
            {
              typeII:"3",
              typeIIName:"分类II-2"
						},
				],
				typeII : 0
    };
	},
	created(){
		console.log(this.proinfo,'111')
	},
	mounted(){
		// this.proList = this.proinfo;
	},
	props:{
		proinfo:{
				type: Array,
				required: true
		}
	}
};
</script>

<style scoped>	
#typeList{
	text-align: center;
	line-height: 80px;
	flex: 1;
	height: 100%;
}

.topMenu{
	
}

.topMenu nav{
	display: flex;
}

.topMenu nav .topMenu-item{
	flex: 1;
}

.ico-price{
	  width: 24px;
    height: 24px;
    background-image: url("../../static/images/public/price.png");
    background-repeat: no-repeat;
    display: inline-block;
    position: relative;
    top: 2px;
    left: 2px;
		
		background-size: 100%;
}

.shengjia>.ico-price{
	background-image: url("../../static/images/public/price1.png");
}
.sjiangjia>.ico-price{
	background-image: url("../../static/images/public/price2.png");
}

.main{
	padding-top: 20px;
	background: #efefef;
	flex-wrap: wrap;
	max-height: 960px;
	max-height: 700px;
}

.leftMenu{
	flex: 0 0 20%;
	margin-right: 20px;
	background: #fff;
	overflow-y: auto;
}

.leftMenu nav{
	display: flex;
	flex-direction: column;

}

.leftMenu nav .leftMenu-item{
	flex: 1;
	line-height: 80px;
	height: 80px;
}

.con{
	/* background: #fff; */
	flex: 1;
	overflow-y: auto;	
}

.con ul{
	display: flex;
	flex-wrap: wrap;
}

.con-item{
	background: #fff;
	flex: 0 0 48.5%;
	margin-bottom: 10px;
	margin-right: 1.5%;
	line-height: 60px;
	padding: 10px;
	text-align:left; 
	font-size: 26px;
}

figure {
}

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
	background: #ccc;
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
