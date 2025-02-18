<script>
// Components
import OverviewPanel from '@/components/UserCard/OverviewPanel.vue'
import CommitsPanel from '@/components/UserCard/CommitsPanel.vue'
import PullRequestsPanel from '@/components/UserCard/PullRequestsPanel.vue'
import CodeReviewsPanel from '@/components/UserCard/CodeReviewsPanel.vue'
import IssuesPanel from '@/components/UserCard/IssuesPanel.vue'

// Services
import { markRaw } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

export default {
  name: 'UserView',
  data() {
    return {
      tabs: [
        {
          title: 'Overview',
          component: markRaw(OverviewPanel),
          value: '0',
          dataTest: 'user-overview',
        },
        {
          title: 'Commits',
          component: markRaw(CommitsPanel),
          value: '1',
          dataTest: 'user-commits',
        },
        {
          title: 'Pull Requests',
          component: markRaw(PullRequestsPanel),
          value: '2',
          dataTest: 'user-pull-requests',
        },
        {
          title: 'Code Reviews',
          component: markRaw(CodeReviewsPanel),
          value: '3',
          dataTest: 'user-code-reviews',
        },
        {
          title: 'Issues',
          component: markRaw(IssuesPanel),
          value: '4',
          dataTest: 'user-issues',
        },
      ],
      isLoading: false,
      isSyncing: false,
      toast: useToast(),
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
    async syncUserStats() {
      this.toast.add({
        severity: 'info',
        summary: 'INFO: Syncing User Stats',
        detail: 'This may take a few seconds...',
        life: 3000,
      })
      this.isSyncing = true

      // Simulate an API call
      setTimeout(() => {
        this.isSyncing = false
        this.loadUserStats()
        console.log('User stats synced')
        this.toast.add({
          severity: 'success',
          summary: 'SUCCESS: User Stats Synced',
          detail: 'Reloading user stats...',
          life: 3000,
        })
      }, 5000)
    },
    routerUpdate() {
      const tab = this.tabs.find((tab) => tab.value === this.$router.currentRoute.value.query.tab)
      if (tab) {
        this.$router.push({ query: { tab: tab.value } })
      }
    },
  },
  created() {
    this.loadUserStats()
  },
}
</script>

<template>
  <Card class="user-card" data-test="user-view">
    <template #title>
      <Toast ref="toast" :autoZIndex="true" position="bottom-right" />
      <span class="p-mr-2">
        <Avatar size="large" class="p-mr-2 gap-2" data-test="user-avatar" />
        <span /> <span /> <span />
        <span class="p-mr-2 gap-2" data-test="user-handle">USERNAME GOES HERE</span>
        <span /> <span /> <span />
        <span class="p-mr-2 gap-2">
          <Button
            :icon="!isSyncing ? 'pi pi-sync' : 'pi pi-spin pi-sync'"
            aria-label="Sync"
            size="small"
            rounded
            raised
            data-test="user-sync"
            @click="syncUserStats()"
          />
        </span>
        <h2 class="p-mr-2">Your Stats</h2>
      </span>
    </template>
    <template #content>
      <Tabs value="0" @change="routerUpdate()">
        <TabList>
          <Tab
            v-ripple
            v-for="tab in tabs"
            :key="tab.title"
            :value="tab.value"
            :data-test="`user-tab-${tab.title.toLowerCase()}`"
            >{{ tab.title }}</Tab
          >
        </TabList>
        <TabPanels>
          <TabPanel
            v-for="tab in tabs"
            :key="tab.value"
            :value="tab.value"
            :aria-label="tab.title"
            :data-test="`user-tabPanel-${tab.title.toLowerCase()}`"
          >
            <BlockUI :blocked="isLoading">
              <ProgressSpinner v-if="isLoading && !isSyncing" />
              <component v-else :is="tab.component" />
            </BlockUI>
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
.p-toast {
  margin-top: 60px;
}
</style>
