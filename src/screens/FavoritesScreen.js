import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import normalize from 'react-native-normalize'
import { useState } from 'react/cjs/react.development'
import AudioView from '../components/AudioView'
import colors from '../theme/colors'
import fonts from '../theme/fonts'

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
            Your Liked Medify Audios
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
        const jsonFav = JSON.parse(myFav) || null;
        if(jsonFav){
            setItems([...jsonFav.fav])
        }
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Heading />
            <View style={styles.bottomBorder}/>

            <FlatList
                style={{
                    flex: 1
                }}
                data={items}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <AudioView key={item.id} item={item} navigation={navigation} />}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        padding: normalize(15)
    },
    bottomBorder: {
        height: normalize(4), 
        backgroundColor: colors.secondary, 
        width: normalize(120), 
        marginBottom: normalize(20)
    }
})

export default FavoritesScreen
