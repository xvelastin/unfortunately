    /* Audio Scripts */

    const maxVoices = 32;
    const dirSamples = "audio/"
    
    let currentVoice = 0;
    let voices = [];
    let isMuted = false;

    function voiceinit() {
        // Initialises channels (voices) based on max voices number - avoids making thousands of channels.

        for (var i = 0; i < maxVoices; ++i) {
            let newVoice = new Audio();
            audioContainer.appendChild(newVoice);
            newVoice.id = 'audio_channel-' + i;
            newVoice.className = 'audio_channel';
            voices.push(newVoice);
        }    
    }

    function PlayAudioClip(base_filename, numberofsamples, startingVolume) {
        let i = getRandomInt(1, numberofsamples);
        let clipFileName = dirSamples + base_filename + "_" + i + ".mp3";

        let selectedVoice = voices[currentVoice];      // assigns the next open voice to the selected clip
        selectedVoice.src = clipFileName;
        selectedVoice.id = 'audio.' + clipFileName;
        selectedVoice.volume = startingVolume;
        selectedVoice.play();

        currentVoice = (currentVoice + 1) % maxVoices;      // continues the count %maxvoices   
    }

    function ChooseAndStartAudio(basename, numberofsamples, startingVolume) {
        // Choose an audio clip from a sample bank with the syntax [samplename] + "_" + [sample#] + .mp3.
        PlayAudioClip(clipFileName, startingVolume);
    }


    function MakeAudioTrigger(el, audioclip, numsamps, startingVol) {
        el.addEventListener("mouseenter", function () {
            PlayAudioClip(audioclip, numsamps, startingVol);
            if (textBlockSection > 8) PlayAudioClip(audioclip, numsamps, startingVol);
            if (textBlockSection > 13) PlayAudioClip(audioclip, numsamps, startingVol);
        });

        el.addEventListener("click", function () {
            PlayAudioClip(audioclip, numsamps, startingVol);
        });
    }

    function FadeAudio(audioID, targetVol, duration) {
        /* For some reason, I made a fade function myself */
        
        clearInterval(TriggerSegmentFader);
        clearTimeout(StopSegmentFader);        

        audioID = 'audio.' + audioID;                           // passes by ID so it can be put through via buttons etc
        let audioToFade = document.getElementById(audioID);

        const grain = 10;                                       // resolution of fade (saves processing when > 1)
        duration = duration * 1000;                             // to ms

        let startingVol = audioToFade.volume;
        let distanceToFade = targetVol - startingVol;
        let volsegment = distanceToFade / (duration / grain);   // splits fade into segments, for setInterval to proceed with per every [grain] ms.

        //if (startingVol == targetVol) return;

        console.log("FadeAudio triggered on " + audioID + ". Fading from " + startingVol + " to " + targetVol + " over " + duration / 1000 + " seconds.");

        // Start Fade Process //

        var fadeVol = 0; // relative volume from start of fade to end of fade
        var newTotalVol; // final volume adjusted for minimum

        var TriggerSegmentFader = setInterval(function () {
            segmentFader();
        }, grain);

        var StopSegmentFader = setTimeout(function () {
            clearInterval(TriggerSegmentFader);
        }, duration);


        function segmentFader() {
            fadeVol += volsegment;
            newTotalVol = Math.min(Math.max(0, fadeVol + startingVol), 1);
            audioToFade.volume = newTotalVol;
        }
    }

    function MuteAudioOutput() {
        isMuted = !isMuted;

        let newVol = isMuted ? 0 : 1;
        console.log('ismuted = ' + isMuted + ' || newVol = ' + newVol);

        for (var i = 0; i < voices.length; ++i) {
            FadeAudio(voices[i].id, newVol, 0.1);
        }

        let newAudioObjects = document.getElementsByClassName('new_audio_channel');
        for (var i = 0; i < newAudioObjects.length; ++i) {
            FadeAudio(newAudioObjects[i].id, newVol, 0.1);
        }
    }
    