import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text
} from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

function TextInput_1({
    label = null,
    labelStyle = {},
    onChangeText,
    value,
    style = {},
    placeholder,
    placeholderStyle,
    keyboardType,
    maxLength
}) {
    return (
        <View>
            {
                label !== null ?
                    <Text style={[styles.label, labelStyle]}>
                        {label}
                    </Text>
                    :
                    <></>
            }
            <TextInput
                onChangeText={onChangeText}
                value={value}
                style={[styles.textInput, style]}
                placeholder={placeholder}
                placeholderStyle={placeholderStyle}
                keyboardType={keyboardType}
                maxLength={maxLength}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        backgroundColor: colors.gray,
        borderRadius: normalize(8),
        elevation: 1,
        fontFamily: fonts.type.montserratMedium,
        color: colors.black,
        fontSize: fonts.size.font14,
        paddingLeft: normalize(20),
        fontWeight: fonts.weight.normal
    },
    label: {
        color: colors.primary,
        fontSize: fonts.size.font14,
        marginBottom: normalize(10),
        marginTop: normalize(15)
    }
})

export default TextInput_1
