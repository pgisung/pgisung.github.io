---
layout: post
title: 7. 원격 저장소와 Commit 주고받기
date: 2023-09-20 08:31:44 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, 깃, 깃허브, personal access tokens, git remote, git push, git pull, git fetch]
description: Github에 접속하여 원격 저장소를 생성해 보자. 기록해 둔 commit들을 원격 저장소로 전송하고 다시 로컬 저장소에 내려받아 보자.
---

> 1. [원격 저장소 생성하기](#원격-저장소-생성하기 "Navigate to Creating remote repository")
- [내 컴퓨터에 원격 저장소를 생성해 보자](#내-컴퓨터에-원격-저장소를-생성해-보자 "Navigate to Let's make remote repository to own computer")
- [Github 회원가입](#github-회원가입 "Navigate to Signing up to Github")
- [Personal access tokens](#personal-access-tokens "Navigate to Personal access tokens")
- [Github 서버에 원격 저장소를 생성해 보자](#github-서버에-원격-저장소를-생성해-보자 "Navigate to Let's make remote repository to server in Github")
2. [원격 저장소 관리하기](#원격-저장소-관리하기 "Navigate to Managing remote repository")
3. [원격 저장소와 작업하기](#원격-저장소와-작업하기 "Navigate to Working with remote repository")
4. [협업시 작업 순서](#협업시-작업-순서 "Navigate to The sequence to work when cooperating")

---

#### 들어가기 전에
- 원격 저장소와 commit을 주고받으려면 일단 원격 저장소가 존재해야 한다. 먼저, 원격 저장소를 생성해 보자. 원격 저장소는 당장 내 컴퓨터 경로내에 생성할 수도 있고 Github와 같은 Git 호스팅 서버를 이용할 수도 있다.

---

#### <span style="color: brown">**원격 저장소 생성하기**</span>
- <span id="내-컴퓨터에-원격-저장소를-생성해-보자"></span>**내 컴퓨터에 원격 저장소를 생성해 보자**
```bash
git remote add <원격 저장소 이름> <디렉토리 경로>
```
  - 내 컴퓨터 내에 디렉토리 경로에 원격 저장소를 생성하는 명령어이다. 내 컴퓨터를 NFS(Network File System) 등의 서버로 이용할 때 사용할 수 있다. 그러나, <span style="color: #8D4801">**모든 데이터가 내 컴퓨터에 집중되어 있기 때문에 그에 따르는 위험 또한 존재**</span>하므로 주의하여 사용하여야 한다.

<br>

- <span id="github-회원가입"></span>**Github 회원가입**

  1. 이제 서버에 내 원격 저장소를 생성하기 위해 대표적인 Git 호스팅 플랫폼인 Github에 회원가입을 해보자. 이메일을 입력하고 Sign up 버튼을 클릭하면 바로 다음 페이지로 진행된다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/signing-up-to-github-official-website-1.webp" title="Home page of Github official website" alt="Home page of Github official website">

  2. 사용할 비밀번호와 닉네임을 입력하고 Continue 버튼을 클릭한다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/signing-up-to-github-official-website-2.webp" title="Sign up page to fill essential informations of Github official website" alt="Sign up page to fill essential informations of Github official website">

  3. 확인 버튼을 클릭하면 나오는 간단한 퀴즈를 풀어서 매크로가 아님을 증명한다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/signing-up-to-github-official-website-3.webp" title="Checking if it is a person while signing up" alt="Checking if it is a person while signing up">

  4. 입력한 이메일을 확인하여 도착해있는 이메일 코드를 입력하면 회원가입이 완료된다. 
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/signing-up-to-github-official-website-4.webp" title="Page to fill email code in order to qualify signing up" alt="Page to fill email code in order to qualify signing up">

<br>

- <span id="personal-access-tokens"></span>**Personal access tokens**

  - <span style="color: #8D4801">**Github의 API를 사용하여 원격 저장소에 명령어를 사용하여 작업을 수행하려면 이 Personal access token이 필요**</span>하다. 터미널 환경에서 인증 화면이 표시되었을 때 아이디와 비밀번호가 아닌 이 token을 입력해야 권한이 생긴다. 그럼 이제 Personal access token을 만들어보자.

  <br>
  1. 먼저 처음 Github에 로그인했을 때 나타나는 홈 화면 우측 상단의 프로필사진을 클릭한다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/setting-personal-access-token-1.webp" title="Home page when login status to Github" alt="Home page when login status to Github">

  1. 팝업되는 메뉴에서 Settings 메뉴를 클릭한다.
<br>
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/setting-personal-access-token-2.webp" title="Popup menu when profile picture clicked in Github" alt="Popup menu when profile picture clicked in Github" width="30%" style="display: block; margin: 0 auto; margin-top: 1em;">

  1. Settings 페이지에서 좌측 가장 하단의 Developer settings 버튼을 클릭한다.
<br>
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/setting-personal-access-token-3.webp" title="Menu in settings page in Github" alt="Menu in settings page in Github" width="30%" style="display: block; margin: 0 auto; margin-top: 1em;">

  1. 사진의 순서대로 버튼을 클릭하여 새로운 token 생성을 진행한다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/setting-personal-access-token-4.webp" title="Developer settings page in Github" alt="Developer settings page in Github">

  1. 팝업되는 메뉴에서 하단의 classic token을 선택한다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/setting-personal-access-token-5.webp" title="Popup menu when generate new token clicked" alt="Popup menu when generate new token clicked" style="display: block; margin: 0 auto; margin-top: 1em;">

  1. 
    - 생성하고자 하는 token의 이름을 목적에 따라 입력한다.
    - token의 유효기간을 설정한다. (보안을 위해서는 주기적으로 바꿔주는게 좋을 수 있으나... 필자는 무기한으로 사용하고 있다.)
    - 다음으로 아래에 옵션이 많지만 초심자의 경우엔 일단 repository에만 접근할 수 있어도 된다. (추후 token 적용 범위 수정도 가능하다.)
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/setting-personal-access-token-6.webp" title="Page to fill information about new personal access token" alt="Page to fill information about new personal access token">

  1. token 생성 버튼을 클릭한다.
<br>
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/setting-personal-access-token-7.webp" title="Generate token button" alt="Generate token button" style="display: block; margin: 0 auto; margin-top: 1em;">

  1. token 생성이 완료되었다. <span style="color: #8D4801">**token의 코드는 지금 단 한번만 보여주므로 반드시 안전한 곳에 기록해둬야한다.**</span> (터미널 환경에서 인증시 사용될 수 있다.)
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/setting-personal-access-token-8.webp" title="Page when completed generating new token" alt="Page when completed generating new token">

<br>

- <span id="github-서버에-원격-저장소를-생성해-보자"></span>**Github 서버에 원격 저장소를 생성해 보자**

  1. 자 이제 회원가입도 완료되었고 원격 저장소를 생성해 보자. 먼저 처음 Github에 로그인했을 때 나타나는 홈 화면 우측 상단의 프로필사진을 클릭한다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/creating-remote-repository-1.webp" title="Home page when login status to Github" alt="Home page when login status to Github">

  1. 팝업되는 메뉴에서 Your repositories 메뉴를 클릭한다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/creating-remote-repository-2.webp" title="Popup menu when profile picture clicked in Github" alt="Popup menu when profile picture clicked in Github" width="30%" style="display: block; margin: 0 auto; margin-top: 1em;">

  1. 우측 상단의 새 원격 저장소 생성 버튼을 클릭한다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/creating-remote-repository-3.webp" title="Personal repositories page in Github" alt="Personal repositories page in Github">

  1. 
    - 원하는 원격 저장소의 이름을 입력한다.
    - Private 저장소는 유료 결제를 해야만 선택할 수 있다. 선택되어있는 Public을 그대로 두면 된다.
    - README file이란 이 저장소의 프로젝트를 소개할 수 있는 markdown 문서이다. 필요하다면 생성한다.
    - 이전 포스트에서 생성해보았던 .gitignore 파일을 여기서 생성할 수 있다. <span style="color: #8D4801">**선택하는 언어에 따라 default로 설정되어있는 값들이 존재해서 편리**</span>하다. 무엇을 추적에서 제외해야할지 애매하다면 여기서 파일을 생성하자.
    - 프로젝트에 적용될 라이센스 종류에 따라 파일을 추가할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/creating-remote-repository-4.webp" title="Page to fill information about new remote repository" alt="Page to fill information about new remote repository">

  1. 새 원격 저장소 생성이 완료되었다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/creating-remote-repository-5.webp" title="New remote repository page" alt="New remote repository page">

---

#### <span style="color: brown">**원격 저장소 관리하기**</span>
- **원격 저장소 목록**
```bash
git remote
```
  - 원격 저장소의 이름을 목록으로 출력한다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-remote.webp" title="Git command to display list of name for remote repositorie" alt="Git command to display list of name for remote repositorie">

<br>

- ```bash
git remote -v
```
  - 원격 저장소의 이름과 URL을 목록으로 출력한다. 
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-remote-v.webp" title="Git command to display list of name and URL for remote repositorie" alt="Git command to display list of name and URL for remote repositorie">

<br>

- **로컬 저장소와 원격 저장소 연결**
```bash
git remote add <원격 저장소 이름> <원격 저장소 URL>
```
  - Github 서버의 원격 저장소를 연결하는 명령어이다. 서버의 데이터와 로컬의 데이터로 나뉘어져서 관리되므로 내 컴퓨터에 원격 저장소를 생성하는 것보다 상대적으로 안전하며 저장소가 서버에 존재하기 때문에 다른 개발자들과의 소통 또는 협업이 가능하다.
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-remote-add.webp" title="Git command to add remote repository from server in Github" alt="Git command to add remote repository from server in Github">

<br>

- **원격 저장소 이름 변경**
```bash
git remote rename <변경 전 원래 이름> <변경할 이름>
```
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-remote-rename.webp" title="Git command to rename remote repository" alt="Git command to rename remote repository">

<br>

- **원격 저장소 자세한 정보 출력**
```bash
git remote show <원격 저장소 이름>
```
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-remote-show.webp" title="Git command to display details about the remote repository" alt="Git command to display details about the remote repository">

<br>

- **원격 저장소와의 연결 삭제**
```bash
git remote rm <원격 저장소 이름>
```
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-remote-rm.webp" title="Git command to remove remote repository from local" alt="Git command to remove remote repository from local">

<br>

- **원격 저장소와 추적 브랜치 동기화**
```bash
git remote prune <원격 저장소 이름>
```
  - 로컬 저장소와 원격 저장소의 추적 브랜치를 확인하고 원격 저장소에 더 이상 존재하지 않는 추적 브랜치를 로컬 저장소에서 제거한다.

  1. 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/all-branches-list-before-remote-prune.webp" title="Git all branches list before git remote prune command" alt="Git all branches list before git remote prune command">

  1. 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-remote-prune.webp" title="Git command to remove branch that currently doesn't exist in remote repository" alt="Git command to remove branch that currently doesn't exist in remote repository">

  1. 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/all-branches-list-after-remote-prune.webp" title="Git all branches list after git remote prune command" alt="Git all branches list after git remote prune command">

---

#### <span style="color: brown">**원격 저장소와 작업하기**</span>
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/how-to-transfer-commit-between-local-repository-and-remote-repository.webp" title="Flow chart of data between local repository and remote repository" alt="Flow chart of data between local repository and remote repository">
- 원격 저장소와 작업시 데이터의 흐름도를 그려봤다. <span style="color: dodgerblue">**Local branch**</span>와 <span style="color: darkorange">**tracking branch**</span>는 이해를 돕기위해 따로 작성했지만 실제 존재하는 위치는 <span style="color: green">**local repository**</span> 안에 저장되어 있어서 **점선**으로 표시했다.

<br>

- **원격 저장소에 전송하기**
```bash
git push <원격 저장소 이름> <로컬 브랜치 이름>
```
  - 로컬 브랜치의 데이터를 원격 저장소로 전송하는 명령어이다.
  - <span style="color: #8D4801">**다른 개발자들과 협업중일 경우 영향을 줄 수 있으므로 신중하게 사용해야한다.**</span>

  1. 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/before-git-command-push.webp" title="" alt="">

  1. 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-push.webp" title="Git command to transfer datas to remote repository from local repository" alt="Git command to transfer datas to remote repository from local repository">

  1. 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/after-git-command-push.webp" title="" alt="">

<br>

- ```bash
git push -d <원격 저장소 이름> <로컬 브랜치 이름>
```
  - 더이상 필요하지 않은 로컬 브랜치를 원격 저장소에서 삭제하는 옵션이다.
  - <span style="color: #8D4801">**원격 저장소에서 해당 로컬 브랜치를 다시 복구할 수 없으므로 신중하게 사용해야 한다.**</span>

  1. 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/before-git-command-push-d.webp" title="" alt="" width="30%" style="display: block; margin: 0 auto; margin-top: 1em;">

  1. 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-push-d.webp" title="Git command to remove unnecessary local branch in remote repository" alt="Git command to remove unnecessary local branch in remote repository">

  1. 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/after-git-command-push-d.webp" title="" alt="" width="30%" style="display: block; margin: 0 auto; margin-top: 1em;">

<br>

- ```bash
git push --tags <원격 저장소 이름> <로컬 브랜치 이름>
```
  - 로컬 저장소에 있는 <span style="color: #8D4801">**모든 태그**</span>를 원격 저장소로 전송하는 옵션이다. 기본적으로 옵션 없는 "git push" 명령어로는 태그를 원격 저장소로 전송하지 않는다. 그러므로 태그를 전송해야할 때 이 옵션을 사용할 수 있다.

  1. 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/before-git-command-push-tags.webp" title="" alt="">

  1. 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-push-tags.webp" title="Git command to transfer tags to remote repository from local repository" alt="Git command to transfer tags to remote repository from local repository">

  1. 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/after-git-command-push-tags.webp" title="" alt="">

<br>

- ```bash
git push -f <원격 저장소 이름> <로컬 브랜치 이름>
```
  - 강제로 전송을 실행하는 옵션이다.
  - 이미 push한 적이 있는 commit을 amend했거나 rebase, cherry-pick 등의 명령어 사용으로 <span style="color: #8D4801">**기존 commit의 해시값이 변경되었을 경우**</span> 이 옵션을 통해 push 해야하는데 이런 경우엔 <span style="color: #8D4801">**매우 주의해야한다.**</span>

  1. 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/before-git-command-push-f.webp" title="" alt="">

  1. 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-push-f.webp" title="Git command to force to transfer datas to remote repository from local repository" alt="Git command to force to transfer datas to remote repository from local repository">

  1. 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/after-git-command-push-f.webp" title="" alt="">

<br>

- ```bash
git push -u <원격 저장소 이름> <로컬 브랜치 이름>
```
  - 로컬 브랜치의 데이터를 원격 저장소로 전송하면서, <span style="color: #8D4801">**해당 로컬 브랜치의 추적 브랜치를 설정하는 옵션이다.**</span>

  1. 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/before-git-command-push-u.webp" title="" alt="">

  1. 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-push-u.webp" title="Git command to set tracking branch for the local branch as well as to transfer datas to remote repository from local repository" alt="Git command to set tracking branch for the local branch as well as to transfer datas to remote repository from local repository">

  1. 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/after-git-command-push-u.webp" title="" alt="">

<br>

- **원격 저장소에서 내려받기**
```bash
git pull <원격 저장소 이름> <로컬 브랜치 이름>
```
  - 원격 저장소의 데이터를 로컬 브랜치로 내려받는 명령어이다.
  - <span style="color: #8D4801">**fetch 명령어와 merge 명령어의 혼용과 동일한 동작을 한다. merge 동작이 포함되어 있기 때문에 conflict가 발생할 수 있다.**</span>
  - <span style="color: #8D4801">**commit하지 않은 수정사항이 working directory에 존재할 경우 명령어가 실행되지 않으므로 해당 내용을 commit 하거나 stash로 임시 저장한 후에 pull 명령어를 실행해야 한다.**</span>

  1. 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/before-git-command-pull.webp" title="" alt="">

  1. 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-pull.webp" title="Git command to fetch datas and merge with local branch" alt="Git command to fetch datas and merge with local branch">

  1. 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/after-git-command-pull.webp" title="" alt="">

<br>

- ```bash
git pull --allow-unrelated-histories <원격 저장소 이름> <로컬 브랜치 이름>
```
  - <span style="color: #8D4801">**관계 없는 commit 이력의 병합을 허용하는 옵션이다. 관계 없다는 의미는 병합하려는 두 개의 이력이 공통 조상 commit을 갖고 있지 않음을 뜻한다.**</span>
  - 보통 처음 로컬 저장소를 "git init" 명령어를 통해 생성하고 Github에 새 원격 저장소를 생성한 후 연결하여 처음 내려받으려 시도할 경우 이 옵션을 사용해야 내려받을 수 있다. 새로 생성된 두 저장소가 공통된 base를 갖고있을리 없기 때문이다.

  1. 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/before-git-command-pull-allow-unrelated-histories.webp" title="" alt="">

  1. 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-pull-allow-unrelated-histories.webp" title="Git command to fetch datas which are unrelated with local history and merge with local branch" alt="Git command to fetch datas which are unrelated with local history and merge with local branch">

  1. 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/after-git-command-pull-allow-unrelated-histories.webp" title="" alt="">

<br>

- ```bash
git pull -f <원격 저장소 이름> <로컬 브랜치 이름>
```
  - 원격 저장소의 데이터로 로컬 브랜치를 강제로 덮어쓰는 옵션이다. 덮어쓴다고 하지만 원격 저장소에 존재하지 않는 로컬 브랜치의 파일들이 삭제되거나 하진 않는다. 다만, 로컬 브랜치와 원격 저장소 양 쪽에 존재하는 파일의 경우 원격 저장소의 최신 commit으로 로컬 브랜치의 파일들이 덮어씌워진다.

  1. 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/before-git-command-pull-f.webp" title="" alt="">

  1. 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-pull-f.webp" title="Git command to force both actions fetching datas and merging with local branch" alt="Git command to force both actions fetching datas and merging with local branch">

  1. 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/after-git-command-pull-f.webp" title="" alt="">

<br>

- **원격 저장소에서 일단 가져오기**
```bash
git fetch <원격 저장소 이름> <로컬 브랜치 이름>
```
  - 원격 저장소의 데이터를 추적 브랜치로 가져오는 명령어이다.

  1. 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/before-git-command-fetch.webp" title="" alt="">

  1. 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-fetch.webp" title="Git command to bring datas to tracking branch" alt="Git command to bring datas to tracking branch">

  1. 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/after-git-command-fetch.webp" title="" alt="">

<br>

- ```bash
git fetch -p <원격 저장소 이름>
```
  - 원격 저장소의 데이터를 추적 브랜치로 가져오면서 원격 저장소에 더 이상 존재하지 않는 추적 브랜치를 로컬 저장소에서 제거하는 옵션이다.

  1. 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/before-git-command-fetch-p.webp" title="" alt="">

  1. 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-fetch-p.webp" title="Git command to remove tracking branches which doesn't exist for now and to bring datas to tracking branch" alt="Git command to remove tracking branches which doesn't exist for now and to bring datas to tracking branch">

  1. 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/after-git-command-fetch-p.webp" title="" alt="">

<br>

- **가져온 데이터 수동으로 병합하기**
```bash
git merge <원격 저장소 이름/로컬 브랜치 이름>
```
  - 추적 브랜치의 데이터를 로컬 브랜치와 병합하는 명령어이다.
  - merge 명령어의 여러가지 자세한 사용법은 추후 포스트로 따로 다룰 예정이다.

  1. 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/before-git-command-merge.webp" title="" alt="">

  1. 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/git-command-merge.webp" title="Git command to merge datas between tracking branch and local branch" alt="Git command to merge datas between tracking branch and local branch">

  1. 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/after-git-command-merge.webp" title="" alt="">

---

#### <span style="color: brown">**협업시 작업 순서**</span>
<img src="{{site.baseurl}}/images/posts/2023-09-20-Transfering-commit-with-remote-repository/the-sequence-to-cooperate-to-work-in-one-branch.webp" title="" alt="">
- 실제 협업에서는 각자 브랜치를 생성해서 따로 작업하고 pull request를 통해 병합할 가능성이 높으나 만약 하나의 브랜치에 여러명이 작업할 경우를 가정해보자.
- 기본적으로 원격 저장소에는 다수의 개발자가 동시에 commit을 push할 수 없다. 그러므로, 여러 명이 협력하여 개발할 때에는 순차적으로 push를 진행해야 한다. 또한 <span style="color: #8D4801">**원격 저장소에 push하기 위해서는 로컬 저장소를 최신 상태로 유지해야 한다.**</span> 만약 commit이 순차적이지 않을 경우에 Git은 push 명령어 실행을 거부한다. 로컬 저장소가 최신 상태에서만 push를 허용하는 것은 충돌을 최소화하기 위해서이다.
- 최대한 충돌을 피하는 방법은 로컬과 원격 저장소를 빈번하게 최신으로 유지해주는 것이다. 포인트는 <span style="color: #8D4801">**Working directory에서 작업을 시작하기 전에 무조건 pull 명령어를 실행**</span>하고 작업내역을 <span style="color: #8D4801">**commit한 이후엔 또 다시 pull 명령어를 실행**</span>한 후에 push 명령어를 실행하는 것이다.
- ```
pull ⇒ write code ⇒ add ⇒ commit ⇒ pull ⇒ push
```

---

#### 마무리하며...
이번 포스트에서는 "나"만이 존재하는 로컬 환경을 벗어나 다른 개발자들과 협업이 가능한 원격 저장소를 생성하고 원격 저장소와 작업시 필수적인 명령어도 알아보았다. 첫 포스트부터 오늘까지 알아본 명령어들만 사용할 줄 알아도 이제 본인의 개발 이력정도는 스스로 관리할 수 있을 정도의 수준이 되었다. 하지만 완벽하게 모든 버전관리 issue를 해결하기엔 아직 모자라다. 오늘 내용들 중에서도 추적 브랜치, 태그 등 아직 모르는 내용들이 있을 수 있다. 천천히 전부 알아갈 예정이므로 초조할 필요없다. 다음 포스트에서는 commit 못지않게 중요한 개념인 branch에 대해서 심층탐구를 해보자.