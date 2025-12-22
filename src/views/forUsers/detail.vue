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
      // 目前使用模拟数据
      const mockPrompts = [
        {
          id: 1,
          title: '生成高质量文章',
          description: '用于生成结构清晰、内容丰富的高质量文章',
          content: '请写一篇关于人工智能发展前景的文章，要求结构清晰，包含引言、现状分析、未来展望和结论四个部分，每个部分不少于300字，语言要专业但通俗易懂。',
          resultType: 'text',
          result: `## 人工智能发展前景

### 引言
人工智能（AI）作为21世纪最具革命性的技术之一，正在以前所未有的速度改变着我们的生活和工作方式。从智能手机中的语音助手到自动驾驶汽车，从医疗诊断到金融分析，AI技术的应用已经渗透到各个领域。本文将从人工智能的发展现状、技术突破、应用前景以及面临的挑战等方面，全面探讨人工智能的未来发展趋势。

### 现状分析
目前，人工智能技术正处于快速发展阶段。深度学习、自然语言处理、计算机视觉等核心技术取得了重大突破。深度学习模型如GPT-4、BERT等在语言理解和生成方面达到了接近人类的水平；计算机视觉技术在图像识别、目标检测等任务上的准确率已经超过人类；强化学习在游戏、机器人控制等领域取得了显著成果。

### 未来展望
未来，人工智能将向更智能化、通用化的方向发展。通用人工智能（AGI）的研究将取得重要进展，AI系统将具备更广泛的认知能力和自主决策能力。同时，AI与其他前沿技术如5G、物联网、区块链的融合将创造出更多创新应用。在医疗领域，AI将帮助医生进行更准确的诊断和个性化治疗；在交通领域，自动驾驶技术将实现大规模商业化应用；在教育领域，AI将提供个性化的学习体验。

### 结论
人工智能的发展前景广阔，但也面临着伦理、隐私、就业等方面的挑战。我们需要在推动技术进步的同时，健全的法律法规和伦理框架，确保人工智能的发展符合人类的利益。相信在不久的将来，人工智能将成为推动人类社会进步的重要力量，为我们创造更美好的生活。`
        },
        {
          id: 2,
          title: '创建创意海报文案',
          description: '用于生成吸引人的海报文案',
          content: '请为一个科技产品发布会设计海报文案，主题是"未来已来"，需要包含主标题、副标题和3个核心卖点，风格要科技感十足，同时简洁有力。',
          resultType: 'image',
          result: 'https://picsum.photos/id/1005/800/400'
        },
        {
          id: 3,
          title: '编写Python函数',
          description: '用于生成Python编程函数',
          content: '请编写一个Python函数，用于计算列表中所有元素的平均值，要求函数接受一个列表参数，返回平均值，同时处理空列表的情况。',
          resultType: 'html',
          result: `<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;"><h3 style="color: #28a745; margin-top: 0;">Python 平均计算函数</h3><pre style="background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 6px; overflow-x: auto;"><code>def calculate_average(numbers):
    """
    计算列表中所有元素的平均值
    
    参数:
    numbers (list): 包含数字的列表
    
    返回:
    float: 平均值，如果列表为空则返回0
    """
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

# 示例用法
scores = [90, 85, 95, 88, 92]
average = calculate_average(scores)
print(f"平均分: {average}")  # 输出: 平均分: 90.0

# 处理空列表
empty_list = []
average_empty = calculate_average(empty_list)
print(f"空列表的平均值: {average_empty}")  # 输出: 空列表的平均值: 0</code></pre><p style="color: #6c757d; margin-bottom: 0;"><strong>函数说明:</strong> 这个函数接受一个数字列表作为参数，使用sum()计算总和，然后除以元素数量得到平均值。如果列表为空，返回0以避免除以零错误。</p></div>`
        }
      ]
      
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