import { useState } from "react";
import { ArrowLeft, Download as DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadProps {
  onBack: () => void;
}

const Download = ({ onBack }: DownloadProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            Downloads
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get our mobile app and resources
          </p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <DownloadIcon className="w-16 h-16 mx-auto text-blue-500 mb-4" />
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Download our app to access your personalized grid on the go.
            </p>
            
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Coming Soon
            </Button>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-center">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;