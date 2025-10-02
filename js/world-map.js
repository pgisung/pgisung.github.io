async function initCountryClick() {
  const svg = document.querySelector('svg');
  const response = await fetch('/assets/search.json');
  const posts = await response.json();

  // 지도 없으면 실행할 필요 없음
  if (!svg) return;

  // flag → post 매핑 생성 (중복 제거)
  const flagToCategory = {};
  posts.forEach(post => {
    if (!post.flag || !post.categories) return;
    const countryCode = post.flag.toLowerCase();
    if (!(countryCode in flagToCategory)) {
      const categories = post.categories.split(',').map(c => c.trim());
      const nonTravelCategory = categories.find(c => c.toLowerCase() !== 'travel');
      if (nonTravelCategory) {
        flagToCategory[countryCode] = nonTravelCategory;
      }
    }
  });

  // tooltip element 생성
  const tooltip = document.createElement('div');
  tooltip.style.position = 'absolute';
  tooltip.style.background = 'rgba(0,0,0,0.7)';
  tooltip.style.color = '#fff';
  tooltip.style.padding = '4px 8px';
  tooltip.style.borderRadius = '4px';
  tooltip.style.fontSize = '12px';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.transition = 'opacity 0.2s';
  tooltip.style.opacity = 0;
  document.body.appendChild(tooltip);

  // 연결된 국가들만 하이라이트
  Object.keys(flagToCategory).forEach(code => {
    const paths = svg.querySelectorAll(`path[id="${code.toUpperCase()}"], path[id="${code.toLowerCase()}"]`);
    
    paths.forEach(path => {
      if (path.classList.contains('land2')) {
        path.classList.add('highlight');
      }
    });
  });
  
  // SVG 이벤트 delegation - 전체 국가 다 보이는게 더 좋아보여서 필터링 뺌
  svg.addEventListener('mousemove', e => {
    const target = e.target;
    // if (target.tagName.toLowerCase() !== 'path') {
    //   tooltip.style.opacity = 0;
    //   return;
    // }

    // const countryCode = target.id.toLowerCase();
    // if (!flagToCategory[countryCode]) {
    //   tooltip.style.opacity = 0;
    //   return;
    // }

    if (!target.getAttribute('title')) {
      tooltip.style.opacity = 0;
      return;
    }

    // tooltip 표시
    tooltip.textContent = target.getAttribute('title');
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.style.top = e.pageY + 10 + 'px';
    tooltip.style.opacity = 1;
  });

  svg.addEventListener('mouseleave', e => {
    tooltip.style.opacity = 0;
  });

  svg.addEventListener('click', e => {
    const target = e.target;
    if (target.tagName.toLowerCase() !== 'path') return;

    const countryCode = target.id.toLowerCase();
    const category = flagToCategory[countryCode];

    if (!category) return;

    location.href = `/categories/${category.toLowerCase()}/`;
  });
}
initCountryClick();