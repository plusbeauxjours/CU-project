import React from 'react';
import {Text} from 'react-native';
import Animated, {add, cond, eq, set, useCode} from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
  minus,
  clamp,
} from 'react-native-redash';
import styled from 'styled-components/native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {SettingIcon, DeleteIcon} from '~/constants/Icons';

const snapPoints = [0, -100, 0];

const BackBtn = styled.View`
  background-color: white;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-bottom-width: 0.7px;
  border-color: #ddd;
`;

const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 50;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const CommentBox = styled.View`
  padding: 10px 0;
  border-bottom-width: 0.7px;
  border-color: #ddd;
  min-height: 70px;
  justify-content: center;
  background-color: white;
`;

const Column = styled.View`
  margin-left: 10px;
  flex-direction: column;
  justify-content: center;
  min-height: 50px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default ({
  data,
  setIsEditMode,
  setCommentInputBox,
  setComment,
  setSelectedCOM_SEQ,
  deleteFn,
}) => {
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
  const translateX = useValue(0);
  const offsetX = useValue(0);
  const clock = useClock();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(
          translateX,
          add(offsetX, clamp(translation.x, -9999, minus(offsetX))),
        ),
      ),
      cond(eq(state, State.END), [
        set(translateX, timing({clock, from: translateX, to})),
        set(offsetX, translateX),
      ]),
    ],
    [],
  );
  return (
    <Animated.View>
      <BackBtn>
        <RowTouchable
          style={{backgroundColor: 'white'}}
          onPress={() => {
            setIsEditMode(true);
            setCommentInputBox(true);
            setComment(data.CONTENTS);
            setSelectedCOM_SEQ(data.COM_SEQ);
          }}>
          <SettingIcon color={'#aaa'} size={22} />
        </RowTouchable>
        <RowTouchable
          style={{backgroundColor: '#D93F12'}}
          onPress={() => deleteFn(data.COM_SEQ)}>
          <DeleteIcon color={'white'} />
        </RowTouchable>
      </BackBtn>
      <PanGestureHandler
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
        {...gestureHandler}>
        <Animated.View style={{transform: [{translateX}]}}>
          <CommentBox>
            <Row style={{alignItems: 'flex-start'}}>
              <FastImage
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
                source={{
                  uri: 'http:cuapi.shop-sol.com/uploads/3.png',
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Column>
                <Text
                  ellipsizeMode={'tail'}
                  numberOfLines={100}
                  style={{
                    width: wp('100%') - 140,
                    flexWrap: 'wrap',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#aaa',
                    }}>
                    {data.EMP_NAME} [{data.IS_MANAGER}]&nbsp;&nbsp;
                  </Text>
                  {data.CONTENTS}
                </Text>
                <Row
                  style={{
                    justifyContent: 'flex-start',
                  }}>
                  <Text style={{color: '#aaa'}}>
                    {moment(data.CREATE_TIME).format('YYYY.MM.DD')}
                  </Text>
                </Row>
              </Column>
            </Row>
          </CommentBox>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
