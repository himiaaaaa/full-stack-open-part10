import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import useSignIn from '../hooks/useSignIn';
import * as yup from 'yup';

const initialValues = {
    username: '',
    password: '',
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4169e1',
        padding: 10,
        margin: 10,
    },
    buttonText: {
        textAlign: 'center'
    }
})

const SignInForm = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput name='username' placeholder='Username' />
            <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
            <Pressable onPress={onSubmit} style={styles.button}>
                <Text color='textThird' fontWeight='bold' style={styles.buttonText}>Sign in</Text>
            </Pressable>
        </View>
    )
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('username is required'),
    password: yup
        .string()
        .required('password is required')
})

const SignIn = () => {
    const [signIn] = useSignIn();

    const onSubmit = async(values) => {
        const { username, password } = values;
        console.log('press')

        try {
            const {data} = await signIn({ username, password });
            console.log(data);
        }catch (e){
            console.log(e)
        }
    }

  return (
    <View>
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
        </Formik>
    </View>
)
};

export default SignIn;