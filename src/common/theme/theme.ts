import { FlexAlignType, FlexStyle, TextStyle } from 'react-native';

export const theme = {
  components: {
    Text: {
      baseStyle: {
        textAlign: 'left',
      },
    },
    ScrollView: {
      defaultProps: {
        overScrollMode: 'never',
      },
    },
    display: {
      flex: 'flex' as FlexStyle['display'],
      none: 'none' as FlexStyle['display'],
      block: 'block' as FlexStyle['display'],
    },
    flexDirection: {
      row: 'row' as FlexStyle['flexDirection'],
      column: 'column' as FlexStyle['flexDirection'],
      rowReverse: 'row-reverse' as FlexStyle['flexDirection'],
      columnReverse: 'column-reverse' as FlexStyle['flexDirection'],
    },
    position: {
      relative: 'relative' as FlexStyle['position'],
      absolute: 'absolute' as FlexStyle['position'],
    },
    align: {
      default: 'center' as FlexAlignType,
      start: 'flex-start' as FlexAlignType,
      flexEnd: 'flex-end' as FlexAlignType,
      stretch: 'stretch' as FlexAlignType,
    },
    justify: {
      default: 'center' as FlexStyle['justifyContent'],
      flexStart: 'flex-start' as FlexStyle['justifyContent'],
      flexEnd: 'flex-end' as FlexStyle['justifyContent'],
      spaceBetween: 'space-between' as FlexStyle['justifyContent'],
      spaceAround: 'space-around' as FlexStyle['justifyContent'],
      spaceEvenly: 'space-evenly' as FlexStyle['justifyContent'],
    },
    colorScheme: {
      light: {
        primary: {
          purple: {
            10: '#f1ecfd',
            20: '#e2dafb',
            30: '#d4c7fa',
            40: '#c6b5f8',
            50: '#b8a2f6',
            60: '#a98ff4',
            70: '#9b7df2',
            80: '#8d6af1',
            90: '#7e58ef',
            100: '#7045ED',
            110: '#653ed5',
            120: '#5a37be',
            130: '#4e30a6',
            140: '#43298e',
            150: '#382377',
            160: '#2c1c5f',
            170: '#211547',
            180: '#160e2f',
          },
          green: {
            10: '#eafcf6',
            20: '#d4f9ed',
            30: '#bff6e4',
            40: '#aaf3db',
            50: '#95f1d3',
            60: '#7feeca',
            70: '#6aebc1',
            80: '#55e8b8',
            90: '#3fe5af',
            100: '#2AE2A6',
          },
          dark: {
            10: '#e6e6e6',
            20: '#cccccc',
            30: '#b3b3b3',
            40: '#999999',
            50: '#808080',
            60: '#676767',
            70: '#4d4d4d',
            80: '#343434',
            90: '#1a1a1a',
            100: '#010101',
          },
          canvas: '#F7F7F7',
          white: '#FFFFFF',
          bright: '#F5F9FC',
        },
        secondary: {
          SunBright: '#FAE019',
          AshyGrey: '#DBDCD6',
        },
        ascent: {
          Info: '#0AC9C9',
          Success: '#30B20F',
          Warning: '#FFD012',
          WarningLight: '#FAE0191A',
          Error: '#EA6950',
          ErrorLight: '#FDEFED',
        },
        transparent: {
          OverlayBackground: '#000000c0',
          LightRed: 'rgba(234, 105, 12, 0.1)',
          LightPurple: 'rgba(112, 69, 237, 0.14)',
        },
      },
      dark: {},
    },
    textAlign: {
      auto: 'auto' as TextStyle['textAlign'],
      left: 'left' as TextStyle['textAlign'],
      center: 'center' as TextStyle['textAlign'],
      right: 'right' as TextStyle['textAlign'],
    },
    fontSizes: {
      heading: {
        xl: 64,
        h1: 40,
        h2: 36,
        h3: 32,
        h4: 24,
        h5: 20,
        h6: 18,
        h7: 16,
        h8: 14,
      },
      body: {
        b1: 18,
        b2: 16,
        b3: 14,
        b4: 12,
      },
    },
    fontWeights: {
      light: '300' as TextStyle['fontWeight'],
      regular: '400' as TextStyle['fontWeight'],
      medium: '500' as TextStyle['fontWeight'],
      semiBold: '600' as TextStyle['fontWeight'],
      bold: '700' as TextStyle['fontWeight'],
    },
    lineHeight: {
      h1: 40,
      h2: 36,
      h3: 32,
      h4: 24,
      h5: 20,
      h6: 18,
      h7: 16,
      h8: 14,
    },
    spacing: {
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 24,
      6: 32,
      7: 40,
      8: 48,
      9: 56,
      10: 64,
      11: 80,
      12: 120,
      13: 160,
    },
    borderRadius: {
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 24,
      6: 32,
      7: 40,
      8: 48,
      9: 56,
      10: 64,
      11: 80,
      12: 100,
    },
    borderWidth: {
      0: 0,
      1: 0.5,
      2: 1,
      3: 2,
      4: 3,
      5: 4,
      6: 5,
    },
  },
};
