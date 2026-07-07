<template>
  <div>ola recruiter</div>
</template>
<script lang="ts">
import { getRecruiterKPI } from '@/api/recruiter'

export default {
  name: 'RecruiterKPI',
  data() {
    return {
      chartData: null,
      comparasionData: null,
      recruiter: null,
      kpiData: null,
      range: null,
      period: 'last_30_days' as
        | `today`
        | `last_7_days`
        | `last_30_days`
        | `current_month`
        | `previous_month`,
      loading: false,
    }
  },
  mounted() {
    this.getRecruiterKPI()
  },
  methods: {
    async getRecruiterKPI() {
      this.loading = true
      try {
        const { data } = await getRecruiterKPI(this.$route.query.recruiterId as string, this.period)
        this.chartData = data.charts
        this.comparasionData = data.comparisonPreviousMonth
        this.recruiter = data.filteredRecruiter
        this.kpiData = data.kpis
        this.range = data.range
      } catch (error) {
        console.error('Error fetching recruiter KPI:', error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
