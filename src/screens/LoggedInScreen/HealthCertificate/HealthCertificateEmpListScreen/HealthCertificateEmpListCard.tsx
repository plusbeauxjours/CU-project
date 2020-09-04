import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import moment from 'moment';

import {EllipseIcon} from '../../../../constants/Icons';

interface IText {
  color: string;
}

const AddressBox = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;
const AddressText = styled.Text<IText>`
  font-size: 13px;
  color: ${(props) => props.color};
`;
const Touchable = styled.TouchableOpacity``;
const IconContainer = styled.View`
  width: 20px;
  align-items: center;
`;

const NameText = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

const Container = styled.View`
  width: ${wp('100%')}px;
  padding: 20px 0;
  background-color: white;
  flex-direction: row;
  margin-bottom: 20px;
`;
const ContainerBox = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
`;

export default ({
  key,
  data,
  gotoHealthCertificateEmpDetail,
  gotoHealthCertificateEmpForm,
}) => {
  const dday = moment(data?.PUSH_DAY).diff(moment(), 'days');
  if (data.RESULT_DATE) {
    return (
      <Touchable
        key={key}
        activeOpacity={1}
        onPress={() => gotoHealthCertificateEmpDetail(data)}>
        <Container>
          <ContainerBox>
            <NameText>
              {data?.NAME}[{data?.IS_MANAGER === '1' ? '점장' : '스태프'}]
            </NameText>
            <AddressBox>
              <IconContainer>
                {data?.RESULT_DATE && dday > 0 ? (
                  <EllipseIcon color={'#642A8C'} />
                ) : (
                  <EllipseIcon color={'#CE0505'} />
                )}
              </IconContainer>
              {data?.RESULT_DATE ? (
                <AddressText
                  color={dday <= 0 ? '#CE0505' : '#642A8C'}
                  style={dday <= 0 && {textDecorationLine: 'underline'}}>
                  검진일 : {data?.RESULT_DATE} (갱신 D{dday <= 0 ? '+' : '-'}
                  {Math.abs(Math.floor(dday))})
                </AddressText>
              ) : (
                <AddressText
                  color={'#CE0505'}
                  style={{textDecorationLine: 'underline'}}>
                  보건증 미등록
                </AddressText>
              )}
            </AddressBox>
          </ContainerBox>
        </Container>
      </Touchable>
    );
  } else {
    return (
      <Touchable
        key={key}
        activeOpacity={1}
        onPress={() =>
          gotoHealthCertificateEmpForm(
            data.NAME,
            data.EMP_SEQ,
            data.RESULT_COUNT,
            data.IMG_LIST,
          )
        }>
        <Container>
          <ContainerBox>
            <NameText>
              {data?.NAME}[{data?.IS_MANAGER == '1' ? '점장' : '스태프'}]
            </NameText>
            <AddressBox>
              <IconContainer>
                {data?.RESULT_DATE ? (
                  <EllipseIcon color={'#642A8C'} />
                ) : (
                  <EllipseIcon color={'#CE0505'} />
                )}
              </IconContainer>
              {data?.RESULT_DATE ? (
                <AddressText
                  color={dday <= 0 ? '#CE0505' : '#642A8C'}
                  style={dday <= 0 && {textDecorationLine: 'underline'}}>
                  검진일 : {data?.RESULT_DATE}
                </AddressText>
              ) : (
                <AddressText
                  color={'#CE0505'}
                  style={{textDecorationLine: 'underline'}}>
                  보건증 미등록
                </AddressText>
              )}
            </AddressBox>
          </ContainerBox>
        </Container>
      </Touchable>
    );
  }
};
