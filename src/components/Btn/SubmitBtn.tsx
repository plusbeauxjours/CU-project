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
  width: ${wp('100%') - 40};
  height: ${hp('5%')};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isBefore ? '#CCCCCC' : '#642A8C')};
`;

const SubmitButtonContainer = styled.View`
  margin-top: 50px;
  align-items: center;
`;

const WhiteText = styled.Text`
  font-size: 16;
  color: white;
`;

export default ({text, onPress, isRegisted}) => {
  return (
    <SubmitButtonContainer>
      <SubmitButton
        isBefore={!isRegisted}
        onPress={() => onPress()}
        disabled={!isRegisted}>
        <WhiteText>{text}</WhiteText>
      </SubmitButton>
    </SubmitButtonContainer>
  );
};
