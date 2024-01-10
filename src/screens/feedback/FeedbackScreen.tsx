import i18n from 'common/i18n/i18n';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { HelpScreenProps } from 'types/screen/HelpScreenProps';

const FeedbackScreen: React.FC<HelpScreenProps> = () => {
    const [feedback, setFeedback] = useState('');

    const analyzeSentiment = async (text: string) => {
        const url = 'https://sentiment-analysis9.p.rapidapi.com/sentiment';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-RapidAPI-Key': 'd5acfd29b8msh53af24217994b9fp1f23a1jsn84d66d81fbd6',
                'X-RapidAPI-Host': 'sentiment-analysis9.p.rapidapi.com'
            },
            body: JSON.stringify([
                {
                    id: '1',
                    language: 'en',
                    text: text
                }
            ])
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            if (result && result.length > 0 && result[0].predictions && result[0].predictions.length > 0) {
                const sentiment = result[0].predictions[0].prediction;

                return sentiment;

            } else {
                throw new Error('Unexpected response format');
            }

        } catch (error) {
            console.error('Error analyzing sentiment:', error);
            Alert.alert('Error', 'Could not analyze feedback due to network or server issue.');
        }
    };

    const handleFeedbackSubmit = async () => {
        const sentimentAnalysis = await analyzeSentiment(feedback);

        if (sentimentAnalysis) {
            const { sentiment, probability } = sentimentAnalysis;

            if (probability > 0.8) {
                if (sentiment === 'Positive') {
                    Alert.alert('Thank you!', 'We appreciate your positive feedback!');
                } else if (sentiment === 'Negative') {
                    Alert.alert('Thank you!', 'We will work on your concerns.');
                }
            } else {
                Alert.alert('Thank you!', 'Feedback received.');
            }
        } else {
            Alert.alert('Error', 'Could not analyze feedback.');
        }
        setFeedback('');
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>{i18n.t('FeedbackScreen')}</Text>
            <TextInput
                style={styles.input}
                multiline
                placeholder="Enter your feedback here"
                value={feedback}
                onChangeText={setFeedback}
            />
            <Button
                title="Submit Feedback"
                onPress={handleFeedbackSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 25,
    },
    input: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
});

export default FeedbackScreen;
