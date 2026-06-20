import { computed } from 'vue'

import { harborCrew, harborRecords, harborWindows } from '../data/harborData'

export function useHarborMetrics() {
  const totalWindows = computed(() => harborWindows.length)
  const pendingRecords = computed(
    () => harborRecords.filter((item) => item.status === 'pending').length,
  )
  const recheckRecords = computed(
    () => harborRecords.filter((item) => item.status === 'recheck').length,
  )
  const activeInspectors = computed(() => harborCrew.length)

  const recheckList = computed(() =>
    harborRecords.filter((item) => item.status === 'recheck'),
  )

  const pendingList = computed(() =>
    harborRecords.filter((item) => item.status === 'pending'),
  )

  const nightReviewTotal = computed(
    () => recheckRecords.value + pendingRecords.value,
  )

  const tasksByAssignee = computed(() => {
    const allTasks = [...recheckList.value, ...pendingList.value]
    const grouped = {}
    allTasks.forEach((task) => {
      if (!grouped[task.assignee]) {
        grouped[task.assignee] = { recheck: 0, pending: 0, total: 0 }
      }
      if (task.status === 'recheck') {
        grouped[task.assignee].recheck++
      } else {
        grouped[task.assignee].pending++
      }
      grouped[task.assignee].total++
    })
    return grouped
  })

  return {
    totalWindows,
    pendingRecords,
    recheckRecords,
    activeInspectors,
    recheckList,
    pendingList,
    nightReviewTotal,
    tasksByAssignee,
  }
}
