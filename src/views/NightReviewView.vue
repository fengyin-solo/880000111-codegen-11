<script setup>
import PanelSection from '../components/common/PanelSection.vue'
import StatCard from '../components/common/StatCard.vue'
import NightReviewList from '../components/harbor/NightReviewList.vue'
import { useHarborMetrics } from '../composables/useHarborMetrics'

const { recheckList, pendingList, nightReviewTotal, recheckRecords, pendingRecords, tasksByAssignee } =
  useHarborMetrics()

const metricCards = [
  { label: '待处理任务总计', value: nightReviewTotal, tone: 'danger' },
  { label: '待复检任务', value: recheckRecords, tone: 'warn' },
  { label: '待补录任务', value: pendingRecords, tone: 'neutral' },
]

const assigneeList = Object.entries(tasksByAssignee.value).map(([name, stats]) => ({
  name,
  ...stats,
}))
</script>

<template>
  <div class="view-stack">
    <section class="hero-section">
      <div>
        <h2 class="hero-title">晚班复核清单</h2>
        <p class="hero-desc">
          自动汇总当日未闭环的复检与补录任务，帮助晚班快速接手收尾工作。
          19:00 后仅执行复核任务，不新增首检。
        </p>
      </div>
      <span class="hero-badge">19:00 - 07:00</span>
    </section>

    <section class="stats-grid">
      <StatCard
        v-for="card in metricCards"
        :key="card.label"
        :label="card.label"
        :value="card.value"
        :tone="card.tone"
      />
    </section>

    <section class="two-column" v-if="assigneeList.length > 0">
      <PanelSection title="责任人任务分布" badge="按人员统计">
        <div class="assignee-stats">
          <div
            v-for="item in assigneeList"
            :key="item.name"
            class="assignee-card"
          >
            <div class="assignee-info">
              <span class="assignee-name">{{ item.name }}</span>
              <span class="assignee-total">{{ item.total }} 项待处理</span>
            </div>
            <div class="assignee-breakdown">
              <span class="breakdown-item">
                <span class="dot dot--warn"></span>
                复检 {{ item.recheck }}
              </span>
              <span class="breakdown-item">
                <span class="dot dot--neutral"></span>
                补录 {{ item.pending }}
              </span>
            </div>
          </div>
        </div>
      </PanelSection>

      <PanelSection title="晚班操作指引" badge="注意事项">
        <ul class="guide-list">
          <li>优先处理高优先级复检任务</li>
          <li>补录数据需核对原始采样记录</li>
          <li>所有任务完成后更新状态为已封存</li>
          <li>遇异常情况及时联系当班主管</li>
          <li>23:00 前完成当日所有收尾任务</li>
        </ul>
      </PanelSection>
    </section>

    <PanelSection title="待复检任务" :badge="`${recheckList.length} 项`">
      <NightReviewList :items="recheckList" type="recheck" />
    </PanelSection>

    <PanelSection title="待补录任务" :badge="`${pendingList.length} 项`">
      <NightReviewList :items="pendingList" type="pending" />
    </PanelSection>
  </div>
</template>

<style scoped>
.view-stack {
  display: grid;
  gap: 24px;
}

.hero-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #22372f 0%, #2d4a3e 100%);
  border-radius: 24px;
  color: #f4f9f6;
}

.hero-title {
  margin: 0 0 8px;
  font-size: 1.4rem;
  font-weight: 600;
}

.hero-desc {
  margin: 0;
  color: #c4d8cd;
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 520px;
}

.hero-badge {
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  font-size: 0.85rem;
  white-space: nowrap;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.assignee-stats {
  display: grid;
  gap: 12px;
}

.assignee-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background: #f4f7f4;
  border-radius: 16px;
}

.assignee-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.assignee-name {
  font-weight: 600;
  color: #22372f;
}

.assignee-total {
  font-size: 0.85rem;
  color: #5f7670;
}

.assignee-breakdown {
  display: flex;
  gap: 16px;
}

.breakdown-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  color: #4a6259;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot--warn {
  background: #f0a830;
}

.dot--neutral {
  background: #6b8cff;
}

.guide-list {
  margin: 0;
  padding-left: 20px;
  color: #405753;
}

.guide-list li + li {
  margin-top: 10px;
}

@media (max-width: 980px) {
  .stats-grid,
  .two-column {
    grid-template-columns: 1fr;
  }

  .hero-section {
    flex-direction: column;
  }
}
</style>
