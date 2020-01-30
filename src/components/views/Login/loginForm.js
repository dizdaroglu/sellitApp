import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Input from '../../../utils/forms/input';

export default class LoginForm extends Component {

    state = {
        form: {
            email: {
                value: "",
                valid: false,
                type: 'textinput',
                rules: {
                    isEmail: true
                }
            },
            password: {
                value: "",
                valid: false,
                type: 'textinput',
                rules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    confirmPass: "password"
                }
            }
        }
    }
    updatedInput = (name, value) => {
        this.setState({
            hasError: false
        })
        let formCopy = this.state.form;
        formCopy[name].value = value;

        this.setState({
            form: formCopy
        })
    }
    render() {
        return (
            <View style={styles.formInputContainer}>
                <Input
                    placeholder="Enter your email"
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    onChangeText={value => this.updatedInput("email", value)}
                    autoCapitalize={"none"}
                    keyboardType={"email-address"}
                />
                <Input
                    placeholder="Enter your password"
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    onChangeText={value => this.updatedInput('password', value)}
                    secureTextEntry
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formInputContainer: {
        minHeight: 400,
    }
})