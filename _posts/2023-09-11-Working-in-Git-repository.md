---
layout: post
title: Git 저장소에서 작업하기
date: 2023-09-11 06:49:13 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, 깃, 깃허브, git status, git add, gitignore ]
description: 생성한 Git 저장소에서 간단한 작업을 해보자. 그리고 그 파일을 추적하고 상태도 확인해 보자.
---

> 1. [간단한 작업 예시를 만들어보자](#간단한-작업-예시를-만들어보자 "Navigate to Let's make an example for training")
2. [파일 상태 확인하기](#파일-상태-확인하기 "Navigate to Checking file status in Git repository")
3. [파일 추적하기](#파일-추적하기 "Navigate to Tracking in Git repository")
4. [추적중인 파일 이름 변경하기](#추적중인-파일-이름-변경하기 "Navigate to Changing the name of file which is already staged in Git repository")
5. [추적하고 싶지 않은 파일 목록](#추적하고-싶지-않은-파일-목록 "Navigate to The list willing to ignore in Git repository")

---

#### <span style="color: brown">**간단한 작업 예시를 만들어보자**</span>
- [이전 포스트]({{ site.baseurl }}/github/2023/08/28/Essential-terminal-commands "Navigate to 필수적인 터미널 명령어를 알아보자 post")에서 알아봤던 기본적인 터미널 명령어를 이용하여 실습환경을 만들어보자.
<div class="image-slider-static">
<img src="{{site.baseurl}}/images/posts/2023-09-11-Working-in-Git-repository/making-training-environment-by-terminal-command.jpg" title="Making training environment by terminal command" alt="Making training environment by terminal command">
</div>

- 간단하게 프로젝트 모양새를 만들어보았다. 이제 Git 저장소 내의 파일들의 상태를 확인해 보자.
<div class="image-slider-static">
<img src="{{site.baseurl}}/images/posts/2023-09-11-Working-in-Git-repository/directory-for-training-git.jpg" title="Directory for training git" alt="Directory for training git">
</div>

---

#### <span style="color: brown">**파일 상태 확인하기**</span>
```bash
git status
```
- Git 저장소 내의 <span style="color: #8D4801">**파일들의 상태를 확인하는 명령어**</span>이다.
- Git을 사용하는 동안 정말 많이 사용하게 되는 명령어 중 하나이다.
<div class="image-slider-static">
<img src="{{site.baseurl}}/images/posts/2023-09-11-Working-in-Git-repository/git-command-status.jpg" title="Git command to check file status" alt="Git command to check file status">
</div>

---

#### <span style="color: brown">**파일 추적하기**</span>
```bash
git add <옵션> <파일명 1> <파일명 2> ... : add 명령어의 기본 형태
git add . : 현재 경로 내의 모든 파일 추적
```
- Git 저장소 내의 <span style="color: #8D4801">**Unstage 상태의 파일들을 추적하는 명령어**</span>이다.
- 새로 추가, 생성된 파일들뿐만 아니라 기존에 add 되어서 Stage 상태였던 파일들이 Modified 되어서 Unstage 상태가 된 경우 또한 모두 추적한다.
<div class="image-slider-static">
<img src="{{site.baseurl}}/images/posts/2023-09-11-Working-in-Git-repository/git-command-add.jpg" title="Git command to track the files to commit" alt="Git command to track the files to commit">
</div>

<br>

###### <span style="color: red">**※ 만약 실습 도중 실수할 상황에 대비하여 몇 가지 복귀 명령어들을 미리 알아보자.**</span>
- **commit 이력이 없는 추적 중인 파일을 Unstage 상태로 변경하는 명령어**
```bash
git rm -cached <파일명>
```
  - <span style="color: #8D4801">**파일을 추적한 후 commit 하지 않은 상태에서 바로 삭제할 때 사용할 수 있다.**</span> 해당 파일을 이미 한 번이라도 commit 했다면 이전 commit 기준으로 해당 파일의 삭제 또한 변화된 이력으로 간주하기 때문에 파일이 여전히 tracked 상태인 것을 확인할 수 있다.
<div class="image-slider-static">
<img src="{{site.baseurl}}/images/posts/2023-09-11-Working-in-Git-repository/git-command-rm-cached.jpg" title="Git command to remove cached files" alt="Git command to remove cached files">
</div>

<br>

- **commit 이력이 있는 추적 중인 파일을 Unstage 상태로 변경하는 명령어**
```bash
git reset HEAD <파일명>
```
  - 현재 HEAD가 가리키는 commit 이력의 상태로 파일의 이력을 되돌려서 Unstage 상태로 만들 수 있다.
<div class="image-slider-static">
<img src="{{site.baseurl}}/images/posts/2023-09-11-Working-in-Git-repository/git-command-reset-HEAD.jpg" title="Git command to reset to HEAD commit" alt="Git command to reset to HEAD commit">
</div>

<br>
  
```bash
git restore --staged <파일명>
```
  - Stage 상태의 파일을 Unstage 상태로 복구시킨다.
<div class="image-slider-static">
<img src="{{site.baseurl}}/images/posts/2023-09-11-Working-in-Git-repository/git-command-restore-staged.jpg" title="Git command to restore to recent commit" alt="Git command to restore to recent commit">
</div>

---

#### <span style="color: brown">**추적중인 파일 이름 변경하기**</span>
```bash
git mv <파일명> <새파일명>
```
- 터미널 명령어인 mv와 같이 파일명을 바꾸는 명령어로써 주된 목적은 Git 저장소 내의 이미 추적중인 파일명을 변경하는 명령어이다.
<div class="image-slider-static">
<img src="{{site.baseurl}}/images/posts/2023-09-11-Working-in-Git-repository/git-command-mv.jpg" title="Git command to change the name of file which is already staged" alt="Git command to change the name of file which is already staged">
</div>

<br>

```bash
mv <파일명> <새파일명>
git rm <파일명>
git add <새파일명>
```
- 풀어서 작성하면 위와 같이 작성할 수 있다. Git 명령어를 사용하지않고 그냥 파일명을 변경하면 기존의 추적중이던 파일명은 삭제 상태가 되고 새로운 파일명은 추가된 상태가 되므로 삭제 상태의 파일명 이력은 지우고 추가된 상태의 새로운 파일명은 다시 추적하면 똑같은 동작을 한다.
<div class="image-slider-static">
<img src="{{site.baseurl}}/images/posts/2023-09-11-Working-in-Git-repository/example-that showing-same-result-with-git-mv-command.jpg" title="Example that showing same result with git mv command" alt="Example that showing same result with git mv command">
</div>

---

#### <span style="color: brown">**추적하고 싶지 않은 파일 목록**</span>
- .gitignore 파일
  - git은 이 파일에 작성된 <span style="color: #8D4801">**목록들을 추적하지 않는다.**</span>
  - 또 로컬 저장소를 서버로 전송하거나 다른 사람과 공유할 때도 이를 <span style="color: #8D4801">**예외 처리**</span>한다.
  - .gitignore 파일을 작성할 때는 <span style="color: #8D4801">**반드시 저장소 폴더의 최상위 디렉토리에 두어야 한다.**</span> (.git 디렉토리와 같은 경로)
  - 파일 안에 # 으로 시작하는 줄은 주석으로 처리된다.
  - 와일드카드(*)를 사용하여 패턴을 정의할 수 있다. (셸 글로빙)
  - ex)
      - package-lock.json (풀네임)
      - <span style="color: #8D4801">**\***</span>.DS_Store (해당 확장자를 가진 모든 파일을 제외함)
      - <span style="color: #8D4801">**!**</span>index.html (이 파일은 제외하면 안 됨)
      - <span style="color: #8D4801">**/**</span>404.html (현재 디렉토리 안에 있는 파일 무시)
      - <span style="color: #8D4801">**/**</span>_site<span style="color: #8D4801">**/**</span> (/_site/ 디렉토리 안의 모든 것을 무시)
      - image<span style="color: #8D4801">**/\*\*/\***</span>.gif (image 디렉토리 아래의 모든 .gif 파일 무시)
<div class="image-slider-static">
<img src="{{site.baseurl}}/images/posts/2023-09-11-Working-in-Git-repository/making-gitlignore-file-by-terminal-command.jpg" title="Making gitlignore file by terminal command" alt="Making gitlignore file by terminal command">
</div>

- vim 에디터를 이용하여 .gitignore 파일에 무시할 파일들을 추가하는 예시이다.
<div class="image-slider-static">
<img src="{{site.baseurl}}/images/posts/2023-09-11-Working-in-Git-repository/setting-gitignore-file-by-vim-editor.jpg" title="Setting gitignore file by vim editor" alt="Setting gitignore file by vim editor">
</div>

---

#### 마무리하며...
이번 포스트에서는 프로젝트 작업을 가정한 디렉토리를 터미널 명령어로 간단하게 생성해 보고 그 파일들의 상태를 직접 확인한 후 추적도 하고 복귀도 시켜보았다. [바로 이전 포스트]({{ site.baseurl }}/github/2023/09/04/Git-repository-concept-and-principle "Navigate to Git 저장소 개념과 원리 post")에서 알아보았던 이론들을 실제로 실습해 본 시간이었는데 결국 모든 코딩은 직접 타이핑을 해보아야 알게 된 이론이 정리가 되므로 꼭 한 번씩 타이핑해 보시길 추천해 드린다. 다음 포스트 때는 Git의 알파이자 오메가라고 불러도 과언이 아닐 Commit에 대해서 알아보자.