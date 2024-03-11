---
layout: post
title: 필수적인 터미널 명령어를 알아보자
date: 2023-08-28 10:47:23 +0900
img: 2023-08-28-Essential-terminal-commands.jpg
categories: Github
tags: [ Terminal commands, 터미널 명령어 ]
description: 터미널 환경에서 Git을 사용하기 위해 필수적인 명령어에 무엇이 있는지 그리고 어떻게 사용하는지 알아보자.
---

> 1. [cd 명령어](#cd-명령어 "Navigate to cd command")
1. [ls 명령어](#ls-명령어 "Navigate to ls command")
1. [pwd 명령어](#pwd-명령어 "Navigate to pwd command")
1. [mkdir 명령어](#mkdir-명령어 "Navigate to mkdir command")
1. [rmdir 명령어](#rmdir-명령어 "Navigate to rmdir command")
1. [touch 명령어](#touch-명령어 "Navigate to touch command")
1. [rm 명령어](#rm-명령어 "Navigate to rm command")
1. [mv 명령어](#mv-명령어 "Navigate to mv command")
1. [cp 명령어](#cp-명령어 "Navigate to cp command")
1. [echo 명령어](#echo-명령어 "Navigate to echo command")
1. [cat 명령어](#cat-명령어 "Navigate to cat command")
1. [less 명령어](#less-명령어 "Navigate to less command")
1. [find 명령어](#find-명령어 "Navigate to find command")
1. [터미널 제어 명령어](#터미널-제어-명령어 "Navigate to The commands to control a terminal")

---

#### <span style="color: brown">**cd 명령어**</span>
```bash
cd <디렉토리 경로> : 입력한 디렉토리 경로로 이동
cd .. : 부모 디렉토리로 이동 (한 단계 상위 디렉토리)
cd : 경로를 입력하지 않으면 최상위 디렉토리로 이동
cd ~ : 최상위 디렉토리로 이동
```
- <span style="color: #8D4801">**C**</span>hange <span style="color: #8D4801">**D**</span>irectory의 약자로 작업할 디렉토리간 이동에 쓰이는 명령어이다. 매우 자주 쓰인다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-cd.jpg" title="Terminal command to change directory" alt="Terminal command to change directory">
</div>

---

#### <span style="color: brown">**ls 명령어**</span>
```bash
ls : 해당 경로 안 파일 및 디렉토리들의 리스트 출력
ls -l : 리스트 자세한 내용과 함께 출력 (long) // 크기, 수정 시간[mtime], 권한 및 소유권
ls -a : 숨겨진 파일 및 디렉토리들을 포함하여 리스트 출력 (all)
ls -S : 파일 크기순으로 정렬하여 리스트 출력 (size)
ls -r : 역순으로 출력, 기본값은 알파벳 순서이다. (reverse)
ls -R : 하위 디렉토리까지 출력 (recursive)
ls -h : 파일 크기 단위[k, m, g]를 표시하여 사람이 보기 좋게 출력 (human)
ls -lu : 자세한 내용에 수정 시간[mtime] 대신 접근 시간[atime]을 출력
ls -lc : 자세한 내용에 수정 시간[mtime] 대신 변경 시간[ctime]을 출력
```
- <span style="color: #8D4801">**L**</span>i<span style="color: #8D4801">**s**</span>t의 약자로 현재 디렉토리 안 파일 및 디렉토리들의 리스트를 보여주는 명령어이다. ls 명령어로 폴더 리스트를 확인하고 cd 명령어를 이용해 디렉토리를 이동하는 등 매우 자주 쓰인다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-ls-alh.jpg" title="Terminal command to show the list in the path" alt="Terminal command to show the list in the path">
</div>

---

#### <span style="color: brown">**pwd 명령어**</span>
```bash
pwd : 현재 디렉토리의 절대경로를 출력
```
- <span style="color: #8D4801">**P**</span>rint <span style="color: #8D4801">**W**</span>orking <span style="color: #8D4801">**D**</span>irectory의 약자로 현재 디렉토리의 경로를 확인할 때 쓰인다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-pwd.jpg" title="Terminal command to print working directory" alt="Terminal command to print working directory">
</div>

---

#### <span style="color: brown">**mkdir 명령어**</span>
```bash
mkdir <디렉토리명> : 현재 경로에 새로운 디렉토리 생성
mkdir -p <경로>/<디렉토리명> : 특정 경로에 새로운 디렉토리 생성 (경로상에 존재하지 않는 폴더명이 있으면 생성)
mkdir -m <rwx[예) 755]> <디렉토리명> : 현재 경로에 접근 권한이 수정된 새로운 디렉토리 생성
```
- <span style="color: #8D4801">**M**</span>a<span style="color: #8D4801">**k**</span>e <span style="color: #8D4801">**Dir**</span>ectories의 약자로 현재 경로에 새로운 디렉토리들을 생성할 때 쓰인다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-mkdir.jpg" title="Terminal command to make new directories" alt="Terminal command to make new directories">
</div>

---

#### <span style="color: brown">**rmdir 명령어**</span>
```bash
rmdir <디렉토리명> : 현재 경로에 비어있는 디렉토리 삭제 (디렉토리에 1개 이상의 파일 존재 시 삭제 불가능)
```
- <span style="color: #8D4801">**R**</span>e<span style="color: #8D4801">**m**</span>ove <span style="color: #8D4801">**Dir**</span>ectories의 약자로 현재 경로에 비어있는 디렉토리들을 삭제할 때 쓰인다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-rmdir.jpg" title="Terminal command to remove empty directories" alt="Terminal command to remove empty directories">
</div>

---

#### <span style="color: brown">**touch 명령어**</span>
```bash
touch <파일명> : 현재 경로에 새로운 빈 파일 생성
touch -a <파일명> : 접근 시간[atime]을 현재 시각으로 변경
touch -d <'YYYY-MM-DD hh:mm:ss'> <파일명> : 접근 시간[atime]과 수정 시간[mtime]을 특정 시간으로 변경
touch -t <CCYYMMDDhhmm.ss> <파일명> : 접근 시간[atime]과 수정 시간[mtime]을 특정 시간으로 변경
```
- '만지다'라는 뜻을 가진 <span style="color: #8D4801">**touch**</span>와 같이 어루만지듯이 파일에 접근 및 수정하고 빈 파일을 생성할 때 쓰인다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-touch.jpg" title="Terminal command to make new empty files" alt="Terminal command to make new empty files">
</div>

---

#### <span style="color: brown">**rm 명령어**</span>
```bash
rm <디렉토리 또는 파일명> : 현재 경로에 비어있지 않은 디렉토리 및 파일 삭제
rm -r <디렉토리 또는 파일명> : 현재 경로에 비어있지 않은 디렉토리 및 파일들과 그 하위 디렉토리 및 파일들을 모두 삭제 (recursive)
rm -f <디렉토리 또는 파일명> : 삭제 명령을 강제로 실행 (force)
```
- <span style="color: #8D4801">**R**</span>e<span style="color: #8D4801">**m**</span>ove의 약자로 현재 경로에 비어있지 않은 디렉토리 및 파일들을 삭제할 때 쓰인다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-rm.jpg" title="Terminal command to remove non-empty directories and files" alt="Terminal command to remove non-empty directories and files">
</div>

---

#### <span style="color: brown">**mv 명령어**</span>
```bash
mv <디렉토리 또는 파일의 경로> <이동시킬 경로> : 이동시킬 경로로 디렉토리 및 파일을 이동
mv <디렉토리 또는 파일1> <디렉토리 또는 파일2> ... <이동시킬 경로> : 복수의 디렉토리 및 파일을 이동
mv * <이동시킬 경로> : 현재 경로의 모든 디렉토리 및 파일을 이동
```
- <span style="color: #8D4801">**M**</span>o<span style="color: #8D4801">**v**</span>e의 약자로 디렉토리 및 파일들의 경로를 이동할 때 쓰인다. 이동시킬 경로에 파일명을 다르게 입력할 경우 파일 이름을 변경할 수 있다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-mv.jpg" title="Terminal command to move directories and files" alt="Terminal command to move directories and files">
</div>

---

#### <span style="color: brown">**cp 명령어**</span>
```bash
cp <디렉토리 또는 파일의 경로> <복사시킬 경로> : 복사시킬 경로로 디렉토리 및 파일을 복사
cp -r <디렉토리 또는 파일의 경로> <복사시킬 경로> : 복사시킬 경로로 디렉토리 및 파일들과 그 하위 디렉토리 및 파일들을 모두 복사 (recursive)
cp -f <디렉토리 또는 파일의 경로> <복사시킬 경로> : 복사시킬 경로에 이미 같은 이름을 가진 디렉토리 또는 파일이 존재하더라도 복사 명령을 강제로 실행 (force)
```
- <span style="color: #8D4801">**C**</span>o<span style="color: #8D4801">**p**</span>y의 약자로 디렉토리 및 파일들을 복사할 때 쓰인다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-cp.jpg" title="Terminal command to copy directories and files" alt="Terminal command to copy directories and files">
</div>

---

#### <span style="color: brown">**echo 명령어**</span>
```bash
echo <문자열> : 문자열을 화면에 출력
echo <"특수문자를 포함한 문자열"> : 특수문자를 포함한 문자열은 큰따옴표를 사용하여 화면에 출력
echo <"문자열"> > <파일명> : 파일이 존재할 경우 문자열을 덮어쓰기로 저장 존재하지 않을 경우 파일 생성
echo <"문자열"> >> <파일명> : 파일이 존재할 경우 문자열을 이어서 저장 존재하지 않을 경우 파일 생성
```
- '메아리'라는 뜻을 가진 <span style="color: #8D4801">**echo**</span>와 같이 입력한 문자열을 화면에 똑같이 출력할 때 쓰인다. 옵션에 따라 출력 내용을 파일에 입력할 수 있다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-echo.jpg" title="Terminal command to print out the string" alt="Terminal command to print out the string">
</div>

---

#### <span style="color: brown">**cat 명령어**</span>
```bash
cat <텍스트 파일명> : 텍스트 파일 내 문자들을 화면에 출력
cat <텍스트 파일명1> <텍스트 파일명2> ... : 여러 개의 텍스트 파일 내 문자들을 순차적으로 모두 화면에 출력
cat -n <텍스트 파일명> : 텍스트 파일 내 문자들을 화면에 line number와 함께 출력
```
- Con<span style="color: #8D4801">**cat**</span>enate의 약자로 하나 이상의 텍스트 파일을 화면에 출력할 때 쓰인다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-cat.jpg" title="Terminal command to print out the files" alt="Terminal command to print out the files">
</div>

---

#### <span style="color: brown">**less 명령어**</span>
```bash
less <텍스트 파일명> : 텍스트 파일 내 문자들을 터미널 화면에 가득 찰 정도로 일부만 화면에 출력하고 페이지처럼 위아래로 탐색 조회
```
- '적다'라는 뜻을 가진 <span style="color: #8D4801">**less**</span>와 같이 텍스트 파일에서 터미널 화면에 가득 찰 정도로 일부만 출력하고 위아래로 탐색할 수 있게 하여 크기가 큰 텍스트 파일을 편리하게 조회할 때 쓰인다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-less.jpg" title="Terminal command to print out a large size file one screen at a time" alt="Terminal command to print out a large size file one screen at a time">
</div>

---

#### <span style="color: brown">**find 명령어**</span>
```bash
find . -name <'디렉토리 또는 파일명'> : 현재 디렉토리부터 찾고자 하는 디렉토리 또는 파일 검색
find . -name <'파일명'> -type f : 현재 디렉토리부터 찾고자 하는 파일만 검색
find . -name <'디렉토리명'> -type d : 현재 디렉토리부터 찾고자 하는 디렉토리만 검색
find . -name <'심볼릭링크명'> -type l : 현재 디렉토리부터 찾고자 하는 심볼릭링크만 검색
find / -name <'디렉토리 또는 파일명'> : 최상위 디렉토리부터 찾고자 하는 디렉토리 또는 파일 검색
find / -name <'*.특정 확장자'> : 최상위 디렉토리부터 특정 확장자를 가진 모든 파일 검색
find / -name <'abc*'> : 최상위 디렉토리부터 파일명이 abc로 시작하는 모든 파일 검색
find / -name <'파일명'> -exec <터미널 명령어> {} \; : 최상위 디렉토리부터 찾고자 하는 파일 검색 후 해당 파일에 명령어 실행 (각 파일 별도로 프로세스 실행)
find / -name <'파일명'> -exec <터미널 명령어> {} + : 최상위 디렉토리부터 찾고자 하는 파일 검색 후 해당 파일에 명령어 실행 (전체적으로 한 번만 실행)
```
- '찾는다'라는 뜻을 가진 <span style="color: #8D4801">**find**</span>와 같이 파일 시스템에서 파일을 찾을 때 쓰인다. 옵션과 표현식에 따라 사용 방식이 다양하다.
<div class="image-slider-static">
  <img src="{{site.baseurl}}/images/posts/2023-08-28-Essential-terminal-commands/terminal-command-find.jpg" title="Terminal command to search for files on file system" alt="Terminal command to search for files on file system">
</div>

---

#### <span style="color: brown">**터미널 제어 명령어**</span>
- <span style="color: #8D4801">**clear 명령어**</span>
```bash
clear : 터미널의 내용을 모두 깔끔하게 지우는 명령어 (iTerm2 기준으로 스크롤을 올리면 이전 내용을 볼 수 있음)
```
<br>

- <span style="color: #8D4801">**sudo 명령어**</span>
```bash
sudo <터미널 명령어> : 최상위 권한으로 명령어를 실행함
```
  - <span style="color: #8D4801">**S**</span>uper <span style="color: #8D4801">**u**</span>ser <span style="color: #8D4801">**do**</span>의 약자로 최상위 권한으로 명령어를 실행할 때 쓰인다.
  
<br>

- <span style="color: #8D4801">**특수문자 \ 사용**</span>
```bash
$ <터미널 명령어1> \
$ <터미널 명령어1> \
$ <터미널 명령어1> : 명령어가 한 줄안에 다 못 쓸정도로 길어질 경우 \ 문자를 사용하여 다음 줄에 이어서 명령어를 작성할 수 있다.
```
<br>

- <span style="color: #8D4801">**특수문자 ; 사용**</span>
```bash
$ <터미널 명령어1>; <터미널 명령어2>; <터미널 명령어3> : 여러 명령어를 한 줄에 작성할 때 ; 문자를 사용하여 연결하면 순차적으로 명령어가 실행된다.
```

---

#### 마무리하며...
이번 포스트에서는 필수적인 터미널 명령어들을 알아보았다. 사실 Git을 처음 접하는 사람들이 대부분 이 터미널, 콘솔 환경에 대한 거부감 때문에 진입장벽이 생기는 것 같다. 그래서 설령 입문해도 터미널은 아예 배제하고 특정 GUI의 사용법만 익히는 등 터미널 자체를 익히지 않는 경우도 있다. 하지만, 아무리 GUI가 편리하고 꾸준히 기능들이 추가되고 있어도 여전히 터미널 환경이 아니면 해결하지 못하는 상황이 빈번하게 발생한다. CUI든 GUI든 누군가에게 강요해선 안 된다고 생각하지만, 어느 쪽을 메인으로 선택하든 개발자로서 Solution을 찾지 못하는 상황은 발생해서는 안 된다는 의견으로 결국 어느 쪽도 등한시할 수 없다고 생각한다. 다음 포스트 때는 Git의 개념과 원리에 대하여 함께 정리해 보는 시간을 가져보자.