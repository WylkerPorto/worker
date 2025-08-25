<template>
  <main>
    <!-- header section start -->
    <header id="navbar">
      <div class="container">
        <h2>KlikTalent</h2>
        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
      </div>
    </header>
    <!-- end header section -->

    <!-- do section -->
    <section id="inicio">
      <div class="container">
        <div>
          <h1>Bem-vindo ao KlikTalent</h1>
          <p>Lorem ipsum dolor sit amet consectetur. Convallis eget interdum mauris senectus elit duis. Vitae curabitur
            aliquam amet tempus at scelerisque volutpat nulla. Elementum velit platea ut tortor mauris at laoreet nunc
            risus. Diam morbi tortor eget eu habitasse vestibulum commodo viverra. </p>
          <p>Vel libero dolor libero risus lorem non feugiat. Habitant amet ornare senectus scelerisque enim imperdiet
            consequat pharetra odio.
            Dignissim sed vulputate enim nisi. Non sem amet adipiscing enim.
          </p>
          <p>Vel libero dolor libero risus lorem non feugiat. Habitant amet ornare senectus scelerisque enim imperdiet
            consequat pharetra odio.
            Dignissim sed vulputate enim nisi. Non sem amet adipiscing enim.
          </p>
        </div>
        <figure>
          <img src="/assets/imgs/img1.svg" alt="Descrição da imagem" />
        </figure>
      </div>
    </section>
    <!-- end do section -->

    <!-- visão section -->
    <section id="visao">
      <div class="container">
        <h2>Nossa Visão</h2>
        <p>
          Acreditamos que, ao simplificar e otimizar os processos de recrutamento e cadastro de
          currículos, podemos contribuir para um mercado de trabalho mais inclusivo e conectado, onde
          tanto candidatos quanto empresas possam alcançar seus objetivos de forma ágil e
          satisfatória.
        </p>
        <p>
          Nosso compromisso é facilitar a jornada de profissionais que buscam crescimento e desafios,
          bem como ajudar empresas a encontrar os melhores talentos para fortalecer suas equipes e
          impulsionar seu sucesso.
        </p>
        <p>
          Nossa visão é ser a plataforma líder na conexão entre talentos e empresas, transformando a
          maneira como profissionais e empregadores se encontram no mercado de trabalho. Buscamos
          criar um ambiente dinâmico e inovador, onde as oportunidades sejam acessíveis a todos e a
          busca por um novo emprego ou por novos colaboradores seja mais eficiente, justa e
          transparente.
        </p>
      </div>
    </section>
    <!-- end visão section -->

    <!-- vagas section -->
    <section id="vagas">
      <div class="container">
        <h2>Vagas em Destaque</h2>
        <DataTable v-if="vagas.length > 0" :items="vagas" :columns="columns" :loading="loading" :total="total"
          :loadMore="loadMore" @onLoadMore="handleLoadMore" @onSearch="handleSearch">
          <template #actions="{ item }">
            <RouterLink class="rounded primary" :to="{ name: 'jobDetail', params: { id: item.slug } }" title="Ver Vaga">
              <Icon icon="mdi:eye" />
            </RouterLink>
          </template>
        </DataTable>
        <div v-else>
          <p>Ainda não estamos divulgando vagas.</p>
        </div>
      </div>
    </section>
    <!-- end vagas section -->

    <!-- tecnologias section -->
    <section id="tecnologias">
      <div class="container">
        <h2>O Melhor da tecnologia para você</h2>
        <figure>
          <Icon icon="logos:html-5" />
          <Icon icon="logos:css-3" />
          <Icon icon="logos:sass" />
          <Icon icon="logos:javascript" />
          <Icon icon="logos:vue" />
          <Icon icon="logos:nextjs-icon" />
          <Icon icon="logos:nodejs" />
        </figure>
        <p>
          No desenvolvimento dos nossos projetos, buscamos sempre utilizar as melhores tecnologiass e
          tecnologias para garantir um código de alta qualidade, performance e escalabilidade. Aqui
          estão algumas das tecnologias que fazemos uso para entregar soluções modernas e eficientes:
        </p>
        <ul>
          <li>
            <b>HTML5:</b> A base da estruturação de páginas web, garantindo semântica e acessibilidade
            aprimoradas para todos os dispositivos.
          </li>
          <li>
            <b>CSS3:</b> Criamos layouts responsivos e estilos incríveis, com animações e transições
            que melhoram a experiência do usuário.
          </li>
          <li>
            <b>JavaScript:</b> A linguagem de programação que traz interatividade e dinamismo para as
            páginas, permitindo funcionalidades modernas e responsivas.
          </li>
          <li>
            <b>Vue.js:</b> Usamos este poderoso framework para criar interfaces de usuário rápidas e
            reativas, com uma experiência fluida e de fácil manutenção.
          </li>
          <li>
            <b>SASS:</b> Para tornar o desenvolvimento de estilos mais modular e escalável, utilizando
            variáveis, mixins e outras funcionalidades que tornam o código CSS mais eficiente.
          </li>
          <li>
            <b>Next.js:</b> Framework React para otimizar a renderização de páginas, proporcionando
            uma excelente performance e uma experiência de usuário excepcional, além de
            funcionalidades como SEO otimizado e rotas dinâmicas.
          </li>
          <li>
            <b>Node.js:</b> Usado no backend, possibilitando o desenvolvimento de APIs rápidas e
            escaláveis, com suporte a uma vasta gama de bibliotecas e frameworks.
          </li>
        </ul>
        <p>
          Com essas tecnologias, entregamos soluções modernas, responsivas e que proporcionam uma
          experiência única aos usuários.
        </p>
      </div>
    </section>
    <!-- end tecnologias section -->

    <!-- sobre section -->
    <section id="sobre">
      <div class="container">
        <h2>Sobre nós</h2>
        <p>
          Nossa visão é ser a plataforma líder na conexão entre talentos e empresas, transformando a maneira como
          profissionais e empregadores se encontram no mercado de trabalho. Buscamos criar um ambiente dinâmico e
          inovador, onde as oportunidades sejam acessíveis a todos e a busca por um novo emprego ou por novos
          colaboradores seja mais eficiente, justa e transparente.
        </p>
        <p>
          Acreditamos que, ao simplificar e otimizar os processos de recrutamento e cadastro de currículos, podemos
          contribuir para um mercado de trabalho mais inclusivo e conectado, onde tanto candidatos quanto empresas
          possam alcançar seus objetivos de forma ágil e satisfatória.
        </p>
        <p>
          Nosso compromisso é facilitar a jornada de profissionais que buscam crescimento e desafios, bem como ajudar
          empresas a encontrar os melhores talentos para fortalecer suas equipes e impulsionar seu sucesso.
        </p>
      </div>
    </section>
    <!-- end sobre section -->

    <!-- footer section -->
    <section id="footer">
      <div class="container">
        <p>&copy; 2020 All Rights Reserved By</p>
      </div>
    </section>
    <!-- end footer section -->

    <!-- lgpd section -->
    <section v-if="lgpd" id="lgpd">
      <div>
        <h1>Política de Privacidade e Cookies</h1>
        <div>
          <p>
            Nós da <b><i>KlikTalent</i></b> levamos a sua privacidade a sério e estamos
            comprometidos em proteger os seus dados pessoais. De acordo com a Lei Geral de Proteção
            de Dados (LGPD), queremos garantir que você tenha total transparência sobre como
            tratamos suas informações.
          </p>
          <h3>Uso de Cookies</h3>
          <p>
            Para oferecer uma melhor experiência em nosso site, utilizamos cookies para armazenar e
            coletar informações sobre a navegação, como preferências de idioma, páginas visitadas e
            interações no site. Esses dados são utilizados para personalizar conteúdos, melhorar a
            performance do site e possibilitar um atendimento mais eficiente.
          </p>
          <p>
            Os cookies são pequenos arquivos armazenados no seu dispositivo que nos permitem lembrar
            suas preferências e proporcionar uma navegação mais rápida e eficiente. Caso não deseje
            que seus dados sejam coletados através de cookies, você pode ajustar as configurações do
            seu navegador para bloqueá-los ou excluí-los. No entanto, vale ressaltar que, ao
            desabilitar os cookies, algumas funcionalidades do site podem não funcionar corretamente
          </p>
          <h3>Consentimento</h3>
          <p>
            Ao acessar nosso site, você consente com o uso de cookies conforme descrito nesta
            política. Se você não concorda com o uso de cookies, pedimos que ajuste as configurações
            de seu navegador ou nos avise para que possamos fornecer mais informações ou suporte.
          </p>
          <h3>Seus Direitos</h3>
          <p>
            Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer
            momento, conforme prevê a LGPD. Para mais informações sobre como gerenciamos seus dados
            ou caso tenha alguma dúvida, entre em contato conosco por meio de nossos canais de
            atendimento.
          </p>
        </div>
        <button class="btn primary" @click="setLgpd">Ok</button>
      </div>
    </section>
    <!-- end lgpd section -->
  </main>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue'
import { type IVacancyItem, type IVacancyColumnItem } from '@/interfaces/IVacancy'
import DataTable from '@/components/core/DataTable.vue'

export default {
  name: 'HomeView',
  components: { Icon, DataTable },
  data() {
    return {
      lgpd: false,
      loading: false,
      columns: [
        { key: 'title', title: 'Vaga' },
        { key: 'employmentType', title: 'Tipo de Vaga' },
        { key: 'expirationDate', title: 'Data de Expiração', type: 'date' }
      ] as IVacancyColumnItem[],
      vagas: [] as IVacancyItem[],
      total: 0,
      page: 1,
      search: ''
    }
  },
  mounted() {
    const lgpd = localStorage.getItem('lgpd')
    if (!lgpd) {
      this.lgpd = true
    }
  },
  methods: {
    setLgpd() {
      localStorage.setItem('lgpd', 'true')
      this.lgpd = false
    },
    async getVacancies() {
      this.loading = true
      try {
        const { response } = await getVacancyPub(this.filters)
        this.vagas = response.data
        this.total = response.total
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
    handleLoadmore() {
      this.page++
      this.getVacancies()
    }
  },
  computed: {
    filters() {
      return {
        page: this.page,
        search: this.search
      }
    },
    loadMore() {
      return this.vagas.length < this.total
    }
  }
}
</script>

<style lang="scss" scoped>
main {

  :not(#navbar) {
    .container {
      padding: 100px 0;
    }
  }

  .container {
    max-width: 1440px;
    margin: auto;

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
    padding: 27px 0;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        font-weight: 500;
        font-size: 30px;
        line-height: 100%;
        letter-spacing: 0%;
      }

      a {
        border-radius: 20px;
        border: 1px solid var(--blue);
        padding: 10px 20px;
        font-weight: 500;
        font-size: 30px;
        line-height: 100%;
        letter-spacing: 0%;
      }
    }
  }

  #inicio {
    background: linear-gradient(90deg, color-mix(in srgb, var(--glass) 20%, transparent) 0%, color-mix(in srgb, var(--blue) 20%, transparent) 100%);

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      >div {
        max-width: 710px;

        h1 {
          font-weight: 500;
          font-size: 40px;
          line-height: 100%;
          letter-spacing: 0%;
          margin-bottom: 20px;
        }

        p {
          font-weight: 500;
          font-size: 20px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #4B5563;
          margin-bottom: 20px;
          text-wrap: balance;
        }
      }

      figure {
        width: 560px;
        background: var(--blue);
        height: 560px;
        border-radius: 50%;
        display: grid;
        justify-content: center;
        align-content: end;

        img {
          border-bottom-left-radius: 255px;
          border-bottom-right-radius: 255px;
        }
      }
    }
  }

  #visao {
    .container {
      p {
        font-weight: 400;
        font-style: Regular;
        font-size: 20px;
        leading-trim: NONE;
        line-height: 28px;
        letter-spacing: 0%;
        text-align: center;
        color: #4B5563;
        margin-bottom: 10px;
        text-wrap: balance;
      }
    }
  }

  #vagas {
    p {
      font-weight: 400;
      font-style: Regular;
      font-size: 20px;
      leading-trim: NONE;
      line-height: 28px;
      letter-spacing: 0%;
      text-align: center;
      color: #4B5563;
      margin-bottom: 20px;
    }
  }

  #tecnologias {
    figure {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 40px;
      margin-bottom: 50px;

      svg {
        font-size: 80px;
      }
    }

    p {
      font-weight: 400;
      font-style: Regular;
      font-size: 20px;
      leading-trim: NONE;
      line-height: 28px;
      letter-spacing: 0%;
      text-align: center;
      color: #4B5563;
      margin-bottom: 20px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      margin-bottom: 20px;

      li {
        font-weight: 400;
        font-style: Regular;
        font-size: 18px;
        leading-trim: NONE;
        line-height: 28px;
        letter-spacing: 0%;
        color: #4B5563;

        b {
          font-weight: 600;
        }
      }
    }
  }

  #sobre {
    p {
      font-weight: 400;
      font-style: Regular;
      font-size: 20px;
      leading-trim: NONE;
      line-height: 28px;
      letter-spacing: 0%;
      text-align: center;
      color: #4B5563;
    }
  }

  #footer {
    background: #13293D;
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

  >div {
    background: var(--white);
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 8px;

    h1 {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    }

    h3 {
      font-size: 20px;
      margin-top: 10px;
    }

    p {
      margin-bottom: 10px;
    }

    button {}
  }
}
</style>
