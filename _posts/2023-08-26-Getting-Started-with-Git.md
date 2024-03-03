---
layout: post
title: Git을 시작해보자
date: 2023-08-26 15:29:00 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, Software Version Management, 깃, 깃허브, 버전관리 ]
description: Windows / Mac 환경에서 Git 설치 및 환경설정을 해보자.
---

> 1. [Windows 환경에서 Git 설치 방법](#windows-환경에서-git-설치-방법 "Navigate to The way to install Git in Windows")
<br>
2. [Mac 환경에서 Git 설치 방법](#mac-환경에서-git-설치-방법 "Navigate to The way to install Git in Mac")
<br>
3. [Git 입문하기](#git-입문하기 "Navigate to Getting started with Git")

---

#### <span style="color: #8D4801">**Windows 환경에서 Git 설치 방법**</span>
일단 Git을 시작하기 위해 설치해 보자.
- **설치 파일 다운로드**
<br>
먼저 Git 공식 웹사이트([https://git-scm.com][git-official-website-link])에 접속하여 Windows 용 설치파일을 다운받는다.

<div class="image-slider-auto">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-official-website-1.png" title="Git official website" alt="Git official website">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-official-website-2.png" title="Download page in Git official website" alt="Download page in Git official website">
</div>

<br>

- **설치**
<br>
다음으로 다운받은 설치파일을 실행하여 설치를 진행한다. 아래는 간단한 설명을 붙인 설치 과정이다.

  1. GNU 오픈 소스 라이선스 관련 약관이다. 동의한다면 Next를 누르고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-1.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">
  
  1. Git이 설치될 경로이다. 원하는 경로가 따로 있다면 이곳에서 변경하면 된다. 보통은 default 경로로 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-2.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">

  1. 이미 Git의 다양한 컴포넌트에 익숙하신 분들은 필요한 컴포넌트를 추가로 설치할 수 있다. 하지만 초심자는 그대로 Next를 누르고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-3.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">

  1. Git 프로그램에 대한 시작메뉴 폴더명을 다르게 지정할 수 있으나 그대로 진행하는 것을 추천한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-4.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">

  1. Git에서 텍스트를 이용한 작업이 필요할 때 사용할 편집기를 지정한다. 다른 외부 편집기를 사용하고 싶다면 직접 지정하고 아니면 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-5.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">

  1. <span style="color: #BA8E77">**새로운 워킹 디렉토리에 Git을 초기화할 때 default branch의 name을 Git에서 기본값으로 지정하는 명칭으로 할지 Custom할지 정하는 곳이다.**</span> 오래전 버전에선 해당 옵션이 존재하지 않아서 branch명이 자동으로 기본값으로 지정되던 시기가 있었는데, Git을 잘 모르던 시절에 인터넷 검색에 기대어 사용할 때 원격저장소의 브랜치명은 master로 되어있는데 main 브랜치에 push를 해서 동작이 안 되고 뭐가 문젠지 모르는 우스운 실수가 나왔었다. (지금은 웃지만... 당시엔 해결을 못해서 엄청난 스트레스였다...) 아무튼 어느 옵션을 선택하든 Git 명령어를 사용할 때 브랜치를 잘 확인하고 사용하자.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-6.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">

  1. Git bash 명령어를 실행할 수 있는 경로를 설정하는 화면으로 일반적으로 기본값으로 두고 진행하면 된다. 
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-7.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">
    - <span style="color: #BA8E77">**Use Git from Git Bash only**</span>: 오직 Git bash로만 Git을 사용할 수 있다.
    - <span style="color: #BA8E77">**Git from the command line and also from 3rd-party software**</span>: 기본값으로써 Git bash뿐만 아니라 Windows cmd 창에서도 git 명령어를 사용할 수 있다.
    - <span style="color: #BA8E77">**Use Git and optional Unix tools from the Command Prompt**</span>: Windows cmd 창에서도 유닉스 도구 명령어를 사용할 수 있다.

  1. OpenSSH 패키지를 설치 유무를 선택할 수 있다. 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-8.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">

  1. 서버 간 코드 이력 전송에 관련된 옵션이다. 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-9.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">

  1. 엔딩 라인 처리방식 옵션이다. 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-10.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">

  1. 터미널 에뮬레이터 선택 옵션이다. 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-11.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">

  1. pull 명령어가 성공적으로 실행될 수도 있지만 이력 간 충돌로 인해 오류가 생길 수 있다. 이 상황에 대한 동작을 선택할 수 있다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-12.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">
    - <span style="color: #BA8E77">**Fast-forward or merge**</span>: 브랜치가 생성된 커밋에 따라 순차적으로 분기하는 Fast-forward 방식으로 먼저 병합을 진행하고 동작이 불가능할 경우엔 수동 merge 진행
    - <span style="color: #BA8E77">**Rebase**</span>: 공통 조상 커밋인 base 커밋을 이동시키고 각 커밋들을 순차적으로 줄 세우고 동작이 불가능할 경우엔 실패할 수 있음
    - <span style="color: #BA8E77">**Only ever fast-forward**</span>: 브랜치가 생성된 커밋에 따라 순차적으로 분기하는 Fast-forward 방식으로 무조건 병합을 진행. 동작이 불가능할 경우엔 실패할 수 있음

  1. Git 사용 중 자격증명 관리자 추가 여부 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-13.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">

  1. 파일시스템 캐싱, symbolic link 사용 유무이다. 잘 모른다면 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-14.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">

  1. 추가옵션들로써 잘 모른다면 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-15.png" title="Process to install Git on Windows" alt="Process to install Git on Windows">

  1. 드디어 Git 설치 완료
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-completed.png" title="Process to install Git on Windows" alt="The scene when Git installing completed on Windows">

<br>

- **설치 확인**
<br>
정상적으로 설치가 완료되었는지 확인을 해보자. 시작메뉴에 Git Bash를 포함한 프로그램들이 설치되었음을 확인할 수 있다. 이제 Git을 시작할 준비가 되었다.

<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/checking-successful-install.png" title="Checking successful install" alt="Checking successful install">
</div>

---

#### <span style="color: #8D4801">**Mac 환경에서 Git 설치 방법**</span>

- **Homebrew 설치**
<br>
이미 Homebrew가 설치되어 있다면 이 과정을 생략한다.
<br>
<br>
  - 먼저 MacOs용 패키지 관리 앱 Homebrew 공식 웹사이트([https://brew.sh][homebrew-official-website-link])에 접속하면 확인할 수 있는 설치 명령어를 버튼을 눌러 복사한다.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/homebrew-official-website.png" title="Homebrew official website" alt="Homebrew official website">
<br>

  - 터미널 또는 iTerm2를 실행하고 복사한 명령어를 붙여넣기해서 실행하면 설치가 진행된다. (추가로 노트북 계정 비밀번호 입력이 필요할 수 있다.)
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/command-to-install-homebrew.png" title="Command to install Homebrew" alt="Command to install Homebrew">
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
<br>

  - 아래의 명령어를 실행하여 Homebrew가 정상적으로 설치되었는지 확인할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/command-brew-version.png" title="Command to check the version of Homebrew" alt="Command to check the version of Homebrew">
```bash
brew --version
```

<br>

- **Git 설치**
<br>
MacOs에서의 Git 설치는 Windows와 비교했을 때 매우 간단하다.

  - 아래의 명령어를 실행하면 설치가 진행된다.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/command-install-git.png" title="Command to install Git" alt="Command to install Git">
```bash
brew install git
```
<br>

  - 아래의 명령어를 실행하여 Git이 정상적으로 설치되었는지 확인할 수 있다. 이 명령어는 설치된 Git의 버전 정보를 출력해 준다.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/command-git-version.png" title="Command to check the version of Git" alt="Command to check the version of Git">
```bash
git --version
```

---

#### <span style="color: #8D4801">**Git 입문하기**</span>
자 이제 설치는 끝났고 본격적으로 Git을 시작해 보자.

- Git의 기본적인 명령 구조는 다음과 같다.
```bash
git 명령어 옵션
```

- 기본적인 명령어의 종류는 아래의 명령을 실행하여 확인할 수 있다.
```bash
git --help
```
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/command-git-help.png" title="Command to check the significant commands in Git" alt="Command to check the significant commands in Git">
</div>

- 명령어 사용 시 옵션의 종류는 다음과 같다.

  - <span style="color: #BA8E77">**생략된 옵션**</span>
  - <span style="color: #BA8E77">**'-' : 짧은 옵션**</span>
  - <span style="color: #BA8E77">**'-&nbsp;-' : 긴 옵션**</span>
  - 명령어별 사용할 수 있는 옵션의 종류는 아래의 명령을 실행하여 확인할 수 있다. 
```bash
git 명령어 --help
또는
git 명령어 --help-option
```
  - 다음은 add 명령어의 옵션을 확인한 예시이다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/command-git-add-help-option.png" title="Command to check the options of add command" alt="Command to check the options of add command">
</div>

- 또한 명령어 사용 시 <span style="color: #BA8E77">**세미콜론(;)**</span>을 이용하여 여러 개의 명령어를 한 줄에 사용이 가능하다.
```bash
git add .; git commit -m "[Chore] learning git"; git push origin main
```
- 환경설정 명령어
```bash
git config 설정변수 "설정값"
```
  - config 명령어를 <span style="color: #BA8E77">**처음 실행하면 새로운 config 파일을 생성**</span>한다. 만약 이전에 설정한 <span style="color: #BA8E77">**환경파일이 있다면 기존 파일을 수정**</span>한다.
    - config 파일은 <span style="color: #BA8E77">**.git 폴더 안에 생성**</span>된다.
    - 항목명이 .으로 시작하는 항목들은 운영체제의 구분 없이 <span style="color: #BA8E77">**숨겨져 있다.**</span>
    - <span style="color: #BA8E77">**Windows**</span>의 경우 메뉴 > 보기 > 숨긴 항목 보기에 체크하면 확인할 수 있다.
    - <span style="color: #BA8E77">**Mac**</span>의 경우 command+shift+. 단축키를 사용하여 숨겨진 항목들이 보이게 할 수 있다.
    - .git 폴더는 <span style="color: #BA8E77">**git init**</span> 명령어를 통해 실행 당시 경로안에 만들어진다. <span style="color: #BA8E77">**즉, config 파일에 설정한 설정값은 지역적으로 해당 경로 안 저장소에서만 적용된다.**</span>
<div class="image-slider-auto">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/location-of-local-git-directory.png" title="Location of local git directory" alt="Location of local git directory">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/location-of-local-git-config-file.png" title="Location of local git config file" alt="Location of local git config file">
</div>

- 기존에 설정되어 있던 특정 설정값을 <span style="color: #BA8E77">**삭제**</span>할 수 있다.
```bash
git config --unset 설정변수
```

- 사용자 등록
```bash
git config user.name "사용자 이름"
git config user.email "사용자 이메일"
```
  - .git 폴더 안 config 파일에 사용자 정보가 저장되고 해당 경로 안 저장소에서 작업 시 이 사용자 정보를 사용한다.

- 전역 환경설정 명령어
```bash
git config --global 설정변수 "설정값"
```
  - <span style="color: #BA8E77">**모든 git 작업영역에 대한 환경설정**</span>을 할 수 있는 명령어이다.
  - 이 명령어는 <span style="color: #BA8E77">**최상위 User 폴더 안 .gitconfig 파일에 값을 저장**</span>한다.
<div class="image-slider-auto">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/location-of-global-git-config-file.png" title="Location of global git config file" alt="Location of global git config file">
</div>

- 전역 사용자 등록
```bash
git config --global user.name "사용자 이름"
git config --global user.email "사용자 이메일"
```
  - 최상위 User 폴더 안 .gitconfig 파일에 사용자 정보가 저장되고 모든 git 작업영역에서 작업 시 이 사용자 정보를 사용한다.

- 명령어 alias (단축 명령어)
```bash
git config --global alias.원하는명령어 "명령어 옵션1 옵션2 ..."
```
  - 자주 쓰이는 긴 명령어 및 옵션을 <span style="color: #BA8E77">**원하는 명령어로 설정**</span>해두고 설정한 명령어로 git의 기능을 사용할 수 있다.

---

#### 마무리하며...
이번 포스트에는 함께 Git을 설치해 보고 어떤 명령어들과 옵션들이 존재하는지 확인해 보았다. 또한 간단한 환경설정을 함께 진행해 보았으며 로컬과 전역 환경설정의 차이점에 대해서 알아보았다. 다음 포스트 때는 Git의 원리 개념에 대하여 함께 정리해 보는 시간을 가져보자.

[git-official-website-link]: https://git-scm.com "Navigate to Git official website"
[homebrew-official-website-link]: https://brew.sh "Navigate to Homebrew official website"