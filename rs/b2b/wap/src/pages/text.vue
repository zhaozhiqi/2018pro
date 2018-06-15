<template>
    <div id="aaa">
        <header>header</header>
        <div class="bbb">
        <!-- <main> -->
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
            1</br>
            1</br>
        <!-- </main> -->
        </div>
        <footer>footer</footer>
    </div>
</template>

<script>
export default {

}
</script>

<style>
#aaa{
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
    padding: 100px 0;
    width: 100%;
    /* overflow:hidden; */
}
/* main{
    overflow-y: auto
} */
</style>
