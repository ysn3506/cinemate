import { View, Text } from "react-native";
import React, { useState } from "react";
import {
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
	Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { countries } from "../utils/countryCodes";

export default function SignupScreen() {
	const [form, setForm] = useState({
		username: "",
		password: "",
		email: "",
		gender: "",
		birthDate: new Date(),
		country: countries[1],
	});

	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	const datePickerOnChange = (event, selectedDate) => {
		setIsDatePickerOpen(false);
		setForm({ ...form, birthDate: selectedDate });
	};

	return (
		<SafeAreaView className='bg-[#070F2B]'>
			<View className='container p-16 text-white gap-3 h-screen w-screen '>
				<View className='items-center space-x-4'>
					<Image
						source={require("../assets/logo.png")}
						className='h-24 w-24 mb-8'
					/>
					<Text className='text-white  text-bold text-xl'>
						Join to cinephiles!
					</Text>
				</View>
				<View className='flex-column gap-y-4'>
					<View className='items-left space-x-2 bg-gray-200 rounded-lg'>
						<TextInput
							className=' p-3'
							placeholder='username'
							keyboardType='default'
							inputMode='text'
							value={form.username}
							onChangeText={(text) => console.log(text)}></TextInput>
					</View>
					<View className='items-left space-x-2 bg-gray-200 rounded-lg'>
						<TextInput
							className=' p-3'
							placeholder='email'
							keyboardType='email-address'
							inputMode='email'
							value={form.email}
							onChangeText={(text) => console.log(text)}></TextInput>
					</View>
					<View className='items-left space-x-2 bg-gray-200 rounded-lg'>
						<TextInput
							className=' p-3'
							placeholder='password'
							keyboardType='default'
							inputMode='text'
							secureTextEntry={true}
							value={form.password}
							onChangeText={(text) => console.log(text)}></TextInput>
					</View>
					<View className='items-left space-x-2 bg-gray-200 rounded-lg'>
						{/* <TextInput
							className=' p-3'
							placeholder='country'
							keyboardType='default'
							inputMode='text'
							value={form.country}
							onChangeText={(text) => console.log(text)}></TextInput> */}
						<Picker
							selectedValue={form.country}
							onValueChange={(itemValue) =>
								setForm({ ...form, country: itemValue })
							}>
							{countries.map((country) => (
								<Picker.Item
									key={country.code}
									label={`${country.flag} ${country.name}`}
									value={country}
								/>
							))}
						</Picker>
					</View>
					<View className='flex-row items-center justify-between space-x-2 rounded-lg'>
						<Text className='text-white'>Gender:</Text>

						<TouchableOpacity className='bg-sky-500 justify-center items-center px-8 py-4 text-white rounded-lg'>
							<Text>Male</Text>
						</TouchableOpacity>
						<TouchableOpacity className='bg-sky-500 justify-center items-center px-8  py-4 text-white rounded-lg'>
							<Text>Female</Text>
						</TouchableOpacity>
						<TouchableOpacity className='bg-sky-500 justify-center items-center px-8 py-4 text-white rounded-lg'>
							<Text>Other</Text>
						</TouchableOpacity>
					</View>
					<View className='flex-row space-x-2 justify-between items-center'>
						<Text className='text-white'>Birth Date:</Text>
						<View className='bg-white rounded-lg justify-center items-center flex-1'>
							<DateTimePicker
								className='text-white w-full'
								testID='dateTimePicker'
								value={form.birthDate}
								mode={"date"}
								onChange={datePickerOnChange}
								accentColor='blue'
								themeVariant='light'
							/>
						</View>
					</View>
					<TouchableOpacity
						className=' bg-sky-500 justify-center items-center px-8 py-4 text-white rounded-lg '
						onPress={() => setIsDatePickerOpen(true)}>
						<Text>Birth Date</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}
