import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import {Linking, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {setAlertVisible} from '../../../../redux/alertSlice';

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const KakaoText = styled.Text`
  font-size: 20px;
`;

const AdviceText = styled.Text`
  font-size: 20px;
  color: #642a8c;
`;

const KakaoBox = styled.TouchableOpacity`
  flex-direction: row;
  height: 70px;
  margin-top: 20px;
  padding: 15px 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: #ffde00;
`;

const AdviceBox = styled(KakaoBox)`
  border-width: 1px;
  background-color: #fff;
  border-color: #ddd;
`;

export default () => {
  const dispatch = useDispatch();
  const [helpCategory, setHelpCategory] = useState<[]>([]);

  const fetchData = async () => {
    // try {
    //   let response = await fetch(
    //     'http://133.186.209.113:3003/api/auth/getAllScreen',
    //     {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //       },
    //     },
    //   );

    //   const json = await response.json();
    //   console.log('codecode============', json);
    // } catch (error) {
    //   console.log(error);
    // }

    if (helpCategory.length == 0) {
      try {
        let response = await fetch(
          'http://cuapi.shop-sol.com:3003/api/auth/help',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const json = await response.json();
        console.log(':3003/api/auth/help 0814TEST', json);
        setHelpCategory(json.result);
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(setAlertVisible(false));
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <BackGround>
      <ScrollView>
        <KakaoBox
          onPress={() => {
            Linking.openURL('http://pf.kakao.com/_kRynxb/chat');
          }}>
          <Row>
            {/* <Image
              source={require('../../assets/images/kakaoBtn.png')}
              style={{marginRight: 5}}
            /> */}
            <KakaoText>카카오톡 문의</KakaoText>
          </Row>
          {/* <Icon name="ios-arrow-forward" size={22} color="#bbb" /> */}
        </KakaoBox>
        {helpCategory.length > 0 &&
          helpCategory.map((data: any, index) => {
            console.log('=======');
            return (
              <AdviceBox
                key={index}
                onPress={() => {
                  Linking.openURL(data?.URL);
                }}>
                <AdviceText>{data?.TITLE}</AdviceText>
                {/* <Icon name="ios-arrow-forward" size={22} color="#bbb" /> */}
              </AdviceBox>
            );
          })}
      </ScrollView>
    </BackGround>
  );
};
