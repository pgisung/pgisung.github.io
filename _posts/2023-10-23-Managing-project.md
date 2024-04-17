---
layout: post
title: 12. 프로젝트를 관리해 보자
date: 2023-10-23 09:03:29 +0900
img: github-logo.png
categories: Github
tags: [ Git, Github, 깃, 깃허브, Version, 버전, Issue, Milestone, Pull request, git tag ]
description: 태그를 이용하여 프로젝트의 작업에 버전도 부여해 보고 이슈와 마일스톤을 이용하여 프로젝트를 관리해 보자.
---

> 1. [태그로 버전 생성하기](#태그로-버전-생성하기 "Navigate to Creating version by tag")
- [버전이란?](#버전이란 "Navigate to What is version?")
- [태그란?](#태그란 "Navigate to What is tag?")
2. [프로젝트 관리하기](#프로젝트-관리하기 "Navigate to Managing project")
- [이슈 발급하기](#이슈-발급하기 "Navigate to Creating issue")
- [레이블로 이슈 분류하기](#레이블로-이슈-분류하기 "Navigate to Labeling issues")
- [마일스톤으로 진행도 관리하기](#마일스톤으로-진행도-관리하기 "Navigate to Managing progress by milestone")
- [프로젝트 작업 흐름 관리하기](#프로젝트-작업-흐름-관리하기 "Navigate to Managing project work flow")
3. [Pull request로 코드 리뷰 및 병합 요청하기](#pull-request로-코드-리뷰-및-병합-요청하기 "Navigate to Pull request and code review")
- [Pull request 생성하기](#pull-request-생성하기 "Navigate to Creating pull request")
- [코드 리뷰하기](#코드-리뷰하기 "Navigate to Reviewing code")
- [리뷰가 완료된 코드 병합하기](#리뷰가-완료된-코드-병합하기 "Navigate to Merging code that completed reviewing")

---

#### <span style="color: brown">**태그로 버전 생성하기**</span>
##### **버전이란?**
버전은 <span style="color: #8D4801">**소프트웨어의 특정 시점을 식별**</span>하기 위해 숫자, 알파벳, 또는 기호의 조합으로 명명하는 식별자이다. 그중에 대표적으로 <span style="color: #8D4801">**세 자리 숫자 형태로 표기하는 SemVer 방식**</span>이 있다.
<center><img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/reference-of-semantic-versioning.webp" title="Reference of semantic versioning" alt="Reference of semantic versioning"></center>

- <span style="color: red">**메이저 버전 (Major version)**</span>
  - 주요 기능이나 구조적 변경이 있을 때 증가한다.
  - 첫 자리가 0으로 시작하면 아직 초기 개발 중인 제품이라는 의미이다. 정식 버전은 1부터 시작한다.
  - 예를 들어, 1.0, 2.0, 3.0 등...

- <span style="color: green">**마이너 버전 (Minor version)**</span>
  - 기능의 추가나 수정이 있을 때 증가한다. 주로 작은 변경 사항이나 새로운 기능이 추가될 때 증가한다.
  - 예를 들어, 1.1, 1.2, 1.3 등...

- <span style="color: dodgerblue">**패치 버전 (Patch version)**</span>
  - 주로 버그 수정이나 보안 패치 등의 작은 변경 사항이 있을 때 증가한다.
  - 예를 들어, 1.1.1, 1.1.2, 1.1.3 등...

- **추가적인 형태**
  - 버전 용어
    - <span style="color: #8D4801">Alpha</span> : 소프트웨어가 개발 초기 단계에 있음을 나타낸다. 주요 기능이 아직 완전히 구현되지 않았으며, 많은 버그와 결함이 있을 수 있다. 일반적으로 내부 개발 및 테스트 목적으로 사용된다.
    - <span style="color: #8D4801">M (Milestone)</span> : 테스트 버전을 의미한다. 개발 과정 중 중요한 이정표 또는 중간 단계를 나타낸다. 일반적으로 특정 기능 또는 목표를 달성할 때마다 테스트하여 피드백을 받는 버전을 의미한다.
    - <span style="color: #8D4801">Beta</span> : 개발 중인 소프트웨어가 비교적 안정적인 상태에 도달했지만, 아직 완전한 릴리스에는 못 미친 상태를 나타낸다. 이 단계에서는 주요 기능이 대부분 구현되었으며, 외부 사용자에게 테스트 및 피드백을 받기 위해 제공될 수 있다.
    - <span style="color: #8D4801">RC (Release Candidate)</span> : 릴리스 후보 버전을 나타낸다. 이 단계에서는 소프트웨어의 주요 기능이 거의 완료되었으며, 릴리스에 대한 최종 검토 및 테스트가 이루어진다.
    - <span style="color: #8D4801">GA (General Availability)</span> : 테스트가 완료된 정식 릴리스 버전을 의미한다. 지금까지의 과정 중 가장 안정된 버전으로 일반적으로 모든 사용자에게 공개되는 최종 릴리스 버전이다.
  - 버전 용어를 접미사에 붙여서 개발 단계를 나타내기도 한다.
  - 예를 들어, 1.0-alpha, 1.0-m, 1.0-beta, 1.0-rc, 1.0-ga 등...

<br>

##### **태그란?**
Tag 단어는 꼬리표라는 뜻이 있다. 단어의 뜻과 같이 <span style="color: #8D4801">**Git의 tag란 특정 커밋의 해시값을 참조하는 꼬리표**</span>를 의미한다. Git의 tag에는 크게 [**Annotated 태그**](#annotated-tag "Navigate to Annotated tag")와 [**Lightweight 태그**](#lightweight-tag "Navigate to Lightweight tag") 두 가지 종류의 태그가 존재한다. 또한 <span style="color: indianred">**태그는 중복해서 생성할 수 없다. Git에 등록된 태그 이름은 유일해야 하며, 중복된 이름으로 태그 생성을 시도할 시 오류 메시지를 출력**</span>한다.

<center><img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/tag-in-naver-dictionary.jpg" title="Definition of tag in Naver dictionary" alt="Definition of tag in Naver dictionary"></center>

<center>
  <a href="https://dict.naver.com/dict.search?dicQuery=tag&query=tag&target=dic&ie=utf8&query_utf&isOnlyViewEE" title="Navigate to Naver dictionary">
    <small><i class="fa fa-copyright" aria-hidden="true"></i>네이버 사전</small>
  </a>
</center>

- **태그 목록보기**
```bash
git tag
```
  - 로컬 저장소에 존재하는 <span style="color: #8D4801">**모든 태그 이름의 목록을 표시**</span>한다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/git-command-tag.jpg" title="Git command to show list of all tags in local repository" alt="Git command to show list of all tags in local repository">

<br>

- **패턴이 일치하는 태그 목록보기**
```bash
git tag -l <"패턴">
```
```bash
git tag --list <"패턴">
```
  - 로컬 저장소에 존재하는 <span style="color: #8D4801">**지정된 패턴과 일치하는 태그 이름의 목록을 표시**</span>한다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/git-command-tag-l-pattern.jpg" title="Git command to show list of tags matching with pattern in local repository" alt="Git command to show list of tags matching with pattern in local repository">

<br>

- **Log에서 태그 확인하기**
```bash
git log --decorate
```
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/git-command-log-decorate.jpg" title="Git command to show log with tag information" alt="Git command to show log with tag information">

<br>

- **태그의 상세 정보 확인**
```bash
git show <태그 이름>
```
  - 이 명령어로 상세 정보를 확인할 때 아래의 표시된 태그 관련 상세 정보는 <span style="color: #8D4801">**Lightweight 태그에는 존재하지 않는다.**</span>
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/git-command-show-tag-name.jpg" title="Git command to show log of the tag" alt="Git command to show log of the tag">

<br>

- <span id="annotated-tag"></span>**Annotated 태그**
```bash
git tag -a <버전>
```
```bash
git tag --annotate <버전>
```
  - 태그 이름뿐만 아니라 <span style="color: #8D4801">**간단한 태그 정보를 포함하는 태그**</span>를 생성하는 명령어이다. 명령어 실행 시 정보를 입력할 수 있도록 에디터가 실행된다. 특정 커밋 해시값을 입력하지 않을 경우 기본적으로 HEAD 커밋을 기준으로 태그를 생성한다.

  - 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/before-git-command-tag-a.jpg" title="Tag list before git command tag -a" alt="Tag list before git command tag -a">

  - 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/git-command-tag-a.jpg" title="Git command to create annotated tag" alt="Git command to create annotated tag">

  - 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/after-git-command-tag-a.jpg" title="Tag list after git command tag -a" alt="Tag list after git command tag -a">

<br>

- **간이 태그 메시지 작성 옵션**
```bash
git tag -a <버전> -m <"태그 메시지">
```
```bash
git tag -a <버전> --message <"태그 메시지">
```
  - Annotated 태그를 생성할 때는 반드시 태그 메시지를 작성해야 한다. 이 옵션을 사용하면 <span style="color: #8D4801">**에디터를 사용하지 않고 간이 태그 메시지를 작성하여 태그를 추가**</span>할 수 있다.

  - 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/before-git-command-tag-a-m.jpg" title="Tag list before git command tag -a version -m message" alt="Tag list before git command tag -a version -m message">

  - 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/git-command-tag-a-m.jpg" title="Git command to create annotated tag with simple message" alt="Git command to create annotated tag with simple message">

  - 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/after-git-command-tag-a-m.jpg" title="Tag list after git command tag -a version -m message" alt="Tag list after git command tag -a version -m message">

<br>

- <span id="lightweight-tag"></span>**Lightweight 태그**
```bash
git tag <버전>
```
  - 가장 기본적인 태그로써 Annotated 태그와 달리 <span style="color: #8D4801">**태그 이름만 존재**</span>한다. .git/ref/tags/ 경로 안에 해당 태그 이름의 파일을 생성하고 파일 내용에 참조할 커밋 해시값을 작성할 시 명령어와 동일하게 태그를 생성할 수 있다.

  - 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/before-git-command-tag-version.jpg" title="Tag list before git command tag version" alt="Tag list before git command tag version">

  - 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/git-command-tag-version.jpg" title="Git command to create lightweight tag" alt="Git command to create lightweight tag">

  - 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/after-git-command-tag-version.jpg" title="Tag list after git command tag version" alt="Tag list after git command tag version">

<br>

- **태그 삭제하기**
```bash
git tag -d <태그 이름>
```
```bash
git tag --delete <태그 이름>
```
  - 태그 목록에서 삭제된 태그 이름은 태그를 생성할 때 다시 사용할 수 있다.

  - 명령어 실행 전
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/before-git-command-tag-d.jpg" title="Tag list before git command tag -d" alt="Tag list before git command tag -d">

  - 명령어 실행
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/git-command-tag-d.jpg" title="Git command to delete tag in local repository" alt="Git command to delete tag in local repository">

  - 명령어 실행 후
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/after-git-command-tag-d.jpg" title="Tag list after git command tag -d" alt="Tag list after git command tag -d">

<br>

- **태그 이동하기**
```bash
git switch --detach <태그 이름>
```
```bash
git checkout <태그 이름>
```
  - 브랜치간 이동하듯이 <span style="color: #8D4801">**태그가 참조하는 커밋으로의 이동**</span> 또한 가능하다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/git-command-switch-detach.jpg" title="Git command to switch to the tag" alt="Git command to switch to the tag">

---

#### <span style="color: brown">**프로젝트 관리하기**</span>
##### **이슈 발급하기**
1. 먼저 해당 저장소의 Settings에서 Issues 기능이 활성화 되어있어야 한다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/creating-github-issue-1.jpg" title="Settings tab for the remote repository" alt="Settings tab for the remote repository">

2. 저장소의 Issues 탭으로 이동하여 New issue 버튼을 눌러서 새로운 issue 생성을 진행하자.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/creating-github-issue-2.jpg" title="Issues tab for the remote repository" alt="Issues tab for the remote repository">

3. 설정된 Issue template이 존재할 경우 해당 페이지가 표시될 수 있고 존재하지 않을 경우 바로 다음 페이지가 표시될 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/creating-github-issue-3.jpg" title="Selection of issue templates" alt="Selection of issue templates">

4. 
- Title에 issue 제목을 작성한다.
- Description에 해당 issue의 작업 목적 및 수행할 task를 작성한다.
- Assignees에 작업을 수행할 담당자를 작성하고 해당하는 Labels, Projects, Milestone을 설정한다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/creating-github-issue-4.jpg" title="Page to write issue" alt="Page to write issue">

5. 생성이 완료된 issue의 화면이다. <span style="color: #8D4801">**각 issue는 #으로 시작하는 고유번호**</span>를 갖고 있으며 commit, pull request 등의 명령어 실행 시 서로를 참조하는 데 사용할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/creating-github-issue-5.jpg" title="Completed issue page" alt="Completed issue page">

<br>

##### **레이블로 이슈 분류하기**
1. 저장소의 Issues 탭으로 이동하여 Labels 버튼을 눌러서 Labels 관리 화면으로 이동한다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/issue-labeling-1.jpg" title="Issues tab for the remote repository" alt="Issues tab for the remote repository">

2. New label 버튼을 눌러서 새로운 label을 생성할 수도 있고 Edit, Delete 버튼을 눌러서 기존의 label을 편집할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/issue-labeling-2.jpg" title="Labels tab for the remote repository" alt="Labels tab for the remote repository">

3. Issue 작성 화면에서 해당 <span style="color: #8D4801">**issue에 특정 label을 추가**</span>할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/issue-labeling-3.jpg" title="Label list in page to write issue" alt="Label list in page to write issue">

<br>

##### **마일스톤으로 진행도 관리하기**
1. 저장소의 Issues 탭으로 이동하여 Milestones 버튼을 눌러서 Milestones 관리 화면으로 이동한다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/setting-milestone-1.jpg" title="Issues tab for the remote repository" alt="Issues tab for the remote repository">

2. New milestone 버튼을 눌러서 새로운 milestone을 생성할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/setting-milestone-2.jpg" title="Milestones tab for the remote repository" alt="Milestones tab for the remote repository">

3. Milestone의 제목과 Deadline 그리고, 내용을 작성하고 Create milestone 버튼을 눌러서 생성을 완료한다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/setting-milestone-3.jpg" title="Page to write milestone" alt="Page to write milestone">

4. Issue 작성 화면에서 해당 issue에 특정 milestone을 추가할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/setting-milestone-4.jpg" title="Milestone list in page to write issue" alt="Milestone list in page to write issue">

5. Milestone에 grouping 된 <span style="color: #8D4801">**issue의 상태에 따라 진행도를 확인**</span>할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/setting-milestone-5.jpg" title="Milestone Progress bar in Milestones tab for the remote repository" alt="Milestone Progress bar in Milestones tab for the remote repository">

<br>

##### **프로젝트 작업 흐름 관리하기**
1. 저장소의 Prpjects 탭으로 이동하여 New project 버튼을 눌러서 Project 생성 화면으로 이동한다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/managing-project-work-flow-1.jpg" title="Projects tab for the remote repository" alt="Projects tab for the remote repository">

2. 원하는 Project의 레이아웃을 선택한다. 필자는 Kanban을 선택했다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/managing-project-work-flow-2.jpg" title="Selection for project templates" alt="Selection for project templates">

3. Project 이름을 입력하고 Create project 버튼을 눌러서 Project를 생성한다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/managing-project-work-flow-3.jpg" title="Dialog to create project" alt="Dialog to create project">

4. 생성된 Project 화면이다. Add item 버튼을 통하여 원하는 column에 이슈를 추가할 수 있다. 이 화면에서 <span style="color: #8D4801">**이슈를 이용하여 프로젝트의 작업 흐름을 관리**</span>할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/managing-project-work-flow-4.jpg" title="Page to manage project" alt="Page to manage project">

---

#### <span style="color: brown">**Pull request로 코드 리뷰 및 병합 요청하기**</span>
##### **Pull request 생성하기**
1. 저장소의 Pull requests 탭으로 이동하여 생성하고자 하는 브랜치의 pull request 버튼을 눌러서 진행한다. <span style="color: #8D4801">**이때 pull request하고자 하는 작업 내용들은 원격저장소에 전송되어 있어야 한다.**</span>
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/creating-pull-request-1.jpg" title="Pull requests tab for the remote repository" alt="Pull requests tab for the remote repository">

2. Pull request 생성에 필요한 정보들을 입력 후 Create pull request 버튼을 눌러 생성을 완료한다. Description에 <span style="color: #8D4801">**[close/fix/resolve]: #issue 번호**</span> 형태의 구문 작성 시 해당 issue를 참조하여 코드 병합 시 issue를 자동으로 닫을 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/creating-pull-request-2.jpg" title="Page to write pull request" alt="Page to write pull request">

3. 생성된 pull request를 확인할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/creating-pull-request-3.jpg" title="Pull requests tab for the remote repository" alt="Pull requests tab for the remote repository">

<br>

##### **코드 리뷰하기**
1. 저장소의 Pull requests 탭으로 이동하여 리뷰하고자 하는 pull request를 선택한다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/reviewing-code-1.jpg" title="Pull requests tab for the remote repository" alt="Pull requests tab for the remote repository">

2. 화면 하단에 해당 pull request에 대한 전체적인 리뷰를 남길 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/reviewing-code-2.jpg" title="Comment box in Pull requests tab" alt="Comment box in Pull requests tab">

3. File changed 탭으로 이동하여 각 파일의 변경 사항에 대한 리뷰 또한 남길 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/reviewing-code-3.jpg" title="Files changed tab in Pull requests tab" alt="Files changed tab in Pull requests tab">

<br>

##### **리뷰가 완료된 코드 병합하기**
1. 저장소의 Pull requests 탭으로 이동하여 병합하고자 하는 pull request를 선택한다. 보통은 저장소에 일정 이상의 권한을 가진 사람만이 PR을 병합할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/merging-code-completed-reviewing-1.jpg" title="Pull requests tab for the remote repository" alt="Pull requests tab for the remote repository">

2. Merge pull request 버튼을 눌러서 병합을 진행한다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/merging-code-completed-reviewing-2.jpg" title="Merge part in Pull requests tab" alt="Merge part in Pull requests tab">

3. 병합 정보를 입력 후 Confirm merge 버튼을 눌러서 병합을 완료한다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/merging-code-completed-reviewing-3.jpg" title="Merge box in Pull requests tab" alt="Merge box in Pull requests tab">

4. 병합이 완료된 브랜치는 바로바로 정리해 두는 것이 좋다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/merging-code-completed-reviewing-4.jpg" title="Message box to delete merged branch" alt="Message box to delete merged branch">

5. Issues 탭을 확인해 보면 PR의 병합을 통해 자동으로 닫힌 issue를 확인할 수 있다.
<img src="{{site.baseurl}}/images/posts/2023-10-23-Managing-project/merging-code-completed-reviewing-5.jpg" title="Issues tab for the remote repository" alt="Issues tab for the remote repository">

---

#### 마무리하며...
이번 포스트에서는 태그 기능을 이용하여 버전을 생성해 보고 Github의 Issue, Milestone, Project 기능을 이용하여 프로젝트 관리 방식을 알아보았으며, Pull request를 통한 협업 방식까지 진행해 보았다. 소프트웨어를 협업하여 개발할 때 수많은 크고 작은 문제들이 쌓이고 얽혀서 회복 불가능한 더 큰 문제를 야기시킬 수 있다. Github의 이러한 다양한 기능들을 이용하여 체계적으로 개발을 진행할 경우 이러한 문제들을 미연에 방지할 수 있다.