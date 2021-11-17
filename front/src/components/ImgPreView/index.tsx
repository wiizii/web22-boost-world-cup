import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loading from 'react-loading';
import { BsImage } from 'react-icons/bs';
import { ImgInfo } from '../../types/Datas';
import { useUploadImg } from '../../hooks';
import { ImgsAction } from '../../hooks/useImgInfos';

interface Props {
  info: ImgInfo;
  tab: 1 | 2;
  willUploadFile: File | null;
  presignedURL: string | null;
  imgInfosDispatcher: React.Dispatch<ImgsAction>;
  onUploadSuccess?: (info: ImgInfo) => void;
}

function ImgPreView({
  info,
  tab,
  willUploadFile,
  presignedURL,
  imgInfosDispatcher,
  onUploadSuccess,
}: Props): JSX.Element {
  const IMG_URL_END_POINT = 'https://kr.object.ncloudstorage.com';
  const resizedImgURL = `${IMG_URL_END_POINT}/image-w120h120/${info.key}.webp`;
  const originImgURL = `${IMG_URL_END_POINT}/wiziboost-image-raw/${info.key}`;
  const initialImgURL = tab === 1 ? originImgURL : resizedImgURL;

  const [imgURL, setImgURL] = useState(initialImgURL);
  const [isLoading, setIsLoading] = useUploadImg(
    info,
    willUploadFile,
    presignedURL,
    imgInfosDispatcher,
    onUploadSuccess,
  );
  const placeholder =
    tab === 1 ? (
      <Loading type="spin" color="black" />
    ) : (
      <div>
        <BsImage size={40} />
      </div>
    );

  useEffect(() => {
    setImgURL(initialImgURL);
  }, [info.key]);

  return (
    <Container isLoading={isLoading} tab={tab}>
      {isLoading && placeholder}
      {info.isUploaded && (
        <Img
          src={imgURL}
          onLoad={() => setIsLoading(false)}
          onError={() => setImgURL(originImgURL)}
          alt=""
          isLoading={isLoading}
          tab={tab}
        />
      )}
    </Container>
  );
}

const Container = styled.li<{ isLoading: boolean; tab: number }>`
  width: ${({ tab }) => (tab === 1 ? '143px' : '120px')};
  height: ${({ tab }) => (tab === 1 ? '160px' : '120px')};
  position: relative;
  border-radius: 13px;
  border: ${({ isLoading }) => (isLoading ? `1px solid black` : `none`)};
  div {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
`;

const Img = styled.img<{ isLoading: boolean; tab: number }>`
  border-radius: 13px;
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
  width: ${({ tab }) => (tab === 1 ? '143px' : '120px')};
  height: ${({ tab }) => (tab === 1 ? '160px' : '120px')};
`;

export default ImgPreView;
