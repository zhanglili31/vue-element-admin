<template>
  <div class="prompt-item">
    <div class="prompt-effect">
      <h3>{{ prompt.title }}</h3>
      <p class="description">{{ prompt.description }}</p>
    </div>
    <div class="prompt-content">
      <el-input
        type="textarea"
        :rows="4"
        :value="prompt.content"
        readonly
        placeholder="提示词内容"
      ></el-input>
      <el-button
        type="primary"
        size="small"
        class="copy-btn"
        @click="handleCopy"
      >
        <el-icon class="el-icon-document-copy"></el-icon>
        复制
      </el-button>
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
    }
  }
}
</script>

<style scoped>
.prompt-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.prompt-effect h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.description {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.prompt-content {
  position: relative;
}

.copy-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>