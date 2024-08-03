import React from 'react';

import type { ColorSchemeType } from '@/core';
import { useSelectedTheme } from '@/core';
import type { Option } from '@/ui';
import { Options, useModal } from '@/ui';

import { Item } from './item';

export const ThemeItem = () => {
	const { selectedTheme, setSelectedTheme } = useSelectedTheme();
	const modal = useModal();

	const onSelect = React.useCallback(
		(option: Option) => {
			setSelectedTheme(option.value as ColorSchemeType);
			modal.dismiss();
		},
		[setSelectedTheme, modal],
	);

	const themes = React.useMemo(
		() => [
			{ label: 'settings.theme.dark 🌙', value: 'dark' },
			{ label: 'settings.theme.light 🌞', value: 'light' },
			{ label: 'settings.theme.system ⚙️', value: 'system' },
		],
		[],
	);

	const theme = React.useMemo(
		() => themes.find((t) => t.value === selectedTheme),
		[selectedTheme, themes],
	);

	return (
		<>
			<Item
				text="settings.theme.title"
				value={theme?.label}
				onPress={modal.present}
			/>
			<Options
				ref={modal.ref}
				options={themes}
				onSelect={onSelect}
				value={theme?.value}
			/>
		</>
	);
};
