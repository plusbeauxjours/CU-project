import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentBox: {
    width: wp('80%'),
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  authReqBefore: {
    fontSize: 13,
    color: '#642A8C',
    // marginRight: 10,
  },
  backButton: {
    height: 20,
    width: 50,
    position: 'absolute',
    top: hp('6%'),
    left: wp('6%'),
  },
  checkPassword: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkPasswordText: {
    marginLeft: 8,
    color: '#E5E5E5',
  },
  backText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
  },
  case: {
    // height: hp('13%'),
    width: '100%',
    marginTop: hp('3%'),
    // justifyContent: 'flex-end',
  },
  authBox: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#642A8C',
    borderRadius: 20
  },
  textName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  InputCase: {
    width: '100%',
  },
  textInputCase2: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textinputCase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  textinput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  lineBefore: {
    height: 2,
    // width: wp('87%'),
    backgroundColor: '#CCCCCC',
  },
  lineAfter: {
    height: 2,
    // width: wp('87%'),
    backgroundColor: '#642A8C',
  },
  itemCase: {
    height: hp('6%'),
    width: wp('40%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    fontSize: 22,
    color: 'grey',
  },
  buttonCase: {
    height: hp('12%'),
    width: wp('90%'),
    justifyContent: 'center',
  },
  button: {
    height: hp('7%'),
    width: wp('90%'),
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordCase: {
    width: '100%',
    marginTop: 10,
  },
  buttonBefore: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
  },
  buttonAfter: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#642A8C',
  },
  changeBefore: {
    width: wp('80%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
  },
  changeAfter: {
    width: wp('80%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#642A8C',
  },
});
