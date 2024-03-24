$(function() {
  'use strict';

  // Nav Menu
  $(".nav-toggle").click(function() {

    $(".full-page-container, .navigation-wrap").toggleClass("open");
    if ($(".full-page-container").hasClass("open")) {
      $(".nav-toggle").html('<i class="fa fa-times" aria-hidden="true"></i>');
    } else {
      $(".full-page-container, .navigation-wrap").removeClass("open");
      $(".nav-toggle").html('<i class="fa fa-bars" aria-hidden="true"></i>');
    };
    $(".overlay").toggleClass("show");

  });

  $(".overlay").click(function() {
    $(".full-page-container, .navigation-wrap").removeClass("open");
    $(".overlay").removeClass("show");
    $(".nav-toggle").html('<i class="fa fa-bars" aria-hidden="true"></i>');
  });

  $(window).on("resize", function() {
    var e = $(this);
    if (e.width() >= 991) {
      $(".full-page-container, .navigation-wrap").removeClass("open");
      $(".overlay").removeClass("show");
      $(".nav-toggle").html('<i class="fa fa-bars" aria-hidden="true"></i>');
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
    if ($('.full-page-container').hasClass('open')) {
      $('.full-page-container').removeClass('open');
      $('.nav-toggle').html('<i class="fa fa-bars" aria-hidden="true"></i>');
    }
    if ($('.overlay').hasClass('show')) {
      $('.overlay').removeClass('show');
      $('.nav-toggle').html('<i class="fa fa-bars" aria-hidden="true"></i>');
    }

    $('.search-box').addClass('show');
    $('.navigation-wrap').removeClass('open');
  });
  $('.btn-close').click(function() {
    $('.search-box').removeClass('show');
    // 검색창 닫힐 때 이전 검색 기록 초기화
    var searchInput = document.querySelector('#search-input');
    searchInput.value = '';
    var searchEvent = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true
    });
    searchInput.dispatchEvent(searchEvent);
  });
  // $('.search-toggle').click(function() {
  //   $('.search-box').addClass('show');
  //   $('.navigation-wrap').removeClass('open');
  // });
  // $('.btn-close').click(function() {
  //   $('.search-box').removeClass('show');
  // });
  
  // Simple Search Settings
  var searchInput = document.getElementById('search-input');
  var sjs = SimpleJekyllSearch({
    searchInput: searchInput,
    resultsContainer: document.getElementById('results-container'),
    json: '/assets/search.json',
    searchResultTemplate: `
      <li>
        <a href="{url}" title="Navigate to {subject} post">
          <div class="template-box">
            <div class="template-image">
              <img src="{img}">
            </div>
            <div class="template-info">
              <div>
                <i class="fa fa-file-text-o" aria-hidden="true"></i>
                <p>{title}</p>
              </div>
              <div class="template-subinfo">
                <i class="fa fa-calendar" aria-hidden="true"></i>
                <p>{date}</p>
              </div>
              <div class="template-subinfo">
                <i class="fa fa-th-list" aria-hidden="true"></i>
                <p>{categories}</p>
              </div>
              <div class="template-subinfo">
                <i class="fa fa-tags" aria-hidden="true"></i>
                <p>{tags}</p>
              </div>
            </div>
          </div>
        </a>
      </li>
  `,
    templateMiddleware: function(prop, value, template) {
      if (prop === 'title' || prop === 'date' || prop === 'tags' || prop === 'categories') {
        // 검색어
        var keyword = searchInput.value;
        // 강조된 단어로 대체
        var marked = '<span class="template-mark">' + keyword + '</span>';
        // 원래의 값을 강조된 값으로 대체
        value = value.replace(new RegExp(keyword, 'gi'), marked);
      }
      return value;
    },
    noResultsText: 'No results found'
    // searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
    // searchResultTemplate: '<li><a href="{url}?query={query}" title="{desc}">{title}</a></li>',
    // limit: 10,
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

    $(this).addClass("is-loading").text("Loading...");

    $.get("/page/" + nextPage, function(data) {
      var htmlData = $.parseHTML(data);
      var $articles = $(htmlData).find("article");

      $postsContainer.attr("data-page", nextPage).append($articles);

        $(".post-thumbnail").viewportChecker({
          classToAdd: "visible",
          classToRemove: "hidden visible",
          removeClassAfterAnimation: true,
          offset: 0
        });

      if ($postsContainer.attr("data-totalPages") == nextPage) {
        $(".load-more").remove();
      }

      $(_this).removeClass("is-loading");
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
      dots: false,
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
  
      const targetId = this.getAttribute('href').slice(1); // href에서 # 제거
      const target = document.getElementById(targetId);
      if (target) {
        const offsetTop = target.getBoundingClientRect().top; // target의 뷰포트 최상단부터 타겟요소까지 상대적인 위치 값 : 픽셀
        const headerOffset = window.innerHeight / 8; // window.innerHeight은 Viewport 높이 : 픽셀
        // scrollY: 전체 컨텐츠에서 스크롤된 정도 픽셀 값
  
        window.scrollBy({
          top: offsetTop - headerOffset,
          behavior: 'smooth'
        });
      }
    });
  });

  // /tags/#id로 다른 페이지인 tags페이지의 #id로 a태그 앵커 이동할 때 id태그를 중앙으로 위치하도록 이동시킴 (원래는 최상단에 위치함) - post 페이지
  window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        // 페이지가 로드된 후에 요소의 offsetTop 값을 가져온다. - 로드가 완료되기 전엔 항상 0
        window.setTimeout(() => {
          const offsetTop = target.getBoundingClientRect().top;
          const headerOffset = window.innerHeight / 8;
          window.scrollBy({
            top: offsetTop - headerOffset,
            behavior: 'smooth'
          });
        }, 0);
      }
    }
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

  // 일단 우클릭은 막아놓자.
  // document.addEventListener('contextmenu', function(e) {
  //   e.preventDefault();
  // });

});