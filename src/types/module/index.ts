// 指定模型 类型
export interface VoiceModel {
  name?: string                    // 角色名
  gpt_model_path: string          // GPT 模型路径（必须是 .pth 文件）
  sovits_model_path: string       // SoVITS 模型路径（必须是 .pth 文件）
}
