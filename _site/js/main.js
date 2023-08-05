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
      $(".overlay").removeClass("show");
      $(".full-page-container").removeClass("open");
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
    json: '/search.json',
    searchResultTemplate: `
      <li>
        <a href="{url}">
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
                <i class="fa fa-tags" aria-hidden="true"></i>
                <p>{tags}</p>
              </div>
            </div>
          </div>
        </a>
      </li>
  `,
    templateMiddleware: function(prop, value, template) {
      if (prop === 'title' || prop === 'date' || prop === 'tags') {
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

  // 태그 버튼을 이용한 검색 기능 추가
  var tags = document.querySelectorAll('.search-box .tag');
  for (var i = 0; i < tags.length; i++) {
    tags[i].addEventListener('click', function(event) {
      event.preventDefault();
      var searchInput = document.querySelector('#search-input');
      var eventTargetAttr = event.target.getAttribute('href')
      if (eventTargetAttr) {
        var searchValue = eventTargetAttr.replace('#', '');
        searchInput.value = searchValue;
        var searchEvent = new KeyboardEvent('keyup', {
          bubbles: true,
          cancelable: true
        });
        searchInput.dispatchEvent(searchEvent);
      }
    });
  }

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

  // Slick.js : image-slider-passive
  $('.image-slider-passive').slick({
    dots: false,
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

  // #id로 a태그 앵커 이동할 때 id태그를 중앙으로 위치하도록 이동시킴 (원래는 최상단에 위치함)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetId = this.getAttribute('href').slice(1); // href에서 # 제거
      const target = document.getElementById(targetId);
      if (target) {
        const offsetTop = target.getBoundingClientRect().top; // target의 뷰포트 최상단부터 타겟요소까지 상대적인 위치 값 : 픽셀
        const headerOffset = window.innerHeight / 2; // window.innerHeight은 Viewport 높이 : 픽셀
        // scrollY: 전체 컨텐츠에서 스크롤된 정도 픽셀 값
  
        window.scrollBy({
          top: offsetTop - headerOffset,
          behavior: 'smooth'
        });
      }
    });
  });
  
});