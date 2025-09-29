// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, increment } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcpPOKY8PPVUClgymv9cdnKyP8Z0DpNUk",
  authDomain: "blog-counter-7b304.firebaseapp.com",
  projectId: "blog-counter-7b304",
  storageBucket: "blog-counter-7b304.firebasestorage.app",
  messagingSenderId: "17583524075",
  appId: "1:17583524075:web:3147f49bda8c26724556ae",
  measurementId: "G-N88JH56E5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function incrementCounter(path, field, elementId) {
  const ref = doc(db, ...path);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { [field]: increment(1) });
    document.getElementById(elementId).innerText = snap.data()[field] + 1;
  } else {
    // 문서가 없으면 새로 생성
    await setDoc(ref, { [field]: 1 });
    document.getElementById(elementId).innerText = 1;
  }
}

async function incrementCounterDaily(path, field, elementId) {
  const ref = doc(db, ...path);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { [field]: increment(1) });
    document.getElementById(elementId).innerText = snap.data()[field] + 1;
  } else {
    // 문서가 없으면 새로 생성
    await setDoc(ref, {
      [field]: 1,
      createdAt: new Date() // Daily용 TTL
    });
    document.getElementById(elementId).innerText = 1;
  }
}

async function incrementCounterPosts(path, field) {
  const ref = doc(db, ...path);
  try {
    await updateDoc(ref, { [field]: increment(1) });
  } catch (e) {
    // 문서가 없으면 새로 생성
    // merge 옵션을 넣음으로써 updateDoc때 해당 필드가 존재하지 않는 이외의 오류때 혹시 다른 필드 데이터가 영향 받는 것을 방지
    await setDoc(ref, { [field]: 1 }, { merge: true });
  }
}

// 오늘 날짜 (YYYY-MM-DD)
const today = new Date().toISOString().slice(0, 10);
// localStorage 전체 방문자용 키 (도메인 기준)
const globalVisitKey = "visited_global";
// localStorage 포스트별 방문자용 키 (URL 기준)
const pageURL = window.location.pathname;
const pageId = encodeURIComponent(pageURL); // 인코딩필요
// 조회수 캐싱용 객체
// let postViewsCache = {};

// expire 기능 포함 저장 함수
function setWithExpire(key, value, ttlHours) {
  const now = Date.now();
  const item = {
    value: value,
    expire: now + ttlHours * 60 * 60 * 1000 // 시간 단위 TTL
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpire(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  try {
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expire) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

// 실행
// (async () => {
//   // 방문자수
//   try {
//     if (!getWithExpire(globalVisitKey)) {
//       // 총 방문자수
//       await incrementCounter(["stats", "global"], "totalVisits", "total-visits");
//       // 오늘 방문자수
//       await incrementCounterDaily(["daily", today], "visits", "today-visits");

//       // 만료시간: 현재 24시간
//       setWithExpire(globalVisitKey, "true", 24);
//     } else {
//       // 이미 방문한 경우, 기존 DB 값만 가져와서 표시
//       const totalSnap = await getDoc(doc(db, "stats", "global"));
//       if (totalSnap.exists()) document.getElementById("total-visits").innerText = totalSnap.data().totalVisits;

//       const todaySnap = await getDoc(doc(db, "daily", today));
//       if (todaySnap.exists()) document.getElementById("today-visits").innerText = todaySnap.data().visits;
//     }
//   } catch (e) {
//     console.error("방문자수 업데이트 오류:", e);
//   }
// })();
(async () => {
  try {
    const sessionKey = "visitCountsCached_" + today;
    const cached = sessionStorage.getItem(sessionKey);

    if (!getWithExpire(globalVisitKey)) {
      // 처음 방문 → DB 업데이트 & UI 표시
      await incrementCounter(["stats", "global"], "totalVisits", "total-visits");
      await incrementCounterDaily(["daily", today], "visits", "today-visits");

      // 캐시에 표시값 저장
      const totalVal = Number(document.getElementById("total-visits").innerText);
      const todayVal = Number(document.getElementById("today-visits").innerText);

      sessionStorage.setItem(
        sessionKey,
        JSON.stringify({ totalVisits: totalVal, todayVisits: todayVal })
      );
      setWithExpire(globalVisitKey, "true", 24);
    } else {
      // DB에서 다시 안 가져옴 → sessionStorage 값 그대로 표시
      if (cached) {
        const { totalVisits, todayVisits } = JSON.parse(cached);
        document.getElementById("total-visits").innerText = totalVisits;
        document.getElementById("today-visits").innerText = todayVisits;
      } else {
        // 혹시 세션에 값이 없으면 한 번만 DB 조회
        const totalSnap = await getDoc(doc(db, "stats", "global"));
        const todaySnap = await getDoc(doc(db, "daily", today));

        const totalVal = totalSnap.exists() ? totalSnap.data().totalVisits : 0;
        const todayVal = todaySnap.exists() ? todaySnap.data().visits : 0;

        document.getElementById("total-visits").innerText = totalVal;
        document.getElementById("today-visits").innerText = todayVal;

        sessionStorage.setItem(
          sessionKey,
          JSON.stringify({ totalVisits: totalVal, todayVisits: todayVal })
        );
      }
    }
  } catch (e) {
    console.error("방문자수 업데이트 오류:", e);
  }
})();

(async () => {
  // 포스트별 조회수
  try {
    // 날짜 기반 slug로 끝나는 URL만 집계
    const isPostUrl = /\/\d{4}\/\d{2}\/\d{2}\/[^/]+\/?$/.test(pageURL);

    if (!isPostUrl) return;
    
    if (!getWithExpire(pageId)) {
      // 포스트별 조회수 - 단일 포스트 페이지용
      await incrementCounterPosts(["posts", pageId], "views");

      // 만료시간: 현재 24시간
      setWithExpire(pageId, "true", 24);
    }
  } catch (e) {
    console.error("단일 포스트 조회수 업데이트 오류:", e);
  }
})();

// 여러 포스트 조회수 업데이트
// (async () => {
//   try {
//     const snap = await getDocs(collection(db, "posts"));
//     snap.forEach(docSnap => {
//       postViewsCache[decodeURIComponent(docSnap.id)] = docSnap.data().views ?? 0;
//       const span = document.querySelector(`.post-views[data-post-id="${decodeURIComponent(docSnap.id)}"]`);
//       if (span) {
//         span.textContent = postViewsCache[decodeURIComponent(docSnap.id)];
//       }
//     });
//   } catch (e) {
//     console.error("여러 포스트 조회수 업데이트 오류:", e);
//   }
// })();

// // pagination loadMorePosts 버튼 실행 시 추가된 .post-views 업데이트
// window.updateViewsForNewPosts = function(container) {
//   container.querySelectorAll('.post-views').forEach(span => {
//     const postId = decodeURIComponent(span.dataset.postId);
//     if (postViewsCache[postId] !== undefined) {
//       span.textContent = postViewsCache[postId];
//     }
//   });
// }

(async () => {
  try {
    const sessionKey = "postsViewsCache";
    let postViewsCache = {};

    // sessionStorage에 캐시가 있으면 바로 사용
    const cached = sessionStorage.getItem(sessionKey);
    if (cached) {
      postViewsCache = JSON.parse(cached);
    } else {
      // 없으면 DB에서 getDocs 호출
      const snap = await getDocs(collection(db, "posts"));
      snap.forEach(docSnap => {
        postViewsCache[decodeURIComponent(docSnap.id)] = docSnap.data().views ?? 0;
      });
      // sessionStorage에 저장
      sessionStorage.setItem(sessionKey, JSON.stringify(postViewsCache));
    }

    // DOM 업데이트
    Object.keys(postViewsCache).forEach(postId => {
      const span = document.querySelector(`.post-views[data-post-id="${decodeURIComponent(postId)}"]`);
      if (span) {
        span.textContent = postViewsCache[decodeURIComponent(postId)];
      }
    });

    // 전체 포스트 JSON 불러오기
    const response = await fetch('/assets/search.json');
    const posts = await response.json();

    // 인기 글 목록 업데이트
    renderPopularPosts(posts, postViewsCache);
    // 최신 글 목록 업데이트 - 다른 곳(DOMContentLoaded 이벤트 등)에서 호출해도 되지만 인기 글 목록과 함께 두기 위해서 이곳에서 호출
    renderRecentPosts(posts);
    // 최신 댓글 목록 업데이트
    renderRecentCusdisComments();

    // 전역에서 새로 추가된 포스트에도 적용 가능하도록 함수 정의
    window.updateViewsForNewPosts = function(container) {
      container.querySelectorAll('.post-views').forEach(span => {
        const postId = decodeURIComponent(span.dataset.postId);
        if (postViewsCache[postId] !== undefined) {
          span.textContent = postViewsCache[postId];
        }
      });
    };

  } catch (e) {
    console.error("여러 포스트 조회수 업데이트 오류:", e);
  }
})();

// createdAt이 만료된 데이터 삭제
async function cleanupOldDailyData() {
  const dailyCol = collection(db, "daily");
  const snap = await getDocs(dailyCol);

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30); // 30일 전

  snap.forEach(async (d) => {
    const createdAt = d.data().createdAt.toDate();
    if (createdAt < cutoff) {
      await deleteDoc(doc(db, "daily", d.id));
    }
  });
}

// 페이지 로드 시 호출 - 단 하루 한 번만 실행
(async () => {
  const cleanupKey = "cleanup_old_daily_data"; // 로컬스토리지 키명
  const lastCleanup = getWithExpire(cleanupKey);

  // 하루(24시간) 이내에 실행된 적 없다면
  if (!lastCleanup) {
    try {
      await cleanupOldDailyData();
      // 하루(24시간) 뒤에 만료되도록 저장
      setWithExpire(cleanupKey, "true", 24);
    } catch(e) {
      console.error("cleanupOldDailyData 오류:", e);
    }
  }
})();

function renderPopularPosts(posts, postViewsCache) {
  try {
    // postsArray 배열 생성 postId: 페이지 URL, views: 조회수
    let postsArray = Object.keys(postViewsCache).map(postId => {
      const views = postViewsCache[decodeURIComponent(postId)];
      // optional: 각 post의 날짜 가져오기 (DOM에 data-date 속성 있다고 가정)
      const article = document.querySelector(`.post-views[data-post-id="${decodeURIComponent(postId)}"]`);
      const dateStr = article?.dataset.date || "1990-01-29"; 
      return {
        postId,
        views,
        date: new Date(dateStr)
      };
    });

    // 조회수 내림차순, 조회수 같으면 최신 글 먼저
    postsArray.sort((a, b) => {
      if (b.views === a.views) {
        return b.date - a.date; // 최신순
      }
      return b.views - a.views;
    });

    // Top 5 선택
    const top5 = postsArray.slice(0, 5);

    // posts에서 실제 존재하는 포스트만 골라서 새 배열 생성
    const matchedPosts = top5
      .map(topPost => {
        const matched = posts.find(p => p.url === decodeURIComponent(topPost.postId));
        return matched ? matched : null;
      })
      .filter(item => item !== null);

    // footer에 렌더링
    renderPostList("popular-posts-list", matchedPosts);
  } catch (e) {
    console.error("인기 포스트 리스트 로드 중 오류:", e);
  }
}

function renderRecentPosts(posts) {
  try {
    // 최신순 정렬
    const sorted = posts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    // 최신 5개만 추리기
    const top5 = sorted.slice(0, 5);

    // footer에 렌더링
    renderPostList("recent-posts-list", top5);
  } catch (e) {
    console.error("최신 포스트 리스트 로드 중 오류:", e);
  }
}

function renderPostList(id, posts) {
  const ul = document.getElementById(id);
  posts.forEach(post => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = post.url;
    a.title = "Navigate to " + post.title + " post";

    const elementBox = document.createElement("div");
    elementBox.classList.add("element-box");

    const elementImage = document.createElement("div");
    elementImage.classList.add("element-image");
    const spanImg = document.createElement("span");
    spanImg.classList.add("img-icon");
    spanImg.style.backgroundImage = `url(${post.img})`;

    const elementInfo = document.createElement("div");
    elementInfo.classList.add("element-info");

    const elementTitle = document.createElement("div");
    elementTitle.classList.add("element-title");
    const pTitle = document.createElement("p");
    pTitle.textContent = post.title;

    const elementDate = document.createElement("div");
    elementDate.classList.add("element-date");
    const iCalendar = document.createElement("i");
    iCalendar.classList.add("fa", "fa-calendar");
    iCalendar.ariaHidden = true;
    const pDate = document.createElement("p");
    pDate.textContent = post.date;

    elementTitle.appendChild(pTitle);
    elementInfo.appendChild(elementTitle);
    elementDate.appendChild(iCalendar);
    elementDate.appendChild(pDate);
    elementInfo.appendChild(elementDate);
    elementImage.appendChild(spanImg);
    elementBox.appendChild(elementImage);
    elementBox.appendChild(elementInfo);
    a.appendChild(elementBox);
    li.appendChild(a);
    ul.appendChild(li);
  });
}

async function renderRecentCusdisComments() {
  try {
    const appId = '9b128654-4128-4227-b3ae-137b9addd055';
    const res = await fetch(`https://cusdis.com/api/open/comments?appId=${appId}&page=1&pageSize=5`);
    const data = await res.json();
    
    const ul = document.getElementById('recent-comments-list');
    
    data.data.data.forEach(c => {
      const li = document.createElement("li");

      const a = document.createElement("a");
      a.href = c.page.slug;
      a.title = "Navigate to " + c.page.title + " post";

      const elementInfo = document.createElement("div");
      elementInfo.classList.add("element-info");

      const elementTitle = document.createElement("div");
      elementTitle.classList.add("element-title");
      const iCommenting = document.createElement("i");
      iCommenting.classList.add("fa", "fa-commenting");
      iCommenting.ariaHidden = true;
      const pTitle = document.createElement("p");
      pTitle.textContent = c.content.slice(0, 50);

      const elementDate = document.createElement("div");
      elementDate.classList.add("element-date");
      const iCalendar = document.createElement("i");
      iCalendar.classList.add("fa", "fa-calendar");
      iCalendar.ariaHidden = true;
      const pDate = document.createElement("p");
      const [date, time] = c.page.createdAt.split('T');
      pDate.textContent = `${date.replace(/-/g, '.')} ${time.split('.')[0]}`;

      const elementAuthor = document.createElement("div");
      elementAuthor.classList.add("element-author");
      const iUser = document.createElement("i");
      iUser.classList.add("fa", "fa-user");
      iUser.ariaHidden = true;
      const pAuthor = document.createElement("p");
      pAuthor.textContent = c.by_nickname;
      
      elementTitle.appendChild(iCommenting);
      elementTitle.appendChild(pTitle);
      elementInfo.appendChild(elementTitle);
      elementDate.appendChild(iCalendar);
      elementDate.appendChild(pDate);
      elementInfo.appendChild(elementDate);
      elementAuthor.appendChild(iUser);
      elementAuthor.appendChild(pAuthor);
      elementInfo.appendChild(elementAuthor);
      a.appendChild(elementInfo);
      li.appendChild(a);
      ul.appendChild(li);
    });
  } catch (e) {
    console.error("최신 댓글 리스트 로드 중 오류:", e);
  }
}