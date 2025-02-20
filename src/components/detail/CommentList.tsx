import { useState } from "react"
import { styled } from "styled-components"
import { Comment } from "../../pages/DetailPage"
import { useMutation, useQueryClient } from "react-query"
import { deleteComment } from "../../api/comment"
import CommentForm from "./CommentForm"
import { displayedAt } from "../../utils/common"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/config/configStore"
import { useParams } from "react-router-dom"

interface Comments {
    comments: Comment[]
}

const CommentList: React.FC<Comments> = ({ comments }) => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [updateTarget, setUpdateTarget] = useState("");
    const [deleteToggle, setDeleteToggle] = useState(false);
    const userInfo = useSelector((state: RootState) => state.user);

    const deleteMutation = useMutation((commentId: string) => deleteComment(commentId), {
        onSuccess: () => {
            queryClient.invalidateQueries(["post", id]);
        }
    });

    // const CommentButtonHandler = () => { }

    const CommentUpdateButtonHandler = (id: string) => {
        setUpdateTarget(id);
    }

    const CommentDeleteToggleHandler = () => {
        setDeleteToggle(true);
    }

    const CommentDeleteButtonHandler = (id: string) => {
        deleteMutation.mutate(id);
        setDeleteToggle(false);
    }

    return (
        <>
            <CommentListContainer>
                <P $color="#D9D8E2">
                    댓글 {comments?.length}
                </P>
                {
                    comments.map(item => {
                        return (
                            <CommentListItem key={item.commentId}>
                                <ListItemTop>
                                    <UserImage src={item.userImage === null ? "https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?gif=1&w=640&h=640&c=c&webp=1" : item.userImage} />
                                    <P $color="#FAFAFA">
                                        {item.nickname}
                                    </P>
                                </ListItemTop>
                                {(updateTarget !== item.commentId) ?
                                    <>
                                        <ListItemMiddle>
                                            <P $color="#DEDCE7">
                                                {item.content}
                                            </P>
                                        </ListItemMiddle>
                                        <ListItemBottom>
                                            <P $size="14px" $color="#A6A3AF">
                                                {displayedAt(item.createdAt)}
                                            </P>
                                            {/* <Divider />
                                            <CommentP onClick={CommentButtonHandler}>
                                                댓글 달기
                                            </CommentP> */}
                                            {(userInfo.nickname === item.nickname) &&
                                                <>
                                                    <Divider />
                                                    <CommentP onClick={() => CommentUpdateButtonHandler(item.commentId)}>
                                                        수정
                                                    </CommentP>
                                                    <Divider />
                                                    <CommentP onClick={CommentDeleteToggleHandler}>
                                                        삭제
                                                    </CommentP>
                                                </>
                                            }
                                        </ListItemBottom>
                                        {
                                            (deleteToggle) && (
                                                <>
                                                    <ModalBackground onClick={() => setDeleteToggle(false)} />
                                                    <DeleteModal>
                                                        <P>
                                                            {`댓글을 삭제하시겠습니까?\n삭제한 댓글은 되돌릴 수 없습니다.`}
                                                        </P>
                                                        <DeleteButtonArea>
                                                            <DeleteModalButton onClick={() => setDeleteToggle(false)} >
                                                                취소
                                                            </DeleteModalButton>
                                                            <DeleteModalButton $delete={true} onClick={() => CommentDeleteButtonHandler(item.commentId)}>
                                                                삭제
                                                            </DeleteModalButton>
                                                        </DeleteButtonArea>
                                                    </DeleteModal>
                                                </>
                                            )
                                        }
                                    </>
                                    :
                                    <>
                                        <CommentForm setTarget={setUpdateTarget} commentId={item.commentId} comment={item.content} />
                                    </>}
                            </CommentListItem>
                        )
                    })
                }
            </CommentListContainer>

        </>
    )
}

export default CommentList

const CommentListContainer = styled.div`
    width: inherit;
    box-sizing: border-box;
    padding: 20px 20px;
`

const CommentListItem = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-top: 20px;
    gap: 14px;
`

const UserImage = styled.img`
    width: 32px;
    height: 32px;
    background-color: #ECECEC;
    border-radius: 50%;
`

const ListItemTop = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

const ListItemMiddle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    gap: 10px;
`

const ListItemBottom = styled.div`
    display: flex;
    align-items: center;
    margin-left: 40px;
    margin-top: 5px;
    gap: 10px;
`

const P = styled.p< { $size?: string, $color?: string } >`
    color: ${props => props.$color ? props.$color : "#FAFAFA"};
    font-size: ${(props) => props.$size ? props.$size : "16px"};
    line-height: calc(100% + 6px);
    white-space: pre-wrap;
`

const CommentP = styled.p`
    font-size: 14px;
    line-height: calc(100% + 6px);
    color: #A6A3AF;
    background: none;
    border: none;
    padding: none;
    margin: none;

    cursor: pointer;
`

const Divider = styled.div`
    height: 10px;
    width: 1px;
    background-color: #A6A3AF;
    padding: 0;
`

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
    width: 100vh;
    height: 100vh;
    background-color: gray;
    opacity: 0.3;
    /* background-color: rgba(33, 38, 41, 0.2); */
`

const DeleteModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 5;
    width: 300px;
    background-color: #141414;
    color: #FAFAFA;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    gap: 20px;
`

const DeleteButtonArea = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    gap: 10px;
`

const DeleteModalButton = styled.div<{ $delete?: boolean }>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    
    flex: 1 0 0;
    background: ${(props) => props.$delete ? "linear-gradient(135deg, #8084F4, #C48FED)" : "#2C2A30"};
    
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
    color: ${(props) => props.$delete ? "#FAFAFA" : "#797582"};
    border-radius: 6px;
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
    &:hover {
        color: ${(props) => props.$delete ? "#141414" : "#FAFAFA"};
    }
`