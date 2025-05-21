"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Copy, Check, HelpCircle, Lightbulb } from "lucide-react";
import type { Campaign } from "@/types/campaign";

interface NextStepsModalProps {
  campaign: Campaign;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NextStepsModal({
  campaign,
  open,
  onOpenChange,
}: NextStepsModalProps) {
  const [copied, setCopied] = useState(false);

  const handleExport = () => {
    // In a real app, this would generate a CSV file for Google Ads Editor
    const csvContent =
      "data:text/csv;charset=utf-8,Campaign,Ad Group,Keyword,Headline 1,Headline 2,Headline 3,Description 1,Description 2\n";

    // Create CSV content from campaign data
    let fullCsvContent = csvContent;

    campaign?.adGroups.forEach((adGroup) => {
      adGroup.keywords.forEach((keyword) => {
        adGroup.headlines.forEach((headline, hIndex) => {
          if (hIndex === 0) {
            // Only add each keyword once
            const row = [
              campaign.name,
              adGroup.name,
              keyword,
              adGroup.headlines[0],
              adGroup.headlines[1],
              adGroup.headlines[2],
              adGroup.descriptions[0],
              adGroup.descriptions[1],
            ].join(",");
            fullCsvContent += row + "\n";
          }
        });
      });
    });

    // Create download link
    const encodedUri = encodeURI(fullCsvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "google_ads_campaign.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            Next Steps: How to Use Your Campaign
          </DialogTitle>
          <DialogDescription>
            Your campaign is ready to be exported to Google Ads. Choose one of
            the following options.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 py-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-3">
              Export to Google Ads
            </h4>
            <ol className="text-sm text-blue-700 list-decimal pl-5 space-y-2 mb-4">
              <li>Download the CSV file</li>
              <li>Sign in to your Google Ads account</li>
              <li>
                Click "Tools & Settings" {"->"} "Bulk Actions" {"->"} "Uploads"
              </li>
              <li>Upload the CSV file you downloaded</li>
              <li>Review and apply the changes</li>
            </ol>
            <Button
              onClick={handleExport}
              className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
