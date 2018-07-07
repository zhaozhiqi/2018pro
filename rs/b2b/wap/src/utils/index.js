export function countDown(time){
    let now = new Date();  
    let nowGetTime = new Date().getTime();  
    let end = new Date(time).getTime();
    //时间差  
    let leftTime = end-nowGetTime;  
    //console.log(leftTime,end,now,time)
    //定义变量 d,h,m,s保存倒计时的时间  
    let d,h,m,s,ms;  
    if (leftTime>=0) {          
        d = Math.floor(leftTime/1000/60/60/24); 
        h = Math.floor(leftTime/1000/60/60%24);  
        m = Math.floor(leftTime/1000/60%60);
        s = Math.floor(leftTime/1000%60);
        ms = Math.floor(leftTime/100%10)
        d = (d<=0)?'':d+'天'
        h = (h<10)?'0'+h:h;
        m = (m<10)?'0'+m:m;
        s = (s<10)?'0'+s:s;	 

        return d + h + ":" + m + ":" + s + "." + ms;	
    } else {
        return false;	
    }
}