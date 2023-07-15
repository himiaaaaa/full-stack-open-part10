import Constants from 'expo-constants';
import { Platform } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      textThird: 'white',
      primary: '#0366d6',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
      heading: 18,
      appBarHeading: 20
    },
    fonts: {
        main: Platform.select({
          android: "Roboto",
          ios: "Arial",
          default: "System",
        }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    padding: {
        appBarTop: Constants.statusBarHeight,
        appBarBottom: 15,
        normal: 5
    }
  };
  
  export default theme;