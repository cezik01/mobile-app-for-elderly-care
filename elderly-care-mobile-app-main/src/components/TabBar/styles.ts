import { theme } from 'common/theme/theme';
import { StyleSheet } from 'react-native';

const { spacing, borderRadius, fontSizes, fontWeights } =
  theme.components;

export const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    shadowColor: '#2E1D5F',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    top: -10,
  },
  centerButtonFocused: {},
  cartIconContainer: {
    paddingHorizontal: spacing[1],
    borderRadius: borderRadius[3],
    gap: spacing[2],
    width: 20,
    height: 20,
    position: 'absolute',
    zIndex: 1,
    top: spacing[1],
    right: spacing[1],
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIconText: {
    fontWeight: fontWeights.regular,
    fontSize: fontSizes.body.b4,
    lineHeight: spacing[4],
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
    marginVertical: 20,
  },
});
