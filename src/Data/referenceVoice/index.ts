//设定角色语气词

const referenceVoice = {
  calm: {
    // 平缓 / 冷静
    refer_wav_path: 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/流萤/流萤/参考音频/别回头。我确定他的目标就是你，从我们和加拉赫先生告别起就没跟丢过.wav',
    prompt_text: '别回头。我确定他的目标就是你，从我们和加拉赫先生告别起就没跟丢过',
    prompt_language: 'zh'
  },
  angry: {
    // 生气
    refer_wav_path: 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/流萤/流萤/参考音频/你到底有没有在听我说话！.wav',
    prompt_text: '你到底有没有在听我说话！',
    prompt_language: 'zh'
  },
  sad: {
    // 哭泣 / 悲伤
    refer_wav_path: 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/流萤/流萤/参考音频/我...我真的好害怕.wav',
    prompt_text: '我...我真的好害怕',
    prompt_language: 'zh'
  },
  arrogant: {
    // 傲慢
    refer_wav_path: 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/流萤/流萤/参考音频/这种事，也就只有我能办到吧。.wav',
    prompt_text: '这种事，也就只有我能办到吧。',
    prompt_language: 'zh'
  },
  cheerful: {
    // 欢快 / 元气
    refer_wav_path: 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/流萤/流萤/参考音频/太好了！我们成功了！.wav',
    prompt_text: '太好了！我们成功了！',
    prompt_language: 'zh'
  },
  whisper: {
    // 轻声 / 秘密
    refer_wav_path: 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/流萤/流萤/参考音频/嘘……别出声，他就在附近。.wav',
    prompt_text: '嘘……别出声，他就在附近。',
    prompt_language: 'zh'
  }
}