const allAudios = document.querySelectorAll('audio');

allAudios.forEach(audioElement => {
    new Plyr(audioElement, {
      controls: ['play', 'progress', 'duration', 'mute', 'volume', 'download'],
        muted: true,
        autoplay: false
    });
});
