
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
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Carrusel de banners */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg mb-10">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Puntos de navegación */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentBannerIndex ? "bg-white" : "bg-white/50"
                }`}
              onClick={() => setCurrentBannerIndex(index)}
              aria-label={`Ir a banner ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <div className="rounded-lg flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="w-52" />
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 ml-1">
          Mis formaciones
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {allCourses.map((course) => (
            <Card
              key={course.id}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/clases/${course.id}`)}
            >
              <CardContent className="p-0 flex flex-col sm:flex-row">
                {/* Imagen del curso */}
                <div className="sm:w-1/3 w-full h-48 sm:h-auto relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="object-cover w-full h-48 transition-transform hover:scale-105"
                  />
                </div>

                {/* Contenido del curso */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{course.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{course.description}</p>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {course.level}
                        </span>
                        <span className="text-xs">
                          {course.modules.length} módulos
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Barra de progreso */}
                    <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 mt-4 rounded">
                      <div
                        className="h-1 bg-primary rounded"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
          <CardHeader className="text-center py-8">
            <h3 className="text-xl font-bold">Adquirir más formaciones</h3>
            <p className="text-white/80 mt-2">
              Explora nuestra plataforma de formaciones completas
            </p>
          </CardHeader>
        </Card>
      </a>
    </div>
  );
};

export default Index;