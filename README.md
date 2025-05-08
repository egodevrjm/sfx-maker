#  Soundscape Generator

A React application that creates high-quality sound effects using the ElevenLabs text-to-sound-effects API and Gemini 2.0 Flash for prompt enhancement.

## Overview

This application provides a simple interface to:
1. Enter a basic sound concept
2. Enhance it with Gemini 2.0 Flash AI
3. Generate a sound effect using ElevenLabs text-to-sound-effects
4. Play the sound and manage your generation history

## Requirements

- ElevenLabs API key
- Google Gemini API key
- React environment with access to ElevenLabs MCP functions

## Setup and Running

1. Clone the repository to your local machine
2. Navigate to the project directory:
   ```
   cd /Users/ryanmorrison/Desktop/soundscape-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   npm start
   ```

5. Enter your API keys when prompted:
   - ElevenLabs API key (from your ElevenLabs account)
   - Gemini API key (from Google AI Studio)

## Important Notes

This application assumes access to the ElevenLabs Mission Control Panel (MCP) functions:
- `text_to_sound_effects` - For generating sound effects
- `play_audio` - For playing the generated audio

These functions are expected to be available in the global scope (window object). The application passes your API key to these functions internally.

## Outputs

Generated sound effects are saved to:
```
/Users/ryanmorrison/Desktop/soundscape_outputs
```

## Features

- Black and white minimalist interface
- API key management (stored in localStorage)
- Prompt enhancement with Gemini 2.0 Flash
- Adjustable sound duration (0.5-5 seconds)
- Playback of generated sounds
- History of previous generations

## Troubleshooting

If you encounter issues:
1. Make sure your API keys are correct
2. Verify that the ElevenLabs MCP functions are available
3. Check that you have proper permissions to write to the output directory
