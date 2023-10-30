import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PickerDateTime from '../../components/selecttime/PickerDateTime';
import CheckTypeDate from '../../components/checkbox/CheckTypeDate';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import stylescustom from '../../res/stylescustom';
import {fonts} from '../../res/fonts';
import {LunarDate} from '../../common/vietnamese-lunar-calendar/build';
import {convertDay, convertthu1, dinhdangngay2} from '../../res/converts';
import {
  chuyenDoiAmLichSangDuongLich,
  kiemTraNgayHopLe,
} from '../../data/chuyendoingay';
import {NavigationProp} from '@react-navigation/native';
let aa = new Date();
let ngay = aa.getDate();
let thang = aa.getMonth() + 1;
let nam = aa.getFullYear();
export default function ChageDate({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  const [days, setDay] = useState<number>(ngay);
  const [months, setMonth] = useState<number>(thang);
  const [years, setYear] = useState<number>(nam);
  const [isToday, setIsToday] = useState(0);
  const [today, setToday] = useState<Date>(
    new Date(`${years}-${months}-${days}`),
  );
  const {
    date,
    month,
    year,
    lunarDate,
    lunarMonth,
    lunarYear,
    solarTerm,
    luckyHours,
  } = new LunarDate(today);
  const {ngaythangnam, thangNhuanAm} = chuyenDoiAmLichSangDuongLich(
    days,
    months,
    years,
    7,
  );
  const {
    date: ngayduong,
    month: thangduong,
    year: namduong,
  } = dinhdangngay2(ngaythangnam);

  const dateparams = dinhdangngay2(today);

  const doingay = () => {
    if (isToday === 0) {
      if (kiemTraNgayHopLe(days, months, years)) {
        setToday(new Date(`${years}-${months}-${days}`));
      } else {
        Alert.alert('Ngày không hợp lệ');
      }
    } else {
      if (
        kiemTraNgayHopLe(
          Number(ngayduong),
          Number(thangduong),
          Number(namduong),
        )
      ) {
        setToday(new Date(`${namduong}-${thangduong}-${ngayduong}`));
      } else {
        Alert.alert('Ngày không hợp lệ');
      }
    }
  };

  return (
    <>
      <Text style={styles.txt}>Chuyển đổi ngày âm dương</Text>
      <PickerDateTime setDay={setDay} setMonth={setMonth} setYear={setYear} />
      <CheckTypeDate setGenderId={setIsToday} gender={isToday} />
      <Pressable style={styles.btn} onPress={doingay}>
        <Text style={styles.txtbtn}>Kết quả</Text>
      </Pressable>
      <View style={styles.view}>
        <Text style={styles.txt4}>KẾT QUẢ</Text>
        <View style={{width: '100%'}}>
          <Text style={styles.txt1}>
            Dương lịch:{' '}
            <Text style={styles.txt3}>
              {convertthu1(today)}, ngày {convertDay(today)}
            </Text>
          </Text>
          <Text style={styles.txt1}>
            Âm lịch:{' '}
            <Text style={styles.txt3}>
              {date}-{month}-{year}, ngày ({lunarDate.can}
              {lunarDate.chi},tháng {lunarMonth.can}
              {lunarMonth.chi}, năm {lunarYear.chi},{lunarYear.can})
            </Text>
          </Text>
          <Text style={styles.txt1}>
            Tiết khí: <Text style={styles.txt3}>{solarTerm}</Text>{' '}
          </Text>
          <Text style={styles.txt1}>
            Giờ hoàng đạo: <Text style={styles.txt3}>{luckyHours}</Text>
          </Text>
          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate('DetailCalendar', dateparams)}>
            <Text style={styles.txtbtn}>Chi tiết</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    width: sizes.width * 0.9,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    ...stylescustom.shadowitem,
    padding: 10,
    marginTop: 20,
    zIndex: -10,
    marginBottom: 50,
    alignItems: 'center',
  },
  txtbtn: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: sizes.width * 0.045,
  },
  btn: {
    height: 50,
    width: sizes.width * 0.3,
    alignSelf: 'center',
    backgroundColor: colors.colorapp,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: sizes.height * 0.02,
    zIndex: -10,
    marginBottom: 10,
  },
  txt: {
    marginTop: sizes.height * 0.03,
    alignSelf: 'center',
    fontFamily: fonts.bold,
    fontSize: sizes.width * 0.055,
    color: colors.blue1,
  },
  txt1: {
    color: colors.black,
    fontSize: sizes.width * 0.045,
    fontFamily: fonts.medium,
    marginLeft: 10,
  },
  txt4: {
    fontSize: sizes.width * 0.05,
    fontFamily: fonts.bold,
    color: colors.black,
    marginLeft: 10,
    marginTop: 8,
  },
  txt3: {
    fontSize: sizes.width * 0.04,
    fontFamily: fonts.regular,
    color: colors.black,
  },
});
