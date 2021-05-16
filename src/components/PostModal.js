import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ReactPlayer from "react-player";
import TextareaAutosize from "react-textarea-autosize";
import firebase from "firebase";
import { postArticleAPI } from "../actions";

const PostModal = (props) => {
  const [editorText, setEdittorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };
  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.postArticle(payload);
    reset(e);
  };
  const reset = (e) => {
    setEdittorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };
  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <ShareContent>
              <UserInfo>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{props.user ? props.user.displayName : ""}</span>
                {/* <Audience></Audience> */}
              </UserInfo>
              <Editor>
                <TextareaAutosize
                  minRows={3}
                  maxRows={6}
                  value={editorText}
                  onChange={(event) => setEdittorText(event.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpg, image/png,image/jpeg"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />

                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        style={{ width: "100%", height: "30px" }}
                      />
                      {videoLink && (
                        <ReactPlayer color={"red"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </ShareContent>
            {/* <button>Add hashtag</button> */}
            <ShareCreation>
              <AttachAssets>
                <AssetButton>
                  <img src="/images/share-add.svg" alt="" />
                </AssetButton>
                <AssetButton>
                  <label htmlFor="file">
                    <img
                      src="/images/share-photo.svg"
                      alt=""
                      onClick={() => switchAssetArea("image")}
                    />
                  </label>
                </AssetButton>
                <AssetButton>
                  <img
                    src="/images/share-video.svg"
                    alt=""
                    onClick={() => switchAssetArea("media")}
                  />
                </AssetButton>
                <AssetButton>
                  <img src="/images/share-document.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/share-sh.svg" alt="" />
                  <span>Audience</span>
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  color: black;

  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 100%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 60px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    background-color: white;
    border-radius: 50%;
    outline: none;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }
    img,
    svg {
      pointer-events: none;
    }
  }
`;

const ShareContent = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;
const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
`;
const AssetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  outline: none;
  border: none;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const ShareComment = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  padding-left: 16px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);

  ${AssetButton} {
    width: 90px;
    border-radius: 30px;
    padding: 0 60px;

    img,
    svg {
      margin-right: 5px;
    }
    span {
      font-weight: 800;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.disabled ? "rgba(0,0,0,0.3)" : "#0a66c2"};
  color: ${(props) => (props.disabled ? "rgba(0,0,0,0.4)" : "white")};
  font-weight: 700;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgba(0,0,0,0.3)" : "#004182"};
    cursor: ${(props) => (props.disabled ? "no-drop" : "pointer")};
  }
`;
const Editor = styled.div`
  padding: 12px 24px;

  textarea {
    overflow-y: hidden;
    width: 100%;

    min-height: 100px;
    resize: none;
    border: none;
    outline: none;
    input {
      width: 100%;
      height: 35px;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
`;
const UploadImage = styled.div`
  text-align: center;

  img {
    width: 50%;
    display: flex;
    justify-content: space-around;
  }
`;
// const Audience=styled.button``
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
