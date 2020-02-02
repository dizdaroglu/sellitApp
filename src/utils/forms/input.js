import React from 'react';
import { Text, View, StyleSheet, TextInput, Picker } from 'react-native';

const Input = (props) => {
    let template = null;

    switch (props.type) {
        case "textinput":
            template =
                <TextInput
                    underlineColorAndroid="transparent"
                    {...props}
                    style={[styles.input, props.overrideStyle]}
                />
            break;
        case "picker":
            template =
                <Picker
                    selectedValue={props.value}
                    {...props}
                >
                    {
                        props.options.map((item, i) => (
                            <Picker.Item key={i} label={item} value={item} />
                        ))
                    }
                </Picker>
        default:
            return template

    }
    return template;
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomColor: '#eaeaea',
        borderBottomWidth: 1,
        fontSize: 18,
        padding: 5,
        marginTop: 10
    }
})
export default Input;
