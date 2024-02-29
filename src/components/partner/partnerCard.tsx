import { Col, Modal } from 'antd';
import { Card } from 'antd';
import styled from 'styled-components';
import { IPartnership } from '@/types/IPartnership.ts';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import getImageUrl from '@/utils/getImageUrl.ts';
import PartnerLink from '#/partner/partnerLink.tsx';

const StyledCard = styled(Card)`
  margin: 16px;
  background-color: #f1f1f1;
  text-align: center;
`;

const StyleCardMeta = styled(Card.Meta)`
  text-align: center;
`;

const ImageWrapper = styled.div`
  width: 100%;
  padding: 24px;
`;

const ModalTitle = styled.h1`
  text-align: center;
`;

const TextDiv = styled.div`
  padding: 5%;
`;

const StyleIntroduce = styled.div`
  font-size: medium;
`;

const LongPartnership = styled.h2`
  text-align: center;
`;

const StyleModal = styled(Modal)`
  text-align: center;
  padding: 20px;
`;

const StyleIframe = styled.iframe`
  border: none;
`;

const StyleVideo = styled.div`
  display: flex;
  justify-content: center;
`;

const PartnerCard = (partnerData: IPartnership) => {
  const [isModalOpen, setIsModalOpen] = useState([false, false]);

  const toggleModal = (idx: number, target: boolean) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  return (
    <Col key={partnerData.Partner} xs={48} sm={24} md={16} lg={12} xl={8}>
      <StyledCard
        hoverable
        onClick={() => toggleModal(0, true)}
        cover={
          <ImageWrapper>
            <LazyLoadImage
              style={{ borderRadius: '50%', width: '176px', height: '176px' }}
              src={getImageUrl(partnerData.Image)}
              alt={partnerData.Partner}
              effect="blur"
            />
          </ImageWrapper>
        }
      >
        <StyleCardMeta title={<h1>{partnerData.Partner}</h1>} />
      </StyledCard>
      <StyleModal
        width={720}
        centered={true}
        title={<ModalTitle>{partnerData.ModalTitle}</ModalTitle>}
        open={isModalOpen[0]}
        onOk={() => toggleModal(0, false)}
        onCancel={() => toggleModal(0, false)}
        footer={<PartnerLink partnerLink={partnerData.Link} />}
      >
        {partnerData.LongPartnership && (
          <LongPartnership>長期合作夥伴</LongPartnership>
        )}
        <TextDiv>
          {partnerData.Introduce && (
            <StyleIntroduce>
              {Array.isArray(partnerData.Introduce)
                ? partnerData.Introduce.map((introduce) => <p>{introduce}</p>)
                : partnerData.Introduce}
            </StyleIntroduce>
          )}
        </TextDiv>
        {partnerData.ShowVideo && (
          <StyleVideo>
            <StyleIframe
              width="560"
              height="315"
              src={partnerData.ShowVideo}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </StyleVideo>
        )}
      </StyleModal>
    </Col>
  );
};

export default PartnerCard;
