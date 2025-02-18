import {Tabs} from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import {theme} from "../theme";

export default function Layout() {
    return(
        <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorCerulean }}>
            <Tabs.Screen name="index" options={{
                title: "Shopping List",
                tabBarIcon: ({color, size}) => (
                     <Feather name="list" size={size} color={color} />
                ),
            }} />

            {/*<Stack.Screen name="counter" options={{title: "Counter", presentation:"modal", animation:"fade"}} />*/}

            <Tabs.Screen name="counter" options={{
                title: "Counter",
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Feather name="clock" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="idea" options={{
                title: "Idea",
                tabBarIcon: ({color, size}) => (
                    <Octicons name="light-bulb" size={size} color={color} />
                ),
            }} />
        </Tabs>
    )
}