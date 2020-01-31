import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class DrawerMenu extends Component {


    toggle = () => {
        this.props.navigation.toggleDrawer()
    }
    render() {
        return (
            <TouchableOpacity onPress={this.toggle} style={{ paddingHorizontal: 10 }}>
                <Ionicons
                    name="md-menu"
                    size={30}
                    color="white"
                />
            </TouchableOpacity>
        )
    }
}
