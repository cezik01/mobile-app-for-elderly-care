import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SidebarProps } from 'types/SidebarProps';
import { styles } from './styles';
import i18n from 'common/i18n/i18n';
import { MaterialIcons } from '@expo/vector-icons';

export const Sidebar = ({ style, setSidebarVisible, navigation, handleLogout }: SidebarProps) => {

    const handleHelpPress = () => {
        navigation.navigate('Help Screen')
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
            <TouchableOpacity onPress={() => {
                handleLogout().then(() => {
                    navigation.navigate('Registration');
                }).catch((error) => {
                    console.error('Logout failed:', error);
                });
            }}>
                <Text style={styles.logoutText}>{i18n.t('Logout')}</Text>
            </TouchableOpacity>
        </View>
    );
};

