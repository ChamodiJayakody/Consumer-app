import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/fonts';

const StoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Store</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  text: {
    fontFamily: FONTS.title,
    fontSize: 20,
    color: COLORS.text.primary,
  },
});

export default StoreScreen;