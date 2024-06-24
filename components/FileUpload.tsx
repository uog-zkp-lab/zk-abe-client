import { useState, ChangeEvent } from 'react';

interface FileUploadProps {
  onFileUpload: (jsonData: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const jsonData = JSON.parse(event.target?.result as string);
        onFileUpload(jsonData);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload JSON</button>
    </div>
  );
};

export default FileUpload;
