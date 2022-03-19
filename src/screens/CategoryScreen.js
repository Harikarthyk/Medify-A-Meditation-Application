import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { 
    FlatList, 
    Image, 
    SafeAreaView, 
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import normalize from 'react-native-normalize';
import AudioView from '../components/AudioView';
import { LEFT_ARROW_PRIMARY } from '../constants/icons';
import colors from '../theme/colors';
import fonts from '../theme/fonts';

const Heading = ({content}) => {
    return(
        <Text
            style={{
                fontSize: fonts.size.font20,
                color: colors.primary,
                fontWeight: fonts.weight.semi
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
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    // justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: normalize(10),
                    marginBottom: normalize(5)
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        padding: normalize(10),
                        marginRight: normalize(5)
                        // left: 0,
                        // position: 'absolute'
                    }}
                >
                    <Image
                        source={LEFT_ARROW_PRIMARY}
                        style={{
                            width: normalize(30),
                            height: normalize(30)
                        }}
                    />
                </TouchableOpacity>
                <Heading content={`Category ${category?.name}`} />
            </View>
            <View style={styles.bottomBorder} />


            <FlatList
                style={{
                    flex: 1
                }}
                showsVerticalScrollIndicator={false}
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
        // backgroundColor: colors.backgroundColor,
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
