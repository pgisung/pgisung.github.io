---
layout: post
title: 11. 작업 되돌리기
date: 2023-10-20 17:21:37 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, 깃, 깃허브, git rm, git restore, git reset, git revert, git reflog ]
description: Git 저장소에서 작업을 하다보면 지금까지 한 작업을 취소하고 다시 시작해야할 경우가 있다. 이런 경우에 필요한 복귀 명령어를 알아보자.
---

> 1. [파일 되돌리기](#파일-되돌리기 "Navigate to Reverting file")
- [추적 되돌리기](#추적-되돌리기 "Navigate to Reverting tracking")
- [스테이지 상태 되돌리기](#스테이지-상태-되돌리기 "Navigate to Reverting stage status")
- [이전 커밋 상태로 되돌리기](#이전-커밋-상태로-되돌리기 "Navigate to Reverting to last commit")
2. [커밋 되돌리기](#커밋-되돌리기 "Navigate to Reverting commit")
- [Reset 명령어](#reset-명령어 "Navigate to Reset command")
- [Revert 명령어](#revert-명령어 "Navigate to Revert command")
3. [명령 되돌리기](#명령-되돌리기 "Navigate to Reverting past commands")
- [참조 기록](#참조-기록 "Navigate to Reference log")

---

#### <span style="color: brown">**파일 되돌리기**</span>
##### **추적 되돌리기**
```bash
git rm -cached <파일명>
```
- 파일의 <span style="color: #8D4801">**추적 상태를 추적하지 않은 상태로 변경하는**</span> 명령어이다. <span style="color: #8D4801">**파일을 추적한 후 커밋하지 않은 상태에서 바로 삭제할 때 사용할 수 있다.**</span> 해당 파일을 이미 한 번이라도 커밋했다면 이전 커밋을 기준으로 해당 파일의 삭제 또한 변화된 이력으로 간주하기 때문에 파일이 여전히 추적 상태이면서 삭제된 상태이고 이를 다시 커밋해야 삭제를 완료할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-20-Reverting-working/git-command-rm-cached.jpg" title="Git command to revert the files to untracked status" alt="Git command to revert the files to untracked status">

<br>

##### **스테이지 상태 되돌리기**
```bash
git reset <파일명>
```
```bash
git reset --mixed HEAD <파일명>
```
```bash
git restore --staged <파일명>
```
- 파일의 <span style="color: #8D4801">**스테이지 상태를 스테이징 되지 않은 상태로 변경하는**</span> 명령어이다. <span style="color: #8D4801">**HEAD**</span>는 "커밋 범위"의 기본 값으로 <span style="color: #8D4801">**생략**</span>될 수 있다. 또한 <span style="color: #8D4801">**"-&nbsp;-mixed" 옵션**</span>은 reset 명령어의 기본 옵션으로 <span style="color: #8D4801">**생략**</span>될 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-20-Reverting-working/git-command-restore-staged.jpg" title="Git command to revert the files to unstage status" alt="Git command to revert the files to unstage status">

<br>

```bash
git reset <커밋 범위> <파일명>
```
- <span style="color: #8D4801">**"커밋 범위"**</span>에 원하는 특정 커밋을 지정하여 <span style="color: #8D4801">**지정된 커밋을 기준으로 되돌릴 수 있다.**</span>
<img src="{{site.baseurl}}/images/posts/2023-10-20-Reverting-working/git-command-reset-HEAD.jpg" title="Git command to revert the files to unstage status based on given commit scope" alt="Git command to revert the files to unstage status based on given commit scope">

<br>

##### **이전 커밋 상태로 되돌리기**
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
<img src="{{site.baseurl}}/images/posts/2023-10-20-Reverting-working/git-command-restore.jpg" title="Git command to restore the files" alt="Git command to restore the files">

---

#### <span style="color: brown">**커밋 되돌리기**</span>
##### **Reset 명령어**
지정된 커밋으로 되돌아가는 명령어이다. 즉, <span style="color: #8D4801">**특정 커밋의 상태로 모든 코드를 복구하고 되돌아간 만큼의 커밋을 취소**</span>한다. 이미 <span style="color: indianred">**공유된 커밋 내역을 리셋할 경우 협업 중인 동료들에게 혼돈을 줄 수 있으므로 주의**</span>해야 한다.
```bash
git reset <옵션> <커밋 범위>
```
<center><img src="{{site.baseurl}}/images/posts/2023-10-20-Reverting-working/reference-of-reset-command.webp" title="Reference of reset command" alt="Reference of reset command"></center>

- **soft 옵션**
```bash
git reset --soft <커밋 범위>
```
  - 취소된 커밋 기록의 <span style="color: #8D4801">**스테이지 상태까지 복원**</span>하는 옵션이다.
  - 취소된 커밋 기록을 커밋 직전인 스테이지 상태로 복원하기 때문에 마지막 커밋으로 이 옵션을 이용하여 리셋할 경우 <span style="color: #8D4801">**"git commit -&nbsp;-amend" 명령어와 유사하게 작업**</span>할 수 있다.
  - 여러개의 커밋을 이 옵션을 이용하여 리셋하고 다시 커밋할 경우 하나의 커밋이 생성되므로 <span style="color: #8D4801">**여러개의 커밋을 하나로 합치는 것처럼 사용**</span>할 수 있다.

<br>

- **mixed 옵션 (default)**
```bash
git reset --mixed <커밋 범위>
```
  - Reset 명령어의 <span style="color: #8D4801">**기본 옵션**</span>으로 따로 옵션을 설정하지 않으면 이 옵션으로 실행되므로 옵션을 생략할 수도 있다. 취소된 커밋 기록을 <span style="color: #8D4801">**작업 디렉토리로 복원**</span>하는 옵션이다. 

<br>

- **hard 옵션**
```bash
git reset --hard <커밋 범위>
```
  - 취소된 커밋 기록을 <span style="color: #8D4801">**모두 삭제**</span>하는 옵션이다. <span style="color: indianred">**지금까지의 모든 작업 내용을 삭제하므로 주의하여 사용하여야 한다.**</span>
  - 기본값인 HEAD 커밋으로 이 옵션을 이용하여 리셋할 경우 지금까지의 작업을 모두 삭제할 수 있으므로 <span style="color: #8D4801">**진행중인 작업을 깔끔하게 취소하고 싶을 때 사용**</span>할 수 있다.

<br>

##### **Revert 명령어**
기존의 커밋을 취소하는 Reset 명령어와 달리, Revert 명령어는 <span style="color: #8D4801">**기존 커밋을 보존하면서 되돌리기 작업에 대한 새로운 커밋을 생성**</span>한다. 그래서 명령어를 실행했을 때 새로운 커밋에 대한 에디터가 실행된다. <span style="color: indianred">**복귀를 위한 커밋이 지속적으로 생기면 커밋 이력이 복잡해질 수 있으므로 회사의 Convention이나 상황에 맞게 주의하여 사용**</span>해야 한다.
```bash
git revert <커밋 ID>
```
<center><img src="{{site.baseurl}}/images/posts/2023-10-20-Reverting-working/reference-of-reset-command.webp" title="" alt=""></center>

<br>

- **범위 지정 Revert**
```bash
git revert <커밋 ID> .. <커밋 ID>
```
  - 기본적으로 Revert 명령어는 <span style="color: #8D4801">**한 번에 커밋 단 하나만 취소**</span>할 수 있다. 만약 <span style="color: #8D4801">**범위 지정 연산자를 사용할 경우 범위 안의 여러개의 커밋을 취소**</span>할 수 있다.

<br>

- **병합 취소 Revert**
```bash
git revert --mainline <숫자> <병합 커밋 ID>
```
  - 되돌리기 작업에 대한 새로운 커밋을 생성하는 Revert 명령어의 특성상 <span style="color: #8D4801">**병합 커밋을 되돌릴 때 어느 브랜치의 내용으로 복귀할지 모호성**</span>이 생긴다. "--mainline" 옵션을 사용하여 <span style="color: #8D4801">**복귀할 브랜치의 내용을 선택**</span>할 수 있다.

---

#### <span style="color: brown">**명령 되돌리기**</span>
앞에서 우린 

##### **참조 기록**
```bash
git reflog
```


---

#### 마무리하며...
이번 포스트에서는 . 다음 포스트에서는 .