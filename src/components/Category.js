import AnimatedLottieView from 'lottie-react-native';
import React from 'react'
import { 
    TouchableOpacity,
    Text,
    View,
    Image,
    useColorScheme
} from 'react-native'
import FastImage from 'react-native-fast-image';
import normalize from 'react-native-normalize';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import metrics from '../theme/metrics';

function Category({
    navigation,
    item
}) {

    const theme = useColorScheme();

    const categoryClickHandler = () => {
        navigation.navigate('CategoryScreen', { category: item });
    }

    return (
        <TouchableOpacity
            onPress={categoryClickHandler}
            style={{
                height: metrics.screenHeight / 4, 
                width: normalize(160),
                marginRight: normalize(15),
                backgroundColor: theme === 'dark' ? colors.cardColorDark : colors.cardColorDefault,
                elevation: 2,
                borderRadius: normalize(20),
                justifyContent: 'space-evenly',
                shadowColor: colors.gray
            }}
            key={item.id}
        >
            {/* <AnimatedLottieView
                style={{
                    height: '80%',
                    width: '90%',
                    alignSelf: 'center',
                    borderRadius: normalize(10)
                  }}
                autoPlay
                loop
                key={item.lottie}
                source={require('../assets/lottie/calmness.json')}
            /> */}
            <FastImage
                style={{ 
                    height: normalize(120),
                    width: normalize(120),
                    alignSelf: 'center',
                    borderRadius: normalize(8)
                }}
                source={{
                    uri: item.imageUrl
                }}
                resizeMode='contain'
            />
            <Text 
                style={{
                    color: theme === 'dark' ? colors.textPrimaryDark : colors.textPrimaryDefault,
                    textAlign: 'center',
                    fontSize: fonts.size.font14,
                    fontFamily: fonts.type.montserratMedium,
                    fontWeight: fonts.weight.bold
                }}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    )
}

export default Category
