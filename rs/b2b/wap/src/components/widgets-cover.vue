<template>
    <div class="widgets-cover">
        <div class="cover-bg" @click="closeSelf"></div>
        <div class="cover-content">
            <div class="sku-wrap">
                <div class="_header">
                    <div class="img-wrap">
                        <img :src=changeInfo.image alt="">
                    </div>
                    <div class="_main">
                        <div class="price-wrap">
                            <span class="price">¥{{changeInfo.price}}</span>  
                        </div>   
                        <div class="stock">库存{{changeInfo.stock}}件</div>   
                        <div class="sku-info">请选择:<span>口味</span></div>
                    </div>
                    <span class="sku-close rsiconfont rsicon-shanchu"  @click="closeSelf"></span>
                </div>
                <div class="_body">
                    <div class="body-item">
                        <ul class="sku-list-wrap">
                            <li v-for="(item, index) in changeInfo.list" :key="index">
                                <h2 :typeId=item.typeId>{{item.typeName}}</h2>
                                <div class="items" >
                                    <a v-for="(itemI, indexI) in item.con" :key="indexI"
                                    href="javascript:void(0)" 
                                    :dataValue=itemI.dataValue
                                    :dataImage=itemI.dataImage 
                                    :class="{'checked':itemI.dataChecked}" 
                                    :dataChecked=itemI.dataChecked
                                    @click="changeItem(item,itemI)">{{itemI.dataName}}</a>
                                </div>
                            </li>
                            <!-- <li>
                                <h2 id="prop_title_1">尺码</h2>
                                <div class="items" role="radiogroup" aria-labelledby="prop_title_1">  
                                    <a role="radio" href="javascript:void(0)" data-value="20509:28314" class="" aria-checked="false">S</a>  <a role="radio" href="javascript:void(0)" data-value="20509:28315" class="" aria-checked="false">M</a>  
                                    <a role="radio" href="javascript:void(0)" data-value="20509:28316" class="" aria-checked="false">L</a>  <a role="radio" href="javascript:void(0)" data-value="20509:28317" class="" aria-checked="false">XL</a>  
                                    <a role="radio" href="javascript:void(0)" data-value="20509:28318" class="" aria-checked="false">XXL</a>  <a role="radio" href="javascript:void(0)" data-value="20509:28319" class="" aria-checked="false">XXXL</a>  
                                </div>
                            </li> -->
                        </ul>
                        <div class="number-wrap">
                            <div class="number-line">
                                <label for="number">购买数量</label>
                                <span class="J_limitTxt limit-txt"></span>
                                <div class="number">
                                    <button class="decrease" :class="{'disabled':changeInfo.num <= 1}" @click="editSaleNum('minu')">-</button> 
                                    <input id="number" type="number" v-model='changeInfo.num'> 
                                    <button class="increase":class="{'disabled':changeInfo.num >= changeInfo.stock}" @click="editSaleNum('add')">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="_footer">
                    <a class="ok " role="button" @click="decideChange">确定</a>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
    data(){
        return {
            selfShow:false,
            changeInfo:{
                id:'1000',
                price:'29.99',
                stock: 9,
                image:'https://img.alicdn.com/imgextra/i3/2398639760/TB1_HXTa_tYBeNjy1XdXXXXyVXa_!!0-item_pic.jpg_200x200Q50s50.jpg',
                num:'2',
                list:[
                    {
                        typeId:1,
                        typeName:'颜色分类',
                        con:[
                            {
                                dataName: '藏蓝',
                                dataValue: '1001:01',
                                dataImage: '//gw.alicdn.com/bao/uploaded/TB1hQQaspuWBuNjSspnL6R1NVXa',
                                dataChecked: false
                            },
                            {
                                dataName: '黄色',
                                dataValue: '1001:02',
                                dataImage: '//gw.alicdn.com/bao/uploaded/TB1jDTKgnCWBKNjSZFtL6SC3FXa',
                                dataChecked: false
                            },
                            {
                                dataName: '橘色',
                                dataValue: '1000:03',
                                dataImage: '//gw.alicdn.com/bao/uploaded/TB1veDEgbZnBKNjSZFrL6SRLFXa',
                                dataChecked: false
                            }
                        ]
                    },
                    {
                        typeId:2,
                        typeName:'尺码',
                        con:[
                            {
                                dataName: 'S',
                                dataValue: '1002:01',
                                dataChecked: false
                            },
                            {
                                dataName: 'M',
                                dataValue: '1002:02',
                                dataChecked: false
                            },
                            {
                                dataName: 'L',
                                dataValue: '1002:03',
                                dataChecked: false
                            }
                        ]

                    }
                ]
            },
            decideVal:{
                id:null,
                num:null,
                typeList:[]
            }
        }
    },
    methods:{
        closeSelf(){
            this.$emit('widgetsCoverShow', this.selfShow)
        },
        changeItem(parent, children){
            let oldChecked = children.dataChecked 
            let dataImage = children.dataImage 
            dataImage!==undefined?this.changeInfo.image=dataImage:this.changeInfo
            let dataPrice = children.dataPrice 
            dataPrice!==undefined?this.changeInfo.price=dataPrice:this.changeInfo
            let dataStock = children.dataStock 
            dataStock!==undefined?this.changeInfo.stock=dataStock:this.changeInfo
            this.changeInfo.list.forEach(item => {
                if(oldChecked === false){
                    if(item.typeId === parent.typeId){
                        item.con.forEach(itemI=>{
                            if(itemI.dataValue === children.dataValue){
                                itemI.dataChecked = true
                            }else{
                                itemI.dataChecked = false
                            }
                        })
                    }
                }else{
                    if(item.typeId === parent.typeId){
                        item.con.forEach(itemI=>{
                            itemI.dataChecked = false
                        })
                    }
                }
            });
        },
        editSaleNum(flag) {
            let num = 0;
            if(flag == 'add') {
                if(this.changeInfo.num >= this.changeInfo.stock) {
                    return
                }
                this.changeInfo.num++;
                num = 1;
            }else if(flag == 'minu') {
                if(this.changeInfo.num <= 1) {
                    return
                }
                this.changeInfo.num--;
                num = -1;
            }
        },
        inspectAllType(){
            let allChecked = false
            let breakTodo = false
            let typeList = []
            this.changeInfo.list.forEach(item => {
                allChecked = false
                item.con.forEach(itemI=>{
                    if(itemI.dataChecked === true){                        
                        allChecked = true
                        typeList.push(itemI.dataValue)                                                
                        return 
                    }
                })
                if(!allChecked && !breakTodo){
                    this.$toast({
                        message: '请选择'+item.typeName,
                        type: 'warning'
                    });
                    breakTodo = true
                    return 
                }
            })
            this.decideVal.typeList = typeList
            // console.log(allChecked,'allChecked',typeList)
            return allChecked
        },
        decideChange(){
            if(this.inspectAllType()){
                this.changeInfo.id!==undefined?this.decideVal.id=this.changeInfo.id:this.decideVal
                this.changeInfo.num!==undefined?this.decideVal.num=this.changeInfo.num:this.decideVal
                this.$emit('saveDecideVal',this.decideVal)
                this.closeSelf()
            }
        }

    }
}
</script>

<style scoped>
.widgets-cover{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    pointer-events: none;
    opacity: 0;
    transition: opacity .3s 80ms;
    will-change: opacity;
}
.widgets-cover.show{
    pointer-events: auto;
    opacity: 1;    
}
@keyframes opacity {
    0% {top: 100%;}
    100% {top: 0%;}
}
.widgets-cover .cover-bg {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0,0,0,.5);
}
.widgets-cover.show .cover-bg {
    background-color: rgba(0,0,0,.5);
}

.widgets-cover .cover-content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 20%;
    background-color: #fff;
    -webkit-transition: -webkit-transform .3s cubic-bezier(0,0,.25,1) 80ms;
    transition: transform .3s cubic-bezier(0,0,.25,1) 80ms;
    -webkit-transform: translate3d(0,100%,0);
    transform: translate3d(0,100%,0);
    will-change: transform;
    box-shadow: 0 -1px 40px rgba(0,0,0,.3);
}
.widgets-cover.show .cover-content {
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
}

.sku-wrap{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.sku-wrap ._header {
    padding: 20px 0 20px 254px;
    position: relative;
}

.sku-wrap ._header .img-wrap {
    width: 200px;
    height: 200px;
    position: absolute;
    top: -56px;
    left: 20px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,.1);
    padding: 1px;
    background-color: #fff;
}
.sku-wrap ._header .img-wrap img {
    width: 100%;
    height: 100%;
}

.sku-wrap ._header ._main .price {
    font-family: arial;
    font-size: 32px;
    color: #FF0036;
    word-wrap: break-word
}

.sku-wrap ._header ._main .sku-info {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 72px;
    overflow: hidden
}

.sku-wrap ._header ._main .sku-info span {
    margin-right: 10px
}

.sku-wrap ._header .sku-close {
    position: absolute;
    top: 12px;
    right: 20px;
    width: 40px;
    height: 40px;

}

.sku-wrap ._body {
    padding: 0 30px 20px;
    position: absolute;
    bottom: 96px;
    top: 186px;
    left: 0;
    right: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch
}

.sku-wrap ._body:before {
    content: "";
    display: block;
    border-bottom: 1px solid rgba(0,0,0,.1)
}

.sku-wrap ._body h2 {
    color: #666;
    font-size: 26px;
    font-weight: 400;
    padding-bottom: 20px;
    padding-top: 20px
}

.sku-wrap ._footer {
    display: block;
    display: -webkit-box;
    display: flex;
    height: 96px;
    text-align: center;
    line-height: 96px;
    color: #FFF;
    width: 100%;
    position: absolute;
    bottom: 0
}

.sku-wrap ._footer span {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1
}

.sku-wrap ._footer .info {
    display: none
}

.sku-wrap ._footer .ok {
    display: block;
    font-size: 30px;
    line-height: 100px;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #fff;
    background-color: #FF0036
}

.sku-wrap ._footer .ok.disabled {
    background-color: #cfcfcf;
    color: rgba(255,255,255,.4)
}

.bundle-wrap li,.sku-list-wrap li {
    border-bottom: 1px solid rgba(0,0,0,.1);
    padding-bottom: 20px
}

.bundle-wrap .items a,.sku-list-wrap .items a {
    position: relative;
    display: inline-block;
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
    padding: 12px 24px;
    border-radius: 16px;
    font-size: 26px;
    margin: 0 16px 16px 0;
    color: #555
}

.sku-list-wrap .items a .sku-dot {
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #fff;
    position: relative;
    top: -1px;
    margin-right: 5px
}

.sku-list-wrap .items a .cornerIcon {
    position: absolute;
    right: -1px;
    top: -1px;
    width: 13px;
    max-height: 20px
}

.bundle-wrap .items .disabled,.sku-list-wrap .items .disabled {
    color: #cfcfcf
}

.bundle-wrap .items .checked,.sku-list-wrap .items .checked {
    border-color: #FF0036;
    background-color: #FF0036;
    color: #fff
}

.number-wrap .number-line,.services-wrap .items {
    border-bottom: 1px solid rgba(0,0,0,.1)
}


.number-wrap .number-line {
    padding-bottom: 20px;
    padding-top: 20px;
    line-height: 72px
}

.number-wrap .number-line::after {
    content: '\20';
    height: 0;
    display: block;
    clear: both
}

.number-wrap label {
    color: #666;
    font-size: 26px;
    font-weight: 400
}

.number-wrap .limit-txt {
    color: #666;
    font-size: 26px
}

.number-wrap .number {
    height: 72px;
    width: 200px;
    border-radius: 6px;
    float: right
}

.number-wrap .number button,.number-wrap .number input[type=number] {
    float: left
}

.number-wrap .number input[type=number] {
    line-height: 64px;
    height: 68px;
    width: 72px;
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    margin: 0
}

.number-wrap .number button {
    border: none;
    outline: 0;
    line-height: 64px;
    height: 68px;
    width: 60px;
    font-size: 48px;
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5
}

.number-wrap .number .decrease {
    border-right: 1px solid #fff
}

.number-wrap .number .increase {
    border-left: 1px solid #fff
}

.number-wrap .number .disabled {
    color: #cfcfcf
}





</style>
