// Voice Assistant & Speech Guidance for MIC Campus Explorer
// Uses Web Speech API (SpeechRecognition + SpeechSynthesis)

class VoiceService {
  constructor() {
    this.recognition = null;
    this.synth = window.speechSynthesis || null;
    this.isListening = false;
    this.speechRate = 1.0;
    this.currentRoute = null;
    this.spokenStepIndex = 0;
    this.isSpeakingGuidance = false;

    // UI elements
    this.voiceModal = document.getElementById('voice-modal');
    this.voiceTriggerBtn = document.getElementById('btn-voice-search');
    this.voiceCloseBtn = document.getElementById('btn-close-voice-modal');
    this.transcriptText = document.getElementById('voice-transcript-text');
    this.waveVisualizer = document.getElementById('voice-waveform');

    // Guidance controls
    this.startGuidanceBtn = document.getElementById('btn-start-voice-guidance');
    this.pauseGuidanceBtn = document.getElementById('btn-pause-voice');
    this.repeatGuidanceBtn = document.getElementById('btn-repeat-voice');
    this.rateSelector = document.getElementById('voice-rate-select');

    this.initRecognition();
    this.bindEvents();
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-IN'; // English (India)

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.transcriptText) this.transcriptText.textContent = 'Listening... Speak your campus destination...';
        if (this.waveVisualizer) this.waveVisualizer.style.display = 'flex';
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentText = finalTranscript || interimTranscript;
        if (this.transcriptText) this.transcriptText.textContent = `"${currentText}"`;

        if (finalTranscript) {
          this.handleVoiceCommand(finalTranscript);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech Recognition error:', event.error);
        if (this.transcriptText) this.transcriptText.textContent = `Voice recognition error: ${event.error}. Please try again or use text search.`;
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.waveVisualizer) this.waveVisualizer.style.display = 'none';
      };
    }
  }

  bindEvents() {
    if (this.voiceTriggerBtn) {
      this.voiceTriggerBtn.addEventListener('click', () => this.openVoiceSearch());
    }

    if (this.voiceCloseBtn) {
      this.voiceCloseBtn.addEventListener('click', () => this.closeVoiceSearch());
    }

    if (this.startGuidanceBtn) {
      this.startGuidanceBtn.addEventListener('click', () => this.toggleVoiceGuidance());
    }

    if (this.repeatGuidanceBtn) {
      this.repeatGuidanceBtn.addEventListener('click', () => this.repeatCurrentStep());
    }

    if (this.rateSelector) {
      this.rateSelector.addEventListener('change', (e) => {
        this.speechRate = parseFloat(e.target.value) || 1.0;
      });
    }
  }

  openVoiceSearch() {
    if (!this.recognition) {
      if (window.App) window.App.showToast('Voice search is not supported in this browser. Please use standard search.', 'warning');
      return;
    }
    if (this.voiceModal) this.voiceModal.classList.add('show');
    try {
      this.recognition.start();
    } catch (e) {
      console.log('Recognition already started');
    }
  }

  closeVoiceSearch() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
    if (this.voiceModal) this.voiceModal.classList.remove('show');
  }

  async handleVoiceCommand(rawText) {
    const text = rawText.toLowerCase().trim();
    this.speak(`Searching campus for ${text}`);

    // Parse natural language commands
    // e.g. "Where is the Central Library?", "Take me to CSE department", "Find Canteen"
    const cleanedText = text
      .replace(/^(where is|take me to|navigate to|go to|find|show me|locate|how to reach)/gi, '')
      .replace(/(\?|\.)/g, '')
      .trim();

    setTimeout(async () => {
      this.closeVoiceSearch();
      // Execute smart search
      if (window.App) {
        const searchInput = document.getElementById('smart-search-input');
        if (searchInput) searchInput.value = cleanedText;
        await window.App.executeSearch(cleanedText);
      }
    }, 1500);
  }

  // Speech Synthesis: Speak general text
  speak(text) {
    if (!this.synth || !text) {
      console.warn('[Voice] Speech synthesis unavailable.');
      return;
    }

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(String(text));
    utterance.rate = this.speechRate || 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = 'en-IN';

    utterance.onerror = (event) => {
      console.error('[Voice] Speech error:', event.error);
    };

    this.synth.speak(utterance);
}

  loadRoute(routeData) {
    this.currentRoute = routeData || null;
    this.spokenStepIndex = 0;
    this.isSpeakingGuidance = false;
    if (this.synth) this.synth.cancel();
    if (this.startGuidanceBtn) {
      this.startGuidanceBtn.innerHTML = '<span>🔊</span> Start Voice Guidance';
    }
  }

  toggleVoiceGuidance() {
    const instructions = this.currentRoute && this.currentRoute.spokenInstructions;
    if (!this.currentRoute || !Array.isArray(instructions) || instructions.length === 0) {
      if (window.App) window.App.showToast('Please calculate a campus route first.', 'warning');
      return;
    }

    if (!this.synth || typeof window.SpeechSynthesisUtterance === 'undefined') {
      if (window.App) window.App.showToast('Voice guidance is not supported in this browser.', 'warning');
      return;
    }

    if (this.isSpeakingGuidance) {
      // Pause current guidance and keep the current step for resuming.
      this.synth.cancel();
      this.isSpeakingGuidance = false;
      if (this.startGuidanceBtn) {
        this.startGuidanceBtn.innerHTML = '<span>🔊</span> Resume Voice Guidance';
      }
      return;
    }

    // Start or resume guidance. Restart automatically after the final step.
    if (this.spokenStepIndex >= instructions.length) this.spokenStepIndex = 0;
    this.isSpeakingGuidance = true;
    if (this.startGuidanceBtn) {
      this.startGuidanceBtn.innerHTML = '<span>⏸</span> Pause Voice Guidance';
    }
    this.speakGuidanceQueue();
  }

  speakGuidanceQueue() {
    if (!this.isSpeakingGuidance || !this.currentRoute) return;

    if (!this.synth) {
      console.error('[Voice] speechSynthesis is not available in this browser.');
      this.isSpeakingGuidance = false;
      if (window.App) {
        window.App.showToast(
          'Voice guidance is not supported in this browser.',
          'warning'
        );
      }
      return;
    }

    const instructions = this.currentRoute.spokenInstructions || [];

    if (!instructions.length) {
      console.warn('[Voice] No spoken instructions in current route.');
      this.isSpeakingGuidance = false;
      return;
    }

    if (this.spokenStepIndex >= instructions.length) {
      this.isSpeakingGuidance = false;

      if (this.startGuidanceBtn) {
        this.startGuidanceBtn.innerHTML =
          '<span>🔊</span> Restart Voice Guidance';
      }

      this.spokenStepIndex = 0;
      return;
    }

    const currentInstruction = instructions[this.spokenStepIndex];

    console.log(
      `[Voice] Speaking step ${this.spokenStepIndex + 1}/${instructions.length}:`,
      currentInstruction
    );

    // Highlight corresponding navigation step
    if (
      window.NavManager &&
      typeof window.NavManager.highlightStep === 'function'
    ) {
      window.NavManager.highlightStep(
        Math.max(0, this.spokenStepIndex - 1)
      );
    }

    // Stop any previous utterance
    this.synth.cancel();

    const speakNow = () => {
      const utterance =
        new SpeechSynthesisUtterance(currentInstruction);

      utterance.rate = this.speechRate || 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'en-IN';

      utterance.onstart = () => {
        console.log(
          `[Voice] Started step ${this.spokenStepIndex + 1}`
        );
      };

      utterance.onend = () => {
        console.log(
          `[Voice] Finished step ${this.spokenStepIndex + 1}`
        );

        this.spokenStepIndex++;

        setTimeout(() => {
          if (this.isSpeakingGuidance) {
            this.speakGuidanceQueue();
          }
        }, 1000);
      };

      utterance.onerror = (event) => {
        console.error(
          '[Voice] Speech synthesis error:',
          event.error
        );

        this.isSpeakingGuidance = false;

        if (this.startGuidanceBtn) {
          this.startGuidanceBtn.innerHTML =
            '<span>🔊</span> Start Voice Guidance';
        }
      };

      this.synth.speak(utterance);
    };

    // Chrome sometimes needs a small delay after cancel()
    setTimeout(speakNow, 100);
  }

  repeatCurrentStep() {
    if (!this.currentRoute || !this.currentRoute.spokenInstructions) return;
    const currentIdx = Math.max(0, this.spokenStepIndex);
    const instruction = this.currentRoute.spokenInstructions[currentIdx] || this.currentRoute.spokenInstructions[0];
    this.speak(instruction);
  }
}

window.VoiceService = VoiceService;


