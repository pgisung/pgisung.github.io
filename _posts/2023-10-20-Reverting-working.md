---
layout: post
title: 11. 작업 되돌리기(Reset)
date: 2023-10-20 17:21:37 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, 깃, 깃허브, git rm, git restore, git reset, git revert, git reflog ]
description: Git 저장소에서 작업을 하다 보면 지금까지 한 작업을 취소하고 다시 시작해야 할 경우가 있다. 이런 경우에 필요한 복귀 명령어를 알아보자.
---

> 1. [파일 되돌리기](#파일-되돌리기)
- [추적 되돌리기](#추적-되돌리기)
- [스테이지 상태 되돌리기](#스테이지-상태-되돌리기)
- [이전 커밋 상태로 되돌리기](#이전-커밋-상태로-되돌리기)
2. [커밋 되돌리기](#커밋-되돌리기)
- [Reset 명령어](#reset-명령어)
- [Revert 명령어](#revert-명령어)
3. [명령 되돌리기](#명령-되돌리기)
- [참조 기록의 목록](#참조-기록의-목록)
- [자세한 참조 기록의 목록](#자세한-참조-기록의-목록)
- [특정 참조 기록의 상세 정보 확인하기](#특정-참조-기록의-상세-정보-확인하기)
- [특정 명령어의 사용 시점으로 되돌리기](#특정-명령어의-사용-시점으로-되돌리기)

---

## 파일 되돌리기
### 추적 되돌리기
```bash
git rm -cached <파일명>
```
- 파일의 <span style="color: #8D4801">**추적 상태를 추적하지 않은 상태로 변경하는**</span> 명령어이다. <span style="color: #8D4801">**파일을 추적한 후 커밋하지 않은 상태에서 바로 삭제할 때 사용할 수 있다.**</span> 해당 파일을 이미 한 번이라도 커밋했다면 이전 커밋을 기준으로 해당 파일의 삭제 또한 변화된 이력으로 간주하기 때문에 파일이 여전히 추적 상태이면서 삭제된 상태이고 이를 다시 커밋해야 삭제를 완료할 수 있다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-rm-cached.jpg" alt="Git command to revert the files to untracked status">

<br>

### 스테이지 상태 되돌리기
```bash
git reset <파일명>
```
```bash
git reset --mixed HEAD <파일명>
```
```bash
git restore --staged <파일명>
```
- 파일의 <span style="color: #8D4801">**스테이지 상태를 스테이징 되지 않은 상태로 변경하는**</span> 명령어이다. <span style="color: #8D4801">**HEAD**</span>는 "커밋 범위"의 기본값으로 <span style="color: #8D4801">**생략**</span>될 수 있다. 또한 <span style="color: #8D4801">**"-&nbsp;-mixed" 옵션**</span>은 reset 명령어의 기본 옵션으로 <span style="color: #8D4801">**생략**</span>될 수 있다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-restore-staged.jpg" alt="Git command to revert the files to unstage status">

<br>

```bash
git reset <커밋 범위> <파일명>
```
- <span style="color: #8D4801">**"커밋 범위"**</span>에 원하는 특정 커밋을 지정하여 <span style="color: #8D4801">**지정된 커밋을 기준으로 되돌릴 수 있다.**</span>
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-reset-HEAD.jpg" alt="Git command to revert the files to unstage status based on given commit scope">

<br>

### 이전 커밋 상태로 되돌리기
```bash
git checkout -- <파일명>
```
```bash
git reset --hard <파일명>
```
```bash
git restore <파일명>
```
- 파일을 <span style="color: #8D4801">**바로 이전 커밋 상태 즉, 수정 전 상태로 되돌리는**</span> 명령어이다. checkout 명령어는 restore 명령어가 존재하기 전 과거에 사용하던 방법으로 되도록 <span style="color: #8D4801">**restore 명령어 사용을 추천**</span>한다. (checkout 명령어는 다른 용도와 목적으로 사용된다.)
- "reset -&nbsp;-hard" 명령어와 restore 명령어는 동일한 결과를 만들어내지만 동작 방식에는 차이가 있을 수 있다. restore 명령어는 파일을 이전 상태로 복원하는 것이라면 "reset -&nbsp;-hard" 명령어는 파일을 이전 커밋의 상태로 되돌리는 것이다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-restore.jpg" alt="Git command to restore the files">

---

## 커밋 되돌리기
### Reset 명령어
지정된 커밋으로 되돌아가는 명령어이다. 즉, <span style="color: #8D4801">**특정 커밋의 상태로 모든 코드를 복구하고 되돌아간 만큼의 커밋을 취소**</span>한다. 이미 <span style="color: indianred">**공유된 커밋 내역을 리셋할 경우 협업 중인 동료들에게 혼돈을 줄 수 있으므로 주의**</span>해야 한다.
```bash
git reset <옵션> <커밋 범위>
```
<center><img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/reference-of-reset-command.webp" alt="Reference of reset command"></center>

- **soft 옵션**
```bash
git reset --soft <커밋 범위>
```
  - 취소된 커밋 기록의 <span style="color: #8D4801">**스테이지 상태까지 복원**</span>하는 옵션이다.
  - 취소된 커밋 기록을 커밋 직전인 스테이지 상태로 복원하기 때문에 마지막 커밋으로 이 옵션을 이용하여 리셋할 경우 <span style="color: #8D4801">**"git commit -&nbsp;-amend" 명령어와 유사하게 작업**</span>할 수 있다.
  - 여러 개의 커밋을 이 옵션을 이용하여 리셋하고 다시 커밋할 경우 하나의 커밋이 생성되므로 <span style="color: #8D4801">**여러 개의 커밋을 하나로 합치는 것처럼 사용**</span>할 수 있다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-reset-soft.jpg" alt="Git command to reset the commit with soft option">

<br>

- **mixed 옵션 (default)**
```bash
git reset --mixed <커밋 범위>
```
  - Reset 명령어의 <span style="color: #8D4801">**기본 옵션**</span>으로 따로 옵션을 설정하지 않으면 이 옵션으로 실행되므로 옵션을 생략할 수도 있다. 취소된 커밋 기록을 <span style="color: #8D4801">**작업 디렉토리로 복원**</span>하는 옵션이다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-reset-mixed.jpg" alt="Git command to reset the commit with mixed option">

<br>

- **hard 옵션**
```bash
git reset --hard <커밋 범위>
```
  - 취소된 커밋 기록을 <span style="color: #8D4801">**모두 삭제**</span>하는 옵션이다. <span style="color: indianred">**지금까지의 모든 작업 내용을 삭제하므로 주의하여 사용하여야 한다.**</span>
  - 기본값인 HEAD 커밋으로 이 옵션을 이용하여 리셋할 경우 지금까지의 작업을 모두 삭제할 수 있으므로 <span style="color: #8D4801">**진행 중인 작업을 깔끔하게 취소하고 싶을 때 사용**</span>할 수 있다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-reset-hard.jpg" alt="Git command to reset the commit with hard option">

<br>

- **병합 취소하기**
```bash
git reset --merge HEAD~
```
  - <span style="color: #8D4801">**3-way 병합 커밋을 취소**</span>하고 병합 이전의 상태로 돌아간다.

  - 명령어 실행 전
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/before-git-command-reset-merge.jpg" alt="Git log before git command reset --merge">

  - 명령어 실행
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-reset-merge.jpg" alt="Git command to reset merge commit">

  - 명령어 실행 후
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/after-git-command-reset-merge.jpg" alt="Git log after git command reset --merge">

<br>

### Revert 명령어
기존의 커밋을 취소하는 Reset 명령어와 달리, Revert 명령어는 <span style="color: #8D4801">**기존 커밋을 보존하면서 되돌리기 작업에 대한 새로운 커밋을 생성**</span>한다. 그래서 명령어를 실행했을 때 새로운 커밋에 대한 에디터가 실행된다. <span style="color: indianred">**복귀를 위한 커밋이 지속해서 생기면 커밋 이력이 복잡해질 수 있으므로 회사의 Convention이나 상황에 맞게 주의하여 사용**</span>해야 한다.
```bash
git revert <커밋 해시값>
```
- 명령어 실행 전
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/before-git-command-revert.jpg" alt="Git log before git command revert">

- 명령어 실행
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-revert.jpg" alt="Git command to revert the commit">

- 명령어 실행 후
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/after-git-command-revert.jpg" alt="Git log after git command revert">

<br>

- **범위 지정 Revert**
```bash
git revert <커밋 해시값>..<커밋 해시값>
```
  - 기본적으로 Revert 명령어는 <span style="color: #8D4801">**한 번에 커밋 단 하나만 취소**</span>할 수 있다. 만약 <span style="color: #8D4801">**범위 지정 연산자를 사용할 경우 범위 안의 여러 개의 커밋을 취소**</span>할 수 있다. 이때 더 최근의 커밋을 뒤에 입력해야 한다.

  - 명령어 실행 전
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/before-git-command-revert-commit-range.jpg" alt="Git log before git command revert range of commits">

  - 명령어 실행
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-revert-commit-range.jpg" alt="Git command to revert range of commits">

  - 명령어 실행 후
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/after-git-command-revert-commit-range.jpg" alt="Git log after git command revert range of commits">

<br>

- **Revert 진행 옵션**
```bash
git revert --continue
```
  - Revert 명령어는 새로운 커밋을 생성하기 때문에 병합이나 리베이스와 같이 충돌이 발생할 수 있다. 현재 진행 중인 <span style="color: #8D4801">**되돌리기를 계속 진행**</span>하는 옵션으로 충돌 등이 발생했을 때 문제 해결 후 되돌리기를 계속 진행하고 싶을 경우 사용할 수 있다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-revert-continue.jpg" alt="Git command to continue reverting">

<br>

- **Revert 건너뛰기 옵션**
```bash
git revert --skip
```
  - 되돌리기 중 충돌 등이 발생한 경우 문제 해결 중에 <span style="color: #8D4801">**특정 커밋의 충돌을 건너뛰고 되돌리기를 진행**</span>하고 싶을 경우 사용하는 옵션이다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-revert-skip.jpg" alt="Git command to skip reverting">

<br>

- **Revert 중지 옵션**
```bash
git revert --abort
```
  - 현재 진행 중인 <span style="color: #8D4801">**되돌리기를 중지**</span>하는 옵션으로 충돌 등이 발생했을 때 되돌리기를 중지하고 싶을 경우 사용할 수 있다.
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-revert-abort.jpg" alt="Git command to abort reverting">

<br>

- **병합 취소 Revert**
```bash
git revert -m <숫자> <병합 커밋 해시값>
```
```bash
git revert --mainline <숫자> <병합 커밋 해시값>
```
  - 되돌리기 작업에 대한 새로운 커밋을 생성하는 Revert 명령어의 특성상 <span style="color: #8D4801">**병합 커밋을 되돌릴 때 어느 브랜치의 내용으로 복귀할지 모호성**</span>이 생긴다. 이런 경우에 이 옵션을 사용하여 <span style="color: #8D4801">**복귀할 브랜치의 내용을 선택**</span>할 수 있다. <span style="color: #8D4801">**숫자**</span>는 아래 이미지와 같이 <span style="color: #8D4801">**좌측부터 1로 시작**</span>한다.

  - 명령어 실행 전
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/before-git-command-revert-mainline.jpg" alt="Git log before git command revert --mainline">

  - 명령어 실행
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-revert-mainline.jpg" alt="Git command to revert merge commit">

  - 명령어 실행 후
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/after-git-command-revert-mainline.jpg" alt="Git log after git command revert --mainline">

---

## 명령 되돌리기
앞에서는 작업을 되돌리는 명령어를 알아보았다면 이번에는 <span style="color: #8D4801">**실수로 실행한 명령어를 되돌리는 방법**</span>을 알아보자.

### 참조 기록의 목록
```bash
git reflog
```
- 우리는 이미 Git의 몇 가지 포인터들을 알고 있다. 가장 최근 커밋을 가리키는 HEAD, 브랜치의 마지막 커밋을 가리키는 브랜치 포인터, 배포 관리를 위해 생성하는 태그 포인터 등 이러한 포인터들은 특정 커밋을 참조하고 있으며 우리가 실행하는 명령어에 따라서 이동, 수정된다. 이 명령어는 위의 <span style="color: #8D4801">**참조들에 대하여 수행된 명령어의 기록을 목록으로 확인**</span>할 수 있는 명령어이다.
- 참조 기록은 <span style="color: indianred">**영구적이지 않고 시스템에 설정된 일정 기간만 보관**</span>하다가 삭제된다. 또한 참조 기록은 오로지 <span style="color: indianred">**로컬 저장소에만 존재하며 복사, 이동 등으로 기록을 옮길 수 없다.**</span>
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-reflog.jpg" alt="Git command to show list of reference log">

<br>

### 자세한 참조 기록의 목록
```bash
git log -g
```
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-log-g.jpg" alt="Git command to show list of reference log in detail">

<br>

### 특정 참조 기록의 상세 정보 확인하기
```bash
git show <레퍼런스 이름>@{<필터>}
```
- <span style="color: #8D4801">**레퍼런스 이름**</span>에는 HEAD, 브랜치 이름, 태그 이름 등을 사용할 수 있다.
- <span style="color: #8D4801">**필터 옵션**</span>
  - <span style="color: #8D4801">**커밋의 상대적인 위치**</span>
    - 현재 커밋인 <span style="color: #8D4801">**0**</span>을 기준으로 <span style="color: #8D4801">**n**</span>번째 이전의 커밋을 뜻한다. 예를 들어 "HEAD@{1}"은 현재 커밋으로부터 바로 이전의 커밋을 뜻한다.
    - <span style="color: indianred">**여기서 커밋은 작업 영역의 커밋이 아닌 참조 기록에 대한 커밋이다.**</span>
  - <span style="color: #8D4801">**날짜**</span>
    - <span style="color: #8D4801">**YYYY-MM-DD**</span>: 2023-01-01과 같이 특정 날짜의 커밋을 뜻하는 옵션으로 Git에서 공식적으로 정의된 필터 형식이다. 이외에 Git은 상대적인 시간 표현을 인식하여 동작하기 때문에 아래와 같은 비공식적인 필터 형식들 또한 사용할 수 있다.
    - <span style="color: #8D4801">**yesterday**</span>: 어제의 커밋
    - <span style="color: #8D4801">**1.week.ago**</span>: 일주일 전의 커밋
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-show-reference-log.jpg" alt="Git command to show specified log for filtered reference">

<br>

### 특정 명령어의 사용 시점으로 되돌리기
```bash
git reset --hard <레퍼런스 이름>@{<커밋의 상대적인 위치>}
```
- 참조 기록의 목록에서 확인한 특정 커밋으로 되돌아가는 명령어로써, 실행하면 현재 브랜치에서 지정한 커밋의 <span style="color: #8D4801">**명령어를 사용했던 시점으로 모든 커밋과 작업 내용을 되돌린다.**</span> 일반적으로 <span style="color: indianred">**자신의 작업 실수를 바로잡을 때 최후의 수단으로 사용하는 것을 추천**</span>한다.

- 명령어 실행 전
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/before-git-command-reset-hard-ref-commit.jpg" alt="Git reference log before git command reset --hard <ref>@{commit}">

- 명령어 실행
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/git-command-reset-hard-ref-commit.jpg" alt="Git command to reset to the reference commit">

- 명령어 실행 후
<img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2023-10-20-Reverting-working/after-git-command-reset-hard-ref-commit.jpg" alt="Git reference log after git command reset --hard <ref>@{commit}">

---

## 마무리하며...
이번 포스트에서는 여러 가지 상황에서 진행 중이던 상태를 되돌리는 방법을 알아보았다. 이제 일반적인 개발자가 Git에서 작업할 때 꼭 알아야 할 명령어들은 대부분 알아본 것이다. 다음 포스트에서는 협업 시 관리자에게 나의 작업을 병합 요청하는 Pull request에 대하여 알아보자.