import os
from gtts import gTTS

# Move out of my seat or you die (translated colloquially to Hungarian)
text = "Tűnés a helyemről, vagy véged!"

os.makedirs("audio", exist_ok=True)
print("Generating floating_seat.mp3...")
tts = gTTS(text, lang='hu')
tts.save("audio/floating_seat.mp3")

print("Floating seat audio generated successfully.")
