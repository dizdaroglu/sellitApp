import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const categoriesIcons = (value) => {
    let name = '';
    switch (value) {
        case 'All':
            name = 'circle-o-notch'
            break;
        case 'Sports':
            name = 'soccer-ball-o'
            break;
        case 'Music':
            name = 'music'
            break;
        case 'Clothing':
            name = 'shopping-bag'
            break;
        case 'Electronics':
            name = 'tv'
            break;
        default:
            name = '';
    }
    return name
}

export default class HorizontalScroll extends Component {

    generateIcon = (categories) => (

        categories ?
            categories.map(item => (
                <View style={{ marginRight: 15 }} key={item}>
                    <TouchableOpacity
                        onPress={() => this.props.updateCategoryHandler(item)}
                        style={[styles.itemIcon, { backgroundColor: this.props.categorySelected !== item ? '#c1c1c1' : '#FF6444' }]}>
                        <Icon name={categoriesIcons(item)} size={20} color="white" style={{ marginRight: 10, marginLeft: 3 }} />
                        <Text style={{ color: '#fff', marginRight: 5 }}>{item}</Text>
                    </TouchableOpacity>
                </View >
            ))
            : null
    )

    render() {
        return (
            <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={200}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.scrollContainer}>
                    {this.generateIcon(this.props.categories)}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        width: '100%'
    },
    itemIcon: {
        borderRadius: 100,
        flexDirection: 'row',
        padding: 7,
        alignItems: 'center'
    }
})