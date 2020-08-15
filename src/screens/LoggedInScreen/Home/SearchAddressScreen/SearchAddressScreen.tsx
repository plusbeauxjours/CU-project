import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import styled from 'styled-components/native';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #e6e6e6;
`;

export default ({route: {params}}) => {
  console.log('params on searchAddressScreen', params);
  const navigation = useNavigation();

  const choseAddress = (data) => {
    console.log(data);
    const {addr, lat, long} = JSON.parse(data.data);
    console.log(addr, lat, long);
    navigation.navigate(
      params?.screen == 0 ? 'AddStoreScren' : 'UpdateStoreScreen',
      {
        addr,
        lat,
        long,
      },
    );
  };
  return (
    <BackGround>
      <WebView
        source={{uri: 'http://133.186.209.113/Shopsol/zipcodern'}}
        style={{flex: 1}}
        onMessage={(event) => {
          choseAddress(event.nativeEvent);
        }}
      />
    </BackGround>
  );
};
