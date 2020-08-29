import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setAlertVisible, setAlertInfo} from '../../../../redux/alertSlice';
import SetEmployeeInfoScreenPresenter from './SetEmployeeInfoScreenPresenter';
import {setSplashVisible} from '../../../../redux/splashSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {image, name, from, depth, STORE_SEQ, EMP_SEQ, onRefresh} = params;

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
  const [startDayButton, setStartDayButton] = useState<boolean>(false);
  const [endDayButton, setEndDayButton] = useState<boolean>(false);
  const [markedDatesS, setMarkedDatesS] = useState<any>({});
  const [markedDatesE, setMarkedDatesE] = useState<any>({});

  ///// STEP 2 /////
  const [click2, setClick2] = useState<boolean>(false);
  const [payCheck, setPayCheck] = useState<[boolean, boolean, boolean]>([
    true,
    false,
    false,
  ]); //  [시급,일급,월급 ]
  const [payDayCheck, setPayDayCheck] = useState<boolean>(false);
  const [payYear, setPayYear] = useState<string>(moment().format('YY')); //  급여 적용 시작 연도
  const [payMonth, setPayMonth] = useState<string>(moment().format('MM')); //  급여 적용 시작 월
  const [payDay, setPayDay] = useState<string>(moment().format('YYYY-MM-DD')); //  급여 적용 시작 년월
  const [payYearModal, setPayYearModal] = useState<boolean>(false);
  const [payMonthModal, setPayMonthModal] = useState<boolean>(false);
  const [payYearCheck, setPayYearCheck] = useState<any>(new Array(4));
  const [payMonthCheck, setPayMonthCheck] = useState<any>(new Array(12));
  const [payYearDirectInput, setPayYearDirectInput] = useState<string>('');
  const [MINPAY, setMINPAY] = useState<string>('');

  ///// STEP 3 /////
  const [pay, setPay] = useState<string>(''); //  pay
  const [pay1, setPay1] = useState<string>(''); //  pay1
  const [pay2, setPay2] = useState<string>(''); //  pay2
  const [pay3, setPay3] = useState<string>(''); //  pay3
  const [pay4, setPay4] = useState<string>(''); //  pay4
  const [pay5, setPay5] = useState<string>(''); //  pay5
  const [totalPay, setTotalPay] = useState<string>('');

  ///// 수습 /////
  const [probation, setProbation] = useState<boolean>(false);
  const [markedDatesP, setMarkedDatesP] = useState<any>({});
  const [probationPeriod, setProbationPeriod] = useState<string>('');
  const [probationPercent, setProbationPercent] = useState<string>('');
  const [
    isProbationPercentModalVisible,
    setIsProbationPercentModalVisible,
  ] = useState<boolean>(false);
  const [periodCheck, setPeriodCheck] = useState<any>(new Array(4));
  const [percentCheck, setPercentCheck] = useState<any>(new Array(4));
  const [periodDirectInput, setPeriodDirectInput] = useState<string>('');
  const [percentDirectInput, setPercentDirectInput] = useState<string>('');

  ///// STEP 4 /////
  const [click3, setClick3] = useState<boolean>(false);
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
  const [weekTime, setWeekTime] = useState<string>('0'); //  weekTypeCheck[1]이 true일 경우
  const [restTypeCheck, setRestTypeCheck] = useState<[boolean, boolean]>([
    false,
    true,
  ]); //  [(수동) 일 휴게시간 입력, (자동) 근로기준법 기준]
  const [restTime, setRestTime] = useState<string>('0'); //  restTypeCheck[1]이 true일 경우
  const [insuranceCheck, setInsuranceCheck] = useState<
    [boolean, boolean, boolean, boolean]
  >([true, true, true, true]); //  국민연금, 건강보험, 고용보험, 산재보험]
  const [MODIFYCOUNT, setMODIFYCOUNT] = useState<string>('');
  const [HELPMODALTEXT, setHELPMODALTEXT] = useState<string>('');

  ///// STEP 5 /////
  const [click5, setClick5] = useState<boolean>(false);
  const [positionCheck, setPositionCheck] = useState<[boolean, boolean]>([
    true,
    false,
  ]); //  [직원, 점장]
  const [authorityCheck, setAuthorityCheck] = useState<
    [boolean, boolean, boolean, boolean, boolean]
  >([false, false, false, false, false]); //  [선택 시 본인급여 확인 가능, [점장] 타 직원급여 확인 및 수정 가능, [점장] 직원 일정 수정 가능, [점장] 타 직원 출퇴근 알람 받기]
  const [CALCULATE_DAY, setCALCULATE_DAY] = useState<string>('1');

  const alertModal = (text) => {
    const params = {
      type: 'alert',
      title: '',
      content: text,
    };

    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const explainModal = (text) => {
    const params = {
      type: 'explain',
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
      Number(pay1) + Number(pay2) + Number(pay3) + Number(pay4) + Number(pay5);
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const startDayFn = (day) => {
    let markedDates = {};
    markedDates[day.dateString] = {
      selected: true,
      selectedColor: '#5887F9',
    };
    setStartDay(day.dateString);
    setMarkedDatesS(markedDates);
  };

  const endDayFn = (day) => {
    let markedDates = {};
    markedDates[day.dateString] = {
      selected: true,
      selectedColor: '#5887F9',
    };
    setEndDay(day.dateString);
    setMarkedDatesE(markedDates);
  };

  const probationDayFn = (day) => {
    let markedDates = {};
    markedDates[day.dateString] = {
      selected: true,
      selectedColor: '#5887F9',
    };
    setProbationPeriod(day.dateString);
    setMarkedDatesP(markedDates);
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
      if (pay1 === '') {
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
      let response = await fetch(
        'http://133.186.209.113:80/api/v2/Employee/update',
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            FIRST: MODIFYCOUNT,
            START_TYPE: START_TYPE,
            STORE_SEQ: STORE_SEQ.toString(),
            EMP_SEQ: EMP_SEQ.toString(),
            // ↓ STEP 1
            START: startDay.toString(),
            END: endDayCheck === true ? null : endDay.toString(),
            // ↓ STEP 2
            PAY_TYPE: payCheck.toString(),
            MEALS: payCheck[2] === true ? pay2.toString() : '0'.toString(),
            SELF_DRIVING:
              payCheck[2] === true ? pay3.toString() : '0'.toString(),
            BONUS: payCheck[2] === true ? pay4.toString() : '0'.toString(),
            INCENTIVE: payCheck[2] === true ? pay5.toString() : '0'.toString(),
            PAY: payCheck[2] === true ? pay1.toString() : pay.toString(),
            PAY_START: payDay.toString(),
            // ↓ STEP 3
            THREE_ALLOWANCE:
              salarySystemCheck[0] === true ? '1'.toString() : '0'.toString(),
            WEEKEND_ALLOWANCE:
              salarySystemCheck[1] === true ? '1'.toString() : '0'.toString(),
            WeekType: weekTypeCheck.toString(),
            WeekTime: Number(weekTime).toString(),
            REST_ALLOWANCE:
              salarySystemCheck[2] === true ? '1'.toString() : '0'.toString(),
            RestType: restTypeCheck.toString(),
            RestTime: Number(restTime).toString(),
            Week_START: payDay.toString(),
            insurance: deductionTypeCheck.toString(),
            insurance_START: payDay.toString(),
            // 수습
            probation: probation ? '1'.toString() : '0'.toString(),
            probationDATE: probationPeriod.toString(),
            probationPercent: probationPercent.toString(),
            health: insuranceCheck[1] ? '1'.toString() : '0'.toString(),
            pension: insuranceCheck[0] ? '1'.toString() : '0'.toString(),
            employment: insuranceCheck[2] ? '1'.toString() : '0'.toString(),
            accident: insuranceCheck[3] ? '1'.toString() : '0'.toString(),
            // ↓ STEP 5
            IS_MANAGER:
              positionChecked !== -1
                ? positionChecked.toString()
                : '0'.toString(),
            PAY_SHOW:
              authorityCheck[0] === true ? '1'.toString() : '0'.toString(),
            OTHERPAY_SHOW:
              authorityCheck[1] === true ? '1'.toString() : '0'.toString(),
            CalendarEdit:
              authorityCheck[2] === true ? '1'.toString() : '0'.toString(),
            PUSH: authorityCheck[3] === true ? '1'.toString() : '0'.toString(),
            STOREPAY_SHOW:
              authorityCheck[4] === true ? '1'.toString() : '0'.toString(),
          }),
        },
      );
      const json = await response.json();
      if (json.message == 'SUCCESS') {
        if (from === 'EmployeeInfoScreen') {
          alertModal('직원정보가 수정되었습니다.');
          navigation.goBack();
          onRefresh();
        } else if (from === 'ElectronicContracts') {
          const CALCULATE_DAY = params?.CALCULATE_DAY;
          const image = params?.image;
          const name = params?.name;
          const EMP_SEQ = params?.EMP_SEQ;
          const STORE_SEQ = params?.STORE_SEQ;
          const STORE_NAME = params?.STORE_NAME;

          let payChecked = payCheck.indexOf(true);

          navigation.navigate('EmployeeScheduleMainScreen', {
            CALCULATE_DAY,
            image,
            name,
            EMP_SEQ,
            STORE_SEQ,
            STORE_NAME,
            START: startDay,
            END: endDayCheck === true ? null : endDay,
            POSITION: positionChecked !== -1 ? String(positionChecked) : '0',
            PAY_TYPE: String(payChecked),
            PAY: payCheck[2] === true ? pay1 : pay,
          });
        }
      }
    } catch (error) {
      alertModal('통신이 원활하지 않습니다.');
      console.log(error);
      return;
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const fetchData = async () => {
    try {
      let response = await fetch(
        `http://133.186.209.113:80/api/v2/Employee/get?EMP_SEQ=${EMP_SEQ}`,
      );
      let json = await response.json();

      if (json.message === 'SUCCESS') {
        let payChecked = JSON.parse(JSON.stringify(payCheck)); // 급여 유형
        let deductionTypeChecked = JSON.parse(
          JSON.stringify(deductionTypeCheck),
        ); // 공제유형
        let positionChecked = JSON.parse(JSON.stringify(positionCheck));
        let salarySystemChecked = JSON.parse(JSON.stringify(salarySystemCheck));
        let weekTypeChecked = JSON.parse(JSON.stringify(weekTypeCheck));
        let restTypeChecked = JSON.parse(JSON.stringify(restTypeCheck));
        let authorityChecked = JSON.parse(JSON.stringify(authorityCheck));

        payChecked.fill(false);
        payChecked[Number(json.result.PAY_TYPE)] = true;

        salarySystemCheck.fill(false);
        weekTypeChecked.fill(false);
        restTypeChecked.fill(false);
        if (json.result.THREE_ALLOWANCE === '1') {
          salarySystemChecked[0] = true;
        }

        if (json.result.WEEKEND_ALLOWANCE === '1') {
          salarySystemChecked[1] = true;
        }
        weekTypeChecked[Number(json.result.WeekType)] = true;
        if (json.result.REST_ALLOWANCE === '1') {
          salarySystemChecked[2] = true;
        }
        restTypeChecked[Number(json.result.RestType)] = true;
        deductionTypeChecked.fill(false);
        if (json.result.insurance === '2') {
          deductionTypeChecked[0] = true; // 2: 4대보험
        } else if (json.result.insurance === '1') {
          deductionTypeChecked[1] = true; // 1: 프리랜서
        } else {
          deductionTypeChecked[2] = true; // 0: 없음
        }

        positionChecked.fill(false);
        positionChecked[Number(json.result.IS_MANAGER)] = true;

        authorityChecked.fill(false);
        if (json.result.IS_MANAGER === '1') {
          if (json.result.OTHERPAY_SHOW === '1') authorityChecked[1] = true;
          if (json.result.CalendarEdit === '1') authorityChecked[2] = true;
          if (json.result.PUSH === '1') authorityChecked[3] = true;
          if (json.result.STOREPAY_SHOW === '1') authorityChecked[4] = true;
        }
        if (json.result.PAY_SHOW === '1') authorityChecked[0] = true;
        let insuranceChecked = insuranceCheck;

        if (json.result.pension === '1') {
          insuranceChecked[0] = true; // 국민연금
        } else {
          insuranceChecked[0] = false;
        }
        if (json.result.health === '1') {
          insuranceChecked[1] = true; // 건강보험
        } else {
          insuranceChecked[1] = false;
        }
        if (json.result.employment === '1') {
          insuranceChecked[2] = true; // 고용보험
        } else {
          insuranceChecked[2] = false;
        }
        if (json.result.accident === '1') {
          insuranceChecked[3] = true; // 산재보험
        } else {
          insuranceChecked[3] = false;
        }
        if (from === 'EmployeeInfoScreen') {
          setStartDay(json.result.START);
          setEndDay(json.result.END ? json.result.END : '');
          setEndDayCheck(json.result.END ? false : true);

          // ↓ STEP 2(급여정보 입력)
          setPayCheck(payCheck);
          setPayDay(json.result.PAY_START);

          setPay(json.result.PAY_TYPE !== '2' ? json.result.PAY : '');
          setPay1(json.result.PAY_TYPE === '2' ? json.result.PAY : '');
          setPay2(json.result.PAY_TYPE === '2' ? json.result.MEALS : '');
          setPay3(json.result.PAY_TYPE === '2' ? json.result.SELF_DRIVING : '');
          setPay4(json.result.PAY_TYPE === '2' ? json.result.BONUS : '');
          setPay5(json.result.PAY_TYPE === '2' ? json.result.INCENTIVE : '');

          //수습
          setProbation(json.result.probation == '1' ? true : false);
          setProbationPeriod(
            json.result.probation == '1' ? json.result.probationDATE : '',
          );
          setProbationPercent(
            json.result.probation == '1' ? json.result.probationPercent : '',
          );

          // ↓ STEP 3(급여 상세정보 입력)
          setSalarySystemCheck(salarySystemCheck);
          setWeekTypeCheck(weekTypeCheck);
          setWeekTime(
            weekTypeCheck[0] === true
              ? Number(json.result.WeekTime).toString()
              : '0',
          );
          setRestTypeCheck(restTypeCheck);
          setRestTime(
            restTypeCheck[0] === true
              ? Number(json.result.RestTime).toString()
              : '0',
          );
          setDeductionTypeCheck(deductionTypeCheck);
          setInsuranceCheck(insuranceCheck);
          setMODIFYCOUNT(json.result.FIRST); // 첫번째 적용 확인 구분값
          setHELPMODALTEXT(json.resultdata.HELP); // 적용시작월 모달 텍스트
          setCALCULATE_DAY(json.resultdata.CAL); // 급여정산일
          setMINPAY(json.resultdata.MINPAY); // 최저시급

          // ↓ STEP 5(직책/권한 설정)
          setPositionCheck(positionCheck);
          setAuthorityCheck(authorityCheck);
        } else {
          setSTART_TYPE('1');
          setMODIFYCOUNT('1'); // 첫번째 적용 확인 구분값
          setCALCULATE_DAY(json.resultdata.CAL); // 급여정산일
          setMINPAY(json.resultdata.MINPAY); // 최저시급
        }
      }
    } catch (error) {
      console.log(error);
      alertModal('통신이 원활하지 않습니다.');
      navigation.goBack();
    }
  };

  useEffect(() => {
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
      endDay={endDay}
      endDayCheck={endDayCheck}
      setEndDayCheck={setEndDayCheck}
      setPayDay={setPayDay}
      setPayMonth={setPayMonth}
      image={image}
      name={name}
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
      setMarkedDatesE={setMarkedDatesE}
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
      MINPAY={MINPAY}
      pay={pay}
      setPay={setPay}
      pay1={pay1}
      setPay1={setPay1}
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
      periodDirectInput={periodDirectInput}
      setPeriodDirectInput={setPeriodDirectInput}
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
      CALCULATE_DAY={CALCULATE_DAY}
      payYearCheck={payYearCheck}
      setPayYearCheck={setPayYearCheck}
      payMonthCheck={payMonthCheck}
      setPayMonthCheck={setPayMonthCheck}
      payYearDirectInput={payYearDirectInput}
      setPayYearDirectInput={setPayYearDirectInput}
      PYcheckDirectInput={PYcheckDirectInput}
      weekTypeCheck={weekTypeCheck}
      weekTime={weekTime}
    />
  );
};
