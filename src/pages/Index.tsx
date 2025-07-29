import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { allCourses } from "@/lib/coursesMock";

const Index = () => {
  const navigate = useNavigate();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const banners = [
    "https://universidad.gruposuperior.com.co/wp-content/uploads/2021/05/BANNER-PROMOCIONAL-1.png",
    "https://alehlatam.org/wp-content/uploads/2024/12/BANNER-V-Curso-HCC.png",
    "https://calate.com.mx/wp-content/uploads/2024/02/banner-tuyo-cursoserigrafia-cursosublimacio-monterrey-2048x583-1.png",
    "https://cui.edu.ar/images/becas/promoverano_ed_bannerweb.jpg",
  ];

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getActualProgress = (course: any) => {
    const totalContents = course.modules.reduce(
      (acc: number, module: any) => acc + module.contents.length,
      0
    );
    const completedContents = course.modules.reduce(
      (acc: number, module: any) =>
        acc +
        module.contents.filter((content: any) => content.completed).length,
      0
    );
    return totalContents > 0
      ? Math.round((completedContents / totalContents) * 100)
      : 0;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
      {/* Carrusel de banners */}
      <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl shadow-lg mb-6 sm:mb-10">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={
                  banner ||
                  "/placeholder.svg?height=200&width=800&query=course banner" ||
                  "/placeholder.svg"
                }
                alt={`Banner ${index + 1}`}
                className="w-full h-32 sm:h-48 md:h-56 lg:h-64 object-cover"
              />
            </div>
          ))}
        </div>
        {/* Puntos de navegación */}
        <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center space-x-1 sm:space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentBannerIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentBannerIndex(index)}
              aria-label={`Ir a banner ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Logo */}
      <div className="text-center mt-4">
        <div className="rounded-lg flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-32 sm:w-40 md:w-52 block dark:hidden"
          />
          <img
            src="/logo-blanco.png"
            alt="Logo blanco"
            className="w-32 sm:w-40 md:w-52 hidden dark:block"
          />
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 ml-1">
          Mis formaciones
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {allCourses.map((course) => {
            const actualProgress = getActualProgress(course);
            const totalContents = course.modules.reduce(
              (acc, module) => acc + module.contents.length,
              0
            );
            return (
              <Card
                key={course.id}
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/curso/${course.id}`)}
              >
                <CardContent className="p-0 flex flex-col sm:flex-row">
                  {/* Imagen del curso */}
                  <div className="w-full sm:w-1/3 h-40 sm:h-32 md:h-40 relative overflow-hidden flex-shrink-0">
                    <img
                      src={
                        course.image ||
                        "/placeholder.svg?height=160&width=240&query=course image" ||
                        "/placeholder.svg"
                      }
                      alt={course.title}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  {/* Contenido del curso */}
                  <div className="p-4 flex-1 flex flex-col justify-between min-w-0">
                    <div className="mb-3 sm:mb-4">
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-gray-100 break-words">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 break-words">
                        {course.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full whitespace-nowrap">
                            {course.level}
                          </span>
                          <span className="text-xs whitespace-nowrap">
                            {course.modules.length} módulos
                          </span>
                          <span className="text-xs whitespace-nowrap">
                            {totalContents} elementos
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 self-end sm:self-center" />
                      </div>
                      {/* Barra de progreso */}
                      <div className="flex items-center gap-2 mt-3 sm:mt-4">
                        <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 rounded">
                          <div
                            className="h-1 bg-primary rounded transition-all duration-300"
                            style={{ width: `${actualProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 min-w-[2.5rem] text-right">
                          {actualProgress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Botón para adquirir más cursos */}
      <a
        href="https://inee-beta.web.app/formaciones"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Card className="bg-primary hover:bg-primary/90 border-2 border-primary text-white dark:bg-primary dark:hover:bg-primary/90 dark:border-primary transition-colors duration-300">
          <CardHeader className="text-center py-6 sm:py-8">
            <h3 className="text-lg sm:text-xl font-bold">
              Adquirir más formaciones
            </h3>
            <p className="text-white/80 mt-2 text-sm sm:text-base">
              Explora nuestra plataforma de formaciones completas
            </p>
          </CardHeader>
        </Card>
      </a>
    </div>
  );
};

export default Index;
