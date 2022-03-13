import React from 'react';
import { 
    View
} from 'react-native';
import normalize from 'react-native-normalize';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../theme/colors';
import metrics from '../../theme/metrics';

function TrackPlayer({ theme }) {
    return (
        <View
            style={{
                flex: 1
            }}
        >
            <SkeletonPlaceholder speed={800} highlightColor={theme === 'dark' ? colors.black : colors.cardColorDefault} backgroundColor={theme === 'dark' ? colors.cardColorDark : '#E1E9EE'} >
            <SkeletonPlaceholder.Item justifyContent={'center'} height={'100%'} >
                <SkeletonPlaceholder.Item position='absolute' top={10} height={normalize(60)} flexDirection={'row'} justifyContent={'space-between'} width={'100%'}>
                    <SkeletonPlaceholder.Item left={0} width={normalize(50)} height={normalize(50)} borderRadius={normalize(20)} />
                    <SkeletonPlaceholder.Item right={0} width={normalize(50)} height={normalize(50)} borderRadius={normalize(20)} />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item alignSelf='center' marginBottom={10} height={metrics.screenHeight / 3} borderRadius={normalize(10)} width={'60%'}/>
                <SkeletonPlaceholder.Item alignSelf='center' marginVertical={normalize(30)} height={10} borderRadius={normalize(10)} width={'80%'}/>
                <SkeletonPlaceholder.Item height={normalize(60)} marginVertical={normalize(40)}  flexDirection={'row'} width={'80%'} alignSelf={'center'} justifyContent={'space-between'}>
                    <SkeletonPlaceholder.Item width={normalize(50)} height={normalize(50)} borderRadius={normalize(20)} />
                    <SkeletonPlaceholder.Item width={normalize(50)} height={normalize(50)} borderRadius={normalize(20)} />
                    <SkeletonPlaceholder.Item width={normalize(50)} height={normalize(50)} borderRadius={normalize(20)} />
                </SkeletonPlaceholder.Item>
              
           </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    )
}

export default TrackPlayer
