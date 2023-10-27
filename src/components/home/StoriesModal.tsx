'use client';

import { useAtom } from 'jotai';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { EffectCube } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { modalAtom } from '@/state/store/modal';

export default function StoriesModal({ mainIndex }: any) {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);
	const [subIndexHistory, setSubIndexHistory] = useState([0, 0, 0, 0]);
	const [musicPlayer, setMusicPlayer] = useState<YouTubePlayer>();
	const [firstVideoId, setFirstVideoId] = useState('');
	const [firstStartTime, setFirstStartTime] = useState(0);
	const [firstEndTime, setFirstEndTime] = useState(0);
	// const [playing, setPlaying] = useState<boolean>(false);
	const [topIndex, setTopindex] = useState(0);
	const [subIndex, setSubindex] = useState(0);
	const [storyProgress, setStoryProgress] = useState<number[][]>([[]]);
	const [intervalId, setIntervalId] = useState<undefined | NodeJS.Timer>(undefined);
	const swiperRef = useRef<SwiperCore>();

	const STORIES_DATA = [
		{
			user: '박수빈',
			poster: [
				{
					url: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
					videoId: 'dJth8oW7CAQ',
					startTime: 25,
					endTime: 40,
				},
				{
					url: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
					videoId: 'SIuF37EWaLU',
					startTime: 10,
					endTime: 25,
				},
				{
					url: 'https://ilovecharacter.com/news/data/20230816/p1065623210683934_621_thum.jpg',
					videoId: '5yb2N3pnztU',
					startTime: 10,
					endTime: 25,
				},
			],
		},
		{
			user: '이성호',
			poster: [
				{
					url: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
					videoId: 'kpeCOzKvK-0',
					startTime: 10,
					endTime: 25,
				},
				{
					url: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
					videoId: 'SIuF37EWaLU',
					startTime: 10,
					endTime: 25,
				},
			],
		},
		{
			user: '김보민',
			poster: [
				{
					url: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
					videoId: 'gcgKUcJKxIs',
					startTime: 10,
					endTime: 25,
				},
				{
					url: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
					videoId: 'SIuF37EWaLU',
					startTime: 10,
					endTime: 25,
				},
			],
		},
		{
			user: '장준환',
			poster: [
				{
					url: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
					videoId: 'SIuF37EWaLU',
					startTime: 10,
					endTime: 25,
				},
				{
					url: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
					videoId: 'SIuF37EWaLU',
					startTime: 10,
					endTime: 25,
				},
			],
		},
	];

	useEffect(() => {
		if (modalOpen) {
			const data = STORIES_DATA.map((story) => new Array(story.poster.length).fill(0));
			setStoryProgress(data);
			console.log(data);

			setSubIndexHistory([0, 0, 0, 0]);
			setTopindex(mainIndex);
			setSubindex(0);
			// setProgress(0);
		}
		return () => {
			clearInterval(intervalId);
		};
	}, [modalOpen]);
	const onReady = (event: YouTubePlayer) => {
		setMusicPlayer(event.target);
	};

	// 뮤직 프로그레시브 실시간 업데이트
	const updateProgressBar = () => {
		const currentTime = musicPlayer.getCurrentTime();
		const progressState = ((currentTime - firstStartTime) / (firstEndTime - firstStartTime)) * 100;
		// setProgress(progressState);
	};

	// iframe 재생 시
	const onPlay = () => {
		console.log('재생...');
		// setPlaying(true);
		// setProgress(0);
		clearInterval(intervalId);
		setIntervalId(undefined);
		// const newIntervalId = setInterval(updateProgressBar, 1000);
		// setIntervalId(newIntervalId);
	};

	// iframe 정지 시
	const onPause = () => {
		console.log('정지...');
		clearInterval(intervalId);
		setIntervalId(undefined);
	};

	// iframe 노래 끝났을 때
	const onEnd = () => {
		console.log('끝');
		// setProgress(0);
		// subIndexHistory
		clearInterval(intervalId);
		setIntervalId(undefined);
	};

	useEffect(() => {
		const { videoId, startTime, endTime } = STORIES_DATA[topIndex].poster[subIndex];
		setFirstVideoId(videoId);
		setFirstStartTime(startTime);
		setFirstEndTime(endTime);
	}, [subIndex, topIndex]);

	if (!modalOpen) return null;
	return (
		<div className="absolute inset-0 z-50 bg-black w-full h-screen">
			<div className="">
				<Swiper
					effect="cube"
					// touchRatio={0}
					modules={[EffectCube]}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
						swiperRef.current.slideTo(mainIndex, 0, false);
					}}
					onAfterInit={() => {
						const { videoId, startTime, endTime } = STORIES_DATA[mainIndex].poster[0];
						setFirstVideoId(videoId);
						setFirstStartTime(startTime);
						setFirstEndTime(endTime);
					}}
					onSlideChange={(swiper) => {
						const swiperIndex = swiper.activeIndex;
						setTopindex(swiperIndex);
						setSubindex(subIndexHistory[swiperIndex]);
					}}
				>
					{STORIES_DATA.map((main, index) => (
						<SwiperSlide key={main.user}>
							<div className="flex justify-between">
								{storyProgress[index]?.map((progress, progressIndex) => (
									<input
										key={progressIndex}
										onChange={undefined}
										type="range"
										min="0"
										max="100"
										value={progress}
										style={{
											background: `linear-gradient(to right, #428EFF 0%, #428EFF ${progress}%, #d5d4d3 ${progress}%, #d5d4d3 100%)`,
										}}
									/>
								))}
							</div>
							<div>
								<span className="absolute left-0 text-white text-3xl">{STORIES_DATA[index].user}</span>
								<div className="absolute left-1/2 text-white text-3xl">
									<span>
										{subIndexHistory[index] + 1}/{STORIES_DATA[index].poster.length}
									</span>
								</div>
								<button onClick={() => setModalOpen(false)} className="absolute right-0 text-white text-3xl">
									닫기
								</button>
							</div>
							<button
								onClick={() => {
									if (subIndex === 0) {
										swiperRef.current?.slidePrev();
									} else {
										setSubindex((prev) => prev - 1);
										const updatedHistory = [...subIndexHistory];
										updatedHistory[topIndex] = subIndex - 1;
										setSubIndexHistory(updatedHistory);
									}
								}}
								className="z-50 text-4xl absolute insert-0 left-2 top-1/2 bg-red-50 "
							>
								이전
							</button>
							<button
								onClick={() => {
									if (subIndex === STORIES_DATA[index].poster.length - 1) {
										if (topIndex === STORIES_DATA.length - 1) {
											setModalOpen(false);
										}
										swiperRef.current?.slideNext();
										setSubindex(0);
									} else {
										setSubindex((prev) => prev + 1);
										const updatedHistory = [...subIndexHistory];
										updatedHistory[topIndex] = subIndex + 1;
										setSubIndexHistory(updatedHistory);
									}
								}}
								className="z-50 text-4xl absolute insert-0 right-2 top-1/2 bg-red-50"
							>
								다음
							</button>
							<img
								src={
									swiperRef.current?.activeIndex === index
										? STORIES_DATA[index].poster[subIndex]?.url
										: 'https://i.pinimg.com/736x/58/18/92/581892a6b895a958afb3b6550c6ac778.jpg'
								}
								alt={
									swiperRef.current?.activeIndex === index
										? STORIES_DATA[index].poster[subIndex]?.url
										: 'https://i.pinimg.com/736x/58/18/92/581892a6b895a958afb3b6550c6ac778.jpg'
								}
								className="w-full h-screen object-cover"
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			{firstVideoId && (
				<YouTube
					videoId={firstVideoId}
					className="opacity-0 absolute"
					opts={{
						width: 1,
						height: 1,
						playerVars: {
							autoplay: 1,
							controls: 1,
							start: firstStartTime,
							end: firstEndTime,
						},
					}}
					onReady={onReady}
					onPlay={() => onPlay()}
					onPause={() => onPause()}
					onEnd={() => onEnd()}
				/>
			)}
		</div>
	);
}
