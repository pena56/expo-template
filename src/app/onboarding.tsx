import { useRouter } from 'expo-router';

import { Cover } from '@/components/cover';
import { useIsFirstTime } from '@/core/hooks';
import { Button, FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';

export default function Onboarding() {
	const [_, setIsFirstTime] = useIsFirstTime();
	const router = useRouter();

	return (
		<View className="flex h-full items-center  justify-center">
			<FocusAwareStatusBar />
			<View className="w-full flex-1">
				<Cover />
			</View>
			<View className="justify-end ">
				<Text className="my-3 text-center text-5xl font-bold dark:text-black">
					Obytes Starter
				</Text>
				<Text className="mb-2 text-center text-lg dark:text-gray-600">
					The right way to build your mobile app
				</Text>

				<Text className="my-1 pt-6 text-left text-lg dark:text-black">
					🚀 Production-ready{' '}
				</Text>
				<Text className="my-1 text-left text-lg dark:text-black">
					🥷 Developer experience + Productivity
				</Text>
				<Text className="my-1 text-left text-lg dark:text-black">
					🧩 Minimal code and dependencies
				</Text>
				<Text className="my-1 text-left text-lg dark:text-black">
					💪 well maintained third-party libraries
				</Text>
			</View>
			<SafeAreaView className="mt-6">
				<Button
					label="Let's Get Started "
					onPress={() => {
						setIsFirstTime(false);
						router.replace('/login');
					}}
				/>
			</SafeAreaView>
		</View>
	);
}
