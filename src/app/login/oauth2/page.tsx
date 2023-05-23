'use client';

import { useEffect } from 'react';

export default function CallbackPage() {
	useEffect(() => {
		const code = new URL(document.location.toString()).searchParams.get('code') as string;
		console.log('인가코드:', code);
	}, []);

	return <div />;
}
