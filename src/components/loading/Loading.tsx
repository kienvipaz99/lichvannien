import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import sizes from '../../res/sizes';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: sizes.width,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.68)',
      }}>
      <View
        style={{
          height: 100,
          width: 100,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 0,
          flex: 1,
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
};

export default Loading;
