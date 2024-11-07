/**
 * @license AGPL-3.0-only
 * Drum Machine - A Drum Machine
 * Copyright (C) 2022-2024 Eldar Pashazade <eldarlrd@pm.me>
 *
 * This file is part of Drum Machine.
 *
 * Drum Machine is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * Drum Machine is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Drum Machine. If not, see <https://www.gnu.org/licenses/>.
 */

import $ from 'jquery';
import '@/styles.css';
import 'modern-normalize/modern-normalize.css';
import '@fontsource-variable/oswald/index.css';
import '@fontsource/cantarell/index.css';

import clapDrum from '@/assets/sfx/drums/clap.opus';
import closedHHDrum from '@/assets/sfx/drums/closed-hh.opus';
import heater1Drum from '@/assets/sfx/drums/heater-1.opus';
import heater2Drum from '@/assets/sfx/drums/heater-2.opus';
import heater3Drum from '@/assets/sfx/drums/heater-3.opus';
import heater4Drum from '@/assets/sfx/drums/heater-4.opus';
import kickNhatDrum from '@/assets/sfx/drums/kick-n-hat.opus';
import kickDrum from '@/assets/sfx/drums/kick.opus';
import openHHDrum from '@/assets/sfx/drums/open-hh.opus';
import bonkSynth from '@/assets/sfx/synths/bonk.opus';
import chord1Synth from '@/assets/sfx/synths/chord-1.opus';
import chord2Synth from '@/assets/sfx/synths/chord-2.opus';
import chord3Synth from '@/assets/sfx/synths/chord-3.opus';
import chord4Synth from '@/assets/sfx/synths/chord-4.opus';
import punchyKickSynth from '@/assets/sfx/synths/punchy-kick.opus';
import shakerSynth from '@/assets/sfx/synths/shaker.opus';
import sideStickSynth from '@/assets/sfx/synths/side-stick.opus';
import snareSynth from '@/assets/sfx/synths/snare.opus';

const audioElements: Record<string, HTMLAudioElement> = {};

const toggle = $('#toggle');
const display = $('#display');

$(() => {
  preloadAudio();

  $(document).on('keydown', event => {
    const key = event.key.toUpperCase();

    if (key !== 'R') player($(KEYS[key as keyof typeof KEYS]));
    else toggleSwitch();
  });

  $('.drum-pad').on('click', function () {
    player($(this));
  });

  toggle.on('change', instrumentSwap);
  $('#volume-bar').on('input', volumeControls);

  instrumentSwap();
  volumeControls();
});

const preloadAudio = (): void => {
  Object.values(SOUNDS).forEach(sound => {
    audioElements[sound.drumSrc] = createAudioElement(sound.drumSrc);
    audioElements[sound.synthSrc] = createAudioElement(sound.synthSrc);
  });
};

const createAudioElement = (src: string): HTMLAudioElement => {
  const audio = new Audio(src);

  return audio;
};

const player = (pad: JQuery): void => {
  const clipId = pad.children().attr('id') as keyof typeof SOUNDS;
  const sound = SOUNDS[clipId];

  const isSynth = toggle.is(':checked');
  const audioSrc = isSynth ? sound.synthSrc : sound.drumSrc;
  const audio = audioElements[audioSrc];

  audio.currentTime = 0;
  void audio.play();

  pad.addClass('drum-active');
  display.text(isSynth ? sound.synth : sound.drum);

  audio.onended = (): void => {
    pad.removeClass('drum-active');
    display.text('');
  };
};

const toggleSwitch = (): void => {
  const isChecked = toggle.is(':checked');

  toggle.prop('checked', !isChecked);
  instrumentSwap();
};

const instrumentSwap = (): void => {
  const isSynth = toggle.is(':checked');

  $('.clip').each(function () {
    const sound = SOUNDS[$(this).attr('id') as keyof typeof SOUNDS];
    const newSrc = isSynth ? sound.synthSrc : sound.drumSrc;

    $(this).prop('src', newSrc);
  });
};

const volumeControls = (): void => {
  const volume = Number($('#volume-bar').val()) / 4;

  Object.values(audioElements).forEach(audio => (audio.volume = volume));

  $('#volume-icon')
    .toggleClass(VOLUME_ICONS.high, volume !== 0)
    .toggleClass(VOLUME_ICONS.mute, volume === 0);
};

const KEYS = {
  Q: '#sound-1',
  W: '#sound-2',
  E: '#sound-3',
  A: '#sound-4',
  S: '#sound-5',
  D: '#sound-6',
  Z: '#sound-7',
  X: '#sound-8',
  C: '#sound-9'
};

const VOLUME_ICONS = {
  high: 'fa-volume-high',
  mute: 'fa-volume-xmark'
};

const SOUNDS = {
  Q: {
    drum: 'Heater 1',
    drumSrc: heater1Drum,
    synth: 'Chord 1',
    synthSrc: chord1Synth
  },
  W: {
    drum: 'Heater 2',
    drumSrc: heater2Drum,
    synth: 'Chord 2',
    synthSrc: chord2Synth
  },
  E: {
    drum: 'Heater 3',
    drumSrc: heater3Drum,
    synth: 'Chord 3',
    synthSrc: chord3Synth
  },
  A: {
    drum: 'Heater 4',
    drumSrc: heater4Drum,
    synth: 'Chord 4',
    synthSrc: chord4Synth
  },
  S: {
    drum: 'Clap',
    drumSrc: clapDrum,
    synth: 'Bonk',
    synthSrc: bonkSynth
  },
  D: {
    drum: 'Open HH',
    drumSrc: openHHDrum,
    synth: 'Snare',
    synthSrc: snareSynth
  },
  Z: {
    drum: "Kick n' Hat",
    drumSrc: kickNhatDrum,
    synth: 'Punchy Kick',
    synthSrc: punchyKickSynth
  },
  X: {
    drum: 'Kick',
    drumSrc: kickDrum,
    synth: 'Side Stick',
    synthSrc: sideStickSynth
  },
  C: {
    drum: 'Closed HH',
    drumSrc: closedHHDrum,
    synth: 'Shaker',
    synthSrc: shakerSynth
  }
};

// Easter Egg
console.log('Ore wa, ochinchin ga daisuki nandayo!');
