import { useRef, RefObject } from 'react';

type Props = {
	canvasRef: RefObject<HTMLCanvasElement>;
};
const PipButton = (props: Props) => {
	const { canvasRef } = props;
	const videoRef = useRef<HTMLVideoElement>(null);

	const handlePiP = () => {
		// 現在PiPモードである場合、それを終了する
		if (document.pictureInPictureElement) {
			document.exitPictureInPicture().catch((err) => {
				console.error('PiP exit error:', err);
			});
			return; // 早期リターン
		}
		const canvas = canvasRef.current;
		const video = videoRef.current;
		if (!canvas || !video) return;

		const stream = canvas.captureStream(30); // 30fpsでストリームをキャプチャ
		video.srcObject = stream;
		video
			.play()
			.then(() => {
				video.requestPictureInPicture();
			})
			.catch((err) => {
				console.error('PiP error:', err);
			});
	};
	return (
		<>
			<button onClick={handlePiP}>PiP開始</button>
			<video ref={videoRef} style={{ display: 'none' }}></video>
		</>
	);
};

export default PipButton;
