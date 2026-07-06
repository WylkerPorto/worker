<template>
  <main>
    <!-- header section start -->
    <header id="navbar">
      <div class="container">
        <div class="logo">
          <img src="/assets/imgs/Logo SCA.png" alt="logo" />
          <h2>Santa Casa de Araraquara</h2>
        </div>
        <RouterLink :to="{ name: 'login' }">Área do Candidato</RouterLink>
      </div>
    </header>
    <!-- end header section -->

    <!-- banner section -->
    <section id="inicio">
      <div class="content">
        <span class="pills">Portal de carreiras · Santa Casa</span>
        <h1>Cuidar de vidas transforma o mundo.</h1>
        <p>
          Sua carreira pode crescer com a gente. Conheça as oportunidades disponíveis e faça parte
          de uma instituição movida por excelência, humanização e compromisso.
        </p>
      </div>
      <div class="centralizer">
        <img src="/assets/imgs/Logo SCA.png" alt="logo" />
      </div>
    </section>
    <!-- end banner section -->

    <!-- visão section -->
    <section id="visao">
      <div class="container">
        <h2>Santa Casa de Araraquara</h2>
        <article class="card">
          <p><b>CUIDAR DE VIDAS TRANSFORMA O MUNDO, E SUA CARREIRA PODE CRESCER COM A GENTE!</b></p>
          <p>
            Construir a sua trajetória na Santa Casa de Araraquara começa agora. Somos movidos pelo
            propósito de cuidar de vidas com excelência, humanização e compromisso, e acreditamos
            que grandes histórias profissionais nascem em ambientes onde propósito e desenvolvimento
            caminham juntos.
          </p>
          <p>
            Aqui, cada pessoa faz a diferença. Mais do que um hospital, somos uma instituição
            centenária que impacta diariamente a vida de milhares de pessoas, promovendo saúde,
            acolhimento e transformação social. Fazer parte da Santa Casa é integrar um time
            comprometido, que trabalha com empatia, inovação, ética e espírito colaborativo.
          </p>
          <p>
            Aqui, você encontra oportunidades para desenvolver sua carreira em uma instituição
            sólida, reconhecida e movida por um propósito maior: cuidar de pessoas. São os talentos
            que fazem a nossa história acontecer todos os dias, e podem ajudar a escrever os
            próximos capítulos.
          </p>
        </article>
      </div>
    </section>
    <!-- end visão section -->

    <!-- vagas section -->
    <section id="vagas">
      <div class="container">
        <h2>
          Se você quer acompanhar o nosso movimento de crescimento e evoluir na sua carreira, venha
          fazer parte do nosso time! Confira abaixo as vagas disponíveis:
        </h2>

        <form @submit.prevent="handleSearch">
          <FormInput
            label="Busca de vagas"
            type="text"
            placeholder="Digite o nome da vaga"
            v-model="search"
          />

          <div class="flex">
            <MySelect
              v-if="departmentList.length > 0"
              label="Departamento"
              :options="departmentList"
              v-model="departmentId"
            />
            <MySelect
              v-if="positionList.length > 0"
              label="Cargo"
              :options="positionList"
              v-model="positionId"
            />
          </div>

          <div class="flex">
            <FormInput label="Cidade" type="text" placeholder="São Paulo" v-model="city" />
            <FormInput label="Estado" type="text" placeholder="SP" v-model="state" />
            <MyButton class="btn success" type="submit" :loading="loading">Filtrar</MyButton>
          </div>
        </form>

        <div class="flex">
          <p>Exibindo vagas públicas disponíveis</p>
          <p>Use o botão de visualização para acessar os detalhes da vaga</p>
        </div>

        <DataTable
          :items="vagas"
          :columns="columns"
          :loading="loading"
          :totalItems="total"
          :totalPage="totalPage"
          :showFilter="false"
          :currentPage="page"
          @onNextPage="handleLoadmore(+1)"
          @onPreviousPage="handleLoadmore(-1)"
        >
          <template #actions="{ item }">
            <RouterLink
              class="rounded primary"
              :to="{ name: 'jobDetail', params: { slug: item.slug } }"
              target="_blank"
              title="Ver Vaga"
            >
              <Icon icon="mdi:eye" />
            </RouterLink>
          </template>
        </DataTable>
      </div>
    </section>
    <!-- end vagas section -->

    <!-- talent bank section -->
    <section id="bank">
      <div class="container">
        <p>Não encontrou a vaga que procurava? Participe do nosso banco de talentos!</p>
        <RouterLink :to="{ name: 'register' }">Participar do banco de talentos</RouterLink>
      </div>
    </section>
    <!-- end talent bank section -->

    <!-- gallery section -->

    <section id="gallery">
      <div class="container">
        <div class="header">
          <h3>Pessoas que fazem a diferença todos os dias</h3>
          <p>
            Acreditamos que grandes resultados nascem de pessoas comprometidas, acolhedoras e
            alinhadas com o propósito de cuidar.
          </p>
        </div>

        <div class="grid">
          <article class="people-card" v-for="person in peopleGallery" :key="person.title">
            <div
              class="image"
              :style="{ backgroundImage: 'url(' + person.image + ')' }"
              role="img"
              :aria-label="person.title"
            ></div>
            <div class="content">
              <strong>{{ person.title }}</strong>
              <span>{{ person.text }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
    <!-- end gallery section -->

    <!-- footer section -->
    <section id="footer">
      <div class="container">
        <p>Powered by Kliklabs {{ new Date().getFullYear() }}. Todos os direitos reservados.</p>
      </div>
    </section>
    <!-- end footer section -->

    <!-- lgpd section -->
    <section v-if="lgpd" id="lgpd">
      <div>
        <div>
          <strong>Política de Privacidade e Cookies</strong>
          <span>
            Nós da <b><i>KlikTalent</i></b> levamos a sua privacidade a sério e estamos
            comprometidos em proteger os seus dados pessoais conforme a LGPD.
          </span>
        </div>
        <button class="btn primary" @click="setLgpd">Ok</button>
      </div>
    </section>
    <!-- end lgpd section -->
  </main>
</template>

<script lang="ts">
import { list as getDepartments } from '@/api/department'
import { list as getPositions } from '@/api/position'
import { publicList } from '@/api/vacancy'
import DataTable from '@/components/core/DataTable.vue'
import FormInput from '@/components/core/FormInput.vue'
import MyButton from '@/components/core/MyButton.vue'
import MySelect from '@/components/core/MySelect.vue'
import { type IVacancyColumnItem, type IVacancyItem } from '@/interfaces/IVacancy'
import { Icon } from '@iconify/vue'

export default {
  name: 'HomeView',
  components: { Icon, DataTable, MySelect, FormInput, MyButton },
  data() {
    return {
      lgpd: false,
      loading: false,
      form: {} as IVacancyItem,
      columns: [
        { key: 'title', title: 'Título' },
        { key: 'employmentType', title: 'Tipo' },
        { key: 'expirationDate', title: 'Validade', type: 'date' },
      ] as IVacancyColumnItem[],
      vagas: [] as IVacancyItem[],
      departmentList: [] as { id: string; title: string }[],
      positionList: [] as { id: string; title: string }[],
      total: 0,
      page: 1,
      totalPage: 0,
      search: '',
      city: '',
      state: '',
      departmentId: null,
      positionId: null,
      peopleGallery: [
        {
          image:
            'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
          title: 'Cuidado com propósito',
          text: 'Profissionais que atuam com dedicação, empatia e compromisso com a vida.',
        },
        {
          image:
            'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
          title: 'Trabalho em equipe',
          text: 'A colaboração entre pessoas é essencial para entregar excelência todos os dias.',
        },
        {
          image:
            'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
          title: 'Desenvolvimento profissional',
          text: 'Valorizamos talentos que desejam crescer e evoluir em sua trajetória profissional.',
        },
        {
          image:
            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
          title: 'Humanização no atendimento',
          text: 'Nosso ambiente é construído por pessoas que acolhem, apoiam e transformam realidades.',
        },
      ],
    }
  },
  mounted() {
    const lgpd = localStorage.getItem('lgpd')
    if (!lgpd) {
      this.lgpd = true
    }
    // this.getFilters()
    this.getVacancies()
  },
  methods: {
    setLgpd() {
      localStorage.setItem('lgpd', 'true')
      this.lgpd = false
    },
    async getFilters() {
      this.loading = true
      try {
        const [departments, positions] = await Promise.all([getDepartments(), getPositions()])
        this.departmentList = departments.data?.map((dept: { id: string; name: string }) => ({
          id: dept.id,
          title: dept.name,
        }))
        this.positionList = positions.data?.map((pos: { id: string; name: string }) => ({
          id: pos.id,
          title: pos.name,
        }))
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
    async getVacancies() {
      this.loading = true
      try {
        const { data } = await publicList(this.filters)
        this.vagas = data.vacancies
        this.total = data.total
        this.totalPage = data.totalPages
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.page = 1
      this.vagas = []
      this.getVacancies()
    },
    handleLoadmore(pageChange: number) {
      this.page += pageChange
      this.getVacancies()
    },
  },
  computed: {
    filters() {
      return {
        page: this.page,
        search: this.search,
        city: this.city,
        state: this.state,
        departmentId: this.departmentId,
        positionId: this.positionId,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  :not(#navbar) {
    .container {
      width: min(1180px, calc(100% - 48px));
      margin: 0 auto;
      padding-top: 100px;
      padding-bottom: 100px;

      h2 {
        font-weight: 700;
        font-style: Bold;
        font-size: 40px;
        line-height: 40px;
        letter-spacing: 0%;
        text-align: center;
        color: #111827;
        margin-bottom: 30px;
      }
    }
  }

  #navbar,
  #visao,
  #tecnologias {
    background: #fff;
  }

  #vagas,
  #sobre {
    background: #ebf1f2;
  }

  #navbar {
    padding: 15px;

    .container {
      max-width: 1440px;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .logo {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
          width: 40px;
          height: auto;
          margin-right: 10px;
        }

        h2 {
          font-weight: 800;
          font-size: 22px;
          line-height: 1.1;
          letter-spacing: -0.045em;
        }
      }

      a {
        border-radius: 999px;
        border: 1px solid var(--blue);
        padding: 10px 20px;
        font-size: 16px;
        font-weight: 750;
        line-height: 100%;
        letter-spacing: 0%;
      }
    }
  }

  #inicio {
    position: relative;
    min-height: 430px;
    background-image:
      linear-gradient(
        90deg,
        rgba(19, 41, 61, 0.76),
        rgba(19, 41, 61, 0.3) 50%,
        rgba(19, 41, 61, 0.08)
      ),
      url('/assets/imgs/SCA.jpeg');
    background-size: cover;
    background-position: initial;
    display: flex;
    align-items: center;
    overflow: visible;

    .content {
      width: min(1180px, calc(100% - 48px));
      margin-left: 35px;
      padding: 72px 0 86px;
      color: white;
      max-width: 600px;

      span {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: var(--link);
        border: 1px solid var(--grey);
        border-radius: 999px;
        padding: 8px 12px;
        margin-bottom: 16px;
        font-size: 13px;
        font-weight: 800;
        backdrop-filter: blur(8px);
      }

      h1 {
        margin: 0 0 14px;
        font-size: clamp(40px, 5vw, 64px);
        line-height: 0.98;
        letter-spacing: -0.07em;
      }

      p {
        margin: 0;
        font-size: 18px;
        line-height: 1.55;
        color: var(--white);
        max-width: 640px;
      }
    }

    .centralizer {
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translate(-50%, -50%);
      display: flex;
      background-color: var(--white);
      box-shadow:
        var(--text) 0px 6px 12px -2px,
        var(--black) 0px 3px 7px -3px;
      padding: 0.75rem;
      border-radius: 1rem;

      img {
        width: 100px;
        height: auto;
      }
    }
  }

  #visao {
    .container {
      .card {
        border: 1px solid var(--glass);
        border-radius: 26px;
        padding: 34px 38px;
        box-shadow: 0 6px 15px var(--grey);
        max-width: 1040px;
        margin: 0 auto;

        &::before {
          content: '';
          position: absolute;
          left: -1px;
          top: 28px;
          bottom: 28px;
          width: 5px;
          border-radius: 999px;
          background: var(--red);
        }

        p {
          font-weight: 400;
          font-style: Regular;
          font-size: 20px;
          line-height: 28px;
          letter-spacing: 0%;
          text-align: left;
          color: #4b5563;
          margin-bottom: 10px;
          text-wrap: balance;

          b {
            font-weight: 600;
          }
        }
      }
    }
  }

  #vagas {
    h2 {
      max-width: 980px;
      margin: 0 auto;
      font-size: clamp(24px, 3vw, 34px) !important;

      &::before {
        content: '';
        display: block;
        width: 72px;
        height: 4px;
        border-radius: 999px;
        background: var(--red);
        margin: 0 auto 18px;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 15px;
      background: var(--white);
      border: 1px solid var(--glass);
      border-radius: 26px;
      padding: 22px;
      box-shadow: 0 6px 15px var(--grey);

      .flex {
        display: flex;
        gap: 1rem;

        main {
          flex: 1;

          label {
            font-weight: 600;
          }
        }

        button {
          align-self: flex-end;
        }
      }
    }

    .container > .flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px auto;

      p {
        font-weight: 400;
        font-style: Regular;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0%;
        color: #4b5563;
      }
    }

    .data-table {
      background: var(--white);
      border-radius: 24px;
      box-shadow: 0 0px 5px var(--grey);

      .actions {
        button,
        a {
          padding: 5px;
          border: none;
          display: flex;

          .iconify {
            font-size: 15px;
          }
        }
      }
    }
  }

  #bank {
    margin-bottom: 15px;

    .container {
      background: var(--white);
      border-radius: 24px;
      padding: 34px 24px 38px;
      text-align: center;
      border: 1px solid rgba(31, 127, 191, 0.18);
      border-top-width: 1px;
      border-top-style: solid;
      border-top-color: rgba(31, 127, 191, 0.18);
      border-top: 4px solid var(--red);
      box-shadow: 0 10px 28px var(--grey);

      p {
        margin: 0 0 22px;
        color: var(--text);
        font-size: 20px;
        line-height: 1.45;
        font-weight: 500;
      }

      a {
        background: linear-gradient(135deg, var(--blue), var(--text));
        color: white;
        border-radius: 12px;
        padding: 15px 34px;
        font-size: 16px;
        font-weight: 750;
        display: inline-block;
      }
    }
  }

  #gallery {
    margin-top: 34px;
    margin-bottom: 34px;

    .header {
      text-align: center;
      max-width: 760px;
      margin: 0 auto 24px;

      h3 {
        margin: 0 0 10px;
        color: var(--navy);
        font-size: 30px;
        line-height: 1.15;
        letter-spacing: -0.04em;
        font-weight: 800;
      }

      p {
        margin: 0;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.55;
      }
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;

      article {
        background: var(--white);
        border: 1px solid var(--border);
        border-radius: 22px;
        overflow: hidden;
        box-shadow: var(--shadow-soft);

        .image {
          width: 100%;
          height: 245px;
          background-size: cover;
          background-position: center;
          display: block;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              180deg,
              rgba(19, 41, 61, 0) 45%,
              rgba(19, 41, 61, 0.24) 100%
            );
            pointer-events: none;
          }
        }

        .content {
          padding: 16px;

          strong {
            display: block;
            color: var(--navy);
            font-size: 16px;
            line-height: 1.3;
            margin-bottom: 6px;
          }

          span {
            display: block;
            color: var(--muted);
            font-size: 14px;
            line-height: 1.5;
          }
        }
      }
    }
  }

  #footer {
    background: #13293d;
    text-align: center;
    color: var(--white);

    .container {
      padding: 26px 0;
    }
  }
}

#lgpd {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  > div {
    background: var(--white);
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    gap: 20px;

    div {
      display: flex;
      flex-direction: column;

      strong {
        font-size: 22px;
      }

      strong,
      b i {
        font-weight: 600 !important;
      }
    }

    button {
      padding: 10px 20px;
      border-radius: 999px;
      align-self: flex-end;
    }
  }
}
</style>
