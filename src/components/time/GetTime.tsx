import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts} from '../../res/fonts';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import {hienThiThongTinMuiGio} from '../../res/converts';

export default function GetTime({data}: {data: any}) {
  const [time, setTime] = useState<string>();
  useEffect(() => {
    let secTimer = setInterval(() => {
      const d = new Date();
      const hh = [d.getHours(), d.getMinutes(), d.getSeconds()].map(a =>
        a < 10 ? '0' + a : a,
      );
      setTime(hh.join(':'));
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  return (
    <View style={styles.view}>
      <Text>Giờ</Text>
      <Text style={styles.text1}>{time}</Text>
      <Text>{hienThiThongTinMuiGio(data)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    color: colors.red,
    fontFamily: fonts.bold,
    fontSize: sizes.width * 0.045,
  },
  view: {
    alignItems: 'center',
    width: (sizes.width * 0.8) / 4,
  },
});
