import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {checkboxDate} from '../../data/checkbox';
import images from '../../res/images';
import {colors} from '../../res/colors';
import {fonts} from '../../res/fonts';
import sizes from '../../res/sizes';
export default function CheckTypeDate({
  setGenderId,
  gender,
}: {
  setGenderId: (genderId: number) => void;
  gender: number;
}) {
  return (
    <View style={[styles.row, styles.view2]}>
      {checkboxDate.map(item => (
        <View style={styles.row} key={item.id}>
          <Pressable
            onPress={() => {
              setGenderId(item?.id);
            }}>
            <Image
              source={gender === item?.id ? images.checkbox : images.uncheck}
              style={styles.img}
            />
          </Pressable>
          <Text style={[styles.txt1, {marginLeft: 8}]}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {height: 30, width: 30, tintColor: colors.orange},
  txt1: {
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
    color: colors.black,
  },
  view2: {
    alignSelf: 'flex-start',
    marginTop: 20,
    justifyContent: 'space-around',
    width: sizes.width * 0.9,
    zIndex: -1,
  },
});
