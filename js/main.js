$(function() {
  'use strict';

  // Nav Menu
  $(".nav-toggle").click(function() {
    $(".nav-toggle, .full-page-container, .navigation-wrap").toggleClass("open");
    $(".overlay").toggleClass("nav");
  });

  $(".overlay").click(function() {
    $(".nav-toggle, .full-page-container, .navigation-wrap").removeClass("open");
    $(".overlay").removeClass("nav search");

    // 검색 모달도 닫아야함
    doCloseSearchBox();
  });

  $(window).on("resize", function() {
    var e = $(this);
    if (e.width() >= 991) {
      $(".nav-toggle, .full-page-container, .navigation-wrap").removeClass("open");
      $(".overlay").removeClass("nav");
    }
  });

  // Responsive Videos
  $('.page-content').fitVids({
    'customSelector': ['iframe[src*="ted.com"]']
  });

  // Medium's Image Zoom
  $('.page img, .post img').attr('data-action', 'zoom');
  $(".page a img, .post a img").removeAttr("data-action", "zoom");

  // Search Box
  $('.search-toggle').click(function() {
    // 검색창 출력시 nav화면은 초기화 해야함
    $(".nav-toggle, .full-page-container, .navigation-wrap").removeClass("open");
    $(".overlay").removeClass("nav");

    // 검색창 출력
    $('.search-box').addClass('show');    
    // 모달 on시 body 다른 항목 click 막기
    $(".overlay").addClass("search");
    // 모달 on시 body 스크롤 막기
    document.body.style.overflow = 'hidden';
    // 입력창에 포커스 추가
    if (window.innerWidth > 480) {
      document.getElementById("search-input").focus();
    }
  });
  // Search Box Close button
  $('.btn-close').click(doCloseSearchBox);

  function doCloseSearchBox() {
    $(".search-box").removeClass("show");
    // 검색창 닫힐 때 이전 검색 기록 초기화
    var searchInput = document.querySelector("#search-input");
    searchInput.value = "";
    var searchEvent = new KeyboardEvent("keyup", {
      bubbles: true,
      cancelable: true
    });
    searchInput.dispatchEvent(searchEvent);
    // 모달 off시 body 다른 항목 click 다시 열기
    $(".overlay").removeClass("search");
    // 모달 off시 body 스크롤 다시 열기
    document.body.style.overflowY = "auto";
  }
  
  // Simple Search Settings
  var searchInput = document.getElementById('search-input');

  // 검색 입력창에서 Enter 눌러도 폼 제출/페이지 이동 막기
  document.getElementById("search-input").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 동작 차단 → 검색창 안 닫힘
    } else if (e.key === 'Escape' || e.keyCode === 27) {
      // 검색창이 열려 있을 때만 닫기
      if (document.querySelector('.search-box').classList.contains('show')) {
        doCloseSearchBox();
      }
    }
  });

  var sjs = SimpleJekyllSearch({
    searchInput: searchInput,
    resultsContainer: document.getElementById('results-container'),
    json: '/assets/search.json',
    searchResultTemplate: `
      <li>
        <a href="{url}" title="Navigate to {subject} post">
          <div class="template-box">
            <div class="template-image">
              <span class="img-icon" style="background-image: url('{img}');"></span>
            </div>
            <div class="template-info">
              <div class="template-title">
                <p>{title}</p>
              </div>
              <div class="template-subinfo">
                <i class="fa fa-calendar" aria-hidden="true"></i>
                <p>{date}</p>
              </div>
            </div>
          </div>
        </a>
      </li>
  `,
    templateMiddleware: function(prop, value, template) {
      if (prop === 'title' || prop === 'date') {
        // 검색어
        var keyword = searchInput.value;
        // 강조된 단어로 대체
        var marked = '<span class="template-mark">' + keyword + '</span>';
        // 원래의 값을 강조된 값으로 대체
        value = value.replace(new RegExp(keyword, 'gi'), marked);
      }
      return value;
    },
    noResultsText: 'No results found',
    // 검색 결과를 모두 출력하기 위해 높게 설정 (값을 입력 안했을 때 기본값이 10으로 보임)
    limit: 1000
    // searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
    // searchResultTemplate: '<li><a href="{url}?query={query}" title="{desc}">{title}</a></li>',
    // fuzzy: false, // 검색어와 완전히 일치한 결과 사용 여부 false면 완전히 일치해야함
    // exclude: ['Welcome']
  })

  // 검색 내용 초기화 버튼 추가
  document.querySelector('.btn-remove').addEventListener('click', function(event) {
    event.preventDefault();
    var searchInput = document.querySelector('#search-input');
    searchInput.value = '';
    var searchEvent = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true
    });
    searchInput.dispatchEvent(searchEvent);
    // 입력창에 포커스 추가
    if (window.innerWidth > 480) {
      document.getElementById("search-input").focus();
    }
  });

  // 태그 버튼을 이용한 검색 기능
  document.querySelectorAll('.search-box .tag').forEach(tag => {
    tag.addEventListener('click', function(event) {
      event.preventDefault();
      var searchInput = document.querySelector('#search-input');
      // Mark: 원래는 a태그 자체를 타겟으로 값을 가져왔었으나 현재 원인불명으로 a태그가 사라지고 bubble up으로 그안의 span 태그가 눌려서 event를 전달하는 현상이 있어서 가장가까운 a 태그로부터 정보를 가져오도록 수정해둠 추후 근본적인 원인 개선 필요
      // var eventTargetText = event.target.textContent.replace(/\s*\(\d+\)/, '' )
      var eventTargetText = event.target.closest('a.tag').textContent.replace(/\s*\(\d+\)/, '')
      if (eventTargetText) {
        searchInput.value = eventTargetText;
        var searchEvent = new KeyboardEvent('keyup', {
          bubbles: true,
          cancelable: true
        });
        searchInput.dispatchEvent(searchEvent);
      }
      // 입력창에 포커스 추가
      if (window.innerWidth > 480) {
        document.getElementById("search-input").focus();
      }
    });
  });
  // 카테고리 버튼을 이용한 검색 기능 - logic은 바로 위의 태그함수와 동일하므로 수정할 시 둘 다 수정
  document.querySelectorAll('.search-box .category').forEach(category => {
    category.addEventListener('click', function(event) {
      event.preventDefault();
      var searchInput = document.querySelector('#search-input');
      var eventTargetText = event.target.closest('a.category').textContent.replace(/\s*\(\d+\)/, '')
      if (eventTargetText) {
        searchInput.value = eventTargetText;
        var searchEvent = new KeyboardEvent('keyup', {
          bubbles: true,
          cancelable: true
        });
        searchInput.dispatchEvent(searchEvent);
      }
      // 입력창에 포커스 추가
      if (window.innerWidth > 480) {
        document.getElementById("search-input").focus();
      }
    });
  });

  // Scroll To Top
  $('.top').click(function () {
    $('html, body').stop().animate({ scrollTop: 0 }, 'slow', 'swing');
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(window).height()) {
      $('.top').addClass("top-active");
    } else {
      $('.top').removeClass("top-active");
    };
  });

  // Post Thumbnail Animation
  $(".post-thumbnail").viewportChecker({
    classToAdd: "visible",
    classToRemove: "hidden",
    removeClassAfterAnimation: true,
    offset: 0
  });

  // Pagination
  $(".load-more").click(loadMorePosts);

  function loadMorePosts() {
    var _this = this;
    var $postsContainer = $(".wrapper");
    var nextPage = parseInt($postsContainer.attr("data-page")) + 1;
    var totalPages = parseInt($postsContainer.attr("data-totalPages"));

    $(_this).addClass("is-loading").text("Loading...");

    $.get("/page/" + nextPage, function(data) {
      var htmlData = $.parseHTML(data);
      var $articles = $(htmlData).find("article");

      $postsContainer.attr("data-page", nextPage).append($articles);

      updateViewsForNewPosts($postsContainer[0]);

        $(".post-thumbnail").viewportChecker({
          classToAdd: "visible",
          classToRemove: "hidden visible",
          removeClassAfterAnimation: true,
          offset: 0
        });

      if (totalPages == nextPage) {
        $(".load-more").remove();
      }

      $(_this).removeClass("is-loading").text("Load more posts");
    });
  }

  // Slick.js : image-slider-static
  $('.image-slider-static').slick({
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
  });

  // Slick.js : image-slider-passive
  $('.image-slider-passive').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        // {
        //   breakpoint: 1024,
        //   settings: {
        //     slidesToShow: 3,
        //     slidesToScroll: 3,
        //   }
        // },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
  });

  // Slick.js : image-slider-auto
  $('.image-slider-auto').slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        // {
        //   breakpoint: 1024,
        //   settings: {
        //     slidesToShow: 3,
        //     slidesToScroll: 3,
        //   }
        // },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
      // fade: true,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: 'linear'
  });

  // #id로 a태그 앵커 이동할 때 id태그를 중앙으로 위치하도록 이동시킴 (원래는 최상단에 위치함) - tags 페이지
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (!target) return;

      const headerOffset = window.innerHeight / 8;
      const tolerance = 5; // 몇 px 이하면 도착으로 인정

      const scrollToTarget = () => {
        const offsetTop = target.getBoundingClientRect().top;
        const currentScroll = window.scrollY;

        // 실제 스크롤해야 할 위치 계산
        const targetScrollPos = currentScroll + offsetTop - headerOffset;

        // 스크롤 수행
        window.scrollTo({
          top: targetScrollPos,
          behavior: 'smooth'
        });

        // 약간의 시간 후 위치 확인 (lazy 이미지 반영 시간 확보)
        setTimeout(() => {
          const newOffsetTop = target.getBoundingClientRect().top;

          // 목표 위치에 충분히 근접했는지 확인
          if (Math.abs(newOffsetTop - headerOffset) > tolerance) {
            scrollToTarget(); // 아직 멀면 재시도
          }
          // 충분히 도착했으면 자동 종료
        }, 1000);
      };

      scrollToTarget();
    });
  });

  // /tags/#id로 다른 페이지인 tags페이지의 #id로 a태그 앵커 이동할 때 id태그를 중앙으로 위치하도록 이동시킴 (원래는 최상단에 위치함) - post 페이지
  window.addEventListener('load', () => {
    const rawHash = window.location.hash;
    if (!rawHash) return;

    let replacedHash = rawHash
      .replace(/^#/, '')
      .replace(/\/+$/, '');
    let decodedHash = replacedHash;

    try {
      decodedHash = decodeURIComponent(replacedHash);
    } catch (e) {}
    
    const target = document.getElementById(replacedHash) ||
  document.getElementById(decodedHash);
    if (!target) return;

    const headerOffset = window.innerHeight / 8;
    const tolerance = 5;
    const maxAttempts = 10;

    let attempts = 0;

    const scrollToTarget = () => {
      if (attempts >= maxAttempts) return;
      
      const offsetTop = target.getBoundingClientRect().top;
      const currentScroll = window.scrollY;
      const targetScrollPos = currentScroll + offsetTop - headerOffset;

      // 스크롤 수행
      window.scrollTo({
        top: targetScrollPos,
        behavior: 'smooth'
      });
      attempts++;

      // 약간의 시간 후 위치 확인 (lazy 이미지 반영 시간 확보)
      window.setTimeout(() => {
        const newOffsetTop = target.getBoundingClientRect().top;        
        
        // 목표 위치에 충분히 근접했는지 확인
        if (Math.abs(newOffsetTop - headerOffset) > tolerance) {
          scrollToTarget(); // 아직 멀면 재시도
        }
        // 충분히 도착했으면 자동 종료
      }, 200);
    };

    scrollToTarget();
  });

  // 카테고리, 태그 나무 그리기
  window.addEventListener('load', () => {
    const canvases = document.querySelectorAll('.elements-tree');
    canvases.forEach(function(canvas) {
      new TreeManager(canvas);  
    });
  });

  // 코드블록 코드 복사 버튼 추가
  window.addEventListener('load', function() {
    var codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(codeBlock) {
        var button = document.createElement('span');
        button.className = 'copy-btn';
        button.innerHTML = '<i class="fa fa-clone" aria-hidden="true"></i>';
        button.title = 'Copy to clipboard';
        
        codeBlock.parentNode.appendChild(button);
        
        button.addEventListener('click', function() {
            navigator.clipboard.writeText(codeBlock.innerText)
                .then(function() {
                    console.log('코드가 복사되었습니다.');
                    // 성공적으로 복사된 후 3초 후에 원래 상태로 되돌림
                    setTimeout(function() {
                        button.innerHTML = '<i class="fa fa-clone" aria-hidden="true"></i>';
                        button.title = 'Copy to clipboard';
                        button.style.pointerEvents = 'auto';
                    }, 3000);
                    // 아이콘 변경, 클릭 불가 및 숨김 설정
                    button.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
                    button.title = '';
                    button.style.pointerEvents = 'none';
                })
                .catch(function(err) {
                    console.error('코드 복사에 실패했습니다.', err);
                });
        });
    });
  });

  // 검색 모달이 보여질 때 스크립트로 스크롤 overflow를 제어하는데 이 부분이 추가된 후 처음 페이지가 로드될 때 검색 창을 껐다 키지 않으면 뷰포트를 넘어가는 요소들에 대하여 x스크롤이 생기는 현상이 있다.
  // 그러므로 페이지가 로드될 때 body x-scroll을 스크립트로 먼저 막아놓자
  window.addEventListener('load', () => {
    document.body.style.overflowX = 'hidden';
  });

  // 일단 우클릭은 막아놓자.
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

});