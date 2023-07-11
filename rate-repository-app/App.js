import { View, StyleSheet } from "react-native";
import Main from "./src/components/Main";
import Constants from 'expo-constants';
import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";

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
        <View style={styles.container}>
          <Main />
        </View>
      </NativeRouter>
      <StatusBar style='auto' />
    </>
    
  
  )
}

export default App;
