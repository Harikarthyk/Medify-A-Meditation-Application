import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';
import colors from '../../theme/colors';
import metrics from '../../theme/metrics';
import normalize from 'react-native-normalize';

function CategoryLoader({ theme, horizontal = false }) {
    return (
        <View>
            <SkeletonPlaceholder speed={800} highlightColor={theme === 'dark' ? colors.black : colors.cardColorDefault} backgroundColor={theme === 'dark' ? colors.cardColorDark : "#E1E9EE"} >
                <SkeletonPlaceholder.Item height={normalize(200)} flexDirection="row">
                    <SkeletonPlaceholder.Item width={horizontal === false ? metrics.screenWidth - 30: metrics.screenWidth - 90} height={normalize(200)} borderRadius={normalize(20)} />
                    {horizontal === true ? <SkeletonPlaceholder.Item highlightColor={'red'} width={horizontal === false ? metrics.screenWidth - 30: metrics.screenWidth - 90} marginLeft={10} height={normalize(200)} borderRadius={normalize(20)} /> : <></>}
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    )
}

export default CategoryLoader
