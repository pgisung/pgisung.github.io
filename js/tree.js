
class TreeManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.ctx = this.canvas.getContext('2d');
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener('resize', this.debounce(this.resize.bind(this), 500), false);
    this.resize();

    new Tree(this.ctx, this.stageWidth / 2, this.stageHeight);
  }
  
  debounce(func, wait) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    }
  }

  resize() {
    this.stageWidth = this.canvas.parentNode.clientWidth;
    if (this.stageWidth < 600) {
      this.stageHeight = this.canvas.parentNode.clientWidth * 1.5;
    } else {
      this.stageHeight = this.canvas.parentNode.clientWidth * 3 / 4;
      console.log(this.stageWidth);
    }
    // this.stageHeight = this.canvas.parentNode.clientWidth * 3 / 4;

    // 디스플레이 비율에 맞추어 캔버스 사이즈와 비율 조정
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    // 리사이즈시 캔버스를 비워줌
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // 리사이즈시 나무 다시 생성
    new Tree(this.ctx, this.stageWidth / 2, this.stageHeight);
  }
}

class Tree {
  constructor(ctx, posX, posY) {
    console.log(ctx, posX, posY);
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.branches = [];
    this.depth = 11;

    this.cntDepth = 0; // depth별로 그리기 위해 현재 depth 변수 선언
    this.animation = null; // 현재 동작하는 애니메이션

    this.init();
  }

  init() {
    // depth별로 가지를 저장하기 위해 branches에 depth만큼 빈배열 추가
    for (let i = 0; i < this.depth; i++) {
      this.branches.push([]);
    }

    this.createBranch(this.posX, this.posY, -90, 0);
    this.draw();
  }

  createBranch(startX, startY, angle, depth) {
    if (depth === this.depth) return;

    const len = depth === 0 ? this.random(10, 13) : this.random(0, 11);

    const endX = startX + this.cos(angle) * len * (this.depth - depth);
    const endY = startY + this.sin(angle) * len * (this.depth - depth);

    // depth에 해당하는 위치의 배열에 가지를 추가
    this.branches[depth].push(
      new Branch(startX, startY, endX, endY, this.depth - depth)
    );

    this.createBranch(endX, endY, angle - this.random(15, 23), depth + 1);
    this.createBranch(endX, endY, angle + this.random(15, 23), depth + 1);
  }

  draw() {
    // 다 그렸으면 requestAnimationFrame을 중단해 메모리 누수가 없게 함.
    if (this.cntDepth === this.depth) {
      cancelAnimationFrame(this.animation);
    }

    // depth별로 가지를 그리기
    for (let i = this.cntDepth; i < this.branches.length; i++) {
      let pass = true;

      for (let j = 0; j < this.branches[i].length; j++) {
        pass = this.branches[i][j].draw(this.ctx);
      }

      if (!pass) break;
      this.cntDepth++;
    }

    this.animation = requestAnimationFrame(this.draw.bind(this));
  }

  cos(angle) {
    return Math.cos(this.degToRad(angle));
  }
  sin(angle) {
    return Math.sin(this.degToRad(angle));
  }
  degToRad(angle) {
    return (angle / 180.0) * Math.PI;
  }

  // random 함수 추가
  random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}

class Branch {
  constructor(startX, startY, endX, endY, lineWidth) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = '#8D4801';
    this.lineWidth = lineWidth;

    this.frame = 10; // 가지를 100등분으로 나누기 위한 변수 frame 선언
    this.cntFrame = 0; // 현재 frame
    
    // 가지의 길이를 frame으로 나누어 구간별 길이를 구함
    this.gapX = (this.endX - this.startX) / this.frame;
    this.gapY = (this.endY - this.startY) / this.frame;

    // 구간별 가지가 그려질 때 끝 좌표
    this.currentX = this.startX;
    this.currentY = this.startY;
  }
  
  draw(ctx) {
    // 가지를 다 그리면 true 리턴
    if (this.cntFrame === this.frame) return true;

    ctx.beginPath();

    this.currentX += this.gapX;
    this.currentY += this.gapY;

    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.currentX, this.currentY);

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    ctx.stroke();
    ctx.closePath();

    this.cntFrame++;

    // 다 안그렸으면 false를 리턴
    return false;
  }
}