"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DocumentViewer } from "@/components/document-viewer";

interface DocumentPostProps {
  documentUrl: string;
  documentType: string;
}

export function DocumentPost({ documentUrl, documentType }: DocumentPostProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // Default to 5 pages for demo
  const [fullViewOpen, setFullViewOpen] = useState(false);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleFullView = () => {
    setFullViewOpen(true);
  };

  return (
    <Card className="overflow-hidden border">
      <CardContent className="p-0">
        <div className="h-[300px] w-full relative">
          <iframe
            src={`${documentUrl}#page=${currentPage}`}
            className="w-full h-full border-0"
          />

          {/* Page navigation overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleFullView}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-3 bg-muted/20 flex justify-between items-center">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium">{documentType}</span>
          </div>
          <Button size="sm" onClick={handleFullView}>
            Open Full View
          </Button>
        </div>
      </CardContent>

      <Dialog open={fullViewOpen} onOpenChange={setFullViewOpen}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <DocumentViewer file={documentUrl} type="pdf" />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
