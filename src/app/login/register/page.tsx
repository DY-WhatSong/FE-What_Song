'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Lottie from 'lottie-react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import registerComplete from '../../../../public/lottie/registerComplete.json';
import nicknameInput from '../../../../public/lottie/nicknameInput.json';
import { loginApis } from '@/app/service/login';
import ButtonBar from '@/components/bar/ButtonBar';

export default function RegisterPage() {
	const searchParams = useSearchParams();
	const page = searchParams.get('page');
	const router = useRouter();
	const [nickName, setNickName] = useState<string>('');

	const onNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNickName(event.target.value);
	};

	// const { mutate: registerMutate } = useMutation(loginApis.getRegister, {
	// 	onSuccess: (res) => {
	// 		console.log(res);
	// 	},
	// 	onError: (error) => console.log(error),
	// });

	// TODO 회원가입 요청 보내기 {kakaoInfo, nickname}
	const complete = () => {
		// getCookie('kakaoUserInfo')
		// registerMutate({})
		router.replace(`${SERVICE_URL.home}`);
	};
	return (
		<>
			{page === '1' && (
				<div className="bg-white h-[100vh] p-[2rem] relative">
					<h1 className="text-[2.2rem] font-bold mb-[2.3rem]">닉네임을 입력해주세요! 🔥</h1>
					<input
						type="text"
						placeholder="닉네임을 입력해주세요."
						value={nickName}
						onChange={onNickNameChange}
						className="w-full rounded-[0.8rem] h-[4.5rem] p-[1.5rem] mb-[15%] text-[1.4rem] bg-[#F8F8FA]"
					/>
					<Lottie className="mr-[1rem]" animationData={nicknameInput} />
					{/* TODO 닉네임 대입 API 호출 후 page2 이동 */}
					<ButtonBar
						clickFn={() => router.push(`${SERVICE_URL.register}?page=2`)}
						content="다음"
						disabled={nickName === ''}
					/>
				</div>
			)}
			{page === '2' && (
				<div className="bg-white h-[100vh] p-[2rem] relative">
					<h1 className="text-[2.2rem] font-bold mb-[20%]">
						000님 What Song과 <br /> 음악 세계 탐험에 함께하게 되었어요! 🎤
					</h1>
					<Lottie animationData={registerComplete} />
					<ButtonBar clickFn={() => complete()} content="함께하기" />
				</div>
			)}
		</>
	);
}
