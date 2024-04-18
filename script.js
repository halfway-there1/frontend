let audioChunks = [];
let mediaRecorder;

const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const playButton = document.getElementById('playButton');
const audioPlayer = document.getElementById('audioPlayer');

recordButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);
playButton.addEventListener('click', playRecording);

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.addEventListener('dataavailable', (event) => {
    audioChunks.push(event.data);
  });
  mediaRecorder.addEventListener('stop', () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    audioPlayer.src = URL.createObjectURL(audioBlob);
  });
  recordButton.disabled = true;
  stopButton.disabled = false;
  playButton.disabled = true;
  mediaRecorder.start();
}

function stopRecording() {
  mediaRecorder.stop();
  recordButton.disabled = false;
  stopButton.disabled = true;
  playButton.disabled = false;
}

function playRecording() {
  audioPlayer.play();
}

let recordButtonImg = document.querySelector('.record img');

document.querySelector('.record').addEventListener('click', () => {
  let src = recordButtonImg.getAttribute('src');
  console.log(src);
  if (src === './img/record.png') {
    recordButtonImg.setAttribute('src', './img/stop.png');
    recordButton.click();
  } else {
    recordButtonImg.setAttribute('src', './img/record.png');
    stopButton.click();
  }
});
