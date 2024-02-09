import React from 'react';

type Props = {
	seconds: number;
	isCountingDown: boolean;
	setIsCountingDown: React.Dispatch<React.SetStateAction<boolean>>;
};

const TimerSwitchButtons = (props: Props) => {
	const { seconds, isCountingDown, setIsCountingDown } = props;
	return (
		<div>
			<button
				onClick={() =>
					seconds > 0 && !isCountingDown ? setIsCountingDown(true) : null
				}
			>
				開始
			</button>

			<button onClick={() => setIsCountingDown(false)}>停止</button>
		</div>
	);
};

export default TimerSwitchButtons;
