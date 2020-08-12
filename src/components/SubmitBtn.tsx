import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

interface IIsBefore {
  isBefore: boolean;
}

const SubmitButton = styled.TouchableOpacity<IIsBefore>`
  width: ${wp('80%')};
  height: ${hp('7%')};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isBefore ? '#CCCCCC' : '#642A8C')};
`;

const SubmitButtonContainer = styled.View`
  padding-vertical: 50px;
  align-items: center;
`;

const WhiteText = styled.Text`
  font-size: 16;
  color: white;
`;

export default ({text, onPress, isRegist}) => {
  return (
    <SubmitButtonContainer>
      <SubmitButton
        isBefore={!isRegist}
        onPress={() => onPress()}
        disabled={!isRegist}>
        <WhiteText>{text}</WhiteText>
      </SubmitButton>
    </SubmitButtonContainer>
  );
};
