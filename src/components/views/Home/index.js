import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HorizontalScroll from './horizontal_scrol_icon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArticles } from '../../../store/actions/articles_actions';
import { gridTwoColumns } from '../../../utils/misc';
import BlockItem from './blockItem';

class Home extends Component {
    state = {
        categories: ['All', 'Sports', 'Music', 'Clothing', 'Electronics'],
        categorySelected: 'All',
        loading: true,
        articles: []
    }

    updateCategoryHandler = (value) => {
        this.setState({
            loading: true,
            articles: [],
            categorySelected: value
        })
        this.props.getArticles(value).then(() => {
            const newArticles = gridTwoColumns(this.props.Article.list);

            this.setState({
                loading: false,
                articles: newArticles
            })
        })
    }
    componentDidMount() {
        this.props.getArticles("All").then(() => {
            const newArticles = gridTwoColumns(this.props.Article.list);

            this.setState({
                loading: false,
                articles: newArticles
            })
        })
    }
    goArticleHandler = (props) => {
        this.props.navigation.navigate('Article', {
            passProps: {
                ArticleData: props
            },
            backButtonTitle: 'Back to home',
            navStyle: {
                navBarTextFontSize: 20,
                navBarTextColor: '#ffffff',
                navBarTextFontFamily: 'RobotoCondensed-Bold',
                navBarBackgroundColor: '#00ADA9',
                screenBackgroundColor: '#ffffff'
            }
        })
    }
    showArticles = () => (
        this.state.articles.map((item, i) => (
            <BlockItem
                key={`columnHome-${i}`}
                item={item}
                iteration={i}
                goto={this.goArticleHandler}
            />
        ))
    )
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <HorizontalScroll
                        categories={this.state.categories}
                        categorySelected={this.state.categorySelected}
                        updateCategoryHandler={this.updateCategoryHandler}
                    />
                    {
                        this.state.loading ?
                            <View style={styles.isLoading}>
                                <Icon name="gears" size={30} color="lightgrey" />
                                <Text style={{ color: 'lightgrey' }}>Loading....</Text>
                            </View>
                            : null
                    }
                    <View style={styles.articleContainer}>
                        <View style={{ flex: 1 }}>
                            {this.showArticles()}
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5
    },
    isLoading: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center'
    },
    articleContainer: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})

const mapStateToProps = state => {
    return {
        Article: state.Article
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getArticles }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)