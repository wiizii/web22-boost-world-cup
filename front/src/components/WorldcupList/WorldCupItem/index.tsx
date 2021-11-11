import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { FaPlay, FaList, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { loginState } from '../../../recoil/atom';
import ShareModal from '../../ShareModal';

interface Props {
  id: number;
  thumbnail1: string;
  thumbnail2: string;
  title: string;
  desc: string;
}
function WorldCupItem({ id, thumbnail1, thumbnail2, title, desc }: Props): JSX.Element {
  const isLoggedIn = useRecoilValue(loginState);
  const [isOpenModal, setIsOpenMpdal] = useState(false);
  return (
    <Item>
      <Thumbnail>
        <img src={thumbnail1} alt={thumbnail1} />
        <img src={thumbnail2} alt={thumbnail2} />
      </Thumbnail>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      <Buttons>
        <Link to={isLoggedIn ? `/initialize/${id}` : '/login'}>
          <Start>
            <FaPlay />
            <span>시작하기</span>
          </Start>
        </Link>
        <Link to={isLoggedIn ? `/initialize/${id}` : '/login'}>
          <Ranking>
            <FaList />
            <span>랭킹보기</span>
          </Ranking>
        </Link>
        <Share>
          <FaShare />
          <span>공유하기</span>
        </Share>
      </Buttons>
      {isOpenModal ? <ShareModal /> : ''}
    </Item>
  );
}

const Item = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
  padding: 0px 20px;
  background-color: ${({ theme }) => theme.color.white};
`;
const Thumbnail = styled.div`
  width: 280px;
  height: 180px;
  display: flex;
`;
const Title = styled.p`
  font: ${({ theme }) => theme.fontStyle.h3Bold};
`;
const Desc = styled.p`
  font: ${({ theme }) => theme.fontStyle.caption};
`;
const Buttons = styled.div`
  display: flex;
  padding-top: 20px;
  margin-bottom: 20px;
`;
const Start = styled.div`
  display: flex;
  padding: 8px;
  color: red;
  font-size: 12px;
  border: 1px solid red;
  border-radius: 4px;
  margin-right: 10px;
  span {
    margin-left: 4px;
  }
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    color: white;
    background-color: red;
  }
`;
const Ranking = styled.div`
  display: flex;
  padding: 8px;
  color: orange;
  font-size: 12px;
  border: 1px solid orange;
  border-radius: 4px;
  margin-right: 10px;
  span {
    margin-left: 4px;
  }
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    color: white;
    background-color: orange;
  }
`;
const Share = styled.div`
  display: flex;
  padding: 8px;
  color: blue;
  font-size: 12px;
  border: 1px solid blue;
  border-radius: 4px;
  span {
    margin-left: 4px;
  }
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    color: white;
    background-color: blue;
  }
`;

export default WorldCupItem;
