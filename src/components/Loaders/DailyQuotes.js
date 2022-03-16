import React from 'react';
import { View } from 'react-native';
import normalize from 'react-native-normalize';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../theme/colors';
import metrics from '../../theme/metrics';

function DailyQuotesLoader({ theme }) {
    return (
        <View>
            <SkeletonPlaceholder speed={800} highlightColor={theme === 'dark' ? colors.black : colors.cardColorDefault} backgroundColor={theme === 'dark' ? colors.cardColorDark : "#E1E9EE"} >
                <SkeletonPlaceholder.Item height={metrics.screenHeight / 3} padding={normalize(15)}>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    )
}

export default DailyQuotesLoader
