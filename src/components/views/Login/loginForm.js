import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Input from '../../../utils/forms/input';
import ValidationRules from '../../../utils/forms/validationRules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUp, signIn } from '../../../store/actions/user_actions';
import { setTokens, getToken } from '../../../utils/misc';

class LoginForm extends Component {

    state = {
        type: "Login",
        action: "Login",
        actionMode: "Not a user, Register",
        hasError: false,
        form: {
            email: {
                value: "",
                valid: false,
                type: 'textinput',
                rules: {
                    isRequired: true,
                    isEmail: true
                }
            },
            password: {
                value: "",
                valid: false,
                type: 'textinput',
                rules: {
                    minLength: 6,
                    isRequired: true,
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

        //rules
        let rules = formCopy[name].rules;
        let valid = ValidationRules(value, rules, formCopy);

        formCopy[name].valid = valid;
        this.setState({
            form: formCopy
        })
    }
    confirmPassword = () => (
        this.state.type != "Login"
            ? <Input
                placeholder="Confirm your password"
                type={this.state.form.confirmPassword.type}
                value={this.state.form.confirmPassword.value}
                onChangeText={value => this.updatedInput('confirmPassword', value)}
                secureTextEntry
            />
            : null
    )
    changeFormType = () => {
        const type = this.state.type;

        this.setState({
            type: type === "Login" ? "Register" : "Login",
            action: type === " Login" ? "Register" : "Login",
            actionMode: type === "Login" ? "Not registered Login" : "Not a user, Register"
        })
    }

    formHasErrors = () => (
        this.state.hasError ?
            <View style={styles.errorContainer}>
                <Text style={styles.errorLabel}>
                    Opps, check your info
                </Text>
            </View>
            : null
    )
    manageAccess = () => {
        if (!this.props.User.userData.uid) {
            this.setState({ hasError: true })
        } else {
            setTokens(this.props.User.userData, () => {
                this.setState({ hasError: false })
                this.props.goNext();
            })
        }
    }

    submitUser = () => {
        let isFormValid = true;
        let formToSubmit = {};
        const formCopy = this.state.form;

        for (let key in formCopy) {
            if (this.state.type === "Login") {

                if (key !== 'confirmPassword') {
                    isFormValid = isFormValid && formCopy[key].valid;
                    formToSubmit[key] = formCopy[key].value;
                }
            } else {
                isFormValid = isFormValid && formCopy[key].valid;
                formToSubmit[key] = formCopy[key].value;
            }
        }
        if (isFormValid) {
            if (this.state.type === 'Login') {
                this.props.signIn(formToSubmit).then(() => {
                    this.manageAccess();
                })
            } else {
                this.props.signUp(formToSubmit).then(() => {
                    this.manageAccess();
                })
            }
        } else {
            this.setState({
                hasError: true
            })
        }
    }
    componentDidMount() {
        getToken((values) => {
            //  console.log(values)
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

                {this.confirmPassword()}
                {this.formHasErrors()}

                <View style={{ alignItems: 'center', marginVertical: 15 }}>
                    <View style={{ marginBottom: 10 }}>
                        <TouchableOpacity onPress={this.submitUser}>
                            <Text style={{ color: "#fd9727" }}>{this.state.type}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TouchableOpacity onPress={this.changeFormType}>
                            <Text style={{ color: "lightgrey" }}>{this.state.actionMode}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => this.props.goNext()}>
                            <Text style={{ color: "lightgrey" }}>I'll do it later</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formInputContainer: {
        minHeight: 400,
    },
    errorContainer: {
        marginBottom: 20,
        marginTop: 10,
        alignItems: 'center'
    },
    errorLabel: {
        color: 'red',
        fontFamily: 'Roboto-Black'
    }
})
const mapStateToprops = state => {
    return {
        User: state.User
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ signUp, signIn }, dispatch)
}
export default connect(mapStateToprops, mapDispatchToProps)(LoginForm)