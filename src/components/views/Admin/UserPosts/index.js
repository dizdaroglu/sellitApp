import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserPosts, deleteUserpost } from '../../../../store/actions/user_actions'


class UserPost extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 10 }}>
                    <Icon name="arrow-left" size={18} color="white" />
                </TouchableOpacity>
            )
        }
    }
    state = {
        posts: [],
        modal: false
    }

    componentDidMount() {
        const uid = this.props.User.userData.uid;
        this.props.getUserPosts(uid)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.User.userPosts) {
            this.setState({
                posts: nextProps.User.userPosts
            })
        }
    }


    showConfirm = (id) => {
        this.setState({
            modal: true,
            toDelete: id
        })
    }
    deletePost = (id) => {
        this.props.deleteUserpost(id, this.props.User.userData).then(() => {
            const uid = this.props.User.userData.uid;
            this.props.getUserPosts(uid)

            this.setState({
                modal: false,
                toDelete: ''
            })
        })
    }
    showPosts = (posts) => (
        posts ?
            posts.map(item => (
                <View style={styles.itemWrapper} key={item.id}>
                    <View style={styles.itemTitle}>
                        <Text style={{ fontFamily: 'Roboto-Black' }}>{item.title}</Text>
                    </View>
                    <View style={styles.itemDescription}>
                        <Text>{item.description}</Text>
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.small}>PRICE: $ {item.price}</Text>
                            <Text style={styles.small}>CATEGORY: {item.category}</Text>
                        </View>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={() => this.showConfirm(item.id)}>
                            <Text style={{
                                fontFamily: 'Roboto-Black',
                                color: '#F44336',
                                paddingBottom: 10
                            }}>
                                Delete Post
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modal}
                    >
                        <View style={{ padding: 50 }}>
                            <Text style={{ fontSize: 20 }}>
                                Are you sure you want to delete the post ?
                            </Text>
                            <View style={{ marginTop: 50 }}>
                                <TouchableOpacity
                                    onPress={() => this.deletePost(this.state.toDelete)}
                                >
                                    <Text style={styles.modalDelete}>Yes, Delete it</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            modal: false,
                                            toDelete: ''
                                        })
                                    }}
                                >
                                    <Text style={styles.modalClose}>Nop, keep it</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            ))
            : null

    )
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ marginBottom: 30 }}>
                        <Text>You have {this.state.posts.length} posts</Text>
                    </View>
                    {this.showPosts(this.state.posts)}
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    itemWrapper: {
        borderWidth: 1,
        borderColor: '#ececec',
        borderRadius: 2,
        marginBottom: 20
    },
    itemTitle: {
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        padding: 10,
        backgroundColor: '#f5f5f5'
    },
    itemDescription: {
        padding: 10
    },
    small: {
        fontSize: 12
    },
    buttons: {
        alignItems: 'center'
    },
    modalDelete: {
        marginBottom: 20,
        alignSelf: 'center',
        fontSize: 20,
        color: '#F44336'
    },
    modalClose: {
        marginBottom: 20,
        alignSelf: 'center',
        fontSize: 20,
        color: '#00ADA9'
    }
})
const mapStateToProps = state => {
    console.log(state)
    return {
        User: state.User
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getUserPosts, deleteUserpost }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPost)
