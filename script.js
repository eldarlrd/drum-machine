// Executor
$(document).ready(() => {
  $(this).keydown(key => {
    key.keyCode !== 82
      ? player(keys[key.keyCode])
      : toggleSwitch();
  });
  $(".drum-pad").click(function() {
    player($(this));
  });
  $("#toggle").change(instrument);
  instrument();
  $("#volume-bar").on("input", volControl);
  volControl();
});
// Sound Player
const player = pad => {
  $(pad).children().trigger("play");
  $(pad).addClass("drumActive");
  $("#toggle").is(":checked")
    ? $("#display").text(sounds[$(pad).children().attr("id")].synth)
    : $("#display").text(sounds[$(pad).children().attr("id")].drum);
  setTimeout(() => {
    $(pad).removeClass("drumActive");
  }, 500);
};
// Toggle Switch (Keyboard)
const toggleSwitch = () => {
  $("#toggle").is(":checked")
    ? $("#toggle").prop("checked", false)
    : $("#toggle").prop("checked", true);
  instrument();
};
// Instrument Switch
const instrument = () => {
  $("#toggle").is(":checked")
    ? $(".clip").each(function() {
        $(this).prop("src", sounds[$(this).attr("id")].synthSrc);
      })
    : $(".clip").each(function() {
        $(this).prop("src", sounds[$(this).attr("id")].drumSrc);
      });
};
// Volume Controls
const volControl = () => {
  const vol = $("#volume-bar").val() / 4;
  $(".clip").prop("volume", vol);
  vol != 0
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
// Sound Clips
const sounds = {
  "Q": {
    "drum": "Heater 1",
    "drumSrc": "assets/sounds-drum/heater-1.mp3",
    "synth": "Chord 1",
    "synthSrc": "assets/sounds-synth/chord-1.mp3"
  },
  "W": {
    "drum": "Heater 2",
    "drumSrc": "assets/sounds-drum/heater-2.mp3",
    "synth": "Chord 2",
    "synthSrc": "assets/sounds-synth/chord-2.mp3"
  },
  "E": {
    "drum": "Heater 3",
    "drumSrc": "assets/sounds-drum/heater-3.mp3",
    "synth": "Chord 3",
    "synthSrc": "assets/sounds-synth/chord-3.mp3"
  },
  "A": {
    "drum": "Heater 4",
    "drumSrc": "assets/sounds-drum/heater-4.mp3",
    "synth": "Chord 4",
    "synthSrc": "assets/sounds-synth/chord-4.mp3"
  },
  "S": {
    "drum": "Clap",
    "drumSrc": "assets/sounds-drum/clap.mp3",
    "synth": "Bonk",
    "synthSrc": "assets/sounds-synth/bonk.mp3"
  },
  "D": {
    "drum": "Open HH",
    "drumSrc": "assets/sounds-drum/open-hh.mp3",
    "synth": "Snare",
    "synthSrc": "assets/sounds-synth/snare.mp3"
  },
  "Z": {
    "drum": "Kick n' Hat",
    "drumSrc": "assets/sounds-drum/kick-n-hat.mp3",
    "synth": "Punchy Kick",
    "synthSrc": "assets/sounds-synth/punchy-kick.mp3"
  },
  "X": {
    "drum": "Kick",
    "drumSrc": "assets/sounds-drum/kick.mp3",
    "synth": "Side Stick",
    "synthSrc": "assets/sounds-synth/side-stick.mp3"
  },
  "C": {
    "drum": "Closed HH",
    "drumSrc": "assets/sounds-drum/closed-hh.mp3",
    "synth": "Shaker",
    "synthSrc": "assets/sounds-synth/shaker.mp3"
  }
};