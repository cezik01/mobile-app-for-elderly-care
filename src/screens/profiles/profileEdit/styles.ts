import { theme } from 'common/theme/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    inputContainer: {
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dropdownAnchor: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default styles;
