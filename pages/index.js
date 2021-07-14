import React from 'react';
import PropTypes from 'prop-types';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { request } from "../src/lib/datocms";
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
    id: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number,
    ]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

const COMMUNITIES_QUERY = `{
    allCommunities {
      id
      title
      _status
      _firstPublishedAt
      imageUrl
    }
    _allCommunitiesMeta(filter: {}) {
      count
    }
  }
`;

export async function getStaticProps() {
    const data = await request({
        query: COMMUNITIES_QUERY,
        variables: { limit: 6 }
    });
    const communities = data.allCommunities.map(community => ({
        id: community.id,
        title: community.title,
        image: community.imageUrl,
    }))
    return { props: { communities }};
}

export default function Home({ communities }) {
    const gitHubUser = 'polinelottin';
    const [comunidades, setComunidades] = React.useState(communities);
    const [seguidores, setSeguidores] = React.useState([]);

    React.useEffect(() => {
        fetch(`https://api.github.com/users/${gitHubUser}/followers`)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw Error(`Ocorreu um erro :( ${response.status}`);
        }).then(response => {
            setSeguidores(response.map(({ id, login, avatar_url, html_url }) => ({
                id,
                title: login,
                image: avatar_url,
                url: html_url,
            })))
        }).catch(error => {
            console.log(error);
            setSeguidores([])
        });
    }, []);

    const favPeople = [
        'juunegreiros',
        'omariosouto',
        'peas',
        'rafaballerini',
        'marcobrunodev',
        'natanaelblemos',
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
                <OrkutNostalgicIconSet confiavel={3} legal={3} sexy={3} />
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
                <ProfileRelations title="Seguidores" items={seguidores} />
                <ProfileRelations title="Comunidades" items={comunidades} />
                <ProfileRelations title="Pessoas da comunidade" items={favPeople} />
            </div>
            </MainGrid>
        </>
    )
}

Home.propTypes = {
    communities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    })).isRequired,
};
