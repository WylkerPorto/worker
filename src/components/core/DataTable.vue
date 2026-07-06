<template>
  <main class="data-table">
    <table>
      <colgroup>
        <col v-for="(column, index) in columns" :key="index" style="width: 1fr" />
        <col v-if="$slots['actions']" style="width: auto" />
      </colgroup>
      <thead>
        <tr v-if="showFilter">
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
        <template v-for="(item, index) in items" :key="index">
          <tr>
            <td v-for="(column, colIndex) in columns" :key="colIndex">
              <button
                v-if="colIndex === 0 && nested && hasNestedItems(item)"
                class="expand-toggle"
                type="button"
                @click="toggleRow(index)"
                :title="isRowExpanded(index) ? 'Recolher' : 'Expandir'"
              >
                <Icon icon="lucide:chevron-right" :class="{ 'is-open': isRowExpanded(index) }" />
              </button>
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
          <template v-if="nested && isRowExpanded(index) && hasNestedItems(item)">
            <tr v-for="(nestedItem, nestedIndex) in getNestedItems(item)" :key="nestedIndex">
              <td><Icon class="nested-indent" icon="si:down-right-fill" /></td>
              <td v-for="(column, colIndex) in nestedColumns" :key="colIndex">
                {{ getNestedCellValue(nestedItem, column) }}
              </td>
            </tr>
          </template>
        </template>
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
              <MyButton
                v-if="currentPage > 1"
                :loading="loading"
                class="light"
                @click="$emit('onPreviousPage')"
              >
                <Icon icon="icons8:left-round" />
              </MyButton>
              <MyButton class="light" disabled> {{ currentPage }} / {{ totalPage }} </MyButton>
              <MyButton
                v-if="currentPage < totalPage"
                :loading="loading"
                class="light"
                @click="$emit('onNextPage')"
              >
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
import { toFormatDate } from '@/utils/conversores'
import { Icon } from '@iconify/vue'
import MyButton from './MyButton.vue'
import SearchInput from './SearchInput.vue'

export default {
  name: 'DataTableComponent',
  data() {
    return {
      toFormatDate,
      search: '',
      expandedRows: {} as Record<number, boolean>,
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
    showFilter: {
      type: Boolean,
      default: true,
    },
    nested: {
      type: String,
      default: '',
    },
    nestedColumns: {
      type: Array,
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
    toggleRow(index: number) {
      this.expandedRows[index] = !this.expandedRows[index]
    },
    isRowExpanded(index: number) {
      return !!this.expandedRows[index]
    },
    hasNestedItems(item: unknown) {
      return this.getNestedItems(item).length > 0
    },
    getNestedItems(item: unknown): Record<string, unknown>[] {
      const record = this.toRecord(item)
      const nestedItems = record[this.nested]

      if (!Array.isArray(nestedItems)) {
        return []
      }

      return nestedItems.filter(
        (nestedItem): nestedItem is Record<string, unknown> =>
          typeof nestedItem === 'object' && nestedItem !== null,
      )
    },
    getNestedCellValue(nestedItem: Record<string, unknown>, column: unknown) {
      const key = typeof column === 'string' ? column : ''
      return key ? nestedItem[key] : ''
    },
    toRecord(value: unknown): Record<string, unknown> {
      return typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {}
    },
    getNestedValue(obj: unknown, path: string) {
      return path.split('.').reduce((acc: unknown, key: string) => {
        if (typeof acc !== 'object' || acc === null) {
          return undefined
        }

        return (acc as Record<string, unknown>)[key]
      }, obj)
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
          overflow-x: clip;
          text-overflow: ellipsis;

          .expand-toggle {
            border: none;
            background: transparent;
            cursor: pointer;
            margin-right: 0.35rem;
            display: inline-flex;
            align-items: center;
            padding: 0;

            svg {
              transition: transform 0.2s ease;
            }

            .is-open {
              transform: rotate(90deg);
            }
          }

          .nested-indent {
            font-size: 0.95rem;
          }

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
      flex-wrap: wrap;
      overflow: visible;
    }
  }
}
</style>
