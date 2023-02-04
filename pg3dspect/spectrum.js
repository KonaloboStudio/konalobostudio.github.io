const logoimg = document.getElementById("logoimg");
const bgVideo = document.getElementById("bgVideo");
const canvas = document.getElementById("output");
const ctx = canvas.getContext("2d");

let gradientStartInput = document.getElementById("gradientStartInput");
let gradientEndInput = document.getElementById("gradientEndInput");
const opacityInput = document.getElementById("opacityInput")

const smoothInput = document.getElementById("smoothInput");
const endDataInput = document.getElementById("endDataInput");

let showIntro = false;

function drawSpectrum(data) {
	let h = canvas.height;
	let w = canvas.width;

	data = data.slice(0, endDataInput.value);
	data = smooth(data, smoothInput.value);

	let gradient = ctx.createLinearGradient(1280, 0, 1280, 1080);
	gradient.addColorStop(0, gradientStartColor);
	gradient.addColorStop(1, gradientEndColor);
	ctx.fillStyle = gradient;
	ctx.lineJoin = "round";

	ctx.clearRect(0, 0, w, h);

	// Video background
	if (bgVideo.src)
		ctx.drawImage(bgVideo, 0, 0, 1920, 1080);

	let totalAmplitude = 0;
	for (let i = 0; i < data.length; i++)
		totalAmplitude += data[i]
	let meanAmplitude = totalAmplitude / data.length;

	let min = 5;
	let r = h / ((255 / meanAmplitude) * 5) + h / 4;
	let cx = w / 2;
	let cy = h / 2;
	let point_count = data.length;
	let percent = r/255;
	let increase = (2 / point_count) * Math.PI;

	ctx.beginPath();
	for (let point = 1; point <= point_count; point++) {
		let p = (data[point] + min) * percent;
		let a = point * increase;

		let dx = cx + (r + p) * Math.cos(a);
		let dy = cy + (r + p) * Math.sin(a);
		ctx.lineTo(dx, dy);
	}
	ctx.fill();

	
	ctx.beginPath();
	for (let point = 1; point <= point_count; point++) {
		let p = (data[point] + min) * percent;
		let a = (point_count-point+point_count/2) * increase

		let dx = cx + (r + p) * Math.cos(a);
		let dy = cy + (r + p) * Math.sin(a);
		ctx.lineTo(dx, dy);
	}
	ctx.fill();

	// Logo
	const borderSize = 16;
	ctx.drawImage(logoimg, cx - r + borderSize, cy - r + borderSize, r * 2 - borderSize * 2, r * 2 - borderSize * 2);

}


var player = document.getElementById("audioplayer");

var fileInput = document.getElementById("fileinput");


var audioCtx;
var audio;
var audioSrc;
var analyser;

function playAudio() {
	var file = fileInput.files[0];
	player.src = URL.createObjectURL(file);

	if (!audioCtx) {
		audioCtx = new AudioContext();
		audio = document.getElementById('audioplayer');
		audioSrc = audioCtx.createMediaElementSource(audio);
		analyser = audioCtx.createAnalyser();
		audioSrc.connect(analyser);
		audioSrc.connect(audioCtx.destination);
	}


	changeSettings();

	var data = new Uint8Array(analyser.frequencyBinCount);

	function renderFrame() {
		requestAnimationFrame(renderFrame);
		analyser.getByteFrequencyData(data);
		drawSpectrum(data);
	}
	renderFrame();
}

function changeSettings() {
	if (audioCtx) {
		const opacity = parseInt(opacityInput.value).toString(16).padStart(2, '0');
		gradientStartColor = document.getElementById("gradientStartInput").value + opacity;
		gradientEndColor = document.getElementById("gradientEndInput").value + opacity;
		analyser.smoothingTimeConstant = document.getElementById("stcInput").value;
		analyser.fftSize = document.getElementById("fftInput").value;
		analyser.minDecibels = document.getElementById("minDbInput").value;
	}

}

function changeBgVideo() {
	if (document.getElementById("bgVideoInput").value) {
		const bgVideoFile = document.getElementById("bgVideoInput").files[0];
		bgVideo.src = URL.createObjectURL(bgVideoFile);
		bgVideo.play()
	}
}

function changeBg() {
	if (document.getElementById("bgInput").value) {
		const bgFile = document.getElementById("bgInput").files[0];
		canvas.style.backgroundImage = "url('" + URL.createObjectURL(bgFile) + "')";
	}
}

function togglePlay() {
	player.paused ? player.play() : player.pause()
}

// From js.nation
function smooth(points, margin) {
	if (margin == 0) {
		return points;
	}

	let newArr = Array();
	for (let i = 0; i < points.length; i++) {
		let sum = 0;
		let denom = 0;
		for (let j = 0; j <= margin; j++) {
			if (i - j < 0 || i + j > points.length - 1) {
				break;
			}
			sum += points[i - j] + points[i + j];
			denom += (margin - j + 1) * 2;
		}
		newArr[i] = sum / denom;
	}
	return newArr;
}

function startVideo() {
	bgVideo.play();
	bgVideo.currentTime = 0; // Firefox workaround
	player.currentTime = 0;
	player.play();
}

function stopVideo() {
	player.pause();
	bgVideo.pause();
}

var mediaRecorder;

function startRecording() {
	startVideo();

	let chunks = [];
	let stream = canvas.captureStream(60);
	let options = {videoBitsPerSecond: 15000000}
	mediaRecorder = new MediaRecorder(stream, options);
	mediaRecorder.start(3);

	mediaRecorder.ondataavailable = function(e) {
		chunks.push(e.data);
	};

	mediaRecorder.onstop = function(e) {
		var blob = new Blob(chunks, { 'type' : mediaRecorder.mimeType });
		var audioURL = URL.createObjectURL(blob);
		window.open(audioURL);
	}

}

function stopRecording() {
	mediaRecorder.stop();
	stopVideo();
}
