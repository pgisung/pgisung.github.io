
class TreeManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.style.width = '100%';

    this.ctx = this.canvas.getContext('2d');
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.treeCount = 0;

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

    // 클릭시 다시 안 보이도록
    const unorderedLists = document.querySelectorAll('.page-content .categories, .page-content .tags');
    unorderedLists.forEach(function(list) {
      list.style.opacity = '0';
      list.style.transition = 'none';
    });

    // 나무 개수에 따라 캔버스 초기화 해줌
    if (this.treeCount > 9) {
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

    // mobile responsive
    this.mobileRatio = window.innerWidth < 480 ? this.randomFloat(0.275, 0.55) : this.randomFloat(0.5, 1);

    // leaf
    this.edgeXs = [];
    this.edgeYs = [];
    this.leafElements = document.querySelectorAll('.page-content .categories li, .page-content .tags li');
    this.leaves = [];
    this.randomLeafColor = Math.random();

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
    this.leaves.push(new Leaf(startX, startY, stemX, stemY, centerX, centerY, randomLongRadius, randomShortRadius, randomAngle, this.randomLeafColor));
  }

  draw() {
    // 다 그렸으면 requestAnimationFrame을 중단해 메모리 누수가 없게 함.
    if (this.cntDepth === this.depth) {
      cancelAnimationFrame(this.animation);
      this.animation = null;

      this.createRandomBackgroundColor(this.randomLeafColor);

      const unorderedLists = document.querySelectorAll('.page-content .categories, .page-content .tags');
      unorderedLists.forEach(function(list) {
        list.style.opacity = '1';
        list.style.transition = 'opacity 1s ease';
      });

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
  randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  // leaf 카테고리, 태그 잎 위치 재설정
  relocateLeaves() {
    return new Promise((resolve, reject) => {
      if (
        this.leafElements.length < 1 ||
        this.edgeXs.length < this.leafElements.length ||
        this.edgeYs.length < this.leafElements.length
      ) {
        resolve(); // 조건 안되면 그냥 끝
        return;
      }

      this.leafElements.forEach((leaf, idx) => {
        const leafIndex = this.random(0, this.edgeXs.length - 1);
        leaf.style.left = this.edgeXs[leafIndex] - (leaf.offsetWidth / 2) + 'px';
        leaf.style.top = this.edgeYs[leafIndex] - (leaf.offsetHeight / 2) + 'px';
        this.edgeXs.splice(leafIndex, 1);
        this.edgeYs.splice(leafIndex, 1);

        // 마지막 처리 끝난 시점에 resolve
        if (idx === this.leafElements.length - 1) {
          resolve();
        }
      });
    });
  }

  isAnimationCompleted() {
    return this.cntDepth === this.depth;
  }

  createRandomBackgroundColor(leafColor) {
    const value = leafColor;

    // 사용할 계절 prefix 정하기
    let season = 'summer';
    switch (true) {
      case value >= 0 && value <= 0.02:
        season = 'spring';
        break;
      case value > 0.02 && value <= 0.68:
        break;
      case value > 0.68 && value <= 0.9:
        season = 'autumn';
        break;
      case value > 0.9 && value <= 1:
        season = 'winter';
        break;
    }

    // 기존 seasonal 클래스 제거 함수
    const removeSeasonClasses = (el) => {
      el.classList.forEach(cls => {
        if (cls.startsWith('season-')) {
          el.classList.remove(cls);
        }
      });
    };

    document.querySelectorAll('.page-content .categories li a, .page-content .tags li a')
      .forEach(aTag => {
        removeSeasonClasses(aTag);
        aTag.classList.add(`season-${season}-c1`);
      });

    document.querySelectorAll('.category-list span a, .tag-list span a')
      .forEach(aTag => {
        removeSeasonClasses(aTag);
        aTag.classList.add(`season-${season}-c2`);
      });

    document.querySelectorAll('.category-list .category, .tag-list .category')
      .forEach(el => {
        removeSeasonClasses(el);
        el.classList.add(`season-${season}-c3`);
      });

    document.querySelectorAll('.category-list .tag, .tag-list .tag')
      .forEach(el => {
        removeSeasonClasses(el);
        el.classList.add(`season-${season}-c4`);
      });
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
  constructor(startX, startY, endX, endY, centerX, centerY, longRadius, shortRadius, rotation, leafColor) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.centerX = centerX;
    this.centerY = centerY;
    this.longRadius = longRadius;
    this.shortRadius = shortRadius;
    this.rotation = rotation;
    this.leafColor = leafColor;

    this.frame = 1;
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

    var gradient = this.createRandomGradient(ctx, this.startX, this.startY, this.centerX, this.centerY, this.leafColor)
    ctx.strokeStyle = gradient;
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.stroke();
    ctx.closePath();

    this.cntFrame++;

    // 다 안그렸으면 false를 리턴
    return false;
  }

  createRandomGradient(ctx, startX, startY, centerX, centerY, leafColor) {
    // 0 ~ 1 범위 난수
    const value = leafColor;
    let r1 = 255;
    let r2 = 255;
    let g1 = 255;
    let g2 = 255;
    let b1 = 255;
    let b2 = 255;
    let o1 = 0.9;
    let o2 = 0.8;

    // 계절별 나뭇잎 그라디언트 변경
    switch (true) {
      case value >= 0 && value <= 0.02:
        r1 = 225;
        r2 = 255;
        g1 = 153;
        g2 = 183;
        b1 = 167;
        b2 = 197;
        break;
      case value > 0.02 && value <= 0.68:
        r1 = 34;
        r2 = 64;
        g1 = 139;
        g2 = 169;
        b1 = 34;
        b2 = 64;
        break;
      case value > 0.68 && value <= 0.9:
        r1 = 124;
        r2 = 154;
        g1 = 0;
        g2 = 23;
        b1 = 0;
        b2 = 3;
        break;
      case value > 0.9 && value <= 1:
        r1 = 143;
        r2 = 173;
        g1 = 186;
        g2 = 216;
        b1 = 200;
        b2 = 230;
        break;
    }

    // Gradient 생성
    const gradient = ctx.createLinearGradient(startX, startY, centerX, centerY);
    gradient.addColorStop(0,    `rgba(${r1}, ${g1}, ${b1}, ${o1})`);
    gradient.addColorStop(0.25, `rgba(${r2}, ${g2}, ${b2}, ${o2})`);
    gradient.addColorStop(0.5,  `rgba(${r1}, ${g1}, ${b1}, ${o1})`);
    gradient.addColorStop(0.75, `rgba(${r2}, ${g2}, ${b2}, ${o2})`);
    gradient.addColorStop(1,    `rgba(${r1}, ${g1}, ${b1}, ${o1})`);

    // 외부에서 받을 수 있게 반환
    return gradient;
  }
}