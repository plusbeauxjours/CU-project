import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {FlatList} from 'react-native-gesture-handler';

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
  width: 80px;
  height: 80px;
  margin-right: 20px;
`;
export default ({
  NOTI_TITLE,
  CREATE_TIME,
  EMP_NAME,
  TITLE,
  CONTENTS,
  imgarr,
  setIsImageViewVisible,
  setImgModalIdx,
}) => {
  const RenderImage = (item, index) => (
    <ImageTouchable
      onPress={() => {
        setIsImageViewVisible(true);
        setImgModalIdx(item.index);
      }}
      key={item.index.toString()}>
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
            <Row>
              <Bold style={{fontSize: 18}}>{NOTI_TITLE}</Bold>
            </Row>
            <Row>
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
            <Section>
              <FlatList
                horizontal
                keyExtractor={(item, index) => index.toString()}
                style={{flexDirection: 'row'}}
                data={imgarr}
                renderItem={({item, index}) => RenderImage(item, index)}
              />
            </Section>
          )}
          {/* <ImageView
            images={this.state.modalImgarr}
            imageIndex={this.state.imgModalIdx}
            visible={this.state.isImageViewVisible}
            onRequestClose={() => {
              this.setState({isImageViewVisible: false});
            }}
            FooterComponent={({imageIndex}) => (
              <View style={{marginBottom: hp('8%'), alignItems: 'center'}}>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: hp('1%'),
                    borderRadius: 20,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    {imageIndex + 1} / {this.state.modalImgarr.length}
                  </Text>
                </View>
              </View>
            )}
          /> */}

          {/* {TITLE !== 'CU소식' && (
            <View
              style={{
                ...styles.section,
                paddingHorizontal: 0,
                marginBottom: 20,
              }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#aaa',
                  marginHorizontal: wp('7%'),
                }}>
                <Text style={{fontSize: 15, color: '#642A8C'}}>댓글달기</Text>
                <TouchableOpacity
                  style={styles.memoBox}
                  onPress={() => {
                    this.setState({clickComment: true});
                  }}>
                  <Text style={styles.memoText}>댓글을 입력하세요...</Text>
                </TouchableOpacity>
              </View>
                <View style={styles.comment}>
                  {comment?.map((data, index) => {
                    return (
                      <View
                        style={
                          index == 0
                            ? {...styles.commentBox, borderTopWidth: 0}
                            : styles.commentBox
                        }>
                        <View style={{flexDirection: 'row'}}>
                          <View>
                            <Image
                              style={{
                                height: wp('10%'),
                                width: wp('10%'),
                                borderWidth: 1,
                                borderRadius: 50,
                                borderColor: '#ccc',
                              }}
                              source={{
                                uri: `http://133.186.209.113/uploads/3.png`,
                              }}
                            />
                          </View>
                          <View style={{marginLeft: 10}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                              }}>
                              <View style={{marginRight: 15}}>
                                <Text style={{color: '#aaa', fontSize: 13}}>
                                  {data.EMP_NAME} [{data.IS_MANAGER}]
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    marginRight: 3,
                                    width: 4,
                                    height: 4,
                                    borderRadius: 10,
                                    backgroundColor: '#999',
                                  }}></View>
                                <Text style={{color: '#999', fontSize: 11}}>
                                  {data.CREATE_TIME.substr(0, 16)
                                    .split('-')
                                    .join('.')}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{marginTop: 3, marginRight: wp('10%')}}>
                              <Text
                                ellipsizeMode={'tail'}
                                numberOfLines={100}
                                style={{flexWrap: 'wrap'}}>
                                {data.CONTENTS}
                              </Text>
                            </View>
                          </View>
                        </View>
                        {Number(data.MEMBER_SEQ) == Number(MEMBER_SEQ) ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                            }}>
                            <TouchableOpacity
                              style={styles.commentBtn}
                              onPress={() => {
                                this.setState({
                                  clickCommentUpdate: true,
                                  memoUpdate: data.CONTENTS,
                                  selectedCOM_SEQ: data.COM_SEQ,
                                });
                              }}>
                              <Ionicons
                                name="ios-settings"
                                size={14}
                                color={'#AACE36'}
                                style={{paddingTop: 1, marginRight: 2}}
                              />
                              <Text style={{color: '#AACE36', fontSize: 14}}>
                                수정
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                ...styles.commentBtn,
                                marginLeft: 8,
                                borderColor: '#B91C1B',
                              }}
                              onPress={() => {
                                this.del(data.COM_SEQ);
                              }}>
                              <MaterialCommunityIcons
                                name="delete-empty"
                                size={14}
                                color={'#B91C1B'}
                              />
                              <Text style={{color: '#B91C1B', fontSize: 14}}>
                                삭제
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
            </View>
          ) } */}

          {/* {Number(data.ME) == Number(data.MEMBER_SEQ) && (
            <View style={{marginTop: 20}}>
              <TouchableOpacity
                style={{
                  width: wp('90%'),
                  height: hp('7%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#642A8C',
                }}
                onPress={() => {
                  this.props.navigation.navigate('ChecklistShareUpdateScreen', {
                    data,
                    TITLE,
                  });
                }}>
                <Text style={{color: 'white', fontSize: 16}}>
                  {this.props.navigation.state.params.TITLE} 수정하기
                </Text>
              </TouchableOpacity>
              <View style={{height: 70}} />
            </View>
          ) } */}
        </Container>
      </ScrollView>

      {/* {clickComment && ( // 등록
         <KeyboardAvoidingView
           behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
           keyboardVerticalOffset={0}
           style={
             Platform.OS === 'ios'
               ? {backgroundColor: '#cfd3d6'}
               : {backgroundColor: '#dddee2'}
           }
           enabled>
           <View style={styles.commentInsert}>
             <TextInput
               autoFocus={true}
               style={styles.memoTIText}
               onChangeText={(text) => this.setState({memoInput: text})}
               value={this.state.memoInput}
               placeholder={'댓글을 입력하세요.'}
               placeholderTextColor={'#CCCCCC'}
               onBlur={() => {
                 this.setState({
                   memoInput: '',
                   clickComment: false,
                 });
               }}
               multiline={true}
             />
             <TouchableOpacity
               onPress={() => {
                 this.regist();
               }}
               style={{
                 alignItems: 'center',
                 justifyContent: 'center',
                 width: wp('8%'),
                 height: wp('8%'),
                 borderRadius: 20,
                 backgroundColor: '#642A8C',
               }}>
               <MaterialIcons
                 name="keyboard-arrow-right"
                 size={26}
                 color={'white'}
                 style={{marginLeft: 2, marginTop: 2}}
               />
             </TouchableOpacity>
           </View>
         </KeyboardAvoidingView>
       ) } */}

      {/* {clickCommentUpdate && ( // 수정
         <KeyboardAvoidingView
           behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
           keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
           style={
             Platform.OS === 'ios'
               ? {backgroundColor: '#cfd3d6'}
               : {backgroundColor: '#dddee2'}
           }
           enabled>
           <View style={styles.commentInsert}>
             <TextInput
               autoFocus={true}
               style={styles.memoTIText}
               onChangeText={(text) => this.setState({memoUpdate: text})}
               value={memoUpdate}
               placeholder={'댓글을 입력하세요.'}
               placeholderTextColor={'#CCCCCC'}
               onBlur={() => {
                 this.setState({
                   memoUpdate: '',
                   clickCommentUpdate: false,
                 });
               }}
               multiline={true}
             />
             <TouchableOpacity
               onPress={() => {
                 this.edit();
               }}
               style={{
                 alignItems: 'center',
                 justifyContent: 'center',
                 width: wp('8%'),
                 height: wp('8%'),
                 borderRadius: 20,
                 backgroundColor: '#642A8C',
               }}>
               <MaterialIcons
                 name="keyboard-arrow-right"
                 size={26}
                 color={'white'}
                 style={{marginLeft: 2, marginTop: 2}}
               />
             </TouchableOpacity>
           </View>
           </KeyboardAvoidingView>
       ) } */}
    </BackGround>
  );
};
