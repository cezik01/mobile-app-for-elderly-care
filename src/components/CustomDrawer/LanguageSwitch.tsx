import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Switch } from 'react-native-paper';
import i18n from 'common/i18n/i18n';
import styles from './styles';

function LanguageSwitch() {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onChange = () => setIsSwitchOn(!isSwitchOn);

    useEffect(() => {
        if (isSwitchOn) {
            i18n.changeLanguage('en');
        } else {
            i18n.changeLanguage('tr');
        }
    }, [isSwitchOn])

    return (
        <View style={styles.switchContainer}>
            <Text>{i18n.t('TR')}</Text>
            <Switch
                value={isSwitchOn}
                onChange={onChange}

                style={styles.switch}
            />
            <Text>{i18n.t('EN')}</Text>
        </View>
    );
}

export default LanguageSwitch;
