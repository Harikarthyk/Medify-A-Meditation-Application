import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    View 
} from 'react-native';
import metrics from '../theme/metrics';

const QUOTES_URL = `https://quotes.rest/qod?language=en`;

function DailyQuotesScreen({ navigation }) {

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
            <ScrollView
                style={styles.quotes}
                showsHorizontalScrollIndicator={false}
            >

                <View
                    style={styles.quotesTextContainer}
                >
                    <Text
                        style={styles.quotesText}
                    >

                    </Text>
                </View>
                <Text
                    style={styles.author}
                >

                </Text>

            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    quotes: {
        height: normalize(200)
    }
})

export default DailyQuotesScreen;
