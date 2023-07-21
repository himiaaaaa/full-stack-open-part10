import { Text, View, Pressable, StyleSheet } from "react-native"
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from 'yup';
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
    username: '',
    password: '',
    passwordConfirm: ''
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4169e1',
        padding: 10,
        margin: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700'
    }
})

const SignUpForm = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput name='username' placeholder='Username' />
            <FormikTextInput name='password' placeholder='Password' />
            <FormikTextInput name='passwordConfirm' placeholder='Password confirmation' />
            <Pressable onPress={onSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
        </View>
    )
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .min(5, 'Username must be at least 5 characters')
        .max(30, 'Username must be less than 30 characters'),
    password: yup
        .string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters')
        .max(30, 'Password must be less than 30 characters'),
    passwordConfirm: yup
        .string()
        .oneOf([ yup.ref('password'), null ])
        .required('Password confirm is required')
})

const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        console.log('hi', values)
        const { username, password } = values

        try {
            const {data} = await signUp({ username, password })
            console.log('signUpData', data)
            await signIn({ username, password })
            navigate('/')
        }catch (e){
            console.log('signUpError',e)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit}/>}
        </Formik>
    )
}

export default SignUp;