_regist = async (sign) => {
  console.log('this.state.CLOSE_FLAG', this.state);
  this.props.setSplashVisible(true);
  //this.props.navigation.navigate('Home',{ addStore:true });
  const gps = this.state.commuteType.toString();
  console.log('gps', gps);
  let CLOSE_FLAG = this.state.CLOSE_FLAG == false ? '0' : '1';
  if (sign == 'close') {
    CLOSE_FLAG = '1';
  }

  try {
    let response = await fetch(
      'http://133.186.209.113:80/api/v2/Store/update2',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CU_CODE: this.state.CU_CODE,
          CLOSE_FLAG: CLOSE_FLAG,
          STORE_SEQ: this.state.STORE_SEQ,
          NAME: this.state.name,
          ADDR1: this.state.addr1,
          ADDR2: this.state.addr2,
          LAT: this.state.lat,
          LONG: this.state.long,
          CALCULATE_DAY: this.state.CALCULATE_DAY,
          LATE_TIME: this.state.LATE_TIME,
          LATE_FLAG: this.state.LATE_FLAG,
          GPS: gps,
          JULI: this.state.distance,
          TYPE: this.state.type,
          CATEGORY: this.state.storeCategoryType,
          other: this.state.storeCategoryTypeEtc,
        }),
      },
    );
    const json = await response.json();
    console.log(json);

    if (json.message == 'SUCCESS') {
      // alert('업데이트가 완료됐습니다.');
      this.setState({isChangeModalVisible: true});
      const params = {
        type: 'alert',
        title: '',
        content:
          sign == 'close'
            ? '매장의 폐업처리가 완료되었습니다'
            : '정보수정이 완료됐습니다.',
      };
      this.props.setAlertInfo(params);
      this.props.setAlertVisible(true);
      if (sign == 'close') {
        this.props.setLogIn('Login');
      } else {
        this.props.navigation.goBack();
      }
      // this.props.navigation.navigate('Home', { addStore: true });
      // this.props.navigation.getParam('refresh')({
      //   name: this.state.name,
      //   address: this.state.addr1,
      // });
    }
  } catch (error) {
    console.log(error);
  }
  this.props.setSplashVisible(false);
};
