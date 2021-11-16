import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import WorldCupItem from './WorldCupItem';
import Loader from './Loader';
import { getWorldcupList, getWorldcupListBySearch, getWorldcupListByKeyword } from '../../utils/api/worldcups';

enum filtering {
  tag,
  search,
}
interface WorldcupType {
  id: number;
  thumbnail1: string;
  thumbnail2: string;
  title: string;
  description: string;
}
interface Props {
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  selectedTag: string;
  searchWord: string;
  filterStandard: React.MutableRefObject<filtering>;
}
function WorldcupList({ offset, setOffset, selectedTag, searchWord, filterStandard }: Props): JSX.Element {
  const [isClickMore, setIsClickMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<WorldcupType[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const target = useRef<HTMLDivElement | null>(null);
  const isMounted = useRef(false);
  const threshold = 0.4;
  const limit = 8;
  const onClickMoreButton = () => {
    setIsClickMore(!isClickMore);
  };
  const fetchData = async () => {
    let newItems;
    if (filterStandard.current === 1) newItems = await getWorldcupListBySearch({ offset, limit, search: searchWord });
    else if (filterStandard.current === 0)
      newItems = await getWorldcupListByKeyword({ offset, limit, keyword: selectedTag });
    else newItems = await getWorldcupList({ offset, limit });
    if (!newItems.length) {
      (observer.current as IntersectionObserver).disconnect();
      setLoading(false);
      return;
    }
    if (!offset) setItems([...newItems]);
    else setItems([...items, ...newItems]);
  };
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      setOffset(offset + 8);
    }
    setLoading(false);
  }, [items.length, searchWord, selectedTag]);

  const onIntersect = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entry.isIntersecting && !loading) {
      setLoading(true);
      fetchData();
      observer.unobserve(entry.target);
    }
  };
  useEffect(() => {
    if (isClickMore) {
      (observer.current as IntersectionObserver) = new IntersectionObserver(onIntersect, { threshold });
      (observer.current as IntersectionObserver).observe(target.current as HTMLDivElement);
    }
  }, [offset, isClickMore]);
  useEffect(() => {
    if (offset === 0) {
      fetchData();
      observer.current = new IntersectionObserver(onIntersect, { threshold });
    }
  }, [offset]);
  return (
    <>
      <Container>
        {items.map((item) => (
          <WorldCupItem
            key={item.id}
            id={item.id}
            thumbnail1={item.thumbnail1}
            thumbnail2={item.thumbnail2}
            title={item.title}
            desc={item.description}
          />
        ))}
      </Container>
      {!isClickMore ? (
        <MoreButton onClick={onClickMoreButton}>
          <Title>더보기</Title>
        </MoreButton>
      ) : (
        ''
      )}
      <div ref={target} style={{ width: '10px', height: '10px' }}>
        {loading && <Loader />}
      </div>
    </>
  );
}

const Container = styled.div`
  margin: 1em;
  display: grid;
  width: calc(100vw-1em);
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 2fr);
  }
`;
const MoreButton = styled.div`
  width: 100%;
  height: 5em;
  line-height: 3em;
  text-align: center;
  margin: 2em;
  padding-top: 1em;
`;
const Title = styled.p`
  margin: auto;
  background-color: ${({ theme }) => theme.color.lightpink};
  color: ${({ theme }) => theme.color.gray[0]};
  width: 30em;
  height: 3em;
  border-radius: 12px;
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.color.pink};
    color: ${({ theme }) => theme.color.gray[2]};
  }
`;

export default WorldcupList;
