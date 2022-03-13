import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes'

export default function App() {
	const [fontsLoaded] = useFonts({
		Poppins_400Regular, Poppins_500Medium, Poppins_700Bold
	});

	if (!fontsLoaded)
		return <AppLoading />

	return (
		<ThemeProvider theme={theme}>
			<StatusBar style="light" translucent />
			<NavigationContainer>
				<AppRoutes />
			</NavigationContainer>
		</ThemeProvider>
	);
}
