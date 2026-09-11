import { useDropzone} from 'react-dropzone';
import type { FileWithPath } from 'react-dropzone';
import axios from 'axios';
import './upload.css'

export default function ImageUpload() {

  const onDrop = async (acceptedFiles: FileWithPath[]) => {

    const file = acceptedFiles[0];

    const formData = new FormData();

    formData.append('image', file);

    try {

      const token = localStorage.getItem('accessToken');
      console.log(token);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = JSON.parse(localStorage.getItem('user') || "null"); 

      if (user) {
        user.profileImage = response.data.profileImage;
      }

      localStorage.setItem('user',JSON.stringify(user));

      window.dispatchEvent(new Event('userUpdate'))

      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  return (
    <div className="upload-container">
      <div
        {...getRootProps()}
        className={`upload-box ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
  
        <div className="upload-text">
          {isDragActive ? '📥 Dobd ide a képet' : '📤 Húzz ide egy képet'}
        </div>
  
        <div className="upload-subtext">
          PNG, JPG, JPEG támogatott
        </div>
      </div>
    </div>
  )};