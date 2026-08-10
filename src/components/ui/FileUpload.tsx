"use client";

import React, { useState } from "react";
import { UploadCloud, File, Trash2 } from "lucide-react";

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

export function FileUpload({ onFileSelect, accept = "*", maxSizeMB = 5 }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size exceeds limit of ${maxSizeMB}MB`);
        return;
      }
      setSelectedFile(file);
      onFileSelect?.(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size exceeds limit of ${maxSizeMB}MB`);
        return;
      }
      setSelectedFile(file);
      onFileSelect?.(file);
    }
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center border-2 border-dashed border-concrete-100 rounded-2xl bg-concrete-50/50 p-6 transition-all hover:bg-concrete-50/80 dark:border-white/5 dark:bg-blueprint-900/30 dark:hover:bg-blueprint-900/50 cursor-pointer"
        >
          <label className="flex flex-col items-center justify-center cursor-pointer w-full">
            <UploadCloud className="h-8 w-8 text-concrete-300 dark:text-blueprint-400 mb-2" />
            <span className="text-[13px] font-medium text-concrete-900 dark:text-blueprint-100">
              Drag & Drop file here, or <span className="text-signal-orange">browse</span>
            </span>
            <span className="text-[11.5px] text-concrete-300 dark:text-blueprint-400 mt-1">
              Supports: {accept} (Max {maxSizeMB}MB)
            </span>
            <input type="file" accept={accept} onChange={handleFileChange} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="flex items-center justify-between border border-concrete-100 rounded-xl bg-white p-3 dark:border-white/5 dark:bg-blueprint-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-orange/10 text-signal-orange">
              <File className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-concrete-900 dark:text-blueprint-100 line-clamp-1">
                {selectedFile.name}
              </p>
              <p className="text-[11.5px] text-concrete-300 dark:text-blueprint-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedFile(null)}
            className="rounded-lg p-1.5 text-concrete-300 hover:bg-concrete-50 hover:text-red-500 dark:text-blueprint-400 dark:hover:bg-blueprint-800"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
