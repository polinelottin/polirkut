import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

const ProfileSidebar = (props) => (
  <Box>
      <img style={{ borderRadius: '8px' }} src={`https://github.com/${props.user}.png`}></img>
  </Box>
);

const ProfileRelations = (props) => (
  <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      Pessoas da comunidade
    </h2>
    <ul>
      {props.people.map(person => (
        <li>
          <a href={`users/${person}`} key={person}>
            <img style={{ borderRadius: '8px' }} src={`https://github.com/${person}.png`}/>
            <span>{person}</span>
          </a>
        </li>
      ))}
    </ul>
  </ProfileRelationsBoxWrapper>
);

export default function Home() {
  const gitHubUser = 'polinelottin';
  const favPeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar user={gitHubUser} />
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem vindo
          </h1>
          <OrkutNostalgicIconSet />
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelations people={favPeople} />
        <Box>
          Comunidades
        </Box>
      </div>
    </MainGrid>
    </>
  )
}
