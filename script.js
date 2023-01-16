// Executor
$(document).ready(() => {
  $(this).keydown(key => {
    key.keyCode !== 82
      ? keyStyle(key.keyCode)
      : keySwitch(key.keyCode);
  });
  $(".drum-pad").click(function() {
    drumStyle($(this));
  });
  $("#volume-bar").on("input", volControl);
  volCheck();
});
// Drum Styler (Keyboard)
const keyStyle = num => {
  const btn = $(keys[num]);
  btn.addClass("drumActive");
  setTimeout(() => {
    btn.removeClass("drumActive");
  }, 400);
};
// Toggle Switch (Keyboard)
const keySwitch = () => {
  $("#toggle").is(":checked")
    ? $("#toggle").prop("checked", false)
    : $("#toggle").prop("checked", true);
};
// Drum Styler
const drumStyle = str => {
  const elem = $(str);
  elem.addClass("drumActive");
  setTimeout(() => {
    elem.removeClass("drumActive");
  }, 400);
};
// Volume Controls
const volControl = () => {
  const vol = $("#volume-bar").val() / 4;
  sessionStorage.setItem("volSession", vol);
  volCheck();
};
// Volume Checker
const volCheck = () => {
  const volSaved = sessionStorage.getItem("volSession");
  volSaved === null
    ? $(".clip").prop("volume", .5)
    : $(".clip").prop("volume", volSaved);
  volSaved != 0
    ? $("#volume-icon").prop("src", volIcon.high)
    : $("#volume-icon").prop("src", volIcon.mute);
};
// Keycodes
const keys = {
  81: "#sound-1",
  87: "#sound-2",
  69: "#sound-3",
  65: "#sound-4",
  83: "#sound-5",
  68: "#sound-6",
  90: "#sound-7",
  88: "#sound-8",
  67: "#sound-9"
};
// Volume Icons
const volIcon = {
  "high": "assets/icons/volume-high-solid.svg",
  "mute": "assets/icons/volume-xmark-solid.svg"
};