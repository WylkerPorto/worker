<template>
  <main>
    <label v-if="label" for="editor">{{ label }}</label>

    <div :class="{ error: error }">
      <QuillEditor v-model:content="quillContent" :placeholder="placeholder" :options="options" contentType="html" />
    </div>

    <span v-if="error">{{ error }}</span>
  </main>
</template>

<script lang="ts">
import { QuillEditor } from '@vueup/vue-quill'

export default {
  name: 'MyEditor',
  components: { QuillEditor },
  props: {
    label: String,
    placeholder: String,
    modelValue: String,
    error: String
  },
  emits: ['update:modelValue'],
  data() {
    return {
      quillContent: this.modelValue || '',
      options: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }, { indent: '-1' }, { indent: '+1' }],
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
            ['blockquote', 'code-block'],
            ['link', 'formula'],
            [{ script: 'sub' }, { script: 'super' }],
            [{ direction: 'rtl' }],
            ['clean']
          ],
        },
        theme: 'snow'
      }
    }
  },
  watch: {
    // Atualiza o valor interno se o externo mudar
    modelValue(newVal) {
      if (newVal !== this.quillContent) {
        this.quillContent = newVal || ''
      }
    },
    // Emite quando o editor muda
    quillContent(newVal) {
      // Se o conteúdo for apenas o HTML "vazio" do Quill, envia string vazia
      if (newVal === '<p><br></p>' || newVal.trim() === '') {
        this.$emit('update:modelValue', '')
      } else {
        this.$emit('update:modelValue', newVal)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  span {
    color: var(--red);
    font-size: 0.8rem;
    margin-left: 15px;
  }
}
</style>

<style>
.error {
  border: 1px solid var(--red) !important;
  border-radius: 1.5rem;
}

.ql-toolbar {
  border-radius: 1.5rem 1.5rem 0 0;
}

.ql-container {
  border-radius: 0 0 1.5rem 1.5rem;
}
</style>
