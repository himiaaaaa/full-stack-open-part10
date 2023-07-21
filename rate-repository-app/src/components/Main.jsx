
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import SingleRepository from './singleRepository';
import CreateAReview from './CreateAReview';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='/signIn' element={<SignIn />} exact />
        <Route path='/signUp' element={<SignUp />} exact />
        <Route path='/:id' element={<SingleRepository />} />
        <Route path='/createAReview' element={<CreateAReview />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;