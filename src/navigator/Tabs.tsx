import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '../pages/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator, { RootStackParams } from './Navigator';
import PokemonScreen from '../pages/PokemonScreen';

const Tab = createBottomTabNavigator();

const Tab2 = createStackNavigator<RootStackParams>();

export function Tab2Screen() {
    return (
        <Tab2.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            <Tab2.Screen name="HomeScreen" component={SearchScreen} />
            <Tab2.Screen name="PokemonScreen" component={PokemonScreen} />
        </Tab2.Navigator>
    )
}

export default function Tabs() {
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white'
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#5856D6',
                tabBarLabelStyle: {
                    marginBottom: 10
                },
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    borderWidth: 0,
                    elevation: 0,
                    height: 60
                }
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={Navigator}
                options={{
                    tabBarLabel: 'List',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            size={25}
                            name="list-outline"
                        />
                    )
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={Tab2Screen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            size={25}
                            name="search-outline"
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}