import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const IS_FIRST_TIME = 'IS_FIRST_TIME';

export const useIsFirstTime = () => {
	const [isFirstTime, setIsFirstTime] = useState<boolean | undefined>(
		undefined,
	);

	useEffect(() => {
		const fetchIsFirstTime = async () => {
			try {
				const value = await AsyncStorage.getItem(IS_FIRST_TIME);
				if (value === null) {
					// If the value does not exist in storage, set it to true by default
					setIsFirstTime(true);
				} else {
					setIsFirstTime(value === 'true');
				}
			} catch (error) {
				console.error('Failed to fetch IS_FIRST_TIME from storage', error);
			}
		};

		fetchIsFirstTime();
	}, []);

	const updateIsFirstTime = async (value: boolean) => {
		try {
			await AsyncStorage.setItem(IS_FIRST_TIME, value.toString());
			setIsFirstTime(value);
		} catch (error) {
			console.error('Failed to update IS_FIRST_TIME in storage', error);
		}
	};

	return [isFirstTime, updateIsFirstTime] as const;
};
