import Button from '@/components/Button';
import MusicRecord from '@/components/MusicRecord';
import TitleHeader from '@/components/TitleHeader';

export default function CreateSuccessPage() {
	return (
		<article className="flex flex-col h-5/6 justify-around items-start gap-5">
			<TitleHeader title="뮤직방 생성" previous />
			<MusicRecord image="/assets/sample.png" />
			<h2 className="text-3xl font-bold ml-12 p-2">
				음악 방 생성이 완료되었어요! 🤗
				<br /> 지금 바로 음악 같이 들으러 가볼까요?
			</h2>
			<Button name="완료" link="/music" />
		</article>
	);
}
