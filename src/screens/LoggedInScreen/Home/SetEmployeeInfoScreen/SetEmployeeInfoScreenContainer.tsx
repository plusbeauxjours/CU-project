import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setAlertVisible, setAlertInfo} from '~/redux/alertSlice';
import SetEmployeeInfoScreenPresenter from './SetEmployeeInfoScreenPresenter';
import {setSplashVisible} from '~/redux/splashSlice';
import api from '~/constants/LoggedInApi';
import utils from '~/constants/utils';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    data: {EMP_NAME = null, STORE_SEQ = null, EMP_SEQ = null} = {},
    from = null,
    onRefresh,
  } = params;
  const [START_TYPE, setSTART_TYPE] = useState<string>('0');
  const [isSalaryModalVisible1, setIsSalaryModalVisible1] = useState<boolean>(
    false,
  );
  const [isSalaryModalVisible2, setIsSalaryModalVisible2] = useState<boolean>(
    false,
  );
  const [isHelpModalVisible, setIsHelpModalVisible] = useState<boolean>(false);
  const [isStartDayModalVisible, setIsStartDayModalVisible] = useState<boolean>(
    false,
  );
  const [isEndDayModalVisible, setIsEndDayModalVisible] = useState<boolean>(
    false,
  );
  const [
    isProbationPeriodModalVisible,
    setIsProbationPeriodModalVisible,
  ] = useState<boolean>(false);

  ///// STEP 1 /////
  const [click1, setClick1] = useState<boolean>(false);
  const [startDay, setStartDay] = useState<string>(
    moment().format('YYYY-MM-DD'),
  );
  const [endDay, setEndDay] = useState<string>('');
  const [endDayCheck, setEndDayCheck] = useState<boolean>(true);

  ///// STEP 2 /////
  const [click2, setClick2] = useState<boolean>(false);
  const [payCheck, setPayCheck] = useState<[boolean, boolean, boolean]>([
    true,
    false,
    false,
  ]); //  [시급,일급,월급 ]
  const [payYear, setPayYear] = useState<string>(moment().format('YY')); //  급여 적용 시작 연도
  const [payMonth, setPayMonth] = useState<string>(moment().format('MM')); //  급여 적용 시작 월
  const [payDay, setPayDay] = useState<string>(moment().format('YYYY-MM-DD')); //  급여 적용 시작 년월
  const [payYearModal, setPayYearModal] = useState<boolean>(false);
  const [payMonthModal, setPayMonthModal] = useState<boolean>(false);
  const [payYearCheck, setPayYearCheck] = useState<any>(new Array(4));
  const [payMonthCheck, setPayMonthCheck] = useState<any>(new Array(12));
  const [payYearDirectInput, setPayYearDirectInput] = useState<string>('');

  ///// STEP 3 /////
  const [pay, setPay] = useState<string>(''); //  pay
  const [pay2, setPay2] = useState<string>(''); //  pay2
  const [pay3, setPay3] = useState<string>(''); //  pay3
  const [pay4, setPay4] = useState<string>(''); //  pay4
  const [pay5, setPay5] = useState<string>(''); //  pay5

  ///// 수습 /////
  const [probation, setProbation] = useState<boolean>(false);
  const [probationPeriod, setProbationPeriod] = useState<string>('');
  const [probationPercent, setProbationPercent] = useState<string>('');
  const [
    isProbationPercentModalVisible,
    setIsProbationPercentModalVisible,
  ] = useState<boolean>(false);
  const [periodCheck, setPeriodCheck] = useState<any>(new Array(4));
  const [percentCheck, setPercentCheck] = useState<any>(new Array(4));
  const [percentDirectInput, setPercentDirectInput] = useState<string>('');

  ///// STEP 4 /////
  const [salarySystemCheck, setSalarySystemCheck] = useState<
    [boolean, boolean, boolean]
  >([false, false, false]); //  [추가&야간&휴일수당 50% 자동 가산, 주휴수당 자동 가산, 휴게시간 자동 차감]
  const [deductionTypeCheck, setDeductionTypeCheck] = useState<
    [boolean, boolean, boolean]
  >([false, false, true]); //  [4대보험, 프리랜서, 적용안함]
  const [weekTypeCheck, setWeekTypeCheck] = useState<[boolean, boolean]>([
    false,
    true,
  ]); //  [(수동) 월 근무시간 입력, (자동) 근로기준법 기준]
  const [weekTime, setWeekTime] = useState<string>(null); //  weekTypeCheck[1]이 true일 경우
  const [restTypeCheck, setRestTypeCheck] = useState<[boolean, boolean]>([
    false,
    true,
  ]); //  [(수동) 일 휴게시간 입력, (자동) 근로기준법 기준]
  const [restTime, setRestTime] = useState<string>(null); //  restTypeCheck[1]이 true일 경우
  const [insuranceCheck, setInsuranceCheck] = useState<
    [boolean, boolean, boolean, boolean]
  >([true, true, true, true]); //  국민연금, 건강보험, 고용보험, 산재보험]
  const [MODIFYCOUNT, setMODIFYCOUNT] = useState<string>('');

  ///// STEP 5 /////
  const [click5, setClick5] = useState<boolean>(false);
  const [positionCheck, setPositionCheck] = useState<[boolean, boolean]>([
    true,
    false,
  ]); //  [직원, 점장]
  const [authorityCheck, setAuthorityCheck] = useState<
    [boolean, boolean, boolean, boolean, boolean]
  >([false, false, false, false, false]); //  [선택 시 본인급여 확인 가능, [점장] 타 직원급여 확인 및 수정 가능, [점장] 직원 일정 수정 가능, [점장] 타 직원 출퇴근 알람 받기]

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };

    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const explainModal = (text) => {
    const params = {
      alertType: 'explain',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const checkDirectInput2 = () => {
    let value = JSON.parse(JSON.stringify(percentCheck));
    value.fill(false);
    if (!percentCheck.includes(true)) {
      return alertModal('시간을 선택해주세요.');
    }
    if (
      percentCheck[6] === true &&
      (Number(percentDirectInput) < 1 || Number(percentDirectInput) > 100)
    ) {
      return alertModal('0 ~ 60 사이의 수를 적어주세요.');
    }
    let percent = percentCheck.indexOf(true) + 1;
    if (percent == 1) {
      percent = 100;
    } else if (percent == 2) {
      percent = 90;
    } else if (percent == 3) {
      percent = 80;
    } else if (percent == 4) {
      percent = 70;
    } else if (percent == 5) {
      percent = 60;
    } else if (percent == 6) {
      percent = 50;
    }
    if (percentCheck[6] === true) {
      percent = percentDirectInput;
    }
    setIsProbationPercentModalVisible(false);
    setProbationPercent(percent);
    setPercentCheck(value);
    setPercentDirectInput('');
  };

  const getPeriod = (CALCULATE_DAY) => {
    return `20${payYear}년 ${payMonth}월 ${CALCULATE_DAY}일`;
  };

  const total = () => {
    let value =
      Number(pay) + Number(pay2) + Number(pay3) + Number(pay4) + Number(pay5);
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const PYcheckDirectInput = () => {
    let value = JSON.parse(JSON.stringify(payYearCheck));
    value.fill(false); // ES6
    if (
      payYearCheck[6] === true &&
      (Number(payYearDirectInput) < 1 || Number(payYearDirectInput) > 99)
    ) {
      return alertModal('0 ~ 60 사이의 수를 적어주세요.');
    }
    let payYeared = payYearCheck.indexOf(true) + 1;
    if (payYeared == 1) {
      payYeared = Number(payYear) - 3;
    } else if (Number(payYeared) == 2) {
      payYeared = Number(payYear) - 2;
    } else if (Number(payYeared) == 3) {
      payYeared = Number(payYear) - 1;
    } else if (Number(payYeared) == 4) {
      payYeared = Number(payYear);
    } else if (Number(payYeared) == 5) {
      payYeared = Number(payYear) + 1;
    } else if (Number(payYeared) == 6) {
      payYeared = Number(payYear) + 2;
    }
    if (payYearCheck[6] === true) {
      payYeared = payYearDirectInput;
    }
    setPayYearModal(false);
    setPayYear(payYeared);
    setPayDay(`20${payYeared}-${payDay.substr(5, 5)}`);
    setPayYearCheck(value);
    setPayYearDirectInput('');
  };

  const submitFn = async () => {
    let payChecked = payCheck.indexOf(true);
    let positionChecked = positionCheck.indexOf(true);
    let deductionTypeChecked = deductionTypeCheck.indexOf(true);
    let weekTypeChecked = weekTypeCheck.indexOf(true);
    let restTypeChecked = restTypeCheck.indexOf(true);

    if (deductionTypeChecked === 0) {
      deductionTypeChecked = 2; // 2: 4대보험
    } else if (deductionTypeChecked === 1) {
      deductionTypeChecked = 1; // 1: 프리랜서
    } else {
      deductionTypeChecked = 0; // 0: 없음(default)
    }
    //~~~~~~~~~~~~~~~~~~~~
    // STEP 1 에러 체크
    //~~~~~~~~~~~~~~~~~~~~
    if (startDay === '') {
      return alertModal('입사일을 입력해주세요.');
    } else if (endDay === '' && endDayCheck === false) {
      return alertModal('퇴사일을 입력해주세요');
    }
    //~~~~~~~~~~~~~~~~~~~~
    // STEP 2 에러 체크
    //~~~~~~~~~~~~~~~~~~~~
    if (payChecked === -1) {
      return alertModal('급여유형을 선택해주세요.');
    } else if (payChecked !== 2 && pay === '') {
      return alertModal('급여를 입력해주세요.');
    } else if (payChecked === 2) {
      if (pay === '') {
        return alertModal('기본급을 입력해주세요.');
      } else if (pay2 === '') {
        return alertModal('식대금액을 입력해주세요.');
      } else if (pay3 === '') {
        return alertModal('자가운전금액을 입력해주세요.');
      } else if (pay4 === '') {
        return alertModal('상여금액을 입력해주세요.');
      } else if (pay5 === '') {
        return alertModal('성과급금액을 입력해주세요.');
      }
    }
    if ((probation && probationPeriod == '') || undefined) {
      return alertModal('수습기간의 종료일을 설정해주세요.');
    }
    if ((probation && probationPercent == '') || undefined) {
      return alertModal('수습기간의 급여비율을 설정해주세요.');
    }
    if (salarySystemCheck[1] === true && weekTypeChecked == -1) {
      return alertModal('주휴수당 계산 방법 선택을 체크해주세요.');
    }
    if (salarySystemCheck[2] === true && restTypeChecked == -1) {
      return alertModal('휴게시간 계산 방법 선택을 체크해주세요.');
    }
    if (deductionTypeChecked === -1) {
      return alertModal('급여정보 입력\n공제유형을 선택해주세요.');
    }
    if (payDay === '') {
      return alertModal('급여정보 입력\n적용 시작 년,월을 입력해주세요.');
    }
    if (positionChecked === -1) {
      return alertModal('직책/권한 설정\n직원의 직책을 선택해주세요.');
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.updateEmp({
        FIRST: MODIFYCOUNT,
        START_TYPE,
        STORE_SEQ,
        EMP_SEQ,
        // ↓ STEP 1
        START: startDay,
        END: endDayCheck === true ? null : endDay,
        // ↓ STEP 2
        PAY_TYPE: payChecked,
        MEALS: payCheck[2] === true ? pay2 : '0',
        SELF_DRIVING: payCheck[2] === true ? pay3 : '0',
        BONUS: payCheck[2] === true ? pay4 : '0',
        INCENTIVE: payCheck[2] === true ? pay5 : '0',
        PAY: pay,
        PAY_START: payDay,
        // ↓ STEP 3
        THREE_ALLOWANCE: salarySystemCheck[0] === true ? '1' : '0',
        WEEKEND_ALLOWANCE: salarySystemCheck[1] === true ? '1' : '0',
        WeekType: weekTypeChecked,
        WeekTime: weekTime || '0',
        REST_ALLOWANCE: salarySystemCheck[2] === true ? '1' : '0',
        RestType: restTypeChecked,
        RestTime: restTime || '0',
        Week_START: payDay,
        insurance: deductionTypeChecked,
        insurance_START: payDay,
        // 수습
        probation: probation ? '1' : '0',
        probationDATE: probationPeriod,
        probationPercent: probationPercent,
        health: insuranceCheck[1] ? '1' : '0',
        pension: insuranceCheck[0] ? '1' : '0',
        employment: insuranceCheck[2] ? '1' : '0',
        accident: insuranceCheck[3] ? '1' : '0',
        // ↓ STEP 5
        IS_MANAGER: positionChecked !== -1 ? positionChecked : '0',
        PAY_SHOW: authorityCheck[0] === true ? '1' : '0',
        OTHERPAY_SHOW: authorityCheck[1] === true ? '1' : '0',
        CalendarEdit: authorityCheck[2] === true ? '1' : '0',
        PUSH: authorityCheck[3] === true ? '1' : '0',
        STOREPAY_SHOW: authorityCheck[4] === true ? '1' : '0',
      });

      if (data.message === 'SUCCESS') {
        if (from === 'EmployeeInfoScreen') {
          alertModal('직원정보가 수정되었습니다.');
          navigation.goBack();
        } else if (from === 'ElectronicContracts') {
          navigation.navigate('EmployeeScheduleMainScreen', {
            CALCULATE_DAY: utils.calculateDay,
            EMP_SEQ,
            PAY_TYPE: payChecked,
            PAY: pay,
          });
        }
      }
    } catch (e) {
      alertModal('통신이 원활하지 않습니다.');
      console.log(e);
    } finally {
      onRefresh();
      dispatch(setSplashVisible(false));
    }
  };

  const fetchData = async () => {
    try {
      const {data} = await api.getEmp(EMP_SEQ);
      if (data.resultmsg === '1') {
        let payChecked = JSON.parse(JSON.stringify(payCheck)); // 급여 유형
        payChecked.fill(false);
        payChecked[Number(data.resultdata[0].PAY_TYPE)] = true;

        let salarySystemChecked = JSON.parse(JSON.stringify(salarySystemCheck));
        salarySystemChecked.fill(false);
        if (data.resultdata[0].THREE_ALLOWANCE === '1') {
          salarySystemChecked[0] = true;
        }
        if (data.resultdata[0].WEEKEND_ALLOWANCE === '1') {
          salarySystemChecked[1] = true;
        }

        let weekTypeChecked = JSON.parse(JSON.stringify(weekTypeCheck));
        weekTypeChecked.fill(false);
        weekTypeChecked[Number(data.resultdata[0].WeekType)] = true;
        if (data.resultdata[0].REST_ALLOWANCE === '1') {
          salarySystemChecked[2] = true;
        }

        let restTypeChecked = JSON.parse(JSON.stringify(restTypeCheck));
        restTypeChecked.fill(false);
        restTypeChecked[Number(data.resultdata[0].RestType)] = true;

        let deductionTypeChecked = JSON.parse(
          JSON.stringify(deductionTypeCheck),
        ); // 공제유형
        deductionTypeChecked.fill(false);
        if (data.resultdata[0].insurance === '2') {
          deductionTypeChecked[0] = true; // 2: 4대보험
        } else if (data.resultdata[0].insurance === '1') {
          deductionTypeChecked[1] = true; // 1: 프리랜서
        } else {
          deductionTypeChecked[2] = true; // 0: 없음
        }

        let positionChecked = JSON.parse(JSON.stringify(positionCheck));
        positionChecked.fill(false);
        positionChecked[Number(data.resultdata[0].IS_MANAGER)] = true;

        let authorityChecked = JSON.parse(JSON.stringify(authorityCheck));
        authorityChecked.fill(false);
        if (data.resultdata[0].IS_MANAGER === '1') {
          if (data.resultdata[0].OTHERPAY_SHOW === '1')
            authorityChecked[1] = true;
          if (data.resultdata[0].CalendarEdit === '1')
            authorityChecked[2] = true;
          if (data.resultdata[0].PUSH === '1') authorityChecked[3] = true;
          if (data.resultdata[0].STOREPAY_SHOW === '1')
            authorityChecked[4] = true;
        }
        if (data.resultdata[0].PAY_SHOW === '1') authorityChecked[0] = true;

        let insuranceChecked = insuranceCheck;
        if (data.resultdata[0].pension === '1') {
          insuranceChecked[0] = true; // 국민연금
        } else {
          insuranceChecked[0] = false;
        }
        if (data.resultdata[0].health === '1') {
          insuranceChecked[1] = true; // 건강보험
        } else {
          insuranceChecked[1] = false;
        }
        if (data.resultdata[0].employment === '1') {
          insuranceChecked[2] = true; // 고용보험
        } else {
          insuranceChecked[2] = false;
        }
        if (data.resultdata[0].accident === '1') {
          insuranceChecked[3] = true; // 산재보험
        } else {
          insuranceChecked[3] = false;
        }

        if (from === 'EmployeeInfoScreen') {
          setStartDay(data.resultdata[0].START);
          setEndDay(data.resultdata[0].END ? data.resultdata[0].END : '');
          setEndDayCheck(data.resultdata[0].END ? false : true);

          // ↓ STEP 2(급여정보 입력)
          setPayCheck(payChecked);
          setPayDay(data.resultdata[0].PAY_START);

          setPay(
            data.resultdata[0].PAY_TYPE !== '2' ? data.resultdata[0].PAY : '',
          );
          setPay2(
            data.resultdata[0].PAY_TYPE === '2' ? data.resultdata[0].MEALS : '',
          );
          setPay3(
            data.resultdata[0].PAY_TYPE === '2'
              ? data.resultdata[0].SELF_DRIVING
              : '',
          );
          setPay4(
            data.resultdata[0].PAY_TYPE === '2' ? data.resultdata[0].BONUS : '',
          );
          setPay5(
            data.resultdata[0].PAY_TYPE === '2'
              ? data.resultdata[0].INCENTIVE
              : '',
          );

          //수습
          setProbation(data.resultdata[0].probation == '1' ? true : false);
          setProbationPeriod(
            data.resultdata[0].probation == '1'
              ? data.resultdata[0].probationDATE
              : '',
          );
          setProbationPercent(
            data.resultdata[0].probation == '1'
              ? data.resultdata[0].probationPercent
              : '',
          );

          // ↓ STEP 3(급여 상세정보 입력)
          setSalarySystemCheck(salarySystemChecked);
          setWeekTypeCheck(weekTypeChecked);
          setWeekTime(
            weekTypeChecked[0] === true ? data.resultdata[0].WeekTime : null,
          );
          setRestTypeCheck(restTypeChecked);
          setRestTime(
            restTypeChecked[0] === true ? data.resultdata[0].RestTime : null,
          );
          setDeductionTypeCheck(deductionTypeChecked);
          setInsuranceCheck(insuranceChecked);
          setMODIFYCOUNT(data.resultdata[0].FIRST); // 첫번째 적용 확인 구분값

          // ↓ STEP 5(직책/권한 설정)
          setPositionCheck(positionChecked);
          setAuthorityCheck(authorityChecked);
        } else {
          setSTART_TYPE('1');
          setMODIFYCOUNT('1'); // 첫번째 적용 확인 구분값
        }
      }
    } catch (e) {
      console.log(e);
      alertModal('통신이 원활하지 않습니다.');
      navigation.goBack();
    }
  };

  useEffect(() => {
    params?.from === 'ElectronicContracts' &&
      navigation.setOptions({headerRight: () => null});
    fetchData();
  }, []);

  return (
    <SetEmployeeInfoScreenPresenter
      submitFn={submitFn}
      payDay={payDay}
      payMonth={payMonth}
      payYear={payYear}
      payYearModal={payYearModal}
      setPayYearModal={setPayYearModal}
      payMonthModal={payMonthModal}
      setPayMonthModal={setPayMonthModal}
      startDay={startDay}
      setStartDay={setStartDay}
      endDay={endDay}
      setEndDay={setEndDay}
      endDayCheck={endDayCheck}
      setEndDayCheck={setEndDayCheck}
      setPayDay={setPayDay}
      setPayMonth={setPayMonth}
      name={EMP_NAME}
      click1={click1}
      setClick1={setClick1}
      click2={click2}
      setClick2={setClick2}
      click5={click5}
      setClick5={setClick5}
      authorityCheck={authorityCheck}
      setAuthorityCheck={setAuthorityCheck}
      alertModal={alertModal}
      explainModal={explainModal}
      positionCheck={positionCheck}
      setPositionCheck={setPositionCheck}
      restTypeCheck={restTypeCheck}
      setRestTypeCheck={setRestTypeCheck}
      restTime={restTime}
      setRestTime={setRestTime}
      isStartDayModalVisible={isStartDayModalVisible}
      setIsStartDayModalVisible={setIsStartDayModalVisible}
      isEndDayModalVisible={isEndDayModalVisible}
      setIsEndDayModalVisible={setIsEndDayModalVisible}
      isProbationPeriodModalVisible={isProbationPeriodModalVisible}
      setIsProbationPeriodModalVisible={setIsProbationPeriodModalVisible}
      isProbationPercentModalVisible={isProbationPercentModalVisible}
      setIsProbationPercentModalVisible={setIsProbationPercentModalVisible}
      isSalaryModalVisible2={isSalaryModalVisible2}
      setIsSalaryModalVisible2={setIsSalaryModalVisible2}
      payCheck={payCheck}
      pay={pay}
      setPay={setPay}
      pay2={pay2}
      setPay2={setPay2}
      pay3={pay3}
      setPay3={setPay3}
      pay4={pay4}
      setPay4={setPay4}
      pay5={pay5}
      setPay5={setPay5}
      setPayCheck={setPayCheck}
      total={total}
      probation={probation}
      setProbation={setProbation}
      probationPeriod={probationPeriod}
      setProbationPeriod={setProbationPeriod}
      probationPercent={probationPercent}
      setProbationPercent={setProbationPercent}
      periodCheck={periodCheck}
      setPeriodCheck={setPeriodCheck}
      percentCheck={percentCheck}
      setPercentCheck={setPercentCheck}
      percentDirectInput={percentDirectInput}
      setPercentDirectInput={setPercentDirectInput}
      checkDirectInput2={checkDirectInput2}
      setWeekTypeCheck={setWeekTypeCheck}
      setWeekTime={setWeekTime}
      salarySystemCheck={salarySystemCheck}
      setSalarySystemCheck={setSalarySystemCheck}
      isSalaryModalVisible1={isSalaryModalVisible1}
      setIsSalaryModalVisible1={setIsSalaryModalVisible1}
      isHelpModalVisible={isHelpModalVisible}
      setIsHelpModalVisible={setIsHelpModalVisible}
      deductionTypeCheck={deductionTypeCheck}
      setDeductionTypeCheck={setDeductionTypeCheck}
      insuranceCheck={insuranceCheck}
      setInsuranceCheck={setInsuranceCheck}
      getPeriod={getPeriod}
      payYearCheck={payYearCheck}
      setPayYearCheck={setPayYearCheck}
      payMonthCheck={payMonthCheck}
      setPayMonthCheck={setPayMonthCheck}
      payYearDirectInput={payYearDirectInput}
      setPayYearDirectInput={setPayYearDirectInput}
      PYcheckDirectInput={PYcheckDirectInput}
      weekTypeCheck={weekTypeCheck}
      weekTime={weekTime}
      isEditMode={params?.from !== 'ElectronicContracts'}
    />
  );
};
