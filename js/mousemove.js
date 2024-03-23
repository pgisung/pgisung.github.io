const ELEMENTS=33;
const BEGIN_FZ="20px";
const BEGIN_OPACITY=1;
const DEFAULT_WIDTH=800;
const DEFAULT_HEIGHT=600;

var x=ox=DEFAULT_WIDTH / 2;
var y=oy=DEFAULT_HEIGHT / 2;
var swide=DEFAULT_WIDTH;
var shigh=DEFAULT_HEIGHT;
var sleft=sdown=0;
var ele=new Array(); //element
var elex=new Array();
var eley=new Array();
var elev=new Array();

// 창이 로드될 때 요소 설정
window.addEventListener('load', function() {
  if (document.getElementById) {
    var mat; //material
    for (var i=0; i<ELEMENTS; i++) {
      mat = document.createElement("div");
      mat.textContent = "🍂";
      mat.style.position = "absolute";
      mat.style.zIndex = "999";
      document.body.appendChild(ele[i]=mat);
    }
    set_screen_size();
    doRecursiveMouseMoveEffect();
  }
});

// 마우스 이동 이벤트 리스너
window.addEventListener('mousemove', function(e) {
  if (e) {
    x=e.pageX;
    y=e.pageY;
  }
  else {
    set_scroll();
    x=event.x+sleft;
    y=event.y+sdown;
  }
});

window.addEventListener('resize', set_screen_size);
window.addEventListener('scroll', set_scroll);

// 창의 크기값(swide, shigh)을 가져와서 사용을 위해 갖고있는다.
function set_screen_size() {
  var sw_min=Number.MAX_SAFE_INTEGER;
  var sh_min=Number.MAX_SAFE_INTEGER;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
    if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
  }
  if (typeof(self.innerWidth)=='number' && self.innerWidth) {
    if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
    if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
    if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
  }
  if (sw_min==Number.MAX_SAFE_INTEGER || sh_min==Number.MAX_SAFE_INTEGER) {
    sw_min=DEFAULT_WIDTH;
    sh_min=DEFAULT_HEIGHT;
  }
  swide=sw_min;
  shigh=sh_min;
}

function set_scroll() {
  if (typeof(window.pageYOffset)=='number') {
    sleft=window.pageXOffset;
    sdown=window.pageYOffset;
  }
  else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
    sleft=document.body.scrollLeft;
    sdown=document.body.scrollTop;
  }
  else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
    sleft=document.documentElement.scrollLeft;
    sdown=document.documentElement.scrollTop;
  }
  else {
    sleft=0;
    sdown=0;
  }
}

function doRecursiveMouseMoveEffect() {
  var i;
  if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
    ox=x;
    oy=y;
    for (i=0; i<ELEMENTS; i++) if (!elev[i]) {
      ele[i].style.left=(elex[i]=x)+"px";
      ele[i].style.top=(eley[i]=y+1)+"px";
      ele[i].style.fontSize = BEGIN_FZ;
      ele[i].style.opacity = BEGIN_OPACITY;
      ele[i].style.visibility="visible";
      elev[i]=100;
      // doCreateElement(i);
      break;
    }
  }
  for (i=0; i<ELEMENTS; i++) {
    if (elev[i]) doFallingEffect(i);
  }
  setTimeout("doRecursiveMouseMoveEffect()", 40);
}

// 마우스 무브 이펙트 요소 생성시 반복문안에 딜레이 추가하는건데 일단 봉인
// function doCreateElement(i) {
//   setTimeout(function() {
//     ele[i].style.left = (elex[i] = x) + "px";
//     ele[i].style.top = (eley[i] = y + 1) + "px";
//     ele[i].style.fontSize = BEGIN_FZ;
//     ele[i].style.opacity = BEGIN_OPACITY;
//     ele[i].style.visibility = "visible";
//     elev[i] = 100;
//   }, i * 10); // 각 작업 간의 간격 (10 ms)
// }

function doFallingEffect(i) {
  var currentFontSize = parseFloat(window.getComputedStyle(ele[i]).fontSize);

  if (--elev[i]) {
    elex[i]+=(i%5-2)/5;
    eley[i]+=1+Math.random()*3;
    if (eley[i]<shigh+sdown) {
      ele[i].style.left=elex[i]+"px";
      ele[i].style.top=eley[i]+"px";
      ele[i].style.opacity -= 0.01;

      if (elev[i] % 10 === 0 && currentFontSize > 1) {
        ele[i].style.fontSize = (currentFontSize - 1) + 'px';
      }
    }
    else {
      ele[i].style.visibility="hidden";
      elev[i]=0;
    }
  }
  else {
    ele[i].style.visibility="hidden";
  }
}