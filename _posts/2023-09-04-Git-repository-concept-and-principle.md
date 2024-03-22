---
layout: post
title: 4. Git 저장소 개념과 원리
date: 2023-09-04 14:11:27 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, 깃, 깃허브, Git 저장소, Git repository, git init, git clone ]
description: Git 저장소를 생성하고 버전관리 동작 원리를 알아보자.
---

> 1. [Git 저장소 생성하기](#git-저장소-생성하기 "Navigate to Initializing Git repository")
2. [Git 저장소 복제하기](#git-저장소-복제하기 "Navigate to Copying Git repository")
3. [.git 디렉토리를 파헤쳐보자](#git-디렉토리를-파헤쳐보자 "Navigate to Let's dig into the .git directory")
4. [Git 저장소의 구조](#git-저장소의-구조 "Navigate to The structure of git repository")
- [작업 디렉토리](#working-directory "Navigate to Working directory")
- [스테이지 영역](#stage-area "Navigate to Stage area")
- [로컬 저장소](#local-repository "Navigate to Local repository")
5. [Git 저장소 동작 원리](#git-저장소-동작-원리 "Navigate to The principle of git repository")
- [추적 상태](#tracked--untracked-status "Navigate to Tracking status")
- [수정 상태](#modified--unmodified-status "Navigate to Modifying status")
- [스테이지 상태](#stage--unstage-status "Navigate to Stage status")

---

#### <span style="color: brown">**Git 저장소 생성하기**</span>
평범한 디렉토리를 Git 저장소로 둔갑시켜 주는 마법의 명령어는 다음과 같다.
```bash
git init <경로>
```
- init 명령어를 처음 실행하면 경로 안에 <span style="color: #8D4801">**새로운 .git 디렉토리를 생성**</span>한다. 일반적으로 이미 Git 저장소인 경로에 실행할 경우 이미 .git 디렉토리가 존재하며, 그 안에 Git 저장소에 필요한 모든 정보가 포함되어 있으므로 실행되더라도 아무런 변화가 없을 수 있다.
- 경로를 입력하지 않으면 현재 디렉토리에서 초기화된다.
- 항목 이름이 .으로 시작하는 항목들은 운영체제의 구분 없이 <span style="color: #8D4801">**숨겨져 있어서**</span> 일반적인 방법으로는 찾을 수 없다.
  - <span style="color: #8D4801">**Windows**</span>의 경우 메뉴 > 보기 > 숨긴 항목 보기에 체크하면 확인할 수 있다.
  - <span style="color: #8D4801">**Mac**</span>의 경우 command+shift+. 단축키를 사용하여 숨겨진 항목들이 보이게 할 수 있다.
  - <span style="color: #8D4801">**경로(path)**</span> 상의 .은 <span style="color: #8D4801">**현재 경로**</span>를 뜻한다. 그러나, <span style="color: #8D4801">**파일 및 디렉토리**</span> 앞의 .은 <span style="color: #8D4801">**숨겨진 파일 및 디렉토리**</span>를 의미한다.
- ls -a 옵션을 통해 숨겨진 항목을 출력해야만 확인할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-09-04-Git-repository-concept-and-principle/git-command-init.jpg" title="Git command to initialize the directory as git repository" alt="Git command to initialize the directory as git repository">

---

#### <span style="color: brown">**Git 저장소 복제하기**</span>
다음으로 이미 존재하는 외부의 저장소를 복제해 오는 명령어이다.
```bash
git clone <원격 저장소 URL> <새 디렉토리명>
```
- clone 명령어를 실행하면 <span style="color: #8D4801">**현재 디렉토리에 원격 저장소를 복제한다.**</span> 복제한 디렉토리 안에는 당연히 .git 디렉토리가 존재하며 기존 원격 저장소의 이력을 저장하고 있다.
- 새 디렉토리명을 입력하지 않으면 원격 저장소의 디렉토리 명이 기본값으로 설정된다.
- 원격 저장소의 이름은 origin이 기본값으로 설정된다.
<img src="{{site.baseurl}}/images/posts/2023-09-04-Git-repository-concept-and-principle/git-command-clone.jpg" title="Git command to copy the remote directory to local repository" alt="Git command to copy the remote directory to local repository">

---

#### <span style="color: brown">**.git 디렉토리를 파헤쳐보자**</span>
- 처음 git init을 하면 .git 디렉토리가 생성되고 이 디렉토리가 버전관리에 관련된 모든 정보를 가진다는 얘기를 들었을 때 호기심이 일었던 것 같다. 대체 이 안에 무엇이 들어있고 어떻게 생겼길래 새로운 데이터가 생겨나기도 하고 실수를 만회하고자 과거의 데이터로 돌아가기도 하고 할 수 있는 걸까? 테이블을 통해 간단히 알아보자.

- 저장소를 처음 초기화했을 때 .git directory 안에 생성되는 항목들이다.

<img src="{{site.baseurl}}/images/posts/2023-09-04-Git-repository-concept-and-principle/things-inside-of-git-directory-when-initialized.jpg" title="Files and directories in .git directory when it's initialized" alt="Files and directories in .git directory when it's initialized">

| 항목 | 설명 |
|:---:|:---:|
| **config** | 저장소의 환경설정 파일이다. |
| **description** | Git 원격 저장소의 설명을 담고 있는 파일이다. 이 파일은 주로 웹 인터페이스에서 Git 저장소를 표시할 때 사용된다. |
| **HEAD** | 현재 작업 중인 브랜치를 가리키는 포인터이다. |
| **hooks** | Git 훅 스크립트가 저장되는 디렉토리이다. commit이나 merge 등의 이벤트 발생 시 실행되는 스크립트를 작성하여 저장할 수 있다. |
| **info** | 저장소의 부가적인 정보를 담고 있는 디렉토리이다. 예를 들어 exclude 파일과 alternates 파일이 여기에 저장된다. |
| **objects** | Git이 관리하는 모든 객체가 저장되는 디렉토리이다. 객체는 blob(파일 내용), tree(디렉토리 구조), commit(커밋 정보) 등을 포함한다. (보이기엔 정체불명의 파일과 디렉토리가 엄청 많다.) |
| **refs** | 참조(브랜치나 태그) 정보를 담고 있는 디렉토리이다. heads 디렉토리는 로컬 브랜치의 정보를, remotes 디렉토리는 원격 브랜치의 정보를, tags 디렉토리는 태그의 정보를 담고 있다. |

<br>

- 어느 정도 사용한 저장소의 .git directory안에 생성되어 있는 항목들이다. 위에 없었던 항목들만 살펴보자.

<img src="{{site.baseurl}}/images/posts/2023-09-04-Git-repository-concept-and-principle/things-inside-of-git-directory.jpg" title="Files and directories in .git directory" alt="Files and directories in .git directory">

| 항목 | 설명 |
|:---:|:---:|
| **COMMIT_EDITMSG** | Git 커밋 메시지를 작성하는 데 사용되는 임시 파일이다. 커밋을 만들 때 사용자가 지정한 에디터에서 커밋 메시지를 편집하는 동안, 이 파일에 작성된 내용이 편집기에 표시된다. |
| **FETCH-HEAD** | 원격 저장소에서 가져온 브랜치의 상태 정보를 담고 있는 파일이다. git fetch 명령을 실행하면 원격 저장소의 변경 사항이 이 파일에 기록된다. |
| **index** | Git의 Stage 영역에 있는 파일들의 정보를 담고 있는 파일이다. Stage 영역에 추가된 파일들의 이름, 경로, 상태 등이 이 파일에 저장된다. |
| **index 2** | index 파일과 마찬가지로 스테이징 영역에 있는 파일들의 정보를 담고 있는 파일이다. 일반적으로 사용되지 않는 파일로, 일부 Git 클라이언트나 GUI 도구에서 사용되는 경우가 있다. |
| **logs** | 로그 파일을 저장하는 디렉토리이다. 주로 HEAD와 브랜치의 변경 이력이 이 디렉토리에 저장된다. |
| **ORIG_HEAD** | 이전에 git reset이나 git rebase 등의 명령을 사용하여 이동된 HEAD의 이전 위치를 가리키는 참조이다. |
| **packed-refs** | Git의 참조(브랜치, 태그 등)들을 압축해서 저장하는 파일이다. 이 파일은 참조의 목록과 각각 참조의 해시값을 포함하고 있다. |
| **sourcetreeconfig** | Sourcetree 프로그램이 사용하는 설정 파일이다. 이 파일은 사용자 지정 설정이나 환경 변수 등을 포함할 수 있다. Sourcetree 프로그램이 없거나 사용하지 않는다면 이 파일은 사용되지 않는다. |

<br>

- 무언가 많다는 건 알겠는데 아직 뭐가 뭔지는 모르겠다. 괜찮다. 어차피 우리가 작업할 때 이 디렉토리를 직접적으로 편집해야 할 일은 거의 없다.

---

#### <span style="color: brown">**Git 저장소의 구조**</span>
<span style="color: #8D4801">**Git 저장소**</span>는 크게 <span style="color: #8D4801">**3가지**</span>로 나뉜다.

<img src="{{site.baseurl}}/images/posts/2023-09-04-Git-repository-concept-and-principle/the-structure-of-git-repository.png" title="The structure of git repository" alt="The structure of git repository">

##### <span style="color: green">**Working directory**</span>
- init 명령어 실행 시 Original directory를 기반으로 Working directory가 존재한다. (쉽게 생각하자면 그냥 일반 directory라고 생각하면 된다. 당연하다. 아직 아무것도 수정되지 않았다.)
- Working directory는 현재 작업 중인 <span style="color: #8D4801">**실제 파일들이 위치하는 directory**</span>이며 변경된 파일이나 새로운 파일이 추가되는 곳이다. <span style="color: #8D4801">**기본적으로 Git은 이곳에 있는 파일을 추적하거나 관리하진 않는다.**</span>
- <span style="color: #8D4801">**추가, 수정된 파일들을 add 명령어를 통해서 추적 상태로 만들고 Stage area로 이동시킨다.**</span>

<br>

##### <span style="color: red">**Stage area**</span>
- <span style="color: #8D4801">**가상의 임시 저장 공간**</span>이다.(가상이라고 적었듯이 실제 파일이 존재하는 것이 아니다.)
- 추적 상태로 <span style="color: #8D4801">**수정된 파일들은 Unstage 상태로 변한다.**</span> (다시 add 명령어를 통해서 Stage 상태로 만들어야 한다.)
- 이 영역의 파일들은 오로지 다음 commit을 위해 존재한다. <span style="color: #8D4801">**commit 명령어가 실행되면 모든 파일을 Local repository로 보내고 영역을 비운다.**</span>

<br>

##### <span style="color: darkorange">**Local repository**</span>
- commit 된 파일의 버전들이 저장되는 곳이다. <span style="color: #8D4801">**모든 커밋된 파일의 스냅샷이 저장되며**</span>, Working directory로 부터의 변경 사항은 여기서 실제로 커밋된다.
- 위의 그림에서 Base data가 git 저장소 초기화 전 시점이라고 가정하고 현재 Local repository에 기록되어 있는 모든 변경 사항을 Base data에 적용한 결과물이 저장돼 있는 것이 Working directory이다. 즉, Local repository에 이력이 수정되면 실제 Working directory에도 수정된 결과물이 저장되어 있다.

---

#### <span style="color: brown">**Git 저장소 동작 원리**</span>
<span style="color: #8D4801">**Git 저장소 내 파일들**</span>은 크게 <span style="color: #8D4801">**3종류**</span>의 상태를 갖는다.

<img src="{{site.baseurl}}/images/posts/2023-09-04-Git-repository-concept-and-principle/the-principle-of-git-repository.png" title="The principle of git repository" alt="The principle of git repository">

##### **<span style="color: dodgerblue">Tracked</span><span style="color: #8D4801"> / </span><span style="color: steelblue">Untracked</span><span style="color: #8D4801"> status</span>**
- 앞에서 얘기했듯이 Git은 Working directory에 있는 파일을 추적하지 않는다. 즉 <span style="color: #8D4801">**모든 새로운 파일들은 기본적으로 Untracked 상태이다.**</span>
- 사용자가 Git에게 버전관리가 있어야 하는 파일들에 대해서 추적을 요청해야 파일의 변경이력이 추적된다. <span style="color: #8D4801">**파일을 Tracked 상태로 변경하여 Git에게 관리를 부탁하는 명령어가 add 명령어이다.**</span>

<br>

##### **<span style="color: limegreen">Modified</span><span style="color: #8D4801"> / </span><span style="color: lightseagreen">Unmodified</span><span style="color: #8D4801"> status</span>**
- 단어의 의미 그대로 <span style="color: #8D4801">**파일이 수정된 상태인지 아닌지**</span>를 나타낸다. 기준이 되는 시점은 파일이 처음 Tracked 상태가 된 시점과 이미 Tracked 상태의 파일이라면 가장 최근에 Modified 상태에서 Unmodified 상태가 된 시점을 기준으로 수정 여부를 판단한다.

<br>

##### **<span style="color: red">Stage</span><span style="color: #8D4801"> / </span><span style="color: hotpink">Unstage</span><span style="color: #8D4801"> status</span>**
- 쉽게 생각하면 <span style="color: #8D4801">**파일의 commit이 가능한 상태(Stage) or 불가능한 상태(Unstage)이다.**</span> 위의 그림을 보면서 이해해 보자.
  1. 먼저 Git이 파일의 버전관리를 하기 위해선 반드시 add 명령어를 통해 Tracked 상태가 되어야 한다고 했다. 즉, <span style="color: #8D4801">**add 되지 않은 Untracked 파일들은 모두 Unstage 상태이다.**</span>
  2. <span style="color: #8D4801">**새로운 파일이 처음 add 되었을 때 Stage 상태가 된다.**</span> 추적됨과 동시에 수정되지 않은 상태이기 때문이다. (방금 추가되었으므로 수정된 이력이 없다.)
  3. <span style="color: #8D4801">**이미 추적 중이던 파일이 사용자에 의해서 수정되면 Modified 상태가 되므로 Unstage 상태가 된다.**</span> 이런 상황에는 해당 파일에 add 명령어를 사용하면 다시 Stage 상태로 만들 수 있다.

---

#### 마무리하며...
이번 포스트에서는 Git 저장소를 생성하고 그 구조와 원리에 대하여 알아보았다. 필자는 처음 Git에 입문할 때 "SVN이라는 버전관리 도구를 사용해 본 경험이 있으니까 비슷한 구조가 아닐까?"라는 막연한 생각으로 시작했다가 도무지 Git이 어떻게 동작하는 것인지 이해가 안 가서 어려움을 겪었던 기억이 있다. 그러나, 그것은 마냥 명령어 암기에 집중된 공부 방식이 문제였던 것 같다. 개발자가 본인이 사용하는 명령어가 무엇인지 모르고 사용하는 것만큼 위험한 게 또 있을까? 다행히 이후에 바탕이 되는 개념을 이해하려고 노력한 뒤부터 Git에 점점 친숙해질 수 있었던 것 같다. 다음 포스트에서는 생성한 Git 저장소에 실제 작업을 진행하고 알아본 이론을 적용해 보자.