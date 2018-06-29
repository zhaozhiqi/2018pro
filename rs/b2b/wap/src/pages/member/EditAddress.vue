<template>
    <div id="addressList">
        <CommonHeader :commonHeaderObj="commonHeaderObj"></CommonHeader>
        <main class="main">
           <div class="address-info">
                <p :class="{'error':errors.has('name')}"><b>收货人</b>
                <input type="text" 
                placeholder="请填写收货人姓名" 
                v-model="addressInfo.userName"
                v-validate ="'required|min:2|max:10'" 
                name="name"/></p> 
                <p>
                   <label><input type="radio" value="man" name="sex" v-model="addressInfo.userSex">先生</label> 
                   <label><input type="radio" value="woman" name="sex" v-model="addressInfo.userSex">女士</label>
                </p> 
                <p :class="{'error':errors.has('phone')}"><b>电话</b>
                <input type="text" 
                placeholder="请填写收货电话号码" 
                v-model="addressInfo.userPhone"
                v-validate ="'required|phone'" 
                name="phone" /></p> 
                <h3>收货地址</h3> 
                <p :class="{'error':errors.has('region')}"><b>地址</b><i class="ico-dingwei2"></i>
                <input type="text" 
                placeholder="编辑地址"
                v-model="addressInfo.region.value"
                v-validate ="'required|max:30'" 
                name="region"
                @click="showAddressPicker"
                /><i class="font-angle-right"></i></p> 
                <p :class="{'error':errors.has('detailedAddress')}" style="padding: 10px; height: auto;">
                <textarea placeholder="详细地址" 
                v-model="addressInfo.detailedAddress"
                v-validate ="'required|max:30'" 
                name="detailedAddress"></textarea></p> 
            </div> 
            <mt-popup v-model="regionVisible" position="bottom" class="region-popup">
                <mt-picker :slots="myAddressSlots" valueKey="name" :visibleItemCount	="5" @change="addressChange" :itemHeight="40"></mt-picker>
            </mt-popup>
            <!-- <div>
                <p><span>三级地址：</span>{{addressInfo.region.value}}</p>
                <p><span>省：</span>{{addressInfo.region.province}}</p>
                <p><span>市：</span>{{addressInfo.region.city}}</p>
                <p><span>县：</span>{{addressInfo.region.county}}</p>
                <p><span>省级代码：</span>{{addressInfo.region.provinceCode}}</p>
                <p><span>市级代码：</span>{{addressInfo.region.cityCode}}</p>
                <p><span>县级代码：</span>{{addressInfo.region.countyCode}}</p>
            </div> -->
        </main>
        <footer class="addressFooter">
            <div class="saveBtn" @click="saveBtn">确定</div>
        </footer>
    </div>
</template>

<script>
import CommonHeader from '@/components/common-header'
import Nodata from '@/components/nodata';
//引入省市区数据json文件
import threeLevelAddress from '@/pages/member/threeLevelAddress.json'

export default {
    name:"EditAddress",
    data(){
        return {
            nodataObj:{
                iconName:"rsicon-jingshi",
                nodataMsg:"暂无收货地址"
            },
            addressInfo:{
                detailedAddress:"赵志启new",
                otherAddress:"是的哈卡的",
                userName:"赵志启new",
                userPhone:"15584464444",
                userSex:"man",
                id:null,
                region:{
                    value:null,
                    province:null,
                    city:null,
                    county:null,
                    provinceCode:null,
                    cityCode:null,
                    countyCode:null
                }
            },
            commonHeaderObj: {
                bgStyle: {
                    color:"#333",
                    backgroundColor:"#fff"
                },
                title: "新增地址",
                isOtherShow: false,
                otherIconClass: "rsicon-gengduo"
            },
            editAddressType:null,
            editAddressId:null,
            regionVisible:false,
            regionInit:false,
            myAddressSlots: [
                //省
                {
                    flex: 1,
                    values: this.getProvinceArr(), //省份数组
                    className: 'slot1',
                    textAlign: 'center'
                },
                //分隔符
                {
                    divider: true,
                    content: '',
                    className: 'slot2'
                },
                //市
                {
                    flex: 1,
                    values: this.getCityArr("北京市"),
                    className: 'slot3',
                    textAlign: 'center'
                },
                {
                    divider: true,
                    content: '',
                    className: 'slot4'
                },
                //县
                {
                    flex: 1,
                    values: this.getCountyArr("北京市","北京市"),
                    className: 'slot5',
                    textAlign: 'center'
                }
            ]
        }
    },
    components: {
        Nodata,
        CommonHeader
    },
    mounted(){
        if(this.$route.query.id === 'add' || this.$route.query.id === undefined || this.$route.query.id === ''){
            this.editAddressType = 'add'         
        }else{
            this.commonHeaderObj.title = '编辑地址'
            this.editAddressType = 'edit'
            this.editAddressId = parseInt(this.$route.query.id);
            let addressList = this.$store.state.addressList;
            addressList.forEach((item, index)=>{
                if(item.id === this.editAddressId){
                    this.addressInfo = addressList[index]
                    return
                }
            })
        }
    },
    methods:{
        saveBtn(){
            this.$validator.validateAll().then((msg)=>{
                if(msg){
                    if(this.editAddressType === 'add'){
                        console.log('add-click')
                        let _item =  parseInt(this.$store.state.addressList.length)  
                        this.$store.commit('editAddress', {id:_item, operate :'add', obj:this.addressInfo});
                        this.$toast({
                            message: '新增成功',
                            type: 'warning'
                        });
                        this.$router.push({path:'/address'})
                    }else if(this.editAddressType === 'edit'){
                        console.log('edit-click-'+this.editAddressId)
                        this.$store.commit('editAddress', {id:this.addressInfo.id, operate :'edit', obj:this.addressInfo});
                        this.$toast({
                            message: '修改成功',
                            type: 'warning'
                        });
                        this.$router.push({path:'/address'})
                    }                    
                }else{
                    let list = this.errors.all();
                    console.log(list)
                    let msg = '请正确填写信息';
                    if(list[0] !== "validation.messages._default"){
                        msg = list[0];
                    }
                    this.$toast({
                        message: msg,
                        type: 'warning'
                    });
                   
                }
            })

        },
        showAddressPicker(){
            this.regionVisible = true;
        },
        addressChange(picker, values){
            // console.log(picker);
            // console.table(values);
            if (this.regionInit){
            //取值并赋值
            this.addressInfo.region.value = values[0]["name"] +' '+ values[1]["name"] +' '+ values[2]["name"];
            this.addressInfo.region.province = values[0]["name"];
            this.addressInfo.region.city = values[1]["name"];
            this.addressInfo.region.county = values[2]["name"];
            this.addressInfo.region.provinceCode = values[0]["code"];
            this.addressInfo.region.cityCode = values[1]["code"];
            this.addressInfo.region.countyCode = values[2]["code"];
    
            // console.log(picker.getSlotValue(0));
            // console.table(picker.getSlotValues(0));
            // console.table(picker.getValues());
            //给市、县赋值
            picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
            picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));
            }else {
                this.regionInit = true;
            }
        },
        //遍历json，返回省级对象数组
        getProvinceArr() {
            let provinceArr = [];
            threeLevelAddress.forEach(function (item) {
                let obj = {};
                obj.name = item.name;
                obj.code = item.code;
                provinceArr.push(obj);
            });
            return provinceArr;
        },
        //遍历json，返回市级对象数组
        getCityArr(province) {
            // console.log("省：" + province);
            let cityArr = [];
            threeLevelAddress.forEach(function (item) {
            if (item.name === province) {
                item.children.forEach(function (args) {
                    let obj = {};
                    obj.name = args.name;
                    obj.code = args.code;
                    cityArr.push(obj);
                });
            }
            });
            return cityArr;
        },
        //遍历json，返回县级对象数组
        getCountyArr(province,city){
            let countyArr = [];
            threeLevelAddress.forEach(function(item){
            if (item.name === province){
                item.children.forEach(function (args) {
                if (args.name === city){
                    args.children.forEach(function (param) {
                        let obj = {};
                        obj.name=param.name;
                        obj.code=param.code;
                        countyArr.push(obj);
                    })
                }
                });
            }
            });
            // console.log(countyArr);
            return countyArr;
        },

    }
}
</script>

<style scopde>
#addressList{
	overflow: hidden;
	height: 100%;
}

.main{
	position: absolute;
	top: 100px;
    bottom: 100px;
	left: 0;
    right: 0;
	width: 100%;
	overflow: auto;
}

.address-info{
    background-color: #fff;
}

.address-info>p{
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 20px;
    border-bottom: 1px solid #efefef;
}

.address-info>p.error{
    border: 1px solid #fa4d3e;
}

.address-info>p>b{
    width: 18%;
    font-size: 30px;
    color: #333;
    display: block;
}

.address-info>p>input{
    border: none;
    width: 65%;
    line-height: 96px;
    display: block;
}

.address-info>p>label{
    display: block;
    width: 50%;
    line-height: none;
    text-align: center;
    font-size: 28px;
}

.address-info>p>label input[type='radio']{
    display: inline-block;
    width: 40px;
    vertical-align: middle;
    margin-bottom: 8px;
    margin-right: 20px;
}

.address-info>h3{
    background-color: #efefef;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
}

.address-info>p>textarea{
    border: none;
    width: 100%;
    display: block;
}


.addressFooter{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%; 
}
.addressFooter .saveBtn{
    line-height: 100px;
    height: 100px;
    background-color: #1655bf;
    color: #fff;
    font-size: 32px;
    text-align: center;
}

.mint-popup{
    top: 25%;
    bottom: unset;
}
</style>
