import { View, StyleSheet } from "react-native";
import Main from "./src/components/Main";
import Constants from 'expo-constants';
import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e1e4e8',
  }
})

const App = () => {
  return (
    <>
      <NativeRouter>
       <ApolloProvider client={apolloClient}>
        <View style={styles.container}>
          <Main />
        </View>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style='auto' />
    </>
  )
}

export default App;
