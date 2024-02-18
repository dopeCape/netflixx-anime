
import React, { useState, useEffect } from 'react';
import Hls from 'hls.js';

function HLSThumbnailCapture() {
  const [thumbnailURL, setThumbnailURL] = useState(null);

  useEffect(() => {
    const videoElement = document.createElement('video');
    const hls = new Hls();

    // Attach the HLS instance to the video element
    hls.attachMedia(videoElement);

    // Mute the video to prevent sound
    videoElement.muted = true;

    // HLS stream URL
    const hlsStreamURL = 'https://www007.vipanicdn.net/streamhls/5389aac31c41f666f74840b623eb7741/ep.1.1677592659.1080.m3u8';

    // Listen for the 'hlsMediaAttached' event to capture a thumbnail
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      // Seek to the desired position (e.g., 10 seconds)
      videoElement.currentTime = 40;

      // Capture a thumbnail after a short delay (to allow video to load)
      setTimeout(() => {
        captureThumbnail(videoElement);
      }, 2000); // Adjust the delay as needed
    });

    // Load the HLS stream
    hls.loadSource(hlsStreamURL);

    return () => {
      // Cleanup: Stop playback and destroy the HLS instance
      videoElement.pause();
      hls.destroy();
    };
  }, []);

  const captureThumbnail = (videoElement) => {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const thumbnailDataURL = canvas.toDataURL('image/jpeg');
    setThumbnailURL(thumbnailDataURL);
  };

  return (
    <div>
      {thumbnailURL && <img src={thumbnailURL} alt="HLS Thumbnail" />}
    </div>
  );
}

export default HLSThumbnailCapture;

