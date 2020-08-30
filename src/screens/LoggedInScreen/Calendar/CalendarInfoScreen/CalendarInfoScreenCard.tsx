import React from 'react';
import api from '../../../../constants/LoggedInApi';
import {useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {EllipseIcon} from '../../../../constants/Icons';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Text = styled.Text``;

const NameText = styled.Text`
  font-size: 15px;
  color: #333;
`;

const RowFlexEnd = styled(Row)`
  justify-content: flex-end;
`;

const RowSpace = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;

const SelectBox = styled(RowSpace)`
  margin-top: 10;
  margin-bottom: 20px;
`;

const SelectBoxTouchable = styled.TouchableOpacity`
  height: 30px;
  width: ${wp('28%')}px;
  border-width: 1px;
  border-radius: 10px;
  border-color: #642a8c;
  justify-content: center;
  align-items: center;
`;

const BoxText = styled.Text`
  color: #642a8c;
  font-size: 12px;
`;

const Container = styled.View`
  width: ${wp('100%')};
  background-color: white;
  border-color: #dedede;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  height: 30px;
  width: 30px;
  border-radius: 50px;
  border-width: 1px;
  border-color: #ccc;
`;

const ContentBox = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: stretch;
`;

export default ({
  index,
  SCH_ID,
  VACATION,
  TYPE,
  STORE_SEQ,
  NAME,
  date,
  image,
  ICON,
  nowork,
  workoff,
  working,
  alear,
  jigark,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const confirmModal = () => {
    const params = {
      type: 'confirm',
      title: '',
      content: '휴무를 취소하시겠습니까?',
      cancelButtonText: '아니요',
      okButtonText: '예',
      okCallback: () => cancelVacationFn(),
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const alertModal = () => {
    const params = {
      type: 'alert',
      title: '',
      content: '휴무를 취소하였습니다',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const cancelVacationFn = async () => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.cancelScheduleVacation({SCH_ID});
      if (data.message === 'SUCCESS') {
        alertModal();
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const ButtonGroup = () => {
    if (VACATION) {
      return (
        <SelectBox>
          <SelectBoxTouchable
            style={{width: wp('90%')}}
            onPress={() => confirmModal()}>
            <BoxText>휴무 취소</BoxText>
          </SelectBoxTouchable>
        </SelectBox>
      );
    } else {
      return (
        <SelectBox>
          <SelectBoxTouchable
            onPress={() => {
              navigation.navigate('WorkTimeScreen', {
                STORE_SEQ,
                date,
              });
            }}>
            <BoxText>근무시간 수정</BoxText>
          </SelectBoxTouchable>
          <SelectBoxTouchable
            onPress={() => {
              navigation.navigate('RealWorkTimeScreen', {
                STORE_SEQ,
                date,
              });
            }}>
            <BoxText>출퇴근시간 수정</BoxText>
          </SelectBoxTouchable>
          <SelectBoxTouchable
            onPress={() => {
              navigation.navigate('WorkDayScreen', {
                STORE_SEQ,
                date,
                addWork: TYPE == '3' && VACATION != '1' ? 'addWork' : 'schWork',
              });
            }}>
            <BoxText>기타 설정</BoxText>
          </SelectBoxTouchable>
        </SelectBox>
      );
    }
  };

  return (
    <Container index={index}>
      <ContentBox>
        <RowSpace>
          <NameText>{NAME}</NameText>
          {VACATION == '1' && (
            <Row>
              <EllipseIcon color={'#325CBE'} />
              <Text>휴무</Text>
            </Row>
          )}
          {ICON == '1' && VACATION != '1' && (
            <Row>
              <EllipseIcon color={'#23AF3A'} />
              <Text>출근예정</Text>
            </Row>
          )}
          {TYPE == '3' && VACATION != '1' && (
            <Row>
              <EllipseIcon color={'#325CBE'} />
              <Text>추가일정</Text>
            </Row>
          )}
          {nowork == '1' && (
            <Row>
              <EllipseIcon color={'#B91C1B'} />
              <Text>결근</Text>
            </Row>
          )}
          {workoff == '1' && (
            <Row>
              <EllipseIcon color={'#8F8F8F'} />
              <Text>퇴근</Text>
            </Row>
          )}
          {working == '1' && (
            <Row>
              <EllipseIcon color={'#23AF3A'} />
              <Text>근무중</Text>
            </Row>
          )}
          {alear == '1' && (
            <Row>
              <EllipseIcon color={'#E8B12F'} />
              <Text>조퇴</Text>
            </Row>
          )}
          {jigark == '1' && (
            <Row>
              <EllipseIcon color={'#E8B12F'} />
              <Text>지각</Text>
            </Row>
          )}
        </RowSpace>
        <Row>
          <Image
            source={{
              uri: `${'http://133.186.209.113/uploads/' + image}`,
            }}
          />

          {/* <View style={styles.cntArea}>
            {CHANGE_START == null && CHANGE_END == null ? (
              <View style={styles.workTime}>
                <Text style={styles.workTitleText}>근무시간 </Text>
                <Text style={styles.workTimeText}>
                  {(ATTENDANCE_TIME || START).substring(0, 5)} ~{' '}
                  {(WORK_OFF_TIME || END).substring(0, 5)}
                </Text>
              </View>
            ) : (
              <View style={styles.workTime}>
                <Text style={styles.workTitleText}>근무시간 </Text>
                <Text style={styles.workTimeText}>
                  {(ATTENDANCE_TIME || START).substring(0, 5)} ~{' '}
                  {(WORK_OFF_TIME || END).substring(0, 5)} >{' '}
                  {CHANGE_START == null ? '' : CHANGE_START.substring(0, 5)} ~
                  {CHANGE_END == null ? '' : CHANGE_END.substring(0, 5)}
                </Text>
              </View>
            )}

            {UPDATED_START == null && UPDATED_END == null ? (
              <View style={styles.realWorkTime}>
                <Text style={styles.workTitleText}>출퇴근시간 </Text>
                <Text style={styles.workTimeText}>
                  {(START_TIME || '미출근').substring(0, 5)} ~{' '}
                  {(END_TIME || '미퇴근').substring(0, 5)}
                </Text>
              </View>
            ) : (
              <View style={styles.realWorkTime}>
                <Text style={styles.workTitleText}>출퇴근시간 </Text>
                <Text style={styles.workTimeText}>
                  {(START_TIME || '미출근').substring(0, 5)} ~{' '}
                  {(END_TIME || '미퇴근').substring(0, 5)} >{' '}
                  {(UPDATED_START || '미출근').substring(0, 5)} ~{' '}
                  {(UPDATED_END || '미퇴근').substring(0, 5)}
                </Text>
              </View>
            )}

            <View style={styles.realWorkTime}>
              <Text style={styles.workTitleText}>휴게시간 </Text>
              <Text style={styles.workTimeText}>{REST_TIME}분</Text>
            </View>
          </View> */}
        </Row>
      </ContentBox>

      <ButtonGroup />
    </Container>
  );
};
