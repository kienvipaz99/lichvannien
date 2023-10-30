import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts} from '../../res/fonts';
export default function TimeClock({stylecustom}: {stylecustom?: TextStyle}) {
  const [time, setTime] = useState<string>();
  useEffect(() => {
    let secTimer = setInterval(() => {
      let date = new Date();
      let a = date.getHours();
      let b = date.getMinutes();
      let hour = a < 10 ? '0' + a : a;
      let minute = b < 10 ? '0' + b : b;
      setTime(hour + ':' + minute);
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);
  return (
    <>
      <Text style={[styles.text, {...stylecustom}]}>{time}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: fonts.medium,
    fontSize: 30,
  },
});
