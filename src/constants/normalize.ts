import { Dimensions, PixelRatio, Platform } from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Standard reference dimensions (commonly iPhone 11 Pro design)
const REFERENCE_WIDTH = 375;
const REFERENCE_HEIGHT = 812;

/**
 * Normalize sizes across different screen sizes and densities.
 * @param size - Design size in pixels
 * @returns Scaled size for the current device
 */
export const n = (size: number): number => {
  const scaleWidth = SCREEN_WIDTH / REFERENCE_WIDTH;
  const scaleHeight = SCREEN_HEIGHT / REFERENCE_HEIGHT;
  const scale = Math.min(scaleWidth, scaleHeight);

  const newSize = size * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2; // Slight adjustment for Android
  }
};
export {
    SCREEN_HEIGHT,
    SCREEN_WIDTH
};

