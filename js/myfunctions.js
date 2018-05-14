
var dappAddress = "n1h1aKVkKzf21rH851mLKK7ULzW4nn3P5Tb"
var onlyForQueryAddress =  "n1KRGQWob1sN6UkKTokj9Y2UmJtqrST2abm"
var net="https://mainnet.nebulas.io";





//var dappAddress = "n1vx37kN7KjJ9EzyzCmT1KzWqfGUhP9VHbc";
//var onlyForQueryAddress =  "n1Q5jYtzbJaFnaFn33SbKTpCvZULb49yaYZ"
//var net="https://testnet.nebulas.io";

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  hours = hours < 10 ? '0'+hours : hours;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;
  var strTime = hours + ':' + minutes+":"+seconds;

  return date.getFullYear()+"/"+myAlign((date.getMonth())+1) + "/" + myAlign(date.getDate())  + "  " + strTime;
}
function myAlign(tmp)
{
   ans = tmp < 10 ? '0'+tmp : tmp
   return ans
}

function getUrlParam()
{
    var param = [], hash;
    var url = window.location.href;//获取网页的url
    var hashes = url.slice(url.indexOf('?') + 1).split('&');//将url进行参数拆分
    for(var i = 0; i < hashes.length; i++)
    {//循环抓取每个参数
        hash = hashes[i].split('=');
        param.push(hash[0]);
        param[hash[0]] = hash[1];
    }
    return param;
}
function getSID()
{
        var sid= getOneCookie('SID');
        if (undefined == sid)
        {
             window.location.href='/ManualRerank';
        }
        return sid;
}
function getTrans(tx,net)
{
    var t = net + "v1/user/getTransactionReceip"
    //session_tmp=urlParam["SID"];
    //var date_ss = new Date().toGMTString();
//    var signature = CryptoJS.HmacSHA1( ss,client_secret);
    //  var auth_ss= "MWS" + " "+ client_id + ":"+signature

    $.ajax({
        url: t,
        async: false,
        cache: false,
        type: 'POST',
        data: {'hash':tx},

        success: function (data) {
            console.log(data)
//             $.each(data, function (index, user) {
//                 //      x=document.getElementById("user_name")  //查找元素
//
// //x.innerHTML=user.name
//                 //   $("#user_name").innerHTML=user.name;
//                 name=user.name;
//                 // name_us=user.name;
//                 //alert(user.name);
//             });
        },
        error:function(data,status,er) {

            alert("失败error: "+data.login+" status: "+status+" er:"+er);
        }
    });
    return  name;

}
function auth(session_tmp)
{
    var name="";
    var urlParam=getUrlParam();
    //session_tmp=urlParam["SID"];
    client_id="manual_rerank";
    client_secret = "37c01379214d558dc508f31d999d4851";
    //var date_ss = new Date().toGMTString();
//    var signature = CryptoJS.HmacSHA1( ss,client_secret);
  //  var auth_ss= "MWS" + " "+ client_id + ":"+signature

        $.ajax({
            url: "/Login",
            async: false,
            cache: false,
            type: 'GET',
            data: {'SID':session_tmp},

            success: function (data) {
        $.each(data, function (index, user) {
  //      x=document.getElementById("user_name")  //查找元素

//x.innerHTML=user.name
         //   $("#user_name").innerHTML=user.name;
          name=user.name;
         // name_us=user.name;
            //alert(user.name);
        });
                     },
            error:function(data,status,er) {
           alert("登录验证失败error: "+data.login+" status: "+status+" er:"+er);
                  }
        });
    return  name;

}
function showItem() {


    $.ajax({
        url: "/show",
    type: 'get',
    dataType: 'json',

    success: function (data) {

        $.each(data, function (index, article) {
            var temp="";
            temp = temp+'<tr  id="'+article.rankID+'" >';
            // temp = temp+'<div class="row">';
            //<td ><input id="query" type="text"></td>
            //<td ><input  id="poi_id" name="query" type="text">  </td>
            //<td ><input  id="deal_id" name="query" type="text">  </td>
            //<td ><select id="operation"><option value="1">召回</option>
            //        <option value="2">屏蔽</option> </select> </td>
            //<td ><input class="span4" id="position" name="query" type="text">  </td>
            //<td ><select id="range">
            //    <option value="1">预览</option>
            //    <option value="2">上线</option>
            //</select></td>
            //<!--td><input id="period"  type="text">  </td-->
            //<td ><input class="span4" id="desc" name="query" type="text">  </td>
            temp= temp +'<td ><input width="20" id="query" value="'+article.query+'"></td>';
            //temp= temp +'<div class="col-md-1  "><td ><input id="poiID" value="'+article.poiID+'"></td></div>';
            temp= temp +'<td ><input id="poiID" value="'+article.poiID+'"></td>';
            temp= temp +'<td class="col-md-1"><input id="dealID" value="'+article.dealID+'"></td>';
            temp = temp + '<td class="col-md-1"><select id="operation" ><option value="1">召回</option><option value="2">屏蔽</option> </select> </td>'
                temp= temp +'<td class="col-md-1"><input id="position" value="'+article.position+'"></td>';
            temp = temp + '<td ><select id="range" ><option value="1">预览</option><option value="2">在线</option> </select> </td>'
                temp= temp +'<td ><input id="desc" value="'+article.description+'"></td>';
            temp= temp +"<td >"+ article.pmName+"</td>";
            temp= temp +"<td >"+ article.updateTime+"</td>";
            temp= temp +"<td >"+ "<button onclick='updateItem("+article.rankID+")'>更新</button> "+"</td>";
            temp = temp + "</tr>";
            temp = temp + "</div>"
                $("#table1").append(temp);
            //$("#table1 "+ article.rankID + " operation").val(article.operation);


        });
        $.each(data, function (index, article) {

            var temp = "#"+article.rankID;
            //$("#operation"+ article.rankID ).val(article.operation);
            //$(temp+" td#poi_id " ).html(11);
            //
            $(temp+" td " +"#operation " ).val(article.operation);
            // $("#"+article.rankID+"> td"" > #operation " ).val(article.operation);


        });

    },
    error:function(data,status,er) {
              alert("error: "+data+" status: "+status+" er:"+er);
          }
    });
}
function addItem() {


    // get inputs
    var article = new Object();
    article.slotID = $('#slotID').val();
    article.query = $('#query').val();
    article.cityID = $('#cityID').val();
    article.cateID = $('#cateID').val();
    article.areaID = $('#areaID').val();
    article.operation = $('#operation').val();
    article.operationExtention = $('#operationExtention').val();
    article.adKey= $('#adKey').val();
    article.adValue= $('#admValue').val();
    article.activeRange = $('#range').val();
    article.description = $('#desc').val();
    article.days = $('#days').val();
    article.pmName = user_name;

    if (article.slotID == '' || article.operation== '' || (article.adValue=='' && article.adKey!='') )
    {
        alert("请输入非空字段");
        return;
    }
    if (article.adKey == '' && article.query == '')
    {
            alert("安全考虑，当干预全部广告，必须输入query");
            return ;
    }

    $.ajax({
        url: "/ManualRerank/Add",
        type: 'POST',
        data: JSON.stringify(article),
        contentType: 'application/json',
        //mimeType: 'application/json',
        mimeType: 'text/html',

        success: function (data) {
            alert("添加成功");
            window.location.href='./show_manual_rerank.html'


        },
        error:function(data,status,er) {
                  alert("添加失败error: "+data+" status: "+status+" er:"+er);
              }
    });
}
function addModel() {


    // get inputs
    var article = new Object();
    article.modelName = $('#modelName').val();
    article.type = $('#type').val();
    article.hdfsPrefixPath = $('#hdfsPrefixPath').val();
    article.hdfsFileName = $('#hdfsFileName').val();
    article.jsonConfig = $('#jsonConfig').val();
    article.userName = user_name;

    if (article.modelName == '' || article.hdfsPrefixPath== '' )
    {
        alert("请输入非空字段");
        return;
    }

    $.ajax({
        url: "/ManualRerank/AddModel",
        type: 'POST',
        data: JSON.stringify(article),
        contentType: 'application/json',
        //mimeType: 'application/json',
        mimeType: 'text/html',

        success: function (data) {
            alert("添加成功");
            window.location.href='./show_model.html'


        },
        error:function(data,status,er) {
            alert("添加失败error: "+data+" status: "+status+" er:"+er);
        }
    });
}
function updateItem(rankID) {

    // get inputs
    alert(rankID);
    var article = new Object();
    article.query = $('#query').val();
    article.poiID = $('#poi_id').val();
    article.dealID = $('#deal_id').val();
    article.operation = $('#operation').val();
    article.position = $('#position').val();
    article.activeRange = $('#range').val();
    article.description = $('#desc').val();
    article.pmName = "admin_test";

    /*
       $.ajax({
       url: "/ManualRerank/Add",
       type: 'POST',
       data: JSON.stringify(article),
       contentType: 'application/json',
    //mimeType: 'application/json',
    mimeType: 'text/html',

    success: function (data) {
    alert("添加成功");
    window.location.href='./show_manual_rerank.html'


    },
    error:function(data,status,er) {
    alert("error: "+data+" status: "+status+" er:"+er);
    }
    });
    */
}
function getCateIDs() {
var ret='{}'



    $.ajax({
        url: "/cateJson",
        type: 'GET',
        contentType: 'application/json',
        mimeType: 'application/json',
        async:false,

        success: function (data) {
ret = data


        },
        error:function(data,status,er) {
                  alert("添加失败error: "+data+" status: "+status+" er:"+er);
              }
    });

return ret
}

function getCityIDs() {
var ret='{}'

    $.ajax({
        url: "/cityJson",
        type: 'GET',
        contentType: 'application/json',
        mimeType: 'application/json',
        async:false,

        success: function (data) {
ret = data


        },
        error:function(data,status,er) {
                  alert("添加失败error: "+data+" status: "+status+" er:"+er);
              }
    });
return ret
}
function getUserActions( userid ) {
var ret='{}'
    $.ajax({
        url: "/UserAction",
        type: 'GET',
    data: {'userid':userid},
        mimeType: 'application/json',
        async:false,

        success: function (data) {
ret = data


        },
        error:function(data,status,er) {
                  alert("error: "+data+" status: "+status+" er:"+er);
              }
    });
return ret
}
function getPoiName( poiId,myID ) {
//var tmp = "http://api.mobile.meituan.com/group/v1/poi/"
//tmp += poiId
var ret='{}'
    $.ajax({
        url: "/poiInfo",
        type: 'GET',
    data: {'poiid':poiId},
        mimeType: 'application/json',
        async:true,

        success: function (data) {
ret = data[0].name
$('#'+myID).html(ret);
        },
        error:function(data,status,er) {
                  alert("error: "+data+" status: "+status+" er:"+er);
              }
    });
return ret
}
function getDealName( dealId ,myID) {
var ret='{}'
    $.ajax({
        url: "/dealInfo",
        type: 'GET',
    data: {'dealid':dealId},
        mimeType: 'application/json',
        async:true,

        success: function (data) {
ret = data.dealobj[0].smstitle
$('#'+myID).html(ret);
        },
        error:function(data,status,er) {
                  alert("error: "+data+" status: "+status+" er:"+er);
              }
    });
return ret
}