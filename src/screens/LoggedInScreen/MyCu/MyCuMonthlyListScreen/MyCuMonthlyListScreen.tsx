import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {RefreshControl} from 'react-native';

import {
  setMYCU_MONTHLY,
  setMYCU_MONTHLY_CATEGORY,
} from '../../../../redux/mycuSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';
import MyCuMonthlyCard from './MyCuMonthlyCard';

interface ISelected {
  isSelected: boolean;
}
const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const CategoryList = styled.View`
  padding: 16px 0;
`;

const Category = styled.TouchableOpacity<ISelected>`
  border-radius: 15px;
  height: 30px;
  background-color: ${(props) => (props.isSelected ? '#642A8C' : '#ffffff')};
  border-color: #642a8c;
  border-width: 1px;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  margin-left: 16px;
`;

const CategoryText = styled.Text<ISelected>`
  color: ${(props) => (props.isSelected ? '#ffffff' : '#642A8C')};
`;

export default () => {
  const dispatch = useDispatch();
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
  const {MYCU_MONTHLY, MYCU_MONTHLY_CATEGORY} = useSelector(
    (state: any) => state.mycuReducer,
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchData = async () => {
    try {
      if (MYCU_MONTHLY?.length === 0) {
        dispatch(setSplashVisible(true));
      }
      const {data} = await api.cupdflistcheck(MEMBER_SEQ);
      const categoryListArray = ['전체'];
      if (data.message === 'SUCCESS') {
        if (Array.isArray(data.result)) {
          for (const i of data.result) {
            if (!categoryListArray.includes(i.PDF_YEAR)) {
              categoryListArray.push(i.PDF_YEAR);
            }
          }
        }
        dispatch(setMYCU_MONTHLY(data.result));
        dispatch(setMYCU_MONTHLY_CATEGORY(categoryListArray));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const CategoryListRenderItem = (item, index) => {
    const isSelected = item === selectedCategory;
    return (
      <Category
        key={index}
        isSelected={isSelected}
        onPress={() => {
          setSelectedCategory(item);
        }}>
        <CategoryText isSelected={isSelected}>{item}</CategoryText>
      </Category>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectData = MYCU_MONTHLY?.filter((data) => {
    return selectedCategory === '전체' || selectedCategory === data.PDF_YEAR;
  });

  return (
    <BackGround>
      <CategoryList>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={MYCU_MONTHLY_CATEGORY}
          horizontal={true}
          renderItem={({item, index}) => CategoryListRenderItem(item, index)}
        />
      </CategoryList>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{alignItems: 'center', padding: 20}}>
        {selectData?.map((item, index) => (
          <MyCuMonthlyCard
            KEY={index}
            PDF_URL={item.PDF_URL}
            IMG_URL2={item.IMG_URL2}
            CONTENTS2={item.CONTENTS2}
            PDF_SEQ={item.PDF_SEQ}
            IMG_URL={item.IMG_URL}
            PDF_YEAR={item.PDF_YEAR}
            PDFCHECK_SEQ={item.PDFCHECK_SEQ}
            CONTENTS={item.CONTENTS}
          />
        ))}
      </ScrollView>
    </BackGround>
  );
};
