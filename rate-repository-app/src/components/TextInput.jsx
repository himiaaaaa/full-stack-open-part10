import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    errorStyle: {
        borderWidth: 2,
        borderColor: '#d73a4a'
    }
});

const TextInput = ({ style, error, ...props }) => {
    const TextInputStyle = [style, error && styles.errorStyle];

    return <NativeTextInput style={TextInputStyle} {...props}/>
};

export default TextInput;