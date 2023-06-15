import { IoMdSettings } from 'react-icons/io';

export default function ProfileInfo() {
	return (
		<div className="mb-[1rem]">
			<div className="flex items-center justify-between">
				<div className="flex">
					<div className="w-[6rem] h-[6rem] rounded-[50%] mr-[1rem] bg-[#D8D8D8]" />
					<div className="flex flex-col justify-center">
						<span className="font-semibold">닉네임</span>
						<span className="text-[1.4rem] text-[#8b94a0]">aaa@kakao.com</span>
					</div>
				</div>
				<IoMdSettings className="w-[3rem] h-[3rem]" />
			</div>
		</div>
	);
}
