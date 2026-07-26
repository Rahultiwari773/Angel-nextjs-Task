// Web Audio API Synthesizer + Howler Audio Engine for Angel Entry Experience

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmOscillators: OscillatorNode[] = [];
  private bgmGain: GainNode | null = null;
  private isBgmPlaying = false;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Master Volume helper
  private getVolume(volume: number, enabled: boolean): number {
    return enabled ? Math.max(0, Math.min(1, volume)) : 0;
  }

  public isBgmActive(): boolean {
    return this.isBgmPlaying;
  }

  // Play Romantic Fantasy Heavenly Melody Loop
  public startBgm(volume: number, enabled: boolean) {
    if (!enabled || this.isBgmPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      this.isBgmPlaying = true;
      const masterVol = this.getVolume(volume, enabled) * 0.18; // Soft, ambient, relaxing level

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(masterVol, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);

      // Soft Warm Celestial Chord Pad (F#m9 / A maj7 / C#m7)
      const padFreqs = [185.0, 277.18, 369.99, 440.0, 554.37, 659.25];
      this.bgmOscillators = padFreqs.map((freq) => {
        if (!this.ctx) return null as unknown as OscillatorNode;
        const osc = this.ctx.createOscillator();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Lush slow vibrato shimmer
        lfo.frequency.setValueAtTime(0.15 + Math.random() * 0.1, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);

        lfo.connect(osc.frequency);
        osc.connect(this.bgmGain!);

        lfo.start();
        osc.start();
        return osc;
      }).filter(Boolean);

      // Gentle Celestial Harp / Wind Chime Soft Melody Loop
      const melodyNotes = [
        523.25, 659.25, 783.99, 1046.5, 987.77, 783.99, 659.25, 523.25,
        587.33, 698.46, 880.0, 1174.66, 1046.5, 880.0, 698.46, 587.33,
        659.25, 783.99, 1046.5, 1318.51, 1174.66, 1046.5, 783.99, 659.25
      ];
      let noteIdx = 0;

      const playNextMelodyNote = () => {
        if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;
        try {
          const now = this.ctx.currentTime;
          const noteOsc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();

          noteOsc.type = "triangle";
          noteOsc.frequency.setValueAtTime(melodyNotes[noteIdx], now);

          noteGain.gain.setValueAtTime(0, now);
          noteGain.gain.linearRampToValueAtTime(masterVol * 0.3, now + 0.05);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

          noteOsc.connect(noteGain);
          noteGain.connect(this.ctx.destination);

          noteOsc.start(now);
          noteOsc.stop(now + 0.9);

          noteIdx = (noteIdx + 1) % melodyNotes.length;
          if (this.isBgmPlaying) {
            setTimeout(playNextMelodyNote, 480);
          }
        } catch {
          // Ignored
        }
      };

      playNextMelodyNote();
    } catch {
      this.isBgmPlaying = false;
    }
  }

  public updateBgmVolume(volume: number, enabled: boolean) {
    const vol = this.getVolume(volume, enabled) * 0.2;
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.1);
    }
    if (!enabled && this.isBgmPlaying) {
      this.stopBgm();
    }
  }

  public stopBgm() {
    this.bgmOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignored
      }
    });
    this.bgmOscillators = [];
    this.isBgmPlaying = false;
  }

  // Golden Phoenix Rise Warm Flame Swoosh Sound
  public playPhoenixRise(volume = 0.8, enabled = true) {
    if (!enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 1.2);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(this.getVolume(volume, enabled) * 0.35, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.5);

    this.playMagicSparkle(volume * 0.8, enabled);
  }

  // Diamond Butterfly Swarm Flutter Sound
  public playButterflySwarm(volume = 0.8, enabled = true) {
    if (!enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [659.25, 783.99, 987.77, 1174.66, 1318.51, 1567.98, 1760.0];
    const now = this.ctx.currentTime;
    const vol = this.getVolume(volume, enabled) * 0.15;

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(vol, now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  }

  // Heavenly Bell Chime
  public playBell(volume = 0.8, enabled = true) {
    if (!enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1046.5, now); // C6 bell pitch
    osc.frequency.exponentialRampToValueAtTime(523.25, now + 1.5);

    gain.gain.setValueAtTime(this.getVolume(volume, enabled) * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.0);
  }

  // Magic Spell Sparkle Arpeggio
  public playMagicSparkle(volume = 0.8, enabled = true) {
    if (!enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    const now = this.ctx.currentTime;
    const vol = this.getVolume(volume, enabled) * 0.2;

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(vol, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.5);
    });
  }

  // Wing Flap Swoosh
  public playWingFlap(volume = 0.8, enabled = true) {
    if (!enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.linearRampToValueAtTime(800, now + 0.15);
    filter.frequency.linearRampToValueAtTime(150, now + 0.3);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.getVolume(volume, enabled) * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  // Firework Crackers Burst Sound
  public playCrackersPop(volume = 0.8, enabled = true) {
    if (!enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);

    gain.gain.setValueAtTime(this.getVolume(volume, enabled) * 0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);

    // Crackle noise burst tail
    setTimeout(() => this.playWingFlap(volume * 0.5, enabled), 100);
  }

  // Portal Hum / Energy Rise
  public playPortalSound(volume = 0.8, enabled = true) {
    if (!enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 1.5);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(this.getVolume(volume, enabled) * 0.5, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.0);
  }

  // Landing Soft Thud / Chime
  public playLandingSound(volume = 0.8, enabled = true) {
    if (!enabled) return;
    this.playBell(volume, enabled);
    this.playWingFlap(volume, enabled);
  }

  // Flying Rose Swoosh Sound
  public playRoseSwoosh(volume = 0.8, enabled = true) {
    if (!enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.4);

    gain.gain.setValueAtTime(this.getVolume(volume, enabled) * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // Angel Whisper / Ethereal Voice Reaction
  public playAngelWhisper(volume = 0.8, enabled = true) {
    if (!enabled) return;
    this.playMagicSparkle(volume, enabled);
    this.playBell(volume * 0.7, enabled);
  }

  // UI Button Click
  public playButtonClick(volume = 0.8, enabled = true) {
    if (!enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);

    gain.gain.setValueAtTime(this.getVolume(volume, enabled) * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }
}

export const soundEngine = new SoundEngine();
