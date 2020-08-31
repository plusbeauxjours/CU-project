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
  height: 100%;
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
  height: 60px;
  width: ${(props) => (props.color === '#642A8C' ? wp('80%') : wp('20%'))}px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
`;

const HalfBtnLeft = styled.TouchableOpacity<IWarning>`
  height: 60px;
  width: ${wp('50%')}px;
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
  flex: 1;
  height: 60px;
  width: ${hp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: #642a8c;
`;
const WhiteText = styled.Text`
  font-size: 16px;
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
      <Title>{alert?.title}</Title>
      <Content>{alert?.content}</Content>
      <Attach>{alert?.attach}</Attach>
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
      {console.log('alert', alert)}
      {alert.alertType == 'explain' ? (
        <WhiteBox>
          <BackGround>
            <TextBox alert={alert} />
          </BackGround>
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
          <BackGround>
            <TextBox alert={alert} />
          </BackGround>
          {alert.alertType === 'confirm' ? (
            <Row>
              <HalfBtnLeft warning={alert.warning} onPress={() => onPress()}>
                <HalfTextLeft>{alert.cancelButtonText}</HalfTextLeft>
              </HalfBtnLeft>
              <HalfBtnRight warning={alert.warning} onPress={() => onPress()}>
                <HalfTextRight warning={alert.warning}>
                  {alert.okButtonText}
                </HalfTextRight>
              </HalfBtnRight>
            </Row>
          ) : (
            <Row>
              <BarBtn onPress={() => onPress()}>
                {console.log('okookokok', alert.okButtonText)}
                <WhiteText>{alert.okButtonText}</WhiteText>
              </BarBtn>
            </Row>
          )}
        </WhiteBox>
      )}
    </Modal>
  );
};

// <>
//   {
//     alert.alertType == 'explain' ? (
//         <View
//           style={{
//             minHeight: 200,
//             justifyContent: 'center',
//             paddingVertical: hp('5%'),
//           }}>
//           <View
//             style={{
//               alignItems: 'center',
//               justifyContent: 'center',
//               paddingHorizontal: 20,
//             }}>
//             {alert.title ? (
//               <>
//                 <Text style={{fontSize: 24, color: '#642A8C'}}>
//                   {alert.title}
//                 </Text>
//               </>
//             ) : null}
//             {alert.content ? (
//               <>
//                 {alert.title ? <View style={{height: 30}} /> : null}
//                 <Text style={{fontSize: 15, color: '#707070'}}>
//                   {alert.content}
//                 </Text>
//               </>
//             ) : null}
//             {alert.attach ? (
//               <>
//                 <Text style={{marginTop: 20, fontSize: 12, color: '#777'}}>
//                   {alert.attach}
//                 </Text>
//               </>
//             ) : null}
//           </View>
//         </View>
//         <View style={{flexDirection: 'row'}}>
//           <TouchableOpacity
//             style={{
//               height: hp('7%'),
//               width: wp('80%'),
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundColor: '#642A8C',
//             }}
//             onPress={() => {
//               this.props.setAlertVisible(false);

//               if (alert.okCallback) {
//                 alert.okCallback();
//               }
//             }}>
//             <Text style={{fontSize: 16, color: 'white'}}>
//               {alert.okButtonText}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               height: hp('7%'),
//               width: wp('20%'),
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundColor: '#AACE36',
//             }}
//             onPress={() => {
//               this.setState({allHelpTextView: !this.state.allHelpTextView});
//             }}>
//             <Text style={{fontSize: 14, color: 'white'}}>도움말</Text>
//             <Text style={{fontSize: 14, color: 'white'}}>전체보기</Text>
//           </TouchableOpacity>
//         </View>
//     ) : (
//       <>
//         {/* basic alert */}
//         <View style={{height: 280, backgroundColor: 'white'}}>
//           <View style={{flex: 1}}>
//             <View
//               style={{
//                 flex: 1,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 paddingHorizontal: 20,
//               }}>
//               {alert.title ? (
//                 <>
//                   <Text style={{fontSize: 24, color: '#642A8C'}}>
//                     {alert.title}
//                   </Text>
//                 </>
//               ) : null}
//               {alert.content ? (
//                 <>
//                   {alert.title ? <View style={{height: 30}} /> : null}
//                   <Text style={{fontSize: 15, color: '#707070'}}>
//                     {alert.content}
//                   </Text>
//                 </>
//               ) : null}
//               {alert.attach ? (
//                 <>
//                   <Text style={{marginTop: 20, fontSize: 12, color: '#777'}}>
//                     {alert.attach}
//                   </Text>
//                 </>
//               ) : null}
//             </View>
//           </View>
//           <View style={{flexDirection: 'row'}}>
//             {alert.alertType === 'confirm' ? (
//               <>
//                 <TouchableOpacity
//                   style={{
//                     height: hp('7%'),
//                     width: wp('50%'),
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     // backgroundColor: '#642A8C',
//                     borderTopWidth: alert.warning == 'yes' ? 1 : 0,
//                     borderColor: '#bbb',
//                   }}
//                   onPress={() => {
//                     this.props.setAlertVisible(false);

//                     if (alert.cancelCallback) {
//                       alert.cancelCallback();
//                     }
//                   }}>
//                   <Text style={{fontSize: 18, color: '#642A8C'}}>
//                     {alert.cancelButtonText}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={{
//                     height: hp('7%'),
//                     width: wp('50%'),
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     backgroundColor:
//                       alert.warning == 'yes' ? '#fff' : '#642A8C',
//                     borderTopWidth: alert.warning == 'yes' ? 1 : 0,
//                     borderLeftWidth: alert.warning == 'yes' ? 1 : 0,
//                     borderColor: '#bbb',
//                   }}
//                   onPress={() => {
//                     this.props.setAlertVisible(false);

//                     if (alert.okCallback) {
//                       alert.okCallback();
//                     }
//                   }}>
//                   <Text
//                     style={
//                       alert.warning == 'yes'
//                         ? {color: '#B91C1B', fontSize: 18}
//                         : {color: '#fff', fontSize: 18}
//                     }>
//                     {alert.okButtonText}
//                   </Text>
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <TouchableOpacity
//                 style={{
//                   height: hp('7%'),
//                   width: wp('100%'),
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: '#642A8C',
//                 }}
//                 onPress={() => {
//                   if (alert.close !== '1') {
//                     this.props.setAlertVisible(false);
//                   }
//                   if (alert.okCallback) {
//                     alert.okCallback();
//                   }
//                 }}>
//                 <Text style={{fontSize: 16, color: 'white'}}>
//                   {alert.okButtonText}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </>
//     )

//   )}
// </>;
