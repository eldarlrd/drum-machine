// Executor
$(document).ready(() => {
  $(this).keydown(key => {
    key.keyCode !== 82
    ? handleDrum(key.keyCode)
    : handleSwitch(key.keyCode);
  });
  $(".drum-pad").click(() => {
    handleDrum();
  });
});
// Drum Player
const handleDrum = num => {
  const btn = $(keys[num].id);
  btn.addClass("drumActive");
  setTimeout(() => {
    btn.removeClass("drumActive");
  }, 400);
};
// Instrument Switch
const handleSwitch = r => {

};
// Keys Object
const keys = {
  81: {
    "id": "#sound-1"
  },
  87: {
    "id": "#sound-2"
  },
  69: {
    "id": "#sound-3"
  },
  65: {
    "id": "#sound-4"
  },
  83: {
    "id": "#sound-5"
  },
  68: {
    "id": "#sound-6"
  },
  90: {
    "id": "#sound-7"
  },
  88: {
    "id": "#sound-8"
  },
  67: {
    "id": "#sound-9"
  },
  82: {

  }
};
/* Keycodes
  Q 81, W 87, E 69
  A 65, S 83, D 68,
  Z 90, X 88, C 67, R 82
*/