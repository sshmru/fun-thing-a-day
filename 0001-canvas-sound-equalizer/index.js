myaudio = new Audio("http://localhost:8080/Anus%20Mush%20-%20Whenever%20(Shakira%20Cover).mp3");
myaudio.crossOrigin = "anonymous";
myaudio.autoplay = true;
myaudio.loop = true;

ac = new AudioContext();
source = ac.createMediaElementSource(myaudio);
source.connect(ac.destination);

analyser = ac.createAnalyser();
analyser.fftSize = 256;
source.connect(analyser);

ctx = c.getContext('2d');
W = c.width = innerWidth;
H = c.height = innerHeight;

frameIndex = 0;
renderFrame = ms => {
	  requestAnimationFrame(renderFrame);
	  frameIndex ++;
	  
	  /* get auduio data */
	  audioData = new Uint8Array(analyser.frequencyBinCount);
	  analyser.getByteFrequencyData(audioData);
	  len = audioData.length;
	  
	  /* dunno why not working for me ctx.fillStyle = '#00112204' */
	  ctx.fillStyle = 'rgba(0,22,34, 0.01)';
	  ctx.fillRect(0,0,W,H);
	  
	  ctx.save();
	  ctx.translate(W/2, H/2);
	  ctx.lineWidth = 4;

	  
	  zoomLevel = 1.02;
	  ctx.drawImage(
		      c,
		      0,0,W, H,
		      -W/2*zoomLevel, -H/2*zoomLevel, W*zoomLevel, H*zoomLevel
		    );
	  
	  ctx.globalCompositeOperation = 'lighter';
	  
	  equalizerW = W/2;
	  equalizerH = H/4;
	  ctx.strokeStyle = `hsl(${ms/300}, 50%, 50%)`;
	  if((frameIndex % 4) === 0){
		      ctx.beginPath();
		      for(i=0; i < len; i+=4){
			            index = i < len /2 ? i : len - 1 - i;
			            v = 1 - audioData[index] / 256;
			            ctx.lineTo(
					            (i / len - .5) * equalizerW, v * equalizerH
					          );
			          }
		      ctx.stroke();
		    }
	  ctx.globalCompositeOperation = 'source-over';
	  
	  x = (Math.random()-.5)*equalizerW;
	  y = H/16 - Math.random() * equalizerH;
	  
	  ctx.strokeStyle = '#cff';
	  ctx.beginPath()
	  for(i=0; i<6; i++){
		      ctx.lineTo(
			            x + equalizerW/16 * Math.cos(x + i),
			            y + equalizerW/16 * Math.sin(y + i)
			          )
		    }
	  ctx.closePath();
	  ctx.stroke();
	  
	  ctx.restore();
};

renderFrame();
