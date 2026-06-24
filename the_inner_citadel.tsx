import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  Compass, 
  PenTool, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX,
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  Flame, 
  Sparkles, 
  Cpu, 
  HelpCircle,
  TrendingUp,
  MessageSquare,
  RefreshCw,
  Award,
  ChevronRight,
  Info,
  Check,
  Download
} from 'lucide-react';

// --- DATASET: 25 High-Fidelity Chapters from Marcus Aurelius's Meditations ---
// Structured identically to the standard translation in the provided PDF (George Long).
const MEDITATIONS_DATABASE = [
  {
    id: "m-1",
    book: 2,
    chapter: 1,
    tags: ["People", "Difficult People", "Duty", "Perception"],
    text: "When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they cannot distinguish good from evil. But I have seen the beauty of good, and the ugliness of evil, and I have recognized that the wrongdoer has a nature related to my own—not of the same blood or birth, but the same mind, and possessing a share of the divine. And so none of them can hurt me.",
    summary: "A daily morning mental preparation to meet difficult people with compassion, understanding, and self-protection rather than anger."
  },
  {
    id: "m-2",
    book: 5,
    chapter: 1,
    tags: ["Self-Discipline", "Morning Routine", "Duty", "Action"],
    text: "At dawn, when you have trouble getting out of bed, tell yourself: 'I have to go to work—as a human being. What do I have to complain of, if I'm going to do what I was born for—the things I was brought into the world to do? Or is this what I was created for? To huddle under the blankets and stay warm?' But it's nicer here... 'So you were born to feel nice? Instead of doing things and experiencing them?' Don't you see the plants, the birds, the ants, the spiders, and the bees going about their individual tasks, putting the world in order, as best they can? And you're not willing to do your job as a human being?",
    summary: "A powerful address to oneself on overcoming laziness, embracing human duty, and finding alignment with the industriousness of nature."
  },
  {
    id: "m-3",
    book: 4,
    chapter: 3,
    tags: ["Inner Peace", "Mind", "Perception", "Anxiety"],
    text: "People look for retreats for themselves, in the country, by the coast, or in the hills; and you too are especially prone to desire such things. But this is altogether a mark of the most common sort of men, for it is in your power whenever you choose to retire into yourself. For nowhere can a man find a quieter or more untroubled retreat than in his own soul; especially when he has within him such thoughts that, by looking into them, he immediately enters into perfect tranquility.",
    summary: "True retreat and mental sanctuary are not found in geography, but in the 'Inner Citadel' of one's own disciplined mind."
  },
  {
    id: "m-4",
    book: 5,
    chapter: 20,
    tags: ["Obstacles", "Adversity", "Action", "Mind"],
    text: "In some ways, people are our obstacle... but our actions can be impeded, but there can be no impeding our intentions or our dispositions. Because we can accommodate and adapt. The mind adapts and converts to its own purposes the obstacle to our acting. The impediment to action advances action. What stands in the way becomes the way.",
    summary: "The foundational Stoic formula of turning challenges into opportunities. Obstacles are fuel for character growth."
  },
  {
    id: "m-5",
    book: 4,
    chapter: 7,
    tags: ["Perception", "Pain", "Grief", "Mind"],
    text: "Take away your opinion, and there is taken away the complaint, 'I have been harmed.' Take away the complaint, 'I have been harmed,' and the harm itself is gone.",
    summary: "Pain and insult are matters of subjective judgment. Removing the opinion of harm neutralizes the injury."
  },
  {
    id: "m-6",
    book: 4,
    chapter: 49,
    tags: ["Grief", "Adversity", "Fate", "Strength"],
    text: "Be like the rocky promontory against which the restless surf continually breaks; it stands fast while the churning water is lulled to sleep about it. 'Unhappy am I, because this has happened to me.' Not so, but: 'Happy am I, though this has happened to me, because I continue free from pain, neither crushed by the present nor fearing the future.' For could anything of this kind prevent you from being just, magnanimous, temperate, prudent, and free?",
    summary: "Meeting adversity not as an tragedy, but as an opportunity to practice virtue and remain unmoved like a coastal cliff."
  },
  {
    id: "m-7",
    book: 8,
    chapter: 36,
    tags: ["Anxiety", "Present Moment", "Fear", "Mind"],
    text: "Do not trouble yourself with the total picture of your life. Do not try to picture everything bad that could possibly happen. Focus instead on the present situation and ask yourself: 'Why is this so unbearable? Why can't I endure it?' You will be embarrassed to answer. Remember that neither the future nor the past can oppress you, only the present. And the power of the present is minimized if you isolate it.",
    summary: "Overcoming catastrophic thinking by breaking life down into the micro-present and realizing the immediate second is always survivable."
  },
  {
    id: "m-8",
    book: 2,
    chapter: 11,
    tags: ["Mortality", "Death", "Fear", "Meaning"],
    text: "Since it is possible that you might depart from life this very moment, regulate every act and thought accordingly. But to go away from among men, if there are gods, is not a thing to be afraid of, for the gods will not involve you in evil. But if indeed they do not exist, or if they have no concern for human affairs, what is it to me to live in a universe devoid of gods or devoid of Providence?",
    summary: "Memento Mori. Live each moment with high integrity and purpose, treating death as a natural transition."
  },
  {
    id: "m-9",
    book: 8,
    chapter: 59,
    tags: ["People", "Leadership", "Compassion", "Duty"],
    text: "People exist for one another. You must either instruct them, or endure them.",
    summary: "The ultimate social duty: we are made for cooperation. If others err, we must either patiently teach them or patiently tolerate them."
  },
  {
    id: "m-10",
    book: 6,
    chapter: 6,
    tags: ["Revenge", "Difficult People", "Anger", "Mind"],
    text: "The best way of avenging yourself is not to become like the wrongdoer.",
    summary: "Refusing to imitate bad behavior is the highest form of self-respect and victory over hostile forces."
  },
  {
    id: "m-11",
    book: 4,
    chapter: 23,
    tags: ["Fate", "Nature", "Inner Peace", "Meaning"],
    text: "Everything harmonizes with me, which is harmonious to thee, O Universe. Nothing for me is too early nor too late, which is in due time for thee. Everything is fruit to me which thy seasons bring, O Nature: from thee are all things, in thee are all things, to thee all things return.",
    summary: "Amor Fati. Deep acceptance and celebration of cosmic fate, nature, and the timing of universe-level events."
  },
  {
    id: "m-12",
    book: 12,
    chapter: 26,
    tags: ["Anger", "Difficult People", "Perception", "Mind"],
    text: "When you are offended at any man's fault, turn to yourself immediately and reflect on when you yourself committed a similar fault: such as thinking that money is a good thing, or pleasure, or a bit of reputation. By doing this, you will quickly forget your anger, especially if you also realize that the person is acting under compulsion—for what else could they do? If you can, remove that compulsion.",
    summary: "Curing anger toward wrongdoers by remembering our own flaws, and recognizing that ignorance forces bad choices."
  },
  {
    id: "m-13",
    book: 9,
    chapter: 1,
    tags: ["Justice", "Duty", "People", "Meaning"],
    text: "He who commits injustice acts impiously. For since universal nature has made rational animals for the sake of one another, to help each other according to their deserts but in no way to injure, he who transgresses her will is clearly guilty of impiety against the most ancient of deities.",
    summary: "Injustice is not just a human error, but a violation of cosmic order and the natural law of cooperation."
  },
  {
    id: "m-14",
    book: 3,
    chapter: 4,
    tags: ["Mind", "Duty", "Opinion", "Inner Peace"],
    text: "Do not waste the remaining part of your life in thoughts about other people, unless you refer your thoughts to some object of common utility. For you deprive yourself of the opportunity of doing something else, when you think of what so-and-so is doing, and why, and what they are saying, and what they are thinking...",
    summary: "Conserving mental energy by ignoring useless gossip, social comparison, and staying focused on moral deeds."
  },
  {
    id: "m-15",
    book: 6,
    chapter: 54,
    tags: ["People", "Duty", "Society", "Leadership"],
    text: "What is not good for the beehive cannot be good for the bee.",
    summary: "The interdependence of community and the individual. We thrive only when the whole collective is cared for."
  },
  {
    id: "m-16",
    book: 7,
    chapter: 9,
    tags: ["Fate", "Nature", "Meaning", "Inner Peace"],
    text: "All things are implicated with one another, and the bond is a holy one; and there is hardly anything which is unconnected with another thing. For things have been coordinated, and they combine to form the same cosmos. For there is both one universe made up of all things, and one god who pervades all things, and one substance, and one law.",
    summary: "The Stoic concept of Sympatheia: cosmic unity, the interconnectedness of all life and actions."
  },
  {
    id: "m-17",
    book: 11,
    chapter: 18,
    tags: ["Leadership", "Difficult People", "Anger", "Compassion"],
    text: "If they do wrong, it is plain they do so unwillingly and through ignorance. For as no soul is willingly deprived of truth, so is it not willingly deprived of the power of behaving to each man according to his deserts... Remember also that you yourself commit many faults, and are just such a one as they are.",
    summary: "The foundational rule of empathy: no one errs on purpose, and we are equally prone to mistakes."
  },
  {
    id: "m-18",
    book: 3,
    chapter: 11,
    tags: ["Mind", "Perception", "Self-Discipline", "Meaning"],
    text: "Make for yourself a definition or description of every object that presents itself, so as to see what kind of thing it is in its bare substance, stripped of all additions, and view it as a whole and in its separate parts... Nothing is so productive of elevation of mind as to be able to examine methodically and truly every object which occurs in life.",
    summary: "Stripping situations down to their bare, objective physical realities to remove emotional hyperbole."
  },
  {
    id: "m-19",
    book: 7,
    chapter: 18,
    tags: ["Change", "Nature", "Fate", "Anxiety"],
    text: "Is any man afraid of change? Why, what can take place without change? What then is more pleasing or more suitable to the universal nature? Can you take a hot bath unless the wood undergoes change? Can you be nourished unless the food undergoes change? Can anything else that is useful be accomplished without change?",
    summary: "Embracing transformation and impermanence as fundamental, positive laws of nature."
  },
  {
    id: "m-20",
    book: 8,
    chapter: 48,
    tags: ["Mind", "Strength", "Inner Peace", "Adversity"],
    text: "Remember that the ruling center becomes invincible when it withdraws into itself and rests content with itself, doing nothing which it does not will to do, even if its position is unreasonable... Therefore the mind which is free from passions is a citadel, for man has nothing more secure to which he can fly for refuge and for the future be inexpugnable.",
    summary: "The concept of the 'Invincible Mind'—when free from passions, it forms a citadel no external event can conquer."
  },
  {
    id: "m-21",
    book: 10,
    chapter: 3,
    tags: ["Pain", "Strength", "Perception", "Adversity"],
    text: "Everything which happens either happens in such a way as you are formed by nature to bear it, or as you are not formed by nature to bear it. If then it happens to you in such a way as you are formed by nature to bear, do not complain, but bear it as you are formed. But if it happens in such a way as you are not formed to bear, do not complain, for it will perish after it has consumed you. Remember, however, that you are formed by nature to bear everything which it is in your power to make bearable by your opinion.",
    summary: "Everything is physically bearable; the mind has the inherent strength to frame any burden as tolerable."
  },
  {
    id: "m-22",
    book: 12,
    chapter: 1,
    tags: ["Time", "Anxiety", "Action", "Fate"],
    text: "All those things at which you wish to arrive by a circuitous road can be yours now, if you do not refuse them to yourself. This means, if you leave all the past behind, entrust the future to providence, and direct the present only conformably to piety and justice.",
    summary: "Instant access to a good life is found simply by letting go of the past, trusting the future, and acting honorably in the present."
  }
];

// --- EXPORTABLE SYSTEM PROMPT FOR GEMINI AI ---
const EM_SYSTEM_PROMPT = `You are Marcus Aurelius, Roman Emperor and author of the 'Meditations'.
The user is coming to you seeking Stoic philosophical guidance or searching for relevant chapters from your diaries.
Your response MUST be formatted strictly as a single JSON object. Do not include any markdown styling except inside the JSON values. 

The JSON MUST contain:
{
  "reflection": "A 3-4 sentence message written in the first person (as Marcus), addressing the user's topic or crisis with deep compassion, Stoic gravity, and clarity.",
  "guidance": [
    "Practical advice point 1: how to shift perception.",
    "Practical advice point 2: action steps/duties to execute.",
    "Practical advice point 3: acceptance of things beyond control."
  ],
  "suggestedBookChapter": "Identify a classic concept (e.g., Book 4, Chapter 3 or Book 5, Chapter 1) that fits best.",
  "philosophyCore": "A brief summary of the core Stoic principle applied here (e.g., Dichotomy of Control, Amor Fati, Sympatheia, or Memento Mori)."
}

Respond in the language of the prompt. Keep the tone ancient, philosophical, and powerful, but directly relatable to modern problems.`;

export default function App() {
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'ask' | 'journal' | 'map'
  const [theme, setTheme] = useState('parchment'); // 'parchment' (light) | 'obsidian' (dark)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  
  // Ask Marcus (AI State)
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  const audioRef = useRef(null);

  // Journaling state
  const [journalText, setJournalText] = useState('');
  const [journalTargetPassage, setJournalTargetPassage] = useState(null);

  // Initialize and load saved state from localStorage (safely)
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem('citadel_favorites');
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
      
      const storedJournal = localStorage.getItem('citadel_journal');
      if (storedJournal) setJournalEntries(JSON.parse(storedJournal));

      const storedTheme = localStorage.getItem('citadel_theme');
      if (storedTheme) setTheme(storedTheme);
    } catch (e) {
      console.warn("Storage reading failed, using in-memory state", e);
    }
  }, []);

  // Update theme body classes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'obsidian') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('citadel_theme', theme);
  }, [theme]);

  // Handle Favorites toggle
  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('citadel_favorites', JSON.stringify(updated));
  };

  // Extract all unique tags
  const allTags = ['All', ...new Set(MEDITATIONS_DATABASE.flatMap(item => item.tags))];

  // Filtering Passages
  const filteredPassages = MEDITATIONS_DATABASE.filter(p => {
    const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag);
    const matchesSearch = 
      p.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `book ${p.book}`.includes(searchQuery.toLowerCase()) ||
      `chapter ${p.chapter}`.includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Call Gemini AI for custom search/counseling
  const askMarcusAurelius = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setAiError(null);
    setAiResponse(null);
    setAudioBlobUrl(null);
    setTtsPlaying(false);

    const apiKey = ""; // Handled dynamically in preview environment
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    let delay = 1000;
    const maxRetries = 5;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Counsel me on this modern dilemma using your Stoic wisdom: ${aiPrompt}` }] }],
            systemInstruction: { parts: [{ text: EM_SYSTEM_PROMPT }] },
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  reflection: { type: "STRING" },
                  guidance: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                  },
                  suggestedBookChapter: { type: "STRING" },
                  philosophyCore: { type: "STRING" }
                },
                required: ["reflection", "guidance", "suggestedBookChapter", "philosophyCore"]
              }
            }
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!jsonText) throw new Error("Empty response received from the philosophical matrix.");
        
        const parsedData = JSON.parse(jsonText);
        setAiResponse(parsedData);
        setIsAiLoading(false);
        return; // Success, exit loop
      } catch (err) {
        console.error(`Attempt ${attempt} failed:`, err);
        if (attempt === maxRetries) {
          setAiError("Marcus's spirit is deep in meditation. Please check your connection or try again shortly.");
          setIsAiLoading(false);
        } else {
          await new Promise(res => setTimeout(res, delay));
          delay *= 2; // Exponential backoff
        }
      }
    }
  };

  // Text to Speech logic via gemini-2.5-flash-preview-tts
  const handleListen = async () => {
    if (!aiResponse) return;
    if (audioBlobUrl) {
      // Toggle play/pause if already loaded
      if (ttsPlaying) {
        audioRef.current.pause();
        setTtsPlaying(false);
      } else {
        audioRef.current.play();
        setTtsPlaying(true);
      }
      return;
    }

    setTtsPlaying(true);
    const apiKey = "";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

    const textToSpeak = `Say in a wise, ancient, slow, gravelly, comforting masculine voice: ${aiResponse.reflection}. Remember: ${aiResponse.guidance.join(". ")}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: textToSpeak }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Fenrir" // Rich, dramatic masculine tone ideal for an Emperor
                }
              }
            }
          }
        })
      });

      if (!response.ok) throw new Error("Audio synthesis failed.");
      const result = await response.json();
      
      const audioData = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      const mimeType = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType || "audio/L16;rate=24000";
      
      if (!audioData) throw new Error("No audio data returned.");

      // Parse sample rate from mimeType or default
      const sampleRateMatch = mimeType.match(/rate=(\d+)/);
      const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 24000;

      // Decode Base64 string to ArrayBuffer containing raw PCM16
      const binaryString = window.atob(audioData);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const pcm16Buffer = bytes.buffer;

      // Convert PCM16 to WAV
      const wavBlob = pcm16ToWav(pcm16Buffer, sampleRate);
      const blobUrl = URL.createObjectURL(wavBlob);
      
      setAudioBlobUrl(blobUrl);

      // Play audio
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = blobUrl;
          audioRef.current.play();
          audioRef.current.onended = () => setTtsPlaying(false);
        }
      }, 100);

    } catch (err) {
      console.error("TTS Error:", err);
      setTtsPlaying(false);
    }
  };

  // Convert PCM16 to WAV format helper
  const pcm16ToWav = (pcmBuffer, sampleRate) => {
    const buffer = new ArrayBuffer(44 + pcmBuffer.byteLength);
    const view = new DataView(buffer);

    /* RIFF identifier */
    writeString(view, 0, 'RIFF');
    /* file length */
    view.setUint32(4, 36 + pcmBuffer.byteLength, true);
    /* RIFF type */
    writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true); // PCM = 1
    /* channel count */
    view.setUint16(22, 1, true); // Mono
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate = sampleRate * bitsPerSample * channels / 8 */
    view.setUint32(28, sampleRate * 2, true);
    /* block align = bitsPerSample * channels / 8 */
    view.setUint16(32, 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, pcmBuffer.byteLength, true);

    // Copy PCM bytes
    const pcmView = new Uint8Array(pcmBuffer);
    const wavView = new Uint8Array(buffer, 44);
    wavView.set(pcmView);

    return new Blob([buffer], { type: 'audio/wav' });
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // Add a Journal Entry
  const saveJournalEntry = () => {
    if (!journalText.trim()) return;
    const newEntry = {
      id: `j-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      }),
      text: journalText,
      passageRef: journalTargetPassage 
        ? `Book ${journalTargetPassage.book}, Chapter ${journalTargetPassage.chapter}` 
        : "General Reflection"
    };

    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem('citadel_journal', JSON.stringify(updated));
    setJournalText('');
    setJournalTargetPassage(null);
  };

  // Delete a Journal Entry
  const deleteJournalEntry = (id) => {
    const updated = journalEntries.filter(e => e.id !== id);
    setJournalEntries(updated);
    localStorage.setItem('citadel_journal', JSON.stringify(updated));
  };

  // Copy quote to clipboard helper
  const copyToClipboard = (text, book, chapter) => {
    const formatted = `"${text}" \n— Marcus Aurelius, Meditations (Book ${book}, Chapter ${chapter})`;
    document.execCommand('copy') || navigator.clipboard.writeText(formatted);
    alert("Passage copied beautifully to your clipboard!");
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      theme === 'parchment' 
        ? 'bg-[#F9F6F0] text-[#2C2A29]' 
        : 'bg-[#121214] text-[#E4E4E7]'
    }`}>
      {/* BACKGROUND GRAPHIC: Elegant Columns & Stoic Crest Silhouette */}
      <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden pointer-events-none opacity-5 dark:opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 1440 500" fill="currentColor">
          <path d="M 0 0 L 1440 0 L 1440 350 C 1200 450, 800 300, 400 450 C 200 480, 50 430, 0 350 Z" />
          {/* Columns */}
          <rect x="150" y="50" width="30" height="300" rx="4" />
          <rect x="220" y="50" width="30" height="300" rx="4" />
          <rect x="1190" y="50" width="30" height="300" rx="4" />
          <rect x="1260" y="50" width="30" height="300" rx="4" />
        </svg>
      </div>

      {/* AUDIO ELEMENT */}
      <audio ref={audioRef} className="hidden" />

      {/* STICKY HEADER */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
        theme === 'parchment' 
          ? 'bg-[#F9F6F0]/90 border-[#E8DFD0]' 
          : 'bg-[#121214]/90 border-[#2D2D30]'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-600/10 text-amber-600 dark:text-amber-400 border border-amber-600/20">
              <BookOpen className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-serif tracking-tight font-semibold flex items-center gap-2">
                THE INNER CITADEL
                <span className="text-xs uppercase px-2 py-0.5 rounded bg-amber-600/10 text-amber-700 dark:text-amber-400 border border-amber-600/20 font-sans tracking-widest font-bold">
                  Meditations Search
                </span>
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Inspired by Maximus Veritas' translation of Marcus Aurelius
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
                activeTab === 'browse'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'hover:bg-stone-200/50 dark:hover:bg-stone-800'
              }`}
            >
              <Search className="w-4 h-4" />
              Search & Browse
            </button>
            <button
              onClick={() => setActiveTab('ask')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
                activeTab === 'ask'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'hover:bg-stone-200/50 dark:hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              Ask Marcus
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
                activeTab === 'journal'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'hover:bg-stone-200/50 dark:hover:bg-stone-800'
              }`}
            >
              <PenTool className="w-4 h-4" />
              Stoic Journal
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
                activeTab === 'map'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'hover:bg-stone-200/50 dark:hover:bg-stone-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              Philosophy Core
            </button>

            {/* Divider */}
            <div className="h-6 w-[1px] bg-stone-300 dark:bg-stone-700 mx-1 hidden sm:block" />

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === 'parchment' ? 'obsidian' : 'parchment')}
              title={theme === 'parchment' ? 'Activate Obsidian Dark Mode' : 'Activate Parchment Light Mode'}
              className="p-2.5 rounded-lg border hover:scale-105 active:scale-95 transition-all duration-150 border-stone-300 dark:border-stone-700 bg-stone-100/50 dark:bg-stone-900/50 text-stone-700 dark:text-stone-300"
            >
              {theme === 'parchment' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 py-8 relative">

        {/* TOP BANNER QUOTE CARD */}
        <section className={`mb-10 p-6 md:p-8 rounded-2xl border transition-all duration-200 shadow-sm relative overflow-hidden ${
          theme === 'parchment' 
            ? 'bg-amber-50/60 border-amber-200/80' 
            : 'bg-stone-900/40 border-amber-900/30'
        }`}>
          {/* Subtle Laurel wreath SVG inside */}
          <div className="absolute right-4 bottom-2 w-28 h-28 opacity-10 pointer-events-none text-amber-700 dark:text-amber-500">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 85 C30 85, 15 65, 15 45 C15 35, 20 25, 30 20 C27 28, 27 40, 35 48 C40 43, 42 35, 42 28 C42 15, 30 10, 30 10 C30 10, 52 12, 58 30 C60 22, 58 15, 58 10 C58 10, 75 18, 70 38 C75 30, 78 20, 78 10 C78 10, 85 25, 82 45 C82 65, 68 85, 50 85 Z" />
            </svg>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0 text-amber-600 dark:text-amber-400">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-sans font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase">
                Daily Imperial Reminder
              </span>
              <p className="mt-2 text-base md:text-lg font-serif italic leading-relaxed text-stone-800 dark:text-stone-100">
                "The happiness of your life depends upon the quality of your thoughts: therefore, guard accordingly, and take care that you entertain no notions unsuitable to virtue and reasonable nature."
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-serif text-stone-500 dark:text-stone-400">
                  — Book 3, Chapter 9
                </span>
                <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-300 rounded font-medium">
                  Perception & Mind
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* TAB 1: BROWSE & SEARCH */}
        {activeTab === 'browse' && (
          <section className="space-y-6">
            
            {/* SEARCH PANEL */}
            <div className={`p-5 rounded-2xl border transition-all ${
              theme === 'parchment' ? 'bg-white border-stone-200' : 'bg-stone-900/60 border-stone-800'
            }`}>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                
                {/* Text input */}
                <div className="relative w-full md:flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by keywords (e.g., 'surly', 'retreat', 'providence', 'death') or reference..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                      theme === 'parchment'
                        ? 'border-stone-300 bg-stone-50 text-stone-900 focus:bg-white'
                        : 'border-stone-700 bg-stone-950 text-stone-100 focus:bg-stone-900'
                    }`}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Tag filtering selector */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-thin">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex-shrink-0 hidden lg:inline">
                    Themes:
                  </span>
                  <div className="flex gap-1.5">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium whitespace-nowrap transition-all ${
                          selectedTag === tag
                            ? 'bg-amber-600 text-white'
                            : theme === 'parchment'
                              ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                              : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* RESULTS STATS & RESET */}
            <div className="flex items-center justify-between text-xs text-stone-500">
              <p>Found <span className="font-bold text-amber-600 dark:text-amber-400">{filteredPassages.length}</span> passages</p>
              {(searchQuery || selectedTag !== 'All') && (
                <button
                  onClick={() => { setSearchQuery(''); setSelectedTag('All'); }}
                  className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* PASSAGES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPassages.map((passage) => {
                const isFavorite = favorites.includes(passage.id);
                return (
                  <article 
                    key={passage.id}
                    className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group hover:shadow-md ${
                      theme === 'parchment'
                        ? 'bg-white border-stone-200/80 hover:border-amber-200'
                        : 'bg-stone-900/30 border-stone-800 hover:border-amber-900/40'
                    }`}
                  >
                    <div>
                      {/* Card Header: Book/Chapter + Actions */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-serif font-bold text-sm tracking-wide text-amber-700 dark:text-amber-400">
                          Book {passage.book}, Chapter {passage.chapter}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {/* Favorite Button */}
                          <button
                            onClick={() => toggleFavorite(passage.id)}
                            title={isFavorite ? "Remove from Citadel collection" : "Add to Citadel collection"}
                            className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                          >
                            {isFavorite ? (
                              <BookmarkCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-current" />
                            ) : (
                              <Bookmark className="w-4 h-4 text-stone-400 hover:text-stone-600" />
                            )}
                          </button>

                          {/* Share/Copy */}
                          <button
                            onClick={() => copyToClipboard(passage.text, passage.book, passage.chapter)}
                            title="Copy Quote"
                            className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                          >
                            <Share2 className="w-4 h-4 text-stone-400 hover:text-stone-600" />
                          </button>
                        </div>
                      </div>

                      {/* Main Quote Text */}
                      <blockquote className="text-sm font-serif italic leading-relaxed mb-4 text-stone-800 dark:text-stone-100 relative">
                        <span className="absolute -top-3 -left-2 text-2xl font-serif text-amber-600/20">“</span>
                        {passage.text}
                      </blockquote>

                      {/* Imperial Summary */}
                      <div className="p-3 rounded-lg text-xs leading-relaxed mb-4 bg-stone-50 dark:bg-stone-900/60 text-stone-600 dark:text-stone-300">
                        <span className="font-bold text-stone-700 dark:text-stone-200 block mb-0.5">Core Meaning:</span>
                        {passage.summary}
                      </div>
                    </div>

                    {/* Tags Footer & Journal Button */}
                    <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap gap-1 items-center justify-between gap-y-2">
                      <div className="flex flex-wrap gap-1">
                        {passage.tags.map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] uppercase font-sans font-semibold tracking-wide bg-amber-500/10 text-amber-700 dark:text-amber-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setJournalTargetPassage(passage);
                          setActiveTab('journal');
                          // Scroll to journal area if necessary
                        }}
                        className="text-xs font-sans text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform"
                      >
                        Reflect in Journal <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* EMPTY STATE */}
            {filteredPassages.length === 0 && (
              <div className="text-center py-16">
                <Info className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold">No Meditations Found</h3>
                <p className="text-stone-500 text-sm max-w-sm mx-auto mt-1">
                  The Emperor has not recorded a entry fitting your query. Try searching simple words like "death", "mind", "action", or "nature".
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedTag('All'); }}
                  className="mt-4 px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 font-medium"
                >
                  Show All Chapters
                </button>
              </div>
            )}

          </section>
        )}

        {/* TAB 2: ASK MARCUS AI */}
        {activeTab === 'ask' && (
          <section className="space-y-6">
            
            {/* HERO INPUT */}
            <div className={`p-6 md:p-8 rounded-2xl border transition-all ${
              theme === 'parchment' 
                ? 'bg-white border-stone-200' 
                : 'bg-stone-900/60 border-stone-800'
            }`}>
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <div className="inline-flex p-3 rounded-full bg-amber-600/10 text-amber-600 dark:text-amber-400 mb-2">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                <h2 className="text-2xl font-serif font-semibold tracking-tight">
                  Consult the Emperor
                </h2>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  State a modern dilemma, conflict, or query in your own words. The Gemini AI will search the philosophical core of your Meditations and respond with direct counselor insights.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="e.g., How can I keep calm when my colleagues take credit for my work?"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && askMarcusAurelius()}
                    className={`flex-1 px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                      theme === 'parchment'
                        ? 'border-stone-300 bg-stone-50 text-stone-900 focus:bg-white'
                        : 'border-stone-700 bg-stone-950 text-stone-100 focus:bg-stone-900'
                    }`}
                  />
                  <button
                    onClick={askMarcusAurelius}
                    disabled={isAiLoading || !aiPrompt.trim()}
                    className="px-6 py-3 bg-amber-600 text-white rounded-xl text-sm font-medium hover:bg-amber-700 transition-all shadow flex items-center justify-center gap-2 disabled:opacity-55 disabled:cursor-not-allowed"
                  >
                    {isAiLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Meditating...
                      </>
                    ) : (
                      <>
                        <Cpu className="w-4 h-4" />
                        Ask Marcus
                      </>
                    )}
                  </button>
                </div>

                {/* Example Quick Prompts */}
                <div className="pt-2 flex flex-wrap justify-center gap-1.5">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold self-center mr-1">
                    Try topics:
                  </span>
                  {[
                    "Procrastination & morning motivation",
                    "Grief & losing someone close",
                    "Dealing with pride & fame",
                    "Anxiety over future disaster"
                  ].map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => setAiPrompt(topic)}
                      className="text-xs px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-amber-600 hover:text-white transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI LOADING SKELETON */}
            {isAiLoading && (
              <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
                <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/4"></div>
                <div className="h-32 bg-stone-200 dark:bg-stone-800 rounded-xl"></div>
                <div className="h-20 bg-stone-200 dark:bg-stone-800 rounded-xl"></div>
              </div>
            )}

            {/* ERROR DISPLAY */}
            {aiError && (
              <div className="max-w-2xl mx-auto p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-center text-sm">
                {aiError}
              </div>
            )}

            {/* AI RESPONSE SCROLL */}
            {aiResponse && !isAiLoading && (
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Scroll Wrapper */}
                <div className={`p-8 rounded-2xl border transition-all relative ${
                  theme === 'parchment'
                    ? 'bg-[#FCFAF2] border-amber-200/80 shadow-md'
                    : 'bg-[#18181C] border-amber-950/40 shadow-xl'
                }`}>
                  
                  {/* Absolute Corner Ornamentations */}
                  <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-600/30"></div>
                  <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-600/30"></div>
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-600/30"></div>
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-600/30"></div>

                  {/* Header / Meta */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-sans uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
                        Response from the Philosopher-Emperor
                      </span>
                    </div>

                    {/* Audio Player Icon */}
                    <button
                      onClick={handleListen}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-amber-600/30 text-amber-700 dark:text-amber-400 hover:bg-amber-600/10 transition-all flex items-center gap-1.5"
                    >
                      {ttsPlaying ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 animate-bounce" />
                          Stop Listening
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          Listen to Marcus
                        </>
                      )}
                    </button>
                  </div>

                  {/* Reflection Text (The voice of Marcus) */}
                  <div className="space-y-4">
                    <p className="text-lg font-serif italic leading-relaxed text-stone-800 dark:text-stone-50">
                      "{aiResponse.reflection}"
                    </p>
                    <p className="text-right font-serif text-sm text-stone-500 dark:text-stone-400">
                      — Marcus Aurelius
                    </p>
                  </div>

                  {/* Custom Actionable Guidance points */}
                  <div className="mt-8 space-y-4">
                    <h4 className="text-xs uppercase font-sans font-bold tracking-widest text-amber-700 dark:text-amber-400">
                      Three Steps for the Mind
                    </h4>
                    <ul className="space-y-3 font-sans text-sm">
                      {aiResponse.guidance.map((point, index) => (
                        <li key={index} className="flex gap-3 items-start">
                          <span className="w-6 h-6 flex-shrink-0 rounded-full bg-amber-600/10 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                            {index + 1}
                          </span>
                          <span className="text-stone-700 dark:text-stone-300 leading-relaxed pt-0.5">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footnote showing philosophyCore & recommended section */}
                  <div className="mt-8 pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap gap-4 justify-between items-center text-xs">
                    <div>
                      <span className="text-stone-400 block uppercase tracking-wider font-bold text-[9px] mb-0.5">
                        Applied Principle:
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold">
                        {aiResponse.philosophyCore}
                      </span>
                    </div>

                    <div>
                      <span className="text-stone-400 block uppercase tracking-wider font-bold text-[9px] mb-0.5 text-right">
                        Suggested Reading:
                      </span>
                      <span className="font-serif font-semibold text-stone-700 dark:text-stone-300">
                        {aiResponse.suggestedBookChapter}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Optional Note */}
                <p className="text-center text-stone-400 text-xs italic">
                  Note: The generated insight parses Marcus Aurelius's historical texts dynamically using the Gemini philosophy engine to map modern issues to classical remedies.
                </p>
              </div>
            )}

          </section>
        )}

        {/* TAB 3: STOIC JOURNAL */}
        {activeTab === 'journal' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* WRITING SECTION */}
            <div className="lg:col-span-2 space-y-6">
              <div className={`p-6 rounded-2xl border transition-all ${
                theme === 'parchment' ? 'bg-white border-stone-200' : 'bg-stone-900/60 border-stone-800'
              }`}>
                <h2 className="text-xl font-serif font-semibold mb-2 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-amber-600" />
                  Philosophical Reflection Space
                </h2>
                <p className="text-xs text-stone-500 mb-6">
                  Write down your daily triumphs, struggles, or rewrite a chapter of the Meditations in your own words.
                </p>

                {/* Target Passage Selector helper */}
                {journalTargetPassage ? (
                  <div className="mb-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-sans font-bold uppercase text-amber-700 dark:text-amber-400">
                        Selected Passage for Reflection
                      </span>
                      <p className="font-serif text-xs italic text-stone-600 dark:text-stone-300 mt-1 line-clamp-2">
                        "{journalTargetPassage.text}"
                      </p>
                      <span className="text-[10px] text-stone-500 block mt-1">
                        Book {journalTargetPassage.book}, Chapter {journalTargetPassage.chapter}
                      </span>
                    </div>
                    <button
                      onClick={() => setJournalTargetPassage(null)}
                      className="text-xs text-rose-500 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <div className="mb-4 p-3 rounded-lg bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center">
                    <p className="text-xs text-stone-400">
                      Reflecting generally. To tie your entry to a specific quote, browse the search tab and click <span className="text-amber-600 dark:text-amber-400">"Reflect in Journal"</span>.
                    </p>
                  </div>
                )}

                {/* Text area */}
                <textarea
                  rows="6"
                  placeholder="Today I encountered someone who was rude. I did not get angry because..."
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  className={`w-full p-4 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all ${
                    theme === 'parchment'
                      ? 'border-stone-300 bg-stone-50 text-stone-900'
                      : 'border-stone-700 bg-stone-950 text-stone-100 focus:bg-stone-900'
                  }`}
                />

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-stone-400">
                    Saved in-session. You can export/copy anytime.
                  </span>
                  <button
                    onClick={saveJournalEntry}
                    disabled={!journalText.trim()}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold transition-all shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Commit Entry to Memory
                  </button>
                </div>
              </div>
            </div>

            {/* SIDEBAR: SAVED JOURNAL ENTRIES */}
            <div className="space-y-6">
              <div className={`p-6 rounded-2xl border transition-all ${
                theme === 'parchment' ? 'bg-white border-stone-200' : 'bg-stone-900/60 border-stone-800'
              }`}>
                <h3 className="text-sm uppercase font-sans font-bold tracking-widest text-stone-500 mb-4 flex items-center justify-between">
                  <span>Your Journal Log ({journalEntries.length})</span>
                  {journalEntries.length > 0 && (
                    <button
                      onClick={() => {
                        const content = journalEntries.map(e => `[${e.date}] Ref: ${e.passageRef}\n${e.text}\n---\n`).join('\n');
                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `citadel-stoic-journal.txt`;
                        a.click();
                      }}
                      title="Download entries"
                      className="text-amber-600 dark:text-amber-400 hover:underline text-xs flex items-center gap-1 normal-case font-normal"
                    >
                      <Download className="w-3.5 h-3.5" /> Export All
                    </button>
                  )}
                </h3>

                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1 scrollbar-thin">
                  {journalEntries.map((entry) => (
                    <div 
                      key={entry.id}
                      className={`p-4 rounded-xl border text-sm transition-all ${
                        theme === 'parchment'
                          ? 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                          : 'bg-stone-950 border-stone-800 hover:bg-stone-900'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono font-bold">
                          {entry.passageRef}
                        </span>
                        <button
                          onClick={() => deleteJournalEntry(entry.id)}
                          className="text-[10px] text-rose-500 hover:underline"
                        >
                          Discard
                        </button>
                      </div>

                      <p className="text-stone-700 dark:text-stone-200 leading-relaxed font-sans mb-2 break-words">
                        {entry.text}
                      </p>

                      <span className="text-[9px] text-stone-400 block text-right font-mono">
                        {entry.date}
                      </span>
                    </div>
                  ))}

                  {journalEntries.length === 0 && (
                    <div className="text-center py-10 text-stone-400">
                      <p className="text-xs">Your personal log is empty.</p>
                      <p className="text-[10px] mt-1">"The best path is to look within at dawn."</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </section>
        )}

        {/* TAB 4: STOIC PHILOSOPHY CORE MAP */}
        {activeTab === 'map' && (
          <section className="space-y-6">
            
            {/* INTRO EXPLAINER */}
            <div className={`p-6 md:p-8 rounded-2xl border transition-all text-center max-w-3xl mx-auto space-y-4 ${
              theme === 'parchment' ? 'bg-white border-stone-200' : 'bg-stone-900/60 border-stone-800'
            }`}>
              <Award className="w-12 h-12 text-amber-600 mx-auto" />
              <h2 className="text-2xl font-serif font-semibold">The Four Virtues & Stoic Axioms</h2>
              <p className="text-sm text-stone-500 max-w-xl mx-auto leading-relaxed">
                Marcus Aurelius’s entire philosophy is organized around the practice of four main cardinal virtues, mapped to clear guidelines of life. Use this map to navigate the *Meditations*.
              </p>
            </div>

            {/* VIRTUES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Wisdom (Sophia)",
                  desc: "Knowing what is good, what is bad, and what is indifferent. Navigating complexity with clear-sighted, unclouded judgment.",
                  quote: "Do not waste the remainder of your life in speculation about others. Focus on your actions.",
                  bookRef: "Book 3, Ch 4"
                },
                {
                  title: "Temperance (Sophrosyne)",
                  desc: "Self-discipline and restraint. Understanding limits, acting with reason, and staying immune to excessive pleasure or pain.",
                  quote: "At dawn, remind yourself of your duty as a human. Do not seek blankets of ease.",
                  bookRef: "Book 5, Ch 1"
                },
                {
                  title: "Justice (Dikaiosyne)",
                  desc: "Acting in service of the community. Standing up against tyranny and looking out for your fellow human being.",
                  quote: "What is not good for the beehive cannot be good for the individual bee.",
                  bookRef: "Book 6, Ch 54"
                },
                {
                  title: "Courage (Andreia)",
                  desc: "Enduring hardships and facing adversity without fear. Standing resolute like the rocky promontory against turbulent seas.",
                  quote: "The mind adapts and converts to its own purposes the obstacle to our action.",
                  bookRef: "Book 5, Ch 20"
                }
              ].map((v, idx) => (
                <div 
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    theme === 'parchment' ? 'bg-white border-stone-200' : 'bg-stone-900/40 border-stone-800'
                  }`}
                >
                  <div>
                    <h3 className="font-serif font-bold text-lg text-amber-700 dark:text-amber-400 mb-2">
                      {v.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed mb-4">
                      {v.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                    <p className="text-xs italic font-serif text-stone-700 dark:text-stone-300">
                      "{v.quote}"
                    </p>
                    <span className="text-[10px] text-stone-400 block mt-2 text-right">
                      {v.bookRef}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* THREE DISCIPLINES */}
            <div className={`p-6 rounded-2xl border transition-all mt-8 ${
              theme === 'parchment' ? 'bg-white border-stone-200' : 'bg-stone-900/40 border-stone-800'
            }`}>
              <h3 className="font-serif font-bold text-xl mb-4 text-center">The Three Disciplines of Epictetus (Adopted by Marcus)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-sans font-bold text-sm text-stone-800 dark:text-stone-200 mb-1">1. Discipline of Desire (Amor Fati)</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Acceptance of whatever occurs naturally in the universe. Do not wish for things to be different; accept them as a necessary part of the greater cosmic tapestry.
                  </p>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-stone-800 dark:text-stone-200 mb-1">2. Discipline of Action (Philanthropy)</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Directing all human efforts to serve society, the global state, and helping others. Live to preserve justice and cooperative human relationships.
                  </p>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-stone-800 dark:text-stone-200 mb-1">3. Discipline of Assent (Mind Control)</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Immediate inspection of automatic emotional responses or impressions. Pause before reacting, neutralize unhelpful opinions, and keep the mind objective.
                  </p>
                </div>
              </div>
            </div>

          </section>
        )}

      </main>

      {/* FOOTER */}
      <footer className={`border-t py-8 mt-12 transition-colors duration-200 ${
        theme === 'parchment' 
          ? 'bg-stone-100 border-[#E8DFD0] text-stone-500' 
          : 'bg-[#0E0E10] border-[#2D2D30] text-stone-400'
      }`}>
        <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
          <p className="text-xs font-serif italic">
            "To go away from among men, if there are gods, is not a thing to be afraid of..." — Meditations
          </p>
          <p className="text-[10px] font-sans">
            Designed for Stoic explorers searching for wisdom from Marcus Aurelius’s Meditations. Built using standard public translations & Maximus Veritas archives.
          </p>
        </div>
      </footer>
    </div>
  );
}