import { Pressable, View, StyleSheet } from 'react-native';

import NativeText from './Text';

import theme from "../theme";

const styles = StyleSheet.create({
    appBar:{
        backgroundColor: theme.colors.textPrimary,
        paddingTop: theme.padding.appBarTop,
        paddingBottom: theme.padding.appBarBottom
    },
})

const AppBars = ({...props}) => {
    const appBarStyle = [
        styles.appBar,
    ];

    return <View style={appBarStyle} {...props} />;
}

const onPressFunction = () => {
    null
}

const AppBar = () => {
  return <AppBars>
            <Pressable onPress={onPressFunction}>
                <NativeText style='appBar'>Repositories</NativeText>
            </Pressable>       
        </AppBars>;
};

export default AppBar;