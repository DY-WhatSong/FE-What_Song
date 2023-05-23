import { KAKAO_OAUTH2_URL } from '../constants/login';

export default function LoginPage() {
	return (
		<div className="text-[1.4rem] bg-white h-[100vh]">
			<h1>로그인 페이지</h1>
			<a href={KAKAO_OAUTH2_URL}>
				<span>카카오 로그인/회원가입</span>
			</a>
		</div>
	);
}
