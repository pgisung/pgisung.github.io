$(".load-more-filtered").click(loadMoreFilteredPosts);

function getCategoriesFromURL(url) {
  if (!url) url = window.location.href;
  var segments = url.split('/').filter(Boolean);
  var categoryIndex = segments.indexOf('categories');
  var categories = [];

  if (categoryIndex !== -1 && segments[categoryIndex + 1]) {
    return segments[categoryIndex + 1];
  } else {
    for (var i = categoryIndex + 1; i < segments.length; i++) {
      var seg = segments[i];
      // 정수(숫자) 형태 나오면 중단
      if (!isNaN(parseInt(seg, 10))) {
        break;
      }
      categories.push(seg);
    }
  }

  return categories;
}

var nextPage = 2;
function loadMoreFilteredPosts() {
  var $postsContainer = $(".wrapper");
  const maxPosts = parseInt($postsContainer.attr("data-postsPerPage"));
  var currentCategory = getCategoriesFromURL();
  var totalPosts = parseInt($postsContainer.attr("data-totalPosts"));
  var totalPages = Math.ceil(totalPosts / maxPosts);

  $(".load-more-filtered").addClass("is-loading").text("Loading...");

  $.get("/page/" + nextPage, function(data) {
    var htmlData = $.parseHTML(data);
    var $articles = $(htmlData).find("article");
    var $filteredArticles = [];

    $articles.each(function() {
      var $article = $(this);
      var articleCategories = getCategoriesFromURL($article.find("a").attr("href"));
      var articleHref = $article.find("a").attr("href");

      // 현재 카테고리가 articleCategories 안에 포함돼 있는지 확인
      if (articleCategories.includes(currentCategory)) {
        // 이미 append된 article들 중에 같은 href가 있는지 확인
        if ($postsContainer.find("a[href='" + articleHref + "']").length === 0) {
          $filteredArticles.push($article);
        }
      }
    });

    // Append 결과물
    $postsContainer.attr("data-page", nextPage).append($filteredArticles);

    updateViewsForNewPosts($postsContainer[0]);

    // 뷰포트 체크
    $(".post-thumbnail").viewportChecker({
      classToAdd: "visible",
      classToRemove: "hidden visible",
      removeClassAfterAnimation: true,
      offset: 0
    });

    // 조건 검사
    if ($filteredArticles.length === maxPosts) {
      $(".load-more-filtered").removeClass("is-loading").text("Load more posts");
      return;
    }

    if (nextPage >= totalPages) {
      nextPage = 2;
      $(".load-more-filtered").remove();
      return;
    }

    // 위 조건에 안 걸리면 → nextPage 증가시키고 재귀 호출
    nextPage++;
    loadMoreFilteredPosts();
  });
}