'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/button/Button';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import nicknameInput from '../../../public/lottie/nicknameInput.json';
import InputBar from '../bar/InputBar';
import PageHeaderContent from '../PageHeaderContent';
import LottieView from '../LottieView';

export default function NicknameInputPage() {
	const router = useRouter();
	const [nickname, setNickname] = useState<string>('');

	const onNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(event.target.value);
	};

	// const { mutate: registerMutate } = useMutation(loginApis.getRegister, {
	// 	onSuccess: (res) => {
	// 		console.log(res);
	// 	},
	// 	onError: (error) => console.log(error),
	// });

	// TODO 회원가입 요청 보내기 {kakaoInfo, nickname}
	const SignIn = () => {
		// getCookie('kakaoUserInfo')
		// removeCookie('kakaoUserInfo');
		// registerMutate({})
		router.push(`${SERVICE_URL.register}?page=2`);
	};

	return (
		<div className="wrap">
			<PageHeaderContent content="닉네임을 입력해주세요! 🔥" mb="mb-[2.3rem]" />
			<InputBar placeholder="닉네임을 입력해주세요." value={nickname} onChange={onNickNameChange} />
			<LottieView file={nicknameInput} styles="mr-[1rem]" />
			<Button clickFn={() => SignIn()} content="다음" disabled={nickname === ''} />
		</div>
	);
}
