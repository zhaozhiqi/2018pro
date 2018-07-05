<template>
    <footer id="footer">
        <nav>
            <router-link :to="item.link" class="item" v-for="(item, index) in footerMenu" :key="index"  :class="[{'inactive':inactive==item.inactive},item.className]">
                <!-- <span :class="item.spanClassName"></span> -->
                <i :class="[item.iconClassName, 'rsiconfont']"></i>
                <span class="label">{{item.name}}</span>
                <em class="num" v-show="cartCount>0 && item.className == 'a-cart'">{{cartCount}}</em>
            </router-link>
        </nav>
    </footer>
</template>

<script>
export default {
    data(){
        return {
            footerMenu:[
                {
                    name:'首页',
                    inactive:'Home',
                    link:'/home',
                    className:'a-home',
                    spanClassName:'nav-home',
                    iconClassName:'rsicon-home1'
                },
                {
                    name:'分类',
                    inactive:'Classify',
                    link:'/classify',
                    className:'a-type',
                    spanClassName:'nav-type',
                    iconClassName:'rsicon-fenlei'
                },
                {
                    name:'拼团',
                    inactive:'Group',
                    link:'/Group',
                    className:'a-home',
                    spanClassName:'nav-home',
                    iconClassName:'rsicon-pintuanzhuanqu'
                },
                {
                    name:'购物车',
                    inactive:'Cart',
                    link:'/cart',
                    className:'a-cart',
                    spanClassName:'nav-cart',
                    iconClassName:'rsicon-31gouwuche'
                },
                {
                    name:'我',
                    inactive:'Member',
                    link:'/member',
                    className:'a-member',
                    spanClassName:'nav-member',
                    iconClassName:'rsicon-yonghu-tianchong'
                },
            ],
            inactive:'Home'
            
        }
    },
    mounted(){
        let to = this.$route.name;
        this.inactive = to;
    },
	computed: {
		cartCount(){
			return this.$store.state.cartCount;
		}
	},
}
</script>

<style scoped>
#footer{
    height: 100px;
    background: #fff;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 26px
}

#footer nav{
    display: flex;
    border-top: 1px solid #eee;
    padding-top: 10px;
}

#footer nav .item{
    flex: 1;
    text-align: center;
    vertical-align: middle;
    color: #929292;
    cursor: none;
}

#footer nav .item.inactive{
    background-size: contain;
    color: #1655bf;
}

#footer nav .item span {
    width: 40px;
    height: 40px;
    display: inline-block;
    background-size: contain;
}

#footer nav .item .rsiconfont {
    margin: 0 auto;
    width: 50px;
    height: 45px;
    line-height: 40px;
    display: block;
    font-size: 50px; 
    background-size: contain;
}

#footer nav .item span.label {
    width: auto;
    height: auto;
    display: block;
}
.a-cart{
    position:relative;
}
.nav-home{
    background-image: url('../../static/images/public/nav-home.png');
}
.nav-type{
    background-image: url('../../static/images/public/nav-type.png');
}
.nav-drink{
    background-image: url('../../static/images/public/nav-quickDrink.png');
}
.nav-cart{
    background-image: url('../../static/images/public/nav-cart.png');
}
.nav-member{
    background-image: url('../../static/images/public/nav-member.png');
}
.item.inactive .nav-home{
    background-image: url('../../static/images/public/nav-home-active.png');
}
.item.inactive .nav-type{
    background-image: url('../../static/images/public/nav-type-active.png');
}
.item.inactive .nav-cart{
    background-image: url('../../static/images/public/nav-cart-active.png');
}
.item.inactive .nav-member{
    background-image: url('../../static/images/public/nav-member-active.png');
}


.item.a-cart em{
    position: absolute;
    top: 0;
    right: 10%;
    display: block;
	width:30px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	background-color: #fa4d3e;
	font-size: 22px;
	color: #fff;
	border-radius: 50%;
	overflow: hidden;
}
</style>
