import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { 
    FlatList, 
    SafeAreaView, 
    StyleSheet,
    Text,
    View
} from 'react-native';
import normalize from 'react-native-normalize';
import AudioView from '../components/AudioView';
import colors from '../theme/colors';
import fonts from '../theme/fonts';

const Heading = ({content}) => {
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
            {content}
        </Text>
    )
}

function CategoryScreen({navigation, route}) {
    const { category } = route.params;

    const [categoryInfo, setCategoryInfo] = useState({
        isLoading: true,
        audios: []
    })

    const getCategoryInfo = async() => {
        try{
            const { data } = await axios.get(`https://raw.githubusercontent.com/Harikarthyk/Medify-Content/main/${category.name}.json`);
            setCategoryInfo({
                isLoading: false,
                audioTracks: data?.audios
            });
        }catch(error){
            console.log(error)
            setCategoryInfo({
                isLoading: false,
                audioTracks: []
            });
        }
    }

    useEffect(() => {
        getCategoryInfo();
    }, []);

    return (
        <SafeAreaView
            style={styles.container}
        >

            <Heading  content={`Medify's ${category?.name}`} />
            <View style={styles.bottomBorder} />


            <FlatList
                style={{
                    flex: 1
                }}
                data={categoryInfo.audioTracks}
                renderItem={({item}) => <AudioView item={item} navigation={navigation} />}
                keyExtractor={(item) => item.id}

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

export default CategoryScreen;
