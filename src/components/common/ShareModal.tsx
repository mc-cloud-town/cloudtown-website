import React, { useState } from 'react';
import { Modal, Button, message, Flex } from 'antd';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  WeiboShareButton,
  WeiboIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';
import { LinkOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledContainer = styled(Flex)`
  margin: 20px;
`;

interface ShareModalProps {
  url: string;
  title: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ url, title }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success(t('copySuccess'));
    } catch (err) {
      message.error(t('copyFail'));
    }
  };

  return (
    <>
      <Button icon={<ShareAltOutlined />} onClick={showModal}>
        {t('share')}
      </Button>
      <Modal title={`${t('share')} ${title}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <StyledContainer justify={'center'} gap={10}>
          <FacebookShareButton url={url} hashtag={'#minecraft'}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <WeiboShareButton url={url} title={title}>
            <WeiboIcon size={40} round />
          </WeiboShareButton>
          <RedditShareButton url={url} title={title}>
            <RedditIcon size={40} round />
          </RedditShareButton>
          <TwitterShareButton url={url} title={title}>
            <XIcon size={40} round />
          </TwitterShareButton>
        </StyledContainer>
        <Button onClick={() => copyToClipboard(url)} block>
          <LinkOutlined /> {t('copyLink')}
        </Button>
      </Modal>
    </>
  );
};

export default ShareModal;
