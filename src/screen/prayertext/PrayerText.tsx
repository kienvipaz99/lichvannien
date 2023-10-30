import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/header/CustomHeader';
import stylescustom from '../../res/stylescustom';
import images from '../../res/images';
import {listvankhan} from '../../data/vankhan';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import {fonts} from '../../res/fonts';
import {NavigationProp} from '@react-navigation/native';
import {
  chuyenDoiAmLichSangDuongLich,
  chuyenDoiDuongLichSangAmLich,
} from '../../data/chuyendoingay';
export default function PrayerText({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  // const {lunarDay, lunarMonth, lunarYear, lunarLeap} =
  //   chuyenDoiDuongLichSangAmLich(1, 6, 2001, 7);
  // const {ngay, thang, nam} = chuyenDoiAmLichSangDuongLich(30, 2, 2001, 7);
  // console.log(lunarDay, lunarMonth, lunarYear, 'duong', lunarLeap);
  // console.log(ngay, thang, nam, 'am');

  const renderItem = ({item}: {item: PlayerText}) => {
    return (
      <>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate('DetaiPrayerText', {item})}>
          <Text style={styles.txt}>{item.title}</Text>
        </Pressable>
        <View style={styles.line} />
      </>
    );
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Các bài khấn" />
      <View style={stylescustom.container}>
        <ImageBackground
          source={images.bg}
          style={styles.container}
          resizeMode="repeat">
          <Text style={styles.txt1}>Nhưng bài khấn hay sử dụng nhất</Text>
          <View>
            <FlatList
              data={listvankhan}
              renderItem={renderItem}
              style={{marginTop: 20}}
              bounces={false}
              keyExtractor={item => item?.id.toString()}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    width: sizes.width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  txt: {
    color: colors.black,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.045,
    width: sizes.width * 0.8,
  },
  line: {
    backgroundColor: colors.gray1,
    width: sizes.width * 0.9,
    height: 1,
    alignSelf: 'center',
    marginTop: 5,
  },
  txt1: {
    color: colors.black,
    fontSize: sizes.width * 0.055,
    fontFamily: fonts.medium,
    alignSelf: 'center',
    marginTop: 20,
  },
});
