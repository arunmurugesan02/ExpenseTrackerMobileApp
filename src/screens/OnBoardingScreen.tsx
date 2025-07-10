import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/colors';
import {n, SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/normalize';
import {Regular2, Title1} from '../constants/Typography';
import {carouselData} from '../data/mockData';

const OnBoardingScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom', 'left', 'right']}>
      <Carousel
        loop
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT * 0.45}
        autoPlay={true}
        data={carouselData}
        pagingEnabled
        onSnapToItem={index => setActiveIndex(index)}
        renderItem={({item}) => (
          <View style={styles.wrapper}>
            <FastImage
              source={item.image}
              style={styles.image}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Title1 style={styles.text}>{item.title}</Title1>
            <Regular2
              style={[styles.text, {color: Colors.dark50, paddingTop: n(15)}]}>
              {item.desc}
            </Regular2>
          </View>
        )}
      />
      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  activeIndex === index ? Colors.violet100 : Colors.light20,
              },
            ]}
          />
        ))}
      </View>
      <CustomButton
        text="Sign Up"
        size="large"
        onPress={() => {}}
        style={styles.buttonPrimary}
      />
      <CustomButton
        text="Login"
        size="large"
        onPress={() => {}}
        type="secondary"
        style={styles.buttonSecondary}
      />
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-end', marginBottom: n(30)},
  carouselContainer: {justifyContent: 'center', alignItems: 'center'},
  wrapper: {
    alignItems: 'center',
  },
  image: {width: n(225), height: n(225)},
  text: {
    textAlign: 'center',
    width: SCREEN_WIDTH * 0.7,
  },
  dotsContainer: {
    flexDirection: 'row',
    paddingTop: n(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {width: 10, height: 10, borderRadius: 5, marginHorizontal: 5},
  buttonPrimary: {
    marginHorizontal: n(20),
    marginTop: n(33),
    paddingVertical: n(20),
  },
  buttonSecondary: {
    marginHorizontal: n(20),
    marginTop: n(16),
    paddingVertical: n(20),
  },
});
