import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import useAnimateOnScroll from '@/hooks/useAnimateOnScroll.ts';
import { IImageContent } from '@/types/IImageContent.ts';
import getImageUrl from '@/utils/getImageUrl.ts';

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

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ecf0f1;
  padding: 50px 40px;

  &.dark {
    background-color: #6f9b9c;
    color: #fff;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 50px 0;
  }

  @media (max-width: 678px) {
    padding: 50px 50px;
  }

  @media (max-width: 400px) {
    padding: 50px 20px;
  }

  &.right {
    @media (min-width: 768px) {
      flex-direction: row-reverse;
    }
  }
`;

const Container = styled.div`
  flex: 1;
  padding: 20px;
  transition: opacity 0.8s ease-out;
  opacity: 0;

  @media (max-width: 678px) {
    padding: 0;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &.fadeIn {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;

  & > span > img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 #000000;
  }
`;

const TextButtonContainer = styled.div`
  max-width: 600px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-weight: bolder;
`;

const SubTitle = styled.h3`
  margin-bottom: 20px;
  font-weight: bold;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
`;

const FeatureItem = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  text-align: left;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #6f9b9c;
  }

  &.dark {
    &:before {
      color: #fff;
    }
  }
`;

const StyledButton = styled(Button)`
  & > span {
    font-size: 18px;
    font-weight: bold;
    text-decoration: underline;
  }
  
  &.dark {
    color: #fff;
  }
`;

/**
 * ImageContentSection component with an optional image position.
 * @param imageContent {IImageContent} - The image content object.
 * @param imageOnRight {boolean} - If true, the image will be displayed on the right. Default is false.
 * @param darkMode {boolean} - If true, the section will be displayed in dark mode. Default is false.
 */
const ImageContentSection = (
  {
    imageContent,
    imageOnRight = false,
    darkMode = false
  }: {
    imageContent: IImageContent,
    imageOnRight?: boolean,
    darkMode?: boolean
  }) => {
  const { animate, ref } = useAnimateOnScroll();

  const optionalStyle = (imageOnRight ? 'right' : '') + (darkMode ? ' dark' : '');

  return (
    <SectionContainer ref={ref} className={optionalStyle}>
      <Container className={animate ? 'fadeIn' : ''}>
        <ImageWrapper>
          <LazyLoadImage src={getImageUrl(imageContent.imageUrl)} alt={imageContent.title} effect="blur" />
        </ImageWrapper>
      </Container>
      <Container className={animate ? 'fadeIn' : ''}>
        <TextButtonContainer>
          <Title>{imageContent.title}</Title>
          {imageContent.subTitle && <SubTitle>{imageContent.subTitle}</SubTitle>}
          {imageContent.paragraph && <Paragraph>{imageContent.paragraph}</Paragraph>}
          <FeatureList>
            {imageContent.features && imageContent.features.map((feature, index) => (
              <FeatureItem key={index} className={darkMode ? 'dark' : ''}>{feature}</FeatureItem>
            ))}
          </FeatureList>
          <Flex wrap="wrap" gap="small">
            {imageContent.buttons && imageContent.buttons.map((button, index) => (
              button.link ? (
                <Link key={index} to={button.link}>
                  <Button
                    type={button.type || (darkMode ? 'default' : 'primary')}
                    ghost={darkMode}
                  >
                    {button.text}
                  </Button>
                </Link>
              ) : (
                <StyledButton
                  key={index}
                  type={button.type || (darkMode ? 'default' : 'primary')}
                  ghost={(button.type !== 'link' && button.type !== 'text') && darkMode}
                  href={button.href}
                  target={button.href ? '_blank' : ''}
                  onClick={button.action}
                  className={darkMode ? 'dark' : ''}
                >
                  {button.text}
                </StyledButton>
              )
            ))}
          </Flex>
        </TextButtonContainer>
      </Container>
    </SectionContainer>
  );
};

export default ImageContentSection;
