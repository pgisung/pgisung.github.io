---
layout: post
title: 6. 커밋(Commit)이란 무엇일까?
date: 2023-09-13 12:29:51 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, 깃, 깃허브, git commit, git log, git show, git diff ]
description: 포도 없는 포도송이는 의미가 없듯이 Commit 없는 Git 또한 의미가 없다. Git의 핵심 요소인 Commit이란 무엇인지 알아보자.
---

> 1. [Commit이란 무엇일까?](#commit이란-무엇일까)
- [HEAD란 무엇일까?](#head란-무엇일까)
- [Snapshot 기반 접근 방식](#snapshot-기반-접근-방식)
2. [Commit 해보기](#commit-해보기)
- [Commit 메시지](#commit-메시지)
- [Commit 복귀 명령어](#만약-실습-도중-실수할-상황에-대비하여-몇-가지-복귀-명령어들을-미리-알아보자)
- [파일 추적과 커밋을 동시에 실행하는 옵션](#파일-추적과-커밋을-동시에-실행하는-옵션)
- [에디터를 사용하지 않는 간이 commit 메시지 작성 옵션](#에디터를-사용하지-않는-간이-commit-메시지-작성-옵션)
- [가장 짧게 작성할 수 있는 commit 옵션](#가장-짧게-작성할-수-있는-commit-옵션)
- [빈 메시지의 commit 옵션](#빈-메시지의-commit-옵션)
- [Commit 메시지 수정](#commit-메시지-수정)
- [Commit 메시지를 작성할 때 파일 간 또는 커밋 간 차이 참조 옵션](#commit-메시지를-작성할-때-파일-간-또는-커밋-간-차이-참조-옵션)
3. [Commit을 확인해 보자](#commit을-확인해-보자)
- [Commit ID](#commit-id)
- [Log에 출력할 commit의 개수를 설정하는 옵션](#log에-출력할-commit의-개수를-설정하는-옵션)
- [Log에 commit의 내용을 짧게 표시하는 옵션](#log에-commit의-내용을-짧게-표시하는-옵션)
- [간략한 commit 해시값과 메시지만 출력하는 옵션](#간략한-commit-해시값과-메시지만-출력하는-옵션-prettyshort-옵션보다-더-짧음)
- [Log에 각 commit의 diff를 포함하는 옵션](#log에-각-commit의-diff를-포함하는-옵션)
- [Log에 각 commit의 히스토리를 포함하는 옵션](#log에-각-commit의-히스토리를-포함하는-옵션)
- [Log에 브랜치의 흐름 그래프를 포함하는 옵션](#log에-브랜치의-흐름-그래프를-포함하는-옵션)
- [Log에 가장 짧은 commit 정보와 그래프를 출력하는 옵션](#log에-가장-짧은-commit-정보와-그래프를-출력하는-옵션)
- [특정 commit의 상세 정보 확인 명령어](#특정-commit의-상세-정보-확인-명령어)
- [파일 및 commit 사이의 차이점 비교 명령어](#파일-및-commit-사이의-차이점-비교-명령어)

---

## 들어가기 전에
필자는 Github를 포도 농장에 비유하곤 한다. 그러면 각 사용자의 로컬 저장소를 하나의 포도나무라고 보고 Branch는 포도송이, Commit은 포도알이라고 생각하면 무언가 딱 맞다는 느낌이 들었었다. 코드를 포도라고 생각하면 코딩이 좀 더 맛있게 느껴질지도...? 각설하고 본론으로 들어가보자...

<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/compare-github-to-grape.webp" alt="Github를 하나의 포도 농장에 비유">

---

## Commit이란 무엇일까?
들어 본 적은 있는 단어였으나 어떤 의미로 Git에서 사용되는지는 몰랐었다. 그래서 사전을 한번 찾아보았는데 가장 가까운 의미는 "~을 적어 두다"로 보인다. 즉, Git에서 commit이란 당시 <span style="color: #8D4801">**Stage 영역의 파일 내용들을 적어 두는 행위**</span>를 뜻한다.
<div class="image-slider-static">
  <img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/commit-in-naver-dictionary.jpg" alt="네이버 사전에서 커밋의 정의">
</div>

<center>
  <a href="https://en.dict.naver.com/#/entry/enko/4dd1c73ab1734e23861c8dacd2b2bc72" title="네이버 사전으로 이동">
    <small><i class="fa fa-copyright" aria-hidden="true"></i>네이버 사전</small>
  </a>
</center>
<br>

### HEAD란 무엇일까?
- HEAD는 한마디로 <span style="color: #8D4801">**commit을 가리키고 있는 참조 포인터**</span>이다. 포인터 하면 생각나는 게 c언어인 것 같다. 대학생 시절 처음엔 비교적 재밌게 프로그래밍 수업을 듣던 학생들도 포인터 개념에서 많이 포기를 하고 전과를 하거나 코딩 자체에 관심을 잃고 졸업 후 다른 방향의 직업을 생각나게 하는 악명높은 문법이었다. 아무튼 본론으로 돌아와서... 포인터의 문어적 의미 그대로 "무언가를 가리키고 있다."라고 생각하면 되는데 Git에서는 그 가리키고 있는 것이 commit이라고 생각하면 된다.
- 아래의 예시에서 볼 수 있듯이 <span style="color: #8D4801">**HEAD는 기본적으로 마지막 commit 위치 (commit이 변화한 최종 위치)**</span>를 가리키고 있다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/example-of-head.jpg" alt="깃 로그에서의 HEAD">
- 아직 commit이 없는 경우엔 HEAD 또한 존재하지 않는다. 최소한 <span style="color: #8D4801">**한 번 이상 commit을 실행해야 HEAD가 생성**</span>된다. HEAD가 가리키고 있는 commit의 hash 값은 다음과 같은 경로에 해당 브랜치명으로 저장이 된다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/location-of-head-information-in-git-directory.jpg" alt="HEAD가 가리키고 있는 커밋의 해시 값 위치">

<br>

### Snapshot 기반 접근 방식
- Git의 각 커밋에는 커밋이 이루어진 당시 전체 프로젝트의 snapshot에 대한 참조가 포함되어 있다. commit을 실행하면 <span style="color: #8D4801">**HEAD가 가리키고 있는 commit의 snapshot과 현재 Stage area를 비교하여 새로운 commit을 생성**</span>한다.
- Git은 이 Snapshot 기반 접근 방식을 사용하기 때문에 <span style="color: #8D4801">**전체 파일의 여러 복사본을 저장하는 대신 스냅샷 간의 차이점만 저장하면 되므로 변경 사항과 기록을 효율적으로 관리**</span>할 수 있다. (빠른 속도, 적은 용량 사용)
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/principle-of-git-commit-snapshot.webp" alt="Snapshot 기반 접근 방식">

---

## Commit 해보기
```bash
git commit
```
- commit 명령어를 실행하면 위에서 알아봤듯이 HEAD commit의 snapshot과 Stage area를 비교하여 <span style="color: #8D4801">**새로운 commit 객체를 생성**</span>한다. 그리고 <span style="color: #8D4801">**commit이 완료되면 Stage area는 비워진다.**</span>
- 실제로 실행해 보면 <span style="color: #8D4801">**바로 commit이 완료되는 것이 아니라 vim 에디터(또는 core.editor로 설정한 다른 에디터)가 출력**</span>되는 것을 확인할 수 있다. commit 메시지를 작성해야 하기 때문이다. 아래에서 간단한 사용법을 알아보자. ([Git 환경설정 中 core 에디터]({{ site.baseurl }}/github/2023/08/26/Getting-Started-with-Git/#git의-코어-에디터-설정 "Git 환경설정 中 core 에디터로 이동"))
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-commit.jpg" alt="깃 커밋 명령어">

<br>

### Commit 메시지
- 각각의 commit에 대한 정보를 입력할 수 있다.
- 만약 commit.template을 작성해 뒀다면 vim 화면에 함께 출력된다. ([Git 환경설정 中 commit 템플릿]({{ site.baseurl }}/github/2023/08/26/Getting-Started-with-Git/#commit-템플릿-설정 "Git 환경설정 中 commit 템플릿으로 이동"))
- <span style="color: indianred">**Git은 기본적으로 commit 명령어를 실행할 때 반드시 commit 메시지를 작성해야 한다.**</span>
- | 간단한 vim 에디터 사용법 | 명령어 |
|:---:|:---:|
| 내용 편집 | **ESC -> :i** |
| 저장 | **ESC -> :w** |
| 에디터 종료 | **ESC -> :q** |
| 저장 후 에디터 종료 | **ESC -> :wq** |
| 느낌표는 강제로 실행을 뜻한다 | **ESC -> :q!** |
- <img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/editing-commit-message-by-vim-editor.jpg" alt="vim 에디터를 이용하여 커밋 메시지 작성">

<br>

#### <span style="color: indianred">만약 실습 도중 실수할 상황에 대비하여 몇 가지 복귀 명령어들을 미리 알아보자.</span>
```bash
git checkout -- <파일명>
```
```bash
git restore <파일명>
```
- 잘못 수정한 파일을 바로 이전 커밋으로 즉, 수정 전 상태로 되돌리는 명령어들이다. checkout 명령어는 restore 명령어가 존재하기 전 과거에 사용하던 방법으로 되도록 <span style="color: #8D4801">**restore 명령어 사용을 추천**</span>한다. (checkout 명령어는 다른 용도와 목적으로 사용된다.)
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-restore.jpg" alt="잘못 수정한 파일을 수정 전 상태로 되돌리는 명령어">

<br>

### 파일 추적과 커밋을 동시에 실행하는 옵션
```bash
git commit -a
```
```bash
git commit --all
```
- "git add .; git commit" 명령어와 동일한 동작을 한다. commit 작성을 좀 더 편리하게 만들어주는 명령어이지만 <span style="color: #8D4801">**자동으로 모든 수정 사항을 추적**</span>하기 때문에 만약에 <span style="color: #8D4801">**당장 commit을 원치 않았던 수정 사항들이 존재한다면 문제가 발생하므로 유의하여 사용**</span>해야 한다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-commit-a.jpg" alt="추적과 커밋을 동시에 실행하는 명령어">

- 이 명령어는 <span style="color: #8D4801">**이미 tracked 상태인 파일에만 사용**</span>할 수 있다. 즉, Untracked 상태의 파일이 존재할 경우 명령어 실행에 실패한다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-commit-a-when-it-is-failed.jpg" alt="추적과 커밋을 동시에 실행하는 명령어는 이미 추적 상태인 파일에만 사용할 수 있어서 추적하지 않는 파일에 명령어 사용 후 실패한 상황">

<br>

### 에디터를 사용하지 않는 간이 commit 메시지 작성 옵션
```bash
git commit -m <"commit 메시지">
```
```bash
git commit --message <"commit 메시지">
```
- commit 메시지를 작성 후 명령어 실행 시 에디터가 실행되지 않고 바로 commit이 진행된다. <span style="color: #8D4801">**필자의 경우 매우 자주 사용하는 commit 방법이다. 혼자서 개발하는 작은 프로젝트의 경우 대부분의 commit을 이 옵션으로 작성하게 되는 것 같다.**</span>
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-commit-m.jpg" alt="에디터가 실행되지 않고 바로 커밋이 진행되는 명령어">

<br>

### 가장 짧게 작성할 수 있는 commit 옵션
```bash
git commit -am <"commit 메시지">
```
- 자동으로 파일을 추적하고 commit을 실행하는데 에디터가 실행되지 않고 작성한 commit 메시지로 바로 commit이 진행된다. 여러 작업을 한 번에 묶어서 처리하기 때문에 아마 <span style="color: #8D4801">**가장 짧게 commit을 작성하는 방법**</span>일 것이다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-commit-am.jpg" alt="가장 짧게 커밋을 작성하는 명령어">

<br>

### 빈 메시지의 commit 옵션
```bash
git commit --allow-empty-message -m ""
```
- 가능하면 추천하고 싶진 않은 방법이다. 만약 필요하다면 commit 메시지가 없는 <span style="color: #8D4801">**빈 메시지의 커밋을 생성**</span>하는 방법도 있다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-allow-empty-message-m.jpg" alt="빈 메시지의 커밋을 생성하는 명령어">

<br>

### Commit 메시지 수정
```bash
git commit --amend
```
- <span style="color: #8D4801">**마지막 commit에 대한 수정 명령어**</span>로써 메시지 수정뿐만 아니라 해당 commit에 새롭게 추가하고 싶은 파일 또한 추가할 수 있다. 마지막 commit이 아닌 commit을 수정하고 싶다면 rebase 등 복잡한 과정을 거쳐야 한다.
- <span style="color: indianred">**주의해야 할 점은 기존 commit의 해시 코드가 바뀐다**</span>는 것이다. 해시 코드는 commit의 ID라고 생각하면 되는데 아래에서 알아볼 예정이다.

  - 만약 수정 전의 commit을, push를 통해 이미 원격 저장소에 전송한 상태라면 정상적인 방법으로는 원격 저장소에 다시 전송할 수가 없다. (<span style="color: indianred">**git push -f를 통해 강제로 전송**</span>해야 한다.)

- 명령어 실행 전
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-log-before-amended.jpg" alt="지난 커밋이 수정되기 전 로그">

- 명령어 실행
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-commit-amend.jpg" alt="지난 커밋을 수정하는 명령어">

- 명령어 실행 후
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-log-after-amended.jpg" alt="지난 커밋이 수정된 후 로그">

<br>

### Commit 메시지를 작성할 때 파일 간 또는 커밋 간 차이 참조 옵션
```bash
git commit -v
```
```bash
git commit --verbose
```
- 사실 "git log -p" 명령어를 이용하면 어떤 commit이든지 diff를 확인할 수 있다. 다만, "git commit"과 "git commit -v"의 차이점은 <span style="color: #8D4801">**에디터에서 commit 메시지를 작성할 때 diff 내용을 눈으로 확인할 수 있게 디스플레이해주는 것**</span> 뿐이다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-commit-v.jpg" alt="커밋 메시지를 작성할 때 파일 간 또는 커밋 간 차이 참조 명령어">

---

## Commit을 확인해 보자
```bash
git log
```
- <span style="color: #8D4801">**"git status" 명령어와 마찬가지로 매우 자주 쓰이는 명령어**</span>이다. Commit 기록의 목록을 최신 commit 기록부터 내림차순으로 출력한다. 또한 여러 가지 옵션을 활용하여 다양한 형태로 로그를 확인할 수 있다. 아래에서 확인해 보자.

  - Git은 분산형 버전관리 도구이므로 개인의 컴퓨터에 설정한 시간 정보를 바탕으로 commit 기록을 작성한다. <span style="color: #8D4801">**작업 중인 컴퓨터가 다른 국가 및 지역의 시간이거나 잘못된 시간으로 설정되어 있을 경우도 있으므로 commit 기록의 시간은 무조건 신용할 수는 없다.**</span>
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-log.jpg" alt="커밋 기록의 목록 출력 명령어">

<br>

### Commit ID
- 문어적 표현 그대로 <span style="color: #8D4801">**특정 commit을 가리키는 Identifier(고유 식별자)**</span>이다. 이 ID를 기준으로 각 커밋을 구별하고 버전관리에 필요한 동작을 수행할 수 있다.
- <span style="color: #8D4801">**Git의 commit ID는 SHA-1(Secure Hash Algorithm-1)이라는 해시 알고리즘을 채택**</span>하고 있다. 과거에는 안전함을 슬로건으로 내걸었으나 현재는 안전하진 않고 단지 레거시 코드들과의 호환성을 위해 채택하고 있다고 전해진다. 이 알고리즘은 데이터를 고정된 크기의 해시값으로 변환하는 알고리즘으로 40자리의 hexa 값으로 이루어진 중복되지 않는 commit ID를 생성한다.
- 버전관리를 위해 commit ID를 사용할 때 40자리의 16진수는 정말 큰 숫자이므로 앞자리 문자들이 바뀔 경우는 거의 없으므로 <span style="color: #8D4801">**편의상 앞에서 7자리~10자리까지의 문자만 사용**</span>하더라도 충분히 중복되지 않게 사용할 수 있다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-commit-id.jpg" alt="로그의 커밋 ID">

<br>

### Log에 출력할 commit의 개수를 설정하는 옵션
```bash
git log -<출력할 commit의 개수>
```
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-log-number.jpg" alt="로그에 출력할 커밋의 개수를 설정하는 옵션">

<br>

### Log에 commit의 내용을 짧게 표시하는 옵션
```bash
git log --pretty=short
```
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-log-pretty-short.jpg" alt="깃 커밋의 내용을 짧게 표시하는 옵션">

<br>

### 간략한 commit 해시값과 메시지만 출력하는 옵션 (--pretty=short 옵션보다 더 짧음)
```bash
git log --oneline
```
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-log-oneline.jpg" alt="간략한 커밋 해시값과 메시지만 출력하는 옵션">

<br>

### Log에 각 commit의 diff를 포함하는 옵션
```bash
git log --p
```
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-log-p.jpg" alt="로그에 각 커밋의 차이점을 포함하는 옵션">

<br>

### Log에 각 commit의 히스토리를 포함하는 옵션
```bash
git log --stat
```
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-log-stat.jpg" alt="로그에 각 커밋의 히스토리를 포함하는 옵션">

<br>

### Log에 브랜치의 흐름 그래프를 포함하는 옵션
```bash
git log --graph
```
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-log-graph.jpg" alt="로그에 브랜치의 흐름 그래프를 포함하는 옵션">

<br>

### Log에 가장 짧은 commit 정보와 그래프를 출력하는 옵션
```bash
git log --graph --pretty=oneline --abbrev-commit
```
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-log-graph-pretty-oneline-abbrev-commit.jpg" alt="로그에 가장 짧은 커밋 정보와 그래프를 출력하는 옵션">

<br>

### 특정 commit의 상세 정보 확인 명령어
```bash
git show <commit ID>
```
- 사실상 "git log" 명령어와 동일한 기능을 하는 명령어이다. 실제로 --help 옵션으로 확인해 봐도 두 명령어가 함께 묶여서 표시된다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-show.jpg" alt="특정 커밋의 상세 정보 확인 명령어">

<br>

### 파일 및 commit 사이의 차이점 비교 명령어
```bash
git diff <object>
```
- object에 무엇을 비교하냐에 따라서 현재 Working directory와 차이점을 출력해 준다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-09-13-What-is-the-commit-on-Git/git-command-diff.jpg" alt="파일 및 커밋 사이의 차이점 비교 명령어">

---

## 마무리하며...
이번 포스트에서는 Git의 핵심 요소인 Commit에 관하여 자세히 알아봤다. 앞으로 우리가 다룰 모든 명령어는 이 commit이라는 재료를 통해 실행되기 때문에 백번 강조해도 모자라지 않을 만큼 중요한 개념이다. 사실 어렵게 생각할 필요도 없다. 포스트를 시작하며 언급했던 것처럼 commit은 포도알 하나하나이고 이들을 모은 포도송이가 하나의 기능이 되는 것이다. 다음 포스트에서는 기록해 둔 commit들을 원격 저장소로 전송하고 다시 로컬 저장소에 내려받아 보자.