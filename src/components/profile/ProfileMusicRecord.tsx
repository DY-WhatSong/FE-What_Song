export default function ProfileMusicRecord() {
	return (
		<div className="flex items-center">
			<div className="relative w-[14rem] h-[17rem] rounded-[4rem] mr-[6rem]">
				<div className="absolute w-[14rem] h-[17rem] bg-[#D8D8D8] rounded-[4rem] z-10" />
				<div className="absolute w-[11rem] h-[14rem] bg-[#312D2D] rounded-[50%] right-[-2.5rem] top-[50%] transform translate-y-[-50%]" />
			</div>
			<div className="flex flex-col items-center justify-center">
				<span className="text-[2.6rem] font-semibold">노래제목</span>
				<span className="text-[1.8rem] text-[#8b94a0]">가수명</span>
			</div>
		</div>
	);
}
