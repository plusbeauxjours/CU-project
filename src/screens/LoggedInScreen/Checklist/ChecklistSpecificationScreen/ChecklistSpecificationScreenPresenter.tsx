import React from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import moment from 'moment';
import {CheckBoxIcon} from '../../../../constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;
const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  align-items: center;
`;
const Image = styled.Image``;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowSpace = styled(Row)`
  justify-content: space-between;
`;

const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

const SectionText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const WhiteSpace = styled.View`
  height: 10px;
`;

const Box = styled.View`
  border-width: 1px;
  border-color: #f2f2f2;
  min-height: 100px;
  padding: 10px;
`;

const ChecklistItem = styled.View`
  width: 100%;
  border-bottom-width: 0.7px;
  border-color: #eee;
  padding: 6px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CheckBoxIconContainer = styled(RowSpace)`
  width: 60px;
`;

const ChecklistTitle = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 30px;
  padding-right: 5px;
`;

const ChecklistText = styled.Text`
  max-width: 230px;
  flex-wrap: wrap;
  font-size: 15px;
  color: #999;
`;

export default ({
  scan,
  gotoChecklistAdd,
  checkType,
  memoInput,
  STORE,
  PHOTO_CHECK,
  isCameraModalVisible,
  setIsCameraModalVisible,
  cameraPictureList,
  setCameraPictureList,
  imgModalIdx,
  setImgModalIdx,
  checkEMPTime,
  checkpoint,
  checktime,
  checklist,
  checkEMP,
  checkData,
  checklistGoodState,
  setChecklistGoodState,
  checklistBadState,
  setChecklistBadState,
}) => {
  // const memoView = () => {
  //   let scan = this.props.navigation.getParam('scan'
  //   return (
  //     <View style={styles.section}>
  //       <Text style={{fontSize: 15, fontWeight: 'bold', paddingHorizontal: 20}}>
  //         메모
  //       </Text>
  //       <View style={styles.memoBox} ref={(ref) => (this.memoInputArea = ref)}>
  //         <TextInput
  //           ref={(ref) => (this.memoInputBox = ref)}
  //           style={styles.memoTIText}

  //           onChangeText={(text) => this.setState({memoInput: text})}
  //           value={this.state.memoInput}
  //           placeholder={'내용를 입력하세요.'}
  //           placeholderTextColor={'#CCCCCC'}
  //           multiline={true}
  //           editable={scan == '0' ? false : true}
  //           onFocus={() => {
  //             console.log('this.memoInputBox', this.memoInputArea);
  //           }}
  //         />
  //       </View>
  //     </View>
  //   );
  // };

  // const _getPhotoZone = (scan) => {
  //   if (Number(PHOTO_CHECK || 0) !== 1) {
  //     return null;
  //   }

  //   if (STORE === '0' && scan === '1') {
  //     return (
  //       <View style={styles.section}>
  //         <Text style={{fontSize: 15, color: '#642A8C', paddingHorizontal: 20}}>
  //           사진 업로드
  //         </Text>
  //         <View style={styles.cameraButtonBox}>
  //           <Text style={{fontSize: 14, color: '#999'}}>촬영</Text>
  //           <TouchableOpacity
  //             style={styles.cameraButton}
  //             onPress={() => setIsCameraModalVisible(false)}>
  //             <SimpleLineIcons
  //               name="camera"
  //               size={30}
  //               color="#642A8C"
  //               style={{paddingTop: 3}}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //         {cameraPictureList?.length > 0 && (
  //           <FlatList
  //             horizontal
  //             keyExtractor={(item, index) => index.toString()}
  //             style={{marginHorizontal: 20, flexDirection: 'row'}}
  //             data={cameraPictureList}
  //             renderItem={(obj) => {
  //               return (
  //                 <TouchableOpacity
  //                   onPress={() => {
  //                     const cameraPictureListed = cameraPictureList;
  //                     cameraPictureListed.splice(obj.index, 1);
  //                     setCameraPictureList(cameraPictureListed);
  //                   }}>
  //                   <View
  //                     key={obj.index.toString()}
  //                     style={{
  //                       width: wp('18%'),
  //                       height: wp('18%'),
  //                       marginRight: 14,
  //                     }}>
  //                     <Image
  //                       source={{uri: obj.item}}
  //                       style={{width: '100%', height: '100%', borderRadius: 5}}
  //                     />
  //                   </View>
  //                 </TouchableOpacity>
  //               );
  //             }}
  //           />
  //         )}
  //       </View>
  //     );
  //   }

  //   if (cameraPictureList?.length != 0) {
  //     return (
  //       <View style={styles.sectionPhoto}>
  //         {cameraPictureList?.length > 0 && (
  //           <FlatList
  //             horizontal
  //             keyExtractor={(item, index) => index.toString()}
  //             style={{
  //               marginHorizontal: 20,
  //               flexDirection: 'row',
  //               paddingBottom: 10,
  //             }}
  //             data={cameraPictureList}
  //             renderItem={(obj) => {
  //               return (
  //                 <TouchableOpacity
  //                   key={obj.index.toString()}
  //                   style={
  //                     obj.index == 0
  //                       ? {marginLeft: 0, width: wp('65%'), height: wp('48%')}
  //                       : {marginLeft: 20, width: wp('65%'), height: wp('48%')}
  //                   }
  //                   onPress={() => {
  //                     setIsImageViewVisible(true);
  //                     setImgModalIdx(obj.index);
  //                   }}>
  //                   <Image
  //                     source={{uri: obj.item}}
  //                     style={{width: '100%', height: '100%', borderRadius: 5}}
  //                   />
  //                 </TouchableOpacity>
  //               );
  //             }}
  //           />
  //         )}
  //       </View>
  //     );
  //   }

  //   return null;
  // };
  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <Section>
            <RowSpace>
              <SectionText>체크항목</SectionText>
              {console.log(checkpoint)}
              <Text>{checkpoint}</Text>
            </RowSpace>
            <WhiteSpace />
            <RowSpace>
              <SectionText>체크예정시간</SectionText>
              <Text>{checktime == '' ? '미사용' : checktime}</Text>
            </RowSpace>
          </Section>

          <Section>
            <RowSpace>
              <SectionText>{checkEMP ? '담당직원' : '확인직원'}</SectionText>
              <Text style={{color: '#642A8C', fontWeight: 'bold'}}>
                {checkEMP ?? '체크전'}
              </Text>
            </RowSpace>
            <WhiteSpace />
            <RowSpace>
              <SectionText>확인시간</SectionText>
              <Text style={{color: '#642A8C', fontWeight: 'bold'}}>
                {moment(checkEMPTime).format('HH:mm') ?? '체크전'}
              </Text>
            </RowSpace>
          </Section>

          <Section>
            <SectionText>체크리스트 목록</SectionText>
            <WhiteSpace />
            <Box>
              <ChecklistTitle>
                {checklist?.length === 0 ? (
                  <ChecklistItem>
                    <ChecklistText>ex. 가스벨브 잠그기</ChecklistText>
                  </ChecklistItem>
                ) : (
                  <CheckBoxIconContainer>
                    <Text style={{fontSize: 15, color: '#642A8C'}}>정상</Text>
                    <Text style={{fontSize: 15, color: '#642A8C'}}>이상</Text>
                  </CheckBoxIconContainer>
                )}
              </ChecklistTitle>

              {checklist?.map((data, index) => (
                <ChecklistItem key={index}>
                  <ChecklistText>{data}</ChecklistText>
                  <CheckBoxIconContainer>
                    <Touchable
                      onPress={() => {
                        let checklistGoodStated = JSON.parse(
                          JSON.stringify(checklistGoodState),
                        );
                        let checklistBadStated = JSON.parse(
                          JSON.stringify(checklistBadState),
                        );
                        checklistGoodStated[index] = !checklistGoodState[index];
                        checklistBadStated[index] = !checklistBadState[index];
                        setChecklistGoodState(checklistGoodStated);
                        setChecklistBadState(checklistBadStated);
                      }}
                      disabled={scan == '1' ? false : true}>
                      {checklistGoodState[index] ? (
                        <CheckBoxIcon size={25} color="#642A8C" />
                      ) : (
                        <CheckBoxIcon size={25} color="#CCCCCC" />
                      )}
                    </Touchable>
                    <WhiteSpace />
                    <Touchable
                      onPress={() => {
                        let checklistGoodStated = JSON.parse(
                          JSON.stringify(checklistGoodState),
                        );
                        let checklistBadStated = JSON.parse(
                          JSON.stringify(checklistBadState),
                        );
                        checklistGoodStated[index] = !checklistGoodState[index];
                        checklistBadStated[index] = !checklistBadState[index];
                        setChecklistGoodState(checklistGoodStated);
                        setChecklistBadState(checklistBadStated);
                      }}
                      disabled={scan == '1' ? false : true}>
                      {checklistBadState[index] ? (
                        <CheckBoxIcon size={25} color="#642A8C" />
                      ) : (
                        <CheckBoxIcon size={25} color="#CCCCCC" />
                      )}
                    </Touchable>
                  </CheckBoxIconContainer>
                </ChecklistItem>
              ))}
            </Box>
          </Section>

          {checkType == '1' && memoInput !== '' && memoView()}
          {checkType == '2' && memoView()}

          {_getPhotoZone(scan)}

          {scan === '1' && STORE == '0' && (
            <SubmitBtn
              text={'체크완료'}
              onPress={() => navigation.setParams({register: true})}
              isRegisted={true}
            />
          )}
          {STORE == '1' && (
            <SubmitBtn
              text={'수정완료'}
              onPress={() => gotoChecklistAdd()}
              isRegisted={true}
            />
          )}
        </Container>
      </ScrollView>

      {/* <Modal
        isVisible={isCameraModalVisible}
        style={{margin: 0}}
        onBackButtonPress={() => setIsCameraModalVisible(false)}>
        <View style={{flex: 1}}>
          {cameraPictureLast ? (
            <>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 16,
                  paddingTop: isIphoneX() ? 50 : 10,
                }}>
                <View style={{flex: 1, marginBottom: 22}}>
                  <Image
                    source={{uri: this.state.cameraPictureLast}}
                    style={{width: '100%', height: '100%', borderRadius: 5}}
                  />
                </View>
              </View>
              <Row style={{flexDirection: 'row'}}>
                <View style={{width: '50%', flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.cameraPictureRetryButton}
                    onPress={() => {
                      this.setState({
                        cameraPictureLast: null,
                      });
                    }}>
                    <Text style={{fontSize: 16, color: '#642A8C'}}>재촬영</Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: '50%', flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      ...styles.cameraPictureChoiceButton,
                      backgroundColor: '#642A8C',
                    }}
                    onPress={async () => {
                      const cameraPictureLast = this.state.cameraPictureLast;
                      const name = cameraPictureLast.substring(
                        cameraPictureLast.lastIndexOf('/') + 1,
                      );
                      const cameraPictureList = this.state.cameraPictureList;
                      const savePicturePath =
                        this.defaultPictureUploadPath + name;
                   
                      await FileSystem.moveAsync({
                        from: cameraPictureLast,
                        to: savePicturePath,
                      });

                      cameraPictureList.push(savePicturePath);

                      this.setState({
                        isCameraModalVisible: false,
                        cameraPictureList,
                        cameraPictureLast: null,
                      });
                    }}>
                    <Text style={{fontSize: 16, color: '#fff'}}> 선택 </Text>
                  </TouchableOpacity>
                </View>
              </Row>
            </>
          ) : (
            <Camera
              ref={(ref) => {
                this.cameraRef = ref;
              }}
              ratio={
                this.state.cameraRatioList.length > 0
                  ? this.state.cameraRatioList[
                      this.state.cameraRatioList.length - 1
                    ]
                  : '16:9'
              }
              autoFocus={Camera.Constants.AutoFocus.on}
              style={{flex: 1}}
              onCameraReady={async () => {
                this.setState({
                  cameraRatioList: ['16:9'],
                });
              }}
              flashMode={
                this.state.isCameraPictureFlash
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off
              }>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={styles.cameraPictureCloseButton}
                  onPress={() => {
                    this.setState({
                      isCameraModalVisible: false,
                    });
                  }}>
                  <Text style={{fontSize: 16, color: '#FFFFFF'}}> 닫기 </Text>
                </TouchableOpacity>
              </View>
              {cameraRatioList?.length > 0 && (
                <>
                  <TouchableOpacity
                    style={styles.cameraPictureButton}
                    onPress={async () => {
                      const capturedPicture = await this.cameraRef.takePictureAsync();

                      this.setState({
                        cameraPictureLast: capturedPicture.uri,
                      });
                    }}>
                    <AntDesign
                      name="camerao"
                      size={32}
                      color="#642A8C"
                      style={{paddingTop: 3}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.isCameraPictureFlashButton}
                    onPress={async () => {
                      this.setState({
                        isCameraPictureFlash: !this.state.isCameraPictureFlash,
                      });
                    }}>
                    <Ionicons
                      name={
                        this.state.isCameraPictureFlash
                          ? 'ios-flash-off'
                          : 'ios-flash'
                      }
                      size={20}
                      color="#FFFFFF"
                      style={{paddingTop: 3}}
                    />
                  </TouchableOpacity>
                </>
              )}
            </Camera>
          )}
        </View>
      </Modal> */}
    </BackGround>
  );
};
