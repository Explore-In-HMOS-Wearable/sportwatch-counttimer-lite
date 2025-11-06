import router from '@ohos.router';
import Vibrator from '@system.vibrator';
let tick = null;

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const mm = minutes < 10 ? '0' + minutes : String(minutes);
    const ss = seconds < 10 ? '0' + seconds : String(seconds);
    return `${mm}:${ss}`;
}

export default {
    data: {
        initialDurationInMinutes: 30,

        percent: 100,
        timeAmount: "00:00",

        total: 1800,
        remaining: 1800,
        running: false,
        vib30Done: false
    },

    setTime(durationMinutes) {
        const duration = durationMinutes || this.initialDurationInMinutes;
        const totalSeconds = duration * 60;
        this.total = totalSeconds;
        this.remaining = totalSeconds;
        this.timeAmount = formatTime(totalSeconds);
        this.percent = 100;
    },

    onInit() {
        this.setTime();
    },


    start() {
        if (this.running) {
            return;
        }

        this.running = true;

        let timer = this.remaining;
        const total = this.total;

        tick = setInterval(() => {
            if (!this.vib30Done && timer <= 30 && timer > 0) {
                try {
                    Vibrator.vibrate({ mode: 'short' });
                    this.vib30Done = true;
                } catch (e) {
                }
            }

            this.timeAmount = formatTime(timer);
            this.remaining = timer;

            this.percent = Math.max(0, Math.ceil((timer / total) * 100));

            timer -= 1;

            if (timer < 0) {
                clearInterval(tick);
                tick = null;
                this.running = false;
                this.timeAmount = 'Finished!';
                this.percent = 0;
                this.remaining = 0;

                try {
                    Vibrator.vibrate({ mode: 'long' });
                } catch (e) {
                }
            }
        }, 1000);
    },

    pause() {
        if (tick) {
            clearInterval(tick);
            tick = null;
        }
        this.running = false;
    },

    reset() {
        this.pause();
        this.setTime();
        this.vib30Done = false;
    },

    touchMove(e) {
        if (e.direction == 'right') {
            router.replaceUrl({
                uri: 'pages/index/index'
            });
        }
    }
};