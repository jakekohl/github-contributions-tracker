<script>
import { markRaw } from 'vue'
import OverviewPanel from '@/components/UserCard/OverviewPanel.vue'
import CommitsPanel from '@/components/UserCard/CommitsPanel.vue'
import PullRequestsPanel from '@/components/UserCard/PullRequestsPanel.vue'
import CodeReviewsPanel from '@/components/UserCard/CodeReviewsPanel.vue'
import IssuesPanel from '@/components/UserCard/IssuesPanel.vue'

export default {
  name: 'UserView',
  data() {
    return {
      tabs: [
        {
          title: 'Overview',
          component: markRaw(OverviewPanel),
          value: '0',
        },
        {
          title: 'Commits',
          component: markRaw(CommitsPanel),
          value: '1',
        },
        {
          title: 'Pull Requests',
          component: markRaw(PullRequestsPanel),
          value: '2',
        },
        {
          title: 'Code Reviews',
          component: markRaw(CodeReviewsPanel),
          value: '3',
        },
        {
          title: 'Issues',
          component: markRaw(IssuesPanel),
          value: '4',
        },
      ],
      isLoading: false,
    }
  },
  methods: {
    async loadUserStats() {
      this.isLoading = true
      // Simulate an API call
      setTimeout(() => {
        this.isLoading = false
        console.log('User stats loaded')
      }, 1000)
    },
  },
  created() {
    this.loadUserStats()
  },
}
</script>

<template>
  <Card class="user-card">
    <template #title>
      <span class="p-mr-2">
        <Avatar size="large" class="p-mr-2 gap-2" />
        <span /> <span /> <span />
        <span class="p-mr-2 gap-2">USERNAME GOES HERE</span>
        <span /> <span /> <span />
        <span class="p-mr-2 gap-2">
          <Button icon="pi pi-sync" aria-label="Sync" size="small" rounded raised @click="" />
        </span>
        <h2 class="p-mr-2">Your Stats</h2>
      </span>
    </template>
    <template #content>
      <Tabs value="0" @change="loadUserStats">
        <TabList>
          <Tab v-ripple v-for="tab in tabs" :key="tab.title" :value="tab.value">{{
            tab.title
          }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value" :aria-label="tab.title">
            <ProgressSpinner v-if="isLoading" />
            <component v-else :is="tab.component" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
  </Card>
</template>

<style scoped>
.user-card {
  position: fixed;
  width: 100%;
  top: 7%;
  left: 0;
}
</style>
