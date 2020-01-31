import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import HorizontalScroll from './horizontal_scrol_icon';


export default class Home extends Component {
    state = {
        categories: ['All', 'Sports', 'Music', 'Clothing', 'Electronics'],
        categorySelected: 'All'
    }

    updateCategoryHandler = (value) => {
        this.setState({
            categorySelected: value
        })
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <HorizontalScroll
                        categories={this.state.categories}
                        categorySelected={this.state.categorySelected}
                        updateCategoryHandler={this.updateCategoryHandler}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5
    }
})