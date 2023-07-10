'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LottieView from '@/components/LottieView';
import emojiHeart from '../../../public/lottie/emoji/EmojiHeart.json';
import emojiSpace from '../../../public/lottie/emoji/EmojiSpace.json';
import emojiAngry from '../../../public/lottie/emoji/EmojiAngry.json';
import emojiGood from '../../../public/lottie/emoji/EmojiGood.json';

export default function EmojiBar() {
	const [emoji, setEmoji] = useState('');
	const [showEmoji, setShowEmoji] = useState(false);

	const emojiLogo = [
		{ name: 'emojiHeart', src: '/images/emoji/Heart.png' },
		{ name: 'emojiSpace', src: '/images/emoji/Space.png' },
		{ name: 'emojiAngry', src: '/images/emoji/Angry.png' },
		{ name: 'emojiGood', src: '/images/emoji/Good.png' },
	];

	const emojiMap: any = {
		emojiHeart,
		emojiSpace,
		emojiAngry,
		emojiGood,
	};

	useEffect(() => {
		if (showEmoji) {
			const timer = setTimeout(() => {
				setShowEmoji(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
		return undefined;
	}, [showEmoji]);

	const handleEmojiClick = (emojiChange: string) => {
		setEmoji(emojiChange);
		setShowEmoji(true);
	};

	return (
		<nav>
			{showEmoji && (
				<div className="absolute inset-0 flex justify-center items-center">
					{emoji && <LottieView styles="w-[45rem]" file={emojiMap[emoji]} />}
				</div>
			)}
			<div className="flex justify-around">
				{emojiLogo.map((emojiData) => (
					<button key={emojiData.name} onClick={() => handleEmojiClick(emojiData.name)}>
						<Image src={emojiData.src} alt={emojiData.name} width={40} height={40} />
					</button>
				))}
			</div>
		</nav>
	);
}
