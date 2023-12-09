import { Dimensions, PixelRatio } from 'react-native';

const widthPercentageToDP = (widthPercent: string): number => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = (heightPercent: string): number => {
  const screenHeight = Dimensions.get('window').height;
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export { widthPercentageToDP, heightPercentageToDP };

/**
 * @example
 * // width: ${widthPercentageToDP('98')};
 * // height: ${heightPercentageToDP('10')};
 */
