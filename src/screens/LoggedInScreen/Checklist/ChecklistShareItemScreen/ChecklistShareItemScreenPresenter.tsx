import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {FlatList} from 'react-native-gesture-handler';
import ImageView from 'react-native-image-viewing';
import {useNavigation} from '@react-navigation/native';

import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import utils from '../../../../constants/utils';
import {KeyboardAvoidingView} from 'react-native';
import {
  ForwardIcon,
  EllipseIcon,
  DeleteIcon,
  SettingIcon,
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
  padding: 20px;
  align-items: center;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const RowTouchable = styled.TouchableOpacity`
  margin-right: 10px;
  flex-direction: row;
  align-items: center;
`;
const RowSpace = styled.View`
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

const Bold = styled.Text`
  font-weight: bold;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-width: 1px;
  border-color: #ddd;
`;

const ImageTouchable = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  margin-right: 20px;
`;

const ImageInxBox = styled.View`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  margin-bottom: 20px;
  align-items: center;
`;

const CommentTextInputContainer = styled.View`
  padding: 10px;
  border-width: 1px;
  border-color: #642a8c;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const TextInput = styled.TextInput`
  flex: 1;
  align-items: center;
  margin-left: 10px;
  padding: 10px 0;
`;

const ForwardIconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: #642a8c;
`;

const MemoText = styled.Text`
  flex: 1;
  color: #ccc;
`;

const MemoContainer = styled.View`
  border-bottom-width: 1px;
  border-color: #aaa;
`;

const CommentTitleText = styled.Text`
  font-size: 15px;
  color: #642a8c;
`;

const MemoBox = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 7px 0;
  flex-direction: row;
  align-items: center;
`;

const Comment = styled.View`
  flex: 1;
  margin: 20px 0;
  border-bottom-width: 0.7px;
  border-color: #ddd;
`;

const CommentBox = styled.View`
  padding: 5px 0;
  border-top-width: 0.7px;
  border-color: #ddd;
  min-height: 100px;
  justify-content: center;
`;

const Column = styled.View`
  flex-direction: column;
  justify-content: center;
`;

export default ({
  NOTI_TITLE,
  CREATE_TIME,
  EMP_NAME,
  TITLE,
  CONTENTS,
  IS_MANAGER,
  imgarr,
  setIsImageViewVisible,
  setImgModalIdx,
  modalImgarr,
  imgModalIdx,
  isImageViewVisible,
  ME,
  MEMBER_SEQ,
  clickComment,
  setClickComment,
  clickCommentUpdate,
  setClickCommentUpdate,
  memoInput,
  setMemoInput,
  registFn,
  deleteFn,
  editFn,
  comment,
  setMemoUpdate,
  setSelectedCOM_SEQ,
  COM_SEQ,
}) => {
  const navigation = useNavigation();
  const RenderImage = (item, index) => (
    <ImageTouchable
      onPress={() => {
        setIsImageViewVisible(true);
        setImgModalIdx(item.index);
      }}
      key={index}>
      <Image
        source={{
          uri: 'http://cuapi.shop-sol.com/uploads/' + item.item,
        }}
        resizeMode="cover"
      />
    </ImageTouchable>
  );
  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <Section>
            <Row style={{justifyContent: 'center', marginBottom: 5}}>
              <Bold style={{fontSize: 18}}>{NOTI_TITLE}</Bold>
            </Row>
            <Row style={{justifyContent: 'center'}}>
              <Bold style={{color: '#C8C8C8'}}>
                {moment(CREATE_TIME).format('YYYY.MM.DD')}
              </Bold>
              {TITLE !== 'CU소식' && (
                <Bold style={{color: '#C8C8C8'}}>&nbsp;-&nbsp;{EMP_NAME}</Bold>
              )}
            </Row>
          </Section>
          <Section>
            <Text>{CONTENTS}</Text>
          </Section>
          {imgarr?.length > 0 && (
            <Section style={{alignItems: 'center'}}>
              <FlatList
                horizontal
                keyExtractor={(_, index) => index.toString()}
                style={{flexDirection: 'row'}}
                data={imgarr}
                renderItem={({item, index}) => RenderImage(item, index)}
              />
            </Section>
          )}
          <ImageView
            images={modalImgarr}
            imageIndex={imgModalIdx}
            visible={isImageViewVisible}
            onRequestClose={() => setIsImageViewVisible(false)}
            FooterComponent={({imageIndex}) => (
              <ImageInxBox>
                <Bold style={{color: 'white'}}>
                  {imageIndex + 1} / {modalImgarr.length}
                </Bold>
              </ImageInxBox>
            )}
          />

          {TITLE !== 'CU소식' && (
            <Section>
              <MemoContainer>
                <CommentTitleText>댓글달기</CommentTitleText>
                <MemoBox onPress={() => setClickComment(true)}>
                  <MemoText>댓글을 입력하세요...</MemoText>
                </MemoBox>
              </MemoContainer>
              <Comment>
                {comment?.map((data, index) => (
                  <CommentBox key={index}>
                    <Row>
                      <Image
                        style={{
                          height: 50,
                          width: 50,
                          borderWidth: 1,
                          borderRadius: 25,
                          borderColor: '#ccc',
                          marginRight: 10,
                        }}
                        source={{
                          uri: `http://133.186.209.113/uploads/3.png`,
                        }}
                      />
                      <Column>
                        <Row>
                          <Text
                            style={{
                              color: '#aaa',
                              fontSize: 13,
                              marginRight: 15,
                            }}>
                            {EMP_NAME} [{IS_MANAGER}]
                          </Text>
                          <EllipseIcon color={'#999'} size={5} />
                          <Bold style={{color: '#C8C8C8', marginLeft: 5}}>
                            {moment(CREATE_TIME).format('YYYY.MM.DD')}
                          </Bold>
                        </Row>
                        <Text
                          ellipsizeMode={'tail'}
                          numberOfLines={100}
                          style={{flexWrap: 'wrap', marginTop: 5}}>
                          {CONTENTS}
                        </Text>
                      </Column>
                    </Row>
                    {data.MEMBER_SEQ == MEMBER_SEQ && (
                      <Row style={{justifyContent: 'flex-end'}}>
                        <RowTouchable
                          onPress={() => {
                            setClickCommentUpdate(true);
                            setMemoUpdate(CONTENTS);
                            setSelectedCOM_SEQ(COM_SEQ);
                          }}>
                          <SettingIcon color={'#AACE36'} size={20} />
                          <Text style={{color: '#AACE36'}}>수정</Text>
                        </RowTouchable>
                        <RowTouchable onPress={() => deleteFn(COM_SEQ)}>
                          <DeleteIcon />
                          <Text style={{color: '#B91C1B'}}>삭제</Text>
                        </RowTouchable>
                      </Row>
                    )}
                  </CommentBox>
                ))}
              </Comment>
            </Section>
          )}
          {console.log(ME)}
          {MEMBER_SEQ && ME == MEMBER_SEQ && (
            <SubmitBtn
              text={`${TITLE} 수정하기`}
              onPress={() =>
                navigation.navigate('ChecklistShareUpdateScreen', {
                  TITLE,
                })
              }
              isRegisted={true}
            />
          )}
        </Container>
      </ScrollView>

      {clickComment && (
        <KeyboardAvoidingView
          behavior={utils.isAndroid ? 'height' : 'padding'}
          keyboardVerticalOffset={0}
          style={
            utils.isAndroid
              ? {backgroundColor: '#dddee2'}
              : {backgroundColor: '#cfd3d6'}
          }
          enabled>
          <CommentTextInputContainer>
            <TextInput
              autoFocus={true}
              onChangeText={(text) => setMemoInput(text)}
              value={memoInput}
              placeholder={'댓글을 입력하세요.'}
              placeholderTextColor={'#CCCCCC'}
              onBlur={() => {
                setMemoInput('');
                setClickComment(false);
              }}
              multiline={true}
            />
            <ForwardIconContainer onPress={() => registFn()}>
              <ForwardIcon color={'white'} />
            </ForwardIconContainer>
          </CommentTextInputContainer>
        </KeyboardAvoidingView>
      )}

      {clickCommentUpdate && (
        <KeyboardAvoidingView
          behavior={utils.isAndroid ? 'height' : 'padding'}
          keyboardVerticalOffset={0}
          style={
            utils.isAndroid
              ? {backgroundColor: '#dddee2'}
              : {backgroundColor: '#cfd3d6'}
          }
          enabled>
          <CommentTextInputContainer>
            <TextInput
              autoFocus={true}
              onChangeText={(text) => setMemoInput(text)}
              value={memoInput}
              placeholder={'댓글을 입력하세요.'}
              placeholderTextColor={'#CCCCCC'}
              onBlur={() => {
                setMemoInput('');
                setClickCommentUpdate(false);
              }}
              multiline={true}
            />
            <ForwardIconContainer onPress={() => editFn()}>
              <ForwardIcon color={'white'} />
            </ForwardIconContainer>
          </CommentTextInputContainer>
        </KeyboardAvoidingView>
      )}
    </BackGround>
  );
};
