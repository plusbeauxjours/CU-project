import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import ShelfLifeCheckScreenTab from './ShelfLifeCheckScreenTab';

interface TabModel {
  name: string;
  anchor: number;
}

interface TabsProps {
  tabs: TabModel[];
  active?: boolean;
  onMeasurement?: (index: number, measurement: number) => void;
  onPress?: (index: number) => void;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
});

export default ({tabs, active, onMeasurement, onPress}: TabsProps) => (
  <View style={styles.overlay}>
    {tabs?.map((tab, index) => (
      <ShelfLifeCheckScreenTab
        key={index}
        onMeasurement={
          onMeasurement ? onMeasurement.bind(null, index) : undefined
        }
        color={active ? 'white' : 'black'}
        onPress={onPress ? onPress.bind(null, index) : undefined}
        {...tab}
      />
    ))}
  </View>
);
