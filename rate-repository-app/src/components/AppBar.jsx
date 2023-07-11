import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import NativeText from './Text';

import theme from "../theme";

const styles = StyleSheet.create({
    appBar:{
        backgroundColor: theme.colors.textPrimary,
        paddingTop: theme.padding.appBarTop,
        paddingBottom: theme.padding.appBarBottom,
    },
    Link: {
        marginTop: 5,    
    }
})

const AppBars = ({...props}) => {
    const appBarStyle = [
        styles.appBar,
    ];

    return <View style={appBarStyle} {...props} />;
}

/* const onPressFunction = () => {
    null
} */

const AppBar = () => {
  return <AppBars>
            <Link to='/'>
                <NativeText style='appBar'>Repositories</NativeText>
            </Link>
            <Link to='/signIn' style={styles.Link}>
                <NativeText style='appBar'>Sign In</NativeText>
            </Link>         
        </AppBars>;
};

export default AppBar;