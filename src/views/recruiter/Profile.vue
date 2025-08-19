<template>
  <section class="card">
    <header>
      <h1>Atualizar Perfil</h1>
    </header>

    <form @submit.prevent="validate">
      <FormInput label="Nome" type="text" placeholder="Digite o nome" v-model="form.name" :error="errors.name"
        required />

      <div class="flex">
        <FormInput label="E-mail" type="email" placeholder="Digite o e-mail" v-model="form.email" :error="errors.email"
          required />
        <FormInput label="Senha" type="password" placeholder="Digite a senha" v-model="form.password"
          :error="errors.password" required />
      </div>

      <MyButton class="btn success" type="submit" :loading="loading"> Salvar </MyButton>
    </form>

  </section>
</template>
<script lang="ts">
import * as yup from 'yup';
import FormInput from '@/components/core/FormInput.vue';
import MyButton from '@/components/core/MyButton.vue';
import { get, update } from '@/api/recruiter';
import { type IRecruiterForm } from '@/interfaces/IRecruiter';

export default {
  name: 'RecruiterProfile',
  components: {
    FormInput,
    MyButton
  },
  data() {
    return {
      form: {} as IRecruiterForm,
      errors: {} as IRecruiterForm,
      loading: false
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const { data } = await get(localStorage.getItem('uid'));
        this.form = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    validate() {
      const schema = yup.object({
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        password: this.form.id
          ? yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
          : yup
            .string()
            .min(6, 'Senha deve ter pelo menos 6 caracteres')
            .nullable(),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {}
          this.saveRecruiter()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async saveRecruiter() {
      this.loading = true
      try {
        delete this.form.id
        delete this.form.createdAt
        delete this.form.updatedAt

        await update(localStorage.getItem('uid'), this.form)
        this.$snotify.success(`Perfil atualizado com sucesso`)
      } catch (error) {
        this.$snotify.error('Erro ao salvar o perfil: ' + error)
      } finally {
        this.loading = false
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;

  header {
    text-align: center;

    h1 {
      margin: 0;
    }
  }

  form {
    margin-top: 2rem;

    main {
      width: 100%;
    }

    .flex {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      margin: 10px 0;
    }

    .btn {
      float: inline-end;
    }
  }
}
</style>
