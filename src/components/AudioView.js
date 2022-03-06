import React from 'react'
import { 
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native'
import FastImage from 'react-native-fast-image'
import normalize from 'react-native-normalize'
import { PLAY_BUTTON_PRIMARY } from '../constants/icons'
import colors from '../theme/colors'
import fonts from '../theme/fonts'
import metrics from '../theme/metrics'

function AudioView({
    navigation,
    item,
    horizontal = false
}) {
    return (
        <TouchableOpacity
            style={{
                width: horizontal === false ? metrics.screenWidth - 30 : metrics.screenWidth - 100,
                height: normalize(200),
                backgroundColor: colors.white,
                marginVertical: normalize(7),
                elevation: 1,
                borderRadius: normalize(20),
                shadowColor: colors.backgroundColor,
                padding: normalize(20),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: horizontal === true ? normalize(10) : 0
            }}
            onPress={() => {
                navigation.navigate('TrackPlayer', { item });
            }}
        >
            <View
                style={{
                    justifyContent: 'space-around',
                    flex: 1,
                    height: '100%'
                }}
            >
                <View>
                    <Text
                        style={{
                            fontSize: fonts.size.font18,
                            color: colors.textPrimary
                        }}
                        numberOfLines={2}
                    >
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            fontSize: fonts.size.font12,
                            color: colors.textGrey,
                            marginTop: normalize(7),
                            // width: metrics.screenWidth / 2.5
                        }}
                        numberOfLines={3}
                    >
                        {item.description}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <Image
                        source={PLAY_BUTTON_PRIMARY}
                        style={{
                            width: normalize(23),
                            height: normalize(23),
                            marginRight: normalize(10)
                        }}
                    />
                    <Text 
                        style={{
                            color: colors.secondary,
                            fontSize: fonts.size.font14,
                            
                        }}
                    >{item.duration}</Text>
                </View>
            </View>
            <FastImage
                source={{uri: item?.imageUrl}}
                style={{
                    height: '80%',
                    // width: '40%',
                    flex: .89
                }}
                resizeMode='contain'
            />
        </TouchableOpacity>
    )
}

export default AudioView
