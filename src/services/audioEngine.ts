/**
 * Web Audio API procedural sound engine for "Reasons I Love You"
 * Zero external audio files — 100% native synthesis.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private musicIntervalId: number | null = null;
  private melodyIndex: number = 0;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  // Romantic 15-note music box melody (Frequencies in Hz: E5, G#5, B5, E6, D#6, B5, C#6, A5, F#5, G#5, B5, E5, G#5, F#5, E5)
  private readonly melodyNotes: number[] = [
    659.25, 830.61, 987.77, 1318.51, 1244.51, 987.77, 1108.73, 880.00,
    739.99, 830.61, 987.77, 659.25, 830.61, 739.99, 659.25,
  ];

  // Note durations in beats / steps
  private readonly noteDelays: number[] = [
    500, 500, 650, 750, 500, 500, 750, 500,
    500, 500, 650, 750, 500, 500, 1000,
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Music sub-bus
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      // SFX sub-bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.65, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public unlock() {
    this.initContext();
  }

  public toggleMusic(): boolean {
    this.initContext();
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public startMusic() {
    this.initContext();
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.melodyIndex = 0;
    this.playNextMusicBoxNote();
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicIntervalId !== null) {
      window.clearTimeout(this.musicIntervalId);
      this.musicIntervalId = null;
    }
  }

  public getIsMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private playNextMusicBoxNote() {
    if (!this.isMusicPlaying) return;

    const freq = this.melodyNotes[this.melodyIndex];
    const delay = this.noteDelays[this.melodyIndex];
    this.playMusicBoxTine(freq);

    this.melodyIndex = (this.melodyIndex + 1) % this.melodyNotes.length;

    this.musicIntervalId = window.setTimeout(() => {
      this.playNextMusicBoxNote();
    }, delay);
  }

  /**
   * Synthesize a single metallic music-box comb chime
   */
  private playMusicBoxTine(frequency: number) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;

    const t = this.ctx.currentTime;

    // Primary fundamental: pure bell sine
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, t);

    // Harmonic metallic tine overtone (~3.8x harmonic for musical steel comb ping)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(frequency * 3.82, t);

    // Envelope for fundamental
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, t);
    noteGain.gain.linearRampToValueAtTime(0.3, t + 0.004); // Fast strike
    noteGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8); // Gentle resonant decay

    // Envelope for metallic overtone
    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.0001, t);
    overtoneGain.gain.linearRampToValueAtTime(0.08, t + 0.002);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35); // Fast metallic strike decay

    // Highpass filter to eliminate mud
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(300, t);

    osc1.connect(noteGain);
    osc2.connect(overtoneGain);
    noteGain.connect(filter);
    overtoneGain.connect(filter);
    filter.connect(this.musicGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 2.0);
    osc2.stop(t + 0.5);
  }

  /**
   * Realistic tactile paper friction swoosh for page turns
   */
  public playPageTurn() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.35);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate soft pink/white friction noise
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.15;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;

    // Bandpass sweeping filter simulating paper sliding across pages
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.frequency.exponentialRampToValueAtTime(600, t + 0.32);
    filter.Q.setValueAtTime(2.2, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noiseSource.start(t);
  }

  /**
   * Resonant low-frequency leather hardcover thud when book opens or shuts
   */
  public playLeatherBookThud(isClosing: boolean = true) {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const t = this.ctx.currentTime;

    // Resonant sub-frequency body resonance
    const osc = this.ctx.createOscillator();
    osc.type = isClosing ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isClosing ? 120 : 90, t);
    osc.frequency.exponentialRampToValueAtTime(isClosing ? 35 : 45, t + 0.28);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.001, t);
    oscGain.gain.linearRampToValueAtTime(isClosing ? 0.6 : 0.35, t + 0.015);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.4);

    // Subtle leather creak / tactile friction noise
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.2);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(isClosing ? 500 : 350, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, t);
    noiseGain.gain.linearRampToValueAtTime(0.25, t + 0.02);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    noise.start(t);
  }

  /**
   * Harmonious harp glissando crescendo upon completing page 12 / celebration
   */
  public playHarpCrescendo() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    // Major 9th Romantic Arpeggio: C4, G4, C5, E5, G5, B5, C6, E6, G6
    const harpNotes = [261.63, 392.00, 523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98];
    const baseTime = this.ctx.currentTime;

    harpNotes.forEach((freq, i) => {
      if (!this.ctx || !this.sfxGain) return;
      const t = baseTime + i * 0.08;

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc2.start(t);
      osc.stop(t + 2.5);
      osc2.stop(t + 1.2);
    });
  }

  /**
   * Shimmering magical chime when revealing secret notes
   */
  public playSecretReveal() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const baseTime = this.ctx.currentTime;
    const chimeFreqs = [1046.50, 1318.51, 1567.98, 2093.00];

    chimeFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const t = baseTime + idx * 0.06;

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 1.3);
    });
  }
}

export const soundManager = new AudioEngine();
