<template>
  <div> 
			<div class="container" flexcontainer> 
			<ul class="block-item" w-369 v-for="(item, index) in proList" :key="index"> 
				<li> 
					<router-link to="/Product"> 
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
					</router-link>
				</li> 
			</ul> 		
			</div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      proList:[
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png"},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:""},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:""},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:""},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:""},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1eQR.SpXXXXbcaFXXXXXXXXXX-369-369.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:""},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1cuCrSpXXXXafaXXXXXXXXXXX-369-560.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:""},
				{bable:"新品",proImg:"//gw.alicdn.com/mt/TB1cuCrSpXXXXafaXXXXXXXXXXX-369-560.png",title:"荐形容的狠货厚高的工人的",price:"21",num:"888",prolink:""}
			]
    };
	}
};
</script>

<style scoped>	
.container{
	flex-wrap: wrap;
}
[w-369]{
	width: 369px;
}
[w-324-324]{
	width: 324px;
	background: #fff;
	overflow: hidden;
}
[w-324-324]{
  aspect-ratio:'324:324';
}

ul[w-369]:nth-child(2n) {
		margin-left: 12px;
	}
	
ul[w-369]	li {
		background: #fff;
  	margin-bottom: 12px;
}
[w-369] figcaption {
  padding: 20px;
}
[w-369] figcaption div {
  font-size: 22px;
  color: #999;
}
[w-369] h2 {
  margin: 0 0 30px;
  font-size: 26px;
  color: #333;
  font-weight: 400;
}

[w-369] h2 span, [w-369] i {
  color: #ff5000;
  font-size: 26px;
  margin-right: 20px;
}
[w-369] h2 span {
  background: #ff5000;
  color: #fff;
  display: inline-block;
  border-radius: 4px;
  text-shadow: 0 2px 2px #ff5000;
  padding: 2px 5px;
}
[w-369] i {
  font-size: 20px;
	margin-right: 5px;
	font-style: normal;
}

.block-5 li {
	background: #fff;
	border-bottom: 1px solid transparent;
	margin-bottom: 15px;
	border-image: svg(1px-border param(--color #333)) 2 2 stretch;
}
[aspectratio-content] img {
  width: 100%;
  height: 100%;
  vertical-align: top;
}

.block-5 figcaption {
  flex: 1;
  padding: 30px;
}
.block-5 h2 {
  font-size: 32px;
  font-weight: 400;
  margin: 0 0 20px;
}
.block-5 figcaption div {
  font-size: 30px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
