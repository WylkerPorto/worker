<template>
  <main class="data-table">
    <table>
      <thead>
        <tr>
          <th :colspan="columns.length + ($slots['actions'] ? 1 : 0)">
            <section>
              <span v-if="total">#{{ total }}</span>
              <form action="#" @submit.stop.prevent="handleSearch">
                <SearchInput v-model="search" />
              </form>
            </section>
          </th>
        </tr>
        <tr class="header">
          <th v-for="(column, index) in columns" :key="index">{{ column?.title }}</th>
          <th v-if="$slots['actions']">Ações</th>
        </tr>
      </thead>
      <tbody v-if="loading">
        <tr>
          <td :colspan="columns.length + ($slots['actions'] ? 1 : 0)">
            <Icon class="loader" icon="svg-spinners:3-dots-scale" />
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="(column, colIndex) in columns" :key="colIndex">{{ item[column?.key] }}</td>
          <td class="actions" v-if="$slots['actions']">
            <slot name="actions" :item="item"></slot>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td :colspan="columns?.length + ($slots['actions'] ? 1 : 0)">
            <slot name="pagination"></slot>
          </td>
        </tr>
      </tfoot>
    </table>
  </main>
</template>

<script lang="ts">
import SearchInput from './SearchInput.vue'
import { Icon } from '@iconify/vue'

export default {
  name: 'DataTableComponent',
  data() {
    return {
      search: '',
    }
  },
  props: {
    items: {
      type: Array,
    },
    columns: {
      type: Array,
    },
    total: {
      type: Number,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SearchInput,
    Icon,
  },
  emits: ['onSearch'],
  methods: {
    handleSearch() {
      this.$emit('onSearch', this.search)
    },
  },
  computed: {
    justifyWasAction() {
      return this.total ? 'space-between' : 'center'
    },
  },
}
</script>

<style lang="scss" scoped>
main.data-table {
  display: flex;
  flex-direction: column;
  max-height: 70vh;
  overflow-y: auto;

  table {
    width: 100%;
    table-layout: fixed;
    text-align: center;

    .header {
      background: var(--text);
      color: var(--glass);

      th {
        padding: 0.5rem;
        font-size: 18px;
      }
    }

    thead {
      background: var(--glass);
      position: sticky;
      top: 0px;
      z-index: 1;

      section {
        display: flex;
        justify-content: v-bind(justifyWasAction);
        padding: 0.5rem;
        align-items: center;

        div {
          display: flex;
          align-items: center;
        }
      }
    }

    tbody {
      max-height: 50vh;
      overflow-y: auto;
      width: 100%;

      tr {
        &:nth-child(even) {
          background: var(--glass);
        }

        &:hover {
          background: var(--blue);
        }

        td {
          padding: 0.5rem;

          .loader {
            font-size: 30px;
          }
        }
      }
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
    }
  }
}
</style>
