---
layout: post
title: 이미지 파일을 이용하여 카메라 시뮬레이션(Camera simulation) 동작 함수로 작성하기
date: 2022-06-22 22:32:01 +0900
img: csharp-logo.png
categories: C#
tags: [ C#, .Net Framework, Cognex, VisionPro, Image file, Camera simulation ]
description: 저장장치에 보관 중인 이미지 파일을 이용하여 카메라가 반복적으로 촬영하는 듯한 시뮬레이션 효과를 함수로 작성해 보자.
permalink: /csharp/:year/:month/:day/:title/
---

> 1. [작성 동기](#작성-동기 "Navigate to Motivation to write code")
2. [기능 구상](#기능-구상 "Navigate to Concept of the function")
3. [발생할 수 있는 사용자 이벤트를 확인하자](#발생할-수-있는-사용자-이벤트를-확인하자 "Navigate to Shall we check user event that possibly occured")
- [CheckedChanged 이벤트](#checkedchanged-이벤트 "Navigate to CheckedChanged event")
- [Load image button Click 이벤트](#load-image-button-click-이벤트 "Navigate to Load image button Click event")
- [ValueChanged 이벤트](#valuechanged-이벤트 "Navigate to ValueChanged event")
- [검색 시작 및 정지 button의 Click 이벤트](#검색-시작-및-정지-button의-click-이벤트 "Navigate to Search start button and Search stop button Click event")
- [Tick 이벤트](#tick-이벤트 "Navigate to Tick event")
4. [실행될 함수를 구현하자](#실행될-함수를-구현하자 "Navigate to Let's write a function to be executed")
- [멤버 변수 선언](#멤버-변수-선언 "Navigate to Declaration the member variable")
- [Form load시 초기화 함수](#form-load시-초기화-함수 "Navigate to Initialize function on form loading")
- [검색 함수](#검색-함수 "Navigate to Search function")
- [스레드 함수](#스레드-함수 "Navigate to Thread function")
5. [결과를 확인해 보자](#결과를-확인해-보자 "Navigate to Checking the result")


---

## 작성 동기
한참 협력업체의 선임님과 마크 티칭을 하던 중에 떠오른 것이 현재 마크 셋업 화면에서 티칭이 완료된 마크의 검색 여부를 <span style="color: #8D4801">**단발적으로 확인**</span>은 가능하나 실제 생산이 진행될 때 <span style="color: #8D4801">**다양한 컨디션을 가진 다수의 자재를 대상으로 촬영**</span>할 때 NG가 날지 안 날지는 당장 확인을 해볼 수 없어서 확신을 가질 수 없었다. 또한 항상 실제 생산으로만 마크를 검증한다는 것도 매우 모순적이고 비효율적이라고 생각했다. 이때 저장소에는 <span style="color: #8D4801">**과거에 촬영했던 이미지들이 다수 저장**</span>되어 있다는 것에 생각이 닿았고 이를 이용한다면 마치 <span style="color: #8D4801">**생산을 진행하는 것처럼 흉내를 내 검색 여부를 확인**</span>할 수 있다고 생각했다.

---

## 기능 구상
1. 반복하여 촬영해야 하므로 <span style="color: #8D4801">**반복 횟수**</span>의 설정과 촬영마다 <span style="color: #8D4801">**지연시간**</span>의 설정이 가능하게 해야 하므로 NumericUpDown 컨트롤을 통해 값을 설정한다.
2. 카메라가 여러 개이고 각각의 카메라에 대한 이미지가 저장되므로 <span style="color: #8D4801">**카메라별로 불러올 디렉토리를 선택**</span>할 수 있어야 하므로 Combobox 또는 Checkbox를 통해 카메라를 설정하고 버튼에 이미지 불러오기 기능을 추가한다.
3. <span style="color: #8D4801">**생산 모드**</span>에서는 실행돼선 안 되며 실행 중이었다면 <span style="color: #8D4801">**중지**</span>되어야 하므로 Bool 타입의 플래그를 추가하여 Thread를 제어한다.
4. 중요한 점은 촬영한 이미지는 카메라별로 여러 개이지만 자재는 한 개를 기준으로 촬영했기 때문에 시뮬레이션할 때 <span style="color: #8D4801">**같은 자재를 촬영한 모든 카메라의 이미지를 같은 시점**</span>에 불러올 수 있어야 하므로 이미지를 저장할 때 파일명에 날짜를 제일 앞으로 변경하여 이미지를 날짜순으로 정렬하면 모든 카메라별 이미지 배열에서 같은 인덱스를 가지게 할 수 있다.

---

## 발생할 수 있는 사용자 이벤트를 확인하자
### CheckedChanged 이벤트
<center>
  <img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2022-06-22-Writing-the-camera-simulation-function-using-image-file/checked-changed-event.gif" title="Reference of CheckedChanged event" alt="Reference of CheckedChanged event">
</center>

- 카메라별 Checkbox의 체크 상태가 달라질 경우 발생하는 이벤트이다. 4개의 체크박스 이벤트가 eChangedValue에 입력되는 열거형 변수를 제외하고 동일하므로 카메라 1번 함수만 살펴보자.
```c#
private enum enumCamera
{
    CAMERA_1 = 0,
    CAMERA_2,
    CAMERA_3,
    CAMERA_4,
    CAMERA_FINAL,
}
private void checkBoxCamera1_CheckedChanged( object sender, EventArgs e )
{
    // 값 변경될 때만
    enumCamera eOriginValue = ( enumCamera )m_iCameraIndex;
    enumCamera eChangedValue = enumCamera.CAMERA_1;
    bool bIsChecked = ( sender as CheckBox ).Checked;

    if( eOriginValue != eChangedValue && true == bIsChecked ) {
      // 값 변경
      m_iCameraIndex = ( int )eChangedValue;

      // CheckBox 로그 추가
      string strLog = string.Format( "[{0}] [m_iCameraIndex : {1} -> {2}]", MethodBase.GetCurrentMethod().Name, eOriginValue, eChangedValue );
      Console.WriteLine( strLog );
    }
}
```

<br>

### Load image button Click 이벤트
<center>
  <img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2022-06-22-Writing-the-camera-simulation-function-using-image-file/load-image-button-click-event.gif" title="Reference of Load image button Click event" alt="Reference of Load image button Click event">
</center>

- Load Image Button을 마우스 클릭할 경우 발생하는 이벤트이다.
```c#
private void BtnLoadImage_Click( object sender, EventArgs e )
{
    FolderBrowserDialog objFolderBrowserDialog = new FolderBrowserDialog();
    // 이미지가 저장되어 있는 경로를 입력하면 다이얼로그가 나타날 때 해당 디렉토리로부터 시작한다.
    objFolderBrowserDialog.SelectedPath = ;//이미지가 저장되어 있는 경로를 입력하시오.
    objFolderBrowserDialog.Description = "IMAGE LOAD PATH";
    objFolderBrowserDialog.ShowNewFolderButton = false;
    DialogResult bDialogResult = objFolderBrowserDialog.ShowDialog();

    // 다이얼로그에서 경로 선택 후 OK 버튼을 눌러서 진행했을 경우 
    if( System.Windows.Forms.DialogResult.OK == bDialogResult ) {
      // 선택된 이미지 디렉토리 경로
      string strImagePath = objFolderBrowserDialog.SelectedPath;
      Bitmap objBitmap;
      CogImage8Grey objCogImage;
      // 카메라의 이미지 크기가 지정되어 있다면 불러와서 사용
      int iCameraWidth = ;//카메라의 이미지 가로 크기를 입력하시오.
      int iCameraHeight = ;//카메라의 이미지 세로 크기를 입력하시오.

      do {
        // 서치 진행 중에는 이미지 불러오면 안 됨
        if( true == m_bSearchStart ) break;

        try {
          // 이미지 로딩 중 알람 메시지 표시
          Console.WriteLine( "IMAGES LOADING..." );
          // 코그 디스플레이 초기화
          m_objCogDisplay[ m_iCameraIndex ].StaticGraphics.Clear();
          m_objCogDisplay[ m_iCameraIndex ].InteractiveGraphics.Clear();
          // 해당 코그 이미지 배열 초기화
          m_objArrayCogImage[ m_iCameraIndex ] = null;
          m_strFileNames[ m_iCameraIndex ] = null;
          // 폴더 내 파일 목록 불러오기
          if( false == System.IO.Directory.Exists( strImagePath ) ) {
            // 없으면 임의 이미지 생성
            objBitmap = new Bitmap( iCameraWidth, iCameraHeight );
            objCogImage = new CogImage8Grey( objBitmap );
            m_objArrayCogImage[ m_iCameraIndex ] = objCogImage;
            m_objCogDisplay[ m_iCameraIndex ].Image = objCogImage;
          } else {
            // 서치 시작 시 외부 이미지 로드해올 경로들 배열로 가져옴
            IEnumerable<System.IO.FileInfo> objFileList = GetFiles( strImagePath + "\\" );

            var strFileList = from objFile in objFileList
                      where objFile.Extension == ".jpg" || objFile.Extension == ".bmp" || objFile.Extension == ".png"
                      select strImagePath + "\\" + objFile.Name;

            m_strFileNames[ m_iCameraIndex ] = strFileList.ToArray();

            // 로드된 이미지 확인을 위해 첫 번째 이미지만 디스플레이 해둠
            if( 0 < m_strFileNames[ m_iCameraIndex ].Length ) {
              objBitmap = new Bitmap( m_strFileNames[ m_iCameraIndex ].First() );
              objCogImage = new CogImage8Grey( objBitmap );
              m_objCogDisplay[ m_iCameraIndex ].Image = objCogImage;
            } else {
              // 없으면 임의 이미지 생성
              objBitmap = new Bitmap( iCameraWidth, iCameraHeight );
              objCogImage = new CogImage8Grey( objBitmap );
              m_objArrayCogImage[ m_iCameraIndex ] = objCogImage;
              m_objCogDisplay[ m_iCameraIndex ].Image = objCogImage;
            }
          }
          // 위에서 이미지 로딩 중 알람 메시지 표시했을 시 여기서 종료
          // 불러오기가 완료되었습니다.
          Console.WriteLine( "IMAGES LOADING DONE" );
        }
        catch( Exception ex ) {
          // 예외 처리
          string strError = string.Format( "{0} {1} {2}", this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message );
          Trace.WriteLine( strError );
        } finally {
          // 위에서 이미지 로딩 중 알람 메시지 표시했을 시 여기서 종료
        }
      } while( false );
    }
}
// 해당 경로의 파일들의 FileInfo를 컬렉션으로 가져오는 함수
private IEnumerable<System.IO.FileInfo> GetFiles( string path )
{
    // 호출부에서 이미 체크 중이라 주석, 체크하지 않는 곳에서 사용 시 풀어야 함
    //if( !System.IO.Directory.Exists( path ) )
    //	throw new System.IO.DirectoryNotFoundException();

    string[] fileNames = null;
    List<System.IO.FileInfo> files = new List<System.IO.FileInfo>();

    fileNames = System.IO.Directory.GetFiles( path, "*.*", System.IO.SearchOption.AllDirectories );
    foreach( string name in fileNames ) {
      files.Add( new System.IO.FileInfo( name ) );
    }
    return files;
}
```

<br>

### ValueChanged 이벤트
<center>
  <img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2022-06-22-Writing-the-camera-simulation-function-using-image-file/value-changed-event.gif" title="Reference of ValueChanged event" alt="Reference of ValueChanged event">
</center>

- 반복 횟수 및 지연시간 NumericUpDown의 값이 변경될 경우 발생하는 이벤트이다. iOriginValue에 입력되는 변수를 제외하고 동일하므로 반복 횟수 NumericUpDown의 함수만 살펴보자.
```c#
private void numericSearchCount_ValueChanged( object sender, EventArgs e )
{
    do {
      // 생산 모드일 경우 실행하지 않음
      if( /*모드 유무 확인*/ ) break;

      // 값 변경될 때만
      int iOriginValue = m_iSearchCount;
      int iChangedValue = ( int )( sender as NumericUpDown ).Value;
      if( iOriginValue != iChangedValue ) {
        // 최소, 최대값을 넘을 경우 최소, 최대값으로 값 입력
        int iMax = ( int )( sender as NumericUpDown ).Maximum;
        int iMin = ( int )( sender as NumericUpDown ).Minimum;
        if( iChangedValue > iMax ) {
          iChangedValue = iMax;
        } else if( iChangedValue < iMin ) {
          iChangedValue = iMin;
        }

        // 값 변경
        m_iSearchCount = iChangedValue;
      }
    } while( false );
}
```

<br>

### 검색 시작 및 정지 button의 Click 이벤트
<center>
  <img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2022-06-22-Writing-the-camera-simulation-function-using-image-file/search-start-stop-button-click-event.gif" title="Reference of Search start button and Search stop button Click event" alt="Reference of Search start button and Search stop button Click event">
</center>

- 검색 시작 Button과 검색 정지 Button을 마우스 클릭할 경우 발생하는 이벤트로 Bool 타입의 플래그만 변경해 준다.
```c#
private void BtnSearchStart_Click( object sender, EventArgs e )
{
    do {
      // 생산 모드일 경우 실행하지 않음
      if( /*모드 유무 확인*/ ) break;

      // 테스트 정지 상태에만 플래그 변경
      if( false == m_bSearchStart ) {
        // 테스트 시작
        m_bSearchStart = true;
      }
    } while( false );
}
private void BtnSearchStop_Click( object sender, EventArgs e )
{
    // 테스트 정지
    m_bSearchStart = false;
}
```

<br>

### Tick 이벤트
- 설정한 지연시간마다 이벤트를 발생시키는 Timer의 tick 이벤트를 이용하여 Form에 변화된 Control의 상태를 표시한다. 
```c#
private void timer_Tick( object sender, EventArgs e )
{
    // 검색 테스트 옵션 파라미터 갱신
    UpdateDisplaySearchOption();
}
private void UpdateDisplaySearchOption()
{
    var pFormCommon = CFormCommon.GetFormCommon;
    // 이미지 경로용 선택된 카메라 인덱스 표시
    switch( m_iCameraIndex ) {
      case ( int )enumCamera.CAMERA_1:
        checkBoxCamera1.Checked = true;
        checkBoxCamera2.Checked = false;
        checkBoxCamera3.Checked = false;
        checkBoxCamera4.Checked = false;
        break;
      case ( int )enumCamera.CAMERA_2:
        checkBoxCamera1.Checked = false;
        checkBoxCamera2.Checked = true;
        checkBoxCamera3.Checked = false;
        checkBoxCamera4.Checked = false;
        break;
      case ( int )enumCamera.CAMERA_3:
        checkBoxCamera1.Checked = false;
        checkBoxCamera2.Checked = false;
        checkBoxCamera3.Checked = true;
        checkBoxCamera4.Checked = false;
        break;
      case ( int )enumCamera.CAMERA_4:
        checkBoxCamera1.Checked = false;
        checkBoxCamera2.Checked = false;
        checkBoxCamera3.Checked = false;
        checkBoxCamera4.Checked = true;
        break;
    }
    // 검색 시작, 정지 상태 표시
    if( true == m_bSearchStart ) {
      pFormCommon.SetControlBackColor( BtnSearchStart, pFormCommon.COLOR_ACTIVATE );
      pFormCommon.SetControlBackColor( BtnSearchStop, pFormCommon.COLOR_UNACTIVATE );
    } else {
      pFormCommon.SetControlBackColor( BtnSearchStart, pFormCommon.COLOR_UNACTIVATE );
      pFormCommon.SetControlBackColor( BtnSearchStop, pFormCommon.COLOR_ACTIVATE );
    }
    // 검색 테스트 진행할 횟수
    numericSearchCount.Value = ( decimal )m_iSearchCount;
    // 검색 테스트 각 검색 진행 사이 지연 시간
    numericSearchDelay.Value = ( decimal )m_iSearchDelay;
}
```

---

## 실행될 함수를 구현하자
### 멤버 변수 선언
```c#
// 스레드 종료 플래그
private bool m_bThreadExit;
// 카메라 화면
private CogDisplay[] m_objCogDisplay;
// 이미지 경로용 선택된 카메라 인덱스
private int m_iCameraIndex;
// 카메라별 이미지 배열
private CogImage8Grey[] m_objArrayCogImage;
// 테스트할 외부 이미지 경로 배열
private string[][] m_strFileNames;
// 검색 횟수
private int m_iSearchCount;
// 검색 지연 시간
private int m_iSearchDelay;
// 검색 시작 플래그
private bool m_bSearchStart;
// 검색 스레드
private Thread m_ThreadSearch;
```

<br>

### Form load시 초기화 함수
```c#	
private bool InitializeForm()
{
    bool bReturn = false;

    do {
      // 변수 초기화
      m_bThreadExit = false;
      m_iSearchCount = 1;
      m_iSearchDelay = 100;
      m_bSearchStart = false;
      // 이미지 경로용 선택된 카메라 인덱스
      m_iCameraIndex = ( int )enumCamera.CAMERA_1;
      checkBoxCamera1.Checked = true;
      // 카메라별 이미지 배열
      m_objArrayCogImage = new CogImage8Grey[ ( int )enumCamera.CAMERA_FINAL ];
      // 테스트할 외부 이미지 경로 배열
      m_strFileNames = new string[ ( int )enumCamera.CAMERA_FINAL ][];
      // 디스플레이 화면 생성
      m_objCogDisplay = new CogDisplay[ ( int )enumCamera.CAMERA_FINAL ];
      for( int iLoopCount = 0; iLoopCount < m_objCogDisplay.Length; iLoopCount++ ) {
        m_objCogDisplay[ iLoopCount ] = Contorls.Find( string.Format( $"cogDisplay{iLoopCount + 1}" ), true );
        m_objCogDisplay[ iLoopCount ].Fit( true );
      }

      // 타이머 제어
      timer.Interval = 100;
      timer.Enabled = true;

      // 검색 스레드
      m_ThreadSearch = new Thread( ThreadSearch );
      m_ThreadSearch.Start( this );

      bReturn = true;
    } while( false );

    return bReturn;
}
```

<br>

### 검색 함수
```c#
private void DoProcessSearch()
{
    // 카메라별 이미지 리스트 인덱스 초기화
    int[] iListImageIndex = new int[ ( int )enumCamera.CAMERA_FINAL ];
    for( int iLoopCount = 0; iLoopCount < ( int )enumCamera.CAMERA_FINAL; iLoopCount++ ) {
      iListImageIndex[ iLoopCount ] = 0;
    }

    for( int iSearchCount = 0; iSearchCount < m_iSearchCount; iSearchCount++ ) {
      // List 구조 [ 카메라 수량 ]
      var tasks = new List<Task>();
      Action<object> action = delegate ( object objParam ) {
        int iCameraCount = ( int )objParam;
        do {
          try {
            // 외부 경로로 파일을 로드할 경우 로드 시점에 경로만 가져오고 서치 시점에 해당 경로 이미지만 로드하여 서치 수행
            if( null != m_strFileNames[ iCameraCount ]
              && 0 < m_strFileNames[ iCameraCount ].Length ) {
              // 해당 카메라 이미지 리스트의 마지막 이미지 지날 시 다시 리스트의 처음 이미지로 검사
              if( iListImageIndex[ iCameraCount ] > m_strFileNames[ iCameraCount ].Length - 1 ) iListImageIndex[ iCameraCount ] = 0;
              Bitmap objBitmap = new Bitmap( m_strFileNames[ iCameraCount ][ iListImageIndex[ iCameraCount ] ] );
              CogImage8Grey objCogImage = new CogImage8Grey( objBitmap );
              m_objArrayCogImage[ iCameraCount ] = objCogImage;
            }
            // 해당 카메라 이미지 리스트가 비어있을 경우 검사 진행하지 않음
            if( null == m_objArrayCogImage[ iCameraCount ] ) break;

            // 패턴 검색 함수 - 생략됨 / 임시로 이미지 넣는 동작 넣어둠
            m_objCogDisplay[ iCameraCount ].Image = m_objArrayCogImage[ iCameraCount ];

            // 다음 이미지로 인덱스 증가
            iListImageIndex[ iCameraCount ]++;
          }
          catch( Exception ex ) {
            Trace.WriteLine( ex.ToString() );
          }
        } while( false );
      };
      // task 카메라 수량만큼 호출
      for( int iCameraCount = 0; iCameraCount < ( int )enumCamera.CAMERA_FINAL; iCameraCount++ ) {
        tasks.Add( Task.Factory.StartNew( action, iCameraCount ) );
      }
      if( 0 != tasks.Count ) {
        // Task 완료 대기
        Task.WaitAll( tasks.ToArray() );
      }
      if( false == m_bSearchStart
        || /*생산 모드 유무 확인*/ ) {
        break;
      }
      Thread.Sleep( m_iSearchDelay );
    }

    // 테스트 종료 시 정지
    m_bSearchStart = false;
}
```

<br>

### 스레드 함수
```c#
private static void ThreadSearch( object state )
{
    Form1 pThis = ( Form1 )state;
    // 스레드 주기
    int iThreadPeriod = 100;

    while( false == pThis.m_bThreadExit ) {
      if( true == pThis.m_bSearchStart ) {
        // 검색 함수 실행
        pThis.DoProcessSearch();
      }

      Thread.Sleep( iThreadPeriod );
    }
}
```

---

## 결과를 확인해 보자
실제 자재 이미지를 사용할 수는 없으므로 <span style="color: #8D4801">**예시 이미지를 사용하여 시뮬레이션**</span> 해보았다.
<center>
  <img data-src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2022-06-22-Writing-the-camera-simulation-function-using-image-file/image-search-test.gif" title="Example of image search test" alt="Example of image search test">
</center>

---

## 마무리하며...
이번 포스트에서는 이미지 파일을 이용하여 카메라 시뮬레이션 함수를 작성해 보았다. 온전히 내가 작성한 코드만 남기는 작업 중에 약간 어색하게 수정되었거나 비어있는 부분이 많아져서 코드가 불완전해진 것 같다. 참고 사항으로는 작성하는데 Winform 라이브러리 이외에 Cognex의 VisionPro 라이브러리가 사용되었다.