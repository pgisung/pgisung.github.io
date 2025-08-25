---
layout: post
title: 1. Git이란 무엇일까?
date: 2023-08-19 12:13:12 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, 깃, 깃허브, Software Version Management, 버전관리 ]
description: Git에 입문하기 전에 기본적인 Git의 어원과 정의 그리고 버전관리에 대하여 알아보자.
---

> 1. [Git의 어원은 무엇일까?](#git의-어원은-무엇일까 "Navigate to Original meaning of Git")
2. [버전관리란 무엇일까?](#버전관리란-무엇일까 "Navigate to Version management")
3. [중앙집중형 버전관리와 분산형 버전관리의 차이점](#중앙집중형-버전관리와-분산형-버전관리의-차이점 "Navigate to The difference between Centralized and Distributed version management")

---

#### <span style="color: brown">**Git의 어원은 무엇일까?**</span>
글을 시작하기에 앞서 가장 먼저 궁금했던 질문이었다. SVN이 SubVersioN의 약자이듯이 버전관리와 관련된 영어의 약자라고만 막연히 생각했다 그러나, Linux와 Git의 창시자인 <span style="color: #8D4801">**Linus Torvalds가 말하길 Linux의 이름을 내 이름과 똑같다는 이유로 정했듯이 Git의 명칭 또한 "모든 프로젝트에 자신의 이름을 명명하는 이기주의자"라는 의미로 사용했다고 한다.**</span> 여기서 Git은 본래 영국에서 사용되는 속어로 "고집이 센 사람", "이기적인 사람" 등의 부정적인 의미를 가진 단어이다.

<div class="image-slider-static">
  <img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-08-19-An-introduction-to-the-principles-of-Git/statistics-what-is-the-hardest-thing-for-developer.jpg" title="The statistics what is the hardest thing for developer" alt="The statistics what is the hardest thing for developer">
</div>
<br>
세계적인 개발자도 이름 짓기의 어려움에선 예외가 없었나 보다...

---

#### <span style="color: brown">**버전관리란 무엇일까?**</span>
그럼, 개인적인 궁금증은 해결되었고 그래서 Git은 무엇일까? <span style="color: #8D4801">**Git은 대표적인 분산형 버전관리 시스템이다.**</span> 그렇다면 버전관리란 대체 무엇일까? 사실 데스크톱이든 태블릿이든 가정마다 컴퓨터 하나씩은 대부분 갖고 있는 지금 세대의 우리는 이미 버전관리를 경험해 봤을 가능성이 높다. 

<div class="image-slider-static">
  <img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-08-19-An-introduction-to-the-principles-of-Git/version-management-example.jpg" title="Version management example" alt="Version management example">
</div>
<br>
가령 대학 시절 팀 발표 과제를 받았을 때 누군가가 발표 자료를 수정할 때마다 수정 이전의 발표 자료와 구분하기 위해 파일명을 다르게 저장했던 행위도 버전관리의 일종이다. 하지만 위의 사진과 같이 파일이름을 정하는 사람도 저장되는 시각도 모두 제각각이다 보니 어떤 파일이 진짜 최종적으로 모든 History를 포함하고 있는 파일인지 구분하기가 무척 어렵다. 이때 사용하는 것이 바로 버전관리 시스템이다. 파일 버전을 좀 더 편리하고 정확하게 관리할 수 있게 도와주는 소프트웨어를 뜻한다. 그럼, 분산형 버전관리는 무엇을 뜻할까? 그리고 다른 버전관리와 어떤 차이점이 있을까? 

---

#### <span style="color: brown">**중앙집중형 버전관리와 분산형 버전관리의 차이점**</span>
대표적인 분산형 버전관리 시스템이 Git이라면 그 반대에는 SVN이라는 중앙집중형 버전관리 시스템이 있다. 다음의 테이블을 참고하여 그 특징과 차이점에 대해서 알아보자.

| SVN | Git |
|:---:|:---:|
| 하나의 Repository에 여러 프로젝트를 구성 | 보통 하나의 Repository에 하나의 프로젝트 구성 |
| 중앙집중형 (Centralized) | 분산형 (Distributed) |
| 각각의 개발자가 자신만의 Version history를 가질 수 없음 | 각각의 개발자가 자신만의 Version history를 가지고 있을 뿐만 아니라 개발자와 서버의 저장소는 독립적으로 관리할 수 있음 |
| commit의 의미가 실제 기능 구현의 완료 및 공개를 의미 (commit을 하는 순간 협업하는 다른 모든 개발자에게 영향을 주기 때문에) | commit이 단순히 개발 이력이 이전 버전과 다르게 수정되었음을 의미 (push를 통해 서버에 적용하기 전까진 공개되지도 않고 다른 개발자들에게 영향을 주지도 않음)|
| 디렉토리 / 파일별 권한 부여 가능 | 개별 권한 부여 불가 |
| Revision을 이용한 버전관리 (클라이언트가 Repository에 새로운 수정을 commit 할 때마다 Revision 번호를 증가시켜 관리) | Object Hash를 이용한 버전관리 (SHA1이라는 해시알고리즘을 이용하여 각각의 커밋에 중복되지 않는 고유의 커밋 아이디를 부여하여 관리) |
| 사용이 쉬운 편 (비교적 적은 종류의 명령, 자유도가 낮음) | 사용법에 대한 Learning curve가 존재 (진입장벽이 존재) |

---

#### 마무리하며...
간단하게 Git에 대한 정의를 알아보았다. 근래에 개발자로서 업무를 진행하기 위해서는 Git을 빼놓고 얘기할 수 없다고 해도 과언이 아니다. 그런 의미에서 단순히 명령어만 암기할 게 아니라 Git이 개발자에게 왜 중요한지 생겨난 배경과 과정을 꼭 한번 짚고 넘어갈 필요성이 있다고 생각한다. 다음 포스트에서는 본격적으로 함께 Git을 시작해 보자!