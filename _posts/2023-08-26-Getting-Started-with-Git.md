---
layout: post
title: 2. Git을 시작해보자
date: 2023-08-26 15:29:33 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, 깃, 깃허브, Git 설치, Git 환경설정, git config ]
description: Windows / Mac 환경에서 Git 설치 및 환경설정을 해보자.
---

> 1. [Windows 환경에서 Git 설치 방법](#windows-환경에서-git-설치-방법 "Navigate to The way to install Git for Windows")
- [설치 파일 다운로드](#설치-파일-다운로드 "Navigate to Downloading install file for Windows")
- [설치](#설치 "Navigate to Installing Git for Windows")
- [설치 확인](#설치-확인 "Navigate to Checking to install Git for Windows")
2. [Mac 환경에서 Git 설치 방법](#mac-환경에서-git-설치-방법 "Navigate to The way to install Git for Mac")
- [Homebrew 설치](#homebrew-설치 "Navigate to Installing Homebrew")
- [Git 설치](#git-설치 "Navigate to Installing Git for Mac")
3. [Git 입문하기](#git-입문하기 "Navigate to Getting started with Git")
4. [Git 환경설정](#git-환경설정 "Navigate to Setting environment for Git")

---

#### <span style="color: brown">**Windows 환경에서 Git 설치 방법**</span>
일단 Git을 시작하기 위해 설치해 보자.
- <span id="설치-파일-다운로드"></span>**설치 파일 다운로드**
<br>
먼저 Git 공식 웹사이트([https://git-scm.com][git-official-website-link])에 접속하여 Windows 용 설치파일을 다운받는다.

<div class="image-slider-auto">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-official-website-1.jpg" title="Git official website" alt="Git official website">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-official-website-2.png" title="Download page in Git official website" alt="Download page in Git official website">
</div>

<br>

- <span id="설치"></span>**설치**
<br>
다음으로 다운받은 설치파일을 실행하여 설치를 진행한다. 아래는 간단한 설명을 붙인 설치 과정이다.

  1. GNU 오픈 소스 라이선스 관련 약관이다. 동의한다면 Next를 누르고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-1.png" title="GNU Open Source License Terms and Conditions while installing Git for Windows" alt="GNU Open Source License Terms and Conditions while installing Git for Windows">
  
  1. Git이 설치될 경로이다. 원하는 경로가 따로 있다면 이곳에서 변경하면 된다. 보통은 default 경로로 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-2.png" title="Select destination location while installing Git for Windows" alt="Select destination location while installing Git for Windows">

  1. 이미 Git의 다양한 컴포넌트에 익숙하신 분들은 필요한 컴포넌트를 추가로 설치할 수 있다. 하지만 초심자는 그대로 Next를 누르고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-3.png" title="Select components while installing Git for Windows" alt="Select components while installing Git for Windows">

  1. Git 프로그램에 대한 시작메뉴 폴더명을 다르게 지정할 수 있으나 그대로 진행하는 것을 추천한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-4.png" title="Select start menu folder while installing Git for Windows" alt="Select start menu folder while installing Git for Windows">

  1. Git에서 텍스트를 이용한 작업이 필요할 때 사용할 편집기를 지정한다. 다른 외부 편집기를 사용하고 싶다면 직접 지정하고 아니면 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-5.png" title="Choosing the default editor used by Git while installing Git for Windows" alt="Choosing the default editor used by Git while installing Git for Windows">

  1. <span style="color: #8D4801" id="git-setup-6">**새로운 워킹 디렉토리에 Git을 초기화할 때 default branch의 name을 Git에서 기본값으로 지정하는 명칭으로 할지 Custom할지 정하는 곳이다.**</span> 오래전 버전에선 해당 옵션이 존재하지 않아서 branch명이 자동으로 기본값으로 지정되던 시기가 있었는데, Git을 잘 모르던 시절에 인터넷 검색에 기대어 사용할 때 원격 저장소의 브랜치명은 master로 되어있는데 main 브랜치에 push를 해서 동작이 안 되고 뭐가 문젠지 모르는 우스운 실수가 나왔었다. (지금은 웃지만... 당시엔 해결을 못해서 엄청난 스트레스였다...) 아무튼 어느 옵션을 선택하든 Git 명령어를 사용할 때 브랜치를 잘 확인하고 사용하자.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-6.png" title="Adjusting the name of the initial branch in new repositories while installing Git for Windows" alt="Adjusting the name of the initial branch in new repositories while installing Git for Windows">

  1. Git bash 명령어를 실행할 수 있는 경로를 설정하는 화면으로 일반적으로 기본값으로 두고 진행하면 된다. 
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-7.png" title="Adjusting user's PATH environment while installing Git for Windows" alt="Adjusting user's PATH environment while installing Git for Windows">
    - <span style="color: #8D4801">**Use Git from Git Bash only**</span>: 오직 Git bash로만 Git을 사용할 수 있다.
    - <span style="color: #8D4801">**Git from the command line and also from 3rd-party software**</span>: 기본값으로써 Git bash뿐만 아니라 Windows cmd 창에서도 git 명령어를 사용할 수 있다.
    - <span style="color: #8D4801">**Use Git and optional Unix tools from the Command Prompt**</span>: Windows cmd 창에서도 유닉스 도구 명령어를 사용할 수 있다.

  1. OpenSSH 패키지를 설치 유무를 선택할 수 있다. 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-8.png" title="Choosing the SSH executable while installing Git for Windows" alt="Choosing the SSH executable while installing Git for Windows">

  1. 서버 간 코드 이력 전송에 관련된 옵션이다. 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-9.png" title="Choosing HTTPS transport backend while installing Git for Windows" alt="Choosing HTTPS transport backend while installing Git for Windows">

  1. 엔딩 라인 처리방식 옵션이다. 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-10.png" title="Configuring the line ending conversions while installing Git for Windows" alt="Configuring the line ending conversions while installing Git for Windows">

  1. 터미널 에뮬레이터 선택 옵션이다. 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-11.png" title="Configuring the terminal emulator to use with Git Bash while installing Git for Windows" alt="Configuring the terminal emulator to use with Git Bash while installing Git for Windows">

  1. <span id="git-setup-12"></span>pull 명령어가 성공적으로 실행될 수도 있지만 이력 간 충돌로 인해 오류가 생길 수 있다. 이 상황에 대한 동작을 선택할 수 있다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-12.png" title="Choose the default behavior of 'git pull' while installing Git for Windows" alt="Choose the default behavior of 'git pull' while installing Git for Windows">
    - <span style="color: #8D4801">**Fast-forward or merge**</span>: 브랜치가 생성된 커밋에 따라 순차적으로 분기하는 Fast-forward 방식으로 먼저 병합을 진행하고 동작이 불가능할 경우엔 수동 merge 진행
    - <span style="color: #8D4801">**Rebase**</span>: 공통 조상 커밋인 base 커밋을 이동시키고 각 커밋들을 순차적으로 줄 세우고 동작이 불가능할 경우엔 실패할 수 있음
    - <span style="color: #8D4801">**Only ever fast-forward**</span>: 브랜치가 생성된 커밋에 따라 순차적으로 분기하는 Fast-forward 방식으로 무조건 병합을 진행. 동작이 불가능할 경우엔 실패할 수 있음

  1. Git 사용 중 자격증명 관리자 추가 여부 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-13.png" title="Choose a credential helper while installing Git for Windows" alt="Choose a credential helper while installing Git for Windows">

  1. 파일시스템 캐싱, symbolic link 사용 유무이다. 잘 모른다면 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-14.png" title="Configuring extra options while installing Git for Windows" alt="Configuring extra options while installing Git for Windows">

  1. 추가옵션들로써 잘 모른다면 기본값으로 두고 진행한다.
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-15.png" title="Configuring experimental options while installing Git for Windows" alt="Configuring experimental options while installing Git for Windows">

  1. 드디어 Git 설치 완료
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-setup-completed.png" title="The scene when Git installing completed for Windows" alt="The scene when Git installing completed for Windows">

<br>

- <span id="설치-확인"></span>**설치 확인**
<br>
정상적으로 설치가 완료되었는지 확인을 해보자. 시작메뉴에 Git Bash를 포함한 프로그램들이 설치되었음을 확인할 수 있다. 이제 Git을 시작할 준비가 되었다.

<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/checking-successful-install.jpg" title="Files about Git" alt="Files about Git">
</div>

---

#### <span style="color: brown">**Mac 환경에서 Git 설치 방법**</span>

- <span id="homebrew-설치"></span>**Homebrew 설치**
<br>
이미 Homebrew가 설치되어 있다면 이 과정을 생략한다.
<br>
<br>
  - 먼저 MacOs용 패키지 관리 앱 Homebrew 공식 웹사이트([https://brew.sh][homebrew-official-website-link])에 접속하면 확인할 수 있는 설치 명령어를 버튼을 눌러 복사한다.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/homebrew-official-website.jpg" title="Homebrew official website" alt="Homebrew official website">
<br>

  - 터미널 또는 iTerm2를 실행하고 복사한 명령어를 붙여넣기해서 실행하면 설치가 진행된다. (추가로 노트북 계정 비밀번호 입력이 필요할 수 있다.)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/terminal-command-to-install-homebrew.jpg" title="Terminal command to install Homebrew" alt="Terminal command to install Homebrew">

  - 아래의 명령어를 실행하여 Homebrew가 정상적으로 설치되었는지 확인할 수 있다.
```bash
brew --version
```
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/brew-command-version.jpg" title="Homebrew command to check the version of itself" alt="Homebrew command to check the version of itself">

<br>

- <span id="git-설치"></span>**Git 설치**
<br>
MacOs에서의 Git 설치는 Windows와 비교했을 때 매우 간단하다.

  - 아래의 명령어를 실행하면 설치가 진행된다.
```bash
brew install git
```
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/brew-command-install-git.jpg" title="Homebrew command to install Git" alt="Homebrew command to install Git">

  - 아래의 명령어를 실행하여 Git이 정상적으로 설치되었는지 확인할 수 있다. 이 명령어는 설치된 Git의 버전 정보를 출력해 준다.
```bash
git --version
```
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-command-version.jpg" title="Git command to check the version of itself" alt="Git command to check the version of itself">

---

#### <span style="color: brown">**Git 입문하기**</span>
자 이제 설치는 끝났고 본격적으로 Git을 시작해 보자.

- Git의 기본적인 명령 구조는 다음과 같다.
```bash
git <명령어> <옵션>
```

- 기본적인 명령어의 종류는 아래의 명령을 실행하여 확인할 수 있다.
```bash
git --help
```
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-command-help.jpg" title="Git command to check the significant commands in itself" alt="Git command to check the significant commands in itself">

- 명령어 사용 시 옵션의 종류는 다음과 같다.

  - <span style="color: #8D4801">**생략된 옵션**</span>
  - <span style="color: #8D4801">**'-' : 짧은 옵션**</span>
  - <span style="color: #8D4801">**'-&nbsp;-' : 긴 옵션**</span>
  - 명령어별 사용할 수 있는 옵션의 종류는 아래의 명령을 실행하여 확인할 수 있다. 
```bash
git <명령어> --help
```
```bash
git <명령어> --help-option
```
  - 다음은 add 명령어의 옵션을 확인한 예시이다.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-command-add-help-option.jpg" title="Git command to check the options of add command" alt="Git command to check the options of add command">

- 또한 명령어 사용 시 <span style="color: #8D4801">**세미콜론(;)**</span>을 이용하여 여러 개의 명령어를 한 줄에 사용이 가능하다.
```bash
git add .; git commit -m "[Chore] learning git"; git push origin main
```

---

#### <span style="color: brown">**Git 환경설정**</span>
```bash
git config <설정변수> <"설정값">
```
  - config 명령어를 <span style="color: #8D4801">**처음 실행하면 새로운 config 파일을 생성**</span>한다. 만약 이전에 설정한 <span style="color: #8D4801">**환경파일이 있다면 기존 파일을 수정**</span>한다.
    - config 파일은 <span style="color: #8D4801">**.git 폴더 안에 생성**</span>된다.
    - 항목 이름이 .으로 시작하는 항목들은 운영체제의 구분 없이 <span style="color: #8D4801">**숨겨져 있어서**</span> 일반적인 방법으로는 찾을 수 없다.

      - <span style="color: #8D4801">**Windows**</span>의 경우 메뉴 > 보기 > 숨긴 항목 보기에 체크하면 확인할 수 있다.
      - <span style="color: #8D4801">**Mac**</span>의 경우 command+shift+. 단축키를 사용하여 숨겨진 항목들이 보이게 할 수 있다.
      - <span style="color: #8D4801">**경로(path)**</span> 상의 .은 <span style="color: #8D4801">**현재 경로**</span>를 뜻한다. 그러나, <span style="color: #8D4801">**파일 및 디렉토리**</span> 앞의 .은 <span style="color: #8D4801">**숨겨진 파일 및 디렉토리**</span>를 의미한다.
    - .git 폴더는 <span style="color: #8D4801">**git init**</span> 명령어를 통해 실행 당시 경로 안에 만들어진다. <span style="color: #8D4801">**즉, config 파일에 설정한 설정값은 지역적으로 해당 경로 안 저장소에서만 적용된다.**</span>
<div class="image-slider-auto">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/location-of-local-git-directory.jpg" title="Location of local git directory" alt="Location of local git directory">
  <img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/location-of-local-git-config-file.jpg" title="Location of local git config file" alt="Location of local git config file">
</div>
<br>

- 새로운 설정변수를 <span style="color: #8D4801">**추가**</span>하기 위해서 add 옵션을 사용한다.
```bash
git config --add <새로운 설정변수> <"설정값">
```
  - 설정변수가 잘 추가되었는지 확인하기 위해서 추가하기 전에 설정값 목록을 먼저 확인해 보았다.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-command-config-list-before-add.jpg" title="The list of values of git config file" alt="The list of values of git config file">

  - 명령어를 add 옵션과 함께 실행한다.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-command-config-add.jpg" title="Git command to add variable and value into config file" alt="Git command to add variable and value into config file">

  - 새로운 변수와 값이 잘 추가되었음을 확인할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-command-config-list-after-add.jpg" title="The list of values of git config file" alt="The list of values of git config file">

<br>

- 기존에 설정되어 있던 특정 설정변수를 <span style="color: #8D4801">**삭제**</span>하기 위해서 unset 옵션을 사용한다.
```bash
git config --unset <설정변수>
```
  - 위의 실습에서 추가한 변수를 삭제해 보자.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-command-config-unset.jpg" title="Git command to remove variable and value in config file" alt="Git command to remove variable and value into config file">

<br>

- 설정값에 대한 수정이 제대로 완료되었는지 <span style="color: #8D4801">**리스트로 확인**</span>해 볼 수 있다. 전체 설정값이 목록으로 표시된다.
```bash
git config --list
```
  - 위에서 삭제한 변수가 잘 삭제되었는지 확인해 보자.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-command-config-list-after-unset.jpg" title="The list of values of git config file" alt="The list of values of git config file">

<br>

- <span style="color: #8D4801">**사용자 등록**</span>
```bash
git config user.name <"사용자 이름">
git config user.email <"사용자 이메일">
```
  - .git 폴더 안 config 파일에 사용자 정보가 저장되고 해당 경로 안 저장소에서 작업 시 이 사용자 정보를 사용한다.

<br>

- <span style="color: #8D4801">**전역**</span> 환경설정 옵션
```bash
git config --global <설정변수> <"설정값">
```
  - <span style="color: #8D4801">**모든 git 작업영역에 대한 환경설정**</span>을 할 수 있는 명령어이다.
  - 이 명령어는 <span style="color: #8D4801">**최상위 User 폴더 안 .gitconfig 파일에 값을 저장**</span>한다.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/location-of-global-git-config-file.jpg" title="Location of global git config file" alt="Location of global git config file">

<br>

- 전역 사용자 등록
```bash
git config --global user.name <"사용자 이름">
git config --global user.email <"사용자 이메일">
```
  - 최상위 User 폴더 안 .gitconfig 파일에 사용자 정보가 저장되고 모든 git 작업영역에서 작업 시 이 사용자 정보를 사용한다.
  
<br>

- <span style="color: #8D4801" id="git-config-commit-template">**commit 템플릿 설정**</span>
```bash
git config --global commit.template <템플릿 파일 경로>
```
  - 커밋메시지 템플릿을 변경하는 명령어이다. 커밋메시지 템플릿이란 git commit 명령어 실행 시 <span style="color: #8D4801">**커밋메시지 작성 화면에 특정 양식을 작성**</span>해둔 파일이다.
<img src="{{site.baseurl}}/images/posts/2023-08-26-Starting-Git/git-commit-template.jpg" title="Git commit template" alt="Git commit template">

<br>

- Git이 자동으로 <span style="color: #8D4801">**색상 출력을 사용**</span>하도록 설정한다. 이 값은 터미널이 색상 출력을 지원하는 경우에만 색상을 사용할 수 있다.
```bash
git config --global color.ui auto
```
<br>

- <span style="color: #8D4801">**자격 증명을 캐시**</span>하는 데 사용되는 도구를 설정한다. 사용자가 반복적인 로그인을 피할 수 있도록 도와준다.
```bash
git config --global credential.helper cache
```
  - 캐시 유효기간을 따로 작성하지 않으면 기본값 15분으로 설정된다. 일부 운영체제에서 운영체제의 시스템 캐시 유효기간을 따라가는 경우도 있다.

- ```bash
git config --global credential.helper "cache --timeout=3600"
```
  - timeout의 단위는 초 단위이다. 보안을 위해 임의의 캐시 유효기간을 설정할 수 있다.
  
<br>

- <span style="color: #8D4801">**git pull 명령을 실행할 때 rebase**</span>를 사용하지 않고 바로 merge를 수행하도록 지정한다. **위의 Windows 환경에서 Git 설치 과정 중** [**12번 과정**](#git-setup-12 "Navigate to 12th Process to install Git for Windows")**과 동일한 설정변수이다.**
```bash
git config --global pull.rebase false
```
<br>

- git 저장소를 초기화할 때 <span style="color: #8D4801">**브랜치의 기본명칭**</span>을 설정할 수 있다. (기본값은 master이다.) **위의 Windows 환경에서 Git 설치 과정 중** [**6번 과정**](#git-setup-6 "Navigate to 6th Process to install Git for Windows")**과 동일한 설정변수이다.**
```bash
git config --global init.defaultBranch <원하는 브랜치명 기본값>
```
<br>

- <span style="color: #8D4801" id="git-config-core-editor">**commit 메시지를 작성**</span>할 때 vim 이외의 <span style="color: #8D4801">**다른 에디터**</span>를 설정할 수 있다.
```bash
git config --global core.editor <에디터 경로>
```
<br>

- <span style="color: #8D4801">**명령어 alias**</span> (단축 명령어)
```bash
git config --global <alias.원하는명령어> <"명령어 옵션1 옵션2 ...">
```
  - 자주 쓰이는 긴 명령어 및 옵션을 <span style="color: #8D4801">**원하는 명령어로 설정**</span>해두고 설정한 명령어로 git의 기능을 사용할 수 있다.

---

#### 마무리하며...
이번 포스트에서는 함께 Git을 설치해 보고 어떤 명령어들과 옵션들이 존재하는지 확인해 보았다. 또한 간단한 환경설정을 함께 진행해 보았으며 로컬과 전역 환경설정의 차이점에 대해서 알아보았다. 다음 포스트 때는 터미널 환경에서 Git 사용 시 필수적인 터미널 명령어들에 대해서 알아보자.

[git-official-website-link]: https://git-scm.com "Navigate to Git official website"
[homebrew-official-website-link]: https://brew.sh "Navigate to Homebrew official website"