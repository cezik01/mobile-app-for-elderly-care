import { theme } from 'common/theme/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bloodStatus: {
        marginVertical: 10,
        color: "red",
        fontSize: 16,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
        zIndex: 1,
    },
    scrollView: {
        maxHeight: heightPercentageToDP('80'),
        zIndex: 1,
    },
    bloodPressureSugarImage: {
        alignSelf: 'center',
    },
    bloodSugarPressure: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bloodSugar: {
        marginTop: 50,
    },
    bloodPressureSugarTexts: {
        marginTop: 20,
        color: 'blue',
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    dimmedBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

});
export default styles;
