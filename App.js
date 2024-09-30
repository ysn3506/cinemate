import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyFollowers from "./screens/MyFollowers";
import MyMovies from "./screens/MyMovies";
import Settings from "./screens/Settings";
import MovieDetail from "./screens/MovieDetail";
import {
	UserGroupIcon,
	HomeIcon,
	ClipboardDocumentListIcon,
} from "react-native-heroicons/solid";
import SignupScreen from "./screens/SignupScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
	<Tab.Navigator>
		<Tab.Screen
			name='Home'
			options={{
				headerShown: false,
				tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
			}}
			component={HomeScreen}
		/>
		<Tab.Screen
			name='My Lists'
			options={{
				headerShown: false,
				tabBarIcon: ({ color, size }) => (
					<ClipboardDocumentListIcon color={color} size={size} />
				),
			}}
			component={MyMovies}
		/>
		<Tab.Screen
			name='Connections'
			options={{
				headerShown: false,
				tabBarIcon: ({ color, size }) => (
					<UserGroupIcon color={color} size={size} />
				),
			}}
			component={MyFollowers}
		/>
	</Tab.Navigator>
);

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={"TabNavigator"}>
				<Stack.Screen
					name='TabNavigator'
					component={TabNavigator}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='MovieDetail'
					component={MovieDetail}
					options={{ headerBackTitleVisible: false }}
				/>
				<Stack.Screen
					name='Profile'
					component={Settings}
					options={{ headerBackTitleVisible: false }}
				/>
				<Stack.Screen
					name='Signup'
					component={SignupScreen}
					options={{ headerBackTitleVisible: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
