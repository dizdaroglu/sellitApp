import React from 'react';
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { View, Text } from 'react-native';

import Login from './components/views/Login';
import Home from './components/views/Home';
import AddPost from './components/views/Admin/AddPost';
import Menu from './components/DrawerMenu/menu';
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
    }
}, headerConfig)

const AddPostStack = createStackNavigator({
    AddPost: {
        screen: AddPost,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Menu navigation={navigation} />,
            headerTitle: 'Add   "Post'
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
            }
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

const AppDrawer = createDrawerNavigator({
    App: AppStack,
    Modal: ModalStack
}, {
    contentComponent: SideDrawer,
})

export default createAppContainer(createSwitchNavigator({
    App: AppDrawer,
    Auth: AuthStack
},
    {
        initialRouteName: 'Auth'
    }))