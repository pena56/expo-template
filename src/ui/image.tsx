import type { ImageProps } from 'expo-image';
// biome-ignore lint/style/useNamingConvention: <explanation>
import { Image as NImage } from 'expo-image';
import { cssInterop } from 'nativewind';

export type ImgProps = ImageProps & {
	className?: string;
};

cssInterop(NImage, { className: 'style' });

export const Image = ({
	style,
	className,
	placeholder = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
	...props
}: ImgProps) => {
	return (
		<NImage
			className={className}
			placeholder={placeholder}
			style={style}
			{...props}
		/>
	);
};

export const preloadImages = (sources: string[]) => {
	NImage.prefetch(sources);
};
