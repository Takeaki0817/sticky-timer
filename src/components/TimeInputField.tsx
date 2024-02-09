import React, { useState, useEffect } from 'react';

type Props = {
	setSeconds: React.Dispatch<React.SetStateAction<number>>;
};

const TimeInputField = (props: Props) => {
	const { setSeconds } = props;
	const [inputHour, setInputHour] = useState('');
	const [inputMinutes, setInputMinutes] = useState('');
	const [inputSeconds, setInputSeconds] = useState('');

	const calculateTotalSeconds = (h: string, m: string, s: string) => {
		const hrs = h ? parseInt(h, 10) : 0;
		const mins = m ? parseInt(m, 10) : 0;
		const secs = s ? parseInt(s, 10) : 0;
		return hrs * 3600 + mins * 60 + secs;
	};

	useEffect(() => {
		const calculatedSeconds = calculateTotalSeconds(
			inputHour,
			inputMinutes,
			inputSeconds
		);
		setSeconds(calculatedSeconds);
	}, [inputHour, inputMinutes, inputSeconds, setSeconds]);

	return (
		<div>
			<p>
				<input
					type='number'
					value={inputHour}
					onChange={(e) => setInputHour(e.target.value.replace(/[^0-9]/g, ''))}
					placeholder='時間'
				/>
				時間
			</p>
			<p>
				<input
					type='number'
					value={inputMinutes}
					onChange={(e) =>
						setInputMinutes(e.target.value.replace(/[^0-9]/g, ''))
					}
					placeholder='分'
				/>
				分
			</p>
			<p>
				<input
					type='number'
					value={inputSeconds}
					onChange={(e) =>
						setInputSeconds(e.target.value.replace(/[^0-9]/g, ''))
					}
					placeholder='秒'
				/>
				秒
			</p>
		</div>
	);
};

export default TimeInputField;
