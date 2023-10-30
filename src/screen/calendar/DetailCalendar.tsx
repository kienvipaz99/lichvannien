import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {config, getKeycalnedal} from '../../res/callapi/getKeycalnedal';
import axios from 'axios';
import CustomHeader from '../../components/header/CustomHeader';
import {NavigationProp} from '@react-navigation/native';
import Loading from '../../components/loading/Loading';
import sizes from '../../res/sizes';
import images from '../../res/images';
import {fonts} from '../../res/fonts';
import {colors} from '../../res/colors';
import GetTime from '../../components/time/GetTime';
import stylescustom from '../../res/stylescustom';
import {
  giohoangdao,
  loaiBoHTML,
  tachchuoidoi,
  tachngayam,
} from '../../res/converts';
import {LunarDate} from '../../common/vietnamese-lunar-calendar/build/model/lunar';

const DetailCalendar = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<Record<string, any>>;
  route: {params: DayCalendar};
}) => {
  const [loading, setLoading] = useState(false);

  const {date, month, year} = route.params;
  const ngayam = new LunarDate(new Date(`${year}-${month}-${date}`));
  const [data, setData] = useState<Calendar>();

  useEffect(() => {
    const callApi = async () => {
      setLoading(true);
      try {
        const {data} = await getKeycalnedal();
        let dataCalendar = await axios.get(
          `https://baomoi.com/_next/data/${data}/utilities/calendar.json?activeTab=day&day=${year}${month}${date}`,
          config,
        );
        setData(dataCalendar?.data?.pageProps?.resp?.data?.content?.entries[0]);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    callApi();
  }, []);

  const timeLuna = () => {
    if (data) {
      return (
        <>
          {Object?.keys(data?.lunarInHour).map((key, index) => (
            <View key={index} style={styles.view3}>
              <Text style={styles.txt3}>{key}</Text>
              <Text
                style={[
                  styles.txt4,
                  {
                    marginLeft: 30,
                    width: sizes.width * 0.4,
                  },
                ]}>
                {/* @ts-ignore */}
                {giohoangdao(data?.lunarInHour?.[key])}
              </Text>
            </View>
          ))}
        </>
      );
    }
  };
  return (
    <View style={styles.conten}>
      <CustomHeader
        title={`${date}-${month}-${year}`}
        back
        onBackPress={navigation}
      />
      <View style={stylescustom.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{data?.solarInfo?.['Tháng năm']}</Text>
          <ImageBackground
            source={images.bgday}
            tintColor={colors.orange}
            style={styles.img}>
            <Text style={styles.txtthu}>{data?.solarInfo?.Thứ}</Text>
            <Text style={styles.txtday}>{data?.solarInfo?.Ngày}</Text>
          </ImageBackground>
          <Text style={styles.danhngon}>{data?.solarInfo?.['Danh ngôn']}</Text>
          <Text style={styles.tacgia}>{data?.solarInfo?.['Tác giả']}</Text>
          <ImageBackground
            source={images.bg}
            style={styles.img2}
            resizeMode="repeat">
            <View style={stylescustom.row2}>
              <Image source={images[1]} style={styles.img1} />
              <Image source={images[2]} style={styles.img1} />
            </View>
            <View style={styles.view}>
              <View style={styles.al}>
                <GetTime data={data?.lunarInHour} />
              </View>
              <View style={styles.al}>
                <Text>Ngày</Text>
                <Text style={styles.txt}>
                  {tachngayam(data?.lunarDay).ngay}
                </Text>
                <Text style={styles.txt1}>{ngayam?.getLunarDate()}</Text>
              </View>
              <View style={styles.al}>
                <Text>Tháng</Text>
                <Text style={styles.txt}>
                  {tachngayam(data?.lunarDay).thang}
                </Text>
                <Text style={styles.txt1}>{ngayam?.getLunarMonth()}</Text>
              </View>
              <View style={styles.al}>
                <Text>Năm</Text>
                <Text style={styles.txt}>{tachngayam(data?.lunarDay).nam}</Text>
                <Text style={styles.txt1}>{ngayam?.getLunarYear()}</Text>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.view1}>
              <Text style={styles.txt}>Giờ hoàng đạo</Text>
              <Text style={styles.txt1}>
                {data?.lunarInfo?.['Giờ hoàng đạo']}
              </Text>
              <Text style={[styles.txt, {marginTop: 10}]}>Mệnh ngày</Text>
              <Text style={styles.txt1}>{data?.lunarInfo?.['Mệnh ngày']}</Text>
              <Text style={[styles.txt, {marginTop: 10}]}>Bát tự</Text>
              <Text style={styles.txt1}>{data?.horoscope?.['Bát tự']}</Text>
            </View>
            <View style={stylescustom.row2}>
              <Image source={images[3]} style={styles.img1} />
              <Image source={images[4]} style={styles.img1} />
            </View>
          </ImageBackground>
          <ImageBackground
            resizeMode="repeat"
            source={images.bg}
            style={[styles.img2, {marginBottom: 50}]}>
            <Text style={styles.txt2}>
              {data?.solarInfo?.Thứ}, Ngày {data?.solarInfo?.Ngày}{' '}
              {data?.solarInfo?.['Tháng năm']}
            </Text>
            <Text style={styles.txt3}>
              ({data?.juliusDay?.['Âm lịch']} - Âm lịch)
            </Text>
            <View style={styles.view2}>{timeLuna()}</View>

            {data &&
              Object?.keys(data?.lunarInDay).map(key => {
                const ngay = Object?.keys(data?.lunarInDay);
                //@ts-ignore
                const value = loaiBoHTML(data?.lunarInDay[key]);
                if (
                  key === ngay[0] ||
                  key === 'Cát tinh' ||
                  key === 'Sát tinh' ||
                  key === 'Xuất hành' ||
                  key === 'Mặt trời'
                ) {
                  if (key === 'Mặt trời') {
                    return (
                      <View key={key} style={styles.view4}>
                        <Text style={styles.txt5}>{key}</Text>
                        <Text style={styles.txt9}>
                          {tachchuoidoi(value)?.text1}
                        </Text>
                        <Text style={styles.txt9}>
                          {tachchuoidoi(value)?.text2}
                        </Text>
                      </View>
                    );
                  } else {
                    return (
                      <View key={key} style={styles.view4}>
                        <Text style={styles.txt5}>{key}</Text>
                        <Text style={styles.txt6}>{value}</Text>
                      </View>
                    );
                  }
                } else {
                  if (key == 'Hà Nội' || key == 'TP.Hồ Chí Minh') {
                    return (
                      <View
                        key={key}
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          marginTop: 15,
                        }}>
                        <Text style={styles.txt7}>{key}</Text>
                        <Text style={styles.txt10}>
                          {tachchuoidoi(value)?.text1}
                        </Text>
                        <Text style={styles.txt10}>
                          {tachchuoidoi(value)?.text2}
                        </Text>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        key={key}
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          marginTop: 15,
                        }}>
                        <Text style={styles.txt7}>{key}</Text>
                        <Text style={styles.txt8}>{value}</Text>
                      </View>
                    );
                  }
                }
              })}
          </ImageBackground>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </View>
  );
};

export default DetailCalendar;

const styles = StyleSheet.create({
  conten: {
    flex: 1,
  },
  title: {
    marginTop: 20,
    fontFamily: fonts.bold,
    fontSize: sizes.width * 0.05,
    textTransform: 'uppercase',
    color: colors.blue1,
    alignSelf: 'center',
  },
  img: {
    height: sizes.width * 0.35,
    width: sizes.width * 0.35,
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtthu: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: sizes.width * 0.05,
  },
  txtday: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: sizes.width * 0.09,
  },
  danhngon: {
    width: sizes.width * 0.9,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: fonts.intalic,
    fontSize: sizes.width * 0.04,
    color: colors.black,
  },
  tacgia: {
    width: sizes.width * 0.8,
    textAlign: 'right',
    alignSelf: 'center',
    fontFamily: fonts.bold,
    fontSize: sizes.width * 0.045,
    color: colors.black,
  },
  img1: {
    height: sizes.width * 0.15,
    width: sizes.width * 0.15,
  },
  view: {
    marginTop: -sizes.width * 0.1,
    width: sizes.width * 0.8,
    alignSelf: 'center',
    ...stylescustom.row2,
  },
  img2: {
    width: sizes.width * 0.9,
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  al: {
    alignItems: 'center',
    width: (sizes.width * 0.8) / 4,
  },
  txt: {
    color: colors.red,
    fontFamily: fonts.bold,
    fontSize: sizes.width * 0.045,
  },
  txt1: {
    color: colors.black,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.038,
  },
  line: {
    width: sizes.width * 0.8,
    height: 1,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: colors.black,
    alignSelf: 'center',
    marginTop: 10,
  },
  view1: {
    marginBottom: -sizes.height * 0.06,
    marginTop: 10,
    width: sizes.width * 0.8,
    alignSelf: 'center',
  },
  txt2: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: sizes.width * 0.04,
    color: colors.black,
    textTransform: 'uppercase',
    marginTop: 20,
  },
  txt3: {
    color: colors.black,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
    textAlign: 'center',
  },
  txt4: {textTransform: 'capitalize'},
  view2: {
    alignItems: 'center',
    width: sizes.width * 0.8,
  },
  view3: {
    flexDirection: 'row',
    width: sizes.width * 0.6,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  txt5: {
    fontFamily: fonts.medium,
    fontSize: sizes.width * 0.04,
    color: colors.black,
    width: sizes.width * 0.3,
  },
  txt6: {
    fontFamily: fonts.medium,
    fontSize: sizes.width * 0.04,
    color: colors.black,
    width: sizes.width * 0.6,
    marginLeft: 10,
  },
  view4: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 40,
    ...stylescustom.row1,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  txt7: {
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
    color: colors.black,
    width: sizes.width * 0.3,
  },
  txt8: {
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
    color: colors.black,
    width: sizes.width * 0.55,
    marginLeft: 10,
  },
  txt9: {
    fontFamily: fonts.medium,
    fontSize: sizes.width * 0.04,
    color: colors.black,
    width: sizes.width * 0.3,
    marginLeft: 10,
  },
  txt10: {
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
    color: colors.black,
    width: sizes.width * 0.3,
    marginLeft: 10,
  },
});
