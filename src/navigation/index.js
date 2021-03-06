import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    SplashScreen,
    TrackPlayer,
    CategoryScreen
} from '../screens';
import OnBoardingNavigation from './OnBoardingNavigation';
import BottomTabNavigation from './BottomTabNavigation';

const MainStack = createStackNavigator();


function MainStackNavigation() {
    return (
        <MainStack.Navigator
            initialRouteName={'SplashScreen'}
        >
            <MainStack.Screen
                options={{ headerShown: false }}
                name='SplashScreen'
                component={SplashScreen}
            />

            <MainStack.Screen
                options={{ headerShown: false }}
                name='TrackPlayer'
                component={TrackPlayer}
            />

            <MainStack.Screen
                options={{ headerShown: false }}
                name='CategoryScreen'
                component={CategoryScreen}
            />


            <MainStack.Screen
                options={{ headerShown: false }}
                name='OnBoardingStack'
                component={OnBoardingNavigation}
            />

            <MainStack.Screen
                options={{ headerShown: false }}
                name='BottomTabStack'
                component={BottomTabNavigation}
            />

        </MainStack.Navigator>
    )
}

export default MainStackNavigation
