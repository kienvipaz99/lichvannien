import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/header/CustomHeader';
import stylescustom from '../../res/stylescustom';
import {config, getKeycalnedal} from '../../res/callapi/getKeycalnedal';
import axios from 'axios';
import {dinhdangngay, ngaythangnam} from '../../res/converts';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import {fonts} from '../../res/fonts';
import images from '../../res/images';
import {LunarDate} from '../../common/vietnamese-lunar-calendar';
import Loading from '../../components/loading/Loading';
import {weekDays} from '../../data/DataWeekdays';
import {NavigationProp} from '@react-navigation/native';
import ChageDate from './ChageDate';
const title = new Date().getMonth() + 1 + '/' + new Date().getFullYear();
export default function CalendarMonth({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  const [data, setData] = useState<Calendar[]>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const callApi = async () => {
      setLoading(true);
      const {data} = await getKeycalnedal();
      let dataCalendar = await axios.get(
        `https://baomoi.com/_next/data/${data}/utilities/calendar.json?activeTab=month`,
        config,
      );
      setData(dataCalendar?.data?.pageProps?.resp?.data?.content?.entries);

      setLoading(false);
    };
    callApi();
  }, []);
  const RenderItem = ({item}: {item: Calendar}) => {
    const ngay = dinhdangngay(item?.solarDay);
    const ngayam = dinhdangngay(item?.lunarDay);
    let day = new Date(ngay).getDay();
    let ngaygi = new LunarDate(new Date(ngay));

    const currentDate = new Date();
    const isOtherMonth = new Date(ngay).getMonth() !== currentDate.getMonth();
    const hoangdao = Object?.keys(item?.lunarInDay);
    const imageicon =
      hoangdao[0] === 'Ngày Bình thường'
        ? images.start
        : hoangdao[0] === 'Ngày Hắc đạo'
        ? images.start1
        : images.start2;
    let color = isOtherMonth
      ? colors.gray1
      : day === 1
      ? colors.red
      : day === 0
      ? colors.blue1
      : colors.black;

    return (
      <Pressable
        onPress={() =>
          navigation.navigate('DetailCalendar', ngaythangnam(item?.solarDay))
        }
        style={[
          styles.view,
          {borderColor: isOtherMonth ? colors.gray1 : colors.orange},
        ]}>
        <Text style={[styles.txt3, {color: color}]}>
          {new Date(ngay).getDate()}
        </Text>
        <Text style={styles.txt2}>{new Date(ngayam).getDate()}</Text>
        <Image source={imageicon} style={styles.img1} />
        <Text style={styles.txt5}>{ngaygi?.getLunarDate()}</Text>
      </Pressable>
    );
  };
  const RenderContent = () => (
    <>
      <Text style={styles.txt}>{title}</Text>
      <View style={styles.view1}>
        {weekDays.map(day => {
          let color =
            day === 'CN'
              ? colors.red
              : day === 'T7'
              ? colors.blue1
              : colors.black;
          return (
            <Text key={day} style={[styles.txt1, {color: color}]}>
              {day}
            </Text>
          );
        })}
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={RenderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={7}
          columnWrapperStyle={styles.fl}
          style={{marginTop: 5}}
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.view2}>
        <Text style={styles.txt3}>Kí hiệu trên lịch tháng:</Text>
        <View style={stylescustom.row1}>
          <Image source={images.start2} style={styles.img} />
          <Text style={styles.txt4}>Ngày hoàng đạo</Text>
        </View>
        <View style={stylescustom.row1}>
          <Image source={images.start1} style={styles.img} />
          <Text style={styles.txt4}>Ngày hắc đạo</Text>
        </View>
        <View style={stylescustom.row1}>
          <Image source={images.start} style={styles.img} />
          <Text style={styles.txt4}>Ngày bình thường</Text>
        </View>
        <ChageDate navigation={navigation} />
      </View>
    </>
  );

  return (
    <View style={{flex: 1}}>
      <CustomHeader title={`Lịch tháng ${title}`} />
      <View style={stylescustom.container}>
        <FlatList
          data={[]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={null}
          ListFooterComponent={RenderContent}
          ListFooterComponentStyle={{marginBottom: 100}}
        />
      </View>
      {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: (sizes.width * 0.89) / 7,
    alignItems: 'center',
    height: (sizes.width * 0.8) / 4.5,
    borderColor: '#f9e08b',
    borderWidth: 1,
    margin: 3,
    justifyContent: 'center',
  },
  txt: {
    marginTop: sizes.height * 0.03,
    alignSelf: 'center',
    fontFamily: fonts.bold,
    fontSize: sizes.width * 0.055,
    color: colors.blue1,
  },
  fl: {width: sizes.width, alignSelf: 'center'},
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  txt1: {
    width: (sizes.width * 0.89) / 7,
    margin: 3,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
  },
  txt2: {
    color: colors.gray1,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.035,
  },
  txt3: {
    fontSize: sizes.width * 0.045,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  img: {
    height: 20,
    width: 20,
  },
  txt4: {
    fontSize: sizes.width * 0.04,
    fontFamily: fonts.regular,
    color: colors.black,
    marginLeft: 10,
    marginTop: 8,
  },
  view2: {
    width: sizes.width * 0.9,
    alignSelf: 'center',
    marginTop: 20,
  },
  txt5: {
    fontSize: sizes.width * 0.024,
    color: colors.black,
    fontFamily: fonts.regular,
  },
  img1: {height: 10, width: 10},
});
