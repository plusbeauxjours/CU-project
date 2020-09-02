import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import moment from 'moment';
import DatePickerModal from 'react-native-modal-datetime-picker';

import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import {HelpCircleIcon} from '../../../../constants/Icons';
import AddShelfLifeScreenCard from './AddShelfLifeScreenCard';
import RoundBtn from '../../../../components/Btn/RoundBtn';

interface ITextInput {
  isBefore: boolean;
}
const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text`
  font-size: 16px;
`;
const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  margin-top: 20px;
  padding: 20px;
  align-items: center;
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

const ListContasiner = styled(TextContainer)`
  justify-content: space-between;
`;

const TitleText = styled.Text`
  font-size: 20px;
  color: #642a8c;
  font-weight: bold;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const GreyText = styled.Text`
  color: #aaa;
`;

const TextInputContainer = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextInputBox = styled.View`
  margin-top: 15px;
`;

const TextInput = styled.TextInput<ITextInput>`
  border-color: ${(props) => (props.isBefore ? '#ddd' : '#642a8c')};
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  border-width: 1px;
  width: ${wp('50%')}px;
  min-height: 40px;
`;

const DateTouchable = styled.TouchableOpacity<ITextInput>`
  border-width: 1px;
  border-color: ${(props) => (props.isBefore ? '#ddd' : '#642a8c')};
  justify-content: center;
  align-items: center;
  text-align: center;
  width: ${wp('50%')}px;
  height: 30px;
`;

const DateText = styled.Text`
  color: #642a8c;
`;

export default ({
  addFn,
  explainModal,
  deleteBuffer,
  submitFn,
  list,
  shelfLifeName,
  setShelfLifeName,
  shelfLifeMemo,
  setShelfLifeMemo,
  shelfLifeDate,
  setShelfLifeDate,
  isDateModalVisible,
  setIsDateModalVisible,
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
              <Row
                onPress={() => {
                  explainModal(
                    '',
                    '상품을 등록하시면 직원이 출근 시 유통기한 도래 상품을 알려드립니다.\n\nEx)금일(6/23) 유통기한 경과 상품이 있습니다. (치토스 외 4개)\n유통기한 캘린더를 통해 상품을 확인해주시고, 진열대에서 철수해주세요.',
                  );
                }}>
                <TitleText>상품정보</TitleText>
                <HelpCircleIcon />
              </Row>
            </TextContainer>
            <TextInputBox>
              <TextInputContainer>
                <Row>
                  <Text>상품명 </Text>
                  <Text style={{color: '#B91C1B'}}>*</Text>
                </Row>

                <TextInput
                  isBefore={shelfLifeName == ''}
                  placeholder="상품명 입력"
                  selectionColor="#6428AC"
                  placeholderTextColor="#CCC"
                  onChangeText={(text) => setShelfLifeName(text)}
                  value={shelfLifeName}
                  maxLength={15}
                />
              </TextInputContainer>
              <TextInputContainer>
                <Row>
                  <Text>기한 </Text>
                  <Text style={{color: '#B91C1B'}}>*</Text>
                </Row>
                <DateTouchable
                  isBefore={shelfLifeDate == ''}
                  onPress={() => setIsDateModalVisible(true)}>
                  <DateText>{shelfLifeDate}</DateText>
                </DateTouchable>
                <DatePickerModal
                  headerTextIOS={'날짜를 선택하세요.'}
                  cancelTextIOS={'취소'}
                  confirmTextIOS={'선택'}
                  isVisible={isDateModalVisible}
                  mode="date"
                  locale="ko_KRus_EN"
                  onConfirm={(date) => {
                    setShelfLifeDate(moment(date).format('YYYY-MM-DD')),
                      setIsDateModalVisible(false);
                  }}
                  onCancel={() => setIsDateModalVisible(false)}
                  display="default"
                />
              </TextInputContainer>
              <TextInputContainer>
                <Row>
                  <Text>메모</Text>
                </Row>
                <TextInput
                  isBefore={shelfLifeMemo == ''}
                  placeholder="메모 입력"
                  selectionColor="#6428AC"
                  placeholderTextColor="#CCC"
                  onChangeText={(text) => setShelfLifeMemo(text)}
                  value={shelfLifeMemo}
                  multiline={true}
                />
              </TextInputContainer>
            </TextInputBox>
            <RoundBtn
              text={'목록에 추가하기'}
              onPress={() => addFn()}
              isRegisted={true}
            />
          </Section>
          <Section>
            <ListContasiner>
              <TitleText>상품목록</TitleText>
              <TitleText>{list.length}</TitleText>
            </ListContasiner>
            {list && list.length !== 0 && (
              <GreyText>
                상품을 클릭하여 리스트에서 삭제할 수 있습니다.
              </GreyText>
            )}
            {list &&
              list.length !== 0 &&
              list.map((data, index) => {
                return (
                  <Touchable
                    style={{marginTop: 20}}
                    key={index}
                    onPress={() =>
                      deleteBuffer(data.shelfLifeNAME, data.shelfLifeDATE)
                    }>
                    <AddShelfLifeScreenCard
                      NAME={data.shelfLifeNAME}
                      DATE={data.shelfLifeDATE}
                      MEMO={data.shelfLifeMEMO}
                    />
                  </Touchable>
                );
              })}
          </Section>
          <SubmitBtn
            text={'상품 등록완료'}
            isRegisted={list && list.length !== 0}
            onPress={() => submitFn()}
          />
        </Container>
      </ScrollView>
    </BackGround>
  );
};
