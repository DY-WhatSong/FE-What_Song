'use client';

import { SERVICE_URL } from '@/app/constants/ServiceUrl';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RegisterPage() {
	const searchParams = useSearchParams();
	const page = searchParams.get('page');
	const router = useRouter();
	return (
		<>
			{page === '1' && (
				<div className="text-[1.4rem] bg-white h-[100vh]">
					<h1>닉네임 입력 페이지</h1>
					<button onClick={() => router.push(`${SERVICE_URL.register}?page=2`)}>다음</button>
				</div>
			)}
			{page === '2' && (
				<div className="text-[1.4rem] bg-white h-[100vh]">
					<h1>회원가입 성공 페이지</h1>
					<button onClick={() => router.push(`${SERVICE_URL.home}`)}>함께하기</button>
				</div>
			)}
		</>
	);
}
