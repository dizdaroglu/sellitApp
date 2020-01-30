import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Logo from './logo';
import { getOrientation, setOrientationListener, setTokens, removeOrientationListener, getToken } from '../../../utils/misc';
import LoginPanel from './loginPanel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autoSignIn } from '../../../store/actions/user_actions';

class Login extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
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
    componentDidMount() {
        getToken((value) => {
            if (value[0][1] === null) {
                this.setState({ loading: false })
            } else {
                this.props.autoSignIn(value[1][1]).then(() => {
                    if (!this.props.User.userData.token) {
                        this.setState({ loading: false })
                    } else {
                        setTokens(this.props.User.userData, () => {
                            this.goNext()
                        })
                    }
                })
            }
        })
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
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

const mapStateToProps = state => {
    return {
        User: state.User
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ autoSignIn }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)