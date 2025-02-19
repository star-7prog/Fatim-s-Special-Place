document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audioPlayer");
    const canvas = document.getElementById("visualizer");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = 200;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] / 2;
            ctx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }
    }

    audio.addEventListener("play", () => {
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }
        renderFrame();
    });
});


<script>
$(document).ready(function () {
    $(window).scroll(function () {
        $('.timeline-item').each(function () {
            let position = $(this).offset().top;
            let windowHeight = $(window).height();
            let scrollPos = $(window).scrollTop();
            
            if (scrollPos + windowHeight - 100 > position) {
                $(this).addClass('visible');
            }
        })
    })
})
</script>

