import * as faceapi from 'face-api.js';
import React from 'react';
import { useContext } from 'react';
import NoseYProportion from './contexts/NoseYProportion';

function UserCamera(props) {
    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    // const [captureVideo, setCaptureVideo] = React.useState(false);

    const [noseYProp, setNoseYProp] = useContext(NoseYProportion);

    const [noseYCoord, setNoseYCoord] = React.useState(null);

    const videoRef = React.useRef();
    const videoHeight = window.innerHeight * 0.2;
    const videoWidth = window.innerWidth * 0.2;
    const canvasRef = React.useRef();

    React.useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';

            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                // faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(setModelsLoaded(true));
        };
        loadModels();
    }, []);

    React.useEffect(() => {
        startVideo();
    }, []);

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error('error:', err);
            });
    };

    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
                    videoRef.current
                );
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight,
                };

                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi
                    .detectAllFaces(
                        videoRef.current,
                        new faceapi.TinyFaceDetectorOptions()
                    )
                    .withFaceLandmarks();

                if (detections.length > 0) {
                    // Get the nose coordinate
                    const nose = detections[0].landmarks.getNose()[3];

                    const actualHeight = videoRef.current.videoHeight;

                    let y = nose.y / actualHeight;
                    // console.log(y);

                    // const y = nose.y;

                    // Update the nose coordinate state
                    if (y <= 0.15) {
                        y = 0;
                    } else if (y >= 0.9) {
                        y = 1;
                    }

                    setNoseYCoord(y);
                    setNoseYProp(y);
                }
            }
        }, 100);
    };

    return (
        <div>
            {modelsLoaded ? (
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            position: 'relative',
                        }}
                    >
                        <video
                            ref={videoRef}
                            onPlay={handleVideoOnPlay}
                            width={videoWidth}
                            height={videoHeight}
                            style={{
                                borderRadius: '10px',
                            }}
                        />
                        <canvas
                            ref={canvasRef}
                            style={{ position: 'absolute' }}
                        />
                    </div>
                    {/* <p>{'Nose y coord:' + noseYCoord}</p> */}
                </div>
            ) : (
                <div>loading...</div>
            )}
        </div>
    );
}

export default UserCamera;
