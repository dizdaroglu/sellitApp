import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import NotAllow from './notallow';
import Input from '../../../../utils/forms/input';
import ValidationRules from '../../../../utils/forms/validationRules';
import { bindActionCreators } from 'redux';
import { addArticle, resetArticle } from '../../../../store/actions/articles_actions';
import { autoSignIn } from '../../../../store/actions/user_actions';
import { setTokens, getToken } from '../../../../utils/misc';

class AddPost extends Component {

    state = {
        loading: false,
        hasError: false,
        modalVisible: false,
        modalSuccess: false,
        errorsArray: [],
        form: {
            category: {
                value: "",
                name: "category",
                valid: false,
                type: "picker",
                options: ['Select a category', 'Sports', 'Music', 'Clothing', 'Electronics'],
                rules: {
                    isRequired: true
                },
                errorMsg: "You need to select a category"
            },
            title: {
                value: "",
                name: "title",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true,
                    maxLength: 50
                },
                errorMsg: "You need to enter a title, max of 50 char"
            },
            description: {
                value: "",
                name: "description",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true,
                    maxLength: 200
                },
                errorMsg: "You need to enter a title, max of 200 char"
            },
            price: {
                value: "",
                name: "price",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true,
                    maxLength: 6
                },
                errorMsg: "You need to enter a price, max of 6"
            },
            email: {
                value: "",
                name: "email",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true,
                    isEmail: true
                },
                errorMsg: "You need to enter an email, make it a valid email"

            }
        }
    }

    goLogin = () => {
        this.props.navigation.navigate('Auth')
    }
    updateInput = (name, value) => {
        this.setState({
            hasError: false
        })
        let formCopy = this.state.form;
        formCopy[name].value = value;

        let rules = formCopy[name].rules;
        let valid = ValidationRules(value, rules, formCopy);

        formCopy[name].valid = valid;

        this.setState({
            form: formCopy
        })
    }
    submitFormHandler = () => {
        let isFormValid = true;
        let dataToSubmit = {};
        const formCopy = this.state.form;

        for (let key in formCopy) {
            isFormValid = isFormValid && formCopy[key].valid;
            dataToSubmit[key] = this.state.form[key].value;
        }
        if (isFormValid) {
            this.setState({
                loading: true
            })
            getToken((value) => {
                const dateNow = new Date();
                const expiration = dateNow.getTime();
                const form = {
                    ...dataToSubmit,
                    uid: value[3][1]
                }

                if (expiration > value[2][1]) {
                    this.props.autoSignIn(value[1][1]).then(() => {
                        setTokens(this.props.User.userData, () => {
                            this.props.addArticle(form, this.props.User.userData.token).then(() => {
                                this.setState({ modalSuccess: true })
                            })
                        })
                    })
                } else {
                    this.props.addArticle(form, value[0][1]).then(() => {
                        this.setState({ modalSuccess: true })
                    })
                }
            })
        } else {
            let errorsArray = [];
            for (let key in formCopy) {
                if (!formCopy[key].valid) {
                    errorsArray.push(formCopy[key].errorMsg)
                }
            }
            this.setState({
                loading: false,
                hasError: true,
                modalVisible: true,
                errorsArray
            })
        }

    }
    showErrorsArray = (errors) => (
        errors ?
            errors.map((item, i) => (
                <Text key={i} style={styles.errorItem}> - {item}</Text>
            ))
            : null
    )
    clearErrors = () => {
        this.setState({
            hasError: false,
            modalVisible: false,
            errorsArray: []
        })
    }
    resetSellitScreen = () => {
        const formCopy = this.state.form;
        for (let key in formCopy) {
            formCopy[key].valid = false;
            formCopy[key].value = "";
        }
        this.setState({
            modalSuccess: false,
            hasError: false,
            errorsArray: [],
            loading: false
        })
        this.props.resetArticle()
    }
    render() {
        console.log(this.props.User)
        if (this.props.User.userData.token === null) {
            return (
                <NotAllow goLogin={this.goLogin} />
            )
        } else {
            return (
                <ScrollView>
                    <View style={styles.formInputContainer}>
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <Text style={styles.minTitle}>Sell your things</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Text>Select a category</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Input
                                    placeholder="Select a category"
                                    type={this.state.form.category.type}
                                    value={this.state.form.category.value}
                                    onValueChange={value => this.updateInput("category", value)}
                                    options={this.state.form.category.options}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.secondTitle}>
                                Describe what you are selling
                            </Text>
                        </View>
                        <View>
                            <Text>Please add the title, be descriptive</Text>
                            <Input
                                placeholder="Enter a title"
                                type={this.state.form.title.type}
                                value={this.state.form.title.value}
                                onChangeText={value => this.updateInput("title", value)}
                                overrideStyle={styles.inputText}
                            />
                        </View>
                        <View>
                            <Input
                                placeholder="Enter the description"
                                type={this.state.form.description.type}
                                value={this.state.form.description.value}
                                onChangeText={value => this.updateInput("description", value)}
                                multiline={true}
                                numberOfLines={4}
                                overrideStyle={styles.inputTextMultiline}
                            />
                        </View>
                        <View style={{ marginTop: 20, marginBottom: 20 }}>
                            <Text>Add here how much you want for the item.</Text>
                            <Input
                                placeholder="Enter the price"
                                type={this.state.form.price.type}
                                value={this.state.form.price.value}
                                onChangeText={value => this.updateInput("price", value)}
                                overrideStyle={styles.inputText}
                                keyboardType={"numeric"}
                            />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.secondTitle}>Add your contact data</Text>
                        </View>

                        <View>
                            <Text>Please enter the email where users can contact</Text>
                            <Input
                                placeholder="Enter your email"
                                type={this.state.form.email.type}
                                value={this.state.form.email.value}
                                onChangeText={value => this.updateInput("email", value)}
                                overrideStyle={styles.inputText}
                                autoCapitalize={"none"}
                                keyboardType={"email-address"}
                            />
                        </View>
                        {
                            !this.state.loading ?
                                <TouchableOpacity onPress={this.submitFormHandler} style={{ alignItems: 'center' }}>
                                    <Text style={{ color: "lightgrey" }}>
                                        Sell it
                                    </Text>
                                </TouchableOpacity>
                                : null
                        }
                        <Modal
                            animationType="slide"
                            visible={this.state.modalVisible}
                            onRequestClose={() => { }}
                        >
                            <View style={{ padding: 20 }}>
                                {this.showErrorsArray(this.state.errorsArray)}
                                <TouchableOpacity onPress={this.clearErrors} style={{ alignItems: 'center' }}>
                                    <Text>Got it !!</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>

                        <Modal
                            animationType="slide"
                            visible={this.state.modalSuccess}
                            onRequestClose={() => { }}
                        >
                            <View style={{ padding: 20 }}>
                                <Text>Good job !!</Text>
                                <TouchableOpacity onPress={() => {
                                    this.resetSellitScreen();
                                    this.props.navigation.navigate('Home')
                                }}>
                                    <Text>Go back home</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            );
        }

    }
}
const styles = StyleSheet.create({
    formInputContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
    },
    minTitle: {
        fontFamily: 'Roboto-Black',
        fontSize: 30,
        color: '#00ADA9'
    },
    secondTitle: {
        fontFamily: 'Roboto-Black',
        fontSize: 20,
        color: '#00ADA9',
        marginTop: 30,
        marginBottom: 30
    },
    inputText: {
        backgroundColor: '#f2f2f2',
        borderBottomWidth: 0,
        padding: 10
    },
    inputTextMultiline: {
        backgroundColor: '#f2f2f2',
        borderBottomWidth: 0,
        padding: 10,
        minHeight: 100
    },
    errorItem: {
        fontFamily: 'Roboto-Black',
        fontSize: 16,
        color: 'red',
        marginBottom: 10
    }
})
const mapStateToProps = state => {
    return {
        Article: state.Article,
        User: state.User
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ addArticle, autoSignIn, resetArticle }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPost)