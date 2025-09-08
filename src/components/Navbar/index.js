import React from 'react'
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink } from './NavbarStyledComponent'
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';
import styled from 'styled-components';

const ThemeToggle = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  border: 1.8px solid ${({ theme }) => theme.primary};
  padding: 8px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  transition: all 0.3s ease-in-out;
  
  :hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    transform: scale(1.05);
  }
  
  @media screen and (max-width: 768px) {
    font-size: 16px;
    padding: 6px;
    margin-left: 8px;
  }
`;

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme()
  
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='/' style={{ display: "flex", alignItems: "center", marginBottom: '20px', cursor: 'pointer' }}>
          <DiCssdeck size="3rem" /> <Span>Samir's Portfolio</Span>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={() => {
            setIsOpen(!isOpen)
          }} />
        </MobileIcon>
        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href='#skills'>Skills</NavLink>
          <NavLink href='#experience'>Experience</NavLink>
          <NavLink href='#projects'>Projects</NavLink>
          <NavLink href='#education'>Education</NavLink>
          <NavLink href='#contact'>Contact</NavLink>
        </NavItems>
        <ButtonContainer>
          <GitHubButton href={Bio.github} target="_blank">Github Profile</GitHubButton>
          <ThemeToggle onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </ThemeToggle>
        </ButtonContainer>
        {
          isOpen &&
          <MobileMenu isOpen={isOpen}>
            <MobileLink href="#about" onClick={() => {
              setIsOpen(!isOpen)
            }}>About</MobileLink>
            <MobileLink href='#skills' onClick={() => {
              setIsOpen(!isOpen)
            }}>Skills</MobileLink>
            <MobileLink href='#experience' onClick={() => {
              setIsOpen(!isOpen)
            }}>Experience</MobileLink>
            <MobileLink href='#projects' onClick={() => {
              setIsOpen(!isOpen)
            }}>Projects</MobileLink>
            <MobileLink href='#education' onClick={() => {
              setIsOpen(!isOpen)
            }}>Education</MobileLink>
            <MobileLink href='#contact' onClick={() => {
              setIsOpen(!isOpen)
            }}>Contact</MobileLink>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <GitHubButton style={{padding: '10px 16px',background: `${theme.primary}`, color: 'white',width: 'max-content'}} href={Bio.github} target="_blank">Github Profile</GitHubButton>
              <ThemeToggle onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <MdLightMode /> : <MdDarkMode />}
              </ThemeToggle>
            </div>
          </MobileMenu>
        }
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar