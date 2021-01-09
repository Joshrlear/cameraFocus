navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(gotMedia)
  .catch(err => console.error("getUserMedia() failed: ", err));

function gotMedia(mediastream) {
  const video = document.querySelector("video");
  video.srcObject = mediastream;

  const track = mediastream.getVideoTracks()[0];
  const capabilities = track.getCapabilities();

  // Check whether focus distance is supported or not.
  if (!capabilities.focusDistance) {
      console.log("not supported")
    return;
  }

  // Map focus distance to a slider element.
  const input = document.querySelector('input[type="range"]');
  input.min = capabilities.focusDistance.min;
  input.max = capabilities.focusDistance.max;
  input.step = capabilities.focusDistance.step;
  input.value = track.getSettings().focusDistance;

  input.oninput = function(event) {
    track.applyConstraints({
      advanced: [{
        focusMode: "manual",
        focusDistance: event.target.value
      }]
    });
  };
  input.hidden = false;
}