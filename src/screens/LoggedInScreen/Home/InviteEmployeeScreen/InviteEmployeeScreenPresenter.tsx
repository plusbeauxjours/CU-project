import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  PersonAddIcon,
  HelpCircleIcon,
  SearchIcon,
} from '../../../../constants/Icons';
import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import InviteEmployeeScreenCard from './InviteEmployeeScreenCard';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const Text = styled.Text``;

const Line = styled.View`
  height: 1px;
  margin: 0 30px;
  background-color: #f2f2f2;
`;

const Section = styled.View`
  width: 100%;
  padding-bottom: 10px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const TextContainer = styled.View`
  margin-top: 25px;
  margin-bottom: 15px;
  padding: 0 30px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const TitleText = styled.Text`
  font-size: 20px;
  color: #642a8c;
  font-weight: bold;
`;

const TextInput = styled.TextInput`
  width: 100%;
  padding: 15px 0;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

const Touchable = styled.TouchableOpacity``;

const Refer = styled.View`
  margin: 12px;
  justify-content: center;
`;

const ReferText = styled.Text`
  font-size: 13px;
  color: #b5b5b5;
`;

const ContactText = styled.Text`
  color: #642a8c;
`;

const Contact = styled.TouchableOpacity`
  padding: 15px 0;
  width: 100%;
  border-radius: 30px;
  border-width: 1px;
  border-color: #642a8c;
  align-items: center;
  justify-content: center;
`;

const ContactIconContainer = styled(Contact)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  padding: 5px;
`;
const Box = styled.View`
  padding: 0 30px;
  padding-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const BoxText = styled.Text`
  font-size: 15px;
  color: #7e7c7c;
`;

const NameContainer = styled.View`
  flex: 1.5;
  justify-content: center;
  align-items: center;
  border-color: #e2e2e2;
  border-width: 1px;
  background-color: white;
  margin-right: 10px;
`;

const PhoneContainer = styled(NameContainer)`
  flex: 2.5;
  width: 120px;
  margin-right: 0;
`;

const ModalContainer = styled.View`
  height: ${hp('50%')};
  background-color: white;
`;

const SearchBox = styled.View`
  padding: 20px;
  position: relative;
`;

const SearchIconContainer = styled.View`
  position: absolute;
  top: 32px;
  right: 40px;
`;

const SearchInput = styled.TextInput`
  border-width: 1px;
  border-color: #642a8c;
  border-radius: 30px;
  padding-left: 20px;
  padding-top: 2px;
  color: #333;
  height: 50px;
  background-color: white;
`;

export default ({
  explainModal,
  setName,
  name,
  setPhone,
  phone,
  choice,
  submitFn,
  addFn,
  getContacts,
  deleteBuffer,
  isModalVisible,
  setIsModalVisible,
  searchName,
  search,
  setSearch,
  result,
  onPress,
}) => {
  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <TextContainer>
              <TitleText>(STEP1)</TitleText>
              <TitleText style={{color: '#000'}}> 직원 초대하기</TitleText>
            </TextContainer>
            <Box>
              <Row
                onPress={() => {
                  explainModal(
                    '',
                    '방법1, 방법2 중 편한 방법을 선택하여 직원을 초대해 보세요.\n\n[추가하기] 버튼을 눌러 여러명의 직원을 한번에 초대할 수 있습니다.',
                  );
                }}>
                <BoxText>(방법1) 연락처로 추가하기</BoxText>
                <HelpCircleIcon />
              </Row>
              <ContactIconContainer onPress={() => getContacts()}>
                <PersonAddIcon />
              </ContactIconContainer>
            </Box>
            <Line />
            <TextContainer>
              <BoxText>(방법2) 직접 입력해서 추가하기</BoxText>
            </TextContainer>
            <Box>
              <NameContainer>
                <TextInput
                  placeholder={'홍길동'}
                  selectionColor={'#642A8c'}
                  placeholderTextColor={'#CCCCCC'}
                  onChangeText={(text) => {
                    setName(text);
                  }}
                  value={name}
                  maxLength={6}
                />
              </NameContainer>
              <PhoneContainer>
                <TextInput
                  placeholder={'01012345678'}
                  selectionColor={'#642A8c'}
                  placeholderTextColor={'#CCCCCC'}
                  onChangeText={(text) => {
                    setPhone(text);
                  }}
                  value={phone}
                  maxLength={11}
                  keyboardType={'number-pad'}
                />
              </PhoneContainer>
            </Box>
            <TextContainer>
              <Contact onPress={() => addFn()}>
                <ContactText>초대할 직원목록에 추가</ContactText>
              </Contact>
            </TextContainer>
          </Section>
          <Section>
            <TextContainer>
              <TitleText>(STEP2)</TitleText>
              <TitleText style={{color: '#000'}}> 초대할 직원목록</TitleText>
            </TextContainer>
            <Refer>
              <ReferText>
                &nbsp; * 카카오톡을 통하여 직원에게 초대 메시지를 발송합니다.
                (카카오톡 미설치 시 문자 발송)
              </ReferText>
            </Refer>
            {choice?.map((data, index) => (
              <Touchable
                key={index}
                onPress={() => {
                  deleteBuffer(data.key);
                }}>
                <InviteEmployeeScreenCard
                  name={data.NAME}
                  phone={data.phone}
                  isSearched={false}
                />
              </Touchable>
            ))}
          </Section>
          <SubmitBtn
            text={'직원초대완료'}
            isRegisted={choice && choice.length !== 0}
            onPress={() => submitFn()}
          />
        </Container>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{margin: 0, justifyContent: 'flex-end'}}
        avoidKeyboard={true}>
        <ModalContainer>
          <SearchBox>
            <SearchInput
              placeholder="이름으로 검색 ex) 홍길동, ㅎㄱㄷ"
              placeholderTextColor={'#999'}
              onChangeText={(text) => searchName(text)}
              value={search}
            />
            <SearchIconContainer>
              <SearchIcon />
            </SearchIconContainer>
          </SearchBox>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}>
            {result
              .filter((info) => info.phoneNumbers)
              .map((data, index) => {
                if (data.phoneNumbers[0].number) {
                  return (
                    <Touchable
                      key={index}
                      onPress={() => {
                        onPress(data);
                      }}>
                      <InviteEmployeeScreenCard
                        name={data.name}
                        phone={
                          data.phoneNumbers
                            ? data.phoneNumbers[0].number.replace(/\D/g, '')
                            : 'No Number'
                        }
                        isSearched={true}
                      />
                    </Touchable>
                  );
                } else {
                  return null;
                }
              })}
          </ScrollView>
          <SubmitBtn
            text={'완료'}
            isRegisted={true}
            onPress={() => {
              setIsModalVisible(false);
              setSearch('');
            }}
          />
        </ModalContainer>
      </Modal>
    </BackGround>
  );
};
