import React, {useState, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';
import SubmitBtn from '../../../../components/Btn/SubmitBtn';

interface ITextInput {
  isBefore: boolean;
}
const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;
const ScrollView = styled.ScrollView``;
const TextInput = styled.TextInput<ITextInput>`
  padding: 3px 10px;
  border-color: ${(props) => (props.isBefore ? '#ddd' : '#642A8C')};
  align-items: center;
  border-width: 1px;
  width: ${wp('50%')};
`;
const Container = styled.View`
  margin-top: 20px;
  padding: 20px;
`;

const Section = styled.View`
  padding: 20px;
  border-radius: 20px;
  background-color: white;
`;

const Title = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Bold = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const DeleteBtn = styled.TouchableOpacity`
  padding: 10px;
  border-width: 1px;
  border-color: #b91c1b;
`;

const DeleteBtnText = styled.Text`
  color: #b91c1b;
`;

const Line = styled.View`
  margin-top: 5px;
  height: 2px;
  background-color: #ddd;
`;
const Row = styled.View`
  flex-direction: row;
`;
const InputItem = styled.View`
  padding: 10px 0;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const InputItemText = styled.Text`
  font-size: 16px;
`;

const Touchable = styled.TouchableOpacity``;

export default ({route: {params}}) => {
  const dateRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const shelfLife_SEQ = params?.shelfLife_SEQ || '';
  const [shelfLifeName, setShelfLifeName] = useState<string>(
    params?.shelfLifeName || '',
  );
  const [shelfLifeMemo, setShelfLifeMemo] = useState<string>(
    params?.shelfLifeMemo || '',
  );
  const [shelfLifeDate, setShelfLifeDate] = useState<string>(
    params?.shelfLifeDate || '',
  );
  const [date, setDate] = useState<string>('');
  const [markedDate, setMarkedDate] = useState<any>([]);
  const [shelfLifeDateModal, setShelfLifeDateModal] = useState<boolean>(false);

  const alertModal = (title, text) => {
    const params = {
      type: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteModal = (title, text) => {
    const params = {
      type: 'confirm',
      title: title,
      content: text,
      okCallback: () => {
        deleteShelfLife();
      },
      okButtonText: '삭제',
      cancelButtonText: '취소',
      warning: 'yes',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteShelfLife = async () => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.deleteShelfLifeData({shelfLife_SEQ});
      if (data.result == '1') {
        navigation.goBack();
        alertModal('', '상품을 삭제하였습니다.');
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const submit = async () => {
    if (shelfLifeName == '') {
      alertModal('', '수정할 상품명을 입력해주세요.');
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.updateShelfLifeData({
        shelfLife_SEQ,
        shelfLifeName,
        shelfLifeDate,
        shelfLifeMemo,
      });
      console.log(
        'datadatadatadatadatadatadatadatadatafasdfsadfasdf124312423',
        data,
      );
      if (data.result == '1') {
        navigation.goBack();
        alertModal('', '수정이 완료되었습니다.');
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <Title>
              <Bold>상품정보</Bold>
              <DeleteBtn
                onPress={() => {
                  deleteModal('', '등록하신 상품을 삭제하시겠습니까?');
                }}>
                <DeleteBtnText style={{color: '#B91C1B'}}>삭제</DeleteBtnText>
              </DeleteBtn>
            </Title>
            <Line />
            <InputItem>
              <Row>
                <InputItemText>상품명 </InputItemText>
                <DeleteBtnText>*</DeleteBtnText>
              </Row>
              <TextInput
                isBefore={shelfLifeName == ''}
                placeholder="상품명"
                selectionColor="#6428AC"
                placeholderTextColor="#CCC"
                onChangeText={(text) => {
                  setShelfLifeName(text);
                }}
                value={shelfLifeName}
                maxLength={15}
              />
            </InputItem>
            <InputItem>
              <Row>
                <InputItemText>기한 </InputItemText>
                <DeleteBtnText>*</DeleteBtnText>
              </Row>
              <Touchable onPress={() => setShelfLifeDateModal(true)}>
                <TextInput
                  isBefore={shelfLifeDate == ''}
                  placeholder="상품명"
                  selectionColor="#6428AC"
                  placeholderTextColor="#CCC"
                  onChangeText={(text) => {
                    setShelfLifeMemo(text);
                  }}
                  value={shelfLifeDate}
                  editable={false}>
                  <DatePicker
                    ref={dateRef}
                    showIcon={false}
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      justifyContent: 'center',
                    }}
                    date={shelfLifeDate ?? ''}
                    placeholder="기한 입력"
                    mode="date"
                    format="YYYY-MM-DD"
                    minDate="1900/01/01"
                    maxDate="9999/12/31"
                    confirmBtnText="확인"
                    cancelBtnText="취소"
                    locale="ko"
                    androidMode="spinner"
                    customStyles={{
                      dateInput: {
                        alignItems: 'center',
                        borderWidth: 0,
                      },
                      dateText: {
                        fontSize: 16,
                      },
                    }}
                    onDateChange={(date) => {
                      setShelfLifeDate(date);
                    }}
                  />
                </TextInput>
              </Touchable>
            </InputItem>
            <InputItem>
              <InputItemText>메모</InputItemText>
              <TextInput
                isBefore={shelfLifeMemo == ''}
                placeholder=""
                selectionColor="#6428AC"
                placeholderTextColor="#CCC"
                onChangeText={(text) => setShelfLifeMemo(text)}
                value={shelfLifeMemo}
                multiline={true}
              />
            </InputItem>
          </Section>
          <SubmitBtn
            text={'수정하기'}
            onPress={() => submit()}
            isRegisted={true}
          />
        </Container>
      </ScrollView>
    </BackGround>
  );
};
