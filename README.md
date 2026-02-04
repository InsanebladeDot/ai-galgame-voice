<div align="center">

<h1>ai-galgame-voice</h1>
A Powerful Few-shot Voice Conversion and Text-to-Speech WebUI with <strong>Interactive Galgame Experience</strong>.<br><br>

[![madewithlove](https://img.shields.io/badge/made_with-%E2%9D%A4-red?style=for-the-badge&labelColor=orange)](https://github.com/RVC-Boss/GPT-SoVITS)

**English** | [**中文简体**](./docs/cn/README.md) | [**日本語**](./docs/ja/README.md) | [**한국어**](./docs/ko/README.md) | [**Türkçe**](./docs/tr/README.md)

</div>

---

## 🌟 What’s New: Integrated Interactive Galgame System

This project extends **GPT-SoVITS v2 ProPlus** into a full-fledged **AI-powered visual novel platform**, combining voice synthesis, speech recognition, and animated characters for immersive storytelling:

- ✨ **Live2D Integration**: Animated 2D characters respond dynamically to dialogue and user interaction.
- 🎙️ **Speech-to-Text (STT)**: Speak naturally—your voice is transcribed in real time for AI input.
- 🔊 **High-Quality TTS**: Powered by GPT-SoVITS with **zero-shot/few-shot voice cloning** (5s sample → realistic speech).
- 💬 **AI-Powered Dialogue**: Chat with characters using LLM-driven conversation logic.
- 📖 **Galgame Story Mode**: Play through branching narratives where choices affect story outcomes and character relationships.

> Perfect for creating personalized AI companions, interactive visual novels, or voice-enabled roleplay experiences.

---

## 🔑 Core Features

1. **Zero-shot TTS**  
   Generate natural-sounding speech from just a **5-second voice sample**—no training required.

2. **Few-shot TTS**  
   Achieve higher voice fidelity with only **1 minute of reference audio** for fine-tuning.

3. **Cross-lingual Support**  
   Synthesize speech in **Chinese, English, Japanese, Korean, and Cantonese**—even if the voice model was trained on another language.

4. **All-in-One WebUI Toolkit**  
   Includes:
   - Voice/accompaniment separation
   - Automatic audio segmentation
   - Chinese ASR & text labeling
   - One-click model training for GPT/SoVITS

5. **Real-Time Performance**  
   - **RTF (Real-Time Factor)**:  
     - **0.014** on RTX 4090 (1400 words ≈ 4 min spoken in **3.36s**)  
     - **0.028** on RTX 4060 Ti  
     - **0.526** on Apple M4 CPU  
   - Try our [Hugging Face Demo](https://lj1995-gpt-sovits-proplus.hf.space/) (running on H200)!

---

## ▶️ Demo

- **Project Showcase**: [Watch on Bilibili (BV12g4y1m7Uw)](https://www.bilibili.com/video/BV12g4y1m7Uw)  
- **Few-shot Voice Cloning Example**:  
  ![Demo](https://github.com/RVC-Boss/GPT-SoVITS/assets/129054828/05bee1fa-bdd8-4d85-9350-80c060ab47fb)

---

## 🚀 Get Started

1. Clone this repo  
2. Install dependencies (`pip install -r requirements.txt`)  
3. Launch WebUI: `python webui.py`  
4. Use the **"Galgame Mode"** tab to load Live2D models, start conversations, and experience AI-driven stories with lifelike voices.

> 💡 Tip: Record your own voice or upload a sample to clone any character’s speaking style instantly!

---

## ❤️ Acknowledgements

Built upon the amazing work of [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) by RVC-Boss.  
Made with ❤ for creators, developers, and AI storytellers.
