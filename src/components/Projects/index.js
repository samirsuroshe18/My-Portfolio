import { useState } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'
import OpenSourceCard from '../Cards/OpenSourceCard'
import HackathonCard from '../Cards/HackathonCard'

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState('all');
  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From web apps to android apps. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup >
          {toggle === 'all' ?
            <ToggleButton active value="all" onClick={() => setToggle('all')}>All</ToggleButton>
            :
            <ToggleButton value="all" onClick={() => setToggle('all')}>All</ToggleButton>
          }
          <Divider />
          {toggle === 'web app' ?
            <ToggleButton active value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
            :
            <ToggleButton value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
          }
          <Divider />
          {toggle === 'android app' ?
            <ToggleButton active value="android app" onClick={() => setToggle('android app')}>MOBILE APP'S</ToggleButton>
            :
            <ToggleButton value="android app" onClick={() => setToggle('android app')}>MOBILE APP'S</ToggleButton>
          }
          <Divider />
          {toggle === 'hackathon' ?
            <ToggleButton active value="hackathon" onClick={() => setToggle('hackathon')}>HACKATHON</ToggleButton>
            :
            <ToggleButton value="hackathon" onClick={() => setToggle('hackathon')}>HACKATHON</ToggleButton>
          }
          <Divider />
          {toggle === 'open-source' ?
            <ToggleButton active value="open-source" onClick={() => setToggle('open-source')}>OPEN-SRC CONTRIBUTION</ToggleButton>
            :
            <ToggleButton value="open-source" onClick={() => setToggle('open-source')}>OPEN-SRC CONTRIBUTION</ToggleButton>
          }
        </ToggleButtonGroup>
        <CardContainer>
          {projects
            .filter((project) => toggle === 'all' || project.category === toggle)
            .map((project) => {
              if (project.category === 'hackathon') {
                return <HackathonCard key={project.id} hackathon={project} openModal={openModal} setOpenModal={setOpenModal} />
              } else if (project.category === 'open-source') {
                return <OpenSourceCard key={project.id} contribution={project} openModal={openModal} setOpenModal={setOpenModal} />
              } else {
                return <ProjectCard key={project.id} project={project} openModal={openModal} setOpenModal={setOpenModal} />
              }
            })}
        </CardContainer>
      </Wrapper>
    </Container>
  );
}

export default Projects