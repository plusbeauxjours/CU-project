import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

import {setAlertVisible} from '../redux/alertSlice';

interface IColor {
  color: string;
}
interface IWarning {
  warning: string;
}

const BackGround = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const WhiteBox = styled.View`
  height: 280px;
  background-color: white;
`;

const Box = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #642a8c;
  margin-bottom: 30px;
`;

const Content = styled.Text`
  font-size: 15px;
  color: #707070;
`;

const Attach = styled.Text`
  margin-top: 20px;
  font-size: 12px;
  color: #777;
`;

const WithHelpBtn = styled.TouchableOpacity<IColor>`
  height: ${hp('7%')};
  width: ${(props) => (props.color === '#642A8C' ? wp('80%') : wp('20%'))};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
`;

const HalfBtnLeft = styled.TouchableOpacity<IWarning>`
  height: ${hp('7%')};
  width: ${hp('50%')};
  align-items: center;
  justify-content: center;
  border-color: #bbb;
  border-top-width: ${(props) => (props.warning == 'yes' ? '1px' : 0)};
`;

const HalfTextLeft = styled.Text`
  font-size: 18px;
  color: #642a8c;
`;

const HalfBtnRight = styled(HalfBtnLeft)<IWarning>`
  background-color: ${(props) => (props.warning == 'yes' ? '#fff' : '#642A8C')};
  border-left-width: ${(props) => (props.warning == 'yes' ? '1px' : 0)};
`;

const HalfTextRight = styled.Text<IWarning>`
  font-size: 18px;
  color: ${(props) => (props.warning == 'yes' ? '#B91C1B' : '#fff')};
`;

const BarBtn = styled.TouchableOpacity`
  height: ${hp('7%')};
  width: ${hp('100%')};
  align-items: center;
  justify-content: center;
  background-color: #642a8c;
`;
const WhiteText = styled.Text`
  font-size: 14px;
  color: white;
`;

const Row = styled.View`
  flex-direction: row;
`;

export default ({alert}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const TextBox = ({alert}) => (
    <Box>
      {alert?.title && <Title>{alert?.title}</Title>}
      {alert?.content && <Content>{alert?.content}</Content>}
      {alert?.attach && <Attach>{alert?.attach}</Attach>}
    </Box>
  );

  const onPressExplain = () => {
    dispatch(setAlertVisible(false));
    navigation.navigate('HelpModalScreen');
  };

  const onPress = () => {
    dispatch(setAlertVisible(false));
    alert?.okCallback && alert.okCallback();
  };

  return (
    <Modal
      onBackdropPress={() => {
        dispatch(setAlertVisible(false));
      }}
      style={{margin: 0, justifyContent: 'flex-end'}}
      isVisible={alert.visible}>
      {alert.alertType == 'explain' ? (
        <WhiteBox>
          {/* {alert && <TextBox alert={alert} />} */}
          <Row>
            <WithHelpBtn color={'#642A8C'} onPress={() => onPress()}>
              <WhiteText>{alert.okButtonText}</WhiteText>
            </WithHelpBtn>
            <WithHelpBtn color={'#AACE36'} onPress={() => onPressExplain()}>
              <WhiteText>도움말</WhiteText>
              <WhiteText>전체보기</WhiteText>
            </WithHelpBtn>
          </Row>
        </WhiteBox>
      ) : (
        <WhiteBox>
          {/* <BackGround>{alert && <TextBox alert={alert} />}</BackGround> */}
          <Row>
            {alert.alertType === 'confirm' ? (
              <>
                <HalfBtnLeft warning={alert.warning} onPress={() => onPress()}>
                  <HalfTextLeft>{alert.cancelButtonText}</HalfTextLeft>
                </HalfBtnLeft>
                <HalfBtnRight warning={alert.warning} onPress={() => onPress()}>
                  <HalfTextRight warning={alert.warning}>
                    {alert.okButtonText}
                  </HalfTextRight>
                </HalfBtnRight>
              </>
            ) : (
              <BarBtn onPress={() => onPress()}>
                <WhiteText>{alert.okButtonText}</WhiteText>
              </BarBtn>
            )}
          </Row>
        </WhiteBox>
      )}
    </Modal>
  );
};
