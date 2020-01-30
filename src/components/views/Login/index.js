import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Logo from './logo';
import { getOrientation, setOrientationListener, removeOrientationListener } from '../../../utils/misc';
import LoginPanel from './loginPanel';

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)

        this.state = {
            orientation: getOrientation(500),
            logoAnimation: false
        }
        setOrientationListener(this.changeOrientation)
    }

    changeOrientation = () => {
        this.setState({
            orientation: getOrientation(500)
        })
    }
    componentWillMount() {
        removeOrientationListener()
    }
    showLogin = () => {
        this.setState({
            logoAnimation: true
        })
    }
    goNext = () => {
        this.props.navigation.navigate('App')
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Logo
                        showLogin={this.showLogin}
                        orientation={this.state.orientation}
                    />
                    <LoginPanel
                        orientation={this.state.orientation}
                        show={this.state.logoAnimation}
                        goNext={this.goNext}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    }
})