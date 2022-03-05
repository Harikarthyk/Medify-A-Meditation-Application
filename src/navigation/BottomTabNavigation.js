import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../theme/colors';
import normalize from 'react-native-normalize';
import {
    HomeScreen,
    FavoritesScreen,
    SettingsScreen
} from '../screens';
import { 
    FAVORITES_PRIMARY,
    FAVORITES_BLACK, 
    HOME_BLACK, 
    HOME_PRIMARY, 
    USER_BLACK, 
    USER_PRIMARY 
} from '../constants/icons';
import { Image, StyleSheet } from 'react-native';



const BottomTab = createBottomTabNavigator();



const BottomTabNavigation = () => {
    return (
        <BottomTab.Navigator
            screenOptions={{
                showLabel: false,
                tabBarStyle: styles.tabBarStyle
            }}
            initialRouteName="HomeScreen"
        >
            <BottomTab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused === true ?
                            <Image
                                source={HOME_PRIMARY}
                                resizeMode="contain"       
                                style={styles.tabBarIconStyleFocussed}
                            /> 
                        :
                            <Image
                                source={HOME_BLACK}
                                resizeMode='contain'
                                style={styles.tabBarIconStyleUnFocussed}
                            />
                    ),
                    headerShown: false,
                    tabBarShowLabel: false
                }}
            />
            <BottomTab.Screen
                name="FavoritesScreen"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused === true ?
                            <Image
                                source={FAVORITES_PRIMARY}
                                resizeMode="contain"
                                style={styles.tabBarIconStyleFocussed}
                            /> 
                        :
                            <Image
                                source={FAVORITES_BLACK}
                                resizeMode='contain'
                                style={styles.tabBarIconStyleUnFocussed}
                            />
                    ),
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            />
            <BottomTab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused === true ?
                            <Image
                                source={USER_PRIMARY}
                                resizeMode="contain"
                                style={styles.tabBarIconStyleFocussed}
                           /> 
                        :
                            <Image
                                source={USER_BLACK}
                                resizeMode='contain'
                                style={styles.tabBarIconStyleUnFocussed}
                            />
                    ),
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            />
        </BottomTab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: colors.white,
        height: normalize(60),
        elevation: 2,
        borderTopLeftRadius: normalize(15),
        borderTopRightRadius: normalize(15),
    },
    tabBarIconStyleFocussed: {
        width: normalize(27),
        height: normalize(27),
    },
    tabBarIconStyleUnFocussed: {
        width: normalize(23),
        height: normalize(23),
    }
})

export default BottomTabNavigation