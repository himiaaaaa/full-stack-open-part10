import { Pressable, Text, View, StyleSheet } from "react-native"
import { Formik } from "formik"
import * as yup from 'yup';
import FormikTextInput from "./FormikTextInput"
import useCreateAReview from "../hooks/useCreateAReview";
import { useNavigate } from "react-router-native";

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
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

const CreateAReviewForm = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput name='ownerName' placeholder='Repository owner name'/>
            <FormikTextInput name='repositoryName' placeholder='Repository name'/>
            <FormikTextInput name='rating' placeholder='Rating between 0 and 100'/>
            <FormikTextInput name='text' placeholder='Review'/>
            <Pressable onPress={onSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Create a Review</Text>
            </Pressable>
        </View>
    )
}

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .required('Rating is required')
        .min(0, 'Rating must be at least 0') 
        .max(100, 'Rating cannot exceed 100'),
    text: yup
        .string()
    
})

const CreateAReview = () => {
    const [createAReview] = useCreateAReview();
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        console.log('review', values)
        const { ownerName, repositoryName, rating, text } = values

        try {
            const {data} = await createAReview({ ownerName, repositoryName, rating, text })
            console.log('reviewData', data.createReview)
            navigate(`/${data.createReview.repositoryId}`)
        }catch (e){
            console.log('reviewError', e)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({handleSubmit}) => <CreateAReviewForm onSubmit={handleSubmit}/>}
        </Formik>
    )
}

export default CreateAReview;