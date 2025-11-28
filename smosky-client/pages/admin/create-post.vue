<template>
  <!-- Navigation -->
  <div
    class="bg-slate-100 flex items-center gap-2 py-2 px-4 text-sm font-normal"
  >
    <span class="cursor-pointer hover:underline">Admin</span>
    <UIcon name="i-heroicons-chevron-right" />
    <strong class="cursor-pointer hover:underline">Create Post</strong>
  </div>
  <div class="grid grid-cols-12 p-8 bg-gradient-to-b from-slate-100">
    <div class="col-span-3"></div>
    <div class="col-span-6">
      <h2 class="text-2xl font-medium text-center">Create Post</h2>
      <div class="py-4">
        <label for="title" class="text-sm font-medium">Title</label>
        <UInput
          type="text"
          id="title"
          v-model="dto.title"
          size="md"
          @input="onTitleChange"
          @paste="onTitlePaste"
        />
      </div>
      <div class="py-4">
        <label for="title" class="text-sm font-medium">Slug</label>
        <UInput type="text" id="title" v-model="dto.slug" size="md" />
      </div>
      <div class="py-4">
        <label for="title" class="text-sm font-medium">Thumbnail</label>
        <UInput type="text" size="md" id="thumbnail" v-model="dto.thumbnail" />
      </div>
      <!--       <div class="py-4">
        <label for="title" class="text-sm font-medium">Tag</label>
        <UButton class="ml-4" color="white" label="Open" @click="isOpen = true" />

        <UModal v-model="isOpen">
            <UCommandPalette
          v-model="selected"
          multiple
          nullable
          :autoselect="false"
          :groups="[{ key: 'tag', commands: tag }]"
          :fuse="{ resultLimit: 6, fuseOptions: { threshold: 0.1 } }"
        />
        </UModal>
       
      </div> -->
      <div class="py-4">
        <label for="title" class="text-sm font-medium">Pre content</label>
        <UTextarea type="text" id="title" v-model="dto.preContent" />
      </div>

      <div class="py-4">
        <label for="title" class="text-sm font-medium">Content</label>
        <ClientOnly>
          <Editor
            v-model="dto.content"
            api-key="kdfp4jryhvd3ycflqhdz5vboj1qla6h9eteujcga5uj4nod3"
            :init="{
        menubar:false,
/*         images_upload_handler: uploadImageHandle, */
        plugins: 'codesample anchor link help table image',

        toolbar:
              'customTOC | undo redo | styles | \
            alignleft aligncenter alignright alignjustify | \
            outdent indent | codesample| link | table | image | \
            help | custom-remove-image',
            setup: (editor : any) => {
              editor.ui.registry.addButton('custom-remove-image', {
                text: 'Remove Image',
                onAction: (api : any) => {
                  removeImageHandler(editor)
                  api.isEnabled = () => false
                }
              });
              editor.ui.registry.addButton('customTOC', {
                text: 'TOC',
                onAction: (test : any) => {
                  customTOCHandler(editor)
                },
              });
              
            },
      }"
          />
        </ClientOnly>
      </div>

      <div class="py-8 text-end">
        <UButton
          class="ml-4"
          color="emerald"
          label="Create New Post"
          @click="handleSubmit"
        />
      </div>
    </div>
    <div class="col-span-3"></div>
    <ModalConfirm
      :data="confirmModal"
      @confirm="onSubmit"
      @close="confirmModal.open = false"
    />
  </div>
</template>

<script setup lang="ts">
import Editor from "@tinymce/tinymce-vue";

import type { IConfirmModal } from "~/types/components";
import type { ITocItem } from "~/types/model";
import type { IUpSavePost } from "~/types/request";
import { convertedSentence } from "~/utils/converter";
import ModalData from "~/utils/modal-data";
const notify = useNotification(useToast);
const tag = [
  { id: 1, label: "Frontend" },
  { id: 2, label: "Backend" },
  { id: 3, label: "Devops" },
  { id: 4, label: "Hacking" },
];
const selected = ref([tag[3]]);
const confirmModal = ref<IConfirmModal>({
  open: false,
  message: "",
});
const thumbnailTemporaryUrl = ref<string>("");

const { $api } = useNuxtApp();
const postStore = usePostStore();
const onTitleChange = () => {
  dto.value.slug = convertedSentence(dto.value.title.trim());
};

const onTitlePaste = (event: ClipboardEvent) => {
  // if(event.clipboardData?.getData('text')){
  //   dto.value.slug =convertedSentence(event.clipboardData?.getData('text').trim());
  // }
};

const dto = ref<IUpSavePost>({
  title: "",
  slug: "",
  content: "",
  preContent: "",
  toc: [],
  thumbnail: "",
});

const thumbnailHandler = async (e: any) => {
  const file = e.target["files"][0];

  if (file) {
    dto.value.thumbnail = file;
    thumbnailTemporaryUrl.value = window.URL.createObjectURL(file);
  }
};

const uploadImageHandle = async (blobInfo: any, _: any) => {
  const formData = new FormData();
  formData.append("file", blobInfo.blob(), blobInfo.filename());
};

const removeImageHandler = (editor: any) => {
  if (editor.selection.getNode().nodeName === "IMG") {
    const selectedNode = editor.selection.getNode();
    const src = selectedNode.getAttribute("src") || "";
    /*    adminStore
      .deleteImage(src)
      .then((data) => {
        console.log("delete image", data);
        editor.dom.remove(selectedNode);
      })
      .catch((error) => {
        alert("[remove-image] error");
        console.log({ error });
      }); */
  }
};

const customTOCHandler = (editor: any) => {
  dto.value.toc = [];
  let tocTemp: ITocItem[] = [];

  const headings: HTMLElement[] = editor.dom.select("h1, h2, h3, h4, h5, h6");
  headings.forEach((heading, index) => {
    if (heading.id === "") {
      const headingText: string = heading.innerText;
      const headingId = convertedSentence(headingText);

      heading.setAttribute("id", headingId);
      tocTemp.push({
        title: headingText,
        link: headingId,
        type: heading.nodeName,
      });
    }
  });

  dto.value.content = dto.value.content;
  dto.value.toc = tocTemp;
};

const handleSubmit = () => {
  confirmModal.value = {
    open: true,
    message: ModalData.CONFIRM,
    ...(dto.value.toc.length == 0 && { notice: ModalData.NO_TOC }),
  };
};

const closeConfirmModal = () => {
  confirmModal.value.open = false;
};

const onSubmit = async () => {
  // const {data : createPostData,error: createPostError,execute: createPostExecute} =  await $api.posts.createPost(dto.value);
  // if(createPostData.value?.status==200){

  //   notify.Success({
  //     title:createPostData.value?.message || ''
  //   })

  //   // navigateTo({path:'/blogs'})
  // }

  await postStore.createPost(dto.value, closeConfirmModal);
};
</script>

<style scoped></style>
