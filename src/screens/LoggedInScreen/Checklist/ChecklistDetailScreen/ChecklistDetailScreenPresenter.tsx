import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';

import {CheckBoxIcon} from '../../../../constants/Icons';
import {ActivityIndicator} from 'react-native';

interface ISelected {
  isSelected: boolean;
}

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

const CategoryList = styled.View`
  padding: 16px 0;
`;

const Category = styled.TouchableOpacity<ISelected>`
  border-radius: 15px;
  height: 30px;
  background-color: ${(props) => (props.isSelected ? '#642A8C' : '#ffffff')};
  border-color: #642a8c;
  border-width: 1px;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  margin-left: 16px;
`;

const CategoryText = styled.Text`
  color: ${(props) => (props.isSelected ? '#ffffff' : '#642A8C')};
`;

const Footer = styled.View`
  width: ${wp('100%')}px;
`;

const FooterText = styled.Text`
  text-align: center;
  color: white;
  font-size: 18px;
  margin-bottom: 20px;
`;

export default ({
  checkEMPTime,
  selectedCategory,
  cameraPictureList,
  modalImgarr,
  isImageViewVisible,
  setIsImageViewVisible,
  memoInput,
  checkpoint,
  checktime,
  checkEMP,
  checklist,
  checklistGoodState,
  setChecklistGoodState,
  checklistBadState,
  setChecklistBadState,
  categoryList,
  setSelectedCategory,
  setCheck,
  setCheckpoint,
  setChecklist,
  setChecktime,
  setCsID,
  setMemoInput,
  setCheckEMP,
  setCheckEMPTime,
  setCameraPictureList,
  setModalImgarr,
  data,
}) => {
  const renderImage = (item, index) => (
    <Touchable
      onPress={() => {
        setIsImageViewVisible(true);
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

  const renderFooter = (index: number) => (
    <Footer>
      <FooterText>
        {index + 1 || 1} / {modalImgarr.length}
      </FooterText>
    </Footer>
  );

  const CategoryListRenderItem = (item, index) => {
    const isSelected = item.MEMBER_SEQ1 == selectedCategory;
    return (
      <Category
        key={index}
        isSelected={isSelected}
        onPress={() => {
          let csID = data.resultdata[item.key].CS_SEQ;
          let check = data.resultdata[item.key].CHECK_LIST;
          let checkEMP = data.resultdata[item.key].EMP_NAME;
          let checkEMPTime = data.resultdata[item.key].CHECK_TIME;
          let memo = data.resultdata[item.key].CHECK_TITLE;
          let IMAGE_LIST = data.resultdata[item.key].IMAGE_LIST;

          let checklistGoodState = new Array(checklist.length);
          let checklistBadState = new Array(checklist.length);

          checklistGoodState.fill(false);
          checklistBadState.fill(false);

          if (check !== null) {
            checklist = check.split('@');
            const size = checklist.length / 2;
            checklist = new Array();
            check = check.split('@');
            for (var i = 0; i < size; i++) {
              var checktemp = 2 * i;
              checklist[i] = check[checktemp];
              var temp = 2 * i + 1;
              if (check[temp] === '1') {
                checklistGoodState[i] = true;
              }
              if (check[temp] === '2') {
                checklistBadState[i] = true;
              }
            }
          } else {
            checklist = checklist.split('@@');
            checklist[checklist.length - 1] = checklist[
              checklist.length - 1
            ].replace('@', '');
          }

          const cameraPictureList = [];
          const modalImgarr = [];
          const imageList = (IMAGE_LIST || '').split('@');
          if (imageList && Array.isArray(imageList)) {
            if (imageList[0] != '') {
              for (const imageName of imageList) {
                cameraPictureList.push(
                  `http://cuapi.shop-sol.com/uploads/${imageName}`,
                );
                modalImgarr.push({
                  url: `http://cuapi.shop-sol.com/uploads/${imageName}`,
                });
              }
            }
          }

          setCheck(check);
          setCheckpoint(checkpoint);
          setChecklist(checklist);
          setChecktime(checktime === null ? '' : checktime);
          setCsID(csID === null ? '' : csID);
          setMemoInput(memo === null ? '' : memo);
          setCheckEMP(checkEMP === null ? '' : checkEMP);
          setCheckEMPTime(checkEMPTime === null ? '' : checkEMPTime);
          setChecklistGoodState(checklistGoodState);
          setChecklistBadState(checklistBadState);
          setCameraPictureList(cameraPictureList);
          setModalImgarr(modalImgarr);

          setSelectedCategory(item.MEMBER_SEQ1);
        }}>
        <CategoryText isSelected={isSelected}>{item.EMP_NAME}</CategoryText>
      </Category>
    );
  };

  return (
    <BackGround>
      <CategoryList>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={categoryList}
          horizontal={true}
          renderItem={({item, index}) => CategoryListRenderItem(item, index)}
        />
      </CategoryList>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
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
                      disabled={true}>
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
                      disabled={true}>
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
                  editable={false}
                />
              </Box>
            </Section>
          )}
          {cameraPictureList?.length > 0 && (
            <Section>
              <SectionText>체크리스트 관련사진</SectionText>
              <WhiteSpace />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                style={{flexDirection: 'row'}}
                data={cameraPictureList}
                renderItem={({item, index}) => renderImage(item, index)}
              />
            </Section>
          )}
        </Container>

        <Modal
          onBackdropPress={() => setIsImageViewVisible(false)}
          isVisible={isImageViewVisible}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
            width: '100%',
            height: '100%',
          }}>
          {console.log('modalImgarr', modalImgarr)}
          <ImageViewer
            imageUrls={modalImgarr}
            onSwipeDown={() => setIsImageViewVisible(false)}
            backgroundColor={'transparent'}
            saveToLocalByLongPress={false}
            enableSwipeDown
            useNativeDriver
            enablePreload
            renderFooter={renderFooter}
            loadingRender={() => <ActivityIndicator />}
            renderIndicator={() => null}
            renderImage={(props) => {
              console.log('props', props);
              return (
                <FastImage
                  style={{width: '100%', height: '100%'}}
                  source={{
                    uri: props.source.uri,
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.low,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              );
            }}
          />
        </Modal>
      </ScrollView>
    </BackGround>
  );
};
