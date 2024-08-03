import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorScheme, useColorScheme } from 'nativewind';
import { useCallback, useEffect, useState } from 'react';

const SELECTED_THEME = 'SELECTED_THEME';
export type ColorSchemeType = 'light' | 'dark' | 'system';

/**
 * This hook should only be used while selecting the theme.
 * This hook will return the selected theme which is stored in AsyncStorage.
 * selectedTheme should be one of the following values: 'light', 'dark', or 'system'.
 * Don't use this hook if you want to use it to style your component based on the theme; use useColorScheme from nativewind instead.
 */
export const useSelectedTheme = () => {
	const { colorScheme: _color, setColorScheme } = useColorScheme();
	const [theme, setTheme] = useState<ColorSchemeType | undefined>(undefined);

	useEffect(() => {
		const fetchTheme = async () => {
			try {
				const storedTheme = await AsyncStorage.getItem(SELECTED_THEME);
				if (storedTheme !== null) {
					setTheme(storedTheme as ColorSchemeType);
				} else {
					setTheme('system'); // default value if not set
				}
			} catch (error) {
				console.error('Failed to fetch theme from storage', error);
			}
		};

		fetchTheme();
	}, []);

	const setSelectedTheme = useCallback(
		async (t: ColorSchemeType) => {
			try {
				await AsyncStorage.setItem(SELECTED_THEME, t);
				setColorScheme(t);
				setTheme(t);
			} catch (error) {
				console.error('Failed to set theme in storage', error);
			}
		},
		[setColorScheme],
	);

	const selectedTheme = theme ?? 'system';
	return { selectedTheme, setSelectedTheme } as const;
};

// To be used in the root file to load the selected theme from AsyncStorage
export const loadSelectedTheme = async () => {
	try {
		const theme = await AsyncStorage.getItem(SELECTED_THEME);
		if (theme !== null) {
			console.log('theme', theme);
			colorScheme.set(theme as ColorSchemeType);
		}
	} catch (error) {
		console.error('Failed to load theme from storage', error);
	}
};
