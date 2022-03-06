import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import colors from '../theme/colors';

function CategoryScreen() {
    return (
        <SafeAreaView
            style={styles.container}
        >

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    }
})

export default CategoryScreen;
