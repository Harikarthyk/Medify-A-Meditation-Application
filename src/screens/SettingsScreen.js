import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { 
    SafeAreaView, 
    Text, 
    StyleSheet, 
    View
} from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../theme/colors';
import metrics from '../theme/metrics';

const ProfileHeader = ({ name, gender, age }) => {
    return(
        <View
            style={{
                padding: normalize(2),
                height: metrics.screenHeight / 2 - 50,
                backgroundColor: colors.white,
                elevation: 2,
                shadowColor: colors.primary
            }}
        >
            <Text>{name}</Text>

            <Text>{age}</Text>

            <Text>{gender}</Text>
        </View>
    )
}

function SettingsScreen({}) {

    const [user, setUser] = useState({
        name: '',
        age: '',
        gender: '',
        lastUsed: '',
        created: ''
    });

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async() => {
        var data = await AsyncStorage.getItem('user');
        data = JSON.parse(data);
        setUser({
            name: data?.name,
            age: data?.age,
            gender: data?.gender,
            lastUsed: data?.lastUsed,
            created: data?.created
        });
    }

    return (
        <SafeAreaView
            style={styles.container}
        >

            <ProfileHeader 
                name={user?.name}
                gender={user?.gender} 
                age={user?.age} 
                created={user?.created} 
            />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: normalize(15),
        // backgroundColor: colors.backgroundColor
    },
    buttonStyle: {

    },
    text: {
        
    }
})

export default SettingsScreen
