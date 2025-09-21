---
layout: post
title: 9. 작업 변경 사항을 스태쉬(Stash) 스택에 임시 저장하기
date: 2023-10-12 14:11:02 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, 깃, 깃허브, git stash, git clean ]
description: 작업 영역의 변경 사항을 스택에 임시 저장하고 다시 불러와 보자. 그리고 작업 영역을 깔끔하게 정리 해보자.
---

> 1. [Stash 스택에 저장하기](#stash-스택에-저장하기 "Navigate to Pushing datas to stash")
- [저장 명령어](#저장-명령어 "Navigate to Command to stash datas")
- [Stash 메시지 남기기](#stash-메시지-남기기 "Navigate to Stash message")
- [특정 파일들을 선별하여 stash 실행하기](#특정-파일들을-선별하여-stash-실행하기 "Navigate to Distinguish to stash")
2. [Stash 스택 확인하기](#stash-스택-확인하기 "Navigate to Checking stash list")
- [Stash 목록 확인하기](#stash-목록-확인하기 "Navigate to Command to check stash list")
- [작업 영역과 stash 사이의 차이점 비교 명령어](#작업-영역과-stash-사이의-차이점-비교-명령어 "Navigate to Command to compare difference between working directory and stash")
3. [Stash 스택에서 작업 꺼내기](#stash-스택에서-작업-꺼내기 "Navigate to Popping datas from stash")
- [저장된 작업 꺼내기](#저장된-작업-꺼내기 "Navigate to Popping stashed datas")
- [새로운 브랜치 생성하면서 저장된 작업 꺼내기](#새로운-브랜치-생성하면서-저장된-작업-꺼내기 "Navigate to Creating new branch and popping to the branch")
- [저장된 작업 불러오기](#저장된-작업-불러오기 "Navigate to Applying stash to working directory")
4. [Stash 삭제하기](#stash-삭제하기 "Navigate to Dropping datas in stash")
- [Stash 하나 삭제하기](#stash-하나-삭제하기 "Navigate to Dropping a stash")
- [모든 stash 삭제하기](#모든-stash-삭제하기 "Navigate to Clearing all stashes")
5. [작업 영역 정리하기](#작업-영역-정리하기 "Navigate to Cleaning working directory")

---

## 들어가기 전에
```bash
git commit --allow-empty-message -m ""

( 다른 브랜치 이동 )

( 기존 브랜치 복귀 )

git reset HEAD^
```
Stash란 안전한 곳에 넣어 둔다는 의미를 지닌다. Git에서 작업을 하다 보면 피치 못하게 브랜치를 이동해야 하는 상황이 생긴다. 하지만 이동할 때마다 commit하고 용무가 끝난 뒤 다시 돌아와서 reset을 하는 것은 과정도 복잡할뿐더러 불편하다. 이러한 경우에 필요한 명령어가 stash이다. <span style="color: #8D4801">**작업 중이던 수정 내용들을 잠시 안전한 곳에 넣어두었다가 필요할 때 다시 꺼내어 사용**</span>할 수 있다.
<div class="image-slider-static">
  <img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/stash-in-naver-dictionary.jpg" title="Definition of stash in Naver dictionary" alt="Definition of stash in Naver dictionary">
</div>

<center>
  <a href="https://en.dict.naver.com/#/entry/enko/02ccbc67c89343d4b88048c8b25d5464" title="Navigate to Naver dictionary">
    <small><i class="fa fa-copyright" aria-hidden="true"></i>네이버 사전</small>
  </a>
</center>
<br>

---

## Stash 스택에 저장하기
<center><img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/diagram-git-command-stash.webp" title="Diagram showing flow of git command stash" alt="Diagram showing flow of git command stash"></center>

<br>

### 저장 명령어
```bash
git stash
```
```bash
git stash save
```
- [위의](#들어가기-전에 "Navigate to Preface") 복잡한 과정을 한 번에 해결해 주는 명령어이다. <span style="color: #8D4801">**작업 영역의 변경 사항들을 stash 스택에 저장하고 작업 영역을 깨끗이 정리**</span>한다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/before-git-command-stash.webp" title="Stash list before git command stash" alt="Stash list before git command stash">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash.webp" title="Git command to save working changes temporarily into stash stack" alt="Git command to save working changes temporarily into stash stack">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/after-git-command-stash.webp" title="Stash list after git command stash" alt="Stash list after git command stash">

<br>

### Stash 메시지 남기기
```bash
git stash save <"stash 메시지">
```
- Stash 명령어를 실행할 때, 마치 commit 메시지와 같이 <span style="color: #8D4801">**메시지를 작성**</span>할 수 있다. 이 명령어는 주로 각 stash를 구분하기 위해서 작성한다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/before-git-command-stash-save-message.webp" title="Stash list before git command stash save with message" alt="Stash list before git command stash save with message">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-save-message.webp" title="Git command to save working changes with message temporarily into stash stack" alt="Git command to save working changes with message temporarily into stash stack">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/after-git-command-stash-save-message.webp" title="Stash list after git command stash save with message" alt="Stash list after git command stash save with message">

<br>

### 특정 파일들을 선별하여 stash 실행하기
```bash
git stash -k
```
```bash
git stash --keep-index
```
- <span style="color: #8D4801">**Stage 영역의 파일들을 제외**</span>하고 stash를 생성하는 명령어이다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/before-git-command-stash-k.webp" title="Stash list before git command stash -k" alt="Stash list before git command stash -k">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-k.webp" title="Git command to save working changes except files in stage status temporarily into stash stack" alt="Git command to save working changes except files in stage status temporarily into stash stack">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/after-git-command-stash-k.webp" title="Stash list after git command stash -k" alt="Stash list after git command stash -k">

<br>

```bash
git stash -u
```
```bash
git stash --include-untracked
```
- Stash 명령어는 기본적으로 추적 중인 파일들(Tracked status)만 stash를 생성한다. 그러나 이 옵션을 사용하면 <span style="color: #8D4801">**추적 중이지 않은 파일들(Untracked status) 또한 함께 stash를 생성**</span>한다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/before-git-command-stash-u.webp" title="Stash list before git command stash -u" alt="Stash list before git command stash -u">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-u.webp" title="Git command to save working changes with untracked files temporarily into stash stack" alt="Git command to save working changes with untracked files temporarily into stash stack">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/after-git-command-stash-u.webp" title="Stash list after git command stash -u" alt="Stash list after git command stash -u">

---

## Stash 스택 확인하기
### Stash 목록 확인하기
```bash
git stash list
```
- Stash 스택에 존재하는 <span style="color: #8D4801">**stash의 목록을 보여주는**</span> 명령어이다.
- 각 stash의 이름은 "<span style="color: #8D4801">**stash@{목록 번호}**</span>" 형태로 순서대로 부여된다. 목록 번호는 가장 최근에 저장된 stash인 Top 요소 stash부터 0으로 시작한다.
- <span style="color: #8D4801">**Stash 메시지를 따로 작성하지 않았을 경우**</span> HEAD가 가리키고 있는 <span style="color: #8D4801">**commit 메시지를 출력**</span>한다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-list.webp" title="Git command to show list of stash" alt="Git command to show list of stash">

<br>

### 작업 영역과 stash 사이의 차이점 비교 명령어
```bash
git stash show
```
- <span style="color: #8D4801">**Stash 스택의 Top 요소 stash와 작업 영역을 비교**</span>하여 변경된 파일들의 상태를 <span style="color: #8D4801">**간략하게 보여주는 명령어**</span>이다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-show.webp" title="Git command to show simple difference between top element stash and working changes" alt="Git command to show simple difference between top element stash and working changes">

<br>

```bash
git stash show -p stash@{<목록 번호>}
```
```bash
git stash show --patch stash@{<목록 번호>}
```
- 파일 및 commit 사이의 차이점을 비교하는 <span style="color: #8D4801">**diff 명령어와 같이 지정한 stash와 작업 영역을 비교한 차이를 자세하게 보여주는 명령어**</span>이다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-show-p.webp" title="Git command to show detailed difference between the stash and working changes" alt="Git command to show detailed difference between the stash and working changes">

---

## Stash 스택에서 작업 꺼내기
### 저장된 작업 꺼내기
<center><img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/diagram-git-command-stash-pop.webp" title="Diagram showing flow of git command stash pop" alt="Diagram showing flow of git command stash pop"></center>
```bash
git stash pop
```
- <span style="color: #8D4801">**Top 요소 stash만 작업 영역으로 꺼내면서 stash 스택에서 삭제**</span>한다. Stash를 스택으로부터 꺼내올 때 현재 작업 영역에 이미 다른 변경 사항이 존재할 수 있기 때문에 <span style="color: #8D4801">**자동으로 병합을 실행**</span>한다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/before-git-command-stash-pop.webp" title="Stash list before git command stash pop" alt="Stash list before git command stash pop">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-pop.webp" title="Git command to pop the top element stash from stash stack" alt="Git command to pop the top element stash from stash stack">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/after-git-command-stash-pop.webp" title="Stash list after git command stash pop" alt="Stash list after git command stash pop">

<br>

```bash
git stash pop --index
```
- 기본적으로 stash를 꺼내올 때 작업 변경 사항만 꺼내온다. 그러나 이 옵션을 사용할 경우 당시 <span style="color: #8D4801">**스테이지 상태까지 그대로 꺼내올 수 있다.**</span>

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/before-git-command-stash-pop-index.webp" title="Stash list before git command stash pop --index" alt="Stash list before git command stash pop --index">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-pop-index.webp" title="Git command to pop the top element stash even including stage status from stash stack" alt="Git command to pop the top element stash even including stage status from stash stack">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/after-git-command-stash-pop-index.webp" title="Stash list after git command stash pop --index" alt="Stash list after git command stash pop --index">

<br>

### 새로운 브랜치 생성하면서 저장된 작업 꺼내기
앞에서 얘기했듯이 현재 작업 영역에 stash를 꺼낼 때 다른 변경 사항이 이미 존재할 수 있고 이에 따라 <span style="color: #8D4801">**자동으로 병합 중 conflict가 발생**</span>할 수 있는데 이런 경우 stash는 스택의 내용을 아직 삭제하지 않으며 수동으로 병합을 진행하거나 abort 하여 병합을 취소할 수 있다. 하지만 <span style="color: #8D4801">**일반적으로 commit을 생성하지 않고 stash로 보관했다는 뜻은 아직 코드 작성이 완료되지 않았음을 의미**</span>하므로 당장 수동 병합을 진행하여 commit을 생성하는 것은 뭔가 석연치 않다. 다음의 명령어는 이런 상황에 권장하는 방법이다.
<center><img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/diagram-git-command-stash-branch.webp" title="Diagram showing flow of git command stash branch" alt="Diagram showing flow of git command stash branch"></center>
```bash
git stash branch <브랜치 이름>
```
- <span style="color: #8D4801">**지정된 브랜치 이름의 브랜치를 생성하고 HEAD를 이 브랜치로 이동시키며 Top 요소 stash 또는 지정된 stash를 작업 영역으로 꺼내면서 스택에서 삭제**</span>하는 명령어이다. 새로 브랜치를 생성하여 작업 사항들을 읽어오기 때문에 conflict가 발생할 일이 없다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/before-git-command-stash-branch.webp" title="Stash list before git command stash branch" alt="Stash list before git command stash branch">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-branch.webp" title="Git command to create branch and switch to the branch then pop the stash" alt="Git command to create branch and switch to the branch then pop the stash">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/after-git-command-stash-branch.webp" title="Stash list after git command stash branch" alt="Stash list after git command stash branch">

<br>

### 저장된 작업 불러오기
<center><img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/diagram-git-command-stash-apply.webp" title="Diagram showing flow of git command stash apply" alt="Diagram showing flow of git command stash apply"></center>
```bash
git stash apply
```
- Top 요소 stash를 작업 영역으로 읽어오는 것은 pop 명령어와 같지만 <span style="color: #8D4801">**스택의 stash를 삭제하지 않는**</span> 명령어이다. 마치 stash를 복사하는 것처럼 동작한다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/before-git-command-stash-apply.webp" title="Stash list before git command stash apply" alt="Stash list before git command stash apply">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-apply.webp" title="Git command to copy the top element stash from stash stack" alt="Git command to copy the top element stash from stash stack">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/after-git-command-stash-apply.webp" title="Stash list after git command stash apply" alt="Stash list after git command stash apply">

<br>

```bash
git stash apply stash@{<목록 번호>}
```
- Apply 명령어는 pop 명령어와 달리 <span style="color: #8D4801">**스택의 중간에 존재하는 지정된 stash를 작업 영역으로 불러올 수 있다.**</span> 목록 번호를 작성하지 않을 경우 top 요소 stash를 불러온다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/before-git-command-stash-apply-listnum.webp" title="Stash list before git command stash apply stash@{list number}" alt="Stash list before git command stash apply stash@{list number}">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-apply-listnum.webp" title="Git command to copy the stash having the list number from stash stack" alt="Git command to copy the stash having the list number from stash stack">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/after-git-command-stash-apply-listnum.webp" title="Stash list after git command stash apply stash@{list number}" alt="Stash list after git command stash apply stash@{list number}">

---

## Stash 삭제하기
### Stash 하나 삭제하기
<center><img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/diagram-git-command-stash-drop.webp" title="Diagram showing flow of git command stash drop" alt="Diagram showing flow of git command stash drop" width="70%"></center>
```bash
git stash drop
```
- <span style="color: #8D4801">**Top 요소 stash를 스택으로부터 삭제**</span>하는 명령어이다. <span style="color: #8D4801">**Stash 스택은 임시 저장이 목적이므로 작업이 완료된 stash는 그때그때 정리하는 것이 좋다.**</span> (stash가 너무 많이 쌓이면 점점 어떤 stash가 언제의 이력인지 헷갈릴 수 있다.)

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/before-git-command-stash-drop.webp" title="Stash list before git command stash drop" alt="Stash list before git command stash drop">

- 명령어 실행
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-drop.webp" title="Git command to drop a top element stash from stash stack" alt="Git command to drop a top element stash from stash stack">

- 명령어 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/after-git-command-stash-drop.webp" title="Stash list after git command stash drop" alt="Stash list after git command stash drop">

<br>

### 모든 stash 삭제하기
<center><img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/diagram-git-command-stash-clear.webp" title="Diagram showing flow of git command stash clear" alt="Diagram showing flow of git command stash clear" width="70%"></center>
```bash
git stash clear
```
- Stash <span style="color: #8D4801">**스택 안 모든 stash를 삭제**</span>하는 명령어이다.

- 명령어 실행 전
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/before-git-command-stash-clear.webp" title="Stash list before git command stash clear" alt="Stash list before git command stash clear">

- 명령어 실행 및 실행 후
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-stash-clear.webp" title="Git command to clear all stashes from stash stack" alt="Git command to clear all stashes from stash stack">

---

## 작업 영역 정리하기
<center><img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/diagram-git-command-clean.webp" title="Diagram showing flow of git command clean" alt="Diagram showing flow of git command clean" width="50%"></center>
```bash
git clean
```
- 작업 영역에 <span style="color: #8D4801">**추적 중이지 않은 모든 파일을 삭제하는 명령어**</span>이다. 특정 파일들을 모두 삭제하는 위험한 명령어이기 때문에 단독으로 실행할 경우 fatal error가 발생하며 <span style="color: #8D4801">**옵션과 함께 실행**</span>해야 한다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-clean.webp" title="Git command to clean all untracked files from working directory" alt="Git command to clean all untracked files from working directory">

<br>

```bash
git clean -n
```
```bash
git clean --dry-run
```
- <span style="color: #8D4801">**모의로 삭제를 실행**</span>하여 삭제될 파일을 사용자가 확인 할 수 있도록 출력해 준다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-clean-n.webp" title="Git command to do dry running to clean and then show the name of files will be cleaned" alt="Git command to do dry running to clean and then show the name of files will be cleaned">

<br>

```bash
git clean -f
```
```bash
git clean --force
```
- <span style="color: #8D4801">**강제로 삭제를 실행**</span>하는 옵션이다. 현재 경로 내 파일만 삭제할 수 있다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-clean-f.webp" title="Git command to force to clean all untracked files from working directory" alt="Git command to force to clean all untracked files from working directory">

<br>

```bash
git clean -d
```
- 기본적으로 파일만 삭제하는데 <span style="color: #8D4801">**디렉토리까지 삭제**</span>하는 옵션이다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-clean-d.webp" title="Git command to clean all untracked files and directories from working directory" alt="Git command to clean all untracked files and directories from working directory">

<br>

```bash
git clean -x
```
- 소문자 x 옵션은 <span style="color: #8D4801">**.gitignore 파일에서 무시 중인 파일들 또한 삭제**</span>하는 옵션이다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-clean-x.webp" title="Git command to clean all untracked files and ignored files from working directory" alt="Git command to clean all untracked files and ignored files from working directory">

<br>

```bash
git clean -X
```
- 대문자 X 옵션은 <span style="color: #8D4801">**.gitignore 파일에서 무시 중인 파일들만 삭제**</span>하는 옵션이다.
<img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-12-Temporary-saving-of-working-status-to-stack/git-command-clean-capital-x.webp" title="Git command to clean merely ignored files from working directory" alt="Git command to clean merely ignored files from working directory">

---

## 마무리하며...
이번 포스트에서는 stash 스택을 이용하여 작업 변경 사항을 보관하고 다시 찾아도 보고 정리도 해보며 작업 영역의 관리 방법에 대하여 알아보았다. 이는 다수의 branch를 가진 프로젝트에서 협업할 때 자주 쓰일 수밖에 없는 명령어이므로 알아두면 좋다. 다음 포스트에서는 병합과 리베이스에 관하여 알아보자.