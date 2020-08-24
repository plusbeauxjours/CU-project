import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {RefreshControl} from 'react-native';

import api from '../../../../constants/LoggedInApi';
import MyCuVideoCard from './MyCuVideoCard';

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
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const categoryList = [
    {
      key: '0',
      text: '전체',
    },
    {
      key: '1',
      text: '노무',
    },
    {
      key: '2',
      text: '3분상생',
    },
    {
      key: '3',
      text: '설명가이드',
    },
    {
      key: '4',
      text: '기타',
    },
  ];
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [dataList, setDataList] = useState<[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('0');

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
      const {data} = await api.cuvideolistcheck(MEMBER_SEQ);
      if (data.message === 'SUCCESS') {
        if (Array.isArray(data.result)) {
          for (const i of data.result) {
            const categoryArray = i.CATEGORY.split('@');
            i.CATEGORY = categoryArray;
          }
        }
      }
      setDataList(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const CategoryListRenderItem = (item, index) => {
    const isSelected = item.key.toString() === selectedCategory;
    return (
      <Category
        key={index}
        isSelected={isSelected}
        onPress={() => {
          setSelectedCategory(item.key.toString());
        }}>
        <CategoryText isSelected={isSelected}>{item.text}</CategoryText>
      </Category>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectData = dataList.filter((data: any) => {
    return (
      selectedCategory === categoryList[0].key ||
      data.CATEGORY.includes(selectedCategory)
    );
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
        {selectData?.map((item: any, index) => {
          return (
            <MyCuVideoCard
              KEY={index}
              VIDEO_SEQ={item.VIDEO_SEQ}
              CATEGORY={item.CATEGORY}
              VIDEO_URL={item.VIDEO_URL}
              IMG_URL2={item.IMG_URL2}
              CONTENTS2={item.CONTENTS2}
              IMG_URL={item.IMG_URL}
              VIDEOCHECK_SEQ={item.VIDEOCHECK_SEQ}
              CONTENTS={item.CONTENTS}
              categoryList={categoryList}
            />
          );
        })}
      </ScrollView>
    </BackGround>
  );
};
