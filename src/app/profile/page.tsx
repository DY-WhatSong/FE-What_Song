import TitleHeader from '@/components/TitleHeader';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileMusicRecord from '@/components/profile/ProfileMusicRecord';

export default async function ProfilePage() {
	return (
		<>
			<TitleHeader title="프로필" />
			<div className="px-[2rem] pb-[2rem] text-[2rem]">
				<ProfileInfo />
				<h2 className="text-[2.4rem] font-bold py-[2rem]">프로필 뮤직</h2>
				<ProfileMusicRecord />
				<h2 className="text-[2.4rem] font-bold py-[2rem]">방명록</h2>
			</div>
		</>
	);
}
