import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Article = (props) => {
    const { passProps, backButtonTitle, navStyle } = props.navigation.state.params;

    const articleImage = () => (
        <View style={{ position: 'relative' }}>
            <Image
                resizeMode={"cover"}
                style={styles.articleImage}
                source={{ uri: "https://loremflickr.com/g/320/240/paris" }}
            />
            <Text style={styles.priceTag}>
                $ {passProps.ArticleData.price}
            </Text>
        </View>
    )

    const articleText = () => (
        <View>
            <Text style={styles.articleTitle}>
                {passProps.ArticleData.title}
            </Text>
            <Text style={styles.articleDescription}>
                {passProps.ArticleData.description}
            </Text>
        </View>
    )

    const ownerNfo = () => (
        <View style={styles.ownerNfo}>
            <Text>Contact the owner of this article to the following mail:</Text>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff' }}
                onPress={() => openEmail()}
            >
                <Icon name="envelope-o" color="#00ADA9" size={20} style={{ marginRight: 5 }} />
                <Text style={{ fontSize: 20 }}>
                    {passProps.ArticleData.email}
                </Text>
            </TouchableOpacity>
        </View>
    )

    const openEmail = () => {
        Linking.openURL(`mailto://${passProps.ArticleData.email}
        &subject=Regarding${passProps.ArticleData.title}`)
    }


    return (
        <ScrollView style={styles.articleContainer}>
            {articleImage()}
            {articleText()}
            {ownerNfo()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    articleContainer: {
        padding: 10,
    },
    articleImage: {
        width: '100%',
        height: 250
    },
    priceTag: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FF6444',
        padding: 10,
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Roboto-Black'
    },
    articleTitle: {
        fontSize: 30,
        color: '#474143',
        fontFamily: 'Roboto-Black',
        marginTop: 20
    },
    articleDescription: {
        marginTop: 20,
        fontSize: 18
    },
    ownerNfo: {
        marginTop: 30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'lightgrey'
    }
})
export default Article;
