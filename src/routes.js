import React from 'react';
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { View, Text } from 'react-native';

import Login from './components/views/Login';
import Home from './components/views/Home';
import Article from './components/views/Article';
import AddPost from './components/views/Admin/AddPost';
import UserPost from './components/views/Admin/UserPosts';
import Menu from './components/DrawerMenu/menu';
import Splash from './components/views/Splash';
import SideDrawer from './components/SideDrawer';

import Modal from './components/MyModal/myModal';

//icon
import Ionicons from 'react-native-vector-icons/Ionicons';

const headerConfig = {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#00ADA9'
        },
        headerTintColor: 'white',
        // headerTitle: "Home"
    }
}
const drawerMenu = () => (
    <View style={{ flex: 1, backgroundColor: '#474143' }}>
        <View style={{ padding: 10, marginTop: 20 }}>
            <Text>Menu</Text>
        </View>
    </View>
)

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Menu navigation={navigation} />,
            headerTitle: 'Home'
        })
    },
    Article: {
        screen: Article,
    }
},
    headerConfig,

)

const AddPostStack = createStackNavigator({
    AddPost: {
        screen: AddPost,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Menu navigation={navigation} />,
            headerTitle: 'Sell it'
        })
    }
}, headerConfig)

const AuthStack = createStackNavigator({
    Login: Login
})
const AppStack = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <Ionicons name="ios-search" size={24} color={tintColor} />
            }

        }
    },
    AddPost: {
        screen: AddPostStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <Ionicons name="logo-usd" size={24} color={tintColor} />
            },
            tabBarLabel: "Sell it"

        }
    }
},
    {
        tabBarOptions: {
            activeTintColor: '#00ADA9'
        },
    }
)

const ModalStack = createStackNavigator({
    Modal: Modal
},
    headerConfig,
    {
        headerMode: 'screen',

    })
const UserPostStack = createStackNavigator({
    UserPost: UserPost
}, headerConfig)
const AppDrawer = createDrawerNavigator({
    App: AppStack,
    UserPost: UserPostStack
}, {
    contentComponent: SideDrawer,
})

export default createAppContainer(createSwitchNavigator({
    App: AppDrawer,
    Auth: AuthStack,
    Splash: Splash
},
    {
        initialRouteName: 'Splash'
    }))