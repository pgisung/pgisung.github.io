---
layout: post
title: 리플렉션(Reflection)을 이용하여 서로 다른 타입의 값들을 파일에 저장하기
date: 2022-05-16 23:11:06 +0900
img: csharp-logo.png
categories: C#
tags: [ C#, .Net Framework, Reflection, Model, File write, Recursive function ]
description: Reflection을 이용한 단일 함수로 런타임 도중에 모델의 서로 다른 타입의 값들을 동적으로 파일에 저장해보자.
permalink: /csharp/:year/:month/:day/:title/
---

> 1. [작성 동기](#작성-동기 "Navigate to Motivation to write code")
2. [문제 인식](#문제-인식 "Navigate to Recognition of problem")
3. [기존의 저장 함수](#기존의-저장-함수 "Navigate to Original saving function")
4. [새로운 함수를 구현해 보자](#새로운-함수를-구현해-보자 "Navigate to Let's write new function")
- [열거형 멤버 변수 선언](#열거형-멤버-변수-선언 "Navigate to Declaration member enumeration variable")
- [메인 함수](#메인-함수 "Navigate to Main function")
- [저장 시 객체 이름 짓기 함수](#저장-시-객체-이름-짓기-함수 "Navigate to Function that naming instance for saving")
5. [구현한 함수의 장단점](#구현한-함수의-장단점 "Navigate to Strong and Weak point of the function written")
- [장점](#장점 "Navigate to Strong point")
- [단점](#단점 "Navigate to Weak point")

---

#### <span style="color: brown">**작성 동기**</span>
여느 때와 마찬가지로 설비 앞에서 노트북을 펼쳐놓고 업무를 하던 도중의 얘기다. 최근에 다른 부서에서 부서 이동을 하셨다는 책임님께서 갑자기 툭 던지듯이 말씀하셨다. "거 프로그램에 로그는 잘 남고 있나요?" 로그의 종류가 워낙 많아서 어떤 로그를 말씀하시는 건지 다시 여쭈었더니 <span style="color: #8D4801">**이전 프로젝트에서 잘 모르는 작업자가 무신경하게 잘못 저장한 파라미터로 인해 곤욕을 치렀던 경험**</span>을 말씀하셨고 현재 기록 중이지 않다면 로그를 추가해달라는 요청을 받았다.

요청을 받자마자 진행 중이던 프로젝트를 확인해 보았고 View에서 파라미터의 변경 이벤트가 발생할 때 일부 컨트롤에서만 로그가 저장 중이고 누락되어있는 컨트롤이 많음을 확인하였다. 또한 이는 ViewController에서의 변경만을 기록 중인 것이지 실제로 모델의 파라미터가 저장될 때 기록되는 로그는 없었기에 순전히 <span style="color: #8D4801">**로그를 추가하기 위한 작업에서부터 시작**</span>되었다.

---

#### <span style="color: brown">**문제 인식**</span>
모델의 파라미터가 저장될 때 로그를 기록하는 작업을 하기 위해 과장님께 보고했을 때 비슷한 요청을 받아 구현한 적이 있으니 한번 찾아보라는 말씀을 들었고 과거의 프로젝트를 뒤적거리던 도중 <span style="color: #8D4801">**ViewController에 빽빽하게 하드코딩 되어있는 로그**</span>들을 발견했다.

먼저 <span style="color: #8D4801">**모델 부분에서 저장하는 함수가 아니라**</span> ViewController에서 변경 이벤트가 발생한 파라미터들을 저장 함수를 호출하여 입력하는 부분에서 남기는 로그라는 것도 마음에 걸렸고 무엇보다 <span style="color: #8D4801">**수백 개에 달하는 파라미터들을 일일이 복사 붙여넣기 하는 것**</span>도 보통 일이 아니라고 생각되었다. 더 나아가서 이렇게 작성할 경우 다음 프로젝트를 진행할 때 그리고, <span style="color: #8D4801">**새로운 프로젝트를 시작할 때마다 또 다시 이런 대대적인 수정을 거쳐야 한다**</span>고 생각했다.

그래서 일단 로그 작성 위치를 <span style="color: #8D4801">**저장 함수 내부**</span>로 정해놓고 "수많은 서로 다른 타입의 파라미터들을 어떻게 해야 작은 effort로 로그를 남길 수 있을까?"와 "어떻게 작성해야 추후 유지보수에도 용이할까?"를 고민하게 되었고 그 결과로 채택한 것이 <span style="color: #8D4801">**Reflection 클래스**</span>이다.

저장 함수의 호출은 <span style="color: #8D4801">**런타임 도중에 유저가 발생시키는 이벤트**</span>로부터 시작되기 때문에 컴파일 단계에서 일반화하기 어렵다고 판단했다. 그렇게 로그 작성 작업을 시작하려는 도중에 문득 떠오른 것이 어차피 파라미터별로 변경되어 저장될 때마다 로그를 남겨야 한다면 "저장까지 실행하고 로그를 남기는 게 맞지 않나? 새로운 파라미터를 추가할 때마다 저장 함수에 매번 수동으로 추가해 주는 것도 불편한데..."라는 생각을 했고 <span style="color: #8D4801">**동적으로 저장하고 로그를 남기는 함수를 작성**</span>하게 되었다.

---

#### <span style="color: brown">**기존의 저장 함수**</span>
기존에 구현되어 있던 저장 함수 중 일부를 예시로 가져왔다. 이러한 형태로 모델마다 함수가 따로 있어 새로운 파라미터가 추가될 때마다 <span style="color: #8D4801">**수동으로 파라미터를 추가**</span>하는 것이 불가피하며 파라미터의 변경 여부를 확인하기 위해 <span style="color: #8D4801">**일일이 조건문으로 비교**</span>해야 한다. 현상을 유지하며 로그를 추가하려면 <span style="color: #8D4801">**모든 파라미터에 각각 로그를 추가하거나, 따로 파라미터의 변경 여부를 한 번 더 비교**</span>하면서 함수를 작성해야 한다.
```c#
// ----- 함수 앞부분 생략 -----

// 원본 대상
var varParameterOrigin = m_objParameter[ iIndex ];
// 적용 대상
var varParameter = objParameter;

if( varParameterOrigin.iExample != varParameter.iExample ) {
  objINI.WriteValue( strSection, "iExample", varParameter.iExample );
}
if( varParameterOrigin.bExample != varParameter.bExample ) {
  objINI.WriteValue( strSection, "bExample", varParameter.bExample );
}
if( varParameterOrigin.objExample.bExample != varParameter.objExample.bExample ) {
  objINI.WriteValue( strSection, "objExample.bExample", varParameter.objExample.bExample );
}
if( varParameterOrigin.eExample != varParameter.eExample ) {
  objINI.WriteValue( strSection, "eExample", ( int )varParameter.eExample );
}
if( varParameterOrigin.objExample.dExample != varParameter.objExample.dExample ) {
  objINI.WriteValue( strSection, "objExample.dExample", varParameter.objExample.dExample );
}

// ----- 함수 뒷부분 생략 -----
```

---

#### <span style="color: brown">**새로운 함수를 구현해 보자**</span>
##### **열거형 멤버 변수 선언**
```c#
private enum enumInstanceNameType
{
  TYPE_NONE = 0,
  TYPE_SINGLE,
  TYPE_DIMENSION_1,
  TYPE_DIMENSION_2,
}
```
- 메인 함수 내에서 <span style="color: #8D4801">**재귀적으로 함수 호출이 일어날 때 저장되는 객체의 파라미터명을 결정**</span>하기 위한 열거형 변수이다.
- 메인 함수의 매개변수에 TYPE_NONE이 기본값으로 설정되어 있다.
- | 변수 | 의미 |
|:---:|:---:|
| **TYPE_NONE** | 재귀호출이 아닌 최초 호출로 실행되는 함수를 의미한다. |
| **TYPE_SINGLE** | 1번 이상 재귀호출로 내부의 클래스 또는 구조체를 저장하는 함수를 의미한다. |
| **TYPE_DIMENSION_1** | 1번 이상 재귀호출로 내부의 1차원 배열 또는 컬렉션을 저장하는 함수를 의미한다. |
| **TYPE_DIMENSION_2** | 2번 이상 재귀호출로 내부의 2차원 배열을 저장하는 함수를 의미한다. |

<br>

##### **메인 함수**
- <span style="color: #8D4801">**원본 함수**</span>
  - 먼저 원본 함수를 확인해 보자. 함수가 재귀적으로 호출되는 데다가 산재해 있는 예외 처리 로그들로 인해 <span style="color: #8D4801">**결과물의 가독성이 매우 떨어지고 복잡**</span>할 수 있다. 아래에서 하나씩 따로 <span style="color: #8D4801">**분리해서 알아보자.**</span> (이 포스트에서는 로그를 분류하여 실제로 파일에 저장하는 부분은 다루지 않고 콘솔 화면에 출력 함수로 대체한다.)

- ```c#
/// <summary>
/// 각 Config 파라미터 동적으로 타입별 저장 및 로그 작성
/// </summary>
/// <param name="objINI"></param>
/// <param name="strSection"></param>
/// <param name="origin"></param> 원본 Class
/// <param name="changed"></param> 변화된 적용 Class
/// <param name="strTotalInstanceName"></param> 해당 파라미터에 추가되는 최종 구조체 또는 클래스 명
/// <param name="eInstanceNameType"></param> 파라미터 명에 구조체 또는 클래스 이름 타입에 따라 저장
/// <param name="iDimensionIndex"></param> 객체 배열 형태일 경우 파라미터 명에 추가할 인덱스 인자
public void SetWriteValue( ClassINI objINI, string strSection, object origin, object changed, string strTotalInstanceName = "", enumInstanceNameType eInstanceNameType = enumInstanceNameType.TYPE_NONE, int[] iDimensionIndex = null )
{
    // 값 형식인지 참조 형식인지 타입 코드 비교
    TypeCode eTypeCode;
    // 클래스 또는 구조체의 경우 해당 객체 명을 필드명 앞에 붙여줘야 함
    string strInstanceName = GetInstanceName( strTotalInstanceName, origin.GetType().Name, eInstanceNameType, iDimensionIndex );

    // 원본 멤버 Dictionary 리스트
    var originFields = origin.GetType()
          .GetFields()
          .Select( field => field )
          .ToDictionary( field => field.Name, field => field.GetValue( origin ) );

    // 적용 멤버 Dictionary 리스트
    var newFields = changed.GetType()
          .GetFields()
          .Select( field => field )
          .ToDictionary( field => field.Name, field => field.GetValue( changed ) );

    // 원본과 적용 리스트 멤버의 정렬 및 순서가 같으므로 첫 인덱스부터 비교 
    foreach( var originField in originFields ) {
      // 해당 원소 멤버의 타입 
      Type objFieldType = originField.Value.GetType();
      // 적용 원소 멤버
      var newField = newFields.First();
      // 값 형식 타입의 경우 직접 비교, 참조 형식 타입의 경우 각 타입에 따라 다르게 비교 구조체, 클래스의 경우 재귀 호출
      eTypeCode = Type.GetTypeCode( objFieldType );
      switch( eTypeCode ) {
        case TypeCode.Boolean:
        case TypeCode.Int32:
        case TypeCode.Double:
        case TypeCode.String:
          if( false == originField.Value.Equals( newField.Value ) ) {
            // 실제 파라미터 저장 부분
            objINI.WriteValueNoMatterWhat( strSection, strInstanceName + newField.Key, newField.Value );
            // 로그
            string strLog = string.Format( "[{0}] {1} : {2} -> {3}", strSection, strInstanceName + originField.Key, originField.Value, newField.Value );
            Console.WriteLine( strLog );
          }
          break;
        case TypeCode.Object:
          if( objFieldType.IsArray )
          {
            Array originArrayField = originField.Value as Array;
            Array newArrayField = newField.Value as Array;

            // 해당 배열 원소의 타입 
            eTypeCode = Type.GetTypeCode( objFieldType.GetElementType() );
            switch( eTypeCode ) {
              case TypeCode.Boolean:
              case TypeCode.Int32:
              case TypeCode.Double:
              case TypeCode.String:
                // 배열의 경우 차수 체크
                switch( objFieldType.GetArrayRank() ) {
                  case 1:
                    for( int iLoopCount = 0; iLoopCount < originArrayField.Length; iLoopCount++ ) {
                      if( false == originArrayField.GetValue( iLoopCount ).Equals( newArrayField.GetValue( iLoopCount ) ) ) {
                        // 실제 파라미터 저장 부분
                        objINI.WriteValueNoMatterWhat( strSection, strInstanceName + newField.Key + $"[{iLoopCount}]", newArrayField.GetValue( iLoopCount ) );
                        // 로그
                        string strLog = string.Format( "[{0}] {1} : {2} -> {3}", strSection, strInstanceName + originField.Key + $"[{iLoopCount}]", originArrayField.GetValue( iLoopCount ), newArrayField.GetValue( iLoopCount ) );
                        Console.WriteLine( strLog );
                      }
                    }
                    break;
                  default:
                    // 예외 처리
                    string strLog = string.Format( "{0} {1} {2} undetermined ArrayRank : {3}",
                      this.GetType().Name,
                      MethodBase.GetCurrentMethod().Name,
                      Type.GetTypeCode( objFieldType ),
                      objFieldType.GetArrayRank() );
                    Trace.WriteLine( strLog );
                    break;
                }
                break;
              case TypeCode.Object:
                // 배열의 경우 차수 체크
                switch( objFieldType.GetArrayRank() ) {
                  case 1:
                    // 2차원 Jagged 배열 부분 현재 3차원 이상의 배열은 없는 관계로 2차원까지만 정의되어 있음. 필요시 추후 수정 필요
                    if( objFieldType.GetElementType().IsArray ) {
                      for( int iLoopCount = 0; iLoopCount < originArrayField.Length; iLoopCount++ ) {
                        Array originJaggedArrayField = originArrayField.GetValue( iLoopCount ) as Array;
                        Array newJaggedArrayField = newArrayField.GetValue( iLoopCount ) as Array;

                        eTypeCode = Type.GetTypeCode( originArrayField.GetValue( iLoopCount ).GetType().GetElementType() );
                        switch( eTypeCode ) {
                          case TypeCode.Boolean:
                          case TypeCode.Int32:
                          case TypeCode.Double:
                          case TypeCode.String:
                            for( int jLoopCount = 0; jLoopCount < originJaggedArrayField.Length; jLoopCount++ ) {
                              if( false == originJaggedArrayField.GetValue( jLoopCount ).Equals( newJaggedArrayField.GetValue( jLoopCount ) ) ) {
                                // 실제 파라미터 저장 부분
                                objINI.WriteValueNoMatterWhat( strSection, strInstanceName + newField.Key + $"[{iLoopCount}]" + $"[{jLoopCount}]", newJaggedArrayField.GetValue( jLoopCount ) );
                                // 로그
                                string strLog = string.Format( "[{0}] {1} : {2} -> {3}", strSection, strInstanceName + originField.Key + $"[{iLoopCount}]" + $"[{jLoopCount}]", originJaggedArrayField.GetValue( jLoopCount ), newJaggedArrayField.GetValue( jLoopCount ) );
                                Console.WriteLine( strLog );
                              }
                            }
                            break;
                          case TypeCode.Object:
                            if( originArrayField.GetValue( iLoopCount ).GetType().GetElementType().IsClass
                              || originArrayField.GetValue( iLoopCount ).GetType().GetElementType().Name.Contains( "structure" ) ) {
                              for( int jLoopCount = 0; jLoopCount < originJaggedArrayField.Length; jLoopCount++ ) {
                                SetWriteValue( objINI, strSection, originJaggedArrayField.GetValue( jLoopCount ), newJaggedArrayField.GetValue( jLoopCount ), strInstanceName, enumInstanceNameType.TYPE_DIMENSION_2, new int[]{ iLoopCount, jLoopCount } );
                              }
                            }
                            break;
                          default:
                            break;
                        }
                      }
                    } else if( objFieldType.GetElementType().IsClass
                      || objFieldType.GetElementType().Name.Contains( "structure" ) ) {
                      for( int iLoopCount = 0; iLoopCount < originArrayField.Length; iLoopCount++ ) {
                        SetWriteValue( objINI, strSection, originArrayField.GetValue( iLoopCount ), newArrayField.GetValue( iLoopCount ), strInstanceName, enumInstanceNameType.TYPE_DIMENSION_1, new int[] { iLoopCount } );
                      }
                    }
                    break;
                  default:
                    // 예외 처리
                    string strLog = string.Format( "{0} {1} {2} undetermined ArrayRank : {3}",
                      this.GetType().Name,
                      MethodBase.GetCurrentMethod().Name,
                      Type.GetTypeCode( objFieldType ),
                      objFieldType.GetArrayRank() );
                    Trace.WriteLine( strLog );
                    break;
                }
                
                break;
              default:
                // 예외 처리
                string strLog = string.Format( "{0} {1} {2} undetermined TypeCode {3} {4} {5}",
                  this.GetType().Name,
                  MethodBase.GetCurrentMethod().Name,
                  Type.GetTypeCode( objFieldType.GetElementType() ),
                  strSection,
                  originField.Key,
                  originArrayField.GetValue( 0 ) );
                Trace.WriteLine( strLog );
                break;
            }
          }
          else if( null != objFieldType.GetInterface( "System.Collections.ICollection" ) ) // 컬렉션 // 현재 선언되어 있는 모든 컬렉션이 제네릭 타입이므로 제네릭타입 확인 추후 ArrayList등 제네릭이 아닌 컬렉션 사용 시 수정 필요
          {
            Array originCollectionField = new ArrayList( originField.Value as ICollection ).ToArray();
            Array newCollectionField = new ArrayList( newField.Value as ICollection ).ToArray();

            eTypeCode = Type.GetTypeCode( objFieldType.GenericTypeArguments[ 0 ] );
            switch( eTypeCode ) {
              case TypeCode.Boolean:
              case TypeCode.Int32:
              case TypeCode.Double:
              case TypeCode.String:
                for( int iLoopCount = 0; iLoopCount < originCollectionField.Length; iLoopCount++ ) {
                  if( false == originCollectionField.GetValue( iLoopCount ).Equals( newCollectionField.GetValue( iLoopCount ) ) ) {
                    // 실제 파라미터 저장 부분
                    objINI.WriteValueNoMatterWhat( strSection, strInstanceName + newField.Key + $"[{iLoopCount}]", newCollectionField.GetValue( iLoopCount ) );
                    // 로그
                    string strLog = string.Format( "[{0}] {1} : {2} -> {3}", strSection, strInstanceName + originField.Key + $"[{iLoopCount}]", originCollectionField.GetValue( iLoopCount ), newCollectionField.GetValue( iLoopCount ) );
                    Console.WriteLine( strLog );
                  }
                }
                break;
              case TypeCode.Object:
                if( objFieldType.GenericTypeArguments[ 0 ].IsClass
                  || objFieldType.GenericTypeArguments[ 0 ].Name.Contains( "structure" ) ) {
                  for( int iLoopCount = 0; iLoopCount < originCollectionField.Length; iLoopCount++ ) {
                    SetWriteValue( objINI, strSection, originCollectionField.GetValue( iLoopCount ), newCollectionField.GetValue( iLoopCount ), strInstanceName, enumInstanceNameType.TYPE_DIMENSION_1, new int[] { iLoopCount } );
                  }
                }
                break;
              default:
                // 예외 처리
                string strLog = string.Format( "{0} {1} {2} undetermined TypeCode {3} {4} {5}",
                  this.GetType().Name,
                  MethodBase.GetCurrentMethod().Name,
                  Type.GetTypeCode( originField.Value.GetType().GetProperty( "Item" ).GetType() ),
                  strSection,
                  originField.Key,
                  originField.Value.GetType().GetProperty( "Item" ) );
                Trace.WriteLine( strLog );
                break;
            }
          }
          else if( objFieldType.IsClass
            || objFieldType.Name.Contains( "structure" ) )
          {
            SetWriteValue( objINI, strSection, originField.Value, newField.Value, strInstanceName, enumInstanceNameType.TYPE_SINGLE );
          }
          break;
        default:
          // 예외 처리
          string strLog = string.Format( "{0} {1} {2} undetermined TypeCode {3} {4} {5}",
            this.GetType().Name,
            MethodBase.GetCurrentMethod().Name,
            Type.GetTypeCode( objFieldType ),
            strSection,
            originField.Key,
            originField.Value );
          Trace.WriteLine( strLog );
          break;
      }
      // 항상 첫 번째 인덱스로 접근하기 위해 처리한 첫 번째 원소 제거
      newFields.Remove( newField.Key );
    }
}
```

<br>

- <span style="color: #8D4801">**매개변수**</span>
```c#
public void SetWriteValue( 
    ClassINI objINI,
    string strSection,
    object origin,
    object changed,
    string strTotalInstanceName = "",
    enumInstanceNameType eInstanceNameType = enumInstanceNameType.TYPE_NONE,
    int[] iDimensionIndex = null
)
```
  - | 변수 | 의미 |
|:---:|:---:|
| **objINI** | ini 파일을 생성하고 저장하는 객체 (사용자의 필요에 따라 수정)  |
| **strSection** | 파일 내에 파라미터가 저장될 특정 섹션 (사용자의 필요에 따라 수정) |
| **origin** | 현재 파일에 기록되어 있는 원본 객체 |
| **changed** | 수정되어서 파일에 기록하려고 하는 객체 |
| **strTotalInstanceName** | 지금까지의 호출 스택 중 누적된 파라미터 명 |
| **eInstanceNameType** | 현재 호출 단계를 확인하기 위한 열거형 변수 |
| **iDimensionIndex** | 배열 또는 컬렉션의 인덱스를 네이밍에 추가하기 위한 변수 |

<br>

- <span style="color: #8D4801">**변수 초기화**</span>
```c#
// 값 형식인지 참조 형식인지 타입 코드 비교
TypeCode eTypeCode;
// 클래스 또는 구조체의 경우 해당 객체 명을 필드명 앞에 붙여줘야 함
string strInstanceName = GetInstanceName( strTotalInstanceName, origin.GetType().Name, eInstanceNameType, iDimensionIndex );
// 원본 멤버 Dictionary 리스트
var originFields = origin.GetType()
      .GetFields()
      .Select( field => field )
      .ToDictionary( field => field.Name, field => field.GetValue( origin ) );
// 적용 멤버 Dictionary 리스트
var newFields = changed.GetType()
      .GetFields()
      .Select( field => field )
      .ToDictionary( field => field.Name, field => field.GetValue( changed ) );
```
  - eTypeCode는 반복문을 돌며 <span style="color: #8D4801">**각 파라미터의 타입을 판별**</span>하기 위해 사용한다.
  - strInstanceName은 클래스 또는 구조체의 경우 해당 <span style="color: #8D4801">**객체 명을 저장될 파라미터 명 앞에 네이밍을 추가**</span>하기 위해 사용한다.
  - originFields와 newFields는 입력된 객체로부터 필드 즉, <span style="color: #8D4801">**모든 파라미터를 불러와서 변수명과 값을 분리하여 Dictionary 형태로 변환**</span>한다.

<br>

- <span style="color: #8D4801" id="반복문">**반복문**</span>
```c#
// 원본과 적용 리스트 멤버의 정렬 및 순서가 같으므로 첫 인덱스부터 비교 
foreach( var originField in originFields ) {
    // 해당 원소 멤버의 타입 
    Type objFieldType = originField.Value.GetType();
    // 적용 원소 멤버
    var newField = newFields.First();
    // 값 형식 타입의 경우 직접 비교, 참조 형식 타입의 경우 각 타입에 따라 다르게 비교 구조체, 클래스의 경우 재귀 호출
    eTypeCode = Type.GetTypeCode( objFieldType );
    switch( eTypeCode ) {
      case TypeCode.Boolean:
      case TypeCode.Int32:
      case TypeCode.Double:
      case TypeCode.String:
        if( false == originField.Value.Equals( newField.Value ) ) {
          // 실제 파라미터 저장 부분
          objINI.WriteValueNoMatterWhat( strSection, strInstanceName + newField.Key, newField.Value );
          // 저장 로그
        }
        break;
      case TypeCode.Object:
        // 배열
        if( objFieldType.IsArray )
        {
          // 일단 파라미터의 타입이 배열일 경우 생략
        }
        // 컬렉션
        else if( null != objFieldType.GetInterface( "System.Collections.ICollection" ) )
        {
          // 일단 파라미터의 타입이 컬렉션일 경우 생략
        }
        // 클래스 또는 구조체
        else if( objFieldType.IsClass
          || objFieldType.Name.Contains( "structure" ) )
        {
          // 재귀 호출
          SetWriteValue( objINI, strSection, originField.Value, newField.Value, strInstanceName, enumInstanceNameType.TYPE_SINGLE );
        }
        break;
      default:
        // 예외 처리
        break;
    }
    // 항상 첫 번째 인덱스로 접근하기 위해 처리한 첫 번째 원소 제거
    newFields.Remove( newField.Key );
}
```
  - [배열 구현부](#배열-구현부 "Navigate to Code block for the field in array condition")와 [컬렉션 구현부](#컬렉션-구현부 "Navigate to Code block for the field in collection condition"), 저장 로그와 예외 처리 부분은 <span style="color: #8D4801">**가독성을 위해 생략**</span>한 상태이다.
  - origin과 changed 객체는 <span style="color: #8D4801">**본래 같은 클래스의 객체로써 정렬 및 순서가 같으므로**</span> originFields의 각 필드를 순차적으로 순회하면서 newFields의 첫 번째 요소와 비교를 진행하며 <span style="color: #8D4801">**서로 값이 다를 경우**</span>에만 실제 파일에 write 하는 함수를 호출하고 반복문이 종료되기 전에 비교를 완료한 newFields의 요소를 제거한다.
  - 각 파라미터가 가질 수 있는 <span style="color: #8D4801">**타입**</span>은 다음과 같다.
```c#
public enum TypeCode
{
      Empty = 0,
      Object = 1,
      DBNull = 2,
      Boolean = 3,
      Char = 4,
      SByte = 5,
      Byte = 6,
      Int16 = 7,
      UInt16 = 8,
      Int32 = 9,
      UInt32 = 10,
      Int64 = 11,
      UInt64 = 12,
      Single = 13,
      Double = 14,
      Decimal = 15,
      DateTime = 16,
      String = 18
}
```
  - 대부분의 <span style="color: #8D4801">**기본 데이터 타입**</span>은 Switch 문으로 필터링하여 바로 파라미터 비교 후 저장을 진행하면 된다. 문제는 <span style="color: #8D4801">**인스턴스 타입**</span>인데 배열과 컬렉션, 클래스, 구조체를 위와 같이 조건문으로 구분해야 한다. 또한 이들은 직접 파라미터로 저장되는 것이 아니라 내부의 파라미터를 저장하기 위해 함수를 <span style="color: #8D4801">**재귀 호출**</span>해야한다.
  - <span style="color: #8D4801">**구조체의 경우**</span>에 따로 구분하는 방법이 없어서 <span style="color: #8D4801">**네이밍으로 구분**</span>하는 방법을 채택하였다.

<br>

- <span style="color: #8D4801" id="배열-구현부">**파라미터의 타입이 배열인 경우**</span>
```c#
Array originArrayField = originField.Value as Array;
Array newArrayField = newField.Value as Array;
// 해당 배열 원소의 타입 
eTypeCode = Type.GetTypeCode( objFieldType.GetElementType() );
switch( eTypeCode ) {
    case TypeCode.Boolean:
    case TypeCode.Int32:
    case TypeCode.Double:
    case TypeCode.String:
      // 배열의 경우 차수 체크
      switch( objFieldType.GetArrayRank() ) {
        case 1:
          for( int iLoopCount = 0; iLoopCount < originArrayField.Length; iLoopCount++ ) {
            if( false == originArrayField.GetValue( iLoopCount ).Equals( newArrayField.GetValue( iLoopCount ) ) ) {
              // 실제 파라미터 저장 부분
              objINI.WriteValueNoMatterWhat( strSection, strInstanceName + newField.Key + $"[{iLoopCount}]", newArrayField.GetValue( iLoopCount ) );
              // 저장 로그
            }
          }
          break;
        default:
          // 예외 처리
          break;
      }
      break;
    case TypeCode.Object:
      // 배열의 경우 차수 체크
      switch( objFieldType.GetArrayRank() ) {
        case 1:
          // 2차원 Jagged 배열 부분 현재 3차원 이상의 배열은 없는 관계로 2차원까지만 정의되어 있음. 필요시 추후 수정 필요
          if( objFieldType.GetElementType().IsArray ) {
            for( int iLoopCount = 0; iLoopCount < originArrayField.Length; iLoopCount++ ) {
              Array originJaggedArrayField = originArrayField.GetValue( iLoopCount ) as Array;
              Array newJaggedArrayField = newArrayField.GetValue( iLoopCount ) as Array;

              eTypeCode = Type.GetTypeCode( originArrayField.GetValue( iLoopCount ).GetType().GetElementType() );
              switch( eTypeCode ) {
                case TypeCode.Boolean:
                case TypeCode.Int32:
                case TypeCode.Double:
                case TypeCode.String:
                  for( int jLoopCount = 0; jLoopCount < originJaggedArrayField.Length; jLoopCount++ ) {
                    if( false == originJaggedArrayField.GetValue( jLoopCount ).Equals( newJaggedArrayField.GetValue( jLoopCount ) ) ) {
                      // 실제 파라미터 저장 부분
                      objINI.WriteValueNoMatterWhat( strSection, strInstanceName + newField.Key + $"[{iLoopCount}]" + $"[{jLoopCount}]", newJaggedArrayField.GetValue( jLoopCount ) );
                      // 저장 로그
                    }
                  }
                  break;
                case TypeCode.Object:
                  if( originArrayField.GetValue( iLoopCount ).GetType().GetElementType().IsClass
                    || originArrayField.GetValue( iLoopCount ).GetType().GetElementType().Name.Contains( "structure" ) ) {
                    for( int jLoopCount = 0; jLoopCount < originJaggedArrayField.Length; jLoopCount++ ) {
                      // 재귀 호출
                      SetWriteValue( objINI, strSection, originJaggedArrayField.GetValue( jLoopCount ), newJaggedArrayField.GetValue( jLoopCount ), strInstanceName, enumInstanceNameType.TYPE_DIMENSION_2, new int[]{ iLoopCount, jLoopCount } );
                    }
                  }
                  break;
                default:
                  // 예외 처리
                  break;
              }
            }
          } else if( objFieldType.GetElementType().IsClass
            || objFieldType.GetElementType().Name.Contains( "structure" ) ) {
            for( int iLoopCount = 0; iLoopCount < originArrayField.Length; iLoopCount++ ) {
              // 재귀 호출
              SetWriteValue( objINI, strSection, originArrayField.GetValue( iLoopCount ), newArrayField.GetValue( iLoopCount ), strInstanceName, enumInstanceNameType.TYPE_DIMENSION_1, new int[] { iLoopCount } );
            }
          }
          break;
        default:
          // 예외 처리
          break;
      }
      
      break;
    default:
      // 예외 처리
      break;
}
```
  - 기본적으로 큰 틀의 동작은 <span style="color: #8D4801">**위의 [반복문 코드](#반복문 "Navigate to Loop block in main function")와 동일한 로직**</span>을 인덱스별로 다시 반복하는 것과 같다.
  - Type 클래스의 <span style="color: #8D4801">**GetArrayRank 함수를 통해 배열의 차수를 확인**</span>하려 했으나 2차원 배열의 경우 1차원 배열 안에 또다시 배열들이 존재하는 <span style="color: #8D4801">**Jagged 배열의 형태**</span>로 밖에 확인할 수가 없어서 코드가 더 복잡해졌다. (case에 Rank가 2차원 이상을 시도해 보았으나 동작하지 않았다.)

<br>

- <span style="color: #8D4801" id="컬렉션-구현부">**파라미터의 타입이 컬렉션인 경우**</span>
```c#
Array originCollectionField = new ArrayList( originField.Value as ICollection ).ToArray();
Array newCollectionField = new ArrayList( newField.Value as ICollection ).ToArray();
// 해당 컬렉션 원소의 타입
eTypeCode = Type.GetTypeCode( objFieldType.GenericTypeArguments[ 0 ] );
switch( eTypeCode ) {
    case TypeCode.Boolean:
    case TypeCode.Int32:
    case TypeCode.Double:
    case TypeCode.String:
      for( int iLoopCount = 0; iLoopCount < originCollectionField.Length; iLoopCount++ ) {
        if( false == originCollectionField.GetValue( iLoopCount ).Equals( newCollectionField.GetValue( iLoopCount ) ) ) {
          // 실제 파라미터 저장 부분
          objINI.WriteValueNoMatterWhat( strSection, strInstanceName + newField.Key + $"[{iLoopCount}]", newCollectionField.GetValue( iLoopCount ) );
          // 저장 로그
        }
      }
      break;
    case TypeCode.Object:
      if( objFieldType.GenericTypeArguments[ 0 ].IsClass
        || objFieldType.GenericTypeArguments[ 0 ].Name.Contains( "structure" ) ) {
        for( int iLoopCount = 0; iLoopCount < originCollectionField.Length; iLoopCount++ ) {
          // 재귀 호출
          SetWriteValue( objINI, strSection, originCollectionField.GetValue( iLoopCount ), newCollectionField.GetValue( iLoopCount ), strInstanceName, enumInstanceNameType.TYPE_DIMENSION_1, new int[] { iLoopCount } );
        }
      }
      break;
    default:
      // 예외 처리
      break;
}
```
  - 기본적으로 큰 틀의 동작은 <span style="color: #8D4801">**위의 [반복문 코드](#반복문 "Navigate to Loop block in main function")와 동일한 로직**</span>을 인덱스별로 다시 반복하는 것과 같다.

<br>

##### **저장 시 객체 이름 짓기 함수**
```c#
/// <summary>
/// Type에서 클래스 명의 'C' 또는 구조체 명의 "Structure"의 경우 "obj"로 변경하여 필드명 앞에 추가
/// </summary>
/// <param name="strTotalInstanceName"></param>
/// <param name="strBaseObjectName"></param>
/// <param name="eInstanceNameType"></param>
/// <param name="iDimensionIndex"></param>
/// <returns></returns>
public string GetInstanceName( string strTotalInstanceName, string strBaseObjectName, enumInstanceNameType eInstanceNameType, int[] iDimensionIndex )
{
  string strInstanceName;
  switch( eInstanceNameType ) {
    case enumInstanceNameType.TYPE_SINGLE:
      if( strBaseObjectName.Contains( "structure" ) ) {
        // 구조체일 경우 "structure"를 "obj"로 변경
        strInstanceName = strTotalInstanceName + strBaseObjectName.Replace( "structure", "obj" ) + ".";
      } else {
        // 클래스일 경우 'C'를 "obj"로 변경
        strInstanceName = strTotalInstanceName + "obj" + strBaseObjectName.Substring( 1, strBaseObjectName.Length - 1 ) + ".";
      }
      break;
    case enumInstanceNameType.TYPE_DIMENSION_1:
      if( strBaseObjectName.Contains( "structure" ) ) {
        // 구조체일 경우 "structure"를 "obj"로 변경
        strInstanceName = strTotalInstanceName + strBaseObjectName.Replace( "structure", "obj" ) + string.Format( $"[{iDimensionIndex[ 0 ]}]" ) + ".";
      } else {
        // 클래스일 경우 'C'를 "obj"로 변경
        strInstanceName = strTotalInstanceName + "obj" + strBaseObjectName.Substring( 1, strBaseObjectName.Length - 1 ) + string.Format( $"[{iDimensionIndex[ 0 ]}]" ) + ".";
      }
      break;
    case enumInstanceNameType.TYPE_DIMENSION_2:
      if( strBaseObjectName.Contains( "structure" ) ) {
        // 구조체일 경우 "structure"를 "obj"로 변경
        strInstanceName = strTotalInstanceName + strBaseObjectName.Replace( "structure", "obj" ) + string.Format( $"[{iDimensionIndex[ 0 ]}][{iDimensionIndex[ 1 ]}]" ) + ".";
      } else {
        // 클래스일 경우 'C'를 "obj"로 변경
        strInstanceName = strTotalInstanceName + "obj" + strBaseObjectName.Substring( 1, strBaseObjectName.Length - 1 ) + string.Format( $"[{iDimensionIndex[ 0 ]}][{iDimensionIndex[ 1 ]}]" ) + ".";
      }
      break;
    case enumInstanceNameType.TYPE_NONE:
    default:
      strInstanceName = strTotalInstanceName;
      break;
  }
  return strInstanceName;
}
```
- 메인 함수 내에서 <span style="color: #8D4801">**재귀적으로 함수 호출이 일어날 때 저장되는 객체의 파라미터 명을 결정**</span>하기 위한 함수로 메인 함수의 시작 부분에서 호출된다.
- 이 로직의 <span style="color: indianred">**치명적인 단점**</span> 중 하나로 Class와 Structure의 <span style="color: indianred">**특정 네이밍이 강제**</span>된다. Class의 앞에는 'C'를 Structure 앞에는 'structure' 그리고 이들의 변수명은 동일한 네이밍에 'C'와 'structure' 대신에 'obj'를 붙여야 함수가 정상 동작할 수 있다.
- 필자의 경우 회사에서 모두가 공용으로 사용하는 Convention이라서 이러한 네이밍을 채택하였고 큰 문제가 없을 수 있었고, 만약 이 로직을 사용하게 된다면 당사의 Convention에 맞춰서 이 함수를 수정하면 정상 동작할 수 있다.
- | 변수 | 의미 |
|:---:|:---:|
| **strTotalInstanceName** | 지금까지의 호출 스택 중 누적된 파라미터 명 |
| **strBaseObjectName** | 현재 호출 단계에서의 타깃 객체 파라미터 명 |
| **eInstanceNameType** | 현재 호출 단계를 확인하기 위한 열거형 변수 |
| **iDimensionIndex** | 배열 또는 컬렉션의 인덱스를 네이밍에 추가하기 위한 변수 |

---

#### <span style="color: brown">**구현한 함수의 장단점**</span>
##### **장점**
1. 한 번만 함수 구현을 제대로 해두면 새로운 파라미터가 지속해서 추가되더라도 <span style="color: #8D4801">**추가 작업이 필요하지 않다.**</span>
2. 단 하나의 함수로 기능이 일반화 되어있어 <span style="color: #8D4801">**일괄 수정에 용이**</span>하다.
3. 다른 프로젝트로의 <span style="color: #8D4801">**이식이 하드코딩에 비해 편리**</span>하다.
4. 절대적인 코드의 양이 줄어들어 함수 구현부를 제외한 <span style="color: #8D4801">**코드의 가독성이 좋아진다.**</span>

<br>

##### **단점**
1. Reflection은 전반적으로 <span style="color: indianred">**동작이 느리다.**</span> 극대화된 성능과 속도를 취해야 한다면 사용을 지양해야 한다.
2. 상기했듯이 <span style="color: indianred">**클래스와 구조체 등 Object의 네이밍이 강제**</span>되어 네이밍에 불편함을 겪을 수 있을 뿐만 아니라 다수의 개발자와 협업할수록 문제 발생의 가능성이 높아진다.
3. <span style="color: indianred">**완벽한 동적 구현이 사실상 불가능**</span>하다. 개발자나 개발 환경에 따라 고차원의 배열이나 컬렉션을 사용할 수도 있고 자유로운 형태의 타입을 사용할 수 있는데 그 무한한 타입에 모두 대응할 수가 없다. 설령 대응하여 구현한다고 하더라도 콜백지옥보다 더한 함수가 돼버린다 (이미 그러하다).
4. 대단한 문법은 아니지만 <span style="color: indianred">**함수의 이해가 어려우면**</span> 오히려 하드코딩보다 <span style="color: indianred">**유지보수가 더 어려울 수**</span> 있다.

---

#### 마무리하며...
이번 포스트에서는 Reflection을 이용하여 동적으로 모델을 파일에 저장하는 함수를 작성해 보았다. 사실 직업 특성상 개발 도중 구글링조차 불가능한 상태로 구현한 함수라 미흡한 면도 많고 더 좋은 방법이 많을 수도 있다. 하지만, 이런 식으로 부족함을 개선하기 위해서 끊임없이 고민하고 연구하다 보면 내일은 조금 더 좋은 코드를 작성할 수 있지 않을까?