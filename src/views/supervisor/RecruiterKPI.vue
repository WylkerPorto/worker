<template>
  <main class="main">
    <header>
      <div>
        <h1>Dashboard</h1>
        <p class="subtitle">
          Dados de: {{ moment(range?.from).format('DD/MM/YYYY') }} a
          {{ moment(range?.to).format('DD/MM/YYYY') }}
        </p>
        <RouterLink :to="{ name: 'recruiterController' }"> Visão global </RouterLink>
      </div>
      <div class="select">
        <MySelect
          v-model="period"
          :options="[
            { title: 'Hoje', id: 'today' },
            { title: 'Últimos 7 dias', id: 'last_7_days' },
            { title: 'Últimos 30 dias', id: 'last_30_days' },
            { title: 'Mês atual', id: 'current_month' },
            { title: 'Mês anterior', id: 'previous_month' },
          ]"
        />
      </div>
    </header>

    <section v-if="loading" class="loading">
      <Icon icon="eos-icons:loading" />
    </section>

    <section class="kpi-cards" v-else>
      <div class="card">
        <h4>Vagas Criadas</h4>
        <p>{{ kpiData?.vacanciesCreated }}</p>
        <span
          :class="comparasionData?.deltas?.vacanciesCreated.deltaPercent >= 0 ? 'success' : 'false'"
        >
          <Icon icon="formkit:arrowup" v-if="comparasionData?.deltas.vacanciesCreated.delta > 0" />
          <Icon
            icon="formkit:arrowdown"
            v-else-if="comparasionData?.deltas.vacanciesCreated.delta < 0"
          />
          {{ comparasionData?.deltas.vacanciesCreated.deltaPercent || 0 }} vs mês anterior
        </span>
      </div>
      <div class="card">
        <h4>Vagas Publicadas</h4>
        <p>{{ kpiData?.vacanciesPublished }}</p>
        <span
          :class="
            comparasionData?.deltas?.vacanciesPublished.deltaPercent >= 0 ? 'success' : 'false'
          "
        >
          <Icon
            icon="formkit:arrowup"
            v-if="comparasionData?.deltas.vacanciesPublished.delta > 0"
          />
          <Icon
            icon="formkit:arrowdown"
            v-else-if="comparasionData?.deltas.vacanciesPublished.delta < 0"
          />
          {{ comparasionData?.deltas.vacanciesPublished.deltaPercent || 0 }} vs mês anterior
        </span>
      </div>
      <div class="card">
        <h4>Candidaturas</h4>
        <p>{{ kpiData?.applicationsSubmitted }}</p>
        <span
          :class="
            comparasionData?.deltas?.applicationsSubmitted.deltaPercent >= 0 ? 'success' : 'false'
          "
        >
          <Icon
            icon="formkit:arrowup"
            v-if="comparasionData?.deltas.applicationsSubmitted.delta > 0"
          />
          <Icon
            icon="formkit:arrowdown"
            v-else-if="comparasionData?.deltas.applicationsSubmitted.delta < 0"
          />
          {{ comparasionData?.deltas.applicationsSubmitted.deltaPercent || 0 }} vs mês anterior
        </span>
      </div>
      <div class="card">
        <h4>Candidatos Únicos</h4>
        <p>{{ kpiData?.uniqueApplicants }}</p>
        <span
          :class="comparasionData?.deltas?.uniqueApplicants.deltaPercent >= 0 ? 'success' : 'false'"
        >
          <Icon icon="formkit:arrowup" v-if="comparasionData?.deltas.uniqueApplicants.delta > 0" />
          <Icon
            icon="formkit:arrowdown"
            v-else-if="comparasionData?.deltas.uniqueApplicants.delta < 0"
          />
          {{ comparasionData?.deltas.uniqueApplicants.deltaPercent || 0 }} vs mês anterior
        </span>
      </div>
      <div class="card">
        <h4>Pausadas</h4>
        <p>{{ kpiData?.vacanciesPaused }}</p>
        <span
          :class="comparasionData?.deltas?.vacanciesPaused.deltaPercent >= 0 ? 'success' : 'false'"
        >
          <Icon icon="formkit:arrowup" v-if="comparasionData?.deltas.vacanciesPaused.delta > 0" />
          <Icon
            icon="formkit:arrowdown"
            v-else-if="comparasionData?.deltas.vacanciesPaused.delta < 0"
          />
          {{ comparasionData?.deltas.vacanciesPaused.deltaPercent || 0 }} vs mês anterior
        </span>
      </div>
      <div class="card">
        <h4>Retomadas</h4>
        <p>{{ kpiData?.vacanciesResumed }}</p>
        <span
          :class="comparasionData?.deltas?.vacanciesResumed.deltaPercent >= 0 ? 'success' : 'false'"
        >
          <Icon icon="formkit:arrowup" v-if="comparasionData?.deltas.vacanciesResumed.delta > 0" />
          <Icon
            icon="formkit:arrowdown"
            v-else-if="comparasionData?.deltas.vacanciesResumed.delta < 0"
          />
          {{ comparasionData?.deltas.vacanciesResumed.deltaPercent || 0 }} vs mês anterior
        </span>
      </div>
      <div class="card">
        <h4>Canceladas</h4>
        <p>{{ kpiData?.vacanciesCancelled }}</p>
        <span
          :class="
            comparasionData?.deltas?.vacanciesCancelled.deltaPercent >= 0 ? 'success' : 'false'
          "
        >
          <Icon
            icon="formkit:arrowup"
            v-if="comparasionData?.deltas.vacanciesCancelled.delta > 0"
          />
          <Icon
            icon="formkit:arrowdown"
            v-else-if="comparasionData?.deltas.vacanciesCancelled.delta < 0"
          />
          {{ comparasionData?.deltas.vacanciesCancelled.deltaPercent || 0 }} vs mês anterior
        </span>
      </div>
      <div class="card">
        <h4>Finalizadas</h4>
        <p>{{ kpiData?.vacanciesFinalized }}</p>
        <span
          :class="
            comparasionData?.deltas?.vacanciesFinalized.deltaPercent >= 0 ? 'success' : 'false'
          "
        >
          <Icon
            icon="formkit:arrowup"
            v-if="comparasionData?.deltas.vacanciesFinalized.delta > 0"
          />
          <Icon
            icon="formkit:arrowdown"
            v-else-if="comparasionData?.deltas.vacanciesFinalized.delta < 0"
          />
          {{ comparasionData?.deltas.vacanciesFinalized.deltaPercent || 0 }} vs mês anterior
        </span>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import { getRecruiterKPI } from '@/api/recruiter'
import MySelect from '@/components/core/MySelect.vue'
import { Icon } from '@iconify/vue'
import moment from 'moment'

export default {
  name: 'SuperRecruiterKPI',
  components: {
    MySelect,
    Icon,
  },
  data() {
    return {
      moment,
      chartData: null,
      comparasionData: null,
      recruiter: null,
      kpiData: null,
      range: null,
      period: 'today' as
        | `today`
        | `last_7_days`
        | `last_30_days`
        | `current_month`
        | `previous_month`,
      loading: false,
    }
  },
  watch: {
    period() {
      this.getRecruiterKPI()
    },
  },
  mounted() {
    this.getRecruiterKPI()
  },
  methods: {
    async getRecruiterKPI() {
      this.loading = true
      try {
        const { data } = await getRecruiterKPI(this.period, this.$route.query.recruiterId as string)
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
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 20px;

    h1 {
      font-size: 24px;
      margin-bottom: 5px;
    }

    .subtitle {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
    }

    .select {
      width: 200px;
    }
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;

    svg {
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }
  }

  .kpi-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
    max-width: 1200px;

    .card {
      flex: 0 0 calc(25% - 20px);
      min-width: 260px;
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      gap: 0px;

      h4 {
        font-size: 16px;
        margin-bottom: 5px;
        color: #7e7e7e;
      }

      p {
        font-size: 40px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      span {
        font-size: 12px;
        padding: 5px;
        width: fit-content;

        svg {
          width: 16px;
          height: 16px;
        }

        &.success {
          background-color: #d0ffe7;
          color: #569c6c;
        }

        &.false {
          background-color: #fddcdc;
          color: #ad3438;
        }
      }
    }
  }
}
</style>
