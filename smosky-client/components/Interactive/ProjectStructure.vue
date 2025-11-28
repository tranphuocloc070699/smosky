<template>
  <ClientOnly>
    <div class="flex items-start border border-slate-200 rounded-md ">
      <div class="border-r border-slate-200 br-8 flex-1 h-[660px] overflow-y-scroll scrollbar">
        <h4
          class="border-b border-slate-200 p-4 text-center bg-slate-100 font-medium text-lg"
        >
          {{ props.data.name }}
        </h4>
        <div class="bg-gray-50">
          <ProjectStructureFromJson :node="props.data"  />
        </div>
      </div>
      <div v-show="!isMobile" class="flex-1 w-[500px]  h-[660px] overflow-y-scroll scrollbar">
        <h4
          class="border-b border-slate-200 p-4  text-center bg-slate-100 font-medium text-lg"
        >
          {{ fileSelected.name }}
        </h4>
        <div class="-my-2">
          <pre
            class="rounded-none scrollbar"
          ><code :class="`lang-${fileSelected.language}`">{{ fileSelected.content }}</code></pre>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="tsx">
interface IProps {
  node: IProjectStructure;
}

import type { IProjectStructure } from "~/types/model";
import folderIcon from "~/assets/images/folder-icon.svg";
import arrowRightIcon from "~/assets/images/arrow-right.svg";
import arrowDownIcon from "~/assets/images/arrow-down.svg";
import javaIcon from "~/assets/images/java-icon.svg";
import fileIcon from "~/assets/images/file-icon.svg";
import settingIcon from "~/assets/images/setting-icon.svg";
import xmlIcon from "~/assets/images/xml-icon.svg";
import Prism from "prismjs";
import { sleep } from "~/utils/timer";
import { useMobileDetector } from "@/composables/useState";
// import "prismjs/themes/prism.min.css";
import "~/assets/css/one-dark.css";

const props = defineProps<{
  data: IProjectStructure;
}>();

const isMobile = useMobileDetector()

const fileSelected = ref({
  id: "",
  name: "File name",
  content: "",
  language: "",
});

const ProjectStructureFromJson = ({ node }: IProps) => {
  const data = (
    <div
      class={`font-semibold py-1 px-4 overflow-y-hidden overflow-x-visible ${
        node.isExpanded ? "h-full" : "h-10"
      }`}
    >
      <p
        key={node.id}
        id={node.id}
        onClick={(e) => onFolderToggle(node)}
        class={`cursor-pointer flex items-center py-1 gap-2 px-4 w-full  hover:bg-slate-100 rounded-md`}
      >
        <img src={folderIcon} />
        {node.name}
        <img src={node.isExpanded ? arrowRightIcon : arrowDownIcon} />
      </p>

      {node.nodeList.length > 0 ? (
        node.nodeList.map((item) => {
          if (item.type === "file")
            return (
              <div
                onClick={() => onFileSelected(item)}
                key={item.id}
                class={`p-8 text-gray-700 font-light py-1 hover:bg-slate-100 rounded-md cursor-pointer flex items-center gap-2}`}
              >
                <img src={getIconFromExtension(item.name)} />
                {item.name}
              </div>
            );
          else return ProjectStructureFromJson({ node: item });
        })
      ) : (
        <div></div>
      )}
    </div>
  );
  return data;
};

const onFileSelected = async (node: IProjectStructure) => {
  if (node.content) {
    fileSelected.value = {
      id: node.id,
      name: node.name,
      content: node.content,
      language: getLanguageFromExtension(node.name),
    };
  }
  await sleep(50);
  Prism.highlightAll();
};

const getLanguageFromExtension = (filename: string) => {
  let extension = filename.split(".").pop();
  switch (extension) {
    case "java":
      extension = "js";
      break;
    default:
      extension = "js";
      break;
  }
  return extension;
};

const getIconFromExtension = (filename: string) => {
  const extension = filename.split(".").pop();
  let image;
  switch (extension) {
    case "java":
      image = javaIcon;
      break;
    case "properties":
      image = settingIcon;
      break;
    case "xml":
      image = xmlIcon;
      break;
    default:
      image = fileIcon;
      break;
  }
  return image;
};

const onFolderToggle = (node: IProjectStructure) => {
  node.isExpanded = !node.isExpanded;
};
</script>

<style lang="scss" scoped></style>
