
import type {VoiceModel} from '@/types/module/index'
// 所有可用角色模型
export const voiceModels: Record<string, VoiceModel> = {
  // === 爱莉希雅 ===
  elysia: {
    name: '爱莉希雅',
    gpt_model_path: 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/【GPT-SoVITS 2.0】爱莉希雅/GPT_weights_v2/【GPT2.0】Elysia-e15.ckpt',
    sovits_model_path: 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/【GPT-SoVITS 2.0】爱莉希雅/SoVITS_weights_v2/【GPT2.0】Elysia_e20_s10900.pth'
  },

  // === 流萤 ===
  firely: {
    name: '流萤',
    gpt_model_path: 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/流萤/GPT_weights/Firefly-e15.ckpt',
    sovits_model_path: 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/流萤/SoVITS_weights/Firefly_e16_s1872.pth'
  },

  // === 雷电芽衣 ===
  leidianyaya: {
    name: '雷电芽衣',
    gpt_model_path: 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/雷电芽衣/GPT_weights/Raiden_Mei-e10.ckpt',
    sovits_model_path: 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/雷电芽衣/SoVITS_weights/Raiden_Mei_e8_s80.pth'
  }
}