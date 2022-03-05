import metrics from './metrics';

const { screenWidth } = metrics;

const calculateFontSize = (size) => {
    return screenWidth * (size / 365);
}

const size = {
    font6: calculateFontSize(6),
    font8: calculateFontSize(8),
    font10: calculateFontSize(10),
    font12: calculateFontSize(12),
    font14: calculateFontSize(14),
    font16: calculateFontSize(16),
    font18: calculateFontSize(18),
    font20: calculateFontSize(20),
    font22: calculateFontSize(22),
    font24: calculateFontSize(24)
}

const weight = {
    full: '900',
    semi: '700',
    low: '400', 
    bold: 'bold',
    normal: 'normal'
}

const type = {
    montserratMedium: 'Montserrat-Medium',
    montserratRegular: 'Montserrat-Regular',
    montserratBold: 'Montserrat-Bold'
}

export default {
    size,
    weight,
    type
}