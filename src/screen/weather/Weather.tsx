import {FlatList, Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fullday, thu, times} from '../../res/converts';
import {colors} from '../../res/colors';
import TimeClock from '../../components/time/TimeClock';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import {ApiWeather, KEYWeather} from '../../api/APIWeather';
import sizes from '../../res/sizes';
import {fonts} from '../../res/fonts';
import WeatherToday from './WeatherToday';
const isAndroid = Platform.OS === 'android';

export default function Weather() {
  const [data, setData] = useState<WeathersToday>();
  const [location, setLocation] = useState({
    lat: Number(),
    long: Number(),
  });
  useEffect(() => {
    const getlocation = async () => {
      const local = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 200000,
      });
      setLocation({
        lat: local?.latitude,
        long: local?.longitude,
      });
    };
    getlocation();
  }, []);

  useEffect(() => {
    const callApi = async () => {
      await axios
        .get(
          //
          `${ApiWeather}?appid=${KEYWeather}&lang=vi&units=metric&lon=${location?.long}&lat=${location?.lat}&exclude=hourly,daily`,
        )
        .then(response => {
          setData(response.data);
        });
    };
    callApi();
  }, [location]);
  const urlImgdefault = `http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`;
  const ListFoodter = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>
          {thu()}, {fullday()}
        </Text>
        <TimeClock stylecustom={styles.time} />
        <Text style={styles.txt1}>{data?.name}</Text>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: urlImgdefault,
          }}
        />
        <Text style={styles.txt2}>{data?.main?.temp.toFixed(0)}°c</Text>
        <View style={styles.line} />
        <View style={styles.view}>
          <View>
            <Text style={styles.txt3}>
              Mặt trời mọc: {times(data?.sys?.sunrise)}
            </Text>
            <Text style={styles.txt3}>
              Cảm thấy như: {data?.main?.feels_like.toFixed(0)}°c
            </Text>
            <Text style={styles.txt3}>Gió: {data?.wind?.speed} m/s</Text>
          </View>
          <View>
            <Text style={styles.txt3}>
              Mặt trời lặn: {times(data?.sys?.sunset)}
            </Text>

            <Text style={styles.txt3}>Độ ẩm: {data?.main?.humidity}%</Text>
            <Text style={styles.txt3}>Gió mạnh : {data?.wind?.gust} m/s</Text>
          </View>
        </View>
        <Text style={styles.txt3}>
          Thời tiết: {data?.weather[0]?.description}
        </Text>
        <View style={styles.line} />
        <WeatherToday location={location} />
      </View>
    );
  };
  return (
    <FlatList
      data={[]}
      style={{backgroundColor: '#7dcdea'}}
      showsVerticalScrollIndicator={false}
      renderItem={null}
      ListFooterComponent={ListFoodter}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7dcdea',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: isAndroid ? 0 : 50,
  },
  txt: {
    color: colors.white,
    fontSize: 25,
    marginTop: 20,
    fontFamily: fonts.medium,
  },
  time: {marginTop: sizes.height * 0.03, fontSize: 40},
  txt1: {
    color: colors.white,
    fontSize: 24,
    marginTop: sizes.height * 0.02,
    fontFamily: fonts.bold,
  },
  txt2: {
    color: colors.white,
    fontSize: 60,
    fontFamily: fonts.bold,
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
  line: {
    width: sizes.width * 0.8,
    height: 1.5,
    backgroundColor: colors.white,
    marginTop: sizes.height * 0.02,
  },
  view: {
    width: sizes.width * 0.9,
    marginTop: sizes.height * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt3: {
    color: colors.white,
    fontSize: 18,
    marginTop: 10,
    fontFamily: fonts.regular,
  },
});
