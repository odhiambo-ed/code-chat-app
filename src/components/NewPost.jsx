import React, { useState } from "react";
import Plus from "../assets/plus.jpeg";
import Modal from "react-modal";
import db, { auth, store } from "../firebase";
import firebase from "firebase";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    backgroundColor: "rgb(17, 17, 17)",
  },
};

export const NewPost = () => {
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#29faef";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = store.ref(`assets/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let count = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(count);
      },
      (error) => {
        console.log(error);
      },
      () => {
        store
          .ref("assets")
          .child(image.name)
          .getDownloadURL()
          .then(async (url) => {
            await db
              .collection("posts")
              .add({
                username: auth.currentUser.displayName,
                postBody: body,
                postDescription: description,
                photo: url,
                time: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(async () => {});
            await setProgress(0);
            await setBody("");
            await setDescription("");
            await setImage(null);
            await closeModal();
          });
      }
    );
  };

  return (
    <div className="newPostSection">
      <img src={Plus} alt="plus" onClick={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create a New Post</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{
              width: "550px",
              marginBottom: "10px",
              marginTop: "20px",
              height: "40px",
            }}
            placeholder="Post Body"
          />
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            cols="30"
            rows="10"
            style={{
              width: "550px",
              margin: "20px",
            }}
            placeholder="Post Description"
          ></textarea>
          <input
            id="file-input"
            type="file"
            accept=".gif, .png, .jpeg, .jpg"
            onChange={handleFile}
            style={{
              color: "white",
            }}
          />
          <p
            style={{
              color: "white",
            }}
          >
            {progress}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: 500,
            }}
          >
            <button
              onClick={closeModal}
              style={{
                backgroundColor: "red",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "7px",
                paddingBottom: "7px",
                color: "white",
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
              Close
            </button>
            <button
              style={{
                backgroundColor: "green",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "7px",
                paddingBottom: "7px",
                color: "white",
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
              onClick={handleUpload}
            >
              Post
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
