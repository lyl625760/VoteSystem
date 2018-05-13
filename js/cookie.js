// 获取所有cookie
function getAllCookie(){
    var allstr = document.cookie;
    return allstr;
}

// 获取指定cookie
function getOneCookie(objName){
    var arrStr = document.cookie.split(";");
    for(var i = 0;i < arrStr.length;i ++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName){
            return unescape(temp[1]);
        }
    }
}

// 添加cookie
function addCookie(objName,objValue,objTime){
    var infostr = objName + '=' + escape(objValue);
    if(objTime){
        infostr += ';expires =' + objTime.toGMTString();
    }else{
        var date = new Date();
        date.setTime(date.getTime()+10*24*3600*1000);
        infostr += ';expires =' + date.toGMTString();
    }
    document.cookie = infostr; //添加
}

// 删除cookie
function delCookie(objName){
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = objName + "=a; expires=" + date.toGMTString();
}