import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import * as XLSX from 'xlsx';

interface FileUploadProps {
  onDataUpload: (data: any[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onDataUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        onDataUpload(jsonData);
      } catch (error) {
        console.error('Error processing Excel file:', error);
        alert('Error processing the Excel file. Please check the format and try again.');
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      processExcelFile(file);
    } else {
      alert('Please upload an Excel (.xlsx) file');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processExcelFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4 text-lg font-medium text-gray-900">
          Drag & Drop your Excel file here
        </p>
        <p className="mt-2 text-sm text-gray-500">
          or click to browse files
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Supported Format: .xlsx
        </p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".xlsx"
        onChange={handleFileSelect}
      />
    </>
  );
};