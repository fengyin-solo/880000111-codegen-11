<script setup>
import { statusMeta } from '../../utils/formatters'

defineProps({
  items: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    default: 'recheck',
  },
})
</script>

<template>
  <div class="review-list">
    <div class="review-row review-head">
      <span>船名</span>
      <span>样本标签</span>
      <span>状态</span>
      <span>责任人</span>
      <span>问题说明</span>
    </div>
    <div
      v-for="item in items"
      :key="item.sampleCode"
      class="review-row"
    >
      <span class="ship-name">{{ item.shipName }}</span>
      <span class="sample-code">{{ item.sampleCode }}</span>
      <span :class="['status-chip', `status-chip--${statusMeta(item.status).tone}`]">
        {{ statusMeta(item.status).label }}
      </span>
      <span class="assignee">{{ item.assignee }}</span>
      <span class="note">{{ item.note }}</span>
    </div>
    <div v-if="items.length === 0" class="empty-state">
      <span>暂无{{ type === 'recheck' ? '复检' : '补录' }}任务</span>
    </div>
  </div>
</template>

<style scoped>
.review-list {
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(29, 43, 42, 0.1);
}

.review-row {
  display: grid;
  grid-template-columns: 1.1fr 1fr 0.8fr 0.8fr 1.5fr;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.72);
  align-items: center;
}

.review-row + .review-row {
  border-top: 1px solid rgba(29, 43, 42, 0.08);
}

.review-head {
  background: #e6efe8;
  color: #49655d;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.76rem;
}

.ship-name {
  font-weight: 600;
  color: #22372f;
}

.sample-code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 0.9rem;
  color: #4a6259;
}

.assignee {
  color: #4a6259;
}

.note {
  color: #5f7670;
  font-size: 0.92rem;
}

.status-chip {
  display: inline-flex;
  justify-content: center;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
}

.status-chip--success {
  background: #d6efe0;
  color: #226040;
}

.status-chip--warn {
  background: #ffe9bf;
  color: #8b5e08;
}

.status-chip--neutral {
  background: #dde6f6;
  color: #35528b;
}

.empty-state {
  padding: 32px;
  text-align: center;
  color: #8aa09a;
  background: rgba(255, 255, 255, 0.72);
}

@media (max-width: 900px) {
  .review-list {
    overflow-x: auto;
  }

  .review-row {
    min-width: 820px;
  }
}
</style>
