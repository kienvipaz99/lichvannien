import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../../RootNavigation';
import Home from '../screen/home/Home';
import DetailCalendar from '../screen/calendar/DetailCalendar';
import HoroscopeMonth from '../screen/horoscope/HoroscopeMonth';
import Lifetimehoroscope from '../screen/horoscope/Lifetimehoroscope';
import DestinyYear from '../screen/horoscope/DestinyYear';
import BlackTerm from '../screen/horoscope/BlackTerm';
import Xongdat from '../screen/horoscope/Xongdat';
import NhaHopTuoi from '../screen/horoscope/NhaHopTuoi';
import AgeBuidHouse from '../screen/horoscope/AgeBuidHouse';
import PrayerText from '../screen/prayertext/PrayerText';
import DetaiPrayerText from '../screen/prayertext/DetaiPrayerText';
const Container = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={'SlapScreen1'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        {/* @ts-ignore */}
        <Stack.Screen name="DetailCalendar" component={DetailCalendar} />
        <Stack.Screen name="HoroscopeMonth" component={HoroscopeMonth} />
        <Stack.Screen name="Lifetimehoroscope" component={Lifetimehoroscope} />
        <Stack.Screen name="DestinyYear" component={DestinyYear} />
        <Stack.Screen name="BlackTerm" component={BlackTerm} />
        <Stack.Screen name="Xongdat" component={Xongdat} />
        <Stack.Screen name="NhaHopTuoi" component={NhaHopTuoi} />
        <Stack.Screen name="AgeBuidHouse" component={AgeBuidHouse} />
        <Stack.Screen name="DetaiPrayerText" component={DetaiPrayerText} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Container;
