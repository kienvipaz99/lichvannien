import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Pressable,
} from 'react-native';
import {LunarDate, SolarDate} from 'vietnamese-lunar-calendar';
import sizes from '../../res/sizes';
import {fonts} from '../../res/fonts';
import {colors} from '../../res/colors';
import {chuyenDoiNgay, days} from '../../res/converts';
import {ListImage} from '../../data/ListImage';
import {ListCadao} from '../../data/ListCadao';
import {NavigationProp} from '@react-navigation/native';
import stylescustom from '../../res/stylescustom';
import images from '../../res/images';
let ngay = new Date()?.getDate();
interface LichVanNienProps {
  navigation: NavigationProp<Record<string, any>>;
}
const Calendar = (props: LichVanNienProps) => {
  const newArray = days().map((date, index) => ({
    date,
    image: ListImage[index % ListImage.length],
    cadao: ListCadao[index % ListCadao.length],
  })) as [];
  const flatListRef = React.useRef<FlatList>(null);
  const homnay = () => {
    flatListRef?.current?.scrollToIndex({
      index: ngay - 1,
      animated: true,
    });
  };
  const RenderItem = ({
    item,
  }: {
    item: {image: number; date: string; cadao: string};
  }) => {
    const ngayduong = new SolarDate(new Date(item.date));
    const colorDay = ngayduong.weekDay == 'SUNDAY' ? '#ED214A' : colors.blue;
    const ngayam = new LunarDate(new Date(item.date));

    return (
      <ImageBackground style={styles.container} source={item?.image}>
        <SafeAreaView style={styles.container}>
          <View style={styles.view1}>
            <Pressable style={styles.btn} onPress={homnay}>
              <Text style={styles.txt6}>Hôm nay</Text>
            </Pressable>
            <Text style={styles.txt}>
              {ngayduong.month}/{ngayduong.year}
            </Text>
            <Pressable
              style={styles.btn}
              onPress={() =>
                props.navigation.navigate('DetailCalendar', ngayduong)
              }>
              <Text style={styles.txt6}>Chi tiết</Text>
            </Pressable>
          </View>
          <Text style={[styles.txtday, {color: colorDay}]}>
            {ngayduong.date}
          </Text>
          <Text style={styles.txt3}>
            {ngayduong.holiday
              ? ngayduong.holiday
              : ngayam.holiday
              ? ngayam.holiday
              : item?.cadao}
          </Text>
          <View style={styles.view8}>
            <Text style={[{color: colorDay}, styles.txt8]}>
              {chuyenDoiNgay(ngayduong.weekDay)}
            </Text>

            <View style={styles.view3}>
              <View>
                <View style={styles.view4}>
                  <Text style={styles.txt1}>Ngày</Text>
                  <Text style={styles.txt2}>{ngayam.getLunarDate()}</Text>
                </View>
                <View style={styles.view4}>
                  <Text style={styles.txt1}>Giờ</Text>
                  <Text style={styles.txt4}>{ngayam.toString()}</Text>
                </View>
              </View>
              <ImageBackground source={images.aa} style={styles.view5}>
                <Text
                  style={[
                    styles.txt5,
                    {color: colors.blue, fontSize: sizes.width * 0.09},
                  ]}>
                  {ngayam.date}
                </Text>
                <View style={styles.view6} />
                <Text style={[styles.txt5, {color: colors.red}]}>
                  {ngayam.month}
                </Text>
              </ImageBackground>
              <View>
                <View style={styles.view4}>
                  <Text style={styles.txt1}>Tháng</Text>
                  <Text style={styles.txt2}>{ngayam.getLunarMonth()}</Text>
                </View>
                <View style={styles.view4}>
                  <Text style={styles.txt1}>Năm</Text>
                  <Text style={styles.txt4}>{ngayam.getLunarYear()}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.txt10}>Giờ hoàng đạo</Text>
            <Text style={styles.txt9}>{ngayam.luckyHours}</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  };
  const getItemLayout = (item: any, index: any) => {
    return {
      length: sizes.width,
      offset: sizes.width * index,
      index,
    };
  };
  return (
    <FlatList
      ref={flatListRef}
      data={newArray}
      renderItem={RenderItem}
      horizontal
      keyExtractor={(item, index) => index?.toString()}
      showsHorizontalScrollIndicator={false}
      decelerationRate={'fast'}
      pagingEnabled
      getItemLayout={getItemLayout}
      initialScrollIndex={ngay - 1}
      bounces={false}
    />
  );
};
export default Calendar;
const styles = StyleSheet.create({
  cadao: {
    alignSelf: 'center',
    alignItems: 'center',
    width: sizes.width * 0.8,
    marginTop: sizes.height * 0.01,
  },
  txt: {
    color: colors.red,
    fontSize: sizes.width * 0.06,
    fontFamily: fonts.bold,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,

    elevation: 4,
  },
  txt1: {
    color: colors.black,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
  },
  txt2: {
    color: colors.red,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
  },
  txt3: {
    color: colors.blue1,
    fontFamily: fonts.bold,
    fontSize: sizes.width * 0.05,
    marginTop: sizes.height * 0.1,
    textAlign: 'center',
    ...stylescustom.shadowitem,
  },
  txt4: {
    color: colors.blue,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
  },
  view1: {
    marginTop: sizes.height * 0.03,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: sizes.width * 0.9,
    alignSelf: 'center',
  },
  txtday: {
    alignSelf: 'center',
    textShadowColor: 'white',
    textShadowOffset: {width: 2, height: -2},
    textShadowRadius: 2,
    elevation: 5,
    fontFamily: fonts.bold,
    fontSize: 150,
    shadowOpacity: 0.25,
  },
  view4: {
    alignItems: 'center',
    width: (sizes.width * 0.8) / 3,
    marginTop: sizes.height * 0.02,
  },
  view5: {
    height: sizes.width * 0.25,
    width: sizes.width * 0.25,
    backgroundColor: colors.gray,
    borderRadius: (sizes.width * 0.25) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt8: {
    fontSize: sizes.width * 0.08,
    alignSelf: 'center',
    textShadowColor: 'white',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 2,
    elevation: 5,
    fontFamily: fonts.bold,
  },
  txt5: {
    fontFamily: fonts.medium,
    fontSize: sizes.width * 0.07,
  },
  txt6: {fontFamily: fonts.regular, color: colors.black, fontSize: 16},
  container: {flex: 1, width: sizes.width},
  view3: {
    width: sizes.width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: sizes.height * 0.05,
  },
  view6: {
    width: sizes.width * 0.15,
    backgroundColor: colors.red,
    height: 1,
  },

  btn: {
    backgroundColor: colors.white,
    height: 35,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  view7: {
    position: 'absolute',
    bottom: sizes.height * 0.25,
    alignSelf: 'center',
  },
  txt9: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: sizes.width * 0.04,
    color: colors.colorapp,
    fontFamily: fonts.regular,
    width: sizes.width * 0.9,
    alignSelf: 'center',
  },
  txt10: {
    textAlign: 'center',
    marginTop: 30,
    color: colors.red,
    fontFamily: fonts.bold,
    fontSize: sizes.width * 0.05,
  },
  view8: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: sizes.height * 0.12,
  },
});
