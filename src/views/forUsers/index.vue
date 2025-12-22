<template>
  <div class="prompt-collection">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1>提示词汇总</h1>
        <p class="subtitle">收集和分享各类高质量的AI提示词</p>
      </div>

      <!-- 搜索框 -->
      <search-box @search="handleSearch"></search-box>

      <!-- 分类标签 -->
      <category-tabs @tab-change="handleTabChange"></category-tabs>

      <!-- 行业分类 -->
      <industry-tags @industry-change="handleIndustryChange"></industry-tags>

      <!-- 提示词列表 -->
      <div class="prompt-list">
        <prompt-item
          v-for="prompt in prompts"
          :key="prompt.id"
          :prompt="prompt"
        ></prompt-item>
      </div>

      <!-- 分页 -->
      <pagination
        :total="totalPrompts"
        :page-size="pageSize"
        :current-page="currentPage"
        @page-change="handlePageChange"
      ></pagination>
    </div>

    <!-- 页脚 -->
    <Footer></Footer>
  </div>
</template>

<script>
import SearchBox from './components/SearchBox'
import CategoryTabs from './components/CategoryTabs'
import IndustryTags from './components/IndustryTags'
import PromptItem from './components/PromptItem'
import Pagination from './components/Pagination'
import Footer from './components/Footer'

export default {
  name: 'PromptCollection',
  components: {
    SearchBox,
    CategoryTabs,
    IndustryTags,
    PromptItem,
    Pagination,
    Footer
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalPrompts: 100,
      searchQuery: '',
      activeTab: 'popular',
      activeIndustry: '',
      prompts: [
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
    }
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query
      // 这里可以添加搜索逻辑
      console.log('搜索关键词:', query)
    },
    handleTabChange(tab) {
      this.activeTab = tab
      // 这里可以添加分类切换逻辑
      console.log('切换到分类:', tab)
    },
    handleIndustryChange(industry) {
      this.activeIndustry = industry
      // 这里可以添加行业分类切换逻辑
      console.log('切换到行业:', industry)
    },
    handlePageChange(page) {
      this.currentPage = page
      // 这里可以添加分页逻辑
      console.log('切换到页码:', page)
    }
  }
}
</script>

<style scoped>
.prompt-collection {
  background-color: #f5f7fa;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
  padding-top: 30px;
}

.page-header h1 {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  color: #666;
}

.prompt-list {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 20px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .prompt-list {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-gap: 16px;
  }
  
  .container {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .prompt-list {
    grid-template-columns: 1fr;
  }
}
</style>
