import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { 
    FlatList,
    Image,
    SafeAreaView, 
    ScrollView, 
    StatusBar, 
    StyleSheet, 
    Text,
    View
} from 'react-native';
import normalize from 'react-native-normalize';
import AudioView from '../components/AudioView';
import Category from '../components/Category';
import { MAN } from '../constants/images';
import { categoriesData } from '../store/data';
import colors from '../theme/colors';
import fonts from '../theme/fonts';

const greetings = (date = new Date()) => {
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) {
        return "Good morning";
    } else if (hour >= 12 && hour < 17) {
        return "Good afternoon";
    } else if ((hour >= 17 && hour <= 23) || hour < 5) {
        return "Good evening";
    }
}


const Header = () => {
    return(
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor: colors.white,
                height: normalize(70)
            }}
        >
            <Text 
                style={{
                    fontWeight: fonts.weight.semi,
                    fontSize: fonts.size.font22,
                    fontFamily: fonts.type.montserratBold,
                    color: colors.primary
                }}
            >
                {greetings()}
            </Text>
            <Image
                source={MAN}
                style={{
                    height: normalize(55),
                    width: normalize(55)
                }}
                resizeMode={'center'}
            />
        </View>
    )
}

const SubHeader = ({content}) => {
    return(
        <Text
            style={{
                fontWeight: fonts.weight.low,
                fontSize: fonts.size.font16,
                color: colors.secondary,
                fontFamily: fonts.type.montserratMedium,
                marginVertical: normalize(10)
            }}
        >
            {content}
        </Text>
    )
}

function HomeScreen({
    navigation
}) {

    const [categories, setCategories] = useState({
        isLoading: true,
        categories: []
    });

    const [isLoading, setIsLoading] = useState([]);

    const [microContent, setMicroContent] = useState({
        isLoading: true,
        audioTracks: []
    });

    const [guidedMeditation, setGuidedMeditation] = useState({
        isLoading: true,
        audioTracks: []
    });

    useEffect(() => {
        getCategories();
        getMicroContent();
        getGuidedMeditation();
    }, []);

    const getMicroContent = async() => {
        try{
            const { data } = await axios.get('https://raw.githubusercontent.com/Harikarthyk/Medify-Content/main/micro.json');
            setMicroContent({
                isLoading: false,
                audioTracks: data?.audios
            });
        }catch(error){
            setMicroContent({
                isLoading: false,
                audioTracks: []
            });
        }
        
    }

    const getGuidedMeditation = async() => {
        try{
            const { data } = await axios.get('https://raw.githubusercontent.com/Harikarthyk/Medify-Content/main/guidedMeditation.json');
            setGuidedMeditation({
                isLoading: false,
                audioTracks: data?.audios
            });
        }catch(error){
            setMicroContent({
                isLoading: false,
                audioTracks: []
            });
        }
        
    }

    const getCategories = async() => {
        try{
            var { data } = await axios.get('https://raw.githubusercontent.com/Harikarthyk/Medify-Content/main/categories.json');
            setCategories({
                isLoading: false,
                categories: data?.categories
            });
        }catch(error){
            setCategories({
                isLoading: false,
                categories: []
            });
        }
        
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <StatusBar
                backgroundColor={colors.primary}
            />

            <ScrollView
                style={styles.scrollContainer}
            >
                <Header />
                
                <View
                    style={styles.categoryContainer}
                >
                    <SubHeader content={'Medify Categories'} />
                    <View
                        style={{
                            marginVertical: normalize(10)
                        }}
                    >
                        <FlatList
                            data={categories.categories}
                            style={{
                                width: '100%',
                            }}
                            keyExtractor={item => `${item.id}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <Category key={item.id} item={item} navigation={navigation} />}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <SubHeader content={'Guided Meditation'} />
            
                    <FlatList
                    style={{
                        width: '100%',
                    }}
                        data={guidedMeditation.audioTracks}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({item, index}) => <AudioView horizontal={true} key={item.id} item={item} navigation={navigation} />}
                    />
                </View>

                <View
                    style={styles.categoryContainer}
                >
                    <SubHeader content={'Micro Hits'} />
                    {
                        microContent.audioTracks.map((item, index) => {
                            return <AudioView key={item.id + index + ''} item={item} navigation={navigation} />
                        })
                    }
                </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    scrollContainer: {
        flex: 1,
        padding: normalize(15)
    },
    categoryContainer: {
        marginVertical: normalize(10)
    }
})

export default HomeScreen
