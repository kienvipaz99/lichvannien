import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import Bottomtabbars from '../../container/BottomTab';

export default function Home({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  return (
    <View style={{flex: 1}}>
      <Bottomtabbars navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({});
