import os
from gtts import gTTS

text_toobad = "Így jártál... túl szomorú, de ez van."

os.makedirs("audio", exist_ok=True)
print("Generating floating_toobad.mp3...")
tts = gTTS(text_toobad, lang='hu')
tts.save("audio/floating_toobad.mp3")

print("Generated too bad audio.")
