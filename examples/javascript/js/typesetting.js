/* typesetting.min.js */


var mydate = new Date();
var myyear = mydate.getFullYear();
var mymonth = mydate.getMonth() + 1;
var myday = mydate.getDate();
if (mymonth < 10 && mymonth > 0) {
  mymonth = '0'+ mymonth;
}
if (myday < 10 && myday > 0) {
  myday = '0'+ myday;
}

document.getElementById('site-path').innerHTML='/sites/default/files/'+myyear+'/'+mymonth+'/368/'+myday;


String.prototype.format=function()
{
  if(arguments.length === 0) return this;
  for(var s=this, i=0; i<arguments.length; i++)
      s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
  return s;
};


var imageType = ['image/png','image/jpg','image/jpeg'];

function isSupportFileApi() {
  if(window.File && window.FileList && window.FileReader && window.Blob) {
      return true;
  }
  return false;
}
if (isSupportFileApi() === false) {
  alert("浏览器不支持此功能，请使用其他浏览器尝试。");
}

function checkImage(myfiles) {
    var fileNames = [];
    var files_count = myfiles.length;
    for (var i = 0; i < files_count; i++){
        var f=myfiles[i];
        if (imageType.indexOf(f.type) >= 0) {
            var filename = f.name;
            var slice = filename.split("_");
            if (slice.length == 2){
              fileNames.push([slice[0], encodeURI(filename), slice[1].substr(0, slice[1].indexOf('.'))]);
            }
        }
    }
    var text = '<p class="rtecenter"><img alt="" src="{0}/{1}" style="width:649px"></p>' +
          '<p class="rtecenter">{2}</p>'+'\n';
    var result = '';
    var sitePath = document.getElementById("site-path").innerHTML;
    var len = fileNames.length;
    for (var k = 0; k < len; k++) {
        result = result + text.format(sitePath, fileNames[k][1], fileNames[k][2]);
    }
    document.getElementById("contentTextarea").value = result;
}

function showTab(tab_id) {
    $("div[role=tab]").hide();
    $("#"+tab_id).show();
}