import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/playstore-icon.png';


class SideDrawer extends Component {
    state = {

    }


    navigationScreen = (route) => {

        this.props.navigation.navigate(route);
        this.props.navigation.toggleDrawer()


    }
    render() {
        let menu = null;

        if (this.props.User.userData.token) {
            menu = (
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={
                        () =>
                            this.props.navigation.navigate('UserPost')}>
                    <Ionicons name="md-list" size={18} color="white" style={styles.icon} />
                    <Text style={styles.itemText}>My Post</Text>
                </TouchableOpacity>
            )
        }

        return (

            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <Image
                        source={Logo}
                        style={{ width: 150, height: 150 }}
                    />
                </View>
                <ScrollView style={styles.content}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => this.navigationScreen("Home")}>
                        <Ionicons name="md-home" size={18} color="white" style={styles.icon} />
                        <Text style={styles.itemText}>HOME</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => this.navigationScreen("AddPost")}>
                        <Ionicons name="logo-usd" size={18} color="white" style={styles.icon} />
                        <Text style={styles.itemText}>SELL</Text>
                    </TouchableOpacity>
                    {menu}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    upperContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#00ADA9',
        paddingVertical: 40
    },
    menuItem: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 10
    },
    itemText: {
        fontSize: 13,
        color: '#fff'
    }
})

const mapStateToProps = state => {
    return {
        User: state.User
    }
}
export default connect(mapStateToProps)(SideDrawer)

