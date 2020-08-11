import {
  StyleSheet
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f6f6f6',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    height: hp('10%'),
    width: wp('85%'),
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  backText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
  },
  topBox: {
    width: wp('100%'),
  },
  InputCase: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textInputCase: {
    marginTop: 8,
    paddingVertical: 10,
  },
  textinput: {
    flex: 1,
    paddingLeft: 5,
    marginVertical: 10,
    fontSize: 15,
    color: '#642A8C',
  },
  checkPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkPasswordText: {
    marginLeft: 8,
    color: '#aaa'
  },
  buttonBefore: {
    width: wp('80%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
  },
  buttonAfter: {
    width: wp('80%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#642A8C',
  },
  lineBefore: {
    height: 2,
    backgroundColor: '#E5E5E5',
  },
  lineAfter: {
    height: 2,
    backgroundColor: '#E5E5E5',
  },
  //~~~~~~~~~~~~~~~~~~~~~~~~~
  // positionType()
  //~~~~~~~~~~~~~~~~~~~~~~~~~
  typeCheckCase: {
    flexDirection: 'row',
    marginTop: 20,
  },
  positionType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionTypeRadioButtonOn: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#642A8C',
  },
  positionTypeRadioButtonOff: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameGender: {
    flexDirection: 'row',
    // marginHorizontal: 40
  },
  nameGender2: {
    flex: 1,
  },
  genderCheckCase: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  lineNameBefore: {
    height: 2,
    backgroundColor: '#E5E5E5',
  },
  lineNameAfter: {
    height: 2,
    backgroundColor: '#642A8C',
  },
});