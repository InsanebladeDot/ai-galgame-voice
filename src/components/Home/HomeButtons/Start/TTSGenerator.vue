<template>
  <div class="topic-selection-container">
    <!-- 主容器：水平 flex -->
    <div class="main-layout">
      <!-- 左侧：上传区域 -->
      <div class="upload-section">
        <el-upload
          action="#"
          :auto-upload="false"
          :limit="1"
          accept=".wav,.mp3"
          drag
          :on-change="handleFileChange"
          :show-file-list="false"
          class="upload-box"
        >
          <i class="el-icon-upload text-pink-500 text-3xl mb-2"></i>
          <div class="text-pink-700 font-bold">上传参考音频</div>
          <div class="text-gray-500 text-sm mt-1">Wav / MP3</div>
        </el-upload>
      </div>

      <!-- 右侧：垂直布局（文本框 + 按钮） -->
      <div class="right-section">
        <!-- 粘贴文本区域 -->
        <el-form-item label="提示文本" class="mb-4">
          <el-input
            v-model="PostTTS.prompt_text"
            type="textarea"
            :rows="2"
            placeholder="用于声纹提取的参考文本，通常与合成文本相同"
          />
        </el-form-item>
        <!-- 提示语言 -->
        <el-form-item label="提示语言" class="mb-4">
          <el-select v-model="PostTTS.prompt_language" placeholder="请选择" style="width: 120px">
            <el-option label="中文" value="zh" />
            <el-option label="英文" value="en" />
            <el-option label="日文" value="ja" />
          </el-select>
        </el-form-item>
        <el-form-item label="合成文本" class="mb-4">
          <el-input
            v-model="PostTTS.text"
            type="textarea"
            :rows="2"
            placeholder="要合成的语音内容"
          />
        </el-form-item>
        <!-- 合成语言 -->
        <el-form-item label="合成语言" class="mb-6">
          <el-select v-model="PostTTS.text_language" placeholder="请选择" style="width: 120px">
            <el-option label="中文" value="zh" />
            <el-option label="英文" value="en" />
            <el-option label="日文" value="ja" />
          </el-select>
        </el-form-item>
        <!-- 开始讲解按钮 -->
        <el-button type="primary" size="large" class="start-btn" @click="handleSubmit()">
          一键开始
        </el-button>

        <el-form-item label="生成的语音" class="mb-4">
          <audio controls :src="audioUrl" />
        </el-form-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { TTSPayload } from '@/types/Voice/TTS/Post'
import { generateTTS } from '@/Api/Voice/TTS/Start/TTS/index'
// 表单数据
const PostTTS = reactive<TTSPayload>({
  refer_wav_path:
    'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/流萤/参考音频/别回头。我确定他的目标就是你，从我们和加拉赫先生告别起就没跟丢过.wav',
  prompt_text: '别回头。我确定他的目标就是你，从我们和加拉赫先生告别起就没跟丢过',
  prompt_language: 'zh',
  text: '',
  text_language: 'zh',
})

const handleFileChange = (file: any) => {
  console.log(file)
}

// TTS 逻辑

const audioUrl = ref('')
const handleSubmit = async () => {
  if (!PostTTS.refer_wav_path) {
    ElMessage.warning('请先上传参考音频')
    return
  }

  try {
    const response = await generateTTS(PostTTS)
    const blob = new Blob([response.data], { type: 'audio/wav' }) // 或 'audio/mpeg'，根据后端实际返回类型调整
    audioUrl.value = URL.createObjectURL(blob)
  } catch (error) {
    console.error('TTS 请求失败:', error)
    ElMessage.error('语音合成失败，请重试')
  }
}
</script>

<style scoped>
.topic-selection-container {
  padding: 20px;
}

/* 主布局：水平 flex */
.main-layout {
  display: flex;
  gap: 24px; /* 左右间距 */
  align-items: stretch; /* 让左右高度一致 */
}

/* 左侧上传区 */
.upload-section {
  flex: 1;
  max-width: 400px;
  border: 2px dashed #ff69b4;
  border-radius: 12px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.upload-box {
  width: 100%;
  cursor: pointer;
}

/* 右侧：垂直布局 */
.right-section {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 16px; /* 文本框和按钮的间距 */
}

.paste-input {
  flex: 1; /* 占据剩余空间 */
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.start-btn {
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  background: linear-gradient(to right, #ff6b9d, #e53935);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
  transition: opacity 0.2s;
}

.start-btn:hover {
  opacity: 0.9;
}
</style>
