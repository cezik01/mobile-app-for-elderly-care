import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SidebarProps } from 'types/SidebarProps';
import { styles } from './styles';
import i18n from 'common/i18n/i18n';
import { MaterialIcons } from '@expo/vector-icons';

export const Sidebar = ({ role, style, setSidebarVisible, navigation, handleLogout }: SidebarProps) => {

    const handleHelpPress = () => {
        if (role === 'caregiver')
            navigation.navigate('Help Screen', { role: 'caregiver' })
        else if (role === 'patient')
            navigation.navigate('Help Screen', { role: 'patient' })
    };

    const handleFeedbackPress = () => {
        navigation.navigate('Feedback Screen')
    };

    return (
        <View style={[styles.sidebar, style]}>
            <TouchableOpacity onPress={() => setSidebarVisible(false)} style={styles.menuIconContainer}>
                <Image source={require('../../../assets/profiles/Menu.png')} style={styles.menuIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleHelpPress}
            >
                <View style={styles.questionMarkContainer}>
                    <MaterialIcons name='help' style={styles.questionMarkIcon} size={25} />
                    <Text style={styles.helpText}>
                        {i18n.t('Help')}
                    </Text>
                </View>
                <Text style={styles.helpInfoText}>{i18n.t('HelpInfo')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFeedbackPress}>
                <Text style={styles.feedbackText}>{i18n.t('Feedback')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                handleLogout().then(() => {
                    navigation.navigate('Login');
                }).catch((error) => {
                    console.error('Logout failed:', error);
                });
            }}>
                <Text style={styles.logoutText}>{i18n.t('Logout')}</Text>
            </TouchableOpacity>
        </View>
    );
};

