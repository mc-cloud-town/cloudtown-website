import { Card, Col, Row } from 'antd';
import styled, { keyframes } from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import useAnimateOnScroll from '@/hooks/useAnimateOnScroll.ts';
import { IMember } from '@/types/IMember.ts';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FullBodyImage = styled(LazyLoadImage)`
  width: 100%;
  @media (max-width: 400px) {
    display: none;
  }
`;

const HeadImage = styled(LazyLoadImage)`
  width: 100%;
  display: none;
  
  @media (max-width: 400px) {
    display: block;
  }
`;

const StyledCard = styled(Card)`
  opacity: 0;
  background-color: transparent;
  
  &.fadeIn {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;

  & > span > img {
    width: 100%;
  }
`;

const MemberCard = (
  {
    member,
  }: {
    member: IMember;
  }) => {
  const { animate,  ref} = useAnimateOnScroll();

  const fullBodyUrl = 'https://mineskin.eu/armor/body/';
  const headUrl = 'https://mineskin.eu/helm/';
  const introduction = member.introduction?.length === 0 || false ? undefined : member.introduction;

  return (
    <StyledCard ref={ref} className={animate ? 'fadeIn' : ''}>
      <Row gutter={[16, 16]} align="middle">
        <Col span={6}>
          <ImageWrapper>
            <FullBodyImage
              src={`${fullBodyUrl}${member.uuid}/100.png`}
              alt={member.name + ' full body'}
              effect="blur"
            />
            <HeadImage
              src={`${headUrl}${member.uuid}/100.png`}
              alt={member.name + ' head'}
              effect="blur"
            />
          </ImageWrapper>
        </Col>
        <Col span={18}>
          <Card.Meta title={`${member.name ?? member.id} (${member.id})`} description={introduction} />
        </Col>
      </Row>
    </StyledCard>
  );
};

export default MemberCard;
