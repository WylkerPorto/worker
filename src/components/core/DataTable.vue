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
          <th v-for="(column, index) in columns" :key="index">{{ column.title }}</th>
          <th v-if="$slots['actions']">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="(column, colIndex) in columns" :key="colIndex">{{ item[column.key] }}</td>
          <td v-if="$slots['actions']">
            <slot name="actions" :item="item"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script lang="ts">
import SearchInput from './SearchInput.vue'

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
  },
  components: {
    SearchInput,
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
  justify-content: space-between;
  flex-direction: column;

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
        }
      }
    }
  }
}
</style>
