import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {EllipseIcon, ForwardIcon} from '../../../../constants/Icons';

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
`;
const Touchable = styled.TouchableOpacity``;

const ArrowBox = styled.View`
  width: 20px;
  align-items: center;
  justify-content: center;
`;

const ContentBox = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StateFont = styled.Text`
  font-size: 13px;
  color: #999;
  margin-left: 5px;
`;

const CheckpointText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin: 5px 0;
`;

const GreyText = styled.Text`
  padding-left: 10px;
  color: #7e7c7c;
`;
const CheckpointBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 7px;
`;

const ChecktimeText = styled.Text`
  font-size: 13px;
  color: #642a8c;
`;

export default ({
  key,
  QR_SEQ,
  STORE,
  storeID,
  checkID,
  csID,
  checkpoint,
  checktime,
  checklist,
  check,
  checkEMP,
  checkEMPTime,
  checkSelectedEmp,
  checkType,
  checkSelectedEmpName,
  memo,
  PHOTO_CHECK,
  IMAGE_LIST,
  DATE,
}) => {
  const navigation = useNavigation();
  const [willCheck, setWillCheck] = useState<boolean>(false);
  const [checkYes, setCheckYes] = useState<boolean>(false);
  const [checkNo, setCheckNo] = useState<boolean>(false);

  let scan = '0';
  let done = false;
  if (moment(DATE) == moment()) {
    done = true;
  } else {
    if (!(moment(DATE) > moment())) {
      done = true;
    }
  }

  const gotoCkecklistDetail = () => {
    if (csID) {
      return navigation.navigate('ChecklistDetailScreen', {
        checkType: '0', // 미체크
        checkID,
        DATE,
      });
    } else {
      return navigation.navigate('ChecklistSpecificationScreen', {
        checkType: '1', // 체크됨
        STORE,
        checkID,
        storeID,
        csID,
        checkpoint,
        checklist,
        checktime,
        check,
        checkEMP,
        checkEMPTime,
        memo,
        scan,
        PHOTO_CHECK,
        IMAGE_LIST,
        checkSelectedEmp,
        checkSelectedEmpName,
        register: false,
        DATE,
      });
    }
  };

  const checkState = (check) => {
    if (check !== null) {
      check = check.split('@');
      for (var i = 0; i < check.length / 2; i++) {
        var temp = 2 * i + 1;
        if (check[temp] === '1') {
          setCheckYes(true);
        }
        if (check[temp] === '2') {
          setCheckNo(true);
        }
      }
    } else {
      setWillCheck(true);
    }
  };

  useEffect(() => {
    checkState(check);
  }, []);
  useEffect(() => {
    checkState(check);
  }, [check]);

  return (
    <Touchable
      key={key}
      activeOpacity={1}
      onPress={() => gotoCkecklistDetail()}>
      <Container>
        <ContentBox>
          <Row
            style={{
              justifyContent: 'flex-end',
            }}>
            {done && (
              <Row style={{justifyContent: 'flex-end'}}>
                {willCheck && (
                  <Row>
                    <EllipseIcon color={'#0D4F8A'} />
                    <StateFont>미체크</StateFont>
                  </Row>
                )}
                {!checkNo && csID && (
                  <Row>
                    <EllipseIcon color={'#AACE36'} />
                    <StateFont>체크정상</StateFont>
                  </Row>
                )}
                {checkNo && csID && (
                  <Row>
                    <EllipseIcon color={'#984B19'} />
                    <StateFont>체크이상</StateFont>
                  </Row>
                )}
                {memo && csID && (
                  <Row>
                    <EllipseIcon color={'#FEBF40'} />
                    <StateFont>특이사항</StateFont>
                  </Row>
                )}
              </Row>
            )}
          </Row>
          <Row>
            <CheckpointText>{checkpoint}</CheckpointText>
          </Row>
          {checkEMP ? ( // 체크한 상태
            <>
              <CheckpointBox>
                <ChecktimeText>체크시간</ChecktimeText>
                <GreyText>{checkEMPTime}</GreyText>
              </CheckpointBox>
              {checkSelectedEmp ? (
                <CheckpointBox>
                  <ChecktimeText>담당직원</ChecktimeText>
                  <GreyText numberOfLines={1} ellipsizeMode="tail">
                    {checkSelectedEmpName.split('@').join(' / ')}
                  </GreyText>
                </CheckpointBox>
              ) : (
                <CheckpointBox>
                  <ChecktimeText>체크직원</ChecktimeText>
                  <GreyText>{checkEMP}</GreyText>
                </CheckpointBox>
              )}
            </>
          ) : (
            <>
              <CheckpointBox>
                <ChecktimeText>체크예정시간</ChecktimeText>
                <GreyText>{checktime === '' ? '미사용' : checktime}</GreyText>
              </CheckpointBox>
              {checkSelectedEmp && (
                <CheckpointBox>
                  <ChecktimeText>담당직원</ChecktimeText>
                  <GreyText numberOfLines={1} ellipsizeMode="tail">
                    {checkSelectedEmpName.split('@').join(' / ')}
                  </GreyText>
                </CheckpointBox>
              )}
            </>
          )}
        </ContentBox>
        <ArrowBox>
          <ForwardIcon size={22} />
        </ArrowBox>
      </Container>
    </Touchable>
  );
};
