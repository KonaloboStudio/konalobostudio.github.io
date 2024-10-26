const allAudios = document.querySelectorAll('audio');

allAudios.forEach(audioElement => {
    const player = new Plyr(audioElement, {
        controls: ['play', 'progress', 'duration', 'mute', 'volume', 'settings', 'download'],
        muted: true,
        autoplay: false
    });

    player.on('play', () => {
        allAudios.forEach(otherAudio => {
            if (otherAudio !== audioElement) {
                otherAudio.pause();
            }
        });
    });
});