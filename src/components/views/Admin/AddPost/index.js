import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import NotAllow from './notallow';

class AddPost extends Component {

    goLogin = () => {
        this.props.navigation.navigate('Auth')
    }
    render() {
        console.log(this.props.User)
        if (this.props.User.userData.token === null) {
            return (
                <NotAllow goLogin={this.goLogin} />
            )
        } else {
            return (
                <View>
                    <Text> index </Text>
                </View>
            );
        }

    }
}
const mapStateToProps = state => {
    return {
        User: state.User
    }
}
export default connect(mapStateToProps)(AddPost)