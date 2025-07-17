
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, Play, BookOpen, Filter, FileText, HelpCircle } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"

const Search = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [filter, setFilter] = useState<"all" | "video" | "theory" | "quiz">("all")

  const courseData = {
    modules: [
      {
        id: "modulo-1",
        title: "Anatomía del esqueleto humano",
        contents: [
          {
            id: "contenido-1",
            type: "VIDEO" as const,
            title: "Introducción a la anatomía",
            description: "Conceptos básicos de anatomía humana aplicada al ejercicio",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "25 min",
            moduleName: "Anatomía del esqueleto humano",
          },
          {
            id: "contenido-2",
            type: "PDF" as const,
            title: "Manual de anatomía básica",
            description: "Guía completa con ilustraciones del sistema esquelético",
            url: "https://example.com/manual-anatomia.pdf",
            duration: "Lectura 15 min",
            moduleName: "Anatomía del esqueleto humano",
          },
          {
            id: "contenido-4",
            type: "QUIZ" as const,
            title: "Evaluación: Anatomía básica",
            description: "Test de conocimientos sobre anatomía del esqueleto",
            url: "https://example.com/quiz-anatomia",
            duration: "10 min",
            moduleName: "Anatomía del esqueleto humano",
          },
        ],
      },
      {
        id: "modulo-2",
        title: "Articulaciones y movimiento",
        contents: [
          {
            id: "contenido-5",
            type: "VIDEO" as const,
            title: "Tipos de articulaciones",
            description: "Clasificación y características de las articulaciones",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "35 min",
            moduleName: "Articulaciones y movimiento",
          },
          {
            id: "contenido-6",
            type: "DOCX" as const,
            title: "Ejercicios de movilidad articular",
            description: "Rutinas específicas para cada tipo de articulación",
            url: "https://example.com/ejercicios-movilidad.docx",
            duration: "Lectura 20 min",
            moduleName: "Articulaciones y movimiento",
          },
        ],
      },
      {
        id: "modulo-3",
        title: "Sistema muscular",
        contents: [
          {
            id: "contenido-8",
            type: "VIDEO" as const,
            title: "Músculos principales",
            description: "Identificación de los grupos musculares más importantes",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "45 min",
            moduleName: "Sistema muscular",
          },
          {
            id: "contenido-9",
            type: "PDF" as const,
            title: "Atlas muscular ilustrado",
            description: "Guía visual completa del sistema muscular",
            url: "https://example.com/atlas-muscular.pdf",
            duration: "Lectura 25 min",
            moduleName: "Sistema muscular",
          },
        ],
      },
    ],
  }

  // Aplanar todos los contenidos de todos los módulos
  const allContents = courseData.modules.flatMap((module) =>
    module.contents.map((content) => ({
      ...content,
      moduleId: module.id,
      moduleName: content.moduleName || module.title,
    })),
  )

  const filteredResults = useMemo(() => {
    let results = allContents

    // Aplicar filtro por tipo
    if (filter !== "all") {
      if (filter === "video") {
        results = results.filter((item) => item.type === "VIDEO")
      } else if (filter === "theory") {
        results = results.filter((item) => item.type === "PDF" || item.type === "DOCX")
      } else if (filter === "quiz") {
        results = results.filter((item) => item.type === "QUIZ")
      }
    }

    // Aplicar búsqueda por texto
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.moduleName.toLowerCase().includes(searchTerm),
      )
    }

    return results
  }, [query, filter, allContents])

  const getIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <Play className="w-6 h-6" />
      case "PDF":
      case "DOCX":
        return <FileText className="w-6 h-6" />
      case "QUIZ":
        return <HelpCircle className="w-6 h-6" />
      default:
        return <BookOpen className="w-6 h-6" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "VIDEO":
        return "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
      case "PDF":
        return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
      case "DOCX":
        return "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
      case "QUIZ":
        return "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
    }
  }

  const handleItemClick = (item: any) => {
    if (item.type === "VIDEO") {
      // Ir al módulo específico
      navigate(`/curso/fitness-grupal`)
    } else if (item.type === "PDF" || item.type === "DOCX") {
      // Ir a teoría con el contenido específico
      navigate(`/teoria/${item.id}`, {
        state: {
          content: item,
          moduleId: item.moduleId,
          moduleName: item.moduleName,
        },
      })
    } else if (item.type === "QUIZ") {
      // Abrir quiz en nueva ventana
      window.open(item.url, "_blank")
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Buscar Contenido</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Encuentra videos, documentos y evaluaciones en todos los módulos
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="search"
          placeholder="Buscar por título, descripción o módulo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-12 text-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        />
      </div>

      {/* Filtros */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className="whitespace-nowrap"
        >
          Todo
        </Button>
        <Button
          variant={filter === "video" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("video")}
          className="whitespace-nowrap"
        >
          Videos
        </Button>
        <Button
          variant={filter === "theory" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("theory")}
          className="whitespace-nowrap"
        >
          Teoría
        </Button>
        <Button
          variant={filter === "quiz" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("quiz")}
          className="whitespace-nowrap"
        >
          Evaluaciones
        </Button>
      </div>

      {/* Resultados */}
      <div className="space-y-3">
        {filteredResults.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredResults.length} resultado{filteredResults.length !== 1 ? "s" : ""} encontrado
              {filteredResults.length !== 1 ? "s" : ""}
            </p>
            {filteredResults.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                onClick={() => handleItemClick(item)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(item.type)}`}
                    >
                      {getIcon(item.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2">{item.title}</h3>
                        <Badge variant="outline" className={`ml-2 ${getTypeColor(item.type)} border-current`}>
                          {item.type}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{item.description}</p>

                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{item.moduleName}</span>
                        <span>•</span>
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Intenta con otros términos de búsqueda o cambia los filtros
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
