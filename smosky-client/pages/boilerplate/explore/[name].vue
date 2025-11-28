<template>
  <ClientOnly>
    <div>
      <AppNavigation :data="navigationData"/>
      <BoilerplateInfo type="explore"/>
      <AppTitle :data="{ title: 'Mores', iconName: '' }">
        <template #image>
          <img
              alt="Home"
              class="w-7 h-7 pr-2"
              height="24"
              src="@/assets/images/squares-plus.svg"
              width="24"
          />
        </template>
        <template #default>
          <div class="flex items-center gap-16">
            <UTooltip
                v-for="item in featuresCheckBox"
                :key="item.label"
                :popper="{ placement: 'top' }"
                text="Create at least one entity to enable this feature"
            >
              <UCheckbox
                  v-model="createBoilerplateData.crud"
                  :disabled="createBoilerplateData.entities.length === 0"
                  :help="item.help"
                  :label="item.label"
              />
            </UTooltip>
          </div>
        </template>
      </AppTitle>

      <AppTitle
          :data="{ title: 'Configuration', iconName: 'heroicons-wrench' }"
      >
        <UTabs :items="items">
          <template #item="{ item }">
            <div v-if="item.key === 'starter'" class="space-y-3">
              <BoilerplateSpringStarter :data="boilerplate?.dependencies"/>
            </div>
            <div v-if="item.key === 'enviroments'" class="space-y-3">
              <BoilerplateSpringEnviroments/>
            </div>
            <div v-if="item.key === 'entities'" class="space-y-3">
              <BoilerplateSpringEntities/>
            </div>
          </template>
        </UTabs>
      </AppTitle>

      <!-- Submit -->
      <div
          class="flex items-center gap-8 mt-5  w-full mx-auto justify-end px-4"
      >
        <UButton
            class="px-4 py-2 min-w-32 flex items-center justify-center"
            color="white"
            @click="executeBoilerplatePreview"
        >Preview
        </UButton
        >
        <UButton
            class="px-4 py-2 min-w-32 flex items-center justify-center"
            @click="onSubmit"
        >Download
        </UButton
        >
      </div>
    </div>
    <div v-if="boilerplateReviewResponse?.projectStructure?.id">
      <ModalShowBoilerplatePreview
          :is-open="showPreviewBoilerplate"
          :project-structure="boilerplateReviewResponse.projectStructure"
          @on-btn-download-click="onBtnDownloadFromPreviewClick"
          @update:is-open="toggleShowPreviewBoilerplate"
      />
    </div>
    <AppLoading v-show="loading"/>
  </ClientOnly>
</template>

<script lang="ts" setup>
import {
  useBoilerplateItem,
  useCreateBoilerplateData,
  useSpringDependenciesSelected,
} from "~/composables/useState";
import type {INavigation} from "~/types/components";
import type {IDownloadBoilerplateFromPreview} from "~/types/request";

//
// definePageMeta({
//   layout: "detail",
// });

const route = useRoute();
const requestData = ref({});
const name = route.params.name;
const showPreviewBoilerplate = ref(false);
const loading = ref(false);

const boilerplateStore = useBoilerplateStore();

const {
  boilerplate, springDependenciesSelected,
  boilerplateReviewResponse
} = storeToRefs(boilerplateStore);

await useAsyncData("boilerplateList", () => boilerplateStore.fetchBoilerplate(name as string));


const executeBoilerplatePreview = async () => {
  const entitiesValidation = validationEntitiesBeforeSubmit();
  if (entitiesValidation.invalid) {
    alert(entitiesValidation.message);
    return;
  }

  const metadataValidation = validationMetadataBeforeSubmit();

  if (metadataValidation.invalid) {
    alert(metadataValidation.message);
    return;
  }

  const data = generateData();

  requestData.value = data;
  loading.value = true;

  await boilerplateStore.previewBoilerplate(data);
  loading.value = false;
  toggleShowPreviewBoilerplate(true);
};

const generateData = () => {
  return {
    type: createBoilerplateData.value.type,
    bootVersion: createBoilerplateData.value.bootVersion,
    metadata: {
      groupId: createBoilerplateData.value.metadata.groupId.value,
      artifactId: createBoilerplateData.value.metadata.artifactId.value,
      name: createBoilerplateData.value.metadata.name.value,
      description: createBoilerplateData.value.metadata.description,
      packaging: createBoilerplateData.value.metadata.packaging,
      jvmVersion: createBoilerplateData.value.metadata.jvmVersion,
    },
    dependencies: springDependenciesSelected.value.map((item) => ({
      id: item.id,
      properties: item.properties?.map((item) => ({
        id: item.id,
        value: item.value,
      })),
    })),
    crud: createBoilerplateData.value.crud,
    entities: createBoilerplateData.value.entities.map((item) => ({
      name: item.name,
      templates: item.templates.map((item) => ({
        name: item.name,
        type: item.type,
        primary: item.primary,
        mappedBy: item.mappedBy,
        referencedColumnName: item.referencedColumnName,
      })),
    })),
  };
}

const toggleShowPreviewBoilerplate = (value: boolean) => {
  showPreviewBoilerplate.value = value;
};

const createBoilerplateData = useCreateBoilerplateData();

const downloadUrl = ref<IDownloadBoilerplateFromPreview>({
  downloadUrl: "",
  fileName: createBoilerplateData.value.metadata.name.value
});

const onBtnDownloadFromPreviewClick = async () => {
  if (boilerplateReviewResponse.value.downloadUrl) {
    downloadUrl.value.downloadUrl = boilerplateReviewResponse.value.downloadUrl;
    loading.value = true;
    await boilerplateStore.downloadBoilerplateFromPreviewUrl(
        downloadUrl.value
    );
    loading.value = false;

    toggleShowPreviewBoilerplate(false);
  }
};

const validationMetadataBeforeSubmit = () => {
  let validation = {
    invalid: false,
    message: "",
  };
  if (createBoilerplateData.value.metadata.groupId.error.invalid) {
    validation = {
      invalid: true,
      message: "Group value invalid",
    };
  }
  if (createBoilerplateData.value.metadata.artifactId.error.invalid) {
    validation = {
      invalid: true,
      message: "artifact value invalid",
    };
  }
  if (createBoilerplateData.value.metadata.name.error.invalid) {
    validation = {
      invalid: true,
      message: "name value invalid",
    };
  }

  return validation;
};

const validationEntitiesBeforeSubmit = () => {
  let validation = {
    invalid: false,
    message: "",
  };
  createBoilerplateData.value.entities.forEach((entity) => {
    entity.templates.forEach((item) => {
      if (item.error.invalid || !item.name) {
        validation = {
          invalid: true,
          message: `Contain invalid field on table ${entity.name}`,
        };
      }
    });
  });
  return validation;
};

const onSubmit = async () => {
  const entitiesValidation = validationEntitiesBeforeSubmit();
  if (entitiesValidation.invalid) {
    alert(entitiesValidation.message);
    return;
  }

  const metadataValidation = validationMetadataBeforeSubmit();

  if (metadataValidation.invalid) {
    alert(metadataValidation.message);
    return;
  }

  const data = generateData();

  requestData.value = data;
  loading.value = true;
  await boilerplateStore.downloadBoilerplate(data);
  loading.value = false;

};

definePageMeta({
  layout: "detail",
});

const navigationData: INavigation[] = [
  {
    title: "Home",
    link: "/",
    isActive: false,
  },
  {
    title: "Detail",
    link: `/boilerplate/${name}`,
    isActive: false,
  },
  {
    title: name ? name as string : "Explore",
    link: `/boilerplate/explore/${name}`,
    isActive: true,
  },
];

const items = [
  {
    key: "starter",
    label: "1. Starter",
  },
  {
    key: "enviroments",
    label: "2. Enviroments",
  },
  {
    key: "entities",
    label: "3. Entities",
  },
];

const featuresCheckBox = ref([
  {
    label: "CRUD",
    help: "Create simple CRUD template (Beta version)",
    isChecked: true,
  },
]);
</script>

<style scoped></style>
