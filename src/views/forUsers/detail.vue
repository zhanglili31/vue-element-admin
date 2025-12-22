<template>
  <div class="prompt-detail">
    <div class="container">
      <!-- 返回按钮 -->
      <div class="back-section">
        <el-button
          type="primary"
          size="medium"
          @click="handleBack"
        >
          <svg-icon icon-class="arrow-left"></svg-icon>
          返回列表
        </el-button>
      </div>

      <!-- 详情内容 -->
      <div v-if="currentPrompt" class="detail-content">
        <!-- 标题区域 -->
        <div class="title-section">
          <h1 class="detail-title">{{ currentPrompt.title }}</h1>
        </div>

        <!-- 提示词内容区域 -->
        <div class="content-section">
          <h2 class="section-title">提示词内容</h2>
          <div class="content-display">
            <div class="content-text">{{ currentPrompt.content }}</div>
          </div>
        </div>

        <!-- AI返回结果区域 -->
        <div v-if="currentPrompt.result" class="result-section">
          <h2 class="section-title">AI返回结果</h2>
          
          <!-- 文本结果 -->
          <div v-if="currentPrompt.resultType === 'text'" class="result-content text-result">
            {{ currentPrompt.result }}
          </div>
          
          <!-- 图片结果 -->
          <div v-else-if="currentPrompt.resultType === 'image'" class="result-content image-result">
            <img :src="currentPrompt.result" :alt="currentPrompt.title" class="ai-image">
          </div>
          
          <!-- HTML结果 -->
          <div v-else-if="currentPrompt.resultType === 'html'" class="result-content html-result">
            <div class="html-preview" v-html="currentPrompt.result"></div>
            <el-button
              type="info"
              size="small"
              class="open-html-btn"
              @click="handleOpenHtml"
            >
              <svg-icon icon-class="external-link"></svg-icon>
              在新窗口打开
            </el-button>
          </div>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-else class="loading-section">
        <el-spinner size="large" color="#1890ff"></el-spinner>
        <p>加载中...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mockPrompts } from './mockData'

export default {
  name: 'PromptDetail',
  data() {
    return {
      currentPrompt: null
    }
  },
  mounted() {
    this.loadPromptDetail()
  },
  methods: {
    // 加载提示词详情
    loadPromptDetail() {
      const promptId = parseInt(this.$route.params.id)
      // 在实际项目中，这里应该调用API获取数据
      // 目前使用统一的模拟数据
      this.currentPrompt = mockPrompts.find(prompt => prompt.id === promptId)
    },
    
    // 返回列表
    handleBack() {
      this.$router.push('/forUsers')
    },
    

    
    // 在新窗口打开HTML内容
    handleOpenHtml() {
      const newWindow = window.open('', '_blank')
      newWindow.document.write(this.currentPrompt.result)
      newWindow.document.close()
    }
  }
}
</script>

<style scoped>
.prompt-detail {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 40px 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.back-section {
  margin-bottom: 30px;
}

.detail-content {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.title-section {
  margin-bottom: 40px;
}

.detail-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.detail-description {
  font-size: 18px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

.content-section,
.result-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #1890ff;
}

.content-display {
  position: relative;
  background: #fafafa;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #f0f0f0;
}

.content-text {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 0;
}



.result-content {
  border-radius: 8px;
  overflow: hidden;
  padding: 24px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
}

/* 文本结果 */
.text-result {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  white-space: pre-wrap;
  word-break: break-word;
}

/* 图片结果 */
.image-result {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #fff;
}

.ai-image {
  max-width: 100%;
  max-height: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  object-fit: contain;
}

/* HTML结果 */
.html-result {
  position: relative;
  background: #fff;
}

.html-preview {
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  font-size: 16px;
  line-height: 1.8;
  min-height: 200px;
}

.open-html-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  border-radius: 4px;
  font-size: 14px;
  padding: 6px 12px;
  background: #52c41a;
  border: none;
  transition: all 0.2s ease;
}

.html-preview :first-child {
  margin-top: 0;
}

.html-preview :last-child {
  margin-bottom: 0;
}

/* 加载状态 */
.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.loading-section p {
  margin-top: 20px;
  font-size: 18px;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .prompt-detail {
    padding: 20px 0;
  }
  
  .detail-content {
    padding: 24px;
  }
  
  .detail-title {
    font-size: 24px;
  }
  
  .detail-description {
    font-size: 16px;
  }
  
  .section-title {
    font-size: 20px;
  }
  
  .content-display,
  .result-content {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
  
  .detail-content {
    padding: 16px;
  }
  
  .detail-title {
    font-size: 20px;
  }
  
  .section-title {
    font-size: 18px;
  }
  
  .content-text,
  .text-result {
    font-size: 14px;
  }
}
</style>