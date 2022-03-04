import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../theme/colors';
import normalize from 'react-native-normalize';
import { 
    HomeScreen,
    FavoritesScreen,
    SettingsScreen,
    TrackingScreen
} from '../screens';
import FastImage from 'react-native-fast-image';
import { HOME } from '../constants/icons';



const BottomTab = createBottomTabNavigator();



const BottomTabNavigation = () => {
    return (
        <BottomTab.Navigator
            screenOptions={{
                showLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.primary,
                    height: normalize(75)
                }
            }}
            initialRouteName="HomeScreen"
        >
            <BottomTab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused === true ? <Image
                            source={HOME}
                            resizeMode="contain"
                            style={{
                                width: normalize(23),
                                height: normalize(23),
                                tintColor: focused ? theme.colors.primary : theme.colors.inactiveTabIcons
                            }}
                        /> :
                            <FastImage
                                source={HOME}
                                resizeMode='contain'
                                style={{
                                    width:normalize(22),
                                    height: normalize(22),
                                    tintColor: focused ? colors.primary : colors.gray
                                }}
                            />
                    ),
                    // tabBarButton: (props) => (
                    //     <TabBarCustomButton
                    //         {...props}
                    //         name={' Shop'}
                    //     />
                    // ),
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            />
             <BottomTab.Screen
                name="SettingsScreens"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused === true ? <Image
                            source={HOME}
                            resizeMode="contain"
                            style={{
                                width: normalize(23),
                                height: normalize(23),
                                tintColor: focused ? theme.colors.primary : theme.colors.inactiveTabIcons
                            }}
                        /> :
                            <FastImage
                                source={HOME}
                                resizeMode='contain'
                                style={{
                                    width:normalize(22),
                                    height: normalize(22),
                                    tintColor: focused ? colors.primary : colors.gray
                                }}
                            />
                    ),
                    // tabBarButton: (props) => (
                    //     <TabBarCustomButton
                    //         {...props}
                    //         name={' Shop'}
                    //     />
                    // ),
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            />
        </BottomTab.Navigator>
    )
}

export default BottomTabNavigation