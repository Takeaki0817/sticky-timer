'use client';
import { useState, useEffect, useRef } from 'react';

import TimeInputField from './TimeInputField';
import TimerSwitchButtons from './TimerSwitchButtons';
import PipButton from './PipButton';

const Timer = () => {
	const [seconds, setSeconds] = useState<number>(0);
	const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const padFormat = (num: number) => num.toString().padStart(2, '0');

	const hourPad = padFormat(Math.floor(seconds / 3600));
	const minutesPad = padFormat(Math.floor((seconds % 3600) / 60));
	const secondsPad = padFormat(seconds % 60);

	const timerTxt = `${hourPad}:${minutesPad}:${secondsPad}`;

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.font = '96px serif';
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.fillText(timerTxt, canvas.width / 2, canvas.height / 2);

		const updateTimer = () => {
			setSeconds((prevSeconds) => prevSeconds - 1);
		};

		if (isCountingDown && seconds > 0) {
			interval = setInterval(updateTimer, 1000);
		}

		if (seconds <= 0) {
			setIsCountingDown(false); // 自動的にカウントダウンを停止
			clearInterval(interval!);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isCountingDown, seconds, setIsCountingDown, setSeconds, timerTxt]);

	return (
		<>
			<div>
				<canvas
					ref={canvasRef}
					width='1280'
					height='960'
					className='w-full'
				></canvas>
			</div>
			<TimeInputField setSeconds={setSeconds} />
			<TimerSwitchButtons
				seconds={seconds}
				isCountingDown={isCountingDown}
				setIsCountingDown={setIsCountingDown}
			/>
			<PipButton canvasRef={canvasRef} />
		</>
	);
};

export default Timer;
