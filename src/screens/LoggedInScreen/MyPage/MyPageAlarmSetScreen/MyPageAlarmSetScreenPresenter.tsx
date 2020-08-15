import React from 'react';
import styled from 'styled-components/native';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #fcfcfc;
`;

const Box = styled.View`
  flex-direction: row;
  margin: 30px 30px 0 30px;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const Switch = styled.Switch``;

export default ({
  updateAlarm,
  allPush,
  workPush,
  checkPush,
  checksharePush,
  shelfPush,
  healthPush,
  scedulePush,
  toggleAlarm,
}) => {
  const SwitchBox = ({value, alarm}) => (
    <Switch
      trackColor={{true: '#642A8C', false: '#ddd'}}
      thumbColor={'#fff'}
      onValueChange={() => {
        toggleAlarm(alarm);
        updateAlarm(value, alarm);
      }}
      value={value}
    />
  );
  return (
    <BackGround>
      <Box>
        <Text>푸시 끄기/켜기</Text>
        <SwitchBox value={allPush} alarm={'allPush'} />
      </Box>
      {allPush && (
        <>
          <Box>
            <Text>출퇴근 푸시</Text>
            <SwitchBox value={workPush} alarm={'workPush'} />
          </Box>
          <Box>
            <Text>근무일정 푸시</Text>
            <SwitchBox value={scedulePush} alarm={'scedulePush'} />
          </Box>
          <Box>
            <Text>체크리스트 푸시</Text>
            <SwitchBox value={checkPush} alarm={'checkPush'} />
          </Box>
          <Box>
            <Text>업무일지 푸시</Text>
            <SwitchBox value={checksharePush} alarm={'checksharePush'} />
          </Box>
        </>
      )}
    </BackGround>
  );
};
