import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';

// Define simple icon components to replace Lucide icons
const IconPlay = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const IconPause = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const IconDownload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const IconSave = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const IconVolume = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
  </svg>
);

const IconMute = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const IconLayers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const IconEdit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const IconMusic = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <circle cx="18" cy="16" r="3"></circle>
  </svg>
);

const IconWand = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4V2"></path>
    <path d="M15 16v-2"></path>
    <path d="M8 9h2"></path>
    <path d="M20 9h2"></path>
    <path d="M17.8 11.8 19 13"></path>
    <path d="M15 9h0"></path>
    <path d="M17.8 6.2 19 5"></path>
    <path d="M12.2 6.2 11 5"></path>
    <path d="M12.2 11.8 11 13"></path>
    <path d="m7.5 7.5-1-1"></path>
    <path d="m7.5 7.5-1-1"></path>
    <line x1="4" y1="15" x2="20" y2="15"></line>
    <path d="m5 20 14-7"></path>
  </svg>
);

const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const IconLoader = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);

function App() {
  // API key states
  const [elevenlabsApiKey, setElevenlabsApiKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [apiKeysSet, setApiKeysSet] = useState(false);
  
  // Prompt states
  const [prompt, setPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [duration, setDuration] = useState(3);
  
  // Process states
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioFile, setAudioFile] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  
  // History state
  const [generationHistory, setGenerationHistory] = useState([]);
  
  // Editor states
  const [showEditor, setShowEditor] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlayingMix, setIsPlayingMix] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0);
  
  // Refs
  const audioRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const trackNodesRef = useRef({});
  
  // Load API keys from localStorage on component mount
  useEffect(() => {
    const storedElevenLabsKey = localStorage.getItem('elevenlabsApiKey');
    const storedGeminiKey = localStorage.getItem('geminiApiKey');
    
    if (storedElevenLabsKey) setElevenlabsApiKey(storedElevenLabsKey);
    if (storedGeminiKey) setGeminiApiKey(storedGeminiKey);
    
    if (storedElevenLabsKey && storedGeminiKey) {
      setApiKeysSet(true);
    }
    
    // Load history from localStorage
    const storedHistory = localStorage.getItem('generationHistory');
    if (storedHistory) {
      try {
        setGenerationHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error('Failed to parse history from localStorage');
      }
    }
    
    // Load tracks from localStorage
    const storedTracks = localStorage.getItem('soundscapeTracks');
    if (storedTracks) {
      try {
        setTracks(JSON.parse(storedTracks));
      } catch (e) {
        console.error('Failed to parse tracks from localStorage');
      }
    }
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      // Fix for the exhaustive-deps warning
      const currentAudio = audioRef.current;
      if (currentAudio) {
        currentAudio.pause();
      }
      
      // Clean up audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('generationHistory', JSON.stringify(generationHistory));
  }, [generationHistory]);
  
  // Save tracks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('soundscapeTracks', JSON.stringify(tracks));
  }, [tracks]);
  
  // Save API keys
  const saveApiKeys = () => {
    if (elevenlabsApiKey && geminiApiKey) {
      localStorage.setItem('elevenlabsApiKey', elevenlabsApiKey);
      localStorage.setItem('geminiApiKey', geminiApiKey);
      setApiKeysSet(true);
    } else {
      alert('Please enter both API keys');
    }
  };
  
  // Clear API keys
  const clearApiKeys = () => {
    localStorage.removeItem('elevenlabsApiKey');
    localStorage.removeItem('geminiApiKey');
    setElevenlabsApiKey('');
    setGeminiApiKey('');
    setApiKeysSet(false);
  };
  
  // Enhance prompt using Gemini API - modified for shorter, more focused prompts
  const enhancePrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsEnhancing(true);
    
    try {
      // New prompt engineering that focuses on concise, focused prompts for SFX
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        {
          contents: [
            {
              parts: [
                {
                  text: `You are an expert sound designer familiar with the ElevenLabs text-to-sound-effects API. 
                  
Create a concise, focused prompt to describe this sound concept: "${prompt}"

Guidelines:
- Keep the prompt under 50 words
- Focus on describing key sound characteristics (pitch, tone, timbre)
- Include spatial information if relevant (direction, distance)
- Mention intensity level (loud/soft/etc)
- Specify distinctive sound elements
- Avoid narrative structure or storytelling
- Be specific but concise
- Include timing information if relevant

Return only the enhanced prompt with no additional explanation.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 100
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': geminiApiKey
          }
        }
      );
      
      // Extract the enhanced prompt from the response
      if (response.data && 
          response.data.candidates && 
          response.data.candidates[0] && 
          response.data.candidates[0].content && 
          response.data.candidates[0].content.parts && 
          response.data.candidates[0].content.parts[0] &&
          response.data.candidates[0].content.parts[0].text) {
        // Trim response and ensure it's not too long (max 150 characters)
        let processedPrompt = response.data.candidates[0].content.parts[0].text.trim();
        if (processedPrompt.length > 150) {
          processedPrompt = processedPrompt.substring(0, 150);
        }
        setEnhancedPrompt(processedPrompt);
      } else {
        throw new Error('Failed to parse Gemini API response');
      }
    } catch (error) {
      console.error('Error enhancing prompt:', error);
      alert('Failed to enhance prompt. Please check your Gemini API key and try again.');
    } finally {
      setIsEnhancing(false);
    }
  };
  
  // Generate sound effect using ElevenLabs API
  const generateSoundEffect = async () => {
    const finalPrompt = enhancedPrompt || prompt;
    if (!finalPrompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      console.log('Generating sound effect with prompt:', finalPrompt);
      console.log('Duration:', duration);
      
      // Make a direct API call to the ElevenLabs sound generation endpoint
      const response = await fetch('https://api.elevenlabs.io/v1/sound-generation', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenlabsApiKey
        },
        body: JSON.stringify({
          text: finalPrompt,
          duration_seconds: duration,
          prompt_influence: 0.3
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status} - ${errorText}`);
      }
      
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Set the audio file path 
      setAudioFile(audioUrl);
      
      // Create a timestamp for the filename
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      const fileName = `soundscape_${timestamp}.mp3`;
      
      // Add to history
      setGenerationHistory(prev => [
        { 
          prompt: finalPrompt, 
          file: audioUrl, 
          date: new Date().toLocaleString(),
          blob: audioBlob, // Store blob for potential download
          filename: fileName,
          duration: duration
        },
        ...prev.slice(0, 9) // Keep only 10 most recent
      ]);
    } catch (error) {
      alert(error.message || 'Failed to generate sound effect');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Play/pause the generated sound
  const togglePlayback = (audioSrc = audioFile) => {
    if (!audioSrc) return;
    
    if (isPlaying) {
      setIsPlaying(false);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    } else {
      // Clean up any existing audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Create a new audio element
      const audio = new Audio(audioSrc);
      audioRef.current = audio;
      
      // Set up event handlers
      audio.onended = () => {
        setIsPlaying(false);
        setPlaybackProgress(0);
      };
      
      audio.ontimeupdate = () => {
        if (audio.duration) {
          setPlaybackProgress((audio.currentTime / audio.duration) * 100);
        }
      };
      
      // Play the audio
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error('Failed to play audio:', err);
        alert('Failed to play audio. Please try again.');
        setIsPlaying(false);
      });
    }
  };
  
  // Download the audio file
  const downloadAudio = (index = -1) => {
    let audioBlob;
    let fileName;
    
    if (index === -1) {
      // Download the current audio
      if (!audioFile) return;
      
      // Get the blob from the history if available
      const historyItem = generationHistory[0];
      if (historyItem && historyItem.blob) {
        audioBlob = historyItem.blob;
        fileName = historyItem.filename || `soundscape_${Date.now()}.mp3`;
      } else {
        alert('Unable to download this sound effect.');
        return;
      }
    } else {
      // Download from history
      if (index >= generationHistory.length) return;
      
      const historyItem = generationHistory[index];
      if (!historyItem || !historyItem.blob) {
        alert('Unable to download this sound effect.');
        return;
      }
      
      audioBlob = historyItem.blob;
      fileName = historyItem.filename || `soundscape_${Date.now()}.mp3`;
    }
    
    // Create download link
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  
  // Play an item from history
  const playFromHistory = (index) => {
    if (index >= generationHistory.length) return;
    
    const historyItem = generationHistory[index];
    if (!historyItem || !historyItem.file) return;
    
    togglePlayback(historyItem.file);
  };
  
  // Add a sound to the editor timeline
  const addToTimeline = (index) => {
    if (index >= generationHistory.length) return;
    
    const historyItem = generationHistory[index];
    if (!historyItem || !historyItem.file) return;
    
    // Create a new track
    const newTrack = {
      id: `track-${Date.now()}`,
      name: historyItem.prompt.slice(0, 20) + (historyItem.prompt.length > 20 ? '...' : ''),
      prompt: historyItem.prompt,
      audioUrl: historyItem.file,
      blob: historyItem.blob,
      startTime: 0, // Start at the beginning by default
      duration: historyItem.duration || 3,
      volume: 1.0,
      muted: false
    };
    
    setTracks(prev => [...prev, newTrack]);
    
    // Show the editor if not already visible
    setShowEditor(true);
    
    // Update the total track duration if needed
    if (newTrack.startTime + newTrack.duration > trackDuration) {
      setTrackDuration(newTrack.startTime + newTrack.duration);
    }
  };
  
  // Toggle track mute state
  const toggleTrackMute = (trackId) => {
    setTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, muted: !track.muted } : track
    ));
  };
  
  // Update track volume
  const updateTrackVolume = (trackId, volume) => {
    setTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, volume: parseFloat(volume) } : track
    ));
    
    // Update the audio node volume if playing
    if (trackNodesRef.current[trackId] && trackNodesRef.current[trackId].gainNode) {
      trackNodesRef.current[trackId].gainNode.gain.value = parseFloat(volume);
    }
  };
  
  // Update track start time
  const updateTrackStartTime = (trackId, startTime) => {
    setTracks(prev => {
      const updatedTracks = prev.map(track => 
        track.id === trackId ? { ...track, startTime: parseFloat(startTime) } : track
      );
      
      // Calculate new max duration
      const maxEndTime = Math.max(...updatedTracks.map(t => t.startTime + t.duration));
      if (maxEndTime > trackDuration) {
        setTrackDuration(maxEndTime);
      }
      
      return updatedTracks;
    });
  };
  
  // Remove track from timeline
  const removeTrack = (trackId) => {
    setTracks(prev => {
      const updatedTracks = prev.filter(track => track.id !== trackId);
      
      // Recalculate track duration
      if (updatedTracks.length > 0) {
        const maxEndTime = Math.max(...updatedTracks.map(t => t.startTime + t.duration));
        setTrackDuration(maxEndTime);
      } else {
        setTrackDuration(0);
      }
      
      return updatedTracks;
    });
    
    // Clean up audio nodes
    if (trackNodesRef.current[trackId]) {
      if (trackNodesRef.current[trackId].source) {
        trackNodesRef.current[trackId].source.stop();
      }
      delete trackNodesRef.current[trackId];
    }
  };
  
  // Format time display (seconds to MM:SS.ms)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const milliseconds = Math.floor((timeInSeconds % 1) * 100);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };
  
  // Play/pause the mixed timeline
  const togglePlayMix = async () => {
    if (tracks.length === 0) return;
    
    if (isPlayingMix) {
      // Stop playback
      setIsPlayingMix(false);
      setCurrentTime(0);
      
      // Stop all audio nodes
      Object.values(trackNodesRef.current).forEach(nodes => {
        if (nodes.source) {
          try {
            nodes.source.stop();
          } catch (e) {
            // Source may already be stopped
          }
        }
      });
      
      // Clear the interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      
      // Reset track nodes
      trackNodesRef.current = {};
      
      // Close audio context
      if (audioContextRef.current) {
        await audioContextRef.current.close();
        audioContextRef.current = null;
      }
    } else {
      // Start playback
      setIsPlayingMix(true);
      setCurrentTime(0);
      
      // Create audio context if needed
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const startTime = audioContextRef.current.currentTime;
      
      // Create an audio node for each track
      trackNodesRef.current = {};
      
      // Load and schedule each track
      await Promise.all(tracks.map(async (track) => {
        try {
          // Fetch the audio data
          const response = await fetch(track.audioUrl);
          const arrayBuffer = await response.arrayBuffer();
          
          // Decode the audio data
          const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
          
          // Create source node
          const source = audioContextRef.current.createBufferSource();
          source.buffer = audioBuffer;
          
          // Create gain node for volume control
          const gainNode = audioContextRef.current.createGain();
          gainNode.gain.value = track.muted ? 0 : track.volume;
          
          // Connect nodes
          source.connect(gainNode);
          gainNode.connect(audioContextRef.current.destination);
          
          // Store nodes for later control
          trackNodesRef.current[track.id] = { source, gainNode };
          
          // Schedule the track
          source.start(startTime + track.startTime);
          
          // Set up onended callback
          source.onended = () => {
            if (Object.values(trackNodesRef.current).every(nodes => !nodes.source.buffer)) {
              setIsPlayingMix(false);
              setCurrentTime(0);
              if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
              }
            }
          };
        } catch (err) {
          console.error('Error loading track audio:', err);
        }
      }));
      
      // Update current time
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      progressIntervalRef.current = setInterval(() => {
        const elapsed = audioContextRef.current.currentTime - startTime;
        setCurrentTime(elapsed);
        
        if (elapsed >= trackDuration) {
          setIsPlayingMix(false);
          setCurrentTime(0);
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      }, 50);
    }
  };
  
  // Mix and download all tracks
  const mixAndDownload = async () => {
    if (tracks.length === 0) return;
    
    try {
      // Create an offline audio context
      const offlineCtx = new OfflineAudioContext(
        2, // stereo
        44100 * trackDuration, // sample rate * duration in seconds
        44100 // sample rate
      );
      
      // Load and schedule each track
      await Promise.all(tracks.map(async (track) => {
        try {
          // Fetch the audio data
          const response = await fetch(track.audioUrl);
          const arrayBuffer = await response.arrayBuffer();
          
          // Decode the audio data
          const audioBuffer = await offlineCtx.decodeAudioData(arrayBuffer);
          
          // Create source node
          const source = offlineCtx.createBufferSource();
          source.buffer = audioBuffer;
          
          // Create gain node for volume control
          const gainNode = offlineCtx.createGain();
          gainNode.gain.value = track.muted ? 0 : track.volume;
          
          // Connect nodes
          source.connect(gainNode);
          gainNode.connect(offlineCtx.destination);
          
          // Schedule the track
          source.start(track.startTime);
        } catch (err) {
          console.error('Error loading track audio for mixing:', err);
        }
      }));
      
      // Render the audio
      const renderedBuffer = await offlineCtx.startRendering();
      
      // Convert to WAV
      const wavBlob = bufferToWav(renderedBuffer);
      
      // Create a download link
      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `mixed_soundscape_${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error mixing tracks:', err);
      alert('Failed to mix and download tracks. Please try again.');
    }
  };
  
  // Helper function to convert AudioBuffer to WAV
  const bufferToWav = (buffer) => {
    const numOfChannels = buffer.numberOfChannels;
    const length = buffer.length * numOfChannels * 2;
    const sampleRate = buffer.sampleRate;
    
    // Create the buffer that will hold the WAV data
    const arrayBuffer = new ArrayBuffer(44 + length);
    const view = new DataView(arrayBuffer);
    
    // RIFF identifier
    writeString(view, 0, 'RIFF');
    // RIFF chunk length
    view.setUint32(4, 36 + length, true);
    // RIFF type
    writeString(view, 8, 'WAVE');
    // Format chunk identifier
    writeString(view, 12, 'fmt ');
    // Format chunk length
    view.setUint32(16, 16, true);
    // Sample format (raw)
    view.setUint16(20, 1, true);
    // Channel count
    view.setUint16(22, numOfChannels, true);
    // Sample rate
    view.setUint32(24, sampleRate, true);
    // Byte rate (sample rate * block align)
    view.setUint32(28, sampleRate * numOfChannels * 2, true);
    // Block align (channel count * bytes per sample)
    view.setUint16(32, numOfChannels * 2, true);
    // Bits per sample
    view.setUint16(34, 16, true);
    // Data chunk identifier
    writeString(view, 36, 'data');
    // Data chunk length
    view.setUint32(40, length, true);
    
    // Write the PCM samples
    const offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        const value = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset + (i * numOfChannels + channel) * 2, value, true);
      }
    }
    
    return new Blob([view], { type: 'audio/wav' });
  };
  
  // Helper function to write a string to a DataView
  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  return (
    <div className="App">
      {!apiKeysSet ? (
        <div className="container api-setup">
          <h2>API Key Setup</h2>
          <p>Please enter your API keys to use the Soundscape Generator</p>
          
          <div className="form-group">
            <label htmlFor="elevenlabs-api">ElevenLabs API Key</label>
            <input
              id="elevenlabs-api"
              type="password"
              className="input-field"
              value={elevenlabsApiKey}
              onChange={(e) => setElevenlabsApiKey(e.target.value)}
              placeholder="Enter your ElevenLabs API key"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="gemini-api">Gemini API Key</label>
            <input
              id="gemini-api"
              type="password"
              className="input-field"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
            />
          </div>
          
          <button
            className="button w-full"
            onClick={saveApiKeys}
          >
            <span className="button-text">
              <IconSave style={{width: "18px", height: "18px"}} />
              Save API Keys & Continue
            </span>
          </button>
        </div>
      ) : (
        <>
          <div className="header">
            <h1>ElevenLabs Soundscape Generator</h1>
            <p>Create high-quality sound effects using AI</p>
          </div>
          
          <div className="container">
            <div className="form-group">
              <label htmlFor="prompt">Sound Concept</label>
              <input
                id="prompt"
                type="text"
                className="input-field"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., forest with birds chirping"
              />
            </div>
            
            <button
              className="button w-full"
              onClick={enhancePrompt}
              disabled={isEnhancing || !prompt.trim()}
            >
              {isEnhancing ? (
                <span className="button-text">
                  <IconLoader style={{width: "18px", height: "18px"}} />
                  Enhancing...
                </span>
              ) : (
                <span className="button-text">
                  <IconWand style={{width: "18px", height: "18px"}} />
                  Enhance with Gemini AI
                </span>
              )}
            </button>
            
            {enhancedPrompt && (
              <div className="enhanced-prompt">
                <h3>Enhanced Prompt:</h3>
                <p>{enhancedPrompt}</p>
                <p className="prompt-info">Characters: {enhancedPrompt.length}</p>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="duration">
                <span className="flex items-center gap-2">
                  <IconClock style={{width: "16px", height: "16px"}} />
                  Duration (seconds)
                </span>
              </label>
              <div className="slider-container">
                <input
                  id="duration"
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={duration}
                  onChange={(e) => setDuration(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="slider-value">{duration}s</span>
              </div>
            </div>
            
            <button
              className="button w-full"
              onClick={generateSoundEffect}
              disabled={isGenerating || (!prompt.trim() && !enhancedPrompt.trim())}
            >
              {isGenerating ? (
                <span className="button-text">
                  <IconLoader style={{width: "18px", height: "18px"}} />
                  Generating Sound...
                </span>
              ) : (
                <span className="button-text">
                  <IconMusic style={{width: "18px", height: "18px"}} />
                  Generate Soundscape
                </span>
              )}
            </button>
            
            {audioFile && (
              <div className="form-group">
                <h3>Generated Soundscape</h3>
                <div className="player">
                  <button
                    className="play-button"
                    onClick={() => togglePlayback()}
                  >
                    {isPlaying ? <IconPause style={{width: "16px", height: "16px"}} /> : <IconPlay style={{width: "16px", height: "16px"}} />}
                  </button>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${playbackProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="button button-icon"
                      onClick={() => downloadAudio()}
                      title="Download"
                    >
                      <IconDownload style={{width: "16px", height: "16px"}} />
                    </button>
                    <button
                      className="button button-icon"
                      onClick={() => addToTimeline(0)}
                      title="Add to Timeline"
                    >
                      <IconLayers style={{width: "16px", height: "16px"}} />
                    </button>
                  </div>
                </div>
                <p className="history-date">
                  Sound created from: "{enhancedPrompt || prompt}"
                </p>
              </div>
            )}
          </div>
          
          {generationHistory.length > 0 && (
            <div className="container">
              <div className="flex justify-between items-center mb-4">
                <h3>Recent Generations</h3>
                {generationHistory.length > 0 && (
                  <button
                    className="button button-secondary"
                    onClick={() => setShowEditor(!showEditor)}
                  >
                    <span className="button-text">
                      <IconLayers style={{width: "18px", height: "18px"}} />
                      {showEditor ? "Hide Editor" : "Show Editor"}
                    </span>
                  </button>
                )}
              </div>
              
              <div className="flex flex-col gap-2">
                {generationHistory.map((item, index) => (
                  <div key={index} className="history-item">
                    <div className="history-item-content">
                      <p className="history-prompt">{item.prompt}</p>
                      <p className="history-date">{item.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="button button-icon"
                        onClick={() => playFromHistory(index)}
                        title={isPlaying && audioRef.current && audioRef.current.src === item.file ? "Pause" : "Play"}
                      >
                        {isPlaying && audioRef.current && audioRef.current.src === item.file ? 
                          <IconPause style={{width: "16px", height: "16px"}} /> : 
                          <IconPlay style={{width: "16px", height: "16px"}} />
                        }
                      </button>
                      <button
                        className="button button-icon"
                        onClick={() => downloadAudio(index)}
                        title="Download"
                      >
                        <IconDownload style={{width: "16px", height: "16px"}} />
                      </button>
                      <button
                        className="button button-icon"
                        onClick={() => addToTimeline(index)}
                        title="Add to Timeline"
                      >
                        <IconLayers style={{width: "16px", height: "16px"}} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {showEditor && (
            <div className="container editor-container">
              <div className="editor-header">
                <h3 className="editor-title">Sound Editor</h3>
                <div className="editor-toolbar">
                  <button
                    className="button"
                    onClick={mixAndDownload}
                    disabled={tracks.length === 0}
                    title="Mix & Download"
                  >
                    <span className="button-text">
                      <IconDownload style={{width: "18px", height: "18px"}} />
                      Export Mix
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="timeline">
                <div className="timeline-controls">
                  <button
                    className="button button-icon"
                    onClick={togglePlayMix}
                    disabled={tracks.length === 0}
                  >
                    {isPlayingMix ? <IconPause style={{width: "16px", height: "16px"}} /> : <IconPlay style={{width: "16px", height: "16px"}} />}
                  </button>
                  <div className="timeline-time">
                    {formatTime(currentTime)} / {formatTime(trackDuration)}
                  </div>
                </div>
                
                <div 
                  className="timeline-tracks"
                  style={{ height: tracks.length === 0 ? '100px' : `${Math.max(100, tracks.length * 54)}px` }}
                >
                  {tracks.length === 0 ? (
                    <div className="empty-track-message">
                      <p>No sounds added to the timeline yet.</p>
                      <p>Use the "Add to Timeline" button on any sound to begin.</p>
                    </div>
                  ) : (
                    tracks.map((track, index) => (
                      <div key={track.id} className="timeline-track">
                        <div className="timeline-track-header">
                          <span className="track-name">{track.name}</span>
                          <div className="track-controls">
                            <button
                              className="button button-icon"
                              onClick={() => toggleTrackMute(track.id)}
                              title={track.muted ? "Unmute" : "Mute"}
                              style={{ 
                                width: '24px', 
                                height: '24px',
                                backgroundColor: track.muted ? '#ff0000' : '#000000'
                              }}
                            >
                              {track.muted ? <IconMute style={{width: "12px", height: "12px"}} /> : <IconVolume style={{width: "12px", height: "12px"}} />}
                            </button>
                            <button
                              className="button button-icon"
                              onClick={() => removeTrack(track.id)}
                              title="Remove Track"
                              style={{ width: '24px', height: '24px' }}
                            >
                              <IconTrash style={{width: "12px", height: "12px"}} />
                            </button>
                          </div>
                        </div>
                        <div className="timeline-track-content">
                          <div 
                            className="timeline-item"
                            style={{ 
                              left: `${(track.startTime / trackDuration) * 100}%`,
                              width: `${(track.duration / trackDuration) * 100}%`,
                              opacity: track.muted ? 0.5 : 1
                            }}
                          >
                            {track.name}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {isPlayingMix && (
                    <div 
                      className="timeline-scrubber"
                      style={{ left: `${(currentTime / trackDuration) * 100}%` }}
                    ></div>
                  )}
                </div>
              </div>
              
              {tracks.length > 0 && (
                <div className="mb-4">
                  <h4>Track Settings</h4>
                  {tracks.map((track) => (
                    <div key={`settings-${track.id}`} className="flex gap-4 items-center mb-4">
                      <div style={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {track.name}
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>
                          Volume:
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={track.volume}
                            onChange={(e) => updateTrackVolume(track.id, e.target.value)}
                            disabled={track.muted}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Start:
                          <input
                            type="number"
                            min="0"
                            max="60"
                            step="0.1"
                            value={track.startTime}
                            onChange={(e) => updateTrackStartTime(track.id, e.target.value)}
                            style={{ width: '70px', padding: '4px' }}
                          />
                          s
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="container">
            <button
              className="button button-secondary"
              onClick={clearApiKeys}
            >
              <span className="button-text">
                <IconX style={{width: "18px", height: "18px"}} />
                Clear API Keys
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
