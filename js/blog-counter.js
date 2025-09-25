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

// 유틸 함수: 카운터 증가
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

async function incrementCounterPosts(path, field, elementId) {
  const ref = doc(db, ...path);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { [field]: increment(1) });
  } else {
    // 문서가 없으면 새로 생성
    await setDoc(ref, { [field]: 1 });
  }
}

// 오늘 날짜 (YYYY-MM-DD)
const today = new Date().toISOString().slice(0, 10);
// localStorage 전체 방문자용 키 (도메인 기준)
const globalVisitKey = "visited_global";
// localStorage 포스트별 방문자용 키 (URL 기준)
const pageURL = window.location.pathname;
const pageId = encodeURIComponent(pageURL); // 인코딩필요

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
(async () => {
  // 방문자수
  try {
    if (!getWithExpire(globalVisitKey)) {
      // 총 방문자수
      await incrementCounter(["stats", "global"], "totalVisits", "total-visits");
      // 오늘 방문자수
      await incrementCounterDaily(["daily", today], "visits", "today-visits");

      // 만료시간: 현재 24시간
      setWithExpire(globalVisitKey, "true", 24);
    } else {
      // 이미 방문한 경우, 기존 DB 값만 가져와서 표시
      const totalSnap = await getDoc(doc(db, "stats", "global"));
      if (totalSnap.exists()) document.getElementById("total-visits").innerText = totalSnap.data().totalVisits;

      const todaySnap = await getDoc(doc(db, "daily", today));
      if (todaySnap.exists()) document.getElementById("today-visits").innerText = todaySnap.data().visits;
    }
  } catch (e) {
    console.error("방문자수 업데이트 오류:", e);
  }
})();

(async () => {
  // 포스트별 조회수
  try {
    if (!getWithExpire(pageId)) {
      // 포스트별 조회수 - 단일 포스트 페이지용
      await incrementCounterPosts(["posts", pageId], "views", "post-views");

      // 만료시간: 현재 24시간
      setWithExpire(pageId, "true", 24);
    } else {
      // 이미 방문한 경우, 기존 DB 값만 가져와서 표시
      const postSnap = await getDoc(doc(db, "posts", pageId));
      if (postSnap.exists()) document.getElementById("post-views").innerText = postSnap.data().views;
    }
  } catch (e) {
    console.error("단일 포스트 조회수 업데이트 오류:", e);
  }
})();

// 여러 포스트 조회수 업데이트
document.querySelectorAll('.post-views').forEach(async function(span) {
  const postURL = span.dataset.postId;
  const postId = encodeURIComponent(postURL);
  try {
    const postSnap = await getDoc(doc(db, "posts", postId));

    if (postSnap.exists()) {
      span.textContent = postSnap.data().views;
    }
  } catch (e) {
    console.error("여러 포스트 조회수 업데이트 오류:", e);
  }
});

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
cleanupOldDailyData(); // 페이지 로드 시 호출