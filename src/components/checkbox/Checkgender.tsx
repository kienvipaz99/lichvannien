import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {checkbox} from '../../data/checkbox';
import images from '../../res/images';
import {colors} from '../../res/colors';
import {fonts} from '../../res/fonts';
import sizes from '../../res/sizes';

export default function Checkgender({
  setGenderId,
}: {
  setGenderId: (genderId: number) => void;
}) {
  const [gender, setGender] = useState(1);
  return (
    <View style={[styles.row, styles.view2]}>
      {checkbox.map(item => (
        <View style={styles.row} key={item.id}>
          <Pressable
            onPress={() => {
              setGender(item?.strGenderId);
              setGenderId(item?.strGenderId);
            }}>
            <Image
              source={
                gender === item?.strGenderId ? images.checkbox : images.uncheck
              }
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
    justifyContent: 'space-between',
    width: sizes.width * 0.35,
  },
});
