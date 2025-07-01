export const allCourses = [
  {
    id: "0",
    title: "Moldería y confección de campera tipo parka",
    description: "Moldería base y especifica. Paso a paso de corte y armado. Asistencia de alumno/a. Teoría y práctica en PDF y videos. Certificado de asistencia.",
    date: "11 de Julio, 14:00 hs",
    type: 'ASYNC' as const,
    image: "/ejemplo-curso.png",
    duration: "4 horas",
    profesor: "Rocío Ailén Krämer",
    level: "Inicial",
    progress: 10,
    features: [
      "Moldería base y específica",
      "Paso a paso de corte y armado",
      "Asistencia personalizada",
      "Teoría y práctica en PDF y videos",
      "Certificado de asistencia"
    ],
    modules: [
      {
        id: "modulo-1",
        title: "Introducción a MASTER DE MOLDERIA Y CONFECCION DE CAMPERON TIPO PARKA",
        description: "Introducción a la moldería y herramientas básicas.",
        classes: [
          {
            id: "clase-1",
            title: "Introducción a MASTER DE MOLDERIA Y CONFECCION DE CAMPERON TIPO PARKA",
            duration: "22 min",
            description: "En esta clase introductoria, aprenderás los conceptos básicos de la moldería y su importancia en la confección de prendas.",
            videoUrl: "https://youtu.be/k6GFz1kw1bY?si=lEf81Qfu7UpPEP58",
            thumbnail: "https://http2.mlstatic.com/D_NQ_NP_766761-MLA82625997088_032025-O.webp",
            profesor: "Rocío Ailén Krämer",
            resources: [
              {
                name: "Introducción a la Moldería y Confección",
                type: "PDF",
                url: "/ejemplo-pdf.pdf",
              },
            ],
            objectives: [
              "Comprender los conceptos básicos de la moldería.",
              "Identificar la importancia de la moldería en la confección de prendas.",
              "Familiarizarse con los términos técnicos utilizados en moldería.",
            ],
            completed: true,
          },
          {
            id: "clase-2",
            title: "PATRONAJE base de cuerpo y manga.",
            duration: "39 min",
            description:
              "En esta clase, aprenderás a crear el patrón base del cuerpo y la manga, fundamentales para la confección de cualquier prenda.",
            videoUrl: "https://youtu.be/mvCttGLNwE0?si=TWYd9d3vjGH9Jx9d",
            thumbnail: "https://patterncos.com/wp-content/uploads/2018/06/Manga_sastre_Tutorial_01-1024x683.png",
            profesor: "Rocío Ailén Krämer",
            resources: [
              {
                name: "Patronaje base de cuerpo y manga",
                type: "PDF",
                url: "/ejemplo-pdf.pdf",
              },
            ],
            objectives: [
              "Aprender a crear el patrón base del cuerpo.",
              "Diseñar la manga base adecuada para la prenda.",
              "Entender las proporciones y medidas necesarias para un buen ajuste.",
            ],
            completed: false,
          },
          {
            id: "clase-3",
            title:
              "MOLDERIA ESPECIFICA DE CAMPERÓN TIPO PARKA",
            duration: "32 min",
            description:
              "En esta clase, nos enfocaremos en la moldería específica para el camperón tipo parka, incluyendo detalles como bolsillos y capucha.",
            videoUrl: "https://youtu.be/ZYuizK01p-U?si=Wb3V1qokJReRB7fU",
            thumbnail: "https://i.pinimg.com/564x/47/92/49/47924957309ea96cee07ea9f525bad67.jpg",
            profesor: "Rocío Ailén Krämer",
            resources: [
              {
                name: "Moldería Específica de Camperón Tipo Parka",
                type: "PDF",
                url: "/ejemplo-pdf.pdf",
              },
            ],
            objectives: [
              "Conocer las características específicas del camperón tipo parka.",
              "Aprender a diseñar la moldería para un camperón tipo parka.",
              "Incorporar detalles como bolsillos y capucha en la moldería.",
            ]
          }
        ],
      },
      {
        id: "modulo-2",
        title: "Armado y preparación de la Campera Tipo Parka",
        description:
          "En este módulo, aprenderás a armar y preparar la campera tipo parka, incluyendo el corte de las piezas y la preparación de los materiales.",
        classes: [
          {
            id: "clase-4",
            title:
              "Presentación de partes cortadas, vistas de Forrería y bolsillos.",
            duration: "22 min",
            description:
              "En esta clase, presentaremos las partes cortadas de la campera tipo parka, incluyendo las vistas de forrería y los bolsillos.",
            videoUrl: "https://youtu.be/f7MpCD_BXH8?si=U38KnMb_-vtyjQRQ",
            thumbnail: "https://www.localesbambaci.com.ar/cdn/shop/files/11MRUB2213-SUNDAYPARKA-NEGRO_2x_905f8935-47b3-44c6-b973-b9ef7f099690_480x480.webp?v=1684275467",
            profesor: "Rocío Ailén Krämer",
            resources: [
              {
                name: "Presentación de partes cortadas",
                type: "PDF",
                url: "/ejemplo-pdf.pdf",
              },
            ],
            objectives: [

            ],
          },
          {
            id: "clase-5",
            title: "Armado; cierre; colocación de manga; capucha; pestaña, ensamble final",
            duration: "49 min",
            description:
              "",
            videoUrl: "https://youtu.be/5VAO3KFsk0E?si=VA2EIqDQfndGzUbX",
            thumbnail: "https://acdn-us.mitiendanube.com/stores/001/924/058/products/ms901-35-21-e70bd2273023df0f6316839148963374-240-0.jpg",
            profesor: "Rocío Ailén Krämer",
            resources: [
              {
                name: "Introducción a la Moldería y Confección",
                type: "PDF",
                url: "/ejemplo-pdf.pdf",
              },
            ],
            objectives: [
              "Aprender a ensamblar las diferentes partes de la campera tipo parka.",
              "Colocar el cierre y las mangas correctamente.",
              "Incorporar la capucha y la pestaña en el diseño final.",
              "Realizar el ensamble final de la prenda.",
            ],
          }
        ]
      }
    ]
  },
  {
    id: "1",
    title: "Cómo iniciar tu propio negocio desde cero",
    description:
      "Descubre paso a paso cómo validar tu idea de negocio, crear un MVP, buscar financiamiento y lanzar tu producto al mercado.",
    type: 'ON_DEMAND' as const,
    image: "https://i.ytimg.com/vi/xrv2K3p6sfM/maxresdefault.jpg",
    duration: "4 horas",
    profesor: "Laura Domínguez",
    level: "Inicial",
    progress: 45,
    features: [
      "Guía de plan de negocios",
      "Ejemplos reales de startups exitosas",
      "Acceso a comunidad de emprendedores"
    ],
    modules: [
      {
        id: "modulo-1",
        title: "Validación de tu Idea de Negocio",
        description:
          "Aprende a validar si tu idea es viable y tiene mercado antes de invertir tiempo o dinero.",
        classes: [
          {
            id: "clase-1",
            title: "¿Qué es una buena idea de negocio?",
            duration: "25 min",
            description:
              "En esta clase aprenderás cómo identificar ideas viables y validarlas antes de invertir tiempo o dinero.",
            videoUrl: "https://www.youtube.com/embed/2_zMt853gTw",
            thumbnail:
              "https://innokabi.com/wp-content/uploads/2018/01/consejos-hacer-exitosa-idea-negocio.jpg",
            profesor: "Laura Domínguez",
            resources: [
              {
                name: "Guía de validación de ideas",
                type: "PDF",
                url: "https://materiales.axontraining.com/materiales/28/Axon_28_4418.Pdf",
              },
            ],
            objectives: [
              "Definir lo que es una idea de negocio viable",
              "Identificar necesidades reales en el mercado",
              "Evaluar si tu idea puede convertirse en un negocio sostenible",
            ],
            completed: true,
          },
          {
            id: "clase-2",
            title: "Investigación de mercado básica",
            duration: "30 min",
            description:
              "Descubre cómo realizar una investigación de mercado efectiva sin gastar mucho. Aprenderás técnicas básicas para recopilar información sobre tus clientes potenciales y competidores.",
            videoUrl: "https://www.youtube.com/embed/20mhUzT_B2Y",
            thumbnail:
              "https://www.salesforce.com/mx/blog/wp-content/uploads/sites/11/2024/08/CRM-data-strategy.webp",
            profesor: "Laura Domínguez",
            resources: [
              {
                name: "Plantilla encuesta de mercado",
                type: "DOCX",
                url: "https://ejemplo.com/plantilla-encuesta.docx",
              },
            ],
            objectives: [
              "Entender las herramientas básicas de investigación de mercado",
              "Realizar encuestas sencillas y útiles",
              "Analizar competencia local",
            ],
            completed: false,
          },
          {
            id: "clase-3",
            title: "Entrevistas a clientes potenciales",
            duration: "28 min",
            description:
              "Aprende a diseñar y realizar entrevistas efectivas a posibles clientes para validar tu idea de negocio y entender sus necesidades reales.",
            videoUrl: "https://www.youtube.com/embed/MnuIQ1uJokg",
            thumbnail:
              "https://togrowagencia.com/wp-content/uploads/2021/08/conseguir-clientes-potenciales-1.jpg",
            profesor: "Laura Domínguez",
            resources: [
              {
                name: "Guía de preguntas para entrevistar clientes",
                type: "PDF",
                url: "https://ejemplo.com/guia-entrevistas.pdf",
              },
            ],
            objectives: [
              "Diseñar guiones efectivos para entrevistas",
              "Conducir entrevistas exitosas",
              "Interpretar los resultados obtenidos",
            ],
            completed: false,
          },
        ],
      },
      {
        id: "modulo-2",
        title: "Construcción del Modelo de Negocio",
        description:
          "Diseña un modelo de negocio claro y funcional usando herramientas como el Canvas.",
        classes: [
          {
            id: "clase-4",
            title: "Introducción al Business Model Canvas",
            duration: "30 min",
            thumbnail:
              "https://ppcexpo.com/blog/wp-content/uploads/2024/05/what-is-a-business-model-canvas.jpg",
            completed: false,
          },
          {
            id: "clase-5",
            title: "Definiendo tu propuesta de valor",
            duration: "25 min",
            thumbnail:
              "https://webescuela.com/wp-content/uploads/2021/07/que-es-la-propuesta-de-valor.png.webp",
            completed: false,
          },
          {
            id: "clase-6",
            title: "Estructura de costos e ingresos",
            duration: "27 min",
            thumbnail:
              "https://empresaygestionbi.weebly.com/uploads/2/4/8/0/24808920/4681934_orig.jpg",
            completed: false,
          },
        ],
      },
      {
        id: "modulo-3",
        title: "Creación del MVP (Producto Mínimo Viable)",
        description:
          "Desarrolla un prototipo básico de tu producto o servicio para probarlo con usuarios reales.",
        classes: [
          {
            id: "clase-7",
            title: "¿Qué es un MVP y por qué es importante?",
            duration: "22 min",
            thumbnail:
              "https://i0.wp.com/www.coachcedric.com/wp-content/uploads/2020/01/MVPlogo.png?fit=389%2C259&ssl=1",
            completed: false,
          },
          {
            id: "clase-8",
            title: "Cómo construir un MVP rápido y económico",
            duration: "30 min",
            thumbnail:
              "https://i0.wp.com/www.coachcedric.com/wp-content/uploads/2020/01/MVPlogo.png?fit=389%2C259&ssl=1",
            completed: false,
          },
        ],
      },
      {
        id: "modulo-4",
        title: "Lanzamiento y Crecimiento",
        description:
          "Prepara el lanzamiento de tu producto y aprende estrategias básicas de crecimiento.",
        classes: [
          {
            id: "clase-9",
            title: "Estrategias de lanzamiento inicial",
            duration: "28 min",
            thumbnail:
              "https://www.marketingdirecto.com/wp-content/uploads/2021/01/lanzamiento-producto-pasos.png",
            completed: false,
          },
          {
            id: "clase-10",
            title: "Marketing básico para emprendedores",
            duration: "30 min",
            thumbnail:
              "https://www.businessempresarial.com.pe/wp-content/uploads/2022/06/marke.jpg",
            completed: false,
          },
        ],
      },
    ],
  },
];