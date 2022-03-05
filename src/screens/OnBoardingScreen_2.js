import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { 
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import normalize from 'react-native-normalize';
import Toast from 'react-native-toast-message';
import TextInput_1 from '../components/TextInput/TextInput_1';
import { HOME, LEFT_ARROW_PRIMARY } from '../constants/icons';
import { MAN, WOMAN } from '../constants/images';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import metrics from '../theme/metrics';

function OnBoardingScreen_2({ navigation }) {

    const [state, setState] = useState({
        name: '',
        gender: '',
        age: ''
    });

    const onChangeText = (key, value) => {
        setState({
            ...state,
            [key]: value
        });
    }

    const letsMoveInHandler = async() => {
        const { name, age, gender } = state;
      
        if(!name){
            Toast.show({
                type: 'error',
                text1: 'Name field is empty ?'
            });
            return;
        }
        if(!age){
            Toast.show({
                type: 'error',
                text1: 'Age field is empty ?'
            });
            return;
        }
        if(!gender){
            Toast.show({
                type: 'error',
                text1: 'Please Select your gender.'
            });
            return;
        }

        await AsyncStorage.setItem('user', JSON.stringify(state));
        navigation.replace('BottomTabStack');
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <ScrollView 
                style={styles.scrollViewContainer}  
                scrollEnabled={false}
                keyboardDismissMode='interactive'
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={LEFT_ARROW_PRIMARY}
                        resizeMode='center'
                        style={styles.backButton}
                    />
                </TouchableOpacity>
                <Text style={styles.heading}>
                    Lets get started!
                </Text>
                <Text>
                    Fill the Details to Continue.
                </Text>

                <KeyboardAvoidingView 
                    style={{
                        flex: 1,
                        marginVertical: normalize(20)
                    }}
                    enabled
                    behavior={Platform.OS === 'android' ?  'height' : 'padding'}
                >
                    <TextInput_1
                        value={state.name}
                        label={'Enter Your Name.'}
                        onChangeText={(value) => onChangeText('name', value)}
                        placeholder='Eg. Karthyk'
                        keyboardType={'name-phone-pad'}
                        key='name'
                        maxLength={25}
                    />
                    <TextInput_1
                        value={state.age}
                        label={'Enter Your Age.'}
                        onChangeText={(value) => onChangeText('age', value)}
                        placeholder='Eg. 21'
                        keyboardType={'numeric'}
                        key='age'
                        maxLength={25}
                    />
                    <View
                        style={styles.genderContainer}
                    >
                        <TouchableOpacity
                            style={[styles.gender, state.gender === 'male' && styles.genderSelected]}
                            onPress={() => onChangeText('gender', 'male')}
                        >
                            <Image
                                source={MAN}
                                style={styles.genderImage}
                                resizeMode='contain'
                            />
                            <Text
                                style={styles.genderText}
                            >
                                Male
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.gender, state.gender === 'female' && styles.genderSelected]}
                            onPress={() => onChangeText('gender', 'female')}
                        >
                            <Image
                                source={WOMAN}
                                style={styles.genderImage}
                                resizeMode='contain'
                            />
                            <Text
                                style={styles.genderText}
                            >
                                Female
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.gender, state.gender === 'other' && styles.genderSelected]}
                            onPress={() => onChangeText('gender', 'other')}
                        >
                            <Image
                                source={WOMAN}
                                style={styles.genderImage}
                                resizeMode='contain'
                            />
                            <Text
                                style={styles.genderText}
                            >
                                Other
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </ScrollView>
            <TouchableOpacity
                style={{
                    padding: normalize(15),
                    width: '90%',
                    alignSelf: 'center',
                    backgroundColor: colors.primary,
                    borderRadius: normalize(7.5),
                    elevation: 1,
                    position: 'absolute',
                    bottom: normalize(20)
                }}
                onPress={letsMoveInHandler}
            >
                <Text
                    style={{
                        color: colors.white,
                        fontSize: fonts.size.font16,
                        textAlign: 'center',
                        fontWeight: fonts.weight.semi
                    }}
                >
                    Lets Move in
                </Text>
            </TouchableOpacity>
            <Toast />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor,
        flex: 1
    },
    scrollViewContainer: {
        flex: 1,
        padding: normalize(15)
    },
    heading: {
        fontSize: fonts.size.font24,
        color: colors.black,
        fontWeight: fonts.weight.semi,
        fontFamily: fonts.type.montserratMedium,
        marginBottom: normalize(15)
    },
    subHeading: {
        fontSize: fonts.size.font14,
        color: colors.textGrey,
        fontFamily: fonts.type.montserratMedium
    },
    backButton: {
        width: normalize(30),
        height: normalize(30),
        marginBottom: normalize(30),
        marginTop: normalize(10)
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: normalize(25)
    },
    gender: {
        width: (metrics.screenWidth - 50) / 3,
        justifyContent: 'center',
        backgroundColor: colors.gray,
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(5),
        borderRadius: normalize(8),
        elevation: 2
    },
    genderImage: {
        width: '93%',
        height: normalize(125),
        alignSelf: 'center'
    },
    genderText: {
        color: colors.black,
        fontSize: fonts.size.font14,
        textAlign: 'center',
        fontFamily: fonts.type.montserratMedium
    },
    genderSelected: {
        borderWidth: 3, 
        borderColor: colors.primary
    },
    letsMoveButtonText: {
        color: colors.white,
        fontSize: fonts.size.font16,

    }
})

export default OnBoardingScreen_2
