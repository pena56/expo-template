import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem<T>(key: string, value: T) {
	try {
		let valueToStore: string;

		if (typeof value === 'string') {
			valueToStore = value;
		} else {
			valueToStore = JSON.stringify(value);
		}

		await AsyncStorage.setItem(key, valueToStore);
	} catch (_e) {
		// do something with e
	}
}

export async function getItem<T>(
	key: string,
	parseAsObject = false,
): Promise<T | null | undefined> {
	try {
		const value = await AsyncStorage.getItem(key);

		if (parseAsObject) {
			return value != null ? JSON.parse(value) : null;
		}
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		return value as any as T;
	} catch (_e) {
		// do something with e
	}
}

export async function removeItem(key: string) {
	try {
		await AsyncStorage.removeItem(key);
	} catch (_e) {
		// do something with e
	}
}
