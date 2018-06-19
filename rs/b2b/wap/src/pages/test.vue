<template>
    <div id="out">
        <header>header1</header>
        <div class="main">
            0</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            1</br>
            10</br>
        </div>
        <footer>footer</footer>
    </div>
</template>

<script>
export default {

}
</script>

<style>
/* #out{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center
}
header,footer{
    height: 100px;
    line-height: 100px;
    background: yellow;
    flex-shrink: 0;
    flex-grow: 0;
}
header{
    position: fixed;    
    width: 100%;
    top: 0;
}
footer{
    position: fixed;
    width: 100%;
    bottom: 0;
}
.bbb{
    height: calc(100vh - 61px);
    flex: 1;
    width: 100%;    
	overflow: auto
} */



#out{
    text-align: center;
}
header,footer{    
    width: 100%;
    height: 50px;
    text-align: center
}
header{
    background-color: #f55d54;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
}
footer{
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    font-size: 12px;
    border-top: 1px solid #e7e7e7;
}
.main{
    position: absolute;
    top: 50px;
    width: 100%;
    left: 0;
    bottom: 50px;
    overflow: auto;
}

</style>
