import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    useColorScheme,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';
import normalize from 'react-native-normalize';
import { LOGOUT, PRIVACY, WALLET } from '../constants/icons';
import { MAN, WOMAN } from '../constants/images';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import metrics from '../theme/metrics';

const ProfileHeader = ({ name, gender, age, theme }) => {
    return (
        <View
            style={{
                padding: normalize(2),
            }}
        >
            <Text
                style={{
                    fontSize: fonts.size.font20,
                    color: colors.primary,
                    fontWeight: fonts.weight.semi,
                    marginTop: normalize(20),
                    marginBottom: normalize(12)
                }}
            >
                My Profile
            </Text>
            <View 
                style={{
                    height: normalize(4), 
                    backgroundColor: colors.secondary, 
                    width: normalize(80), 
                    marginBottom: normalize(30)
                }}
            />
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: theme === 'dark' ? colors.cardColorDark : colors.cardColorDefault,
                    padding: normalize(20),
                    borderRadius: normalize(15),
                    elevation: 2
                }}
            >
                {
                    gender === 'male' ?
                        <Image
                            source={MAN}
                            style={{
                                height: normalize(75),
                                width: normalize(75)
                            }}
                        />
                        :
                        <Image
                            source={WOMAN}
                            style={{
                                height: normalize(75),
                                width: normalize(75)
                            }}
                        />
                }

                <View

                    style={{
                        marginLeft: normalize(20)
                    }}
                >
                    <Text
                        style={{
                            width: normalize(200),
                            fontSize: fonts.size.font18,
                            marginBottom: normalize(10),
                            fontFamily: fonts.type.montserratBold,
                            color: theme === 'dark' ? colors.textPrimaryDark : colors.textPrimaryDefault
                        }}
                        numberOfLines={1}
                    >
                        {name}
                    </Text>

                    <Text
                        style={{
                            width: normalize(200),
                            fontSize: fonts.size.font14,
                            marginBottom: normalize(10),
                            color: colors.secondary
                        }}
                    >
                        Age - {age}
                    </Text>
                </View>

            </View>
        </View>
    )
}

const ListView = () => {

}

function SettingsScreen({ navigation }) {

    const [user, setUser] = useState({
        name: '',
        age: '',
        gender: '',
        lastUsed: '',
        created: ''
    });

    const theme = useColorScheme();

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        var data = await AsyncStorage.getItem('user');
        data = JSON.parse(data);
        setUser({
            name: data?.name,
            age: data?.age,
            gender: data?.gender,
            lastUsed: data?.lastUsed || new Date(),
            created: data?.created || new Date()
        });
    }

    const logoutHandler = async() => {
        await AsyncStorage.clear();
        navigation.replace('SplashScreen');
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
                theme={theme}
            />

            <View style={{height: normalize(30)}} />

            {/* <TouchableOpacity
                style={[styles.buttonStyle, { backgroundColor: theme === 'dark' ? colors.cardColorDark : colors.cardColorDefault }]}
                onPress={() => {

                }}
            >
                <Image
                    source={PRIVACY}
                    style={styles.icon}
                />
                <Text
                    style={[styles.text, {color: '#DCB23D'}]}
                >
                   Privacy Policy
                </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={[styles.buttonStyle, { backgroundColor: theme === 'dark' ? colors.cardColorDark : colors.cardColorDefault }]}
                onPress={() => {
                    Linking.openURL('https://www.patreon.com/harikarthyk');
                }}
            >
                <Image
                    source={WALLET}
                    style={styles.icon}
                />
                <Text
                    style={[styles.text, {color: colors.secondary}]}
                >
                    Donate Us
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.buttonStyle, { backgroundColor: theme === 'dark' ? colors.cardColorDark : colors.cardColorDefault }]}
                onPress={logoutHandler}
            >
                <Image
                    source={LOGOUT}
                    style={styles.icon}
                />
                <Text
                    style={[styles.text, {color: '#DA4444'}]}
                >
                    Log Out
                </Text>
            </TouchableOpacity>

            <Text
                style={{
                    color: colors.textGrey,
                    fontSize: fonts.size.font12,
                    textAlign: 'center',
                    position: 'absolute',
                    zIndex: 1,
                    bottom: normalize(20),
                    left: '40%'
                }}
            >
                Meditate v1.0.2
            </Text>

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
        width: '95%',
        alignSelf: 'center',
        borderRadius: normalize(10),
        marginVertical: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        padding: normalize(20)
    },
    text: {
        fontSize: fonts.size.font14,
        fontFamily: fonts.type.montserratMedium
    },
    icon: {
        height: normalize(33),
        width: normalize(33),
        marginRight: normalize(25)
    }
})

export default SettingsScreen
