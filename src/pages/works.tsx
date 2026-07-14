import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface WorksProps {
  onBack: () => void;
}

const Works = ({ onBack }: WorksProps) => {
  const projects = [
    { name: "Digital Portfolio", year: "2024" },
    { name: "E-commerce Platform", year: "2023" },
    { name: "Mobile Application", year: "2023" },
    { name: "Brand Identity", year: "2022" },
    { name: "Web Dashboard", year: "2022" },
    { name: "Marketing Campaign", year: "2021" },
    { name: "UI/UX Design", year: "2021" },
    { name: "Corporate Website", year: "2020" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8 animate-slide-up">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-8 text-center">
            Works
          </h1>

          <div className="space-y-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-4 p-4 bg-white/10 dark:bg-gray-700/10 rounded-lg hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-200"
              >
                <div className="text-left">
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {project.name}
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-lg text-gray-600 dark:text-gray-400">
                    {project.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;