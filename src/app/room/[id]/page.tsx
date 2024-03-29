import { roomApis } from '@/app/service/room';
import InteractionBar from '@/components/bar/InteractionBar';
import Iframe from '@/components/music/iframe/Iframe';
import TitleHeader from '@/components/TitleHeader';
import '../../styles/musicProgressbar.css';

type Props = {
	params: { id: string };
};

export default async function MusicRoomPage({ params: { id } }: Props) {
	// 뮤직룸 상세 정보
	const {
		have: { musicRoomSeq, roomName, roomCode },
		extraInfo: { hostEmail, view },
	} = await roomApis.getRoomData(Number(id));

	return (
		<>
			<TitleHeader title={roomName} previous view={view} isView />
			<Iframe roomId={musicRoomSeq} roomCode={roomCode} hostEmail={hostEmail} />
			<InteractionBar />
		</>
	);
}
