import { View, StyleSheet } from "react-native";
import Main from "./src/components/Main";
import Constants from 'expo-constants';
import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e1e4e8',
  }
})

const App = () => {
  
  console.log(Constants.expoConfig.extra.env) //manifest is not working

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <View style={styles.container}>
              <Main />
            </View>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style='auto' />
    </>
  )
}

export default App;
