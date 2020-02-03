import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Auth')
        }, 1000);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.up}>
                    <Image
                        source={require('../../../assets/images/playstore-icon.png')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.down}>
                    <Text style={styles.text}>Sell it</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00ADA9'

    },
    text: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Roboto-Medium'
    },
    image: {
        width: 150,
        height: 150
    }
})