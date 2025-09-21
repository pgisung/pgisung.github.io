---
layout: post
title: 8. 브랜치(Branch)란 무엇일까?
date: 2023-09-27 19:33:29 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, 깃, 깃허브, git branch, git rev-parse, git checkout, git switch ]
description: Git의 branch가 무엇인지 알아보자. 그리고 branch를 관리하는 명령어들이 무엇이 있는지 알아보고 branch 간 이동하며 작업을 해보자.
---

> 1. [Branch를 알아보자](#branch를-알아보자 "Navigate to Let's learn what is the branch")
- [Branch의 필요성](#branch의-필요성 "Navigate to Necessity of branch")
- [Branch의 종류](#branch의-종류 "Navigate to Kind of branch")
2. [Branch 관리하기](#branch-관리하기 "Navigate to Managing branch")
- [Branch 생성하기](#branch-생성하기 "Navigate to Creating branch")
- [Branch 명명 규칙](#branch-명명-규칙 "Navigate to Branch naming rule")
- [Upstream 연결](#upstream-연결 "Navigate to Connecting upstream")
- [Branch 삭제하기](#branch-삭제하기 "Navigate to Deleting branch")
3. [Branch 정보 확인하기](#branch-정보-확인하기 "Navigate to Checking branch list")
- [브랜치 해시](#브랜치-해시 "Navigate to Branch hash")
- [로컬 브랜치 목록보기](#로컬-브랜치-목록보기 "Navigate to Checking list of local branch")
- [로컬 저장소의 추적 브랜치 목록보기](#로컬-저장소의-추적-브랜치-목록보기 "Navigate to Checking list of tracking branch")
- [원격 브랜치 목록보기](#원격-브랜치-목록보기 "Navigate to Checking list of remote branch")
- [모든 브랜치 목록보기](#모든-브랜치-목록보기 "Navigate to Checking list of all branch")
- [브랜치 병합 여부 확인하기](#브랜치-병합-여부-확인하기 "Navigate to Checking branches if merged")
4. [Branch 간 이동하기](#branch-간-이동하기 "Navigate to Switching between branch")
- [파일 체크아웃](#파일-체크아웃 "Navigate to Checkout to file")
- [이전 브랜치](#이전-브랜치 "Navigate to Last branch")
- [HEAD 포인터](#head-포인터 "Navigate to HEAD pointer")
- [브랜치 새로 생성하면서 이동하기](#브랜치-새로-생성하면서-이동하기 "Navigate to Creating branch and Switching to the branch")
- [커밋으로 이동하기](#커밋으로-이동하기 "Navigate to Switching to commit")

---

## 들어가기 전에
Branch는 Git에서 commit만큼이나 중요한 핵심 요소이다. commit이 Git의 내용물이라고 하면 branch는 일종의 포장과 같다고 볼 수 있는데 이 두 요소의 개념만 확실히 잡아둬도 Git의 원리를 좀 더 쉽게 이해할 수 있다. 다음은 Git의 branch를 이해할 때 도움이 되는 Tutorial 사이트이다. [https://learngitbranching.js.org/?locale=ko](https://learngitbranching.js.org/?locale=ko "Navigate to The site helpful to learn about Git branch")

<center><img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/commits-and-branches.webp" title="Example image for several commits and branches" alt="Example image for several commits and branches" width="70%"></center>

<br>

<span style="color: #8D4801">**Git 공부를 할 때 헷갈리는 것 중의 하나가 동일한 기능을 하는 여러 개의 다른 명령어**</span>라고 생각하는데 이번 포스트에서의 <span style="color: #8D4801">**checkout**</span>과 <span style="color: #8D4801">**switch**</span>가 그러하다. 과거엔 switch라는 명령어가 존재하지 않았고 checkout 명령어가 너무 여러 가지의 기능들을 모두 수행하고 있었는데, 그로 인해 Git에 새로 입문하는 사람들에게 어려움을 주었었다. "이 명령어는 이것도 하고 저것도 하는데 그래서 이건 대체 무슨 명령어인가?" 하는 모호성도 존재했고... 그래서 그런지 최근엔 restore, switch 등 명령어들이 하나하나의 세분된 명령어들로써 등장했고 그러다 보니 동일한 기능을 하는 명령어들이 많아진 것이다. (새로운 명령어를 추가했다 하더라도 과거의 명령어인 checkout을 여전히 사용 중인 사람들이 많기 때문에 당장 명령어의 기능을 수정하거나 삭제할 순 없다.) <span style="color: #8D4801">**개인적인 생각으론 어느 한쪽을 골라야만 한다면 필자는 가장 최근에 추가된 명령어를 사용**</span>한다. 왜냐하면 동일한 기능을 함에도 새로 명령어를 추가했다는 것은 <span style="color: #8D4801">**Git의 개발자들에게도 분명한 이유와 의도가 있기 때문**</span>이다.

---

## Branch를 알아보자
Branch 단어는 나뭇가지, 지사, 분점, 둘 이상으로 나뉘다의 뜻이 있다. 단어의 뜻과 같이 <span style="color: #8D4801">**Git의 branch 또한 저장공간을 나누는 데 실제 저장공간이 나누어지는 것은 아니며 가상의 저장공간이 생성**</span>되는 느낌이다.

<center><img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/branch-in-naver-dictionary.jpg" title="Definition of branch in Naver dictionary" alt="Definition of branch in Naver dictionary"></center>

<center>
  <a href="https://dict.naver.com/dict.search?query=branch&from=tsearch" title="Navigate to Naver dictionary">
    <small><i class="fa fa-copyright" aria-hidden="true"></i>네이버 사전</small>
  </a>
</center>
<br>

### Branch의 필요성
<center><img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/difference-while-working-in-file-system-between-no-version-management-and-Git.webp" title="Difference while working in file system between no version management and Git" alt="Difference while working in file system between no version management and Git"></center>

- 우리는 사실 이미 문서를 작성할 때 브랜치를 나눠서 진행하는 작업을 알게 모르게 해왔다. 수정해야 할 작업이 생겼을 때 원래의 프로젝트를 아무 조치 없이 그냥 수정했다간 실수를 복구하기가 너무 어렵기 때문에 원래의 프로젝트를 복사하여 백업해 두고 새로운 사본에 작업을 진행했었다. 하지만 이런 방식은 매번 수정할 때마다 사본이 통째로 생성되어 저장공간이 많이 낭비될 뿐만 아니라 향후 각각의 작업을 병합하는 것 또한 어려워진다. <span style="color: #8D4801">**Git의 branch는 실질적인 working directory가 단 한 곳이며 공통 조상 커밋을 기준으로 변화된 커밋만 따로 저장하면 되므로 훨씬 더 효율적**</span>이다.

<br>

### Branch의 종류
<center><img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/image-that-showing-kind-of-branch.webp" title="Image that showing kind of branch" alt="Image that showing kind of branch" width="70%"></center>

- **Default branch**
  - 당연하게도 Git에서 작업을 하려면 최소한 한 개 이상의 브랜치가 필요하다. 그러므로 <span style="color: #8D4801">**Git은 저장소가 초기화될 때 무조건 Default branch를 한 개 생성**</span>한다.
- <span style="color: dodgerblue">**Local branch**</span>
  - 말 그대로 <span style="color: #8D4801">**로컬 환경**</span>에서 작업할 때의 브랜치이다.
- <span style="color: red">**Remote branch**</span>
  - <span style="color: #8D4801">**원격 저장소에 존재하는 브랜치**</span>를 Remote branch라고 한다. 내가 추적 브랜치를 통해 업로드한 원격 브랜치도 있지만 <span style="color: #8D4801">**타 개발자 및 사용자가 해당 원격 저장소 안에 생성한 브랜치 또한 모두 포함하여 원격 브랜치**</span>라고 한다.
  - 원격 브랜치의 이름은 일반적으로 <span style="color: #8D4801">**<원격 저장소 이름/로컬 브랜치 이름>**</span>의 형태를 보인다.
  - 원격 저장소와 연결된 로컬 저장소에서 새로운 브랜치를 생성하더라도 자동으로 원격 브랜치가 생성되지는 않는다. 또한, 원격 저장소에 새로운 브랜치가 등록되더라도 자동으로 로컬 브랜치가 생성되는 것은 아니다. 그러므로 <span style="color: #8D4801">**별도의 명령어를 실행하여 저장소를 동기화**</span>해야 한다.
- <span style="color: darkorange">**Tracking branch**</span>
  - <span style="color: #8D4801">**로컬 브랜치와 원격 브랜치를 중재하는 다리**</span> 역할을 하는 브랜치이다. 로컬 브랜치와 원격 브랜치와는 다르게 브랜치 간의 "관계"를 표현하는 브랜치라고 말할 수 있다.
  - "git clone" 명령어로 원격 저장소를 복제할 때 저장소에 등록된 tracking branch들을 자동으로 함께 설정한다. (모든 브랜치 정보를 다 가져오진 않고 필요한 브랜치의 정보만 가져온다.)
  - <span style="color: limegreen">**Upstream tracking**</span>
    - <span style="color: #8D4801">**Git에서 Upstream은 위(서버)로 흐르는 브랜치의 추적을 표현한 말**</span>이다. 로컬 저장소의 브랜치와 원격 저장소의 브랜치는 업로드할 수 있도록 연결되어 있다. 이러한 연결을 Upstream tracking이라고 한다.

---

## Branch 관리하기
### Branch 생성하기
```bash
git branch <브랜치 이름> (커밋 해시값)
```
- 새 브랜치를 생성하면 처음에는 <span style="color: #8D4801">**브랜치 포인터**</span>만 있는 브랜치가 생성된다.
- 브랜치를 생성할 때 일반적으로 마지막 commit을 가리키고 있는 HEAD를 기준으로 생성된다. 그러나 <span style="color: #8D4801">**직접 커밋 해시값을 입력할 경우 해당 commit을 기준으로 브랜치가 생성**</span>된다. 

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/before-git-command-branch-name.webp" title="Branch list before git command branch <new branch name>" alt="Branch list before git command branch <new branch name>">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-branch-name.webp" title="Git command to create new branch" alt="Git command to create new branch">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/after-git-command-branch-name.webp" title="Branch list after git command branch <new branch name>" alt="Branch list after git command branch <new branch name>">

<br>

### Branch 명명 규칙
- 브랜치 이름은 알파벳과 숫자, 밑줄(_), 하이픈(-)으로 시작할 수 있다.
- 브랜치 이름에는 빈칸이나 공백 문자, 대부분의 특수문자를 사용할 수 없다.
- 아스키 제어 문자는 포함할 수 없고 유니코드 문자는 포함할 수 있다.
- Git은 브랜치 이름의 대소문자를 구별하여 다른 문자로 취급한다.
- 일부 Git 호스팅 서비스 및 운영 체제에는 브랜치 이름의 길이 제한이 있을 수 있다. 일반적으로 최대 255자 이내로 작성하는 것이 좋다.
- 브랜치 이름은 중복해서 사용하지 않아야 한다.

<br>

### Upstream 연결
```bash
git branch -u <원격 저장소 이름/브랜치 이름>
```
```bash
git branch --set-upstream-to <원격 저장소 이름/브랜치 이름>
```
- 기존에 <span style="color: #8D4801">**로컬에 존재하는 브랜치를 해당 원격 브랜치로 업스트림 연결**</span>할 수 있다.
-  <span style="color: #8D4801">**연결하고자 하는 로컬 브랜치로 이동 후**</span> 명령어를 실행하여야 한다.
- 해당 원격 브랜치가 <span style="color: #8D4801">**원격 저장소에 존재하지 않을 경우**</span> 명령어를 실행할 수 없다. 원격 저장소에 해당 원격 브랜치가 존재함에도 명령어 실행이 안 될 경우 "git fetch 원격 저장소 이름" 명령어를 통해서 원격 저장소 정보를 가져와야 한다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/before-git-command-branch-u.webp" title="Branch list before git command branch -u" alt="Branch list before git command branch -u">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-branch-u.webp" title="Git command to make upstream tracking for exist local and remote branches" alt="Git command to make upstream tracking for exist local and remote branches">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/after-git-command-branch-u.webp" title="Branch list after git command branch -u" alt="Branch list after git command branch -u">

<br>

```bash
git checkout -t <원격 저장소 이름/브랜치 이름>
```
```bash
git checkout --track <원격 저장소 이름/브랜치 이름>
```
- <span style="color: #8D4801">**해당 브랜치 이름의 로컬 브랜치를 생성하며 이동하고 해당 원격 브랜치로 업스트림 연결**</span>까지 한다.
- <span style="color: #8D4801">**해당 브랜치 이름의 로컬 브랜치가 존재하지 않을 경우**</span>에만 실행할 수 있다.
- 해당 원격 브랜치가 <span style="color: #8D4801">**원격 저장소에 존재하지 않을 경우**</span> 명령어를 실행할 수 없다. 원격 저장소에 해당 원격 브랜치가 존재함에도 명령어 실행이 안 될 경우 "git fetch 원격 저장소 이름" 명령어를 통해서 원격 저장소 정보를 가져와야 한다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/before-git-command-checkout-t.webp" title="Branch list before git command checkout -t" alt="Branch list before git command checkout -t">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-checkout-t.webp" title="Git command to make new local branch and upstream tracking moreover checkout to the new local branch" alt="Git command to make new local branch and upstream tracking moreover checkout to the new local branch">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/after-git-command-checkout-t.webp" title="Branch list after git command checkout -t" alt="Branch list after git command checkout -t">

<br>

### Branch 삭제하기
```bash
git branch -d <브랜치 이름>
```
```bash
git branch --delete <브랜치 이름>
```
- 브랜치의 <span style="color: #8D4801">**일반적인 삭제 방법**</span>이다. Working directory에 작업한 기록이 없고 Stage area가 깨끗하게 비어 있을 때만 명령어가 실행된다. 또한 병합되지 않은 commit이 존재할 경우 브랜치를 삭제할 수 없다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/before-git-command-branch-d.webp" title="Branch list before git command branch -d" alt="Branch list before git command branch -d">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-branch-d.webp" title="Git command to delete the branch" alt="Git command to delete the branch">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/after-git-command-branch-d.webp" title="Branch list after git command branch -d" alt="Branch list after git command branch -d">

<br>

```bash
git branch -D <브랜치 이름>
```
- 병합되지 않은 commit이 존재하는 브랜치를 <span style="color: #8D4801">**강제로 삭제**</span>할 수 있다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/before-git-command-branch-capital-letter-d.webp" title="Branch list before git command branch -D" alt="Branch list before git command branch -D">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-branch-capital-letter-d.webp" title="Git command to force to delete the branch" alt="Git command to force to delete the branch">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/after-git-command-branch-capital-letter-d.webp" title="Branch list after git command branch -D" alt="Branch list after git command branch -D">

---

## Branch 정보 확인하기
### 브랜치 해시
```bash
git rev-parse <브랜치 이름>
```
- 해당 <span style="color: #8D4801">**브랜치 포인터가 가리키는 커밋 해시값을 확인**</span>할 수 있다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-rev-parse.webp" title="Git command to show commit hash value for the branch pointer" alt="Git command to show commit hash value for the branch pointer">

<br>

### 로컬 브랜치 목록보기
```bash
git branch
```
- 모든 <span style="color: #8D4801">**로컬 브랜치를 목록**</span>으로 볼 수 있다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-branch.webp" title="Git command to show list of local branch" alt="Git command to show list of local branch">

<br>

### 로컬 저장소의 추적 브랜치 목록보기
```bash
git branch -vv
```
- <span style="color: #8D4801">**로컬 저장소의 모든 추적 브랜치를 목록**</span>으로 볼 수 있다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-branch-vv.webp" title="Git command to show list of tracking branch in local repository" alt="Git command to show list of tracking branch in local repository">

<br>

### 원격 브랜치 목록보기
```bash
git branch -r
```
```bash
git branch --remotes
```
- 모든 <span style="color: #8D4801">**원격 브랜치를 목록**</span>으로 볼 수 있다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-branch-r.webp" title="Git command to show list of remote branch" alt="Git command to show list of remote branch">

<br>

### 모든 브랜치 목록보기
```bash
git branch -a
```
```bash
git branch --all
```
- <span style="color: #8D4801">**모든 브랜치를 목록**</span>으로 볼 수 있다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-branch-a.webp" title="Git command to show list of all branch" alt="Git command to show list of all branch">

<br>

### 브랜치 병합 여부 확인하기
```bash
git branch --merged
```
- <span style="color: #8D4801">**병합한 브랜치**</span>를 목록으로 볼 수 있다. 병합한 브랜치는 <span style="color: #8D4801">**애스터리스크(*) 기호**</span>로 표시된다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-branch-merged.webp" title="Git command to show list of merged local branch" alt="Git command to show list of merged local branch">

<br>

```bash
git branch --no-merged
```
- <span style="color: #8D4801">**병합하지 않은 브랜치**</span>를 목록으로 볼 수 있다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-branch-no-merged.webp" title="Git command to show list of unmerged local branch" alt="Git command to show list of unmerged local branch">

---

## Branch 간 이동하기
```bash
git switch <브랜치 이름>
```
```bash
git checkout <브랜치 이름>
```
- 현재 브랜치를 떠나 해당 브랜치로 이동하는 명령어이다. 브랜치를 이동한다는 의미는 <span style="color: #8D4801">**HEAD 포인터가 해당 브랜치를 가리키는 것**</span>이다.
- Working directory에 작업한 기록이 없고 Stage area가 깨끗하게 비어 있을 때만 이동할 수 있다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-switch.webp" title="Git command to switch to the branch" alt="Git command to switch to the branch">

<br>

### 파일 체크아웃
```bash
git checkout -- <파일 이름>
```
- 브랜치뿐만 아니라 <span style="color: #8D4801">**파일로도 checkout**</span> 할 수 있다.
- Working directory에 작업한 기록이 존재하고 Stage area에 commit 되지 않은 기록이 존재할 경우, 마치 마지막 commit 기준으로 <span style="color: #8D4801">**파일을 복원하는 것과 같이 동작**</span>한다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-checkout-file.webp" title="Git command to checkout to the file" alt="Git command to checkout to the file">

<br>

### 이전 브랜치
```bash
git switch -
```
```bash
git checkout -
```
- 리눅스에서 대시(-) 기호는 이전 디렉토리를 의미한다. 이 명령어는 <span style="color: #8D4801">**이전 브랜치로의 이동**</span>을 뜻한다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-switch--.webp" title="Git command to switch to last branch" alt="Git command to switch to last branch">

<br>

### HEAD 포인터
```bash
git switch --detach HEAD^^^
git switch --detach HEAD~~~
git switch --detach HEAD~3
```
```bash
git checkout HEAD^^^
git checkout HEAD~~~
git checkout HEAD~3
```
- HEAD 포인터를 기준으로 상대적 위치 이동 명령어이다. <span style="color: #8D4801">**캐럿(^) 또는 물결(~) 기호**</span>를 사용하여 commit의 상대적 위치를 지정할 수 있다. <span style="color: #8D4801">**기호의 숫자만큼 이전 commit으로 이동**</span>한다. <span style="color: #8D4801">**물결(~) 기호를 이용할 경우 기호 1개와 원하는 이동량만큼의 숫자 입력만으로**</span> 이동할 수 있다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-switch-detach-head.webp" title="Git command to switch back for number of steps from HEAD pointer" alt="Git command to switch back for number of steps from HEAD pointer">

- <span style="color: #8D4801">**BEHIND**</span>
  - <span style="color: #8D4801">로컬 저장소로 내려받지 않은 commit이 존재하는 상태</span>이다.
  - 보통 다른 개발자가 코드를 수정하고 먼저 commit 하여 원격 저장소의 commit이 자신의 로컬 저장소보다 더 최신 상태인 것을 뜻한다.

- <span style="color: #8D4801">**AHEAD**</span>
  - <span style="color: #8D4801">서버로 전송되지 않은 로컬 commit이 존재하는 상태</span>이다.
  - 보통 업로드되어 있는 서버의 commit 개수보다 로컬 저장소의 HEAD 포인터를 기준으로 로컬 브랜치에 존재하는 commit의 개수가 많은 상태를 뜻한다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/branches-in-remote-repository-in-github.webp" title="Branches in remote repository in Github" alt="Branches in remote repository in Github">

<br>

### 브랜치 새로 생성하면서 이동하기
```bash
git switch -c <브랜치 이름>
```
```bash
git switch --create <브랜치 이름>
```
```bash
git checkout -b <브랜치 이름>
```
- <브랜치 이름\> 뒤에 <span style="color: #8D4801">**<원격 저장소 이름/브랜치 이름>**</span> 를 추가할 경우 <span style="color: #8D4801">**업스트림 설정까지 동시에 진행**</span>할 수 있다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/before-git-command-switch-c.webp" title="Branch list before git switch -c" alt="Branch list before git switch -c">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-switch-c.webp" title="Git command to create new branch and to switch to the branch" alt="Git command to create new branch and to switch to the branch">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/after-git-command-switch-c.webp" title="Branch list after git switch -c" alt="Branch list after git switch -c">

<br>

### 커밋으로 이동하기
```bash
git switch --detach <커밋 해시값>
```
```bash
git checkout <커밋 해시값>
```
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-27-What-is-the-branch-on-Git/git-command-switch-detach-commit-hash-value.webp" title="Git command to switch to the commit" alt="Git command to switch to the commit">

---

## 마무리하며...
이번 포스트에서는 Git의 핵심 요소 중 하나인 브랜치에 관하여 알아보았다. 이제 Git의 커다란 청사진은 그려졌고 앞으로는 이 commit과 branch를 응용한 여러 가지 작업을 알아볼 시간만 남았다. 다음 포스트에서는 Working directory에 작업 중이던 내용을 임시 저장할 수 있는 스태시 기능을 알아보자.