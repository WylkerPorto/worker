<template>
  <main class="data-table">
    <table>
      <thead>
        <tr>
          <th :colspan="columns.length + ($slots['actions'] ? 1 : 0)">
            <section>
              <span v-if="totalItems">#{{ totalItems }}</span>
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
                  : getNestedValue(item, column?.key)
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
      <tfoot v-if="totalPage > 1 && !loading">
        <tr>
          <td :colspan="columns?.length + ($slots['actions'] ? 1 : 0)">

            <div class="pagination">
              <MyButton v-if="currentPage > 1" :loading="loading" class="light" @click="$emit('onPreviousPage')">
                <Icon icon="icons8:left-round" />
              </MyButton>
              <MyButton class="light" disabled>
                {{ currentPage }} / {{ totalPage }}
              </MyButton>
              <MyButton v-if="currentPage < totalPage" :loading="loading" class="light" @click="$emit('onNextPage')">
                <Icon icon="icons8:right-round" />
              </MyButton>
            </div>
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
    totalItems: {
      type: Number,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    totalPage: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  components: {
    SearchInput,
    Icon,
    MyButton,
  },
  emits: ['onSearch', 'onNextPage', 'onPreviousPage'],
  methods: {
    handleSearch() {
      this.$emit('onSearch', this.search)
    },
    getNestedValue(obj: object, path: string) {
      return path.split('.').reduce((acc, key) => acc?.[key], obj)
    },
  },
  computed: {
    justifyWasAction() {
      return this.totalItems ? 'space-between' : 'end'
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

    tfoot {
      .pagination {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 0.5rem;

        .light:not(:has(svg)) {
          cursor: text;
          pointer-events: none;
          text-wrap: nowrap;
        }

        svg {
          font-size: 25px;
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
