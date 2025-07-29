import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Trophy,
  Award,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ContentItem from "@/components/content-item";
import VideoModal from "@/components/video-modal";
import { allCourses } from "@/lib/coursesMock";

const ModuleView = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const courseData = allCourses.find((course) => course.id === courseId);

  const [openModules, setOpenModules] = useState<string[]>([]);
  const getInitialCompletedContents = () => {
    if (!courseData) return [];
    const completed: string[] = [];
    courseData.modules.forEach((module) => {
      module.contents.forEach((content) => {
        if (content.completed) {
          completed.push(content.id);
        }
      });
    });
    return completed;
  };
  const [completedContents, setCompletedContents] = useState<string[]>(
    getInitialCompletedContents()
  );
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  if (!courseData) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Curso no encontrado
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          No pudimos encontrar el curso que buscas.
        </p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Volver al inicio
        </Button>
      </div>
    );
  }

  const totalContents = courseData.modules.reduce(
    (acc, module) => acc + module.contents.length,
    0
  );
  const courseContentIds = courseData.modules.flatMap((module) =>
    module.contents.map((content) => content.id)
  );
  const completedCount = completedContents.filter((id) =>
    courseContentIds.includes(id)
  ).length;
  const progressPercentage =
    totalContents > 0 ? Math.round((completedCount / totalContents) * 100) : 0;

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleContentComplete = (contentId: string) => {
    setCompletedContents((prev) =>
      prev.includes(contentId)
        ? prev.filter((id) => id !== contentId)
        : [...prev, contentId]
    );
  };

  const handleContentClick = (content: any) => {
    if (content.type === "VIDEO") {
      setSelectedVideo(content);
      setIsVideoModalOpen(true);
    }
  };

  const handleCertificate = () => {
    if (progressPercentage === 100) {
      alert("¡Felicitaciones! Puedes descargar tu certificado.");
    } else {
      alert(
        `Completa el ${
          100 - progressPercentage
        }% restante para obtener tu certificado.`
      );
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="self-start sm:mt-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 break-words">
            {courseData.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 break-words">
            {courseData.description}
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
            <Badge variant="outline" className="text-xs sm:text-sm">
              {courseData.level}
            </Badge>
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
              {courseData.modules.length} módulos
            </span>
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
              {totalContents} elementos
            </span>
          </div>
        </div>
      </div>
      {/* Course Image */}
      <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden">
        <img
          src={
            courseData.image ||
            "/placeholder.svg?height=256&width=512&query=course image" ||
            "/placeholder.svg"
          }
          alt={courseData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
          <div className="text-center text-white max-w-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 break-words">
              {courseData.title}
            </h2>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white text-xs sm:text-sm"
            >
              Nivel {courseData.level}
            </Badge>
          </div>
        </div>
      </div>
      {/* Progress Card */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl break-words">
                Progreso del Curso
              </CardTitle>
              <p className="text-white/80 mt-1 text-sm sm:text-base break-words">
                {completedCount} de {totalContents} elementos completados
              </p>
            </div>
            <div className="text-center sm:text-right flex-shrink-0">
              <div className="text-2xl sm:text-3xl font-bold">
                {progressPercentage}%
              </div>
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 mx-auto sm:mx-auto mt-2" />
            </div>
          </div>
          <Progress
            value={progressPercentage}
            className="mt-4 bg-white/20 h-2 sm:h-3"
          />
        </CardHeader>
      </Card>
      {/* Certificate Button */}
      {progressPercentage > 0 && (
        <Card className="border-2 border-dashed border-primary/50">
          <CardContent className="p-4 sm:p-6 text-center">
            <Award className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-2 text-sm sm:text-base">
              Certificado de Finalización
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 break-words">
              {progressPercentage === 100
                ? "¡Felicitaciones! Has completado el curso."
                : `Completa el ${
                    100 - progressPercentage
                  }% restante para obtener tu certificado.`}
            </p>
            <Button
              onClick={handleCertificate}
              variant={progressPercentage === 100 ? "default" : "outline"}
              disabled={progressPercentage < 100}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              {progressPercentage === 100
                ? "Descargar Certificado"
                : "Certificado Bloqueado"}
            </Button>
          </CardContent>
        </Card>
      )}
      {/* Modules */}
      <div className="space-y-3 sm:space-y-4">
        {courseData.modules.map((module) => {
          const moduleCompletedCount = module.contents.filter((content) =>
            completedContents.includes(content.id)
          ).length;
          const moduleProgress = Math.round(
            (moduleCompletedCount / module.contents.length) * 100
          );
          const isOpen = openModules.includes(module.id);
          return (
            <Card
              key={module.id}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <Collapsible
                open={isOpen}
                onOpenChange={() => toggleModule(module.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <CardTitle className="text-base sm:text-lg break-words">
                            {module.title}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className="self-start text-xs sm:text-sm"
                          >
                            {moduleCompletedCount}/{module.contents.length}
                          </Badge>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 break-words">
                          {module.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <Progress
                            value={moduleProgress}
                            className="flex-1 h-2"
                          />
                          <span className="text-xs sm:text-sm text-gray-500 self-start sm:self-center whitespace-nowrap">
                            {moduleProgress}%
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 mt-1">
                        {isOpen ? (
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 p-4 sm:p-6 sm:pt-0 space-y-2 sm:space-y-3">
                    {module.contents
                      .sort((a, b) => a.order - b.order)
                      .map((content) => (
                        <ContentItem
                          key={content.id}
                          content={{
                            ...content,
                            completed: completedContents.includes(content.id),
                          }}
                          onToggleComplete={toggleContentComplete}
                          onContentClick={handleContentClick}
                        />
                      ))}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>
      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        content={selectedVideo}
      />
    </div>
  );
};

export default ModuleView;
