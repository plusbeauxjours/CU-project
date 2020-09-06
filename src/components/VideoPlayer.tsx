import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import {PlayerControls} from './PlayerControls';
import {ProgressBar} from './ProgressBar';
import {
  PortraitIcon,
  LandscapeIcon,
  DownIcon,
  CloseCircleIcon,
} from '../constants/Icons';

interface IsFullScreen {
  isFullScreen: boolean;
}

const ToggleControls = styled.TouchableOpacity<IsFullScreen>`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ControlOverlay = styled.View`
  position: absolute;
  background-color: #000000c4;
`;

const FullScreenIconContainer = styled.TouchableOpacity<IsFullScreen>`
  z-index: 5;
  position: absolute;
  right: 50;
  top: ${(props) => (props.isFullScreen ? -20 : 25)};
`;

const CloseIconContainer = styled.TouchableOpacity<IsFullScreen>`
  z-index: 5;
  position: absolute;
  right: 0;
  top: ${(props) => (props.isFullScreen ? -20 : 25)};
`;

export default ({url, setModalVisible}) => {
  const videoRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isShowedControls, setIsShowedControls] = useState<boolean>(true);

  function handleOrientation(orientation: string) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (setIsFullScreen(true), StatusBar.setHidden(true))
      : (setIsFullScreen(false), StatusBar.setHidden(false));
  }

  function handleFullscreen() {
    isFullScreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
  }

  function handlePlayPause() {
    if (isPlaying) {
      setIsPlaying(false);
      setIsShowedControls(true);
      return;
    }
    setIsPlaying(true);
    setTimeout(() => setIsShowedControls(false), 2000);
  }

  function skipBackward() {
    videoRef.current.seek(currentTime - 10);
    setCurrentTime(currentTime - 10);
  }

  function skipForward() {
    videoRef.current.seek(currentTime + 10);
    setCurrentTime(currentTime + 10);
  }

  function onSeek(data: OnSeekData) {
    videoRef.current.seek(data.seekTime);
    setCurrentTime(data.seekTime);
  }

  function onLoadEnd(data: OnLoadData) {
    setDuration(data.duration);
    setCurrentTime(data.currentTime);
  }

  function onProgress(data: OnProgressData) {
    currentTime: setCurrentTime(data.currentTime);
  }

  function onEnd() {
    setIsPlaying(false);
    videoRef.current.seek(0);
  }

  function showControls() {
    isShowedControls ? setIsShowedControls(false) : setIsShowedControls(true);
  }

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  return (
    <ToggleControls
      isFullScreen={isFullScreen}
      onPress={showControls}
      activeOpacity={1}>
      <Video
        ref={videoRef}
        source={{
          uri:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={
          isFullScreen
            ? {width: hp('100%'), height: wp('100%')}
            : {width: wp('100%'), height: wp('100%') * (9 / 16)}
        }
        isFullScreen={isFullScreen}
        controls={false}
        resizeMode={'contain'}
        onLoad={onLoadEnd}
        onProgress={onProgress}
        onEnd={onEnd}
        paused={!isPlaying}
      />
      {isShowedControls && (
        <>
          <CloseIconContainer
            isFullScreen={isFullScreen}
            onPress={() => {
              setModalVisible(false);
            }}>
            <CloseCircleIcon size={33} color={'white'} />
          </CloseIconContainer>
          <FullScreenIconContainer
            isFullScreen={isFullScreen}
            onPress={handleFullscreen}>
            {isFullScreen ? <PortraitIcon /> : <LandscapeIcon />}
          </FullScreenIconContainer>
          <ControlOverlay
            style={
              isFullScreen
                ? {width: hp('100%'), height: wp('100%')}
                : {width: wp('100%'), height: wp('100%') * (9 / 16)}
            }>
            <PlayerControls
              onPlay={handlePlayPause}
              onPause={handlePlayPause}
              playing={isPlaying}
              showSkip={true}
              skipBackwards={skipBackward}
              skipForwards={skipForward}
              isFullScreen={isFullScreen}
            />
            <ProgressBar
              currentTime={currentTime}
              duration={duration > 0 ? duration : 0}
              onSlideStart={handlePlayPause}
              onSlideComplete={handlePlayPause}
              onSlideCapture={onSeek}
            />
          </ControlOverlay>
        </>
      )}
    </ToggleControls>
  );
};
