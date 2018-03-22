// 각종 변수
var sel = '';
var sT1 = '';
var eT1 = '';
var sT2 = '';
var eT2 = '';

var mem = '';

var j1E = '';
var j1C = '';
var j2E = '';
var j2C = '';

var msg = '';
var notiMsg = '';

// 함수
$(document).ready(function() {

});

function memChk() {
  if (sel == 1) {
    msg = "수시";
  } else if (sel == 2) {
    msg = "재외국민";
  } else if (sel == 3) {
    msg = "정시";
  } else if (sel == 4) {
    msg = "추가모집";
  } else if (sel == 5) {
    msg = "폴리텍(다기능)";
  } else if (sel == 6) {
    msg = "편입학";
  } else if (sel == 7) {
    msg = "대학원";
  } else if (sel == 8) {
    msg = "경찰대";
  } else if (sel == 9) {
    msg = "한예종";
  } else if (sel == 10) {
    msg = "DGIST";
  } else if (sel == 11) {
    msg = "학위취득";
  } else if (sel == 12) {
    msg = "외국인전형";
  } else if (sel == 13) {
    msg = "초/중/고교";
  } else if (sel == 14) {
    msg = "폴리텍(전문기술 등)";
  } else if (sel == 15) {
    msg = "기타";
  } else msg = "ERROR";
  document.getElementById("memType").innerHTML = msg;
}

// url get방식 parameters 출력
function moveIndex() {
  var sel = $("input[name=selType]:checked").val();
  location.href = "main.html?sel=" + sel + "&sT1=" + sT1 + "&j1C=" + j1C + "&j1E=" + j1E + "&eT1=" + eT1 + "&sT2=" + sT2 + "&j2C=" + j2C + "&j2E=" + j2E + "&eT2=" + eT2;
}

// url에서 parameters 파싱 ---------------
var address = unescape(location.href);

if (address.indexOf("sel=", 0) != -1) {
  sel = address.substring(address.indexOf("sel=", 0) + 4);
  sel = sel.substring(0, sel.indexOf('&'));
} else {
  sel = "";
}

if (address.indexOf("sT1=", 0) != -1) {
  sT1 = address.substring(address.indexOf("sT1=", 0) + 4);
  sT1 = sT1.substring(0, sT1.indexOf('&'));
} else {
  sT1 = "";
}

if (address.indexOf("j1C=", 0) != -1) {
  j1C = address.substring(address.indexOf("j1C=", 0) + 4);
  j1C = j1C.substring(0, j1C.indexOf('&'));
} else {
  j1C = "";
}

if (address.indexOf("j1E=", 0) != -1) {
  j1E = address.substring(address.indexOf("j1E=", 0) + 4);
  j1E = j1E.substring(0, j1E.indexOf('&'));
} else {
  j1E = "";
}

if (address.indexOf("eT1=", 0) != -1) {
  eT1 = address.substring(address.indexOf("eT1=", 0) + 4);
  eT1 = eT1.substring(0, eT1.indexOf('&'));
} else {
  eT1 = "";
}

if (address.indexOf("sT2=", 0) != -1) {
  sT2 = address.substring(address.indexOf("sT2=", 0) + 4);
  sT2 = sT2.substring(0, sT2.indexOf('&'));
} else {
  sT2 = "";
}

if (address.indexOf("j2C=", 0) != -1) {
  j2C = address.substring(address.indexOf("j2C=", 0) + 4);
  j2C = j2C.substring(0, j2C.indexOf('&'));
} else {
  j2C = "";
}

if (address.indexOf("j2E=", 0) != -1) {
  j2E = address.substring(address.indexOf("j2E=", 0) + 4);
  j2E = j2E.substring(0, j2E.indexOf('&'));
} else {
  j2E = "";
}

if (address.indexOf("eT2=", 0) != -1) {
  eT2 = address.substring(address.indexOf("eT2=", 0) + 4);
  //eT2 = eT2.substring(0, eT2.indexOf('&'));
} else {
  eT2 = "";
}
// url에서 parameters 파싱 끝 ---------------

function test1st() {
  if (!eT1) {
    location.href = "type1/t1-main.html?sel=" + sel + "&sT1=" + sT1 + "&j1C=" + j1C + "&j1E=" + j1E + "&eT1=" + eT1 + "&sT2=" + sT2 + "&j2C=" + j2C + "&j2E=" + j2E + "&eT2=" + eT2;
  } else {
    notiMsg = "이미 완료하셨습니다. 'Step2. 분리도메인'을 진행해주세요.";
    var x = document.getElementById("chgStyle");
    x.style.marginBottom = "10px";
    document.getElementById("notiMsg").innerHTML = notiMsg;
    //alert("이미 완료하셨습니다.\n'Step2. 분리도메인'을 진행해주세요.");
  }
}

function test2nd() {
  if (!eT1) {
    notiMsg = "'Step1. 통합도메인'을 먼저 완료해주세요.";
    var x = document.getElementById("chgStyle");
    x.style.marginBottom = "10px";
    document.getElementById("notiMsg").innerHTML = notiMsg;
    //alert("'Step1. 통합도메인'을 먼저 완료해주세요.");
  } else location.href = "type2/t2-separate-main.html?sel=" + sel + "&sT1=" + sT1 + "&j1C=" + j1C + "&j1E=" + j1E + "&eT1=" + eT1 + "&sT2=" + sT2 + "&j2C=" + j2C + "&j2E=" + j2E + "&eT2=" + eT2;
}

// 레이어 관련 스크립트
function layerPop(){
    //var $href = '#layerPop';
    //layer_popup($href);
    layer_popup('#layerPop');
}
function layer_popup(el){

    var $el = $(el);        //레이어의 id를 $el 변수에 저장
    //var isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수

    $('.dim-layer').fadeIn();
    //isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

    var $elWidth = ~~($el.outerWidth()),
        $elHeight = ~~($el.outerHeight()),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    // 화면의 중앙에 레이어를 띄운다.
    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: -$elHeight /2,
            marginLeft: -$elWidth/2
        });
    } else {
        $el.css({top: 0, left: 0});
    }

    $el.find('a.btn-layerClose').click(function(){
        $('.dim-layer').fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        location.href = "../main.html?sel=" + sel + "&sT1=" + sT1 + "&j1C=" + j1C + "&j1E=" + j1E + "&eT1=" + eT1 + "&sT2=" + sT2 + "&j2C=" + j2C + "&j2E=" + j2E + "&eT2=" + eT2;
        //isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });

    $el.find('a.btn-layerClose2').click(function(){
        $('.dim-layer').fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        history.back();
        //isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });

    $('.layer .dimBg').click(function(){
        $('.dim-layer').fadeOut();
        return false;
    });

} // 레이어 관련 스크립트 끝

function join2Etc() {
  j2E = 1;
}

function join2Common() {
  j2C = 1;
}
