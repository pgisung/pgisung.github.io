---
layout: post
title: 10. 병합과 리베이스
date: 2023-10-14 11:49:32 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, 깃, 깃허브, git merge, git rebase, git ls-files ]
description: 버전 관리의 꽃이라 해도 과언이 아닐 파트이다. 서로 다른 브랜치의 이력을 합쳐도 보고 한쪽 브랜치로 이동도 시켜보고 도중에 충돌이 발생했을 때 조치하는 방법까지 알아보자.
---

> 1. [Base commit](#base-commit "Navigate to Base commit")
2. [병합이란?](#병합이란 "Navigate to What is merge?")
- [Fast-forward 병합](#fast-forward-병합 "Navigate to Fast-forward merge")
- [3-way 병합](#3-way-병합 "Navigate to Three-way merge")
- [병합 명령어](#병합-명령어 "Navigate to Command to merge")
- [병합 commit 메시지 자동 작성 옵션](#병합-commit-메시지-자동-작성-옵션 "Navigate to Option to edit automatically merge message")
- [병합 중지 옵션](#병합-중지-옵션 "Navigate to Option to abort merge")
- [병합 진행 옵션](#병합-진행-옵션 "Navigate to Option to continue merge")
3. [리베이스란?](#리베이스란 "Navigate to What is rebase?")
- [리베이스 명령어](#리베이스-명령어 "Navigate to Command to rebase")
- [범위 지정 리베이스](#범위-지정-리베이스 "Navigate to Command to rebase with setting scope")
- [리베이스 진행 옵션](#리베이스-진행-옵션 "Navigate to Option to continue rebase")
- [리베이스 건너뛰기 옵션](#리베이스-건너뛰기-옵션 "Navigate to Option to skip rebase")
- [리베이스 중지 옵션](#리베이스-중지-옵션 "Navigate to Option to abort rebase")
- [대화형 리베이스](#대화형-리베이스 "Navigate to Interactive rebase")
4. [병합과 리베이스의 차이점](#병합과-리베이스의-차이점 "Navigate to Difference between merge and rebase")
- [헷갈리기 쉬운 명령어의 방향](#-헷갈리기-쉬운-명령어의-방향 "Navigate to Direction of command that easily confused")
5. [충돌과 해결 방법](#충돌과-해결-방법 "Navigate to Conflict and solution for")
- [충돌이란?](#충돌이란 "Navigate to What is conflict?")
- [해결 방법](#해결-방법 "Navigate to Solution for conflict")

---

#### <span style="color: brown">**Base commit**</span>
<center><img src="{{site.baseurl}}/images/posts/2023-10-14-Merge-and-rebase/reference-of-base-commit.webp" title="Reference of base commit" alt="Reference of base commit"></center>
- Base 커밋이란 한국어로 공통 조상 커밋이라고 표현할 수 있으며 <span style="color: #8D4801">**두 개 이상의 브랜치나 커밋이 공유하는 최신 공통 커밋**</span>을 의미한다. 주로 병합 및 리베이스의 기준 역할을 한다.

---

#### <span style="color: brown">**병합이란?**</span>
<span style="color: #8D4801">**Base 커밋을 기준으로 현재 작업 중인 브랜치에 지정된 브랜치의 커밋을 모두 통합하는**</span> 것이다. 또한 병합에는 <span style="color: #8D4801">**두 가지 방식**</span>이 존재한다.

##### **Fast-forward 병합**
<center><img src="{{site.baseurl}}/images/posts/2023-10-14-Merge-and-rebase/reference-of-fast-forward-merge.webp" title="Reference of Fast-forward merge" alt="Reference of Fast-forward merge"></center>
- 위의 그림과 같이 <span style="color: #8D4801">**현재 작업 중인 브랜치의 최신 커밋이 병합을 지정한 브랜치의 시작 커밋과 연결**</span>되어있을 경우 브랜치가 분기되어 있지만 마치 <span style="color: #8D4801">**순차적**</span>으로 생성된 커밋의 흐름처럼 보인다. 이런 경우엔 <span style="color: #8D4801">**새로운 병합 커밋을 생성하지 않고 현재 작업 중인 브랜치의 HEAD를 병합을 지정한 브랜치의 최신 커밋으로 이동**</span>만 시키는데 이러한 병합 방식을 <span style="color: #8D4801">**Fast-forward 병합**</span>이라고 한다.
- 일반적으로 <span style="color: #8D4801">**혼자**</span> 프로젝트를 진행할 경우 접하게 되는 병합 방식이다.

<br>

##### **3-way 병합**
<center><img src="{{site.baseurl}}/images/posts/2023-10-14-Merge-and-rebase/reference-of-three-way-merge.webp" title="Reference of Three-way merge" alt="Reference of Three-way merge"></center>
- 위의 그림과 같이 base 커밋을 기준으로 <span style="color: #8D4801">**세 종류의 서로 다른 커밋들**</span>을 현재 작업 중인 브랜치에 <span style="color: #8D4801">**새로운 하나의 커밋으로 병합**</span>하는 방식을 <span style="color: #8D4801">**3-way 병합**</span>이라고 한다.
- <span style="color: #8D4801">**다수의 개발자와 협업**</span>하여 프로젝트를 진행할 경우 접하게 되는 병합 방식이다.
- 새로운 병합 커밋은 <span style="color: #8D4801">**두 개의 부모 커밋**</span>을 가지며, 커밋을 생성할 때 언제나 그랬듯이 병합 커밋을 생성할 때도 <span style="color: #8D4801">**커밋 메시지를 작성**</span>해야한다.

<br>

##### **병합 명령어**
```bash
git merge <파생 브랜치 이름>
```
- merge 명령어는 <span style="color: #8D4801">**현재 작업 중인 원본 브랜치**</span>를 기준으로 <span style="color: #8D4801">**지정된 파생 브랜치**</span>의 커밋을 병합하여 가져오는 것이다. 그러므로 명령어 사용 시 <span style="color: #8D4801">**대상이 되는 원본 브랜치로 switch 명령어로 이동 후 merge 명령어에 파생 브랜치 이름을 입력하여 실행**</span>한다.

<br>

##### **병합 commit 메시지 자동 작성 옵션**
```bash
git merge -e <파생 브랜치 이름>
```
```bash
git merge --edit <파생 브랜치 이름>
```
- 병합 커밋 생성 시 에디터를 통해 커밋 메시지를 작성해야 하지만 <span style="color: #8D4801">**에디터가 실행되지 않고 커밋을 완료**</span>하는 옵션이다.

<br>

##### **병합 중지 옵션**
```bash
git merge --abort
```
- 현재 진행 중인 <span style="color: #8D4801">**병합을 중지**</span>하는 옵션으로 충돌 등이 발생했을 때 병합을 중지하고 싶을 경우 사용할 수 있다.

<br>

##### **병합 진행 옵션**
```bash
git merge --continue
```
- 현재 진행 중인 <span style="color: #8D4801">**병합을 계속 진행**</span>하는 옵션으로 충돌 등이 발생했을 때 문제 해결 후 병합을 계속 진행하고 싶을 경우 사용할 수 있다.

---

#### <span style="color: brown">**리베이스란?**</span>
말 그대로 <span style="color: #8D4801">**base 커밋을 다시 설정하는 것**</span>으로 <span style="color: #8D4801">**지정된 브랜치의 base 커밋을 최신 커밋으로 이동**</span>시키는데, 과거 base 커밋과 연결되어 있던 <span style="color: #8D4801">**현재 작업 중인 브랜치 또한 이동한 새로운 base 커밋으로 연결**</span>된다. 또한 현재 작업 중인 브랜치의 이동한 커밋들의 <span style="color: indianred">**해시값**</span>은 <span style="color: indianred">**모두 변경**</span>된다. Interactive 옵션을 사용 시 <span style="color: indianred">**커밋의 순서와 위치까지도 변경**</span>될 수 있으므로 <span style="color: indianred">**이는 저장소가 공개된 경우 다른 개발자들과의 협업 시 혼돈을 야기시킬 수 있기 때문에 사용에 유의**</span>해야한다.
<center><img src="{{site.baseurl}}/images/posts/2023-10-14-Merge-and-rebase/reference-of-rebase.webp" title="Reference of Rebase" alt="Reference of Rebase"></center>

<br>

##### **리베이스 명령어**
```bash
git rebase <목적 브랜치 이름>
```
- rebase 명령어는 <span style="color: #8D4801">**현재 작업 중인 브랜치**</span>를 기준으로 <span style="color: #8D4801">**지정된 목적 브랜치**</span>를 리베이스한다. 이것은 현재 작업 중인 브랜치의 커밋을 목적 브랜치의 최신 커밋 위에 다시 적용하는 것을 의미한다. 따라서 명령어 사용 시 <span style="color: #8D4801">**목적 브랜치에 적용하고자 하는 브랜치로 switch 명령어로 이동 후 rebase 명령어에 목적 브랜치 이름을 입력하여 실행**</span>한다.

<br>

##### **범위 지정 리베이스**
```bash
git rebase <목적 브랜치 이름> <리베이스 기준점>
```
- 리베이스 기준점에 입력되는 <span style="color: #8D4801">**특정 범위의 커밋에 목적 브랜치를 리베이스**</span>할 수 있다. 리베이스 기준점에 <span style="color: #8D4801">**브랜치 이름을 입력**</span>할 경우 <span style="color: #8D4801">**현재 작업 중인 브랜치와 관계없이 rebase 명령을 수행**</span>할 수 있다. 따라서 <span style="color: #8D4801">**브랜치를 이동할 필요 없이 rebase를 실행**</span>할 수 있다. <span style="color: #8D4801">**리베이스 기준점**</span>에는 아래의 <span style="color: #8D4801">**커밋 범위**</span>에 해당하는 요소들이 들어갈 수 있다.
- **커밋 범위**
  - **브랜치 이름**: 특정 브랜치의 최신 커밋을 참조할 수 있다.
  - **태그명**: 특정 태그가 가리키는 커밋을 지정할 수 있다.
  - **상대 참조**: 상대 참조를 사용하여 현재 위치에서 상대적인 커밋을 가리킬 수 있다. HEAD, HEAD~, HEAD^와 같은 상대 참조를 사용할 수 있다.
  - **SHA-1 해시값**: 각 커밋에 대해 고유한 해시값을 사용하여 특정 커밋을 지정할 수 있다.

<br>

```bash
git rebase --onto <목적 브랜치 이름> <리베이스 기준점> <커밋 범위>
```
- <span style="color: #8D4801">**다른 기준점에 특정 범위의 커밋**</span>에 <span style="color: #8D4801">**목적 브랜치를 리베이스할 경우**</span>에 사용하는 옵션으로 예를 들어 리베이스 기준점에 브랜치 이름을 입력하고 커밋 범위를 지정하여 현재 작업 중인 브랜치가 아닌 다른 브랜치의 특정 범위의 커밋에 목적 브랜치를 리베이스 하도록 명령할 수 있다. 즉, <span style="color: #8D4801">**좀 더 자세한 특정 커밋들을 리베이스 하기 위한 옵션**</span>이다.

<br>

##### **리베이스 진행 옵션**
```bash
git rebase --continue
```
- 현재 진행 중인 <span style="color: #8D4801">**리베이스를 계속 진행**</span>하는 옵션으로 충돌 등이 발생했을 때 문제 해결 후 리베이스를 계속 진행하고 싶을 경우 사용할 수 있다.

<br>

##### **리베이스 건너뛰기 옵션**
```bash
git rebase --skip
```
- 리베이스 중 충돌 등이 발생한 경우 병합과 다르게 <span style="color: #8D4801">**각 커밋별로 문제를 해결해야 한다.**</span> 문제 해결 중에 <span style="color: #8D4801">**특정 커밋의 충돌을 건너뛰고 리베이스를 진행**</span>하고 싶을 경우 사용하는 옵션이다.

<br>

##### **리베이스 중지 옵션**
```bash
git rebase --abort
```
- 현재 진행 중인 <span style="color: #8D4801">**리베이스를 중지**</span>하는 옵션으로 충돌 등이 발생했을 때 리베이스를 중지하고 싶을 경우 사용할 수 있다.

<br>

##### **대화형 리베이스**
```bash
git rebase -i <커밋 범위>
```
```bash
git rebase --interactive <커밋 범위>
```
- <span style="color: #8D4801">**사용자가 직접 커밋의 목록을 수정하여 리베이스를 실행**</span>하는 옵션이다. 실행 시 에디터가 열리고 사용자가 수동으로 명령어를 사용하여 커밋 분할, 합치기, 재배치 등이 가능하고 커밋 메시지 또한 수정할 수 있다.

---

#### <span style="color: brown">**병합과 리베이스의 차이점**</span>
<span style="color: #8D4801">**병합**</span>은 내부적으로 현재 작업 중인 브랜치와 지정된 브랜치의 각 커밋들을 순차적으로 비교(<span style="color: deeppink">**그림 1, 2번 과정**</span>)하여 최종적으로 병합 커밋을 생성한다.(<span style="color: deeppink">**그림 3번 과정**</span>) 즉, 충돌이 발생할 경우 모든 커밋의 비교가 완료된 후에 <span style="color: #8D4801">**한 번에 충돌을 해결하고 병합 커밋을 생성**</span>한다.
<center><img src="{{site.baseurl}}/images/posts/2023-10-14-Merge-and-rebase/example-flow-of-merge.webp" title="Flow of merge to compare with rebase" alt="Flow of merge to compare with rebase"></center>

<br>

<span style="color: #8D4801">**리베이스**</span>는 두 브랜치를 비교하지 않으며 현재 작업 중인 브랜치의 각 커밋을 순차적으로 목적 브랜치에 병합 시도한다.(<span style="color: deeppink">**그림 1, 2번 과정**</span>) 즉, 충돌이 발생할 경우 <span style="color: #8D4801">**각 커밋을 병합할 때마다 충돌을 해결**</span>하여 커밋을 생성하고 rebase를 continue하여 다음 커밋의 병합을 시작하는 식으로 <span style="color: #8D4801">**반복 실행**</span>한다. 리베이스를 통해 <span style="color: #8D4801">**이동한 커밋들의 해시값이 변하는 이유는 이와 같이 각 커밋을 따로 새로이 병합**</span>하기 때문이다.
<center><img src="{{site.baseurl}}/images/posts/2023-10-14-Merge-and-rebase/example-flow-of-rebase.webp" title="Flow of rebase to compare with merge" alt="Flow of rebase to compare with merge"></center>

<br>

**결과적으로** 3-way <span style="color: #8D4801">**병합**</span>은 병합에 대한 커밋을 따로 생성하지만 <span style="color: #8D4801">**리베이스**</span>는 병합에 대한 커밋을 따로 생성하지 않으며,

<span style="color: #8D4801">**병합**</span>의 경우 각 브랜치의 HEAD가 기본적으로 최신 커밋을 가리키고 있지만 <span style="color: #8D4801">**리베이스**</span>는 목적 브랜치의 HEAD가 최신 커밋이 아니라 변경된 base 커밋을 가리키고 있다.

###### <span style="color: indianred">**※ 헷갈리기 쉬운 명령어의 방향**</span>
<center><img src="{{site.baseurl}}/images/posts/2023-10-14-Merge-and-rebase/comparison-between-merge-and-rebase.webp" title="Comparing that direction of command between merge and rebase" alt="Comparing that direction of command between merge and rebase"></center>
- <span style="color: #8D4801">**main 브랜치**</span>로 <span style="color: #8D4801">**jisung 브랜치**</span>를 병합하는 상황을 가정해 보자.
- 병합의 경우엔 <span style="color: #8D4801">**main 브랜치로 이동해서 jisung 브랜치의 병합을 명령**</span>하고
```bash
git switch main
git merge jisung
```
- 리베이스의 경우엔 <span style="color: #8D4801">**jisung 브랜치로 이동해서 main 브랜치의 리베이스를 명령**</span>한다.
```bash
git switch jisung
git rebase main
```

---

#### <span style="color: brown">**충돌과 해결 방법**</span>
##### **충돌이란?**
<center><img src="{{site.baseurl}}/images/posts/2023-10-14-Merge-and-rebase/reference-of-conflict.webp" title="Reference of conflict" alt="Reference of conflict" width="70%"></center>
- <span style="color: green">**동일한 파일**</span>에서 <span style="color: green">**동일한 위치**</span>의 코드를 <span style="color: dodgerblue">**두 명 이상이 서로 다르게 수정**</span>했을 때 <span style="color: #8D4801">**병합을 시도할 경우 충돌이 발생**</span>한다.
- 충돌이 발생할 경우 <span style="color: #8D4801">**병합이 중지**</span>되고 수동으로 해결할 때까지 <span style="color: #8D4801">**커밋이 생성되지 않는다.**</span> 병합이 중지된 경우 "--continue" 옵션으로 병합을 지속하거나 "--abort" 옵션으로 병합을 중단할 수 있다.
- 리베이스의 경우엔 "--skip" 옵션을 통해 일부 커밋의 충돌을 무시하고 리베이스를 진행할 수 있다.

<br>

##### **해결 방법**
1. 먼저 충돌이 발생한 <span style="color: #8D4801">**파일들을 목록으로 확인**</span>한다.
```bash
git ls-files -u
```
```bash
git ls-files --unmerged
```
- 병합하지 않은 파일들을 출력하는 명령어로 <span style="color: #8D4801">**충돌이 해결되지 않은 파일들의 목록을 확인**</span>할 수 있다.
- **목록의 파일 실행 방법**
  - 목록의 파일 위에 커서를 올려두고 <span style="color: #8D4801">**"command 버튼 + 클릭"**</span>하여 해당 파일을 실행
  - 아래와 같은 <span style="color: #8D4801">**에디터 실행 명령어**</span>로 해당 파일을 실행
  - ```bash
  vim <파일 경로>
  ```
  - ```bash
  code <파일 경로>
  ```
  - ```bash
  xcode <파일 경로>
  ```

2. 목록에서 충돌이 발생한 파일을 실행하면 아래와 같은 <span style="color: #8D4801">**충돌 마커**</span>가 생성되어 있다. 에디터를 이용하여 <span style="color: #8D4801">**실제 파일의 코드**</span>를 수정해야 한다.
```bash
<<<<<<< HEAD
원본 브랜치의 HEAD가 가리키는 커밋의 내용
=======
파생 브랜치의 diff 내용
>>>>>>> 브랜치 이름 등의 참조 이름
```
- 충돌이 발생한 파일의 수정을 완료하기 위해선 생성되어 있는 <span style="color: #8D4801">**충돌 마커를 삭제**</span>해야한다. 당연하게도 <span style="color: #8D4801">**충돌한 파일의 내용은 개발자의 적절한 판단하에 수정**</span>하여야 한다.

3. 충돌한 모든 파일의 수정이 완료되면 <span style="color: #8D4801">**병합 커밋을 생성**</span>하여 <span style="color: #8D4801">**최종적으로 충돌을 해결**</span>할 수 있다. 먼저 <span style="color: #8D4801">**add 명령어를 사용**</span>하여 수정이 완료된 파일들을 <span style="color: #8D4801">**스테이지 상태**</span>로 만든다.
- <span style="color: #8D4801">**직접 commit 명령어를 사용**</span>하여 commit을 생성할 수 있다.
- <span style="color: #8D4801">**병합 또는 리베이스 명령어를 "--continue" 옵션과 함께 사용**</span>하여 진행할 경우 충돌 해결이 완료된 상태일 때 자동으로 commit을 생성한다.

---

#### 마무리하며...
이번 포스트에서는 병합과 리베이스 그리고 그 도중에 발생할 수 있는 충돌에 대하여 알아보았다. 작성을 시작할 때는 아는 한도 내에서 쉽게 풀어서 작성해 보자고 다짐했는데 막상 읽어보니 쉬운 게 맞나..? 의구심이 들어서 몇 번을 수정했던 것 같다. 다음 포스트에서는 작업 중 발생하는 실수를 되돌릴 수 있게 해주는 복구 명령어들을 알아보자.