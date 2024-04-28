---
layout: post
title: TableLayoutPanel을 이용하여 동적으로 레이아웃 설정하기
date: 2022-08-25 19:03:27 +0900
img: csharp-logo.png
categories: C#
tags: [ C#, .Net Framework, Winform, TableLayoutPanel, Controls, Container, Form designer ]
description: TableLayoutPanel을 이용하여 절대 위치로 배치된 Control을 동적으로 상대 위치로 배치해 보자.
permalink: /csharp/:year/:month/:day/:title.html
---

> 1. [작성 동기](#작성-동기 "Navigate to Motivation to write code")
2. [배치 방식](#배치-방식 "Navigate to The layout")
- [기존의 컨트롤 배치 방식](#기존의-컨트롤-배치-방식 "Navigate to The original layout")
- [TableLayoutPanel을 이용한 배치 방식](#tablelayoutpanel을-이용한-배치-방식 "Navigate to The layout using TableLayoutPanel")
3. [컨트롤에 확대 이벤트를 적용해 보자](#컨트롤에-확대-이벤트를-적용해-보자 "Navigate to Applying a zoom event to the control")
- [기존의 레이아웃에 적용](#기존의-레이아웃에-적용 "Navigate to Applying to the original layout")
- [TableLayoutPanel을 이용한 레이아웃에 적용](#tablelayoutpanel을-이용한-레이아웃에-적용 "Navigate to Applying to the layout using TableLayoutPanel")

---

#### <span style="color: brown">**작성 동기**</span>
업무 중 Form designer에 컨트롤을 추가, 변경 등의 작업을 진행할 때, 컨트롤을 배치한 작업자에 따라서 또는 PC의 해상도에 따라서 <span style="color: #8D4801">**컨트롤의 위치나 크기가 의도치 않게 변해있거나 Form 실행 화면에서 컨트롤이 잘려있는 상황**</span>이 빈번하게 발생했고 그때마다 작지만, 반복되는 effort가 발생했다. 더 나아가서 <span style="color: #8D4801">**이미 정렬된 컨트롤들 사이에 새로운 컨트롤을 추가할 때 매번 다른 컨트롤의 위치 및 크기에 대한 작업이 동반**</span>되는 것이 매우 비효율적이라는 생각이 들었고 레이아웃 추가를 구상하게 되었다.

---

#### <span style="color: brown">**배치 방식**</span>
작업했던 원본을 사용할 수 없는 관계로 <span style="color: #8D4801">**간단한 예시**</span>를 만들어 보았다. 실제로는 Form designer상에서 디자인하듯이 작업할 수 있는 부분도 차이점을 확인하기 위해 <span style="color: #8D4801">**모두 코드로 구현**</span>하였다.
##### **기존의 컨트롤 배치 방식**
[아래의 초기화 함수](#기존-방식-초기화-함수 "Navigate to Code block that initializing function")에서 확인해 볼 수 있듯이 <span style="color: #8D4801">**컨트롤의 위치 및 크기를 직접 지정**</span>해서 배치한다. <span style="color: #8D4801">**Margin과 Padding 값이 존재할 경우 함께 계산**</span>하고 고려하여 배치해야 한다.
<center>
  <img src="{{site.baseurl}}/images/posts/2022-08-25-Setting-dynamic-layout-using-Tablelayoutpanel/buttons-in-form.jpg" title="Reference of the layout by absolute positioning" alt="Reference of the layout by absolute positioning" Width="70%">
</center>

<br>

- <span style="color: #8D4801">**네임스페이스 Import**</span>
```c#
using System.Threading;
```
  - 버튼 배경색을 임의 색상으로 변경하기 위해서 Random class를 사용하는데 for문이 너무 빨리 실행되어 대부분의 경우에 같은 색상으로 표시되어 <span style="color: #8D4801">**Thread.Sleep 함수를 사용**</span>하여 UI Thread를 잠깐 idle 상태로 만든다. 이때 위의 import가 필요하다.

<br>

- <span style="color: #8D4801">**멤버 변수 선언**</span>
```c#
// 테이블 레이아웃 예제에서 TabelLayoutPanel의 margin 수치
const int DEF_TABLELAYOUT_MARGIN = 10;
// 생성할 버튼 개수
const int DEF_BUTTON_COUNT = 4;
// 버튼 확대 여부 확인
private bool m_bButtonZoom;
// 버튼 위치 및 크기 기억
private Point[] m_objButtonLocation;
private Size[] m_objButtonSize;
```

<br>

- <span style="color: #8D4801" id="기존-방식-초기화-함수">**Form load시 초기화 함수**</span>
```c#
public bool InitializeForm()
{
    bool bReturn = false;

    do {
      m_objButtonLocation = new Point[ DEF_BUTTON_COUNT ];
      m_objButtonSize = new Size[ DEF_BUTTON_COUNT ];

      // 예시로 버튼을 4개 생성해 보자
      for( int iLoopCount = 0; iLoopCount < DEF_BUTTON_COUNT; iLoopCount++ ) {
        Button btnExample = new Button();
        // 클라이언트의 크기를 기준으로 버튼의 위치 및 크기 결정
        int iWidth = ClientSize.Width / 2;
        int iHeight = ClientSize.Height / 2;
        // 버튼 이름
        btnExample.Name = string.Format($"btnLayout{iLoopCount + 1}");
        // 임의의 버튼 배경색
        Random objRandom = new Random();
        int iRed = objRandom.Next( 255 );
        int iGreen = objRandom.Next( 255 );
        int iBlue = objRandom.Next( 255 );
        btnExample.BackColor = Color.FromArgb( iRed, iGreen, iBlue );
        Thread.Sleep( 10 );
        // 버튼 위치
        int iCoordinateX = iLoopCount / 2 * iWidth;
        int iCoordinateY = iLoopCount % 2 * iHeight;
        if( 0 == iCoordinateX ) {
          iCoordinateX += DEF_TABLELAYOUT_MARGIN;
        }
        if( 0 == iCoordinateY ) {
          iCoordinateY += DEF_TABLELAYOUT_MARGIN;
        }
        btnExample.Location = new Point( iCoordinateX, iCoordinateY );
        // 버튼 확대 축소용으로 멤버 변수에 위치 저장
        m_objButtonLocation[ iLoopCount ] = btnExample.Location;
        // 버튼 크기
        iWidth = iWidth - DEF_TABLELAYOUT_MARGIN;
        iHeight = iHeight - DEF_TABLELAYOUT_MARGIN;
        btnExample.Size = new Size( iWidth, iHeight );
        // 버튼 확대 축소용으로 멤버 변수에 크기 저장
        m_objButtonSize[ iLoopCount ] = btnExample.Size;
        // 버튼 텍스트
        btnExample.Text = string.Format($"{btnExample.Name}: Location X= {btnExample.Location.X}, Y= {btnExample.Location.Y} / Size W= {btnExample.Size.Width}, H= {btnExample.Size.Height}");
        // 버튼 확대 축소 이벤트 핸들러 추가
        btnExample.Click += ChangeButtonSize;
        // 컨테이너에 추가
        Controls.Add( btnExample );
      }

      bReturn = true;
    } while( false );

    return bReturn;
}
```

<br>

##### **TableLayoutPanel을 이용한 배치 방식**
[아래의 초기화 함수](#tablelayoutpanel-사용-방식-초기화-함수 "Navigate to Code block that initializing function")에서 확인해 볼 수 있듯이 <span style="color: #8D4801">**초기화한 위치 및 크기 값에 상관없이**</span> 컨트롤이 배치된다. TabelLayoutPanel에 추가될 때의 Row 및 Column과 DockStyle, Anchor 그리고 Margin과 Padding에 따라 <span style="color: #8D4801">**동적으로 위치 및 크기가 결정**</span>된다.
<center>
  <img src="{{site.baseurl}}/images/posts/2022-08-25-Setting-dynamic-layout-using-Tablelayoutpanel/buttons-in-tablelayoutpanel.jpg" title="Reference of the layout using TableLayoutPanel" alt="Reference of the layout using TableLayoutPanel" Width="70%">
</center>

<br>

- <span style="color: #8D4801">**네임스페이스 Import**</span>
```c#
using System.Threading;
```
  - 버튼 배경색을 임의 색상으로 변경하기 위해서 Random class를 사용하는데 for문이 너무 빨리 실행되어 대부분의 경우에 같은 색상으로 표시되어 <span style="color: #8D4801">**Thread.Sleep 함수를 사용**</span>하여 UI Thread를 잠깐 idle 상태로 만든다. 이때 위의 import가 필요하다.

<br>

- <span style="color: #8D4801">**멤버 변수 선언**</span>
```c#
// TabelLayoutPanel의 margin 수치
const int DEF_TABLELAYOUT_MARGIN = 10;
// 생성할 버튼 개수
const int DEF_BUTTON_COUNT = 4;
// 테이블 레이아웃 패널
TableLayoutPanel m_objTableLayoutPanel;
// 버튼 배열
Button[] m_objButtons;
// 버튼 확대 여부 확인
private bool m_bButtonZoom;
```

<br>

- <span style="color: #8D4801" id="tablelayoutpanel-사용-방식-초기화-함수">**Form load시 초기화 함수**</span>
```c#
public bool InitializeForm()
{
    bool bReturn = false;

    do {
      // 레이아웃 초기화
      m_objTableLayoutPanel = new TableLayoutPanel();
      m_objTableLayoutPanel.Name = "tableLayoutPanelExample";
      m_objTableLayoutPanel.Location = new Point( DEF_TABLELAYOUT_MARGIN, DEF_TABLELAYOUT_MARGIN );
      m_objTableLayoutPanel.Size = new Size( 800, 600 );
      // 행
      m_objTableLayoutPanel.RowCount = 2;
      m_objTableLayoutPanel.RowStyles.Add( new RowStyle( SizeType.Percent, 50F ) );
      m_objTableLayoutPanel.RowStyles.Add( new RowStyle( SizeType.Percent, 50F ) );
      // 열
      m_objTableLayoutPanel.ColumnCount = 2;
      m_objTableLayoutPanel.ColumnStyles.Add( new ColumnStyle( SizeType.Percent, 50F ) );
      m_objTableLayoutPanel.ColumnStyles.Add( new ColumnStyle( SizeType.Percent, 50F ) );
      // 컨테이너에 추가
      Controls.Add( m_objTableLayoutPanel );
      // 버튼 배열 초기화
      m_objButtons = new Button[ DEF_BUTTON_COUNT ];

      // 예시로 버튼을 4개 생성해 보자
      for( int iLoopCount = 0; iLoopCount < DEF_BUTTON_COUNT; iLoopCount++ ) {
        Button btnExample = new Button();
        int iRow = iLoopCount / m_objTableLayoutPanel.ColumnCount;
        int iColumn = iLoopCount % m_objTableLayoutPanel.ColumnCount;
        // 버튼 이름
        btnExample.Name = string.Format( $"btnLayout{iLoopCount + 1}" );
        // 임의의 버튼 배경색
        Random objRandom = new Random();
        int iRed = objRandom.Next( 255 );
        int iGreen = objRandom.Next( 255 );
        int iBlue = objRandom.Next( 255 );
        btnExample.BackColor = Color.FromArgb( iRed, iGreen, iBlue );
        Thread.Sleep( 10 );
        // 버튼 위치
        btnExample.Location = new Point( 0, 0 );
        // 버튼 크기
        btnExample.Size = new Size( 75, 23 );
        // 버튼 도킹
        btnExample.Dock = DockStyle.Fill;
        // 버튼 텍스트
        btnExample.Text = string.Format( $"{btnExample.Name}: Location X= {btnExample.Location.X}, Y= {btnExample.Location.Y} / Size W= {btnExample.Size.Width}, H= {btnExample.Size.Height}\n\nRow: {iRow}, Column: {iColumn}" );
        // 버튼 확대 축소 이벤트 핸들러 추가
        btnExample.Click += ChangeButtonSize;
        // 배열에 추가
        m_objButtons[ iLoopCount ] = btnExample;
        // 레이아웃에 추가
        m_objTableLayoutPanel.Controls.Add( btnExample, iRow, iColumn );
      }

      bReturn = true;
    } while( false );

    return bReturn;
}
```

---

#### <span style="color: brown">**컨트롤에 확대 이벤트를 적용해 보자**</span>
##### **기존의 레이아웃에 적용**
<center>
  <img src="{{site.baseurl}}/images/posts/2022-08-25-Setting-dynamic-layout-using-Tablelayoutpanel/button-zoom-inout-in-form.gif" title="Example of button zoom inout action in form" alt="Example of button zoom inout action in form" Width="70%">
</center>

- 컨트롤의 실제 위치 및 크기의 조정이 필요하므로 위에 표시되는 <span style="color: #8D4801">**Location과 Size는 모두 직접 지정한 값**</span>인 것을 아래의 코드에서 확인할 수 있다.
```c#
private void ChangeButtonSize( object sender, EventArgs e )
{
    Button objButton = sender as Button;
    // 확대 축소 이벤트를 가진 버튼들의 배열
    Button[] objButtons = Controls.OfType<Button>().Where( objControl => objControl.Name.Contains( "btnLayout" ) ).ToArray();
    // 이벤트가 발생한 버튼의 인덱스 확인
    int iButtonIndex = 0;
    if( false == int.TryParse( objButton.Name.Last().ToString(), out iButtonIndex ) ) throw new Exception();
    // 버튼 이름의 인덱스와 실제 배열의 인덱스가 1 차이 나므로 빼줌
    iButtonIndex -= 1;

    // 버튼 확대 여부 확인
    if( false == m_bButtonZoom ) {
      // 축소 -> 확대
      objButton.Location = new Point( DEF_TABLELAYOUT_MARGIN, DEF_TABLELAYOUT_MARGIN );
      objButton.Size = new Size( ClientSize.Width - ( DEF_TABLELAYOUT_MARGIN * 2 ), ClientSize.Height - ( DEF_TABLELAYOUT_MARGIN * 2 ) );

      // 확대할 버튼 이외의 버튼들 숨김
      foreach( Button btn in objButtons ) {
        // 확대할 버튼 제외
        if( true == btn.Equals( objButton ) ) continue;
        btn.Visible = false;
      }
      // 확대 상태
      m_bButtonZoom = true;
    } else {
      // 확대 -> 축소
      objButton.Location = m_objButtonLocation[ iButtonIndex ];
      objButton.Size = m_objButtonSize[ iButtonIndex ];

      // 숨겨진 다른 버튼들 다시 표시
      foreach( Button btn in objButtons ) {
        btn.Visible = true;
      }
      // 축소 상태
      m_bButtonZoom = false;
    }
}
```

<br>

##### **TableLayoutPanel을 이용한 레이아웃에 적용**
<center>
  <img src="{{site.baseurl}}/images/posts/2022-08-25-Setting-dynamic-layout-using-Tablelayoutpanel/button-zoom-inout-in-tablelayoutpanel.gif" title="Example of button zoom inout action in tablelayoutpanel" alt="Example of button zoom inout action in tablelayoutpanel" Width="70%">
</center>

- TableLayoutPanel에서 해당 컨트롤의 Row 및 Column으로 위치를 지정하고 Span으로 크기를 지정하면 <span style="color: #8D4801">**동적으로 변화하는 Location과 Size**</span>를 확인할 수 있다.
```c#
private void ChangeButtonSize( object sender, EventArgs e )
{
    Button objButton = sender as Button;
    // 레이아웃의 컨트롤 초기화
    m_objTableLayoutPanel.Controls.Clear();

    // 버튼 확대 여부 확인
    if( false == m_bButtonZoom ) {
      // 축소 -> 확대
      m_objTableLayoutPanel.SetColumnSpan( objButton, m_objTableLayoutPanel.ColumnCount );
      m_objTableLayoutPanel.SetRowSpan( objButton, m_objTableLayoutPanel.RowCount );
      // 레이아웃에 확대된 버튼만 추가
      m_objTableLayoutPanel.Controls.Add( objButton, 0, 0 );
      // 확대 상태
      m_bButtonZoom = true;
    } else {
      // 확대 -> 축소
      m_objTableLayoutPanel.SetColumnSpan( objButton, 1 );
      m_objTableLayoutPanel.SetRowSpan( objButton, 1 );
      // 숨겨진 다른 버튼들 다시 표시
      for( int iLoopCount = 0; iLoopCount < DEF_BUTTON_COUNT; iLoopCount++ ) {
        int iRow = iLoopCount % m_objTableLayoutPanel.ColumnCount;
        int iColumn = iLoopCount / m_objTableLayoutPanel.ColumnCount;
        m_objTableLayoutPanel.Controls.Add( m_objButtons[ iLoopCount ], iColumn, iRow );
      }
      // 축소 상태
      m_bButtonZoom = false;
    }
}
```

---

#### 마무리하며...
이번 포스트에서는 TableLayoutPanel 컨테이너를 이용한 컨트롤의 동적 배치를 알아보았다. SplitContainer도 추가하고 더 복잡한 TableLayoutPanel의 행과 열을 만들어서 비교해 보면 두 방식의 차이점을 더욱 극명하게 느낄 수 있다. 요즘같이 다양한 크기의 장치가 쏟아져나오는 때 컨테이너를 이용하여 반응형 레이아웃을 구현해 보는 것 어떨까?