import { CloseRounded, GitHub, LinkedIn } from "@mui/icons-material";
import { Modal } from "@mui/material";
import { FaYoutube } from "react-icons/fa";
import styled, { css } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: top;
  justify-content: center;
  overflow-y: scroll;
  transition: all 0.5s ease;
`;

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  border-radius: 16px;
  margin: 50px 12px;
  height: min-content;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 6px 0px 6px;
  @media only screen and (max-width: 600px) {
    font-size: 24px;
    margin: 6px 6px 0px 6px;
  }
`;

const Subtitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin: 4px 6px 0px 6px;

  @media only screen and (max-width: 600px) {
    font-size: 16px;
    margin: 2px 6px 0px 6px;
  }
`;

const Date = styled.div`
  font-size: 16px;
  margin: 2px 6px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 6px;
  white-space: pre-line;
  @media only screen and (max-width: 600px) {
    font-size: 14px;
    margin: 6px 6px;
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
`;

const Label = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 6px;
  @media only screen and (max-width: 600px) {
    font-size: 16px;
    margin: 8px 6px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0px;
  @media only screen and (max-width: 600px) {
    margin: 4px 0px;
  }
`;

const Tag = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  margin: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary + 20};
  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const Members = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-wrap: wrap;
  margin: 12px 6px;
  @media only screen and (max-width: 600px) {
    margin: 4px 6px;
  }
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MemberImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  @media only screen and (max-width: 600px) {
    width: 32px;
    height: 32px;
  }
`;

const MemberName = styled.div`
  font-size: 16px;
  font-weight: 500;
  width: 200px;
  color: ${({ theme }) => theme.text_primary};
  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 12px 0px;
  gap: 12px;
  flex-wrap: wrap;
`;

const Button = styled.a`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;

  ${({ theme, variant }) => {
    switch (variant) {
      case "primary":
        return css`
          background-color: ${theme.primary};
          color: ${theme.text_primary};
          &:hover {
            background-color: ${theme.primary + 99};
          }
        `;
      case "secondary":
        return css`
          background-color: ${theme.bgLight};
          color: ${theme.text_secondary};
          &:hover {
            background-color: ${theme.bg + 99};
          }
        `;
      case "repo":
        return css`
          background-color: #24292e;
          color: white;
          &:hover {
            background-color: #000000;
          }
        `;
      case "pr":
        return css`
          background-color: ${theme.bgLight};
          color: ${theme.text_secondary};
          border: 1px solid ${theme.text_secondary + 50};
          &:hover {
            background-color: ${theme.bg};
          }
        `;
      case "youtube":
        return css`
          background-color: #ff0000;
          color: white;
          &:hover {
            background-color: #cc0000;
          }
        `;
      case "certificate":
        return css`
          background-color: ${theme.white};
          color: ${theme.primary};
          border: 1px solid ${theme.primary};
          &:hover {
            background-color: ${theme.primary + 15};
          }
        `;
      default:
        return css`
          background-color: ${theme.primary};
          color: ${theme.text_primary};
          &:hover {
            background-color: ${theme.primary + 99};
          }
        `;
    }
  }}

  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const Index = ({ openModal, setOpenModal }) => {
  const project = openModal?.project;

  if (project.category === "hackathon") {
    return (
      <Modal
        open={true}
        onClose={() => setOpenModal({ state: false, project: null })}
      >
        <Container>
          <Wrapper>
            <CloseRounded
              style={{
                position: "absolute",
                top: "10px",
                right: "20px",
                cursor: "pointer",
              }}
              onClick={() => setOpenModal({ state: false, project: null })}
            />
            <Image src={project?.image} />
            <Title>{project?.title}</Title>
            <Subtitle>{project?.organizer}</Subtitle>
            <Date>
              {project?.duration
                ? `${project.date} • ${project?.duration}`
                : project.date}
            </Date>
            <Tags>
              {project?.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Tags>
            <Desc>{project?.description}</Desc>
            {project.members && (
              <>
                <Label>Members</Label>
                <Members>
                  {project?.members.map((member, index) => (
                    <Member key={index}>
                      <MemberImage src={member.img} />
                      <MemberName>{member.name}</MemberName>
                      <a
                        href={member.github}
                        target="new"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <GitHub />
                      </a>
                      <a
                        href={member.linkedin}
                        target="new"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <LinkedIn />
                      </a>
                    </Member>
                  ))}
                </Members>
              </>
            )}
            <ButtonGroup>
              {project?.youtube && (
                <Button variant="youtube" href={project?.youtube} target="new">
                  ▶ View Hackathon
                </Button>
              )}
              {project?.certificate && (
                <Button
                  variant="certificate"
                  href={project?.certificate}
                  target="new"
                >
                  View Certificate
                </Button>
              )}
              {project?.github && (
                <Button variant="primary" href={project?.github} target="new">
                  View Code
                </Button>
              )}
            </ButtonGroup>
          </Wrapper>
        </Container>
      </Modal>
    );
  } else if (project.category === "open-source") {
    return (
      <Modal
        open={true}
        onClose={() => setOpenModal({ state: false, project: null })}
      >
        <Container>
          <Wrapper>
            <CloseRounded
              style={{
                position: "absolute",
                top: "10px",
                right: "20px",
                cursor: "pointer",
              }}
              onClick={() => setOpenModal({ state: false, project: null })}
            />
            <Image src={project?.image} />
            <Title>{project?.title}</Title>
            <Subtitle>{project?.project}</Subtitle>
            <Date>{`${project.date} • ${project?.status}`}</Date>
            <Tags>
              {project?.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Tags>
            <Desc>{project?.description}</Desc>
            <ButtonGroup>
              {project?.pullRequest && (
                <Button variant="pr" href={project?.pullRequest} target="new">
                  View PR
                </Button>
              )}
              {project?.repository && (
                <Button variant="repo" href={project?.repository} target="new">
                  View Repo
                </Button>
              )}
            </ButtonGroup>
          </Wrapper>
        </Container>
      </Modal>
    );
  } else {
    return (
      <Modal
        open={true}
        onClose={() => setOpenModal({ state: false, project: null })}
      >
        <Container>
          <Wrapper>
            <CloseRounded
              style={{
                position: "absolute",
                top: "10px",
                right: "20px",
                cursor: "pointer",
              }}
              onClick={() => setOpenModal({ state: false, project: null })}
            />
            <Image src={project?.image} />
            <Title>{project?.title}</Title>
            <Date>{project.date}</Date>
            <Tags>
              {project?.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Tags>
            <Desc>{project?.description}</Desc>
            <ButtonGroup>
              {project?.github && (
                <Button variant="primary" href={project?.github} target="new">
                  View Code
                </Button>
              )}
              {project?.youtube && (
                <Button
                  variant="youtube"
                  href={project.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube style={{ marginRight: "8px" }} /> View Demo
                </Button>
              )}
              {project?.live && (
                <Button variant="primary" href={project?.live} target="new">
                  {project.category === "android app"
                    ? "Download App"
                    : "View Live App"}
                </Button>
              )}
            </ButtonGroup>
          </Wrapper>
        </Container>
      </Modal>
    );
  }
};

export default Index;
