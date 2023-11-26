'use client';

import { useRef, useState } from 'react';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/button/Button';
import CategoryGrid from '@/components/music/CategoryGrid';
import TitleHeader from '@/components/TitleHeader';
import MusicRecord from '@/components/music/streaming/MusicRecord';
import PageHeaderContent from '@/components/PageHeaderContent';
import InputBar from '@/components/bar/InputBar';
import { roomClients } from '@/app/service/room-client';
import useUser from '@/hooks/useUser';

type createRoom = {
	memberSeq: number | undefined;
	roomName: string;
	category: string;
	accessAuth: string;
};
export default function CreateRoomPage() {
	// 뮤직룸 생성 mutation
	const queryClient = useQueryClient();
	const { mutate: createMusicRoomMutate, isLoading } = useMutation(roomClients.createMusicRoom, {
		onSuccess: () => {
			queryClient.invalidateQueries(['rooms']);
		},
		onError: (error) => console.log(error),
	});
	// 스크롤 이동을 위한 useRef 객체 선언
	const focusFirst = useRef<HTMLDivElement>(null);
	const focusSecond = useRef<HTMLDivElement>(null);
	const focusLast = useRef<HTMLDivElement>(null);
	// 스크롤 포커스하는 함수
	const onMoveToFocus = (focus: React.RefObject<HTMLDivElement>) => {
		focus.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
	// 유저 정보 GET
	const user = useUser();
	const userSeq = user.data?.memberSeq;
	// 뮤직 방 생성 폼 데이터
	const [data, setData] = useState<createRoom>({
		memberSeq: userSeq,
		roomName: '',
		category: '',
		accessAuth: '',
	});
	const handleAceess = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prev) => ({ ...prev, accessAuth: e.target.value }));
	};
	const onAddRoom = async () => {
		createMusicRoomMutate({ ...data });
	};
	return (
		<>
			{/* 플레이리스트 이름 Input Section */}
			<section ref={focusFirst} className="flex flex-col h-full items-start mb-5 p-[2rem]">
				<TitleHeader title="뮤직방 생성" previous isWrap />
				<MusicRecord image="/assets/cover.jpeg" />
				<PageHeaderContent
					content="당신의 플레이리스트의
					<br /> 이름을 정해주세요!🔥"
					mb="mb-5"
				/>
				<InputBar
					placeholder="음악 방의 이름을 입력해주세요!"
					styles="bg-input mb-[10%]"
					value={data.roomName}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setData((prev) => ({ ...prev, roomName: e.target.value }));
					}}
				/>
				<Button content="다음" clickFn={() => onMoveToFocus(focusSecond)} disabled={data.roomName === ''} />
			</section>
			{/* 플레이리스트 카테고리 선택 Section */}
			<section ref={focusSecond} className="flex flex-col relative h-full items-start my-32 p-[2rem]">
				<TitleHeader title="뮤직방 생성" isWrap />
				<div className="w-80 h-80 relative rounded-[4rem] shadow-2xl shadow-slate-700 overflow-hidden self-center m-4">
					<Image
						src="/assets/cat-music.jpeg"
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
						alt="이미지"
					/>
				</div>
				<PageHeaderContent
					content="당신의 플레이리스트의
					<br /> 카테고리를 알려주세요!🎧"
					mt="mt-10"
					mb="mb-5"
				/>
				<CategoryGrid clickFn={(item) => setData((prev) => ({ ...prev, category: item }))} />
				<HiOutlineChevronUp
					className="absolute bottom-32 text-4xl cursor-pointer flex self-center"
					onClick={() => onMoveToFocus(focusFirst)}
				/>
				<Button content="다음" clickFn={() => onMoveToFocus(focusLast)} />
			</section>
			{/* 플레이리스트 공개 범위 선택 Section */}
			<section ref={focusLast} className="flex flex-col relative h-full items-start justify-between p-[2rem]">
				<TitleHeader title="뮤직방 생성" isWrap />
				<div className="w-80 h-80 relative rounded-[4rem] shadow-2xl shadow-slate-700 overflow-hidden self-center">
					<Image src="/assets/cat-music.jpeg" fill alt="이미지" />
				</div>
				<section className="flex flex-col w-full  py-32">
					<PageHeaderContent content="공개 여부를 결정해주세요! ✍️ " mb="mb-4" />
					<div className="relative text-2xl font-bold">
						<input
							type="radio"
							id="public"
							name="disclosure"
							value="PUBLIC"
							onChange={handleAceess}
							className="bg-input mb-3 rounded-[1rem] w-[98%] h-16 self-center p-4 flex justify-center items-center font-bold appearance-none checked:bg-blue-300"
						/>
						<label htmlFor="public" className="absolute top-5 left-[50%] -translate-x-1/2">
							전체 공개
						</label>
					</div>
					<div className="relative text-2xl font-bold">
						<input
							type="radio"
							id="private"
							name="disclosure"
							value="PRIVATE"
							onChange={handleAceess}
							className="bg-input mb-3 rounded-[1rem] w-[98%] h-16 self-center p-4 flex justify-center items-center font-bold appearance-none checked:bg-blue-300"
						/>
						<label htmlFor="private" className="absolute top-5 left-[50%] -translate-x-1/2">
							친구 공개
						</label>
					</div>
					<div className="relative text-2xl font-bold">
						<input
							type="radio"
							id="non"
							name="disclosure"
							value="NON"
							onChange={handleAceess}
							className="bg-input rounded-[1rem] w-[98%] h-16 self-center p-4 flex justify-center items-center font-bold appearance-none checked:bg-blue-300"
						/>
						<label htmlFor="non" className="absolute top-5 left-[50%] -translate-x-1/2">
							비공개
						</label>
					</div>
					<p className="text-xl text-zinc-300 font-semibold p-2 w-full self-center">
						💡 전체 공개는 모든 사람들에게 공개되는 방이에요! <br />
						<span className="text-white">___</span> 인기 방 순위에 올라갈 수도 있답니다!
					</p>
				</section>
				<HiOutlineChevronUp
					className="absolute bottom-32 text-4xl cursor-pointer flex self-center"
					onClick={() => onMoveToFocus(focusSecond)}
				/>
				<Button content="다음" link="room/create/success" clickFn={onAddRoom} disabled={data.accessAuth === ''} />
			</section>
		</>
	);
}
