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
          accept=".pdf,.txt,.json"
          drag
          :on-change="handleFileChange"
          :show-file-list="false"
          class="upload-box"
        >
          <i class="el-icon-upload text-pink-500 text-3xl mb-2"></i>
          <div class="text-pink-700 font-bold">上传参考音频</div>
          <div class="text-gray-500 text-sm mt-1">Wav / MP3 </div>
        </el-upload>
      </div>

      <!-- 右侧：垂直布局（文本框 + 按钮） -->
      <div class="right-section">
        <!-- 粘贴文本区域 -->
        <el-input
          type="textarea"
          :rows="6"
          placeholder="书写你的台词文本"
          v-model="pastedContent"
          class="paste-input"
        />

        <!-- 开始讲解按钮 -->
        <el-button
          type="primary"
          size="large"
          @click="startExplanation"
          class="start-btn"
        >
          一键开始
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const pastedContent = ref('')
const uploadedFile = ref<File | null>(null)

function handleFileChange(file: any) {
  if (file.raw) uploadedFile.value = file.raw
}

function startExplanation() {
  if (uploadedFile.value || pastedContent.value.trim()) {
    alert('开始讲解！')
  } else {
    alert('请上传文件或粘贴内容')
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
  min-width: 280px;
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