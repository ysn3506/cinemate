import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyFollowers from "./screens/MyFollowers";
import MyMovies from "./screens/MyMovies";
import Settings from "./screens/Settings";
import MovieDetail from "./screens/MovieDetail";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
	<Tab.Navigator>
		<Tab.Screen
			name='Home'
			options={{ headerShown: false }}
			component={HomeScreen}
		/>
		<Tab.Screen
			name='My Movies'
			options={{ headerShown: false }}
			component={MyMovies}
		/>
		<Tab.Screen
			name='Followers'
			options={{ headerShown: false }}
			component={MyFollowers}
		/>
		<Tab.Screen
			name='Settings'
			options={{ headerShown: false }}
			component={Settings}
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
			</Stack.Navigator>
		</NavigationContainer>
	);
}
