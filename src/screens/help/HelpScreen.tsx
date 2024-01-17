import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import i18n from 'common/i18n/i18n';
import { pauseSpeech, speak, stopSpeech } from 'helpers/voice/SpeechHelper';
import { HelpScreenProps } from 'types/screen/HelpScreenProps';
import { styles } from './styles';

const HelpScreen: React.FC<HelpScreenProps> = ({ route }) => {
    const { role } = route?.params;
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    return (
        <View style={styles.screen}>
            {role === 'patient' && (
                <Text style={styles.appInfo}>{i18n.t('AppInfoForPatient')}</Text>
            )}
            {role === 'caregiver' && (
                <Text style={styles.appInfo}>{i18n.t('AppInfoForCaregiver')}</Text>
            )}

            <TouchableOpacity
                onPress={() => speak(setIsSpeaking, setIsPaused, isSpeaking, isPaused, role)}
                style={styles.helpContainer}>
                <Text style={styles.helpText}>
                    {i18n.t('VoiceHelp')}
                </Text>
                <MaterialIcons name="mic" size={35} color="blue" style={styles.mic} />
            </TouchableOpacity>
            <View style={styles.voiceButtons}>
                <Button onPress={() => pauseSpeech(isSpeaking, isPaused, setIsPaused)} labelStyle={styles.buttonText}>{i18n.t('Stop')}</Button>
                <Button onPress={() => stopSpeech(setIsSpeaking, setIsPaused)} labelStyle={styles.buttonText}>{i18n.t('Pause')}</Button>
            </View>
        </View>
    );
};

export default HelpScreen;
