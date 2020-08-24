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
  width: ${wp('100%') - 80};
  height: ${hp('5%')};
  align-items: center;
  justify-content: center;
  border-color: ${(props) => (props.isBefore ? '#CCCCCC' : '#642A8C')};
  border-width: 1px;
  border-radius: 30px;
`;

const RoundButtonContainer = styled.View`
  margin-top: 30px;
  align-items: center;
`;

const Text = styled.Text<IIsBefore>`
  font-size: 16;
  color: ${(props) => (props.isBefore ? '#CCCCCC' : '#642A8C')};
`;

export default ({text, onPress, isRegisted}) => {
  return (
    <RoundButtonContainer>
      <SubmitButton
        isBefore={!isRegisted}
        onPress={() => onPress()}
        disabled={!isRegisted}>
        <Text isBefore={!isRegisted}>{text}</Text>
      </SubmitButton>
    </RoundButtonContainer>
  );
};
