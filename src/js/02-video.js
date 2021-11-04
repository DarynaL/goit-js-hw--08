import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const DATA_CURRENT_TIME = 'videoplayer-current-time';

    const player = new Vimeo.Player('vimeo-player');

player.on('play', onPlay);

function onPlay() {
    if (localStorage.getItem(DATA_CURRENT_TIME)) {
        player.setCurrentTime(localStorage.getItem(DATA_CURRENT_TIME));
    player.off('play', onVideoPlay);
  }
    }

player.on('timeupdate', throttle(OnTimeUpdate, 1000));


function OnTimeUpdate(data) {
  player.getCurrentTime().then(seconds => localStorage.setItem(DATA_CURRENT_TIME, seconds));
}

