import { useApolloClient, useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations';
import { useAuthStorage } from '../hooks/useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(AUTHENTICATE);

    console.log('result', result);

    const signIn = async({ username, password }) => {

       const { data } = await mutate({ variables: {credentials: { username, password }}});

       console.log('data', data.authenticate.accessToken)

       await authStorage.setAccessToken(data.authenticate.accessToken)

       apolloClient.resetStore();
    };

    return [signIn, result]
}

export default useSignIn;