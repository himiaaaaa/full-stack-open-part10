import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

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
            <FormikTextInput name='Username' placeholder='Username' />
            <FormikTextInput name='Password' placeholder='Password' secureTextEntry={true} />
            <Pressable onPress={onSubmit} style={styles.button}>
                <Text color='textThird' fontWeight='bold' style={styles.buttonText}>Sign in</Text>
            </Pressable>
        </View>
    )
}

const SignIn = () => {
    const onSubmit = values => {
        console.log(values)
    }


  return (
    <View>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
        </Formik>
    </View>
)
};

export default SignIn;