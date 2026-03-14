import os
from gtts import gTTS

quotes = [
    "A magyar bor a legjobb, ez nyilvánvaló.",
    "Vigyázz, mindjárt tüsszentek egy hatalmasat!",
    "Hova dugtam vajon a cukorkámat?",
    "Ne aggódj a vezetésem miatt, profi vagyok... azt hiszem.",
    "Tökéletes! Olyan mint Del Boy mondaná: Csodás!",
    "Három lime-ot kérek a konyakba, ne egyel többet, ne egyel kevesebbet.",
    "Vizilabdában nem ismersz kegyelmet, főleg hajnali háromkor.",
    "Azt hiszem, hasonlítok Mr. Beanre. Vagy ő hasonlít rám?",
    "Ez a kávé nem elég magyar nekem.",
    "Kérem a következő táncpartnert, a parkett az enyém!",
    "Titkos összetevő a grillhez? Egy csepp konyak.",
    "A padka csak úthibának számít, semmi komoly.",
    "Minden üzletem mögött briliáns logika áll.",
    "Ha a bor nem Tokaji, nem is iszom meg.",
    "Én vagyok László. Az egyetlen és megismételhetetlen."
]

os.makedirs("audio", exist_ok=True)

for i, text in enumerate(quotes):
    print(f"Generating neural_{i+1}.mp3...")
    tts = gTTS(text, lang='hu')
    tts.save(f"audio/neural_{i+1}.mp3")

print("Neural audio files generated successfully.")
