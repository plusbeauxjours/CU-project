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

const Text = styled.Text``;
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
  return (
    <BackGround>
      <Box>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>푸시 끄기/켜기</Text>

        <Switch
          trackColor={{true: '#642A8C', false: '#ddd'}}
          thumbColor={'#fff'}
          onValueChange={() => {
            toggleAlarm('allPush');
            updateAlarm(allPush, 'allPush');
          }}
          value={allPush}
        />
      </Box>
      {allPush == true && (
        <>
          <Box>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>출퇴근 푸시</Text>
            <Switch
              trackColor={{true: '#642A8C', false: '#ddd'}}
              thumbColor={'#fff'}
              onValueChange={() => {
                toggleAlarm('workPush');
                updateAlarm(workPush, 'workPush');
              }}
              value={workPush}
            />
          </Box>
          <Box>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              근무일정 푸시
            </Text>
            <Switch
              trackColor={{true: '#642A8C', false: '#ddd'}}
              thumbColor={'#fff'}
              onValueChange={() => {
                toggleAlarm('scedulePush');
                updateAlarm(scedulePush, 'scedulePush');
              }}
              value={scedulePush}
            />
          </Box>
          <Box>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              체크리스트 푸시
            </Text>
            <Switch
              trackColor={{true: '#642A8C', false: '#ddd'}}
              thumbColor={'#fff'}
              onValueChange={() => {
                toggleAlarm('checkPush');
                updateAlarm(checkPush, 'checkPush');
              }}
              value={checkPush}
            />
          </Box>
          <Box>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              업무일지 푸시
            </Text>
            <Switch
              trackColor={{true: '#642A8C', false: '#ddd'}}
              thumbColor={'#fff'}
              onValueChange={() => {
                toggleAlarm('checksharePush');
                updateAlarm(checksharePush, 'checksharePush');
              }}
              value={checksharePush}
            />
          </Box>
        </>
      )}
    </BackGround>
  );
};
