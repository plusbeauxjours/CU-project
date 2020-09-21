import { Platform } from 'react-native';

export default {
    isAndroid: () => Platform.OS === "android",
    appVersion: '1.3.7'
};

