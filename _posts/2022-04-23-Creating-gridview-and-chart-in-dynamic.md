---
layout: post
title: 동적으로 그리드뷰 및 차트 생성하기
date: 2022-04-23 21:46:33 +0900
img: csharp-logo.png
categories: C#
tags: [ C#, .Net Framework, DataGridView, Chart, 그리드뷰, 차트 ]
description: 특정 테이블의 데이터를 기준으로 이벤트 발생 시 해당 데이터의 통계를 그리드뷰 및 차트 형태로 동적으로 생성해 보자.
permalink: /csharp/:year/:month/:day/:title.html
---

> 1. [작성 동기](#작성-동기 "Navigate to Motivation to write code")
2. [문제 인식](#문제-인식 "Navigate to Recognition of problem")
3. [테이블에 발생할 수 있는 이벤트를 확인하자](#테이블에-발생할-수-있는-이벤트를-확인하자 "Navigate to Shall we check event that possibly triggered")
- [CellMouseClick 이벤트](#cellmouseclick-이벤트 "Navigate to CellMouseClick event")
- [KeyDown & KeyUp 이벤트](#keydown--keyup-이벤트 "Navigate to KeyDown & KeyUp event")
- [SelectionChanged 이벤트](#selectionchanged-이벤트 "Navigate to SelectionChanged event")
4. [실행될 함수를 구현하자](#실행될-함수를-구현하자 "Navigate to Let's write a function to be executed")
- [차트를 갱신해 보자](#차트를-갱신해-보자 "Navigate to Updating the chart")
- [그리드뷰를 갱신해 보자](#그리드뷰를-갱신해-보자 "Navigate to Updating the gridview")
5. [결과를 확인해 보자](#결과를-확인해-보자 "Navigate to Checking the result")
- [단일 시리즈 동작](#단일-시리즈-동작 "Navigate to Single series action")
- [다중 시리즈 동작](#다중-시리즈-동작 "Navigate to Multi series action")

---

#### <span style="color: brown">**작성 동기**</span>
담당자로부터 이 기능의 추가를 요청받았을 때 들었던 말은, 사실은 이 기능이 <span style="color: #8D4801">**이미 예전부터 우리 프로그램의 사양에 포함**</span>되어 있었다는 것이었다. 하지만, 하나의 앱을 개발하고 꾸준히 유지보수하며 서비스하는 게 아니라 매번 새로운 시스템에 통합될 프로젝트를 새로 생성하는 회사의 특성상 중간에 포함되었던 사양이 누락되고 존재하던 코드가 사라지는 것은 크게 이상한 것도 아니었다. 그래서 <span style="color: #8D4801">**이왕에 다시 작성하게 된 것 혹시나 다음에 재사용될 것을 염두에 두고 시작**</span>했던 것 같다.

---

#### <span style="color: brown">**문제 인식**</span>
과거에 구현되어 있던 통계 그리드뷰는 <span style="color: #8D4801">**정적**</span>으로 구현되어 해당 프로젝트의 한정적인 요소들에 대해서만 평균, 표준편차, 공정능력지수를 계산할 수 있게 되어있었으며, 원하지 않는 데이터만 제외한다거나 하는 일체의 <span style="color: #8D4801">**상호작용이 불가능**</span>했었다. 하지만 이런 식으로 그대로 구현해 놓으면 다음 프로젝트를 진행할 때 그리고, 새로운 프로젝트를 시작할 때마다 <span style="color: #8D4801">**반드시**</span> 다시 전체적인 수정이 불가피하다고 판단했고, 가능한 함수만 그대로 복사 붙여넣기 하고 아주 약간의 수정만으로 재사용할 수 있도록 구현하는 데 초점을 맞췄다.

---

#### <span style="color: brown">**테이블에 발생할 수 있는 이벤트를 확인하자**</span>
이벤트 함수 대리자로 실행할 아래의 함수들은 <span style="color: #8D4801">**Form designer 화면(View)에서 테이블의 이벤트에 직접 연결**</span>하여도 되고 <span style="color: #8D4801">**Form class(View controller) 안에서 수동으로 delegate를 연결**</span>하여도 된다.
##### **CellMouseClick 이벤트**
<center>
  <img src="{{site.baseurl}}/images/posts/2022-04-23-Creating-gridview-and-chart-in-dynamic/cell-mouse-click.gif" title="Reference of CellMouseClick event" alt="Reference of CellMouseClick event">
</center>

- DataGridView의 Cell에 마우스 클릭할 경우 발생하는 이벤트이다.
```c#
private void GridViewList_CellMouseClick( object sender, DataGridViewCellMouseEventArgs e )
{
    DataGridView objSender = sender as DataGridView;

    // 헤더가 클릭 된 경우
    if( -1 == e.RowIndex ) return;
    // 선택된 셀이 존재하지 않을 경우
    if( null == objSender.SelectedCells ) return;
    // 선택된 셀이 한 개일 때만 진행 가능하도록
    if( 1 != objSender.SelectedCells.Count ) return;

    // 인자로 전달된 컬럼의 인덱스에 따라 차트 갱신
    UpdateChartByOneCell( e.ColumnIndex );
    // 인자로 전달된 컬럼의 인덱스에 따라 통계 그리드뷰 갱신
    UpdateGridViewStatisticsByOneCell( e.ColumnIndex );
}
```

<br>

##### **KeyDown & KeyUp 이벤트**
<center>
  <img src="{{site.baseurl}}/images/posts/2022-04-23-Creating-gridview-and-chart-in-dynamic/key-down-up.gif" title="Reference of KeyDown and KeyUp event" alt="Reference of KeyDown and KeyUp event">
</center>

- DataGridView에서 키보드 입력이 있으면 발생하는 이벤트로 키보드 방향키로 Selection을 이동시킬 경우 발생한다.
```c#
// 키보드가 눌린 상태일 때 발생하는 이벤트
private void GridViewList_KeyDown( object sender, KeyEventArgs e )
{
    // 방향키가 눌릴 경우 이벤트를 기다리는 모든 스레드를 차단한다.
    // 키보드가 눌려 있는 동안 무한히 발생하는 이벤트를 제한하기 위함
    if( e.KeyCode == Keys.Up
      || e.KeyCode == Keys.Down
      || e.KeyCode == Keys.Left
      || e.KeyCode == Keys.Right ) {
      m_eventDownStatus.Reset();
    }
}
// 키보드가 눌렸다가 올라온 상태일 때 발생하는 이벤트
private void GridViewList_KeyUp( object sender, KeyEventArgs e )
{
    DataGridView objSender = sender as DataGridView;

    // 방향키가 눌렸다가 올라온 경우에만 안의 코드를 실행
    if( e.KeyCode == Keys.Up || e.KeyCode == Keys.Down || e.KeyCode == Keys.Left || e.KeyCode == Keys.Right ) {
      // 차단된 스레드를 다시 실행
      m_eventDownStatus.Set();
      
      // 선택된 셀이 존재하지 않을 경우
      if( null == objSender.CurrentCell ) return;
      // 헤더가 선택된 경우
      if( -1 == objSender.CurrentCell.RowIndex ) return;
      // 선택된 셀이 존재하지 않을 경우
      if( null == objSender.SelectedCells ) return;
      // 선택된 셀이 한 개일 때만 진행 가능하도록
      if( 1 != objSender.SelectedCells.Count ) return;

      // 인자로 전달된 컬럼의 인덱스에 따라 차트 갱신
      UpdateChartByOneCell( objSender.CurrentCell.ColumnIndex );
      // 인자로 전달된 컬럼의 인덱스에 따라 통계 그리드뷰 갱신
      UpdateGridViewStatisticsByOneCell( objSender.CurrentCell.ColumnIndex );
    }
}
```
  - m_eventDownStatus는 멤버 변수로 선언된 <span style="color: #8D4801">**ManualResetEvent**</span> 객체이다.

<br>

##### **SelectionChanged 이벤트**
<center>
  <img src="{{site.baseurl}}/images/posts/2022-04-23-Creating-gridview-and-chart-in-dynamic/selection-changed.gif" title="Reference of SelectionChanged event" alt="Reference of SelectionChanged event">
</center>

- DataGridView에서 선택 영역이 변경될 경우 발생하는 이벤트로 마우스 드래그, 키보드 시프트키 + 방향키로 Selection 확장 시 발생한다.
```c#
private void GridViewList_SelectionChanged( object sender, EventArgs e )
{
    // 인자로 전달된 선택 영역에 따라 차트 갱신
    if( false == m_bMultiSeries ) {
      UpdateChartBySingleSelection( sender );
    } else {
      UpdateChartByMultiSelection( sender );
    }
    // 인자로 전달된 선택 영역에 따라 통계 그리드뷰 갱신
    UpdateGridViewStatisticsBySelection( sender );
}
```
  - m_bMultiSeries는 멤버 변수로 선언된 <span style="color: #8D4801">**Bool**</span> 타입의 플래그로 여러 개의 속성(컬럼)이 선택되었을 때 속성별로 차트의 시리즈를 생성할지 여부를 확인한다.

---

#### <span style="color: brown">**실행될 함수를 구현하자**</span>
##### **차트를 갱신해 보자**
- <span style="color: #8D4801">**차트 초기화**</span>
```c#
private bool InitializeChart( Chart objChart )
{
    bool bReturn = false;

    do {
      // 기본값 초기화
      m_bMultiSeries = false;
      m_iColumnIndex = 0;
      // 차트 영역 축 초기화
      foreach( Axis objAxis in objChart.ChartAreas[ 0 ].Axes ) {
        if( objChart.ChartAreas[ 0 ].AxisX == objAxis ) {
          objAxis.LabelStyle.Format = "0";
        } else if( objChart.ChartAreas[ 0 ].AxisY == objAxis ) {
          objAxis.LabelStyle.Format = "0.000";
        }
        objAxis.IntervalAutoMode = IntervalAutoMode.VariableCount;
        // 격자 숨기기
        objAxis.MajorGrid.Enabled = false;
        objAxis.MinorGrid.Enabled = false;
      }
      // 차트 줌 기능 핸들러
      objChart.MouseWheel += MouseWheelOnChart;

      bReturn = true;
    } while( false );

    return bReturn;
}
```
  - Form이 초기화될 때 한 번만 실행한다. 사용자의 필요에 따라 Chart를 설정해 주는 함수이다.
  - MouseWheelOnChart 함수는 검색을 통해 구현한 관계로 작성을 생략한다!

<br>

- <span style="color: #8D4801">**차트 시리즈 초기화**</span>
```c#
private bool InitializeChartSeries( Series objSeries )
{
    bool bReturn = false;

    do {
      objSeries.LegendText = objSeries.Name;
      objSeries.Points.Clear();
      objSeries.LabelBackColor = Color.LightGray;
      objSeries.BorderWidth = 1;
      objSeries.Palette = ChartColorPalette.None;
      objSeries.ChartType = SeriesChartType.Spline;
      objSeries.MarkerColor = Color.OrangeRed;
      objSeries.MarkerSize = 5;
      objSeries.MarkerStyle = MarkerStyle.Circle;

      bReturn = true;
    } while( false );

    return bReturn;
}
```
  - 차트가 갱신될 때마다 호출한다. 사용자의 필요에 따라 Series를 설정해 주는 함수이다.

<br>

- <span style="color: #8D4801">**한 개의 셀만 선택되었을 때**</span>
```c#
private void UpdateChartByOneCell( int iColumnIndex )
{
    do {
      // 단일 시리즈 옵션이 아닐 경우 실행하지 않음
      if( true == m_bMultiSeries ) break;

      // 베이스 테이블의 RowData가 2개 이상이 아닐 경우 실행하지 않음
      if( null == m_objDataRow
        || 2 > m_objDataRow.Length ) break;

      try {
        // 선택된 속성 인덱스 멤버에 저장
        m_iColumnIndex = iColumnIndex;
        // TryParse용 임시 변수
        double dTemp;
        // 차트 영역 축 MIN MAX INTERVAL용 변수
        int xMin = int.MaxValue;
        int xMax = int.MinValue;
        int xInterval = 0;
        double yMin = double.MaxValue;
        double yMax = double.MinValue;
        double yInterval = 0.0;
        // Min, Max가 같을 경우를 대비하여서 상수를 빼고 더해줌
        const int DEF_DEFAULT_INTERVAL_INT = 1;
        const double DEF_DEFAULT_INTERVAL_DOUBLE = 0.1;
        // 차트 Y축 데이터 레이블 분할하고 싶은 개수만큼 설정, X의 경우 테이블 인덱스이므로 개수 따라감
        const double DEF_AXIS_Y_INTERVAL = 5.0;

        // 차트 Series 초기화
        chartTrend.Series.Clear();

        // 경향을 알아보고 싶은 대부분의 데이터는 double형이므로 double타입만 필터링
        if( true == m_objDataRow.Any( dataRow => !double.TryParse( dataRow.ItemArray[ iColumnIndex ].ToString(), out dTemp ) )
          || true == m_objDataRow.Any( dataRow => dataRow.ItemArray[ iColumnIndex ].ToString() == "NaN" ) ) break;

        {
          // x축 MIN MAX, INTERVAL값 ( row 인덱스 ) 설정
          if( xMin > Array.IndexOf( m_objDataRow, m_objDataRow.First() ) ) xMin = Array.IndexOf( m_objDataRow, m_objDataRow.First() );
          if( xMax < Array.IndexOf( m_objDataRow, m_objDataRow.Last() ) ) xMax = Array.IndexOf( m_objDataRow, m_objDataRow.Last() );
          xMin -= DEF_DEFAULT_INTERVAL_INT;
          xMax += DEF_DEFAULT_INTERVAL_INT;
          xInterval = ( xMax - xMin ) / m_objDataRow.Count();

          // y축 MIN, MAX, INTERVAL값 ( Cell의 Value )설정
          var cellValue = from DataRow dataRow in m_objDataRow
                  select double.Parse( dataRow.ItemArray[ iColumnIndex ].ToString() );
          if( yMin > cellValue.Min() ) yMin = cellValue.Min();
          if( yMax < cellValue.Max() ) yMax = cellValue.Max();
          yMin -= DEF_DEFAULT_INTERVAL_DOUBLE;
          yMax += DEF_DEFAULT_INTERVAL_DOUBLE;
          yInterval = ( yMax - yMin ) / DEF_AXIS_Y_INTERVAL;
        }

        // Series 차트에 추가
        string strKey = ( ( CDatabaseDefine.enumHistory )iColumnIndex ).ToString();
        chartTrend.Series.Add( strKey );

        // Series 초기화
        if( false == InitializeChartSeries( chartTrend.Series[ strKey ] ) ) throw new Exception("Chart series initialization failed.");

        // 차트 Series에 DataPoint 추가
        foreach( var dataRow in m_objDataRow ) {
          if( 0.0 == double.Parse( dataRow.ItemArray[ iColumnIndex ].ToString() ) ) continue;
          chartTrend.Series[ strKey ].Points.AddXY( Array.IndexOf( m_objDataRow, dataRow ), dataRow.ItemArray[ iColumnIndex ] );
        }
        // 각 DataPoint에 ToolTip 추가
        foreach( var dataPoint in chartTrend.Series[ strKey ].Points ) {
          dataPoint.ToolTip = dataPoint.YValues[ 0 ].ToString();
        }

        // 차트 영역 축 MIN MAX INTERVAL 설정
        // 차트 영역은 1개만 사용하므로 인덱스 0만 사용
        chartTrend.ChartAreas[ 0 ].AxisX.Minimum = xMin;
        chartTrend.ChartAreas[ 0 ].AxisX.Maximum = xMax;
        chartTrend.ChartAreas[ 0 ].AxisX.Interval = xInterval;
        chartTrend.ChartAreas[ 0 ].AxisY.Minimum = yMin;
        chartTrend.ChartAreas[ 0 ].AxisY.Maximum = yMax;
        chartTrend.ChartAreas[ 0 ].AxisY.Interval = yInterval;
      }
      catch( Exception ex ) {
        // 예외 처리
        string strError = string.Format( "{0} {1} {2}", this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message );
        CDocument.GetDocument.ShowMessageBox( strError );
      }
    } while( false );

    // 선택된 셀 데이터가 존재하더라도 속성값이 double이 아니어서 Series가 생성되지 않을 경우 차트 숨김
    if( 0 != chartTrend.Series.Count
    	&& chartTrend.Series.Any( series => series.Points.Count != 0 ) ) {
      chartTrend.Visible = true;
    } else {
      chartTrend.Visible = false;
    }
}
```
  - m_objDataRow는 멤버 변수로 선언된 <span style="color: #8D4801">**베이스 테이블 Row의 집합인 컬렉션**</span>이다. 한 개의 셀만 선택될 경우 선택 영역이 아닌 베이스 테이블의 특정 컬럼을 기준으로 모든 Rows의 통계를 구하므로 베이스 테이블을 참조한다.
  - chartTrend는 View에서 생성하고 우리가 갱신하고자 하는 <span style="color: #8D4801">**Chart**</span> 객체이다.
  - strKey가 <span style="color: indianred">**각 series를 나타내는 속성**</span>이라고 보면 된다. <span style="color: indianred">**표현하고자 하는 속성 이름**</span>을 이 변수에 수정 입력해 주면 된다.

<br>

- <span style="color: #8D4801">**여러 개의 셀이 선택되었고 하나의 시리즈만 표현할 때**</span>
```c#
private void UpdateChartBySingleSelection( object sender )
{
    DataGridView objSender = sender as DataGridView;

    do {
      // 단일 시리즈 옵션이 아닐 경우 실행하지 않음
      if( true == m_bMultiSeries ) break;

      // 선택된 셀이 2개 이상이 아닐 경우 실행하지 않음
      if( null == objSender.SelectedCells
        || 2 > objSender.SelectedCells.Count ) break;

      try {
        // TryParse용 임시 변수
        double dTemp;
        // 차트 영역 축 MIN MAX INTERVAL용 변수
        int xMin = int.MaxValue;
        int xMax = int.MinValue;
        int xInterval = 0;
        double yMin = double.MaxValue;
        double yMax = double.MinValue;
        double yInterval = 0.0;
        // Min, Max가 같을 경우를 대비하여서 상수를 빼고 더해줌
        const int DEF_DEFAULT_INTERVAL_INT = 1;
        const double DEF_DEFAULT_INTERVAL_DOUBLE = 0.1;
        // 차트 Y축 데이터 레이블 분할하고 싶은 개수만큼 설정, X의 경우 테이블 인덱스이므로 개수 따라감
        const double DEF_AXIS_Y_INTERVAL = 5.0;

        // 차트 Series 초기화
        chartTrend.Series.Clear();

        var columnCell = from DataGridViewCell cell in objSender.SelectedCells
                  where cell.ColumnIndex == m_iColumnIndex
                  orderby cell.RowIndex ascending
                  select cell;

        // Row data가 2개 이상일 경우에만 Series 생성
        if( 2 > columnCell.Count() ) break;

        // 경향을 알아보고 싶은 대부분의 데이터는 double형이므로 double타입만 필터링
        if( true == columnCell.Any( cell => !double.TryParse( ( cell as DataGridViewCell ).Value.ToString(), out dTemp ) )
          || true == columnCell.Any( cell => ( cell as DataGridViewCell ).Value.ToString() == "NaN" ) ) break;

        {
          // x축 MIN MAX, INTERVAL값 ( row 인덱스 ) 설정
          if( xMin > int.Parse( columnCell.First().RowIndex.ToString() ) ) xMin = int.Parse( columnCell.First().RowIndex.ToString() );
          if( xMax < int.Parse( columnCell.Last().RowIndex.ToString() ) ) xMax = int.Parse( columnCell.Last().RowIndex.ToString() );
          xMin -= DEF_DEFAULT_INTERVAL_INT;
          xMax += DEF_DEFAULT_INTERVAL_INT;
          xInterval = ( xMax - xMin ) / columnCell.Count();

          // y축 MIN, MAX, INTERVAL값 ( Cell의 Value )설정
          var cellValue = from DataGridViewCell cell in columnCell
                  select double.Parse( cell.Value.ToString() );
          if( yMin > cellValue.Min() ) yMin = cellValue.Min();
          if( yMax < cellValue.Max() ) yMax = cellValue.Max();
          yMin -= DEF_DEFAULT_INTERVAL_DOUBLE;
          yMax += DEF_DEFAULT_INTERVAL_DOUBLE;
          yInterval = ( yMax - yMin ) / DEF_AXIS_Y_INTERVAL;
        }

        // Series 차트에 추가
        string strKey = ( ( CDatabaseDefine.enumHistory )m_iColumnIndex ).ToString();
        chartTrend.Series.Add( strKey );

        // Series 초기화
        if( false == InitializeChartSeries( chartTrend.Series[ strKey ] ) ) throw new Exception("Chart series initialization failed.");

        // 차트 Series에 DataPoint 추가 
        foreach( var cell in columnCell ) {
          if( 0.0 == double.Parse( ( cell as DataGridViewCell ).Value.ToString() ) ) continue;
          chartTrend.Series[ strKey ].Points.AddXY( ( cell as DataGridViewCell ).RowIndex, ( cell as DataGridViewCell ).Value );
        }
        // 각 DataPoint에 ToolTip 추가
        foreach( var dataPoint in chartTrend.Series[ strKey ].Points ) {
          dataPoint.ToolTip = dataPoint.YValues[ 0 ].ToString();
        }

        // 차트 영역 축 MIN MAX INTERVAL 설정
        // 차트 영역은 1개만 사용하므로 인덱스 0만 사용
        chartTrend.ChartAreas[ 0 ].AxisX.Minimum = xMin;
        chartTrend.ChartAreas[ 0 ].AxisX.Maximum = xMax;
        chartTrend.ChartAreas[ 0 ].AxisX.Interval = xInterval;
        chartTrend.ChartAreas[ 0 ].AxisY.Minimum = yMin;
        chartTrend.ChartAreas[ 0 ].AxisY.Maximum = yMax;
        chartTrend.ChartAreas[ 0 ].AxisY.Interval = yInterval;
      }
      catch( Exception ex ) {
        // 예외 처리
        string strError = string.Format( "{0} {1} {2}", this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message );
        CDocument.GetDocument.ShowMessageBox( strError );
      }
    } while( false );

    // 선택된 셀 데이터가 존재하더라도 속성값이 double이 아니어서 Series가 생성되지 않을 경우 차트 숨김
    if( 0 != chartTrend.Series.Count
    	&& chartTrend.Series.Any( series => series.Points.Count != 0 ) ) {
      chartTrend.Visible = true;
    } else {
      chartTrend.Visible = false;
    }
}
```

<br>

- <span style="color: #8D4801">**여러 개의 셀이 선택되었고 여러 개의 시리즈로 표현할 때**</span>
```c#
private void UpdateChartByMultiSelection( object sender )
{
    DataGridView objSender = sender as DataGridView;

    do {
      // 다중 시리즈 옵션이 아닐 경우 실행하지 않음
      if( false == m_bMultiSeries ) break;

      // 선택된 셀이 2개 이상이 아닐 경우 실행하지 않음
      if( null == objSender.SelectedCells
        || 2 > objSender.SelectedCells.Count ) break;

      try {
        // 모든 셀의 Column을 체크해 서로 같은 Column끼리 하나의 Series로 생성 - 두 가지 이상의 Column을 가진 셀이 있으면 두 가지 이상의 Series 동적으로 생성
        // TryParse용 임시 변수
        double dTemp;
        // 차트 영역 축 MIN MAX INTERVAL용 변수
        int xMin = int.MaxValue;
        int xMax = int.MinValue;
        int xInterval = 0;
        double yMin = double.MaxValue;
        double yMax = double.MinValue;
        double yInterval = 0.0;
        // Min, Max가 같을 경우를 대비하여서 상수를 빼고 더해줌
        const int DEF_DEFAULT_INTERVAL_INT = 1;
        const double DEF_DEFAULT_INTERVAL_DOUBLE = 0.1;
        // 차트 Y축 데이터 레이블 분할하고 싶은 개수만큼 설정, X의 경우 테이블 인덱스이므로 개수 따라감
        const double DEF_AXIS_Y_INTERVAL = 5.0;

        // 차트 Series 초기화
        chartTrend.Series.Clear();

        // 선택된 Column 인덱스 필터링
        var columnIndex = from DataGridViewCell cell in objSender.SelectedCells
                  orderby cell.ColumnIndex ascending
                  select cell.ColumnIndex;
        // 선택된 Column 인덱스 중복 제거
        IEnumerable<int> distColumnIndex = columnIndex.Distinct<int>();

        // 각 Column 별로 Series 생성
        foreach( int index in distColumnIndex ) {
          // 각 Row data에서 하나의 Column 데이터 취합 
          var columnCell = from DataGridViewCell cell in objSender.SelectedCells
                    where cell.ColumnIndex == index
                    orderby cell.RowIndex ascending
                    select cell;

          // Row data가 2개 이상일 경우에만 Series 생성
          if( 2 > columnCell.Count() ) continue;

          // 경향을 알아보고 싶은 대부분의 데이터는 double형이므로 double타입만 필터링
          if( true == columnCell.Any( cell => !double.TryParse( ( cell as DataGridViewCell ).Value.ToString(), out dTemp ) )
            || true == columnCell.Any( cell => ( cell as DataGridViewCell ).Value.ToString() == "NaN" ) ) continue;

          {
            // x축 MIN MAX, INTERVAL값 ( row 인덱스 ) 설정
            if( xMin > int.Parse( columnCell.First().RowIndex.ToString() ) ) xMin = int.Parse( columnCell.First().RowIndex.ToString() );
            if( xMax < int.Parse( columnCell.Last().RowIndex.ToString() ) ) xMax = int.Parse( columnCell.Last().RowIndex.ToString() );
            xMin -= DEF_DEFAULT_INTERVAL_INT;
            xMax += DEF_DEFAULT_INTERVAL_INT;
            xInterval = ( xMax - xMin ) / columnCell.Count();

            // y축 MIN, MAX, INTERVAL값 ( Cell의 Value )설정
            var cellValue = from DataGridViewCell cell in columnCell
                    select double.Parse( cell.Value.ToString() );
            if( yMin > cellValue.Min() ) yMin = cellValue.Min();
            if( yMax < cellValue.Max() ) yMax = cellValue.Max();
            yMin -= DEF_DEFAULT_INTERVAL_DOUBLE;
            yMax += DEF_DEFAULT_INTERVAL_DOUBLE;
            yInterval = ( yMax - yMin ) / DEF_AXIS_Y_INTERVAL;
          }

          // Series 차트에 추가
          string strKey = ( ( CDatabaseDefine.enumHistory )index ).ToString();
          chartTrend.Series.Add( strKey );

          // Series 초기화
          if( false == InitializeChartSeries( chartTrend.Series[ strKey ] ) ) throw new Exception("Chart series initialization failed.");

          // 차트 Series에 DataPoint 추가 
          foreach( var cell in columnCell ) {
            if( 0.0 == double.Parse( ( cell as DataGridViewCell ).Value.ToString() ) ) continue;
            chartTrend.Series[ strKey ].Points.AddXY( ( cell as DataGridViewCell ).RowIndex, ( cell as DataGridViewCell ).Value );
          }
          // 각 DataPoint에 ToolTip 추가
          foreach( var dataPoint in chartTrend.Series[ strKey ].Points ) {
            dataPoint.ToolTip = dataPoint.YValues[ 0 ].ToString();
          }
        }

        // 차트 영역 축 MIN MAX INTERVAL 설정
        // 차트 영역은 1개만 사용하므로 인덱스 0만 사용
        chartTrend.ChartAreas[ 0 ].AxisX.Minimum = xMin;
        chartTrend.ChartAreas[ 0 ].AxisX.Maximum = xMax;
        chartTrend.ChartAreas[ 0 ].AxisX.Interval = xInterval;
        chartTrend.ChartAreas[ 0 ].AxisY.Minimum = yMin;
        chartTrend.ChartAreas[ 0 ].AxisY.Maximum = yMax;
        chartTrend.ChartAreas[ 0 ].AxisY.Interval = yInterval;
      }
      catch( Exception ex ) {
        // 예외 처리
        string strError = string.Format( "{0} {1} {2}", this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message );
        CDocument.GetDocument.ShowMessageBox( strError );
      }
    } while( false );

    // 선택된 셀 데이터가 존재하더라도 속성값이 double이 아니어서 Series가 생성되지 않을 경우 차트 숨김
    if( 0 != chartTrend.Series.Count
    	&& chartTrend.Series.Any( series => series.Points.Count != 0 ) ) {
      chartTrend.Visible = true;
    } else {
      chartTrend.Visible = false;
    }
}
```

<br>

##### **그리드뷰를 갱신해 보자**
- <span style="color: #8D4801">**열거형 멤버 변수 선언**</span>
```c#
private enum enumGridViewStatisticsColumn
{
    NAME = 0, // 파라미터명
    MIN, // 최소값
    MAX, // 최대값
    AVERAGE, // 평균
    STDEV, // 표준편차
    FINAL,
}
```
  - 그리드뷰에 속성으로 추가하고 싶은 요소들을 열거형 변수로 선언한다.

<br>

- <span style="color: #8D4801">**그리드뷰 초기화**</span>
```c#
private bool InitializeGridViewStatistics( DataGridView objGridView )
{
    bool bReturn = false;

    do {
      // 더블 버퍼링으로 속성 변경
      Type objType = objGridView.GetType();
      PropertyInfo objPropertyInfo = objType.GetProperty( "DoubleBuffered", BindingFlags.Instance | BindingFlags.NonPublic );
      objPropertyInfo.SetValue( objGridView, true, null );
      // 그리드 뷰 배경색
      objGridView.BackgroundColor = Color.White;
      // 그리드 뷰 칼럼 사이즈 조정
      objGridView.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.None;
      // 그리드 뷰 행, 열 사이즈 유저 조정 막음
      objGridView.AllowUserToResizeRows = false;
      objGridView.AllowUserToResizeColumns = false;
      // 그리드 뷰 행 머리글 없앰
      objGridView.RowHeadersVisible = false;
      // 첫 행 포커스 해제
      objGridView.ClearSelection();
      // 마지막 행 제거
      objGridView.AllowUserToAddRows = false;
      // 그리드 뷰 ReadOnly
      objGridView.ReadOnly = true;
      // 그리드 뷰 다중 선택 o
      objGridView.MultiSelect = true;
      // 그리드 뷰 선택 모드 (셀 한 개 선택)
      objGridView.SelectionMode = DataGridViewSelectionMode.CellSelect;
      // 그리드 뷰 폰트 크기 변경
      objGridView.Font = new Font( objGridView.Font.Name, 9.0, objGridView.Font.Style );
      // 그리드 뷰 칼럼 추가
      for( int iLoopColumn = 0; iLoopColumn < ( int )enumGridViewStatisticsColumn.FINAL; iLoopColumn++ ) {
        objGridView.Columns.Add( string.Format( "{0}", iLoopColumn ), ((enumGridViewStatisticsColumn)iLoopColumn).ToString() );
        // 칼럼 정렬 기능 x
        objGridView.Columns[ iLoopColumn ].SortMode = DataGridViewColumnSortMode.NotSortable;
      }
      // 그리드 뷰 칼럼 크기 초기화
      objGridView.Columns[ ( int )enumGridViewStatisticsColumn.NAME ].Width = ( int )( objGridView.Width * 0.40 );
      objGridView.Columns[ ( int )enumGridViewStatisticsColumn.MIN ].Width = ( int )( objGridView.Width * 0.15 );
      objGridView.Columns[ ( int )enumGridViewStatisticsColumn.MAX ].Width = ( int )( objGridView.Width * 0.15 );
      objGridView.Columns[ ( int )enumGridViewStatisticsColumn.AVERAGE ].Width = ( int )( objGridView.Width * 0.15 );
      objGridView.Columns[ ( int )enumGridViewStatisticsColumn.STDEV ].Width = ( int )( objGridView.Width * 0.15 );

      bReturn = true;
    } while( false );

    return bReturn;
}
```
  - Form이 초기화될 때 한 번만 실행한다. 사용자의 필요에 따라 GridView를 설정해 주는 함수이다.

<br>

- <span style="color: #8D4801">**한 개의 셀만 선택되었을 때**</span>
```c#
private void UpdateGridViewStatisticsByOneCell( int iColumnIndex )
{
    do {
      // 베이스 테이블의 RowData가 2개 이상이 아닐 경우 실행하지 않음
      if( null == m_objDataRow
        || 2 > m_objDataRow.Length ) break;

      try {
        // TryParse용 임시 변수
        double dTemp;

        // 그리드뷰 행 초기화
        GridViewStatistics.Rows.Clear();

        // 경향을 알아보고 싶은 대부분의 데이터는 double형이므로 double타입만 필터링
        if( true == m_objDataRow.Any( dataRow => !double.TryParse( dataRow.ItemArray[ iColumnIndex ].ToString(), out dTemp ) )
          || true == m_objDataRow.Any( dataRow => dataRow.ItemArray[ iColumnIndex ].ToString() == "NaN" ) ) break;

        var cellValue = from DataRow dataRow in m_objDataRow
                where 0.0 != double.Parse( dataRow.ItemArray[ iColumnIndex ].ToString() )
                select double.Parse( dataRow.ItemArray[ iColumnIndex ].ToString() );

        // 하나 이상의 0이 아닌 Row data 값이 존재할 경우에만 계산
        if( 0 == cellValue.Count() ) break;

        string[] strRowData = new string[ ( int )enumGridViewStatisticsColumn.FINAL ];
        strRowData[ ( int )enumGridViewStatisticsColumn.NAME ] = ( ( CDatabaseDefine.enumHistory )iColumnIndex ).ToString();
        strRowData[ ( int )enumGridViewStatisticsColumn.MIN ] = string.Format( "{0:F3}", cellValue.Min() );
        strRowData[ ( int )enumGridViewStatisticsColumn.MAX ] = string.Format( "{0:F3}", cellValue.Max() );
        strRowData[ ( int )enumGridViewStatisticsColumn.AVERAGE ] = string.Format( "{0:F3}", cellValue.Average() );
        strRowData[ ( int )enumGridViewStatisticsColumn.STDEV ] = string.Format( "{0:F3}", GetCalculateStandardDeviation( cellValue ) );

        GridViewStatistics.Rows.Add( strRowData );
      }
      catch( Exception ex ) {
        // 예외 처리
        string strError = string.Format( "{0} {1} {2}", this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message );
        CDocument.GetDocument.ShowMessageBox( strError );
      }
    } while( false );

    // 선택된 셀 데이터가 존재하더라도 속성값이 double이 아니어서 Row가 생성되지 않을 경우 그리드뷰 숨김
    if( 0 != GridViewStatistics.Rows.Count ) {
      GridViewStatistics.Visible = true;
    } else {
      GridViewStatistics.Visible = false;
    }
}
```
  - m_objDataRow는 멤버 변수로 선언된 <span style="color: #8D4801">**베이스 테이블 Row의 집합인 컬렉션**</span>이다. 한 개의 셀만 선택될 경우 선택 영역이 아닌 베이스 테이블의 특정 컬럼을 기준으로 모든 Rows의 통계를 구하므로 베이스 테이블을 참조한다.
  - GridViewStatistics는 View에서 생성하고 우리가 갱신하고자 하는 <span style="color: #8D4801">**DataGridView**</span> 객체이다.
  - ( ( CDatabaseDefine.enumHistory )iColumnIndex ).ToString()가 <span style="color: indianred">**그리드뷰의 각 Row를 나타내는 속성**</span>이라고 보면 된다. <span style="color: indianred">**표현하고자 하는 속성 이름**</span>을 이 부분에 수정 입력해 주면 된다.

<br>

- <span style="color: #8D4801">**여러 개의 셀이 선택되었을 때**</span>
```c#
private void UpdateGridViewStatisticsBySelection( object sender )
{
    DataGridView objSender = sender as DataGridView;

    do {
      // 선택된 셀이 2개 이상이 아닐 경우 실행하지 않음
      if( null == objSender.SelectedCells
        || 2 > objSender.SelectedCells.Count ) break;

      try {
        // TryParse용 임시 변수
        double dTemp;

        // 그리드뷰 행 초기화
        GridViewStatistics.Rows.Clear();

        // 선택된 Column 인덱스 필터링
        var columnIndex = from DataGridViewCell cell in objSender.SelectedCells
                  orderby cell.ColumnIndex ascending
                  select cell.ColumnIndex;
        // 선택된 Column 인덱스 중복 제거
        IEnumerable<int> distColumnIndex = columnIndex.Distinct<int>();

        // 각 Column 별로 Row 생성
        foreach( int index in distColumnIndex ) {
          // 각 Row data에서 하나의 Column 데이터 취합 
          var columnCell = from DataGridViewCell cell in objSender.SelectedCells
                    where cell.ColumnIndex == index
                    orderby cell.RowIndex ascending
                    select cell;

          // Row data가 2개 이상일 경우에만 Column 생성
          if( 2 > columnCell.Count() ) continue;

          // 경향을 알아보고 싶은 대부분의 데이터는 double형이므로 double타입만 필터링
          if( true == columnCell.Any( cell => !double.TryParse( ( cell as DataGridViewCell ).Value.ToString(), out dTemp ) )
            || true == columnCell.Any( cell => ( cell as DataGridViewCell ).Value.ToString() == "NaN" ) ) continue;

          var cellValue = from DataGridViewCell cell in columnCell
                  where 0.0 != double.Parse( cell.Value.ToString() )
                  select double.Parse( cell.Value.ToString() );

          // 하나 이상의 0이 아닌 Row data 값이 존재할 경우에만 계산
          if( 0 == cellValue.Count() ) continue;

          string[] strRowData = new string[ ( int )enumGridViewStatisticsColumn.FINAL ];
          strRowData[ ( int )enumGridViewStatisticsColumn.NAME ] = ( ( CDatabaseDefine.enumHistory )index ).ToString();
          strRowData[ ( int )enumGridViewStatisticsColumn.MIN ] = string.Format( "{0:F3}", cellValue.Min() );
          strRowData[ ( int )enumGridViewStatisticsColumn.MAX ] = string.Format( "{0:F3}", cellValue.Max() );
          strRowData[ ( int )enumGridViewStatisticsColumn.AVERAGE ] = string.Format( "{0:F3}", cellValue.Average() );
          strRowData[ ( int )enumGridViewStatisticsColumn.STDEV ] = string.Format( "{0:F3}", GetCalculateStandardDeviation( cellValue ) );

          GridViewStatistics.Rows.Add( strRowData );
        }
      }
      catch( Exception ex ) {
        // 예외 처리
        string strError = string.Format( "{0} {1} {2}", this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message );
        CDocument.GetDocument.ShowMessageBox( strError );
      }
    } while( false );

    // 선택된 셀 데이터가 존재하더라도 속성값이 double이 아니어서 Row가 생성되지 않을 경우 그리드뷰 숨김
    if( 0 != GridViewStatistics.Rows.Count ) {
      GridViewStatistics.Visible = true;
    } else {
      GridViewStatistics.Visible = false;
    }
}
```
  - ( ( CDatabaseDefine.enumHistory )index ).ToString()가 <span style="color: indianred">**그리드뷰의 각 Row를 나타내는 속성**</span>이라고 보면 된다. <span style="color: indianred">**표현하고자 하는 속성 이름**</span>을 이 부분에 수정 입력해 주면 된다.

<br>

- <span style="color: #8D4801">**표준편차 함수**</span>
```c#
private double GetCalculateStandardDeviation( IEnumerable<double> dValueSet )
{
    double dReturn = 0.0;

    // 컬렉션에 값이 존재할 경우에만 실행한다.
    if( dValueSet.Any() ) {
      // 표본 표준편차
      double dAverage = dValueSet.Average();
      double dSum = dValueSet.Sum( dValue => Math.Pow( dValue - dAverage, 2.0 ) );
      dReturn = Math.Sqrt( dSum / ( dValueSet.Count() - 1 ) );

      // 모 표준편차
      //double dDistribution = ( dValueSet.Sum( dValue => Math.Pow( dValue, 2.0 ) ) / dValueSet.Count() ) - Math.Pow( dAverage, 2.0 );
      //dReturn = Math.Sqrt( dDistribution );	
    }

    return dReturn;
}
```

---

#### <span style="color: brown">**결과를 확인해 보자**</span>
##### **단일 시리즈 동작**
<center>
  <img src="{{site.baseurl}}/images/posts/2022-04-23-Creating-gridview-and-chart-in-dynamic/single-series.gif" title="Example of single series action" alt="Example of single series action">
</center>

<br>

##### **다중 시리즈 동작**
<center>
  <img src="{{site.baseurl}}/images/posts/2022-04-23-Creating-gridview-and-chart-in-dynamic/multi-series.gif" title="Example of multi series action" alt="Example of multi series action">
</center>

---

#### 마무리하며...
이번 포스트에서는 그리드뷰 및 차트를 테이블에서 발생하는 이벤트를 기반으로 동적으로 생성해 보았다. 글의 시작에서는 동적, 재사용성을 강조했지만, 막상 이해하기 어렵거나 비효율적으로 짜인 코드가 있을 수도 있다. 하지만 그저 이런저런 시도를 하는 것을 좋아하는 후배 개발자의 귀여운 시도로 봐주셨으면 좋겠다.