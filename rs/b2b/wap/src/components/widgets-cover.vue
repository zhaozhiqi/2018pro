<template>
    <div class="widgets-cover">
        <div class="cover-bg" @click="closeSelf"></div>
        <div class="cover-content">
            <div class="sku-wrap">
                <div class="_header">
                    <div class="img-wrap">
                        <img :src=changeInfo.proChangeImage alt="">
                    </div>
                    <div class="_main">
                        <div class="price-wrap">  
                            <span class="price">¥{{price}}</span>  
                        </div>   
                        <div class="stock">库存{{changeInfo.proStock}}件</div>   
                        <div class="sku-info">请选择:<span>{{changeInfo.hint}}</span></div>
                    </div>
                    <span class="sku-close rsiconfont rsicon-shanchu"  @click="closeSelf"></span>
                </div>
                <div class="_body">
                    <div class="body-item">
                        <ul class="sku-list-wrap">
                            <li v-for="(item, index) in changeInfo.proChangeList" :key="index">
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
                                    <button class="decrease" :class="{'disabled':changeInfo.saleNum <= 1}" @click="editSaleNum('minu')">-</button> 
                                    <input id="number" type="number" v-model='changeInfo.saleNum'> 
                                    <button class="increase" :class="{'disabled':changeInfo.saleNum >= changeInfo.proStock}" @click="editSaleNum('add')">+</button>
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
            price: null,
            firstPrice: null,
            decideVal:{
                id: null,
                num: null,
                saleType: null,
                typeList: []
            }
        }
    },
    mounted(){
        if(this.saleType === 'group'){
            this.firstPrice = this.changeInfo.proGroupPrice
            this.price = this.changeInfo.proGroupPrice
        }else if(this.saleType === 'self'){
            this.firstPrice = this.changeInfo.proSelfPrice
            this.price = this.changeInfo.proSelfPrice
        }
    },
    props:{
        saleType:{
            type: String,
            default: 'group'                        
        },
        changeInfo: {
            type: Object,
            required: true
        }
    },
    methods:{
        closeSelf(){
            this.$emit('widgetsCoverShow', this.selfShow)
        },
        changeItem(parent, children){
            let oldChecked = children.dataChecked 
            let dataImage = children.dataImage 
            dataImage!==undefined?this.changeInfo.proChangeImage=dataImage:this.changeInfo
            let dataPrice = children.dataPrice 
            dataPrice!==undefined?this.price=dataPrice:this.price=this.firstPrice       
            let dataStock = children.dataStock 
            dataStock!==undefined?this.changeInfo.proStock=dataStock:this.changeInfo
            this.changeInfo.proChangeList.forEach(item => {
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
                if(this.changeInfo.saleNum >= this.changeInfo.proStock) {
                    return
                }
                this.changeInfo.saleNum++;
                num = 1;
            }else if(flag == 'minu') {
                if(this.changeInfo.saleNum <= 1) {
                    return
                }
                this.changeInfo.saleNum--;
                num = -1;
            }
        },
        inspectAllType(){
            let allChecked = false
            let breakTodo = false
            let typeList = []
            this.changeInfo.proChangeList.forEach(item => {
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
                this.changeInfo.proId!==undefined?this.decideVal.id=this.changeInfo.proId:this.decideVal
                this.changeInfo.saleNum!==undefined?this.decideVal.num=this.changeInfo.saleNum:this.decideVal
                this.decideVal.saleType=this.saleType
                this.$emit('saveDecideVal',this.decideVal)
                this.closeSelf()
            }
        }

    }
}
</script>

<style scoped>





</style>
