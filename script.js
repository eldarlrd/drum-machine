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
  $("#volume-bar").change(volControl);
  volCheck();
});
// Drum Styler (Keyboard)
const keyStyle = num => {
  const btn = $(keys[num].id);
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
  const i = $("#volume-bar").val();
  switch (i) {
    case "0":
      $(".clip").prop("volume", 0);
      break;
    case "1":
      $(".clip").prop("volume", .25);
      break;
    case "2":
      $(".clip").prop("volume", .5);
      break;
    case "3":
      $(".clip").prop("volume", .75);
      break;
    case "4":
      $(".clip").prop("volume", 1);
  }
  volCheck();
};
// Volume Checker
const volCheck = () => {
  $("#volume-bar").val() != 0
    ? $("#volume-icon").prop("src", volIcon.high)
    : $("#volume-icon").prop("src", volIcon.low);
};
// Keycodes
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
  }
};
// Volume Icons
const volIcon = {
  "high": "assets/icons/volume-high-solid.svg",
  "low": "assets/icons/volume-xmark-solid.svg"
};