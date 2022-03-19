
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View,
    FlatList
} from 'react-native';
import normalize from 'react-native-normalize';
import AudioView from '../components/AudioView'
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import AnimatedLottieView from 'lottie-react-native';
import { EMPTY } from '../constants/lottie';

const Heading = () => {
    return(
        <Text
            style={{
                fontSize: fonts.size.font20,
                color: colors.primary,
                fontWeight: fonts.weight.semi,
                marginTop: normalize(20),
                marginBottom: normalize(12)
            }}
        >
            Your Liked Audios
        </Text>
    )
}

function FavoritesScreen({navigation}) {

    const [items, setItems] = useState([]);

    useEffect(() => {

        navigation.addListener('focus', async() => {
            getFav();
        })
        getFav();
        
    }, []);

    const getFav = async() => {
        const myFav = await AsyncStorage.getItem('myFav');
        if(myFav !== null){
            const jsonFav = JSON.parse(myFav) || null;
            if(jsonFav?.fav){
                setItems([...jsonFav.fav])
            }
        }
        
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Heading />
            <View style={styles.bottomBorder}/>

            {
                items.length === 0 ?
                    <>
                    <AnimatedLottieView
                        source={EMPTY}
                        autoPlay
                        style={styles.lottie}
                        resizeMode='contain'
                        loop={false}
                    />
                    <Text
                        style={{
                            textAlign: 'center',
                            width: '90%',
                            alignSelf: 'center'
                        }}
                    >
                       Sorry! No Favorites Medify Music Track Found.
                    </Text>
                    </>
                :
                    <FlatList
                        style={{
                            flex: 1
                        }}
                        data={items}
                        keyExtractor={(item) => `${item.id}`}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <AudioView key={item.id} item={item} navigation={navigation} />}
                    />
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.backgroundColor,
        padding: normalize(15)
    },
    bottomBorder: {
        height: normalize(4), 
        backgroundColor: colors.secondary, 
        width: normalize(120), 
        marginBottom: normalize(20)
    },
    lottie: {
        height: normalize(380),
        width: '100%',
        alignSelf: 'center'
    }
})

export default FavoritesScreen
