import type {
  IBoilerplate,
  IPost,
  ISpringDependencyItem,
  ITag,
} from "~/types/model";
import type { ICreateBoilerplate } from "~/types/request";

export const usePostList = () => useState<IPost[]>("post-list", () => []);

export const usePost = () =>
  useState<IPost>("post-item", () => ({
    id: -1,
    thumbnail: "",
    title: "",
    slug: "",
    preContent: "",
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    tocs: [],
  }));

export const useMobileDetector = () =>
  useState<boolean>('is-mobile',() => false)


export const useBoilerplateList = () =>
  useState<IBoilerplate[]>("boilerplate-list", () => []);

export const useTagList = () => useState<ITag[]>("tag-list", () => []);

export const useBoilerplateItem = () =>
  useState<IBoilerplate | null>("boilerplate-item", () => null);

export const useSpringDependenciesSelected = () =>
  useState<ISpringDependencyItem[]>(
    "boilerplate-spring-dependencies",
    () => []
  );
export const useCreateBoilerplateData = () =>
  useState<ICreateBoilerplate>("create-boilerplate-data", () => ({
    type: "maven-project",
    bootVersion: "4.0.0",
    metadata: {
      groupId: {
        value: "com.example",
        error: {
          invalid: false,
          message: "",
        },
      },
      artifactId: {
        value: "demo",
        error: {
          invalid: false,
          message: "",
        },
      },
      name: {
        value: "demo",
        error: {
          invalid: false,
          message: "",
        },
      },
      description: "Spring boot project description",
      packaging: "jar",
      jvmVersion: 17,
    },
    dependencies: [],
    entities: [],
    crud: false,
  }));
