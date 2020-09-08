import React from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import {ActivityIndicator} from 'react-native';
import {
  CheckBoxIcon,
  CameraIcon,
  PictureIcon,
} from '../../../../constants/Icons';

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

const TextInput = styled.TextInput``;

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

const TitleText = styled.Text`
  font-size: 17px;
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 5px;
`;

const GreyText = styled(Text)`
  margin: 10px 0;
  color: #bbb;
`;

const RowCenter = styled(Row)`
  justify-content: center;
  margin-bottom: 30px;
`;

const IconContainer = styled.View`
  width: ${wp('45%')}px;
  align-items: center;
`;

const IconBox = styled.View`
  margin-top: 10px;
  width: ${wp('20%')};
  height: ${wp('20%')};
  border-width: 1px;
  border-color: #642a8c;
  justify-content: center;
  align-items: center;
`;
export default ({
  scan,
  hasCHECK_TITLE,
  gotoChecklistAdd,
  CHECK_TITLE,
  setCHECK_TITLE,
  TITLE,
  LIST,
  NAME,
  STORE,
  CHECK_TIME,
  PHOTO_CHECK,
  END_TIME,
  EMP_NAME,
  isCameraModalVisible,
  setIsCameraModalVisible,
  cameraPictureList,
  setCameraPictureList,
  imgModalIdx,
  setImgModalIdx,
  checklistGoodState,
  setChecklistGoodState,
  checklistBadState,
  setChecklistBadState,
  openImagePickerFn,
}) => {
  const renderImage = (item, index) => (
    <Touchable
      onPress={() => {
        setIsCameraModalVisible(true);
      }}
      key={index}>
      <FastImage
        style={{width: 120, height: 120, borderRadius: 10, marginHorizontal: 5}}
        source={{
          uri: item,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </Touchable>
  );

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
              <Text>{TITLE}</Text>
            </RowSpace>
            <WhiteSpace />
            <RowSpace>
              <SectionText>체크예정시간</SectionText>
              <Text>{END_TIME == '' ? '미사용' : END_TIME}</Text>
            </RowSpace>
          </Section>
          <Section>
            <RowSpace>
              <SectionText>{NAME ? '담당직원' : '확인직원'}</SectionText>
              <Text style={{color: '#642A8C', fontWeight: 'bold'}}>
                {NAME ? NAME.split('@').join(' / ') : EMP_NAME ?? '체크전'}
              </Text>
            </RowSpace>
            <WhiteSpace />
            <RowSpace>
              <SectionText>확인시간</SectionText>
              <Text style={{color: '#642A8C', fontWeight: 'bold'}}>
                {CHECK_TIME ? moment(CHECK_TIME).format('HH:mm') : '체크전'}
              </Text>
            </RowSpace>
          </Section>
          <Section>
            <SectionText>체크리스트 목록</SectionText>
            <WhiteSpace />
            <Box>
              <ChecklistTitle>
                {LIST?.length === 0 ? (
                  <ChecklistItem>
                    <ChecklistText>ex. 가스벨브 잠그기</ChecklistText>
                  </ChecklistItem>
                ) : (
                  <CheckBoxIconContainer>
                    <Text
                      style={{
                        fontSize: 15,
                        color: scan == '0' ? '#CCCCCC' : '#642A8C',
                      }}>
                      정상
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: scan == '0' ? '#CCCCCC' : '#B91C1B',
                      }}>
                      이상
                    </Text>
                  </CheckBoxIconContainer>
                )}
              </ChecklistTitle>
              {LIST?.map((data, index) => (
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
                      <CheckBoxIcon
                        size={25}
                        color={
                          checklistGoodState[index] ? '#642A8C' : '#CCCCCC'
                        }
                      />
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
                      <CheckBoxIcon
                        size={25}
                        color={checklistBadState[index] ? '#B91C1B' : '#CCCCCC'}
                      />
                    </Touchable>
                  </CheckBoxIconContainer>
                </ChecklistItem>
              ))}
            </Box>
          </Section>

          {hasCHECK_TITLE?.length > 0 && (
            <Section>
              <SectionText>메모</SectionText>
              <WhiteSpace />
              <Box>
                <TextInput
                  onChangeText={(text) => setCHECK_TITLE(text)}
                  value={CHECK_TITLE}
                  placeholder={'내용를 입력하세요.'}
                  placeholderTextColor={'#CCCCCC'}
                  multiline={true}
                />
              </Box>
            </Section>
          )}
          {PHOTO_CHECK === '1' && STORE === '0' && scan === '1' && (
            <Section>
              <TitleText>사진</TitleText>
              {cameraPictureList?.length > 0 && (
                <GreyText>
                  등록된 사진을 클릭하면 리스트에서 제거됩니다
                </GreyText>
              )}
              <RowCenter>
                <IconContainer>
                  <Text>촬영</Text>
                  <Touchable onPress={() => setIsCameraModalVisible(true)}>
                    <IconBox>
                      <CameraIcon size={40} />
                    </IconBox>
                  </Touchable>
                </IconContainer>
                <IconContainer>
                  <Text>보관함</Text>
                  <Touchable onPress={() => openImagePickerFn()}>
                    <IconBox>
                      <PictureIcon />
                    </IconBox>
                  </Touchable>
                </IconContainer>
              </RowCenter>
              {!cameraPictureList && <ActivityIndicator size={'small'} />}
              {cameraPictureList?.length > 0 && (
                <FlatList
                  horizontal
                  keyExtractor={(_, index) => index.toString()}
                  style={{flexDirection: 'row'}}
                  contentContainerStyle={{justifyContent: 'center'}}
                  data={cameraPictureList}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => renderImage(item, index)}
                />
              )}
            </Section>
          )}
          {STORE == '1' && (
            <SubmitBtn
              text={'수정하기'}
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
