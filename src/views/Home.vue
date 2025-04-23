<template>
  <main>
    <!-- header section start -->
    <header id="navbar">
      <h2>KlikTalent</h2>
      <nav>
        <ul>
          <li>
            <a href="#inicio">Inicio</a>
          </li>
          <li>
            <a href="#sobre">Sobre</a>
          </li>
          <li>
            <a href="#tecnologias">Tecnologias</a>
          </li>
          <li>
            <a href="#visao">Visão</a>
          </li>
          <li>
            <a href="#contato">Contato</a>
          </li>
          <li>
            <a href="/#/login">Login</a>
          </li>
        </ul>
      </nav>
    </header>
    <!-- end header section -->

    <!-- do section -->
    <section id="inicio"></section>
    <!-- end do section -->

    <!-- sobre section -->
    <section id="sobre">
      <h2>Sobre nós</h2>
      <p>
        Nós somos a <b><i>KlikTalent</i></b
        >, uma plataforma digital criada para conectar talentos e empresas de forma rápida e
        eficiente. Nosso objetivo é transformar o processo de recrutamento e seleção, proporcionando
        uma experiência simples e intuitiva tanto para candidatos quanto para empresas que buscam os
        melhores profissionais.
      </p>
      <p>
        Com uma interface moderna e fácil de usar, oferecemos um espaço onde candidatos podem criar
        e cadastrar seus currículos de maneira prática, enquanto empresas podem encontrar as pessoas
        certas para suas vagas com agilidade e precisão. Nossa missão é otimizar o processo de busca
        por oportunidades de trabalho, criando uma ponte entre quem busca um novo desafio e quem
        precisa de profissionais qualificados.
      </p>
      <p>
        Acreditamos que cada talento merece uma chance, e cada empresa precisa das pessoas certas
        para crescer. Por isso, nos empenhamos em oferecer um serviço que une tecnologia e inovação
        para facilitar a conexão entre profissionais e empresas de maneira eficaz.
      </p>
      <p>
        Se você está à procura de uma nova oportunidade ou deseja cadastrar sua vaga, estamos aqui
        para ajudar a transformar sua jornada profissional. Junte-se a nós e faça parte dessa
        comunidade!
      </p>
    </section>
    <!-- end sobre section -->

    <!-- work section -->
    <section id="tecnologias">
      <h2>O Melhor da tecnologia para você</h2>
      <div>
        <Icon icon="logos:html-5" />
        <Icon icon="logos:css-3" />
        <Icon icon="logos:sass" />
        <Icon icon="logos:javascript" />
        <Icon icon="logos:vue" />
        <Icon icon="logos:nextjs-icon" />
        <Icon icon="logos:nodejs" />
      </div>
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
    </section>
    <!-- end work section -->

    <!-- visão section -->
    <section id="visao">
      <h2>Nossa Visão</h2>
      <p>
        Nossa visão é ser a plataforma líder na conexão entre talentos e empresas, transformando a
        maneira como profissionais e empregadores se encontram no mercado de trabalho. Buscamos
        criar um ambiente dinâmico e inovador, onde as oportunidades sejam acessíveis a todos e a
        busca por um novo emprego ou por novos colaboradores seja mais eficiente, justa e
        transparente.
      </p>
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
    </section>
    <!-- end visão section -->

    <!-- footer section -->
    <section id="footer">
      <p>&copy; 2020 All Rights Reserved By</p>
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
export default {
  name: 'HomeView',
  components: { Icon },
  data() {
    return {
      lgpd: false,
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
  },
}
</script>

<style lang="scss" scoped>
main {
  background: var(--white);
  color: var(--black);
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  line-height: 1.5;

  section {
    padding: 50px 40px;
    align-content: center;

    &:nth-child(even) {
      background: var(--background);
    }

    > h2 {
      text-align: center;
      margin-bottom: 20px;
    }
  }
}

#navbar {
  position: sticky;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: var(--white);
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--text);
  }

  nav {
    ul {
      display: flex;
      list-style: none;
      gap: 20px;
    }
  }
}

#inicio {
  height: 100vh;
  background: url('/assets/imgs/hero-bg.jpg') no-repeat center center/cover;
}

#tecnologias {
  div {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 20px;

    .iconify {
      font-size: 50px;
      color: var(--text);
    }
  }

  p {
    text-align: center;
    margin-bottom: 20px;
  }

  ul {
    list-style-type: none;
    margin-bottom: 20px;

    li {
      text-align: justify;

      b {
        font-weight: 600;
      }
    }
  }
}

#footer {
  text-align: center;
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
    button {
    }
  }
}
</style>
