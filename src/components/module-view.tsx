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
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {courseData.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {courseData.description}
          </p>
          <div className="flex items-center space-x-4 mt-2">
            <Badge variant="outline">{courseData.level}</Badge>
            <span className="text-sm text-gray-500">
              {courseData.modules.length} módulos
            </span>
            <span className="text-sm text-gray-500">
              {totalContents} elementos
            </span>
          </div>
        </div>
      </div>

      {/* Course Image */}
      <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
        <img
          src={courseData.image || "/placeholder.svg"}
          alt={courseData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              {courseData.title}
            </h2>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Nivel {courseData.level}
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Progreso del Curso</CardTitle>
              <p className="text-white/80 mt-1">
                {completedCount} de {totalContents} elementos completados
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{progressPercentage}%</div>
              <Trophy className="w-8 h-8 mx-auto mt-2" />
            </div>
          </div>
          <Progress value={progressPercentage} className="mt-4 bg-white/20" />
        </CardHeader>
      </Card>

      {/* Certificate Button */}
      {progressPercentage > 0 && (
        <Card className="border-2 border-dashed border-primary/50">
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-2">Certificado de Finalización</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
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
            >
              {progressPercentage === 100
                ? "Descargar Certificado"
                : "Certificado Bloqueado"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modules */}
      <div className="space-y-4">
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
                  <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <CardTitle className="text-lg">
                            {module.title}
                          </CardTitle>
                          <Badge variant="secondary">
                            {moduleCompletedCount}/{module.contents.length}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {module.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Progress
                            value={moduleProgress}
                            className="flex-1 h-2"
                          />
                          <span className="text-sm text-gray-500 min-w-[3rem]">
                            {moduleProgress}%
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        {isOpen ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-3">
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
