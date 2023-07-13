import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5
    },
    input: {
        backgroundColor: theme.colors.textThird,
        padding: 10,
        margin: 10
    },
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return(
        <>
            <TextInput 
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                style={styles.input}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{meta.errpr}</Text>}
        </>
    )
}

export default FormikTextInput;