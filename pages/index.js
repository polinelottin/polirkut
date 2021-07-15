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
    id: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number,
    ]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

export default function Home() {
    const gitHubUser = 'polinelottin';
    const [comunidades, setComunidades] = React.useState([]);
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

        fetch(`api/comunidades`, {
            method: 'GET',
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw Error(`Ocorreu um erro :( ${response.status}`);
        }).then(response => {
            setComunidades(response.map(({ id, title, imageUrl }) => ({
                id,
                title,
                image: imageUrl,
            })))
        }).catch(error => {
            console.log(error);
            setComunidades([])
        });
    }, []);

    const handleCreateComunidade = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const comunidade = {
            title: formData.get('title'),
            imageUrl: formData.get('url'),
        };

        fetch('api/comunidades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...comunidade
            }),
        }).then(response => {
            if(response.ok){
                return response.json();
            }
            throw Error(`Ocorreu um erro :( ${response.status}`);
        }).then(response => {
            setComunidades([
                ...comunidades,
                {
                    id: response.id,
                    title: response.title,
                    image: response.imageUrl
                },
            ]);
        }).catch(error => {
            console.log(error);
        })
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
                        name="title"
                        placeholder="Qual vai ser o nome da sua comunidade?"
                        aria-label="Qual vai ser o nome da sua comunidade?"
                    />
                    </div>
                    <div>
                    <input
                        name="url"
                        placeholder="Coloque uma URL para usarmos de capa"
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
            </div>
            </MainGrid>
        </>
    )
}
