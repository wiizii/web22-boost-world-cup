import React, { useState } from 'react';
import styled from 'styled-components';
import WorldCupList from '../../components/WorldcupList';
import Header from '../../components/Header';
import Keywords from '../../components/Keywords';

function Main(): JSX.Element {
  const [isLogin, setIsLogin] = useState(true);
  const [inputWord, setInputWord] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [offset, setOffset] = useState(0);
  const onSubmit = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    setSearchWord(inputWord);
    setOffset(0);
    setInputWord('');
  };
  const onSearchWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(event.target.value);
  };
  const onClickTag = (keyword: string) => {
    setOffset(0);
    setSelectedTag(keyword);
  };

  return (
    <Wrapper>
      <Header
        type="searchHeader"
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        onSubmit={onSubmit}
        onSearchWordChange={onSearchWordChange}
        searchWord={inputWord}
      />
      <Keywords onClickTag={onClickTag} />
      <WorldCupList offset={offset} setOffset={setOffset} selectedTag={selectedTag} searchWord={searchWord} />
    </Wrapper>
  );
}
const Wrapper = styled.body`
  background-color: ${({ theme }) => theme.color.ligntpink};
`;
export default Main;
