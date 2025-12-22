<template>
  <div class="prompt-item" @click="handleItemClick">
    <!-- 卡片头部：标题和描述 -->
    <div class="prompt-header">
      <h3 class="prompt-title">{{ prompt.title }}</h3>
      <p class="prompt-description">{{ prompt.description }}</p>
    </div>
    
    <!-- 提示词内容区域 -->
    <div class="prompt-content-wrapper">
      <div class="prompt-content">
        {{ prompt.content }}
      </div>
      <el-button
        type="primary"
        size="small"
        class="copy-btn"
        @click.stop="handleCopy"
      >
        <svg-icon icon-class="document-copy"></svg-icon>
        复制
      </el-button>
    </div>
    
    <!-- AI返回结果展示区域 -->
    <div v-if="prompt.result" class="ai-result-section">
      <h4 class="result-title">AI返回结果</h4>
      
      <!-- 文本结果 -->
      <div v-if="prompt.resultType === 'text'" class="result-content text-result">
        {{ prompt.result }}
      </div>
      
      <!-- 图片结果 -->
      <div v-else-if="prompt.resultType === 'image'" class="result-content image-result">
        <img :src="prompt.result" alt="AI生成图片" class="ai-image">
      </div>
      
      <!-- HTML预览结果 -->
      <div v-else-if="prompt.resultType === 'html'" class="result-content html-result">
        <div class="html-preview" v-html="prompt.result"></div>
        <el-button
          type="info"
          size="small"
          class="open-html-btn"
          @click.stop="handleOpenHtml"
        >
          <svg-icon icon-class="external-link"></svg-icon>
          在新窗口打开
        </el-button>
      </div>
    </div>
    
    <!-- 查看详情指示器 -->
    <div class="view-details-indicator">
      <span>查看详情</span>
      <svg-icon icon-class="arrow-right"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromptItem',
  props: {
    prompt: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleCopy() {
      const input = document.createElement('input')
      input.value = this.prompt.content
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      this.$message.success('复制成功')
    },
    handleItemClick() {
      // 点击item查看详情的逻辑，这里可以跳转到详情页或显示详情弹窗
      this.$message.info(`查看提示词 "${this.prompt.title}" 的详细信息`)
      // 实际项目中可以使用路由跳转：
      // this.$router.push(`/prompt/${this.prompt.id}`)
    },
    handleOpenHtml() {
      // 在新窗口中打开HTML内容
      const newWindow = window.open('', '_blank')
      newWindow.document.write(this.prompt.result)
      newWindow.document.close()
    }
  }
}
</script>

<style scoped>
.prompt-item {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #f0f0f0;
}

.prompt-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #e6f7ff;
}

/* 卡片头部样式 */
.prompt-header {
  margin-bottom: 16px;
}

.prompt-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.prompt-description {
  font-size: 13px;
  color: #999;
  margin: 0;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* 提示词内容区域 */
.prompt-content-wrapper {
  background: #fafafa;
  border-radius: 8px;
  padding: 16px;
  position: relative;
  margin-bottom: 16px;
  border: 1px solid #f0f0f0;
}

.prompt-content {
  font-size: 13px;
  line-height: 1.6;
  color: #666;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.copy-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  border-radius: 4px;
  font-size: 12px;
  padding: 4px 8px;
  background: #1890ff;
  border: none;
  transition: all 0.2s ease;
  z-index: 1;
}

.copy-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* AI结果区域 */
.ai-result-section {
  background: #fafafa;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #f0f0f0;
}

.result-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
}

.result-title::before {
  content: '🤖';
  margin-right: 6px;
  font-size: 16px;
}

.result-content {
  border-radius: 8px;
  overflow: hidden;
}

/* 文本结果 */
.text-result {
  font-size: 13px;
  line-height: 1.6;
  color: #666;
  padding: 12px;
  background: #fff;
  border-radius: 4px;
  border-left: 3px solid #1890ff;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

/* 图片结果 */
.image-result {
  display: flex;
  justify-content: center;
  padding: 8px;
  background: #fff;
  border-radius: 4px;
}

.ai-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  object-fit: cover;
}

.ai-image:hover {
  transform: scale(1.02);
}

/* HTML预览结果 */
.html-result {
  padding: 12px;
  background: #fff;
  border-radius: 4px;
  position: relative;
}

.html-preview {
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  padding: 12px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 13px;
  line-height: 1.5;
  max-height: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.open-html-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  border-radius: 4px;
  font-size: 12px;
  padding: 4px 8px;
  background: #52c41a;
  border: none;
  transition: all 0.2s ease;
  z-index: 1;
}

.html-preview :first-child {
  margin-top: 0;
}

.html-preview :last-child {
  margin-bottom: 0;
}

/* 查看详情指示器 */
.view-details-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  color: #1890ff;
  font-size: 12px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.view-details-indicator:hover {
  opacity: 1;
}

.view-details-indicator svg {
  margin-left: 4px;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .prompt-item {
    padding: 16px;
    margin-bottom: 16px;
  }
  
  .prompt-title {
    font-size: 16px;
  }
  
  .prompt-content-wrapper,
  .ai-result-section {
    padding: 12px;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>