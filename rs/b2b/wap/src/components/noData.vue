<template>
    <div class="nodata">
        <i class="rsiconfont" :class="nodata.iconName"></i><br/>
        <span class="noRemark">{{nodata.nodataMsg}}</span>
    </div>
</template>

<script>
export default {
    name:"nodata",
    data(){
        return {

        }
    },
    props: ['nodata']
}
</script>

<style scoped>
.nodata{
	padding-top: 30%;
	text-align: center;
	padding-bottom: 20px;
}

.nodata i{
	display: block;
	width: 180px;
	height: 180px;
	line-height: 180px;
	margin: 0 auto;
	border-radius: 50%;
	font-size: 100px;
	color: #fff;
	background-color: #999;
}

.nodata .noRemark{
	font-size: 28px;
    color: #999;
}
</style>
