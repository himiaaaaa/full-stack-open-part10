import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  appBar: {
    color: theme.colors.textThird,
    fontSize: theme.fontSizes.appBarHeading,
    fontWeight: theme.fontWeights.bold
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorTextThird: {
    color: theme.colors.textThird
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  textPadding: {
    padding: theme.padding.normal
  }
});

const Text = ({ color, fontSize, fontWeight, padding, style, ...props }) => {
  const textStyle = [
    styles.text,
    style === 'appBar' && styles.appBar,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'textThird' && styles.colorTextThird,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'heading' && styles.fontSizeHeading,
    fontWeight === 'bold' && styles.fontWeightBold,
    padding === 'normal' && styles.textPadding,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;