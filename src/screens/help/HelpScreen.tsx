import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import i18n from 'common/i18n/i18n';
import { pauseSpeech, speak, stopSpeech } from 'helpers/voice/SpeechHelper';

const HelpScreen = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    return (
        <View style={styles.screen}>
            <Text style={styles.appInfo}>{i18n.t('AppInfo')}</Text>
            <TouchableOpacity
                onPress={() => speak(setIsSpeaking, setIsPaused, isSpeaking, isPaused)}
                style={styles.helpContainer}>
                <Text style={styles.helpText}>
                    {i18n.t('VoiceHelp')}
                </Text>
                <MaterialIcons name="mic" size={35} color="blue" style={styles.mic} />
            </TouchableOpacity>
            <View style={styles.voiceButtons}>
                <Button title="Duraklat" onPress={() => pauseSpeech(isSpeaking, isPaused, setIsPaused)} />
                <Button title="Dur" onPress={() => stopSpeech(setIsSpeaking, setIsPaused)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    appInfo: {
        fontSize: 18,
        marginBottom: 90,
        fontStyle: 'italic',
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    helpContainer: {
        alignItems: 'center',
    },
    mic: {
        marginTop: 20,
    },
    helpText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    voiceButtons: {
        marginTop: 30,
    }
});

export default HelpScreen;
