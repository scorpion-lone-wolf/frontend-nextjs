"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  function openFilePicker() {
    inputRef.current.click();
  }
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    setPickedImage(file);
    setPreview(URL.createObjectURL(file));
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!preview && <p>No image picked yet.</p>}

          {preview && <Image src={preview} alt="Preview" fill />}
        </div>
        <input
          ref={inputRef}
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png , image/jpeg"
          onChange={handleImageChange}
          required
        />
      </div>
      <button type="button" className={classes.button} onClick={openFilePicker}>
        Pick an Image
      </button>
    </div>
  );
}
