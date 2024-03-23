
class TreeManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.style.width = '100%';

    this.ctx = this.canvas.getContext('2d');
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.treeCount = 0;

    // leaf 나무 잎으로 위치 이동하기 위해 position absolute
    const unorderedLists = document.querySelectorAll('.page-content .categories, .page-content .tags');
    unorderedLists.forEach(function(list) {
      list.style.position = 'absolute';  
    });

    window.addEventListener('resize', this.debounce(this.resize.bind(this), 1000), false);
    this.canvas.addEventListener('click', this.click.bind(this), false);
    this.resize();
  }
  
  debounce(func, wait) {
    let timeout;
    return ( ... args ) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(func, wait, ... args);
    }
  }

  resize() {
    if (this.currentTree && !this.currentTree.isAnimationCompleted()) {
      // 현재 진행 중인 Tree 객체의 애니메이션이 완료되지 않았으면 새로운 Tree 객체를 생성하지 않음
      return;
    }

    this.stageWidth = this.canvas.parentNode.clientWidth;
    // 뷰포트의 세로사이즈가 너무 크므로 가르사이즈에 비례하여 세로 사이즈도 조절
    this.stageHeight = this.canvas.parentNode.clientWidth * 0.9403;
    // this.stageHeight = 677;

    // 디스플레이 비율에 맞추어 캔버스 사이즈와 비율 조정
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    // 리사이즈시 캔버스를 비워줌
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // 리사이즈시 나무 다시 생성
    this.treeCount = 1;
    this.currentTree = new Tree(this.ctx, this.stageWidth / 2, this.stageHeight);
  }

  // click 함수 추가
  click(event) {
    event.stopPropagation();
    if (this.currentTree && !this.currentTree.isAnimationCompleted()) {
      // 현재 진행 중인 Tree 객체의 애니메이션이 완료되지 않았으면 새로운 Tree 객체를 생성하지 않음
      return;
    }

    // 나무 개수에 따라 캔버스 초기화 해줌
    if (this.treeCount > 4) {
      this.treeCount = 0;
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }

    const { clientX } = event;
    this.treeCount += 1;
    this.currentTree = new Tree(this.ctx, clientX - this.canvas.getBoundingClientRect().left, this.stageHeight);
  }
}

class Tree {
  constructor(ctx, posX, posY) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.branches = [];
    this.depth = 11;

    this.cntDepth = 0; // depth별로 그리기 위해 현재 depth 변수 선언
    this.animation = null; // 현재 동작하는 애니메이션

    this.mobileRatio = this.posX * 2 < 600 ? 0.55 : 1;

    // leaf
    this.edgeXs = [];
    this.edgeYs = [];
    // this.leafColors = [ 'lightseagreen', 'seagreen', 'darkseagreen' ];
    this.leafElements = document.querySelectorAll('.page-content .categories li, .page-content .tags li');
    this.leafElements.forEach((leaf) => {
      var aTag = leaf.querySelector('a');
      // aTag.style.borderRadius = '44px 5px';
      // const colorIndex = this.random(0, this.leafColors.length - 1);
      // aTag.style.backgroundColor = this.leafColors[colorIndex];

      leaf.style.position = 'absolute';
      leaf.style.whiteSpace = 'nowrap';
      leaf.style.transition = 'all 1.5s ease';
    });
    this.leaves = [];

    this.init();
  }

  init() {
    // depth별로 가지를 저장하기 위해 branches에 depth만큼 빈배열 추가
    for (let i = 0; i < this.depth; i++) {
      this.branches.push([]);
    }

    this.createBranch(this.posX, this.posY, -90, 0);
    this.draw();
    // leaf
    this.relocateLeaves();
  }

  createBranch(startX, startY, angle, depth) {
    if (depth === this.depth) return;

    const len = depth === 0 ? this.random(10, 13) : this.random(0, 11);

    const endX = startX + this.cos(angle) * len * this.mobileRatio * (this.depth - depth);
    const endY = startY + this.sin(angle) * len * this.mobileRatio * (this.depth - depth);

    // depth에 해당하는 위치의 배열에 가지를 추가
    this.branches[depth].push(
      new Branch(startX, startY, endX, endY, (this.depth - depth) * this.mobileRatio)
    );
    // leaf 마지막 가지가 생성될 때
    if (depth === this.depth - 1) {
      this.createLeaf(endX, endY);
    }

    this.createBranch(endX, endY, angle - this.random(15, 23), depth + 1);
    this.createBranch(endX, endY, angle + this.random(15, 23), depth + 1);
  }

  // leaf
  createLeaf(startX, startY) {
    this.edgeXs.push(startX);
    this.edgeYs.push(startY);
    const randomShortRadius = this.random(1, 2);
    const randomLongRadius = this.random(3, 4);
    const randomAngle = this.random(-113, 67)
    const stemX = startX + this.cos(randomAngle) * this.random(randomShortRadius, randomLongRadius) * this.mobileRatio;
    const stemY = startY + this.sin(randomAngle) * this.random(randomShortRadius, randomLongRadius) * this.mobileRatio;
    const centerX = stemX + this.cos(randomAngle) * randomLongRadius * this.mobileRatio;
    const centerY = stemY + this.sin(randomAngle) * randomLongRadius * this.mobileRatio;
    this.leaves.push(new Leaf(startX, startY, stemX, stemY, centerX, centerY, randomLongRadius, randomShortRadius, randomAngle));
  }

  draw() {
    // 다 그렸으면 requestAnimationFrame을 중단해 메모리 누수가 없게 함.
    if (this.cntDepth === this.depth) {
      cancelAnimationFrame(this.animation);
      this.animation = null;
      return;
    }

    // depth별로 가지를 그리기
    for (let i = this.cntDepth; i < this.branches.length; i++) {
      let pass = true;

      const promises = [];
      for (let j = 0; j < this.branches[i].length; j++) {
        promises.push(new Promise(() => {
          pass = this.branches[i][j].draw(this.ctx);
        }));
      }

      Promise.all(promises)
        .catch(error => {
            console.error("class Tree draw 에러 발생:", error);
        });
      // 가지 끝에 나뭇잎 그리기
      if (i === this.branches.length - 1 && pass === true) {
        const promises = [];
        for (let k = 0; k < this.leaves.length; k++) {
          promises.push(new Promise(() => {
            pass = this.leaves[k].draw(this.ctx);
          }));
        }

        Promise.all(promises)
          .catch(error => {
              console.error("class Tree draw 에러 발생:", error);
          });
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

  // leaf 카테고리, 태그 잎 위치 재설정
  relocateLeaves() {
    if(1 > this.leafElements.length) return;
    if(1 > this.edgeXs.length) return;
    if(1 > this.edgeYs.length) return;
    if(this.edgeXs.length < this.leafElements.length) return;
    if(this.edgeYs.length < this.leafElements.length) return;

    const promises = [];
    this.leafElements.forEach((leaf) => {
      promises.push(new Promise(() => {
        const leafIndex = this.random(0, this.edgeXs.length - 1);
        leaf.style.left = this.edgeXs[leafIndex] - (leaf.offsetWidth / 2) + 'px';
        leaf.style.top = this.edgeYs[leafIndex] - (leaf.offsetHeight / 2) + 'px';
        this.edgeXs.splice(leafIndex, 1);
        this.edgeYs.splice(leafIndex, 1);
      }));
    });

    Promise.all(promises)
      .catch(error => {
          console.error("relocateLeaves 에러 발생:", error);
      });
  }

  isAnimationCompleted() {
    return this.cntDepth === this.depth;
  }
}

class Branch {
  constructor(startX, startY, endX, endY, lineWidth) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.lineWidth = lineWidth;

    this.frame = 10; // 애니메이션 frame 선언
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
    var gradient = ctx.createLinearGradient(this.startX, this.startY, this.endX, this.endY);
    gradient.addColorStop(0, 'rgba(111, 42, 1, 1)');
    gradient.addColorStop(0.25, 'rgba(141, 72, 1, 1)');
    gradient.addColorStop(0.5, 'rgba(111, 42, 1, 1)');
    gradient.addColorStop(0.75, 'rgba(141, 72, 1, 1)');
    gradient.addColorStop(1, 'rgba(111, 42, 1, 1)');
    ctx.strokeStyle = gradient;

    ctx.stroke();
    ctx.closePath();

    this.cntFrame++;

    // 다 안그렸으면 false를 리턴
    return false;
  }
}

class Leaf {
  constructor(startX, startY, endX, endY, centerX, centerY, longRadius, shortRadius, rotation) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.centerX = centerX;
    this.centerY = centerY;
    this.longRadius = longRadius;
    this.shortRadius = shortRadius;
    this.rotation = rotation;

    this.frame = 10;
    this.cntFrame = 0;

    // this.stemLength = Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2));

    this.gapAngle = ( 2 * Math.PI ) / this.frame;

    this.currentAngle = 0;
  }

  draw(ctx) {
    // 잎을 다 그리면 true 리턴
    if (this.cntFrame === this.frame) return true;

    ctx.beginPath();
    
    this.currentAngle += this.gapAngle;

    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.ellipse(this.centerX, this.centerY, this.longRadius, this.shortRadius, this.rotation, 0, this.currentAngle);

    var gradient = ctx.createLinearGradient(this.startX, this.startY, this.centerX, this.centerY);
    gradient.addColorStop(0, 'rgba(34, 139, 34, 0.9)');
    gradient.addColorStop(0.25, 'rgba(64, 169, 64, 0.8)');
    gradient.addColorStop(0.5, 'rgba(34, 139, 34, 0.9)');
    gradient.addColorStop(0.75, 'rgba(64, 169, 64, 0.8)');
    gradient.addColorStop(1, 'rgba(34, 139, 34, 0.9)');
    ctx.strokeStyle = gradient;
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.stroke();
    ctx.closePath();

    this.cntFrame++;

    // 다 안그렸으면 false를 리턴
    return false;
  }
}