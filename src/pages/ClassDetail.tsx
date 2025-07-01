import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Play,
  Clock,
  Users,
  Download,
  Share,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { allCourses } from "@/lib/coursesMock";
import React from "react";

const ClassDetail = () => {
  const { courseId, moduleId, classId } = useParams<{ courseId: string; moduleId: string; classId: string }>();
  const navigate = useNavigate();

  window.scrollTo(0, 0);

  // Estado local de progreso (simula conexión con backend)
  const [completedClasses, setCompletedClasses] = useLocalStorage<string[]>(
    "completedClasses",
    []
  );

  let courseData = null;
  let moduleData = null;
  let classData = null;

  // Búsqueda de curso, módulo y clase por ID
  for (const course of allCourses) {
    for (const module of course.modules) {
      const foundClass = module.classes.find((clase) => clase.id === classId);
      if (foundClass && module.id === moduleId) {
        courseData = course;
        moduleData = module;
        classData = foundClass;
        break;
      }
    }
    if (classData) break;
  }

  if (!classData || !moduleData || !courseData) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Clase no encontrada</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          No pudimos encontrar la clase que buscas.
        </p>
        <Button onClick={() => navigate("/clases")} className="mt-4">
          Volver a las clases
        </Button>
      </div>
    );
  }

  const isCompleted = completedClasses.includes(classData.id);

  const toggleCompleted = () => {
    if (isCompleted) {
      setCompletedClasses(completedClasses.filter(id => id !== classData.id));
    } else {
      setCompletedClasses([...completedClasses, classData.id]);
    }
  };

  // Encontrar índice de la clase actual
  const classIndex = moduleData.classes.findIndex((clase) => clase.id === classId);
  const nextClass = classIndex >= 0 ? moduleData.classes[classIndex + 1] : null;
  const isAtFirstClass = classIndex === 0;

  // Navegar a próxima clase
  const goToNextClass = () => {
    if (nextClass) {

      navigate(`/clases/${courseId}/${moduleId}/${nextClass.id}`);
      window.scrollTo(0, 0);
    }
  };

  // Navegar a la clase anterior
  const goToPreviousClass = () => {
    if (classIndex > 0) {
      const previousClassId = moduleData.classes[classIndex - 1]?.id;
      if (previousClassId) {
        navigate(`/clases/${courseId}/${moduleId}/${previousClassId}`);
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 md:grid md:grid-cols-4 md:gap-8 md:space-y-0">
      {/* Main Content */}
      <div className="md:col-span-3 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/clases/${courseId}`)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <Badge variant="outline" className="mb-2">
              {moduleData.title}
            </Badge>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              {classData.title}
            </h1>
          </div>
        </div>

        {/* Video Player */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-900 rounded-t-lg relative overflow-hidden">
              <iframe
                src={classData.videoUrl}
                title={classData.title}
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{classData.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{classData.profesor}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Descripción */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Descripción
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {classData.description}
            </p>
          </CardContent>
        </Card>

        {/* Objetivos */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Objetivos de Aprendizaje
            </h2>
            <ul className="space-y-2">
              {classData.objectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Material complementario */}
        {classData.resources.length > 0 && (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Material Complementario
              </h2>
              <div className="space-y-3">
                {classData.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                        <Download className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {resource.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {resource.type}
                        </p>
                      </div>
                    </div>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        Descargar
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Botones de navegación */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPreviousClass}
            disabled={isAtFirstClass}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Clase Anterior
          </Button>
          <Button onClick={goToNextClass} disabled={!nextClass}>
            Próxima Clase
            <Play className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Sidebar - Lista de clases del módulo */}
      <div className="md:col-span-1 space-y-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 sticky top-6">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Clases del módulo</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {moduleData.classes.map((clase) => (
                <li key={clase.id} className="group">
                  <button
                    onClick={() =>
                      navigate(`/clases/${courseId}/${moduleId}/${clase.id}`)
                    }
                    className={`flex items-center w-full p-3 text-left ${clase.id === classId
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                  >
                    <div
                      className={`w-5 h-5 mr-3 flex items-center justify-center rounded-full aspect-square ${completedClasses.includes(clase.id)
                          ? "bg-green-500 text-white"
                          : "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        }`}
                    >
                      {completedClasses.includes(clase.id) && (
                        <CheckCircle className="w-3 h-3" />
                      )}
                    </div>

                    <span
                      className={`
                                ${clase.id === classId
                          ? "font-medium text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300"
                        }
                                truncate block max-w-full
                              `}
                    >
                      {clase.title}
                    </span>
                    <ChevronRight className="ml-auto w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </button>
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              variant={isCompleted ? "secondary" : "default"}
              onClick={toggleCompleted}
            >
              {isCompleted ? "Desmarcar como completado" : "Marcar como completado"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassDetail;

// Hook personalizado para usar localStorage como estado
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}