import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {RefreshControl} from 'react-native';

import api from '../../../../constants/LoggedInApi';
import MyCuMonthlyCard from '../../../../components/MyCuMonthlyCard';

interface ISelected {
  isSelected: boolean;
}
const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: grey;
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
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [dataList, setDataList] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchData = async () => {
    try {
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
      }
      setDataList(data.result);
      setCategoryList(categoryListArray);
    } catch (error) {
      console.log(error);
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

  const selectData = dataList.filter((data) => {
    const selectedCategorya = selectedCategory;
    return selectedCategorya === '전체' || selectedCategorya === data.PDF_YEAR;
  });

  return (
    <BackGround>
      <CategoryList>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={categoryList}
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
        {selectData?.map((item, index) => {
          return (
            <MyCuMonthlyCard
              KEY={index}
              PDF_URL={item.PDF_URL}
              PDF_MONTH={item.PDF_MONTH}
              IMG_URL2={item.IMG_URL2}
              CONTENTS2={item.CONTENTS2}
              PDF_SEQ={item.PDF_SEQ}
              IMG_URL={item.IMG_URL}
              PDF_YEAR={item.PDF_YEAR}
              PDFCHECK_SEQ={item.PDFCHECK_SEQ}
              CONTENTS={item.CONTENTS}
              selectedCategory={selectedCategory}
            />
          );
        })}
      </ScrollView>
    </BackGround>
  );
};