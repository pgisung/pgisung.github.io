(function(){  
  const container = document.body;

  function isInViewport(el) {
    const r = el.getBoundingClientRect();
    return (r.top < window.innerHeight && r.bottom > 0);
  }

  // function hasSkeletonAncestor(el) {
  //   let parent = el.parentElement;
  //   while (parent) {
  //     if (parent.dataset.skelApplied) {
  //       return true;
  //     }
  //     parent = parent.parentElement;
  //   }
  //   return false;
  // }

  // function isInsideHeaderOrFooter(el) {
  //   return el.closest('header, footer') !== null;
  // }

  function wrapImageWithSkeleton(img) {
    if (img.dataset.skelApplied) return;
    img.dataset.skelApplied = '1';

    const wrapper = document.createElement('div');
    wrapper.className = 'skeleton-wrapper img';

    // 이미지 비율 계산 부분
    var tempImg = new Image();
    tempImg.src = img.dataset.src;
    tempWidth = tempImg.width;
    tempHeight = tempImg.height;

    const resultHeight = img.width * tempHeight / tempWidth;

    wrapper.style.width = img.offsetWidth + 'px';
    wrapper.style.height = resultHeight + 2 + 'px';

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    img.classList.add('skeleton-content');
  }

  function wrapIframeWithSkeleton(iframe) {
    if (iframe.dataset.skelApplied) return;
    iframe.dataset.skelApplied = '1';

    const wrapper = document.createElement('div');
    wrapper.className = 'skeleton-wrapper iframe';

    iframe.parentNode.insertBefore(wrapper, iframe);
    wrapper.appendChild(iframe);

    iframe.classList.add('skeleton-content');
  }

  // function applyTextSkeleton(el) {
  //   if (el.dataset.skelApplied || hasSkeletonAncestor(el)) return;
  //   el.dataset.skelApplied = '1';

  //   const prevPos = getComputedStyle(el).position;
  //   if (prevPos === 'static' || !prevPos) {
  //     el.style.position = 'relative';
  //   }

  //   const overlay = document.createElement('div');
  //   overlay.className = 'skeleton-text-overlay';
  //   overlay.setAttribute('aria-hidden', 'true');

  //   overlay.style.height = el.getBoundingClientRect().height + 'px';
  //   el.appendChild(overlay);
  // }

  function loadImage(img) {
    if (img.dataset.loaded) return;
    img.dataset.loaded = '1';
    const src = img.dataset.src || img.getAttribute('data-src');
    if (!src) {
      img.classList.remove('skeleton-content');
      const wrapper = img.closest('.skeleton-wrapper');
      if (wrapper) {
        wrapper.parentNode.insertBefore(img, wrapper);
        wrapper.remove();
      }
      return;
    }
    img.addEventListener('load', () => {
      const wrapper = img.closest('.skeleton-wrapper');
      if (wrapper) wrapper.classList.add('loaded');
      
      img.classList.remove('skeleton-content');

      if (wrapper) {
        wrapper.parentNode.insertBefore(img, wrapper);
        wrapper.remove();
      }
    }, { once: true });

    img.src = src;
  }

  function loadIframe(iframe) {
    if (iframe.dataset.loaded) return;
    iframe.dataset.loaded = '1';
    const src = iframe.dataset.src || iframe.getAttribute('data-src');
    if (!src) {
      iframe.classList.remove('skeleton-content');
      const wrapper = iframe.closest('.skeleton-wrapper');
      if (wrapper) wrapper.classList.add('loaded');
      return;
    }
    iframe.addEventListener('load', () => {
      const wrapper = iframe.closest('.skeleton-wrapper');
      if (wrapper) wrapper.classList.add('loaded');

      iframe.classList.remove('skeleton-content');
    }, { once: true });

    iframe.src = src;
  }

  // function revealText(el) {
  //   const overlay = el.querySelector('.skeleton-text-overlay');
  //   if (!overlay) return;
  //   overlay.classList.add('loaded');
  //   setTimeout(()=> overlay.remove(), 300);
  // }

  function initSkeletonLazyLoading() {
    const imgs = Array.from(container.querySelectorAll('img[data-src]'));
    const iframes = Array.from(container.querySelectorAll('iframe[data-src*="google"]'));
    // const texts = Array.from(container.querySelectorAll('a, p, h1, h2, h3, h4, h5, h6'));

    let observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.tagName === 'IMG') {
            loadImage(el);
            observer.unobserve(el);
          } else {
            loadIframe(el);
            observer.unobserve(el);
          }
          // if (el.tagName === 'IMG') {
          //   loadImage(el);
          //   observer.unobserve(el);
          // } else if (el.tagName === 'IFRAME') {
          //   loadIframe(el);
          //   observer.unobserve(el);
          // } else {
          //   revealText(el);
          //   observer.unobserve(el);
          // }
        });
      }, { threshold: [0.2] });
    }

    imgs.forEach(img => {
      if (isInViewport(img)) {
        loadImage(img);
      } else {
        wrapImageWithSkeleton(img);
        if (observer) observer.observe(img);
      }
    });

    iframes.forEach(iframe => {
      if (isInViewport(iframe)) {
        loadIframe(iframe);
      } else {
        wrapIframeWithSkeleton(iframe);
        if (observer) observer.observe(iframe);
      }
    });

    // texts.forEach(el => {
    //   if (isInsideHeaderOrFooter(el)) return;      
    //   if (!isInViewport(el)) {
    //     applyTextSkeleton(el);
    //     if(observer) observer.observe(el);
    //   }
    // });

    if (!observer) {
      imgs.forEach(loadImage);
      iframes.forEach(loadIframe);
      // texts.forEach(el => {
      //   const overlay = el.querySelector('.skeleton-text-overlay');
      //   if (overlay) overlay.remove();
      // });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSkeletonLazyLoading);
  } else {
    initSkeletonLazyLoading();
  }

})();

// skeleton은 아니지만 pannellum 뷰어 lazy load 이벤트
document.addEventListener("DOMContentLoaded", function () {
  // 전역에 panoramas 배열이 존재하지 않으면 종료
  if (!window.panoramas || !Array.isArray(window.panoramas) || window.panoramas.length === 0) {
    return;
  }

  // Lazy Load observer
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pano = window.panoramas.find(p => p.id === entry.target.id);
        if (pano) {
          pannellum.viewer(pano.id, pano.config);
          obs.unobserve(entry.target); // 초기화 후 관찰 중지
        }
      }
    });
  }, { threshold: 0.2 }); // 20% 보이면 로드

  // 각 파노라마 div 등록
  window.panoramas.forEach(p => {
    const element = document.getElementById(p.id);
    if (element) observer.observe(element);
  });
});