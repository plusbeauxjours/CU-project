import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImageView from 'react-native-image-viewing';
import {FlatList} from 'react-native-gesture-handler';
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
const Row = styled.View`
  flex-direction: row;
`;

const RowSpace = styled(Row)`
  justify-content: space-between;
`;
const SectionText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;
const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;
const Box = styled.View`
  border-width: 1px;
  border-color: #f2f2f2;
  min-height: 100px;
  padding: 10px;
`;
const ImageModalFooter = styled.View`
  margin-bottom: 60px;
  align-items: center;
  padding: 5px 20px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.4);
`;
const ImageModalFooterText = styled.Text`
  color: white;
  font-weight: bold;
`;
const TextInput = styled.TextInput``;
const ImageBox = styled.View`
  flex-direction: row;
  margin: 15px 20px 0 20px;
`;
const ImageContainer = styled.View`
  width: 25px;
  height: 25px;
  border-radius: 5px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
const WhiteSpace = styled.View`
  height: 10px;
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

const CheckBoxIconContainer = styled(RowSpace)`
  width: 60px;
`;

export default ({
  checkEMPTime,
  selectedCategory,
  cameraPictureList,
  modalImgarr,
  imgModalIdx,
  isImageViewVisible,
  setIsImageViewVisible,
  memoInput,
  setMemoInput,
  scan,
  setImgModalIdx,
  checkpoint,
  checktime,
  checkEMP,
  checklist,
  checklistGoodState,
  setChecklistGoodState,
  checklistBadState,
  setChecklistBadState,
}) => {
  const checkEMPTimed = checkEMPTime.substring(11, 16);

  // const categoryListRenderItem = ({item, data}) => {
  //   let wrapperStyle = {
  //     borderRadius: 15,
  //     height: 30,
  //     backgroundColor: '#FFFFFF',
  //     borderColor: '#642A8C',
  //     borderWidth: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     paddingHorizontal: 15,
  //     marginRight: 10,
  //     marginBottom: 0,
  //   };
  //   let textStyle = {color: '#642A8C'};

  //   if (item.text === selectedCategory) {
  //     wrapperStyle.backgroundColor = '#642A8C';
  //     wrapperStyle.borderColor = '#642A8C';
  //     wrapperStyle.borderWidth = 1;
  //     textStyle.color = '#FFFFFF';
  //   }

  //   return (
  //     <TouchableOpacity
  //       key={item.key}
  //       style={wrapperStyle}
  //       onPress={() => {
  //         let checkpoint = data._this.state.data.checkdata[0].TITLE;
  //         let checklist = data._this.state.data.checkdata[0].LIST;
  //         let checktime = data._this.state.data.checkdata[0].END_TIME;
  //         let PHOTO_CHECK = data._this.state.data.checkdata[0].PHOTO_CHECK;
  //         let csID = data._this.state.data.resultdata[item.key].CS_SEQ;
  //         let check = data._this.state.data.resultdata[item.key].CHECK_LIST;
  //         let checkEMP = data._this.state.data.resultdata[item.key].EMP_NAME;
  //         let checkEMPTime =
  //           data._this.state.data.resultdata[item.key].CHECK_TIME;
  //         let memo = data._this.state.data.resultdata[item.key].CHECK_TITLE;
  //         let IMAGE_LIST =
  //           data._this.state.data.resultdata[item.key].IMAGE_LIST;
  //         let checklistGoodState = new Array(checklist.length);
  //         let checklistBadState = new Array(checklist.length);

  //         checklistGoodState.fill(false);
  //         checklistBadState.fill(false);

  //         if (check !== null) {
  //           checklist = check.split('@');
  //           const size = checklist.length / 2;
  //           checklist = new Array();
  //           check = check.split('@');
  //           for (var i = 0; i < size; i++) {
  //             var checktemp = 2 * i;
  //             checklist[i] = check[checktemp];

  //             var temp = 2 * i + 1;

  //             if (check[temp] === '1') {
  //               checklistGoodState[i] = true;
  //             }

  //             if (check[temp] === '2') {
  //               checklistBadState[i] = true;
  //             }
  //           }
  //         } else {
  //           checklist = checklist.split('@@');
  //           checklist[checklist.length - 1] = checklist[
  //             checklist.length - 1
  //           ].replace('@', '');
  //         }

  //         const cameraPictureListed = cameraPictureList;
  //         const modalImgarred = modalImgarr;
  //         const imageList = (IMAGE_LIST || '').split('@');
  //         if (imageList && Array.isArray(imageList)) {
  //           if (imageList[0] != '') {
  //             for (const imageName of imageList) {
  //               cameraPictureListed.push(
  //                 `http://cuapi.shop-sol.com/uploads/${imageName}`,
  //               );
  //               modalImgarred.push({
  //                 source: {
  //                   uri: `http://cuapi.shop-sol.com/uploads/${imageName}`,
  //                 },
  //                 title: 'modalImg' + [i],
  //                 width: wp('100%'),
  //                 height: hp('100%'),
  //               });
  //             }
  //           }
  //         }

  //         data._this.setState({
  //           selectedCategory: item.text,
  //           check: check,
  //           checkpoint,
  //           checklist,
  //           checktime: checktime === null ? '' : checktime,
  //           csID: csID === null ? '' : csID,
  //           memoInput: memo === null ? '' : memo,
  //           checkEMP: checkEMP === null ? '' : checkEMP,
  //           checkEMPTime: checkEMPTime === null ? '' : checkEMPTime,
  //           checklistGoodState,
  //           checklistBadState,
  //           PHOTO_CHECK,
  //           cameraPictureList,
  //           modalImgarr,
  //         });
  //       }}>
  //       <Text style={textStyle}>{item.text}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}>
        {/* <View style={{marginTop: 20, marginHorizontal: wp('6%')}}>
        <FlatList
          style={{}}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={this.state.categoryList}
          horizontal={true}
          renderItem={({item}) => {
            return this._categoryListRenderItem(item, {_this: this});
          }}
        />
      </View> */}

        <Container>
          <Section>
            <RowSpace>
              <SectionText>체크항목</SectionText>
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

          {memoInput?.length > 0 && (
            <Section>
              <SectionText>메모</SectionText>
              <WhiteSpace />
              <Box>
                <TextInput
                  onChangeText={(text) => setMemoInput(text)}
                  value={memoInput}
                  placeholder={'내용를 입력하세요.'}
                  placeholderTextColor={'#CCCCCC'}
                  multiline={true}
                  editable={scan == '0' ? false : true}
                />
              </Box>
            </Section>
          )}
          {cameraPictureList?.length > 0 && (
            <Section>
              <SectionText>체크리스트 관련사진</SectionText>
              <ImageBox>
                {cameraPictureList?.map(({picture, index}) => (
                  <Touchable
                    key={index}
                    onPress={() => {
                      setIsImageViewVisible(true);
                      setImgModalIdx(picture?.index);
                    }}>
                    <ImageContainer
                      style={{
                        width: wp('18%'),
                        height: wp('18%'),
                        marginRight: 14,
                      }}>
                      <Image source={{uri: picture?.item}} />
                    </ImageContainer>
                  </Touchable>
                ))}
              </ImageBox>
            </Section>
          )}
        </Container>

        <ImageView
          images={modalImgarr}
          imageIndex={imgModalIdx}
          visible={isImageViewVisible}
          onRequestClose={() => setIsImageViewVisible(false)}
          FooterComponent={({imageIndex}) => (
            <ImageModalFooter>
              <ImageModalFooterText>
                {imageIndex + 1} / {modalImgarr.length}
              </ImageModalFooterText>
            </ImageModalFooter>
          )}
        />
      </ScrollView>
    </BackGround>
  );
};
