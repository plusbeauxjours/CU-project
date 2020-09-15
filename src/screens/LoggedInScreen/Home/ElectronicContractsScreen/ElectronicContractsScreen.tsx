import React, {useState, useEffect} from 'react';
import {ScrollView, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {WebView} from 'react-native-webview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

import {CloseIcon} from '../../../../constants/Icons';

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const Text = styled.Text``;
const ExplainContainer = styled.View``;
const Touchable = styled.TouchableOpacity`
  padding: 10px;
`;

const ExplainTitle = styled.Text`
  color: #642a8c;
  font-size: 20px;
  font-weight: bold;
`;

const ExplainText = styled.Text`
  color: #999;
`;

const ExplainBox = styled.View`
  margin-bottom: 15px;
  width: 100px;
  justify-content: center;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const LinkBtn = styled.TouchableOpacity`
  margin-top: 20px;
  height: 70px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: #642a8c;
  border-radius: 50px;
  margin-bottom: 90px;
`;

const ModalHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  background-color: #fff;
`;

const RedText = styled.Text`
  color: red;
`;

const Column = styled.View`
  flex-direction: column;
`;

const SkipTouchable = styled.TouchableOpacity`
  height: 60px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: #642a8c;
`;

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isWebviewSpinnerVisible, setIsWebviewSpinnerVisible] = useState<
    boolean
  >(false);
  const onPress = () => {
    if (params?.from === 'ManageInviteEmployeeScreen') {
      setIsModalVisible(false);
      navigation.navigate('SetEmployeeInfoScreen', {
        data: params.data,
        from: 'ElectronicContracts',
        onRefresh: params?.onRefresh,
      });
    } else {
      setIsModalVisible(false);
    }
  };

  useEffect(() => {
    params?.from === 'ManageInviteEmployeeScreen' &&
      navigation.setOptions({headerRight: () => null});
  }, []);

  return (
    <BackGround>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingTop: '15%', paddingHorizontal: 40}}>
        <ExplainContainer>
          <ExplainBox>
            <ExplainTitle>근로기준법</ExplainTitle>
          </ExplainBox>
          <ExplainText>이제는 근로기준법에 맞는 근로계약서를</ExplainText>
          <ExplainText>자동으로 작성하세요.</ExplainText>
        </ExplainContainer>
        <WhiteSpace />
        <ExplainContainer>
          <ExplainBox>
            <ExplainTitle>전자서명</ExplainTitle>
          </ExplainBox>
          <ExplainText>
            매번 근로자를 직접 만나서 게약을 체결하기 번거롭지
          </ExplainText>
          <ExplainText>않으신가요? 이제는 전자서명으로 간편하게</ExplainText>
          <ExplainText>계약을 체결하세요.</ExplainText>
        </ExplainContainer>
        <WhiteSpace />
        <ExplainContainer>
          <ExplainBox>
            <ExplainTitle>저장,관리</ExplainTitle>
          </ExplainBox>
          <ExplainText>근로게약서 저장관리가 어려우신가요?</ExplainText>
          <ExplainText>
            이제는 근로계약서를 한 곳에서 저장하고 관리하세요.
          </ExplainText>
        </ExplainContainer>
        <WhiteSpace />
        <WhiteSpace />
        <ExplainContainer>
          <RedText>
            {'     '} *중요 : 아래 사항으로 입력해주시기 바랍니다.
          </RedText>
          <ExplainText>{'      '} - 회사명 : CU 지점명</ExplainText>
          <ExplainText>{'      '} - 가입경로 : 자버 담당자 미팅</ExplainText>
          <LinkBtn
            onPress={() => {
              setIsModalVisible(true);
            }}>
            <Text style={{color: '#FF3D3D', fontSize: 16}}>(선택)</Text>
            <Text style={{marginLeft: 5, color: '#642A8C', fontSize: 16}}>
              전자근로계약서 작성하기
            </Text>
          </LinkBtn>
        </ExplainContainer>
      </ScrollView>
      {params?.from === 'ManageInviteEmployeeScreen' && (
        <SkipTouchable
          onPress={() => {
            navigation.navigate('SetEmployeeInfoScreen', {
              data: params?.data,
              from: 'ElectronicContracts',
              onRefresh: params?.onRefresh,
            });
          }}>
          <Text style={{color: 'white', fontSize: 16}}>다음에 진행하기</Text>
        </SkipTouchable>
      )}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{flex: 1, margin: 0}}
        avoidKeyboard={false}>
        <Column>
          <ModalHeader>
            {params?.from === 'ManageInviteEmployeeScreen' && (
              <Text style={{paddingBottom: 15, paddingLeft: 10, color: '#aaa'}}>
                * 마이페이지에서 추후에 작성 가능합니다.
              </Text>
            )}
            <Touchable onPress={() => onPress()}>
              <CloseIcon size={28} />
            </Touchable>
          </ModalHeader>
          {isWebviewSpinnerVisible && (
            <ActivityIndicator
              color="#009688"
              size="large"
              style={{
                flex: 1,
                marginTop: 200,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
          <WebView
            source={{uri: 'https://bit.ly/2WFaeL4'}}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              height: hp('100%'),
            }}
            onMessage={() => {}}
            onLoadStart={() => setIsWebviewSpinnerVisible(true)}
            onLoad={() => setIsWebviewSpinnerVisible(false)}
          />
        </Column>
      </Modal>
    </BackGround>
  );
};
