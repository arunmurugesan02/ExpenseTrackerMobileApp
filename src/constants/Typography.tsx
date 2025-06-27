import React from 'react';
import {Text, TextProps} from 'react-native';
import {StyleSheet} from 'react-native';

interface Props extends TextProps {
  children: React.ReactNode;
}

export const Fonts = {
  primary: 'Inter',
};

export const Typography = StyleSheet.create({
  titleX: {
    fontFamily: Fonts.primary,
    fontSize: 64,
    lineHeight: 80,
    fontWeight: '700',
  },
  title1: {
    fontFamily: Fonts.primary,
    fontSize: 32,
    lineHeight: 34,
    fontWeight: '700',
  },
  title2: {
    fontFamily: Fonts.primary,
    fontSize: 24,
    lineHeight: 22,
    fontWeight: '700',
  },
  title3: {
    fontFamily: Fonts.primary,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
  },
  regular1: {
    fontFamily: Fonts.primary,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
  },
  regular2: {
    fontFamily: Fonts.primary,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
  },
  regular3: {
    fontFamily: Fonts.primary,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
  },
  small: {
    fontFamily: Fonts.primary,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
  },
  tiny: {
    fontFamily: Fonts.primary,
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '400',
  },
});

export const TitleX: React.FC<Props> = ({children, style, ...rest}) => (
  <Text style={[Typography.titleX, style]} {...rest}>
    {children}
  </Text>
);

export const Title1: React.FC<Props> = ({children, style, ...rest}) => (
  <Text style={[Typography.title1, style]} {...rest}>
    {children}
  </Text>
);

export const Title2: React.FC<Props> = ({children, style, ...rest}) => (
  <Text style={[Typography.title2, style]} {...rest}>
    {children}
  </Text>
);

export const Title3: React.FC<Props> = ({children, style, ...rest}) => (
  <Text style={[Typography.title3, style]} {...rest}>
    {children}
  </Text>
);

export const Regular1: React.FC<Props> = ({children, style, ...rest}) => (
  <Text style={[Typography.regular1, style]} {...rest}>
    {children}
  </Text>
);

export const Regular2: React.FC<Props> = ({children, style, ...rest}) => (
  <Text style={[Typography.regular2, style]} {...rest}>
    {children}
  </Text>
);

export const Regular3: React.FC<Props> = ({children, style, ...rest}) => (
  <Text style={[Typography.regular3, style]} {...rest}>
    {children}
  </Text>
);

export const Small: React.FC<Props> = ({children, style, ...rest}) => (
  <Text style={[Typography.small, style]} {...rest}>
    {children}
  </Text>
);

export const Tiny: React.FC<Props> = ({children, style, ...rest}) => (
  <Text style={[Typography.tiny, style]} {...rest}>
    {children}
  </Text>
);
