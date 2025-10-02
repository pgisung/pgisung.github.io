// async function initCountryClick() {
//   const response = await fetch('/assets/search.json');
//   const posts = await response.json();

//   // flag → post 매핑 생성 (중복 제거)
//   const flagToPost = {};
//   posts.forEach(post => {
//     if (!post.flag || !post.categories) return;
//     const countryCode = post.flag.toLowerCase();
//     if (!(countryCode in flagToPost)) {
//       const categories = post.categories.split(',').map(c => c.trim());
//       const nonTravelCategory = categories.find(c => c.toLowerCase() !== 'travel');
//       if (nonTravelCategory) {
//         flagToPost[countryCode] = nonTravelCategory;
//       }
//     }
//   });

//   const svg = document.querySelector('svg');
//   svg.addEventListener('click', e => {
//     const target = e.target;
//     if (target.tagName.toLowerCase() !== 'path') return;

//     const countryCode = target.id.toLowerCase();
//     const category = flagToPost[countryCode];

//     if (!category) return;

//     location.href = `/categories/${category}/`;
//   });
// }
// initCountryClick();

async function initCountryClick() {
  const response = await fetch('/assets/search.json');
  const posts = await response.json();

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

  // SVG 이벤트 delegation
  const svg = document.querySelector('svg');

  svg.addEventListener('mousemove', e => {
    const target = e.target;
    if (target.tagName.toLowerCase() !== 'path') {
      tooltip.style.opacity = 0;
      return;
    }

    const countryCode = target.id.toLowerCase();
    if (!flagToCategory[countryCode]) {
      tooltip.style.opacity = 0;
      // target.style.fill = ''; // 원래 색상 복원
      return;
    }

    // hover highlight
    // target.style.fill = 'rgba(0, 158, 220, 0.3)';

    // tooltip 표시
    tooltip.textContent = countryCode.toUpperCase();
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.style.top = e.pageY + 10 + 'px';
    tooltip.style.opacity = 1;
  });

  svg.addEventListener('mouseleave', e => {
    tooltip.style.opacity = 0;
    // hover 색 초기화
    // svg.querySelectorAll('path').forEach(path => path.style.fill = '');
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