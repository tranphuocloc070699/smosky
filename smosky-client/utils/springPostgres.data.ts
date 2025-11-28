/* SpringStarter */
export const projectOptions = [
  {
    value: "maven-project",
    label: "Maven",
  },
  {
    value: "gradle-kotlin",
    label: "Gradle - Kotlin",
    disabled: true,
  },
  {
    value: "gradle-groovy",
    label: "Gradle - Groovy",
    disabled: true,
  },
];

export const languageOptions = [
  {
    value: "java",
    label: "Java",
  },
  {
    value: "kotlin",
    label: "Kotlin",
    disabled: true,
  },
  {
    value: "groovy",
    label: "Groovy",
    disabled: true,
  },
];

export const springBootVersionOptions = [
  {
    value: "4.0.0-SNAPSHOT",
    label: "4.0.0 (SNAPSHOT)",
  },
  {
    value: "4.0.0-M1",
    label: "4.0.0 (M1)",
  },
  {
    value: "3.5.5-SNAPSHOT",
    label: "3.5.5 (SNAPSHOT)",
  },
  {
    value: "3.5.4",
    label: "3.5.4",
  },
  {
    value: "3.4.9-SNAPSHOT",
    label: "3.4.9 (SNAPSHOT)",
  },
  {
    value: "3.4.8",
    label: "3.4.8",
  },
];

export const packagingOptions = [
  {
    value: "jar",
    label: "Jar",
  },
  {
    value: "war",
    label: "War",
    disabled: true,
  },
];

export const javaVersionOptions = [
  {
    value: "17",
    label: "17",
  },
  {
    value: "21",
    label: "21",
  },
];


/* Spring Entities */
export const entitiesData = [
  {
    name: "User",
    isActive: true,
  },
  {
    name: "Post",
    isActive: false,
  },
  {
    name: "Course",
    isActive: false,
  },
  {
    name: "Address",
    isActive: false,
  },
];

export const entitiesOptions = [
  {
    label: "User",
    value: "user",
  },
  {
    label: "Post",
    value: "post",
  },
  {
    label: "Course",
    value: "course",
  },
  {
    label: "Address",
    value: "address",
  },
]

/* SpringStarterDependency */
export const springStarterDependencyData = [
  {
    name: "GraphQL DGS Code Generation",
    description:
        "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
  },
  {
    name: "GraphQL DGS Code Generation 2",
    description:
        "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
  },
  {
    name: "GraphQL DGS Code Generation 3",
    description:
        "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
  },
  {
    name: "GraphQL DGS Code Generation 4",
    description:
        "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
  },
  {
    name: "GraphQL DGS Code Generation 5",
    description:
        "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
  },
  {
    name: "GraphQL DGS Code Generation 6",
    description:
        "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
  },
  {
    name: "GraphQL DGS Code Generation 7",
    description:
        "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
  },
  {
    name: "GraphQL DGS Code Generation 8",
    description:
        "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
  },
  {
    name: "GraphQL DGS Code Generation 9",
    description:
        "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
  },
  {
    name: "GraphQL DGS Code Generation 10",
    description:
        "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
  },
]

/* AddSpringDependency */
export const addSpringDependencyData = [
  {
    name: "Spring Web",
    children: [
      {
        name: "GraphQL DGS Code Generation",
        description:
            "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
      },
      {
        name: "GraphQL DGS Code Generation 2",
        description:
            "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
      },
      {
        name: "GraphQL DGS Code Generation 3",
        description:
            "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
      },
      {
        name: "GraphQL DGS Code Generation 4",
        description:
            "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
      },
      {
        name: "GraphQL DGS Code Generation 5",
        description:
            "Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.",
      },
    ],
  },
  {
    name: 'Database',
    children: [
      {
        name: 'Database',
        description: 'Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.'
      },
      {
        name: 'Database 2',
        description: 'Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.'
      },
      {
        name: 'Database 3',
        description: 'Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.'
      },
      {
        name: 'Database 4',
        description: 'Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.'
      },
      {
        name: 'Database 5',
        description: 'Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.'
      },
    ]
  }
];


export const originalTypes = [
  {
    name: "String",
    value: "String",
  },
  {
    name: "Integer",
    value: "Integer",
  },
  {
    name: "Boolean",
    value: "Boolean",
  },
  {
    name: "OneToMany",
    value: "OneToMany",
  },
  {
    name: "ManyToOne",
    value: "ManyToOne",
  },
  {
    name: "OneToOne",
    value: "OneToOne",
  },
  {
    name: "ManyToMany",
    value: "ManyToMany",
  },
];


    