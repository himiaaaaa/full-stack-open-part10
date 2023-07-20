import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import useSignIn from '../hooks/useSignIn';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';


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

export const SignInContainer = ({ onSubmit }) => {

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
}

const SignIn = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate()

    const onSubmit = async(values) => {
        const { username, password } = values;

        try {
            await signIn({ username, password });  

            navigate('/')
        }catch (e){
            console.log('e', e)
        }
    }

  return <SignInContainer onSubmit={onSubmit}/>
};

export default SignIn;