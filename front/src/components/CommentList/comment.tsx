import React, { useCallback } from 'react';
import styled from 'styled-components';
import { CommentData } from '../../types/Datas';
import { deleteComment } from '../../utils/api/comment';

interface Props {
  comment: CommentData;
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
}

function Comment({ comment, setComments }: Props): JSX.Element {
  const tempUserId = 48;

  const getDateString = useCallback((date: string) => {
    const yymmdd = date.split('T')[0];
    const hhmmss = date.split('T')[1].split('.')[0];
    return `${yymmdd} ${hhmmss}`;
  }, []);

  const deleteButtonClickHandler = async (event: React.MouseEvent<HTMLElement>) => {
    const {
      dataset: { value: commendId },
    } = event.target as HTMLElement;
    if (commendId) {
      const { result } = await deleteComment(commendId);
      if (result === 'success') {
        setComments((prev) => prev.filter((comment) => comment.commentId !== Number(commendId)));
      }
    }
  };

  return (
    <Wrapper>
      <SubContainer>
        <Writer>{comment.nickname}</Writer>
        <Date>{getDateString(comment.createdAt)}</Date>
        {tempUserId === comment.userId ? (
          <DeleteButton onClick={deleteButtonClickHandler} data-value={comment.commentId}>
            삭제
          </DeleteButton>
        ) : (
          ''
        )}
      </SubContainer>
      <Message>{comment.message}</Message>
    </Wrapper>
  );
}

const DeleteButton = styled.div`
  width: 70px;
  border-radius: 5px;
  cursor: pointer;
  ${({ theme }) => theme.fontStyle.body};
  background-color: ${({ theme }) => theme.color.pink};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Writer = styled.div`
  ${({ theme }) => theme.fontStyle.bodyBold};
`;
const Date = styled.div`
  ${({ theme }) => theme.fontStyle.body};
`;
const Message = styled.div`
  ${({ theme }) => theme.fontStyle.body};
`;

export default Comment;