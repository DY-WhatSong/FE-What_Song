import Image from 'next/image';
import { BsPlayFill } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import Link from 'next/link';
import MusicDeleteModal from '../MusicDeleteModal';
import { Room } from '@/types/room';
import useUser from '@/hooks/useUser';

type Props = {
	musicRoom: Room;
	priority?: boolean;
};

export default function MusicRoomCard({
	musicRoom: {
		extraInfo: { hostName, view, hostEmail },
		have: { roomName, musicRoomSeq },
	},
	priority = false,
}: Props) {
	const user = useUser();
	const userEmail = user.data?.email;
	const isHostCard = userEmail === hostEmail;
	return (
		<article className="m-4 rounded-[40px] shadow-md shadow-zinc-700 overflow-hidden relative w-[30rem] h-[30rem] hover:opacity-90">
			<Link href={`room/${musicRoomSeq}`}>
				<div className="w-full h-full relative">
					<Image
						src="https://i.pinimg.com/originals/af/99/7b/af997bd9ce063b60705e71b7c21b8198.jpg"
						alt={roomName}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
						fill
						priority={priority}
					/>
				</div>
				<div className="absolute w-[30rem] h-[30rem] bottom-0 left-0 bg-gradient-to-tl from-zinc-900" />
				<h2 className="absolute bottom-32 left-5 text-3xl font-bold text-white p-2 w-4/5">{roomName}</h2>
				<h5 className="absolute bottom-[6.4rem] left-6 text-white p-2">{hostName}</h5>
				<span className="absolute bottom-[1.8rem] left-8 bg-white w-16 h-16 rounded-full flex items-center justify-center">
					<BsPlayFill className="w-14 h-14 p-0.5 ml-1" />
				</span>
				<span className="absolute bottom-[1.8rem] left-28 bg-zinc-300 text-zinc-100 bg-opacity-70 w-24 h-14 rounded-3xl flex items-center justify-around p-3">
					<AiFillEye className="w-8 h-8" />
					<p className="text-xl font-semibold mt-0.5">{view}</p>
				</span>
			</Link>
			{isHostCard && <MusicDeleteModal musicRoomSeq={musicRoomSeq} />}
		</article>
	);
}
