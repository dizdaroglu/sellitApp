import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class NotAllow extends Component {

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="frown-o" color="#F44336" size={60} />
                <Text> You need to log in or register to sell ! </Text>
                <TouchableOpacity onPress={() => this.props.goLogin()} style={{ marginTop: 5 }}>
                    <Text style={{ color: "#FD9727" }}>LOGIN / REGISTER</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
