import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    View,
    Text,
    useColorScheme,
    FlatList
} from 'react-native';
import FastImage from 'react-native-fast-image';
import normalize from 'react-native-normalize';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import metrics from '../theme/metrics';
import DailyQuotesLoader from '../components/Loaders/DailyQuotes';

const QUOTES_URL = `https://quotes.rest/qod?language=en`;


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
            Your Daily Quotes "
        </Text>
    )
}

const displayTags = (tags, theme) => {
    return (
        <FlatList
            contentContainerStyle={{ 
                flexDirection: 'row',
                flexWrap: 'wrap',
                maxWidth: '100%'
            }}
           
            data={Object.entries(tags)}
            renderItem={({item}) => {
                return (
                    <Text
                        style={{
                            padding: normalize(14),
                            backgroundColor: theme === 'dark' ? colors.black : colors.gray,
                            margin: normalize(5),
                            borderRadius: normalize(5),
                            textTransform: 'capitalize',
                            elevation: 2
                        }}
                    >
                        {item[1]}
                    </Text>
                )
            }}
            
            keyExtractor={(item) => item[1]}
        />
    )
}


function DailyQuotesScreen({ navigation }) {

    const theme = useColorScheme();

    const [quotes, setQuotes] = useState({
        isLoading: true,
        content: {}
    });

    useEffect(() => {
        getQuotes();
    }, []);

    const getQuotes = async() => {
        try{
            const response = await axios.get(QUOTES_URL);
            const { data } = response;
            if(data?.contents){
                const { contents } = data;
                if(contents.quotes){
                    setQuotes({
                        ...quotes,
                        isLoading: false,
                        content: contents.quotes[0]
                    });
                }else{
                    setQuotes({
                        ...quotes,
                        isLoading: false,
                        content: {}
                    });
                }
            }else{
                setQuotes({
                    ...quotes,
                    isLoading: false,
                    content: {}
                });
            }
        }catch(error){
            console.log('Error DailyQuotesScreen Line 51');
            setQuotes({
                ...quotes,
                isLoading: false,
                content: {}
            });
        }
    }


    return (
        <SafeAreaView
            style={styles.container}
        >

            <Heading  />
            <View style={styles.bottomBorder}/>

            <ScrollView
                style={styles.quotes}
                showsVerticalScrollIndicator={false}
            >

                <View
                    style={[styles.quotesContainer, { backgroundColor: theme === 'dark' ? colors.cardColorDark : colors.cardColorDefault }]}
                >
                    {quotes.isLoading === true ?
                        <DailyQuotesLoader theme={theme} />
                        :
                        <>
                            <FastImage
                                source={{
                                    uri: quotes.content?.background
                                }}
                                style={styles.background}

                            />
                            <Text
                                style={styles.quotesText}
                            >
                                {quotes.content?.quote}
                            </Text>
                            <Text
                                style={styles.author}
                            >
                                - {quotes.content?.author}
                            </Text>
                            <View
                                style={{
                                    flex: 1
                                }}
                            >
                                {quotes.content?.tags && displayTags(quotes.content?.tags, theme)}
                            </View>
                        </>
                    }
                </View>
                        
            </ScrollView>
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
                 Ⓒ They Said So
            </Text>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: normalize(15)
    },
    quotes: {
        flex: 1
    },
    bottomBorder: {
        height: normalize(4), 
        backgroundColor: colors.secondary, 
        width: normalize(140), 
        marginBottom: normalize(20)
    },
    quotesContainer:{
        padding: normalize(20),
        elevation: 2,
        borderRadius: normalize(12),
        width: '100%'
    },
    quotesText: {
        fontFamily: fonts.type.montserratRegular,
        fontWeight: fonts.weight.normal,
        fontSize: fonts.size.font16,
        marginVertical: normalize(20)
    },
    author:{
        fontFamily: fonts.type.montserratBold,
        fontWeight: fonts.weight.semi,
        fontSize: fonts.size.font14,
        color: colors.secondary,
        marginVertical: normalize(10),
        textAlign: 'right'
    },
    background:{
        colors: colors.textGrey,
        width: '100%',
        height: normalize(220),
        borderRadius: normalize(12),
        elevation: 2
    }
})

export default DailyQuotesScreen;
