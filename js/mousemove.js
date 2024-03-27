const ELEMENT="🍂";
const ELEMENTS=5;
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
var elev=new Array(); // 프레임수라고 생각하자 1이상이면 보이는 것 0이면 안보이는 것

var intervalCreateElement;
var intervalFallingAnimation;

// 창이 로드될 때 요소 설정
window.addEventListener('load', function() {
  if (document.getElementById) {
    var box;
    for (var i=0; i<ELEMENTS; i++) {
      box = document.createElement("div");
      box.textContent = ELEMENT;
      box.style.float = "left";
      box.style.position = "absolute";
      box.style.left = "0";
      box.style.top = "0";
      box.style.zIndex = "999";
      box.style.display="none";
      document.body.appendChild(ele[i]=box);
    }
    set_screen_size();
    intervalCreateElement = setInterval(() => {
      doCreateElement();
    }, 333);
    intervalFallingAnimation = setInterval(() => {
      doFallingAnimation();
    }, 25);
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

// 창의 크기값(swide, shigh)을 가져와서 사용을 위해 갖고있는다.
window.addEventListener('resize', set_screen_size);
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

window.addEventListener('scroll', set_scroll);
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

function doCreateElement() {
  if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
    ox=x;
    oy=y;
    for (var i=0; i<ELEMENTS; i++) if (!elev[i]) {
      ele[i].style.left=(elex[i]=x)+"px";
      ele[i].style.top=(eley[i]=y+1)+"px";
      ele[i].style.fontSize = BEGIN_FZ;
      ele[i].style.opacity = BEGIN_OPACITY;
      ele[i].style.display="block";
      elev[i]=50;
      break;
    }
  }
}

function doFallingAnimation() {
  const promises = [];
  for (let i=0; i<ELEMENTS; i++) {
    promises.push(new Promise(() => {
      doFallingEffect(i);
    }));
  }

  Promise.all(promises)
    .catch(error => {
        console.error("doFallingAnimation 에러 발생:", error);
    });
}

function isUndefined(i) {
  var bReturn = true;

  do {
    if (typeof ele[i] === "undefined") {
      break;
    }

    if (typeof elex[i] === "undefined") {
      break;
    }

    if (typeof eley[i] === "undefined") {
      break;
    }

    if (typeof elev[i] === "undefined") {
      break;
    }

    bReturn = false;
  } while(false);

  return bReturn;
}

function doFallingEffect(i) {
  if (isUndefined(i)) {
    return;
  }

  // 프레임수가 0이 되면 빠져나감
  if (--elev[i] <= 0) {
    ele[i].style.display="none";
    elev[i]=0;
    return;
  }

  // 요소의 위치, 투명도, 사이즈가 이미 사라진 것과 다름없을 경우 빠져나감
  if (eley[i]>=shigh+sdown || ele[i].style.opacity <= 0 || ele[i].style.fontSize < 2) {
    ele[i].style.display="none";
    elev[i]=0;
    return;
  }

  var currentFontSize = parseFloat(window.getComputedStyle(ele[i]).fontSize);

  // 좌표 연산부
  elex[i]+=(i%5-2)/5;
  eley[i]+=1+Math.random()*3;

  // css 입력부
  ele[i].style.left=elex[i]+"px";
  ele[i].style.top=eley[i]+"px";
  ele[i].style.opacity -= 0.02;

  if (elev[i] % 10 === 0 && currentFontSize > 3) {
    ele[i].style.fontSize = (currentFontSize - 2) + 'px';
  }
}