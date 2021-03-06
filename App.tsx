import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes'

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function App() {
	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!fontsLoaded)
		return <AppLoading />

	return (
		<ThemeProvider theme={theme}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>

			<NavigationContainer>
				<AppRoutes />
			</NavigationContainer>
		</ThemeProvider>
	);
}
