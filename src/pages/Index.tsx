
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: "1",
      title: "Cómo iniciar tu propio negocio desde cero",
      description:
        "Descubre paso a paso cómo validar tu idea de negocio, crear un MVP, buscar financiamiento y lanzar tu producto al mercado.",
      type: 'ON_DEMAND' as const,
      image: "https://i.ytimg.com/vi/xrv2K3p6sfM/maxresdefault.jpg",
      duration: "25 horas",
      instructor: "Laura Domínguez",
      level: "Inicial",
      modules: 8,
      progress: 45,
      features: [
        "Guía de plan de negocios",
        "Ejemplos reales de startups exitosas",
        "Acceso a comunidad de emprendedores"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center justify-center rounded-full mb-4">
          <img src="/logo.png" alt="Logo" className="w-40" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Instituto de Negocios Emprendedor Empresarial
        </p>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 ml-1">
          Mis formaciones
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => navigate("/clases")}
            >
              <CardContent className="p-0 flex flex-col sm:flex-row">
                {/* Imagen del curso */}
                <div className="sm:w-1/3 w-full h-48 sm:h-auto relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
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
                          {course.modules} módulos
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
            <h3 className="text-xl font-bold">Adquirir más cursos</h3>
            <p className="text-white/80 mt-2">
              Explora nuestra plataforma de cursos completos
            </p>
          </CardHeader>
        </Card>
      </a>
    </div>
  );
};

export default Index;