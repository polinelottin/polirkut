import React from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

const ProfileSidebar = ({ user }) => (
  <Box as="aside">
    <img style={{ borderRadius: '8px' }} src={`https://github.com/${user}.png`}></img>
    <hr />
    <a className="" href={`https://github.com/${user}`}>
      @{user}
    </a>
    <hr />
    <AlurakutProfileSidebarMenuDefault />
  </Box>
);

const ProfileRelations = ({ title, items }) => {
  const MAX_TO_HOW = 6;

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {`${title} (${items.length})`}
      </h2>
      <ul>
        {items.map(({id, title, image}, index) => {
          if(index < MAX_TO_HOW) {
            return (
              <li key={id}>
                <a href={`users/${title}`}>
                  <img style={{ borderRadius: '8px' }} src={`https://github.com/${image}.png`}/>
                  <span>{title}</span>
                </a>
              </li>
            );
          }
        })
        }
      </ul>
    </ProfileRelationsBoxWrapper>
  );
};

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: 'asdasdasd',
    title: 'Alurakut',
    image: '30x30',
  }]);

  const gitHubUser = 'polinelottin';
  const favPeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ].map(user => ({
    id: user,
    title: user,
    image: user,
  }));

  const handleCreateComunidade = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const comunidade = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('url'),
    }

    setComunidades([
      ...comunidades,
      comunidade,
    ]);
  }

  return (
    <>
      <AlurakutMenu githubUser={gitHubUser} />
      <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar user={gitHubUser} />
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem vinda
          </h1>
          <OrkutNostalgicIconSet />
        </Box>
        <Box>
          <h2 className="subTitle">
            O que você deseja fazer?
          </h2>
          <form onSubmit={event => handleCreateComunidade(event)} >
            <div>
              <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
              />
            </div>
            <div>
              <input
                placeholder="Coloque uma URL para usarmos de capa"
                name="url"
                aria-label="Coloque uma URL para usarmos de capa"
              />
            </div>
            <button>
              Criar comunidade
            </button>

          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelations title="Pessoas" items={favPeople} />
        <ProfileRelations title="Comunidades" items={comunidades} />
      </div>
    </MainGrid>
    </>
  )
}
