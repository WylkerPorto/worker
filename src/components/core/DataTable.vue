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
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="(column, colIndex) in columns" :key="colIndex">
            {{
              column?.type === 'date'
                ? toFormatDate(item[column?.key])
                : column?.type === 'boolean'
                  ? item[column?.key]
                    ? 'Ativo'
                    : 'Inativo'
                  : item[column?.key]
            }}
          </td>
          <td class="actions" v-if="$slots['actions']">
            <slot name="actions" :item="item"></slot>
          </td>
        </tr>
      </tbody>
      <tbody v-if="loading">
        <tr>
          <td :colspan="columns.length + ($slots['actions'] ? 1 : 0)">
            <Icon class="loader" icon="svg-spinners:3-dots-scale" />
          </td>
        </tr>
      </tbody>
      <tfoot v-if="loadMore">
        <tr>
          <td :colspan="columns?.length + ($slots['actions'] ? 1 : 0)">
            <MyButton v-if="!loading" class="primary" @click="$emit('onLoadMore')">
              Carregar mais
            </MyButton>
          </td>
        </tr>
      </tfoot>
    </table>
  </main>
</template>

<script lang="ts">
import SearchInput from './SearchInput.vue'
import { Icon } from '@iconify/vue'
import { toFormatDate } from '@/utils/conversors'
import MyButton from './MyButton.vue'

export default {
  name: 'DataTableComponent',
  data() {
    return {
      toFormatDate,
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
    loadMore: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SearchInput,
    Icon,
    MyButton,
  },
  emits: ['onSearch', 'onLoadMore'],
  methods: {
    handleSearch() {
      this.$emit('onSearch', this.search)
    },
  },
  computed: {
    justifyWasAction() {
      return this.total ? 'space-between' : 'end'
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
    border-spacing: 0;

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
          text-wrap: nowrap;
          overflow-x: auto;
          text-overflow: ellipsis;

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
