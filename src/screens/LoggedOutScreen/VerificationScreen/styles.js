import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    height: hp('8%'), 
    width: wp('85%'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  backText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold'
  },
  topBox: {
    marginTop: hp('5%'),
    width: wp('80%'),
    // backgroundColor: 'pink'
  },
      nameGender: {
        flexDirection: 'row',
        // marginHorizontal: 40
      },
          nameGender2: {
            flex: 1,
            paddingRight: 20
            // backgroundColor: 'blue'
          },
          textName: {
            // marginLeft: 10,
            fontSize: 18
          },
          textInputCase: {
            height: hp('5%'), 
            width: wp('80%'),
            justifyContent: 'center',
            // marginTop: 8
          },
              textinput: {
                fontSize: 18,
                color: 'black',
                flex: 1,
                // marginLeft: 5
              },
              lineNameBefore: {
                height: 2,
                width: wp('37%'),
                backgroundColor:'#E5E5E5',
                marginTop: 3
              },
              lineNameAfter: {
                height: 2,
                width: wp('37%'),
                backgroundColor:'#642A8C',
                marginTop: 3
              },
          genderCheckCase: {
            flexDirection: 'row', 
            justifyContent: 'space-around',
            marginTop: 8
          },
      InputCase: {
        marginTop: 20
      },
          textInputCase2: {
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
  authReqBefore: {
    fontSize: 15,
    color: '#ddd',
    padding: 10
  },
  authReqAfter: {
    fontSize: 15,
    color: '#642A8C',
    padding: 10
  },
  timer: {
    fontSize: 15,
    color: '#FF3D3D',
    marginRight: 10, marginTop: 5
  },
  buttonBefore: {
    // marginTop: hp('5%'),
    width: wp('80%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC'
  },
  buttonAfter: {
    // marginTop: hp('5%'),
    width: wp('80%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#642A8C'
  },
  lineBefore: {
    height: 2,
    width: wp('90%'),
    backgroundColor:'#E5E5E5',
    marginTop: 3
  },
  lineAfter: {
    height: 2,
    width: wp('90%'),
    backgroundColor:'#642A8C',
    marginTop: 3
  },
  
  //~~~~~~~~~~~~~~~~~~~~~~~~~
  // sexType() 
  //~~~~~~~~~~~~~~~~~~~~~~~~~
  sexType: {
    flexDirection: 'row',
    alignItems: 'center'
    // backgroundColor: 'yellow'
  },
      sexTypeRadioButtonOn: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: '#642A8C'
      },
      sexTypeRadioButtonOff: {
        width: 16,
        height: 16,
        borderRadius: 16 / 2,
        borderColor: '#642A8C',
        borderWidth: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      },
});