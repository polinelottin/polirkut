import React from 'react';
import PropTypes from 'prop-types';
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

ProfileSidebar.propTypes = {
  user: PropTypes.string.isRequired,
};

const ProfileRelations = ({ title, items }) => {
  const MAX_TO_HOW = 6;

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {`${title} (${items.length})`}
      </h2>
      <ul>
        {items.map(({id, title, image, url}, index) => {
          if(index < MAX_TO_HOW) {
            return (
              <li key={id}>
                <a href={url ? url : ''}>
                  <img
                    style={{ borderRadius: '8px' }}
                    src={image ? image : 'https://github.com/30x30.png'}
                  />
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

ProfileRelations.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
};


export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: 'asdasdasd',
    title: 'Alurakut',
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
    image: `https://github.com/${user}.png`,
  }));

  const handleCreateComunidade = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const comunidade = {
      id: new Date().toISOString(),
      title: formData.get('title'),
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
