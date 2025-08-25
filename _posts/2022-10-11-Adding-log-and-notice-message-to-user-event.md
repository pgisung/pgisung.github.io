---
layout: post
title: 사용자 이벤트에 로그 및 알림 메시지 추가하기
date: 2022-10-11 19:05:04 +0900
img: csharp-logo.png
categories: C#
tags: [ C#, .Net Framework, UX, Log, Notice message ]
description: 사용자 이벤트에 로그를 남겨서 예외 발생 시 원인을 파악하기 쉽게 해보자. 또한 특정 상황에 실행되면 안 되는 이벤트는 알림 메시지를 띄워서 사용자가 오동작으로 오인하지 않도록 하자.
permalink: /csharp/:year/:month/:day/:title/
---

> 1. [작성 동기](#작성-동기 "Navigate to Motivation to write code")
2. [기능 구상](#기능-구상 "Navigate to Concept of the function")
3. [실행될 함수를 구현하자](#실행될-함수를-구현하자 "Navigate to Let's write a function to be executed")
- [NumericUpDown ValueChanged 이벤트](#numericupdown-valuechanged-이벤트 "Navigate to NumericUpDown ValueChanged event")
- [CheckBox CheckedChanged 이벤트](#checkbox-checkedchanged-이벤트 "Navigate to CheckBox CheckedChanged event")
- [Button Click 이벤트](#button-click-이벤트 "Navigate to Button Click event")

---

#### <span style="color: brown">**작성 동기**</span>
[이전 포스트]({{ site.baseurl }}/csharp/2022/05/16/Saving-various-types-of-model-into-files-using-reflection/#작성-동기 "Navigate to Reflection을 이용하여 서로 다른 타입의 값들을 파일에 저장하기 post")의 작성 동기와 같이 작업자가 프로그램의 무엇인가를 잘못 변경하고 그로 인해 생산에 오류가 발생했을 때 예상하지 못한 <span style="color: #8D4801">**오류 발생의 원인을 찾기 어려워서**</span> 힘들었던 경험이 있었고 또한 <span style="color: #8D4801">**책임 소재를 파악하기 어려워**</span> 결국 프로그램 개발자에게 화살을 돌리는 상황을 적지 않게 맞닥뜨렸었다. 이러한 상황에 최소한의 대응을 하기 위해 사용자 이벤트에 로그 추가를 결정했다.

<center>
  <img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2022-10-11-Adding-log-and-notice-message-to-user-event/case-there-is-no-notice-message.gif" title="Example for the case there is no notice message to click event" alt="Example for the case there is no notice message to click event" width="45%">
  <img src="https://pub-056cbc77efa44842832acb3cdce331b6.r2.dev/2022-10-11-Adding-log-and-notice-message-to-user-event/case-there-is-notice-message.gif" title="Example for the case there is notice message to click event" alt="Example for the case there is notice message to click event" width="45%">
</center>
<br>
알림 메시지는 순전히 필자가 느꼈던 불편함 때문에 추가하게 되었다. 특정 상황에 실행돼선 안되는 이벤트는 존재할 수 있지만 사용자의 작용에 대한 반응이 있어야 하는데 이벤트 동작만 막아둘 경우 <span style="color: #8D4801">**사용자 입장에선 동작하지 않는 원인을 알기 어렵고**</span> 단순히 버그로 치부해 버릴 수 있다. 위의 이미지를 비교해 보자.

이번 포스트 내용은 어떤 대단한 로직을 만들어내는 것은 아니지만 우리 프로그램의 사용자들에게 <span style="color: #8D4801">**개선된 사용자 경험을 전달**</span>하기 위해 노력한 것에 의의를 두고 싶다.

---

#### <span style="color: brown">**기능 구상**</span>
사실 로그는 기존에도 존재했다. 메인 프로세스가 실행될 때 별개의 프로세스로 로그 프로그램을 실행하여 사용자 또한 실시간으로 확인할 수 있게 되어있는데 문제는 <span style="color: #8D4801">**막상 로그를 기록하는 코드가 일관성이 없이 작성되어 있는 부분이 있고 없는 부분이 있어서**</span> 유지보수를 하려면 비효율적으로 모든 파일을 찾아보아야 했다. 이를 일반화하여 특정 모든 이벤트에 로그 기록하는 코드를 <span style="color: #8D4801">**일괄 적용**</span>할 수 있어야 한다. (이 포스트에서는 로그를 분류하여 실제로 파일에 저장하는 부분은 다루지 않고 콘솔 화면에 출력 함수로 대체한다.)

---

#### <span style="color: brown">**실행될 함수를 구현하자**</span>
우리 프로그램에서 가장 많은 수를 차지했던 컨트롤 몇 가지만 간단하게 다뤄보겠다. 
##### **NumericUpDown ValueChanged 이벤트**
기존의 이벤트 핸들러를 삭제하고 일반화 함수를 추가하여 새로운 이벤트 핸들러로 일괄 추가하고 싶었으나 이벤트가 발생하는 시점에 각각의 NumericUpDown 컨트롤이 <span style="color: #8D4801">**변경하고자 하는 모델의 변수를 알 수 있는 방법이 없어서**</span> 전역에서 쓰이는 싱글톤 객체에 <span style="color: #8D4801">**공통 함수**</span>를 만들어 모든 NumericUpDown 컨트롤에서 호출하도록 구현한다.
```c#
// 각 View에 존재하는 NumericUpDown ValueChanged 이벤트 핸들러
private void numericExample_ValueChanged( object sender, EventArgs e )
{
  m_objExample.dExample = CSingleton.GetSingleton.UpdateNumericUpDownValueChanged( sender, m_objExample.dExample );
}
// 전역 싱글톤 객체에 선언한 공통 함수
public double UpdateNumericUpDownValueChanged( object sender, double dValue )
{
  // 반환할 값 - 변경되지 않을 시 기존값을 반환
  double dReturn = dValue;

  do {
    // sender가 null일 경우 실행하지 않음
    if( null == sender ) {
      string strError = string.Format($"[{MethodBase.GetCurrentMethod().Name}] sender object is null");
      Trace.WriteLine( strError );
      MessageBox.Show( strError );
      break;
    }

    // 생산 모드일 경우 실행하지 않음
    if( /*모드 유무 확인*/ ) {
      string strError = string.Format("설비가 동작 중입니다. 정지 상태로 변경해 주세요.");
      MessageBox.Show( strError );
      break;
    }

    // 이벤트가 발생한 객체
    NumericUpDown objNumericUpDown = sender as NumericUpDown;

    // 값 변경될 때만
    double dOriginValue = dValue;
    double dChangedValue = ( double )objNumericUpDown.Value;

    if( dOriginValue != dChangedValue ) {
      // 모델에 Load한 데이터가 View의 NumericUpDown 최소, 최대값을 넘을 경우 런타임 에러 발생함
      // 최소, 최대값을 넘을 경우 최소, 최대값으로 값 입력
      double dMax = ( double )objNumericUpDown.Maximum;
      double dMin = ( double )objNumericUpDown.Minimum;
      if( dChangedValue > dMax ) {
        dChangedValue = dMax;
      } else if( dChangedValue < dMin ) {
        dChangedValue = dMin;
      }

      // 값 변경
      dReturn = dChangedValue;
      // 로그 기록 - 디버깅 후 NumericUpDown 컨트롤의 경우 너무 많이 남는 로그 때문에 삭제하고 저장하는 부분에서만 로그를 작성함
      // string strLog = string.Format($"[{objNumericUpDown.Name}] [{MethodBase.GetCurrentMethod().Name}] : {dOriginValue} -> {dChangedValue}");
      // Console.WriteLine( strLog );
    }
  } while( false );

  return dReturn;
}
```

<br>

##### **CheckBox CheckedChanged 이벤트**
값의 타입과 최소, 최대값 처리를 제외하고 NumericUpDown과 동일한 형태로 작성한다.
```c#
// 각 View에 존재하는 CheckBox CheckedChanged 이벤트 핸들러
private void checkBoxExample_CheckedChanged( object sender, EventArgs e )
{
  m_objExample.bExample = CSingleton.GetSingleton.UpdateCheckBoxCheckedChanged( sender, m_objExample.bExample );
}
// 전역 싱글톤 객체에 선언한 공통 함수
public bool UpdateCheckBoxCheckedChanged( object sender, bool bValue )
{
  // 반환할 값 - 변경되지 않을 시 기존값을 반환
  bool bReturn = bValue;

  do {
    // sender가 null일 경우 실행하지 않음
    if( null == sender ) {
      string strError = string.Format($"[{MethodBase.GetCurrentMethod().Name}] sender object is null");
      Trace.WriteLine( strError );
      MessageBox.Show( strError );
      break;
    }

    // 생산 모드일 경우 실행하지 않음
    if( /*모드 유무 확인*/ ) {
      string strError = string.Format("설비가 동작 중입니다. 정지 상태로 변경해 주세요.");
      MessageBox.Show( strError );
      break;
    }

    // 이벤트가 발생한 객체
    CheckBox objCheckBox = sender as CheckBox;

    // 값 변경될 때만
    bool bOriginValue = bValue;
    bool bChangedValue = objCheckBox.Checked;

    if( bOriginValue != bChangedValue ) {
      // 값 변경
      bReturn = bChangedValue;
      // 로그 기록
      string strLog = string.Format($"[{objCheckBox.Name}] [{MethodBase.GetCurrentMethod().Name}] : {bOriginValue} -> {bChangedValue}");
      Console.WriteLine( strLog );
    }
  } while( false );

  return bReturn;
}
```

<br>

##### **Button Click 이벤트**
클릭 이벤트의 실행이 제대로 완료되었는지 확인하기 위해 이벤트 실행 전과 후에 로그를 기록하는 이벤트 핸들러를 해당 <span style="color: #8D4801">**Form에서 클릭 이벤트를 가진 모든 버튼에 일괄 추가**</span>한다.
```c#
// 전역 싱글톤 객체에 선언한 외부로 호출되는 버튼 로그 추가 함수 - 각 Form을 초기화할 때 호출한다.
public void SetButtonLog( Form objForm )
{
    Button[] objBtn = GetAllButtonsRecursive( objForm );

    foreach( var btn in objBtn ) {
      AddClickEventHandler( btn );
    }
}
```
<br>

아래의 코드는 위의 외부 호출 함수 실행을 위해 정의한 함수들이다.
```c#
// 해당 컨트롤 내에 존재하는 모든 버튼 배열 반환 ( 자식 컨트롤러 내부의 버튼 포함 )
private Button[] GetAllButtonsRecursive( Control containerControl )
{
  List<Button> buttonList = new List<Button>();
  foreach( Control ctrl in containerControl.Controls ) {
    if( typeof( Button ) == ctrl.GetType() ) {
      buttonList.Add( ctrl as Button );
    }
    if( ctrl.Controls.Count > 0 ) {
      buttonList.AddRange( GetAllButtonsRecursive( ctrl ) );
    }
  }
  return buttonList.ToArray();
}
// 기존 클릭 이벤트를 지우고 시작 이벤트 -> 기존 클릭 이벤트 -> 종료 이벤트로 변경해 줌
private void AddClickEventHandler( Control obj )
{
  // 메서드 정보를 가져옴
  MethodInfo objMethod = this.GetType().GetMethod( "get_Events", BindingFlags.NonPublic | BindingFlags.Instance );
  // 메서드 정보와 인스턴스를 통해 이벤트 핸들러 목록을 가져옴
  EventHandlerList objEventList = objMethod.Invoke( obj, new object[] { } ) as EventHandlerList;
  // 해당 버튼 클래스에 Control Type을 가져옴
  Type objControlType = GetControlType( obj.GetType() );
  // 필드 정보를 가져옴
  FieldInfo objFieldInfo = objControlType.GetField( "EventClick", BindingFlags.NonPublic | BindingFlags.Static );
  // 필드 정보에서 해당 컨트롤을 지원하는 필드 값을 가져옴
  object objClickValue = objFieldInfo.GetValue( obj );
  // 등록된 델리게이트 이벤트를 가져옴
  Delegate delegateButtonClick = objEventList[ objClickValue ];
  // 클릭 이벤트가 등록되어 있지않을 시 변경하지 않음
  if( null == delegateButtonClick ) return;
  // 기존 클릭 이벤트를 지우고 시작 이벤트 -> 기존 클릭 이벤트 -> 종료 이벤트로 변경해 줌
  objEventList.RemoveHandler( objClickValue, delegateButtonClick );
  objEventList.AddHandler( objClickValue, new EventHandler( SetButtonStartLog ) );
  objEventList.AddHandler( objClickValue, delegateButtonClick );
  objEventList.AddHandler( objClickValue, new EventHandler( SetButtonEndLog ) );
}
// Control Type 검색
private Type GetControlType( Type objType )
{
  Type objReturn = null;
  // Type 이름 Control 재귀 함수로 검색
  if( "Control" != objType.Name ) {
    objReturn = GetControlType( objType.BaseType );
  } else {
    objReturn = objType;
  }
  return objReturn;
}
// 버튼 이벤트 시작 로그
private void SetButtonStartLog( object sender, EventArgs e )
{
  Form objForm = ( sender as Control ).FindForm();
  if( null == objForm ) return;

  string strLog = string.Format($"[{objForm.Name}] {( sender as Button ).Name} : [ Click event start ]");
  Console.WriteLine( strLog );
}
// 버튼 이벤트 종료 로그
private void SetButtonEndLog( object sender, EventArgs e )
{
  Form objForm = ( sender as Control ).FindForm();
  if( null == objForm ) return;

  string strLog = string.Format($"[{objForm.Name}] {( sender as Button ).Name} : [ Click event end ]");
  Console.WriteLine( strLog );
}
```

---

#### 마무리하며...
이번 포스트에서는 사용자 이벤트에 로그 및 알림 메시지를 추가해 보았다. 사실 '시스템 응용프로그램에서도 사용자 경험은 중요한 것이기 때문에 소홀히 하면 안 되겠다.'라고 말하고 싶었는데 이야기의 방향이 잘못되어서인지 아니면 기반이 되는 수정한 코드의 양이 부족해서 그런지 막상 어떻게 사용자 경험을 개선하고자 했는지 잘 표현하지 못한 것 같아 아쉬운 점이 있다. 다음 포스트에서는 좀 더 양질의 내용을 작성해 보겠노라 반성해 본다.