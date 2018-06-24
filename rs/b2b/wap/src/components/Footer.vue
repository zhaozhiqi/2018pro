<template>
    <footer id="footer">
        <nav>
            <router-link to="/home" class="item a-home inactive"><span class="nav-home"></span><span class="label">首页</span></router-link>
            <router-link to="/classify" class="item a-type"><span class="nav-type"></span><span class="label">分类</span></router-link>
            <router-link to="/home" class="item a-drink"><span class="nav-drink"></span><span class="label">拼团</span></router-link>
            <router-link to="/cart" class="item a-cart"><span class="nav-cart"></span><span class="label">购物车</span><em class="num">{{cartNum}}</em></router-link>
            <router-link to="/member" class="item a-member"><span class="nav-member"></span><span class="label">我</span></router-link>
        </nav>
    </footer>
</template>

<script>
export default {
    data(){
        return {
            cartNum: 10
        }
    }
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
