<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>关于我们</h4>
        <p>提示词汇总网站专注于收集和分享各类高质量的AI提示词，帮助用户更好地使用AI工具。</p>
      </div>
      <div class="footer-section">
        <h4>联系方式</h4>
        <p class="contact-item">
          <span class="contact-label">广告联系：</span>
          <span>ad@promptcollection.com</span>
        </p>
        <p class="contact-item">
          <span class="contact-label">合作联系：</span>
          <span>partner@promptcollection.com</span>
        </p>
      </div>
      <div class="footer-section">
        <h4>法律信息</h4>
        <p class="contact-item">
          <span class="contact-label">备案信息：</span>
          <span>京ICP备12345678号</span>
        </p>
        <p class="contact-item">
          <span class="contact-label">网站声明：</span>
          <span>本站内容仅供参考，版权归原作者所有。</span>
        </p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2023 提示词汇总网站. 保留所有权利.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #f5f7fa;
  padding: 30px 0;
  margin-top: 40px;
  border-top: 1px solid #e4e7ed;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
}

.footer-section h4 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.footer-section p {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 10px;
}

.contact-item {
  display: flex;
  flex-direction: column;
}

.contact-label {
  font-weight: 500;
  margin-right: 5px;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
  color: #909399;
  font-size: 14px;
}
</style>