const type = {
  base: 'NanumBarunGothic',
  bold: 'NanumBarunGothic Bold'
}

const size = {
  header: 20,
  card: 24,
  cardLarge: 35,
  input: 18,
  large: 30,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
}

const style = {
  header: {
    fontFamily: type.base,
    fontSize: size.header,
    fontWeight: '400'
  },
  large: {
    fontFamily: type.base,
    fontSize: size.large,
    fontWeight: '400',
    lineHeight: size.large * 1.4
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
    fontWeight: '400',
    lineHeight: size.regular * 1.4
  },
  small: {
    fontFamily: type.base,
    fontWeight: '400',
    fontSize: size.small,
    lineHeight: size.small * 1.4
  },
  tiny: {
    fontFamily: type.base,
    fontWeight: '400',
    fontSize: size.tiny,
    lineHeight: size.tiny * 1.4
  },
  medium: {
    fontFamily: type.base,
    fontWeight: '400',
    fontSize: size.medium
  },
  tag: {
    fontFamily: type.base,
    fontWeight: '200',
    fontSize: size.medium,
    lineHeight: size.medium * 1.4
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  card: {
    fontFamily: type.bold,
    fontSize: size.card,
    fontWeight: '700',
    lineHeight: Math.round(size.card * 1.9)
  },
  cardLarge: {
    fontFamily: type.bold,
    fontSize: size.cardLarge,
    fontWeight: '700',
    lineHeight: Math.round(size.cardLarge * 1.9)
  }
}

export default {
  type,
  size,
  style
}
