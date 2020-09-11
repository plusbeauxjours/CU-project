import React from 'react';
import styled from 'styled-components/native';
import {FlatList, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import {CameraIcon, PictureIcon} from '../../../../constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;
const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  margin-top: 20px;
  padding: 20px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const RowCenter = styled(Row)`
  justify-content: center;
  margin-bottom: 30px;
`;

const TitleText = styled.Text`
  font-size: 17px;
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 5px;
`;

const TextInput = styled.TextInput`
  width: 100%;
  font-size: 15px;
  border-bottom-width: 1px;
  border-color: #e5e5e5;
  padding-bottom: 5px;
  margin-top: 10px;
`;

const TextInputContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const DateText = styled.Text`
  width: 100%;
  font-size: 17px;
  margin-left: 5px;
  margin-top: 10px;
`;

const ImageContainer = styled.View`
  width: 120px;
  height: 120px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const ContentTextInput = styled.TextInput`
  padding: 10px;
  min-height: 120px;
  font-size: 15px;
  border-width: 1px;
  border-color: #e5e5e5;
`;

const GreyText = styled(Text)`
  margin: 10px 0;
  color: #bbb;
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

const DeleteButton = styled.TouchableOpacity`
  margin: 50px 0;
  justify-content: center;
  align-items: center;
`;

export default ({
  cameraPictureList,
  setCameraPictureList,
  title,
  setTitle,
  content,
  setContent,
  isCameraModalVisible,
  setIsCameraModalVisible,
  TITLE,
  registerFn,
  openImagePickerFn,
  confirmModal,
  onPressImageFn,
  launchImageLibraryFn,
  launchCameraFn,
}) => (
  <>
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <Section>
            <TitleText>제목</TitleText>
            <TextInput
              placeholder={'최대 글자수는 15자 입니다'}
              selectionColor={'#642A8C'}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => {
                setTitle(text);
              }}
              value={title}
              maxLength={15}
            />
          </Section>

          <Section>
            <TitleText>내용</TitleText>
            <ContentTextInput
              placeholder={'내용을 입력해주세요'}
              selectionColor={'#642A8C'}
              blurOnSubmit={false}
              multiline={true}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => {
                setContent(text);
              }}
              value={content}
            />
          </Section>

          <Section>
            <TitleText>사진</TitleText>
            <GreyText>등록된 사진을 클릭하면 리스트에서 제거됩니다</GreyText>
            <RowCenter>
              <IconContainer>
                <Text>촬영</Text>
                <Touchable onPress={() => launchCameraFn(true)}>
                  <IconBox>
                    <CameraIcon size={40} />
                  </IconBox>
                </Touchable>
              </IconContainer>
              <IconContainer>
                <Text>보관함</Text>
                <Touchable onPress={() => launchImageLibraryFn()}>
                  <IconBox>
                    <PictureIcon />
                  </IconBox>
                </Touchable>
              </IconContainer>
            </RowCenter>
            {cameraPictureList?.length > 0 && (
              <FlatList
                horizontal
                keyExtractor={(_, index) => index.toString()}
                style={{flexDirection: 'row'}}
                contentContainerStyle={{justifyContent: 'center'}}
                data={cameraPictureList}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <Touchable key={index} onPress={() => onPressImageFn(item)}>
                    <FastImage
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                        marginRight: 10,
                      }}
                      source={{
                        uri: item.uri,
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.low,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </Touchable>
                )}
              />
            )}
          </Section>

          <SubmitBtn
            text={`${TITLE} 수정완료`}
            onPress={() =>
              confirmModal(`${TITLE}을 수정하시겠습니까?`, '수정', 'no', () =>
                registerFn(),
              )
            }
            isRegisted={title && content}
          />
          <DeleteButton
            onPress={() => {
              confirmModal(`${TITLE}을 삭제하시겠습니까?`, '삭제', 'yes', () =>
                registerFn('close'),
              );
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#FF3D3D',
                textDecorationLine: 'underline',
              }}>
              {TITLE} 삭제하기
            </Text>
          </DeleteButton>
        </Container>
      </ScrollView>
    </BackGround>
    {/* <Modal
        isVisible={this.state.isCameraModalVisible}
        style={{margin: 0}}
        onBackButtonPress={() => {
          this.setState({isCameraModalVisible: false});
        }}>
        <View style={{flex: 1}}>
          {this.state.cameraPictureLast ? (
            <>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 16,
                  paddingTop: isIphoneX() ? 50 : 30,
                }}>
                <View style={{flex: 1, marginBottom: 22}}>
                  <Image
                    source={{uri: this.state.cameraPictureLast}}
                    style={{width: '100%', height: '100%', borderRadius: 5}}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '50%', flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.cameraPictureRetryButton}
                    onPress={() => {
                      this.setState({
                        cameraPictureLast: null,
                      });
                    }}>
                    <Text style={{fontSize: 16, color: '#642A8C'}}>
                      {' '}
                      재촬영{' '}
                    </Text>
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
              </View>
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
                this.state.cameraPictureFlash
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
              {this.state.cameraRatioList.length > 0 ? (
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
                    style={styles.cameraPictureFlashButton}
                    onPress={async () => {
                      this.setState({
                        cameraPictureFlash: !this.state.cameraPictureFlash,
                      });
                    }}>
                    <Ionicons
                      name={
                        this.state.cameraPictureFlash
                          ? 'ios-flash-off'
                          : 'ios-flash'
                      }
                      size={20}
                      color="#FFFFFF"
                      style={{paddingTop: 3}}
                    />
                  </TouchableOpacity>
                </>
              ) : null}
            </Camera>
          )}
        </View>
      </Modal> */}
  </>
);
