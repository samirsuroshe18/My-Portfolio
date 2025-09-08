import styled from "styled-components";

const Card = styled.div`
  width: 330px;
  height: 520px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: 160px;
  object-fit: contain;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Project = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
`;

const Date = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary + 80};
`;

const Description = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary + 99};
  margin-top: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + 15};
  padding: 2px 8px;
  border-radius: 8px;
`;

const Links = styled.div`
  margin-top: auto;
  display: flex;
  gap: 10px;
`;

const LinkButton = styled.a`
  flex: 1;
  text-align: center;
  padding: 8px 0;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.primary};
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.primary + "cc"};
  }
`;

const OpenSourceCard = ({ contribution }) => {
  return (
    <Card>
      <Image src={contribution.image} alt={contribution.title} />
      <Details>
        <Title>{contribution.title}</Title>
        <Project>{contribution.project}</Project>
        <Date>
          {contribution.date} • {contribution.status}
        </Date>
        <Description>{contribution.description}</Description>
      </Details>

      <Tags>
        {contribution.tags?.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Tags>

      <Links>
        {contribution.pullRequest && (
          <LinkButton
            href={contribution.pullRequest}
            target="_blank"
            rel="noopener noreferrer"
          >
            View PR
          </LinkButton>
        )}
        {contribution.repository && (
          <LinkButton
            href={contribution.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Repo
          </LinkButton>
        )}
      </Links>
    </Card>
  );
};

export default OpenSourceCard;
