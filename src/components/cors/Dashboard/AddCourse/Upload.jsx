import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import "video-react/dist/video-react.css";
import { Player } from "video-react";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  return (
    <div className="flex flex-col space-y-4 rounded-lg border border-pure-greys-50 bg-white p-6 shadow-md">
      <label className="text-sm font-semibold text-richblack-700" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-pure-greys-50" : "bg-pure-greys-25"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-lg border-2 border-dotted border-richblack-500 transition-colors duration-300 ease-in-out hover:bg-pure-greys-50`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-4">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-xs text-richblack-400 underline hover:text-richblack-200"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <label htmlFor="video" className="w-full">
            <div
              className="flex w-full flex-col items-center p-6"
              {...getRootProps()}
            >
              <input {...getInputProps()} ref={inputRef} id="video" />
              <div className="grid aspect-square w-16 place-items-center rounded-full bg-pure-greys-800">
                <FiUploadCloud className="text-3xl text-yellow-50" />
              </div>
              <p className="mt-2 text-center text-sm text-black">
                Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                <span className="font-semibold text-yellow-50">Browse</span> a
                file
              </p>
              <ul className="mt-6 flex flex-col items-center space-y-1 text-xs text-richblack-700">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>
            </div>
          </label>
        )}
      </div>
      {errors[name] && (
        <span className="text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
