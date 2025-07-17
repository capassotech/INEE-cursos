
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, FileText, Download, CheckCircle, Clock, HelpCircle, FileImage } from "lucide-react"

interface ContentItemProps {
  content: {
    id: string
    type: "VIDEO" | "PDF" | "DOCX" | "QUIZ" | "IMAGE"
    title: string
    description?: string
    url: string
    order: number
    thumbnail?: string
    duration?: string
    completed: boolean
    topics?: string[]
  }
  onToggleComplete: (contentId: string) => void
  onContentClick: (content: any) => void
}

const ContentItem = ({ content, onToggleComplete, onContentClick }: ContentItemProps) => {
  const getIcon = () => {
    switch (content.type) {
      case "VIDEO":
        return <Play className="w-5 h-5" />
      case "PDF":
        return <FileText className="w-5 h-5" />
      case "DOCX":
        return <FileText className="w-5 h-5" />
      case "QUIZ":
        return <HelpCircle className="w-5 h-5" />
      case "IMAGE":
        return <FileImage className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getTypeColor = () => {
    switch (content.type) {
      case "VIDEO":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "PDF":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "DOCX":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "QUIZ":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "IMAGE":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleActionClick = () => {
    if (content.type === "VIDEO") {
      onContentClick(content)
    } else {
      window.open(content.url, "_blank")
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="flex items-center space-x-4 flex-1">
        {/* Checkbox de completado */}
        <button
          onClick={() => onToggleComplete(content.id)}
          className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
            content.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 dark:border-gray-600 hover:border-green-500"
          }`}
        >
          {content.completed && <CheckCircle className="w-4 h-4" />}
        </button>

        {/* Thumbnail para videos */}
        {content.type === "VIDEO" && content.thumbnail && (
          <div className="relative flex-shrink-0 cursor-pointer" onClick={handleActionClick}>
            <img
              src={content.thumbnail || "/placeholder.svg?height=48&width=64&text=VIDEO"}
              alt={content.title}
              className="w-16 h-12 object-cover rounded"
            />
            <div className="absolute inset-0 bg-black/30 rounded flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
          </div>
        )}

        {/* Icono para otros tipos */}
        {content.type !== "VIDEO" && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor()}`}>{getIcon()}</div>
        )}

        {/* Información del contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{content.title}</h4>
            <Badge variant="outline" className={getTypeColor()}>
              {content.type}
            </Badge>
          </div>

          {content.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">{content.description}</p>
          )}

          {/* Topics */}
          {content.topics && content.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {content.topics.slice(0, 3).map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {content.topics.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{content.topics.length - 3} más
                </Badge>
              )}
            </div>
          )}

          {content.duration && (
            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{content.duration}</span>
            </div>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleActionClick}>
          {content.type === "VIDEO" ? (
            <>
              <Play className="w-4 h-4 mr-1" />
              Ver
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-1" />
              Abrir
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default ContentItem
