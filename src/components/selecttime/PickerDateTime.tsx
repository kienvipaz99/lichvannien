import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import {sonam, songaytrongthang, sonthang} from '../../data/chuyendoingay';
import sizes from '../../res/sizes';
import {fonts} from '../../res/fonts';
import {colors} from '../../res/colors';

export default function PickerDateTime({
  setDay,
  setMonth,
  setYear,
}: {
  setDay: (val: number) => void;
  setMonth: (val: number) => void;
  setYear: (val: number) => void;
}) {
  return (
    <View style={styles.view}>
      <SelectList
        data={songaytrongthang()}
        setSelected={setDay}
        boxStyles={styles.view1}
        placeholder="ngày"
        fontFamily={fonts.regular}
        dropdownStyles={styles.view2}
        search={false}
        dropdownTextStyles={styles.txt}
        inputStyles={styles.txt}
      />
      <SelectList
        data={sonthang()}
        setSelected={setMonth}
        boxStyles={styles.view1}
        placeholder="tháng"
        fontFamily={fonts.regular}
        search={false}
        dropdownStyles={styles.view2}
        save={'value'}
        dropdownTextStyles={styles.txt}
        inputStyles={styles.txt}
      />
      <SelectList
        data={sonam()}
        setSelected={setYear}
        boxStyles={styles.view1}
        placeholder="năm"
        fontFamily={fonts.regular}
        search={false}
        dropdownStyles={styles.view2}
        dropdownTextStyles={styles.txt}
        inputStyles={styles.txt}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: sizes.width * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: sizes.width * 0.8,
    alignSelf: 'center',
  },
  view1: {
    width: sizes.width * 0.25,
    backgroundColor: colors.white,
  },
  view2: {
    width: sizes.width * 0.25,
    backgroundColor: colors.white,
    zIndex: 10,
    height: sizes.height * 0.17,
    top: sizes.height * 0.05,
    position: 'absolute',
  },
  txt: {
    color: colors.black,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
  },
});
