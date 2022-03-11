import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';
import colors from '../../theme/colors';
import metrics from '../../theme/metrics';
import normalize from 'react-native-normalize';

function CategoryLoader({ theme }) {
    return (
        <View>
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item height={metrics.screenHeight / 4} flexDirection="row">
                    <SkeletonPlaceholder.Item width={normalize(160)} height={ metrics.screenHeight / 4} borderRadius={normalize(20)} />
                    <SkeletonPlaceholder.Item width={normalize(160)} marginLeft={10} height={ metrics.screenHeight / 4} borderRadius={normalize(20)} />
                    <SkeletonPlaceholder.Item width={normalize(160)} marginLeft={10} height={ metrics.screenHeight / 4} borderRadius={normalize(20)} />
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    )
}

export default CategoryLoader
