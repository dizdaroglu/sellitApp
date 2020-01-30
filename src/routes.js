import React from 'react';
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { View, Text } from 'react-native';

import Login from './components/views/Login';
import Home from './components/views/Home';
import AddPost from './components/views/Admin/AddPost';
import Menu from './components/DrawerMenu/menu';

//icon
import Ionicons from 'react-native-vector-icons/Ionicons';

const drawerMenu = () => (
    <View style={{ flex: 1, padding: 50 }}>
        <Text>Menu</Text>
    </View>
)

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Menu navigation={navigation} />
        })
    }
})

const AddPostStack = createStackNavigator({
    AddPost: AddPost
})
const AuthStack = createStackNavigator({
    Login: Login
})
const AppStack = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
    },
    AddPost: AddPostStack
},
    {
        tabBarOptions: {
            activeTintColor: 'red'
        },
        defaultNavigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => {
                return <Ionicons name="ios-radio-button-off" size={24} color={tintColor} />
            }
        })
    }
)

const AppDrawer = createDrawerNavigator({
    App: AppStack,
}, {
    contentComponent: drawerMenu
})

export default createAppContainer(createSwitchNavigator({
    App: AppDrawer,
    Auth: AuthStack
},
    {
        initialRouteName: 'Auth'
    }))