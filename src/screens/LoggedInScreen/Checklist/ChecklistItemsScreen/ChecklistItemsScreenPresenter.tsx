import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View``;
const Text = styled.Text``;

export default () => {
  const CheckState = ({check}) => {
    let checkState;

    if (check !== null) {
      check = check.split('@');
      // console.log('check.length=', check.length);
      for (let i = 0; i < check.length / 2; i++) {
        let temp = 2 * i + 1;
        // console.log('temp=', temp);
        if (check[temp] === '1') {
          checkState = 'checkComplete';
        }
        if (check[temp] === '2') {
          checkState = 'checkIncomplete';
          break;
        }
      }
    } else {
      checkState = 'willCheck';
    }

    if (checkState == 'checkComplete') {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{...styles.typeColor, backgroundColor: '#AACE36'}}></View>
          <Text style={{fontSize: 11}}>체크정상</Text>
        </View>
      );
    } else if (checkState == 'checkIncomplete') {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{...styles.typeColor, backgroundColor: '#984B19'}}></View>
          <Text style={{fontSize: 11}}>체크이상</Text>
          <View
            style={{
              ...styles.typeColor,
              marginLeft: 5,
              backgroundColor: '#FEBF40',
            }}></View>
          <Text style={{fontSize: 11}}>특이사항</Text>
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{...styles.typeColor, backgroundColor: '#0D4F8A'}}></View>
          <Text style={{fontSize: 11}}>체크예정</Text>
        </View>
      );
    }
  };

  return (
    <Container>
      <Text>ChecklistItemsScreen</Text>
    </Container>
    //   <SafeAreaView style={styles.container}>
    //   <StatusBar barStyle={'light-content'} />

    //   <View style={styles.date}>
    //     <View style={{}}>
    //       <TouchableOpacity
    //         onPress={() => {
    //           let dateArray = date.split('-');
    //           let yearNow = Number(dateArray[0]); /*+ 2000*/
    //           let monthNow = Number(dateArray[1]) - 1;
    //           let dateNow = Number(dateArray[2]);
    //           let newDate = new Date(Date.UTC(yearNow, monthNow, dateNow));
    //           newDate.setDate(dateNow - 1);

    //           yearNow = newDate.getFullYear() /*- 2000*/;
    //           monthNow = newDate.getMonth() + 1;
    //           dateNow = newDate.getDate();
    //           this.select(yearNow, monthNow, dateNow);

    //           yearNow = yearNow < 10 ? '0' + yearNow : yearNow;
    //           monthNow = monthNow < 10 ? '0' + monthNow : monthNow;
    //           dateNow = dateNow < 10 ? '0' + dateNow : dateNow;

    //           newDate = `${yearNow}-${monthNow}-${dateNow}`;

    //           this._fetchCard(this.state.storeID, newDate);
    //         }}
    //         style={styles.dateArrowLeft}>
    //         <AntDesign name="left" size={20} color="#000" style={{ paddingTop: 3 }} />
    //       </TouchableOpacity>
    //     </View>
    //     <TouchableOpacity
    //       style={styles.dateToday}
    //       onPress={() => {
    //         let date = new Date();
    //         let year = date.getFullYear();
    //         let month = date.getMonth() + 1;
    //         let day = date.getDate();
    //         month < 10 ? (month = '0' + month) : month;
    //         day < 10 ? (day = '0' + day) : day;
    //         this.setState({
    //           date: year + '-' + month + '-' + day,
    //           year: year,
    //           month: month,
    //           day: day,
    //         });
    //         this.componentDidMount();
    //       }}>
    //       <MaterialIcons name="refresh" size={26} color="#000" style={{ paddingTop: 1 }} />
    //     </TouchableOpacity>
    //     <View style={{ flex: 1, alignItems: 'center' }}>
    //       <Text style={{ fontWeight: 'bold', fontSize: 18, flexDirection: 'row', paddingTop: 1 }}>{date}</Text>
    //     </View>
    //     <View style={{}}>
    //       <TouchableOpacity
    //         onPress={() => {
    //           let dateArray = date.split('-');
    //           let yearNow = Number(dateArray[0]); /*+ 2000*/
    //           let monthNow = Number(dateArray[1]) - 1;
    //           let dateNow = Number(dateArray[2]);
    //           let newDate = new Date(Date.UTC(yearNow, monthNow, dateNow));
    //           newDate.setDate(dateNow + 1);

    //           yearNow = newDate.getFullYear() /*- 2000*/;
    //           monthNow = newDate.getMonth() + 1;
    //           dateNow = newDate.getDate();
    //           this.select(yearNow, monthNow, dateNow);

    //           yearNow = yearNow < 10 ? '0' + yearNow : yearNow;
    //           monthNow = monthNow < 10 ? '0' + monthNow : monthNow;
    //           dateNow = dateNow < 10 ? '0' + dateNow : dateNow;

    //           newDate = `${yearNow}-${monthNow}-${dateNow}`;

    //           this._fetchCard(this.state.storeID, newDate);
    //         }}
    //         style={styles.dateArrowRight}>
    //         <AntDesign name="right" size={20} color="#000" style={{ paddingTop: 3 }} />
    //       </TouchableOpacity>
    //     </View>
    //     <View style={styles.calendarOpen}>
    //       <TouchableOpacity
    //         style={styles.calendarOpenBtn}
    //         onPress={() => {
    //           var y = this.state.year;
    //           var m = this.state.month;
    //           var d = this.state.day;
    //           this.marking(y, m, d);
    //           this.setState({ isModalVisible: true, defaultMonth: this.state.date });
    //         }}>
    //         <MaterialIcons name="date-range" size={24} color="#642A8C" style={{}} />
    //       </TouchableOpacity>
    //     </View>
    //   </View>

    //   {STORE === '1' && (
    //     <View style={styles.addChecklistBox}>
    //       <TouchableOpacity
    //         style={styles.addChecklistButton}
    //         onPress={() => {
    //           if (Number(STOREDATA.resultdata.CHECK_COUNT) <= Number(STOREDATA.check_count)) {
    //             this._AlertModal('체크리스트는 ' + STOREDATA.resultdata.CHECK_COUNT + '개까지만 등록가능합니다.');
    //           } else {
    //             this.props.navigation.navigate('ChecklistAdd', { STOREDATA: STOREDATA, storeID, TITLE: '체크리스트 등록', type: '등록', refresh: () => this.refresh() });
    //           }
    //         }}>
    //         <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>체크리스트</Text>
    //         <EvilIcons name="plus" size={24} color="#000" style={{ paddingTop: 1 }} />
    //       </TouchableOpacity>
    //     </View>
    //   )}

    //   <View style={{ flex: 1, marginTop: 10, width: '100%' }}>
    //     <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => this.refresh()} />}>
    //       <View style={{ alignItems: 'center' }}>
    //         {this.state.checklist.length == 0 ? (
    //           STORE == '1' ? (
    //             <TouchableOpacity
    //               style={styles.empty}
    //               onPress={() => {
    //                 this.props.navigation.navigate('ChecklistAdd', { storeID, TITLE: '체크리스트 등록', type: '등록', refresh: () => this.refresh() });
    //               }}>
    //               <Foundation name="clipboard-pencil" size={22} color={'#999'} style={{}} />
    //               <Text style={styles.emptyText}>체크리스트를 등록해주세요!</Text>
    //             </TouchableOpacity>
    //           ) : (
    //             <View style={styles.empty}>
    //               <Foundation name="clipboard-pencil" size={22} color={'#999'} style={{}} />
    //               <Text style={styles.emptyText}>등록된 체크리스트가 없습니다!</Text>
    //             </View>
    //           )
    //         ) : (
    //           <>
    //             <View style={{ ...styles.CheckListSection, paddingVertical: 0, paddingBottom: 15 }}>
    //               <TouchableOpacity
    //                 style={{ flexDirection: 'row', alignItems: 'center' }}
    //                 onPress={() => {
    //                   this._AlertAdviceModal('공통업무', '기본가이드 내용으로 점포의 특징에 맞춰서 추가, 삭제가 가능합니다');
    //                 }}>
    //                 <Text style={styles.CheckListSectionText}>공통업무</Text>
    //                 <AntDesign name="questioncircle" size={18} color="#bbb" style={{ marginLeft: 10 }} />
    //               </TouchableOpacity>
    //             </View>
    //             {this.state.checklist
    //               .filter(info => info.CHECK_TYPE == '0')
    //               .map((data, index) => {
    //                 console.log('datadatadata', data);
    //                 return (
    //                   <Card
    //                     key={index}
    //                     QR_SEQ={data.QR_SEQ}
    //                     STORE={STORE}
    //                     storeID={storeID}
    //                     checkID={data.CHECK_SEQ}
    //                     csID={data.CS_SEQ}
    //                     checkpoint={data.TITLE}
    //                     checktime={data.END_TIME}
    //                     checklist={data.LIST}
    //                     check={data.CHECK_LIST}
    //                     checkEMP={data.EMP_NAME}
    //                     checkEMPTime={data.CHECK_TIME}
    //                     checkSelectedEmp={data.EMP_SEQ}
    //                     checkType={data.CHECK_TYPE}
    //                     checkSelectedEmpName={data.NAME}
    //                     memo={data.CHECK_TITLE}
    //                     PHOTO_CHECK={data.PHOTO_CHECK}
    //                     IMAGE_LIST={data.IMAGE_LIST}
    //                     DATE={this.state.date}
    //                     StoreEmpSeq={this.props.StoreEmpSeq}
    //                     refresh={() => this.refresh()}
    //                   />
    //                 );
    //               })}
    //             <View style={styles.CheckListSection}>
    //               <TouchableOpacity
    //                 style={{ flexDirection: 'row', alignItems: 'center' }}
    //                 onPress={() => {
    //                   this._AlertAdviceModal('점포업무', '공통업무 외에 점포에 특징에 맞춰서 개별적인 체크리스트 작성이 가능합니다');
    //                 }}>
    //                 <Text style={styles.CheckListSectionText}>점포업무</Text>
    //                 <AntDesign name="questioncircle" size={18} color="#bbb" style={{ marginLeft: 10 }} />
    //               </TouchableOpacity>
    //             </View>
    //             {this.state.checklist
    //               .filter(info => info.CHECK_TYPE == '1')
    //               .map((data, index) => {
    //                 console.log('datadatadata', data);
    //                 return (
    //                   <Card
    //                     key={index}
    //                     QR_SEQ={data.QR_SEQ}
    //                     STORE={STORE}
    //                     storeID={storeID}
    //                     checkID={data.CHECK_SEQ}
    //                     csID={data.CS_SEQ}
    //                     checkpoint={data.TITLE}
    //                     checktime={data.END_TIME}
    //                     checklist={data.LIST}
    //                     check={data.CHECK_LIST}
    //                     checkEMP={data.EMP_NAME}
    //                     checkEMPTime={data.CHECK_TIME}
    //                     checkSelectedEmp={data.EMP_SEQ}
    //                     checkType={data.CHECK_TYPE}
    //                     checkSelectedEmpName={data.NAME}
    //                     memo={data.CHECK_TITLE}
    //                     PHOTO_CHECK={data.PHOTO_CHECK}
    //                     IMAGE_LIST={data.IMAGE_LIST}
    //                     DATE={this.state.date}
    //                     StoreEmpSeq={this.props.StoreEmpSeq}
    //                     refresh={() => this.refresh()}
    //                   />
    //                 );
    //               })}
    //           </>
    //         )}
    //       </View>
    //     </ScrollView>
    //     {STORE == 0 ? (
    //       <TouchableOpacity
    //         style={styles.qr}
    //         onPress={async () => {
    //           this._selectCheckList();
    //         }}>
    //         <Text style={styles.qrText}>체크</Text>
    //       </TouchableOpacity>
    //     ) : (
    //       <View />
    //     )}
    //   </View>

    //   <Modal
    //     isVisible={this.state.isModalVisible4}
    //     style={{ marginTop: isIphoneX ? 70 : 50 }}
    //     onBackdropPress={() => {
    //       this.setState({ isModalVisible4: false });
    //     }}
    //     onBackButtonPress={() => {
    //       this.setState({ isModalVisible4: false });
    //     }}>
    //     <ScrollView contentContainerStyle={{}}>
    //       {this.state.selectChecklist.length == 0 ? (
    //         <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
    //           <Text style={{ color: 'white', fontSize: 20 }}>등록된 체크리스트가 없습니다</Text>
    //         </View>
    //       ) : (
    //         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
    //           <Text style={{ color: 'white', fontSize: 20 }}>체크항목를 선택해주세요.</Text>
    //           <TouchableOpacity
    //             style={{ position: 'absolute', right: 0, top: 0 }}
    //             onPress={() => {
    //               this.setState({ isModalVisible4: false });
    //             }}>
    //             <AntDesign name="closecircleo" size={30} color="white" />
    //           </TouchableOpacity>
    //         </View>
    //       )}
    //       {this.state.selectChecklist
    //         .sort(function(a, b) {
    //           return a.CHECK_TYPE - b.CHECK_TYPE;
    //         })
    //         .map((list, index) => {
    //           console.log('this.state.selectChecklist', list);
    //           return (
    //             <View key={index} style={{ marginTop: index !== 0 ? hp('2%') : 0 }}>
    //               <TouchableOpacity
    //                 style={{ flexDirection: 'row' }}
    //                 onPress={() => {
    //                   this._checkdata(this.state.scanstore + '-' + list.QR_SEQ, list);
    //                 }}>
    //                 <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
    //                   <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    //                     {list.CHECK_TYPE == '0' ? <Text style={styles.checkNumber}>공통업무</Text> : <Text style={styles.checkNumber}>점포업무</Text>}
    // <CheckState check={list.CHECK_LIST}/>
    //                   </View>
    //                   <View>
    //                     <Text style={styles.checkTitle} ellipsizeMode={'tail'} numberOfLines={1}>
    //                       {list.TITLE}
    //                     </Text>
    //                   </View>
    //                   <View style={{}}>
    //                     {list.EMP_NAME !== null ? ( // 체크한 상태
    //                       <>
    //                         {list.EMP_SEQ !== null ? ( // 담당직원이 설정된 상태
    //                           <>
    //                             <View style={styles.typeTextArea}>
    //                               <Text style={styles.typeText}>체크시간</Text>
    //                               <Text style={styles.typeText2}>{list.CHECK_TIME}</Text>
    //                             </View>
    //                             <View style={styles.typeTextArea}>
    //                               <Text style={styles.typeText}>담당직원</Text>
    //                               <Text style={styles.typeText2}>{list.NAME.split('@').join(' / ')}</Text>
    //                             </View>
    //                           </>
    //                         ) : (
    //                           // 전직원 체크
    //                           <>
    //                             <View style={styles.typeTextArea}>
    //                               <Text style={styles.typeText}>체크시간</Text>
    //                               <Text style={styles.typeText2}>{list.CHECK_TIME}</Text>
    //                             </View>
    //                             <View style={styles.typeTextArea}>
    //                               <Text style={styles.typeText}>체크직원</Text>
    //                               <Text style={styles.typeText2}>{list.EMP_NAME}</Text>
    //                             </View>
    //                           </>
    //                         )}
    //                       </>
    //                     ) : (
    //                       // 미체크 상태
    //                       <>
    //                         {list.EMP_SEQ !== null ? ( // 담당직원이 설정된 상태
    //                           <>
    //                             <View style={styles.typeTextArea}>
    //                               <Text style={styles.typeText}>체크예정시간</Text>
    //                               <Text style={styles.typeText2}>{list.END_TIME === '' ? '미사용' : list.END_TIME}</Text>
    //                             </View>
    //                             <View style={styles.typeTextArea}>
    //                               <Text style={styles.typeText}>담당직원</Text>
    //                               <Text style={styles.typeText2}>{list.NAME.split('@').join(' / ')}</Text>
    //                             </View>
    //                           </>
    //                         ) : (
    //                           // 전직원 체크
    //                           <View style={styles.typeTextArea}>
    //                             <Text style={styles.typeText}>체크예정시간</Text>
    //                             <Text style={styles.typeText2}>{list.END_TIME === '' ? '미사용' : list.END_TIME}</Text>
    //                           </View>
    //                         )}
    //                       </>
    //                     )}
    //                   </View>
    //                 </View>
    //                 <View style={{ ...styles.listRight, backgroundColor: list.EMP_NAME ? '#642A8C' : '#ddd' }}>
    //                   {list.EMP_NAME ? <Feather name="check" size={34} color="white" style={{ paddingTop: 3 }} /> : <Feather name="check" size={34} color="white" style={{ paddingTop: 3 }} />}
    //                 </View>
    //               </TouchableOpacity>
    //             </View>
    //           );
    //         })}
    //     </ScrollView>
    //   </Modal>

    //   <Modal
    //     isVisible={this.state.isModalVisible}
    //     onBackdropPress={() => {
    //       this.setState({ isModalVisible: false, defaultMonth: this.state.date });
    //     }}
    //     style={{}}>
    //     <View style={styles.calendarTitle}>
    //       <View style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'white' }}>
    //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //           <View style={styles.checkPoint}></View>
    //           <Text style={{ fontSize: 11, color: '#333' }}>미체크</Text>
    //         </View>
    //         <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
    //           <View style={{ ...styles.checkPoint, backgroundColor: '#984B19' }}></View>
    //           <Text style={{ fontSize: 11, color: '#333' }}>체크이상</Text>
    //         </View>
    //         <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
    //           <View style={{ ...styles.checkPoint, backgroundColor: '#AACE36' }}></View>
    //           <Text style={{ fontSize: 11, color: '#333' }}>체크정상</Text>
    //         </View>
    //       </View>
    //       <View style={{ alignItems: 'flex-end' }}>
    //         <Text style={styles.calendarTitleText1}>{this.state.year}년</Text>
    //         <Text style={styles.calendarTitleText2}>
    //           {month}월 {day}일
    //         </Text>
    //       </View>
    //     </View>
    //     <Calendar
    //       style={{
    //         borderWidth: 1,
    //         borderColor: '#ccc',
    //         paddingVertical: 10,
    //       }}
    //       theme={{
    //         arrowColor: '#000',
    //         todayTextColor: '#AACE36',
    //       }}
    //       markingType={'multi-dot'}
    //       hideExtraDays={true}
    //       monthFormat={'M월'}
    //       current={this.state.defaultMonth}
    //       markedDates={this.state.markedDates}
    //       onDayPress={day => {
    //         this.onDayPress(day);
    //       }}
    //       onMonthChange={month => {
    //         this._monthChange(month);
    //       }}
    //     />
    //   </Modal>
    // </SafeAreaView>
  );
};
