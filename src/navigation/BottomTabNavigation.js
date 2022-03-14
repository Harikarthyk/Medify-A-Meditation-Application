import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../theme/colors';
import normalize from 'react-native-normalize';
import {
    HomeScreen,
    FavoritesScreen,
    SettingsScreen,
    DailyQuotesScreen
} from '../screens';
import { 
    FAVORITES_PRIMARY,
    FAVORITES_BLACK, 
    HOME_BLACK, 
    HOME_PRIMARY, 
    USER_BLACK, 
    USER_PRIMARY, 
    FAVORITES_WHITE,
    USER_WHITE,
    HOME_WHITE,
    LEFT_QUOTE_PRIMARY,
    LEFT_QUOTE_WHITE,
    LEFT_QUOTE_BLACK
} from '../constants/icons';
import { 
    Image, 
    StyleSheet, 
    useColorScheme 
} from 'react-native';



const BottomTab = createBottomTabNavigator();



const BottomTabNavigation = () => {

    const theme = useColorScheme();

    return (
        <BottomTab.Navigator
            screenOptions={{
                showLabel: false,
                // tabBarStyle: styles.tabBarStyle,
                tabBarStyle: [{...styles.tabBarStyle}, { backgroundColor: theme === 'dark' ? colors.cardColorDark :colors.cardColorDefault, borderTopColor: theme === 'dark' ? colors.cardColorDark :colors.borderColor }]
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
                        theme === 'dark' ?
                        <Image
                            source={HOME_WHITE}
                            resizeMode='contain'
                            style={styles.tabBarIconStyleUnFocussed}
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
                        theme === 'dark' ?
                        <Image
                            source={FAVORITES_WHITE}
                            resizeMode='contain'
                            style={[styles.tabBarIconStyleUnFocussed, { width: 26, height: 26 }]}
                        />
                    : 
                        <Image
                            source={FAVORITES_BLACK}
                            resizeMode='contain'
                            style={[styles.tabBarIconStyleUnFocussed, { width: 26, height: 26 }]}
                        />
                    ),
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            />
            <BottomTab.Screen
                name="DailyQuotesScreen"
                component={DailyQuotesScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused === true ?
                            <Image
                                source={LEFT_QUOTE_PRIMARY}
                                resizeMode="contain"
                                style={styles.tabBarIconStyleFocussed}
                            /> 
                        :
                        theme === 'dark' ?
                        <Image
                            source={LEFT_QUOTE_WHITE}
                            resizeMode='contain'
                            style={[styles.tabBarIconStyleUnFocussed, { width: 26, height: 26 }]}
                        />
                    : 
                        <Image
                            source={LEFT_QUOTE_BLACK}
                            resizeMode='contain'
                            style={[styles.tabBarIconStyleUnFocussed, { width: 26, height: 26 }]}
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
                        theme === 'dark' ?
                            <Image
                                source={USER_WHITE}
                                resizeMode='contain'
                                style={styles.tabBarIconStyleUnFocussed}
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
        height: normalize(60),
        // borderTopLeftRadius: normalize(15),
        // borderTopRightRadius: normalize(15),
        elevation: 2,
        borderTopWidth: 2
    },
    tabBarIconStyleFocussed: {
        width: normalize(27),
        height: normalize(27),
    },
    tabBarIconStyleUnFocussed: {
        width: normalize(23),
        height: normalize(23)
    }
})

export default BottomTabNavigation