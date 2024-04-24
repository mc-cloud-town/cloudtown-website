import { Card, Col, Row } from 'antd';
import styled, { css } from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import useAnimateOnScroll from '@/hooks/useAnimateOnScroll.ts';
import { IMember } from '@/types/IMember.ts';
import { fadeIn } from '@/styles/animation.ts';

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

const StyledCard = styled(Card)<{ $fadeIn: boolean }>`
  opacity: 0;
  background-color: transparent;

  ${(props) =>
    props.$fadeIn &&
    css`
      animation: ${fadeIn} 0.8s ease-out forwards;
    `};
`;

const ImageWrapper = styled.div`
  width: 100%;

  & > span > img {
    width: 100%;
  }
`;

const MemberCard = ({
  member,
  searchMode,
}: {
  member: IMember;
  searchMode: boolean;
}) => {
  const { animate, ref } = useAnimateOnScroll();

  const fullBodyUrl = 'https://mineskin.eu/armor/body/';
  const headUrl = 'https://mineskin.eu/helm';
  const introduction =
    member.introduction?.length === 0 || false
      ? undefined
      : member.introduction;

  return (
    <StyledCard ref={ref} $fadeIn={animate || searchMode}>
      <Row gutter={[16, 16]} align="middle">
        <Col span={11}>
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
        <Col span={13}>
          <Card.Meta title={member.name} description={introduction} />
        </Col>
      </Row>
    </StyledCard>
  );
};

export default MemberCard;
