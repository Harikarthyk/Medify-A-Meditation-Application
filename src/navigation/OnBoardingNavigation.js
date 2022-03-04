import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    OnBoardingScreen_1, 
    OnBoardingScreen_2 
} from '../screens';

const OnBoardingMainStack = createStackNavigator();


function OnBoardingNavigation() {
    return (
        <OnBoardingMainStack.Navigator
            initialRouteName={'OnBoardingScreen_1'}
        >

            <OnBoardingMainStack.Screen
                options={{ headerShown: false }}
                name='OnBoardingScreen_1'
                component={OnBoardingScreen_1}
            />

            <OnBoardingMainStack.Screen
                options={{ headerShown: false }}
                name='OnBoardingScreen_2'
                component={OnBoardingScreen_2}
            />

        </OnBoardingMainStack.Navigator>
    )
}

export default OnBoardingNavigation
