let fullscreen = document.querySelector("#fff");
let button = document.querySelector("#button");

button.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    fullscreen?.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});