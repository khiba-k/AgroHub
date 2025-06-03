"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface DocumentViewerProps {
  file: File | string;
  type?: "pdf" | "image" | "text" | "auto";
}

export function DocumentViewer({ file, type = "auto" }: DocumentViewerProps) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileType, setFileType] = useState<"pdf" | "image" | "text">("pdf");
  const [textContent, setTextContent] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Determine file type and create URL
    if (typeof file === "string") {
      setFileUrl(file);
      // Try to determine type from URL if not specified
      if (type === "auto") {
        if (file.endsWith(".pdf")) setFileType("pdf");
        else if (/\.(jpe?g|png|gif|bmp|webp)$/i.test(file))
          setFileType("image");
        else if (/\.(txt|md|rtf)$/i.test(file)) setFileType("text");
        else setFileType("pdf"); // Default to PDF
      } else {
        setFileType(type);
      }

      // For PDF files, try to load the document to get total pages
      if (file.endsWith(".pdf") || type === "pdf") {
        // In a real implementation, we would use PDF.js to load the document
        // and get the total pages. For this demo, we'll simulate it.
        setTimeout(() => {
          setTotalPages(Math.floor(Math.random() * 10) + 5); // Random number between 5-15
        }, 1000);
      }
    } else {
      // It's a File object
      const url = URL.createObjectURL(file);
      setFileUrl(url);

      // Determine type
      if (type === "auto") {
        if (file.type.includes("pdf")) setFileType("pdf");
        else if (file.type.includes("image")) setFileType("image");
        else if (file.type.includes("text")) {
          setFileType("text");
          // Read text file content
          const reader = new FileReader();
          reader.onload = (e) => {
            setTextContent((e.target?.result as string) || "");
          };
          reader.readAsText(file);
        } else setFileType("pdf");
      } else {
        setFileType(type);
      }

      // For PDF files, try to load the document to get total pages
      if (file.type?.includes("pdf") || type === "pdf") {
        // In a real implementation, we would use PDF.js to load the document
        // and get the total pages. For this demo, we'll simulate it.
        setTimeout(() => {
          setTotalPages(Math.floor(Math.random() * 10) + 5); // Random number between 5-15
        }, 1000);
      }

      // Clean up URL when component unmounts
      return () => URL.revokeObjectURL(url);
    }
  }, [file, type]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation((rotation + 90) % 360);
  };

  const handleDownload = () => {
    if (fileUrl) {
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download =
        typeof file === "string"
          ? file.split("/").pop() || "document"
          : file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const renderContent = () => {
    switch (fileType) {
      case "pdf":
        return (
          <div className="relative w-full h-full">
            <iframe
              src={`${fileUrl}#page=${currentPage}`}
              className="w-full h-full border-0"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transformOrigin: "center center",
                transition: "transform 0.3s ease",
              }}
              onLoad={() => {
                // In a real implementation with PDF.js, we would get the actual page count here
                if (totalPages === 1) {
                  setTotalPages(Math.floor(Math.random() * 10) + 5); // Random number between 5-15 for demo
                }
              }}
            />
            {/* Page indicator overlay for embedded view */}
            <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs font-medium">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        );
      case "image":
        return (
          <img
            src={fileUrl}
            alt="Document"
            className="max-w-full max-h-full object-contain"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: "center center",
              transition: "transform 0.3s ease",
            }}
          />
        );
      case "text":
        return (
          <div
            className="w-full h-full p-4 overflow-auto bg-white text-black dark:bg-gray-800 dark:text-white"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: "center center",
              transition: "transform 0.3s ease",
              whiteSpace: "pre-wrap",
            }}
          >
            {textContent}
          </div>
        );
      default:
        return <div>Unsupported file type</div>;
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex space-x-2">
          {fileType === "pdf" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center text-sm">
                {currentPage} / {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <div className="flex items-center text-sm">
            {Math.round(zoom * 100)}%
          </div>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="flex-grow p-0 overflow-auto" ref={containerRef}>
        <div className="w-full h-full flex items-center justify-center overflow-auto">
          {renderContent()}
        </div>
      </CardContent>
    </Card>
  );
}
