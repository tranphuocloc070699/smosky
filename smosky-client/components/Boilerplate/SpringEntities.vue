<template>
  <div
      class="border border-slate-200 rounded-md grid grid-cols-1 md:grid-cols-3 min-h-[439px]"
  >
    <!-- Table List -->
    <div class="border-r border-slate-200 col-span-1">
      <h4
          class="px-4 py-2 text-center font-semibold border-b border-slate-200 bg-slate-100"
      >
        Table
      </h4>
      <div class="p-4 flex items-start gap-6 mb-6">
        <div class="flex gap-1 flex-1 flex-col">
          <UInput
              v-model="createTableInput"
              :color="`${
              errorScheme.createTableInput.invalid ? 'red' : 'white'
            }`"
              class="flex-1"
              placeholder="Enter table name"
              @change="onCreateTable(true)"
              @input="onInput('CREATE-TABLE')"
          />
          <p
              v-show="errorScheme.createTableInput.invalid"
              class="text-xs text-red-700 flex items-center gap-1"
          >
            <UIcon name="i-heroicons-backspace"/>
            {{ errorScheme.createTableInput.message }}
          </p>
        </div>
        <UButton class="px-4" @click="onCreateTable(true)">Create</UButton>
      </div>
      <div class="p-4">
        <div
            v-for="item in createBoilerplateData.entities"
            :key="item.name"
            :class="[
            'cursor-pointer px-4 py-2  rounded-lg text-center font-medium flex items-center justify-between group text-[#333]',
            item.name === tableSelected
              ? 'bg-gray-100'
              : '',
          ]"
            @click="(e) => onTableSelect(item)"
        >
          <div></div>
          <div class="flex items-center gap-2 cursor-hover">
            {{ item.name }}
            <UBadge
                v-show="item.templates.length >= 2"
                :ui="{ rounded: 'rounded-full' }"
                color="blue"
            >{{ item.templates.length }}
            </UBadge
            >
          </div>

          <UIcon
              class="w-5 h-5 text-white bg-red-600 cursor-pointer opacity-0 group-hover:opacity-100"
              name="i-heroicons-x-circle"
              @click="onTableDelete(item)"
          />
        </div>
      </div>
    </div>
    <!-- Current Table -->
    <div class="col-span-2">
      <h4
          class="px-4 py-2 pb-[9px] flex items-center gap-2 font-semibold text-lg border-b border-slate-200 bg-slate-100"
      >
        {{ tableSelected }}
        <UIcon
            v-show="tableSelected !== 'Row'"
            class="w-6 h-6 text-emerald-700 cursor-pointer"
            name="i-heroicons-plus-circle-20-solid"
            @click="addRow()"
        />
      </h4>
      <UTable
          :columns="springEntitiesColumns"
          :rows="getTableSelectedRow"
          class="max-h-[390px] overflow-y-scroll scrollbar"
      >
        <!-- Header -->
        <template #required-header="{ column }">
          <div class="flex justify-center">
            {{ column.label }}
          </div>
        </template>
        <template #validation-header="{ column }">
          <div class="flex justify-center">
            {{ column.label }}
          </div>
        </template>
        <template #primary-header="{ column }">
          <div class="flex justify-center">
            {{ column.label }}
          </div>
        </template>
        <!-- Row -->
        <template #type-data="{ row }">
          <div class="relative py-2">
            <USelect
                :disabled="row.disable || checkIsRelation(row.type)"
                :model-value="row.type"
                :options="originalTypes"
                option-attribute="type"
                @input="(e : Event) => onTypeSelectChanging(e,row)"
            />
            <div
                v-show="checkIsRelation(row.type)"
                class="text-xs absolute top-[90%] left-[2%]"
            >
              Relation to
              <span
                  class="underline ml-1 font-medium text-green-800 cursor-pointer"
                  @click="tableSelected = row.name"
              >{{ row.name }}</span
              >
            </div>
          </div>
        </template>
        <template #fieldName-data="{  row }">
          <div v-if="!row.mappedBy && !row.referencedColumnName" class="relative">
            <UInput
                v-model="row.name"
                :color="row.error.invalid ? 'red' : 'white'"
                :disabled="row.disable"
                @blur="onInputBlur('CREATE-ROW',row)"
                @input="onInput('CREATE-ROW',row)"
            />
            <p
                v-show="row.error.invalid"
                class="text-xs text-red-700 flex items-center gap-1 absolute top-[105%] left-0"
            >
              <UIcon name="i-heroicons-backspace"/>
              {{ row.error.message }}
            </p>
          </div>
          <UInput v-else :model-value="makeNameBaseOnRelation(row)" disabled/>
        </template>
        <template #required-data="{ row }">
          <div class="flex justify-center">
            <UCheckbox
                v-model="row.required"
                :disabled="row.disable"
                class="mx-auto"
                name="required"
            />
          </div>
        </template>

        <template #validation-data="{ row }">
          <div class="flex justify-center">
            <div
                v-if="row.validation.length > 0"
                class="flex items-center justify-center w-5 h-5 p-3 rounded-full bg-green-100 text-green-700 font-semibold"
            >
              {{ row.validation.length }}
            </div>
            <div v-else class="flex items-center justify-center">
              <ModalAddSpringValidation/>
            </div>
          </div>
        </template>
        <template #primary-data="{ row }">
          <div class="flex justify-center">
            <UCheckbox
                v-model="row.primary"
                :disabled="row.disable || row.alreadyHasPrimary"
                name="primary"
            />
          </div>
        </template>

        <template #actions-data="{ row }">
          <div class="flex justify-center">
            <UIcon
                v-show="!row.disable"
                class="w-5 h-5 text-white bg-red-600 cursor-pointer"
                name="i-heroicons-x-circle"
                @Click="onDeleteRow(row)"
            />
          </div>
        </template>
      </UTable>
    </div>
    <ModalCreateSpringRelation
        :create-table-input="createTableInput"
        :is-open="createSpringRelationModalOpen"
        :table="createBoilerplateData.entities"
        :table-selected="tableSelected"
        @submit="onCreateRelationModalSubmit"
        @update:is-open="toggleCreateSpringRelationModalOpen"
        @update:create-table-input="(value) => (createTableInput = value)"
        @create-table="onCreateTable"
    />
  </div>
</template>

<script lang="ts" setup>
interface SelectRelationCallback {
  value: string;
  row?: ICreateBoilerplateEntityTemplate;
}

import {originalTypes} from "~/utils/springPostgres.data";
import {useCreateBoilerplateData} from "~/composables/useState";
import type {
  ICreateBoilerplateEntity,
  ICreateBoilerplateEntityTemplate,
} from "~/types/request";
import {
  containsSpecialChars,
  followingCamelCase,
  followingPascalCase,
  hasNumber,
  isRequired
} from "~/utils/validation";

const onInputBlur = (type: string, row?: ICreateBoilerplateEntityTemplate): boolean => {
  let invalid = false;
  switch (type) {
    case "CREATE-TABLE": {
      if (hasNumber(createTableInput.value)) {
        errorScheme.value.createTableInput = {
          invalid: true,
          message: "Cannot contains number",
        };
        invalid = true;
        break;
      }

      if (containsSpecialChars(createTableInput.value)) {
        errorScheme.value.createTableInput = {
          invalid: true,
          message: "Cannot contains special characters",
        };
        invalid = true;
        break;
      }

      if (!followingPascalCase(createTableInput.value)) {
        errorScheme.value.createTableInput = {
          invalid: true,
          message: "Following Pascal case. Ex:User",
        };
        invalid = true;
      }
      break;
    }
    case "CREATE-ROW": {
      if (!row) break;

      if (!isRequired(row.name)) {
        row.error = {
          invalid: true,
          message: `Field name is required`
        }
        invalid = true;
        break;
      }

      if (hasNumber(row.name)) {
        row.error = {
          invalid: true,
          message: 'Cannot contains number'
        }
        invalid = true;
        break;
      }

      if (containsSpecialChars(row.name)) {
        row.error = {
          invalid: true,
          message: 'Cannot contains special characters'
        }
        invalid = true;
        break;
      }

      if (!followingCamelCase(row.name)) {
        row.error = {
          invalid: true,
          message: 'Following Camel case. Ex:firstName'
        }
        invalid = true;
      }
      break;
    }
    default:
      break;
  }

  return invalid;
};

const onInput = (type: string, row?: ICreateBoilerplateEntityTemplate) => {
  switch (type) {
    case "CREATE-TABLE": {
      if (errorScheme.value.createTableInput.invalid) {
        errorScheme.value.createTableInput.invalid = false;
      }
    }
      break;
    case "CREATE-ROW": {
      if (!row) return;
      if (row.error.invalid) {
        row.error.invalid = false;
      }
    }
      break;

    default:
      break;
  }
};


const makeNameBaseOnRelation = (row: ICreateBoilerplateEntityTemplate) => {
  if (row.type === "OneToOne" || row.type === "ManyToOne") {
    return row.name.toLowerCase();
  } else {
    return `${row.name.toLowerCase()}s`;
  }
};

const errorScheme = ref({
  createTableInput: {
    invalid: false,
    message: "",
  },
});

const relationType = ["OneToOne", "OneToMany", "ManyToOne", "ManyToMany"];
const createSpringRelationModalOpen = ref(false);
const waitForCreateSpringRelationModalCallbackValue =
    ref<SelectRelationCallback>({
      value: "",
    });
const createTableInput = ref("");
const tableSelected = ref("Row");
const createBoilerplateData = useCreateBoilerplateData();

const onTableDelete = (data: ICreateBoilerplateEntity) => {
  const isAccept = window.confirm("Do you really want to delete this table?");
  if (!isAccept) return;
  if (tableSelected.value === data.name) {
    tableSelected.value = "Row";
  }
  createBoilerplateData.value.entities =
      createBoilerplateData.value.entities.reduce<ICreateBoilerplateEntity[]>(
          (accumulator, currentValue) => {
            if (currentValue.name !== data.name) {
              currentValue.templates = currentValue.templates.filter(
                  (item) => item.name !== data.name
              );
              accumulator.push(currentValue);
            }
            return accumulator;
          },
          []
      );
};

const onDeleteRow = (row: ICreateBoilerplateEntityTemplate) => {
  const isAccept = window.confirm("Do you really want to delete this row?");
  if (!isAccept) return;

  const index = createBoilerplateData.value.entities.findIndex(
      (item) => item.name === tableSelected.value
  );
  if (index === -1 || !row.id) return;

  /* Relation case */
  if (checkIsRelation(row.type)) {
    const targetIndex = createBoilerplateData.value.entities.findIndex(
        (item) => item.name === row.name
    );

    if (targetIndex === -1) return;
    createBoilerplateData.value.entities[targetIndex].templates =
        createBoilerplateData.value.entities[targetIndex].templates.filter(
            (item) => item.name !== tableSelected.value
        );
  }

  createBoilerplateData.value.entities[index].templates =
      createBoilerplateData.value.entities[index].templates.filter(
          (item) => item.id !== row.id
      );
};

const getTableSelectedRow = computed(() => {
  if (tableSelected.value.length > 0) {
    const index = createBoilerplateData.value.entities.findIndex(
        (item) => item.name === tableSelected.value
    );
    if (index === -1) return;
    return createBoilerplateData.value.entities[index].templates;
  }

  return [];
});

const onTableSelect = (item: ICreateBoilerplateEntity) => {
  tableSelected.value = item.name;
};

const onCreateTable = (isChangeTableSelected: boolean) => {
  if (!createTableInput.value) return;
  if (onInputBlur("CREATE-TABLE")) return;

  createBoilerplateData.value.entities.push({
    name: createTableInput.value,
    templates: [
      {
        id: 0,
        name: "id",
        type: "Integer",
        primary: true,
        validation: [],
        disable: true,
        mappedBy: "",
        required: true,
        referencedColumnName: "",
        alreadyHasPrimary: false,
        error: {
          invalid: false,
          message: "",
        },
      },
    ],
  });
  if (isChangeTableSelected) {
    tableSelected.value = createTableInput.value;
  }

  createTableInput.value = "";
};

const toggleCreateSpringRelationModalOpen = (value: boolean) => {
  if (
      value === false &&
      waitForCreateSpringRelationModalCallbackValue.value.value.length > 0
  ) {
    const index = createBoilerplateData.value.entities.findIndex(
        (item) => item.name === tableSelected.value
    );
    if (index === -1) return;
    const temp = createBoilerplateData.value.entities[index].templates.map(
        (item) => {
          if (
              waitForCreateSpringRelationModalCallbackValue.value.row &&
              item?.id ===
              waitForCreateSpringRelationModalCallbackValue.value.row?.id
          ) {
            item.type =
                waitForCreateSpringRelationModalCallbackValue.value.row.type;
          }
          return item;
        }
    );

    createBoilerplateData.value.entities[index].templates = temp;
  }
  createSpringRelationModalOpen.value = value;
};

const onTypeSelectChanging = (
    e: Event,
    row: ICreateBoilerplateEntityTemplate
) => {
  const selectedValue = (e.target as HTMLSelectElement).value;

  if (checkIsRelation(selectedValue)) {
    createSpringRelationModalOpen.value = true;
    waitForCreateSpringRelationModalCallbackValue.value = {
      value: selectedValue,
      row,
    };
    return;
  }
  const index = createBoilerplateData.value.entities.findIndex(
      (item) => item.name === tableSelected.value
  );
  if (index === -1) return;
  const temp = JSON.parse(
      JSON.stringify(createBoilerplateData.value.entities[index].templates)
  ).map((item: ICreateBoilerplateEntityTemplate) => {
    if (item?.id === row?.id) {
      item.type = selectedValue;
    }
    return item;
  });
  createBoilerplateData.value.entities[index].templates = temp;
};

const onCreateRelationModalSubmit = (tableChoosingRef: Ref<string>) => {
  const tableChoosing = tableChoosingRef.value;
  const type = waitForCreateSpringRelationModalCallbackValue.value.value;

  createSpringRelationModalOpen.value = false;
  const index = createBoilerplateData.value.entities.findIndex(
      (item) => item.name === tableSelected.value
  );
  if (index === -1) return;
  createBoilerplateData.value.entities[index].templates =
      createBoilerplateData.value.entities[index].templates.map((item) => {
        if (
            waitForCreateSpringRelationModalCallbackValue.value.row &&
            item?.id === waitForCreateSpringRelationModalCallbackValue.value.row?.id
        ) {
          item.type = waitForCreateSpringRelationModalCallbackValue.value.value;
          item.name = tableChoosing;

          switch (type) {
            case "OneToOne": {
              item.referencedColumnName = "id";
              const targetTableIndex =
                  createBoilerplateData.value.entities.findIndex(
                      (item) => item.name === tableChoosing
                  );
              if (targetTableIndex === -1) break;
              const relationALreadyExist = createBoilerplateData.value.entities[
                  targetTableIndex
                  ].templates.findIndex(
                  (item) => item.name === tableSelected.value
              );
              if (relationALreadyExist !== -1) break;
              createBoilerplateData.value.entities[
                  targetTableIndex
                  ].templates.push({
                id: createBoilerplateData.value.entities[targetTableIndex]
                    .templates.length,
                name: tableSelected.value,
                type: "OneToOne",
                primary: false,
                disable: false,
                required: true,
                validation: [],
                alreadyHasPrimary: true,
                mappedBy: tableChoosing.toLowerCase(),
                referencedColumnName: "",
                error: {
                  invalid: false,
                  message: "",
                },
              });
            }
              break;
            case "OneToMany": {
              item.mappedBy = tableSelected.value.toLowerCase();
              const targetTableIndex =
                  createBoilerplateData.value.entities.findIndex(
                      (item) => item.name === tableChoosing
                  );
              if (targetTableIndex === -1) break;
              const relationALreadyExist = createBoilerplateData.value.entities[
                  targetTableIndex
                  ].templates.findIndex(
                  (item) => item.name === tableSelected.value
              );
              if (relationALreadyExist !== -1) break;
              createBoilerplateData.value.entities[
                  targetTableIndex
                  ].templates.push({
                id: createBoilerplateData.value.entities[targetTableIndex]
                    .templates.length,
                name: tableSelected.value,
                type: "ManyToOne",
                primary: false,
                disable: false,
                required: true,
                validation: [],
                alreadyHasPrimary: true,
                mappedBy: "",
                referencedColumnName: "id",
                error: {
                  invalid: false,
                  message: "",
                },
              });
            }
              break;
            case "ManyToOne": {
              item.referencedColumnName = "id";
              const targetTableIndex =
                  createBoilerplateData.value.entities.findIndex(
                      (item) => item.name === tableChoosing
                  );
              if (targetTableIndex === -1) break;
              const relationALreadyExist = createBoilerplateData.value.entities[
                  targetTableIndex
                  ].templates.findIndex(
                  (item) => item.name === tableSelected.value
              );
              if (relationALreadyExist !== -1) break;
              createBoilerplateData.value.entities[
                  targetTableIndex
                  ].templates.push({
                id: createBoilerplateData.value.entities[targetTableIndex]
                    .templates.length,
                name: tableSelected.value,
                type: "OneToMany",
                primary: false,
                disable: false,
                required: true,
                validation: [],
                alreadyHasPrimary: true,
                mappedBy: tableChoosing.toLowerCase(),
                referencedColumnName: "",
                error: {
                  invalid: false,
                  message: "",
                },
              });
            }
              break;
            case "ManyToMany": {
              item.mappedBy = `${tableSelected.value.toLocaleLowerCase()}s`;
              const targetTableIndex =
                  createBoilerplateData.value.entities.findIndex(
                      (item) => item.name === tableChoosing
                  );
              if (targetTableIndex === -1) break;
              const relationALreadyExist = createBoilerplateData.value.entities[
                  targetTableIndex
                  ].templates.findIndex(
                  (item) => item.name === tableSelected.value
              );
              if (relationALreadyExist !== -1) break;
              createBoilerplateData.value.entities[
                  targetTableIndex
                  ].templates.push({
                id: createBoilerplateData.value.entities[targetTableIndex]
                    .templates.length,
                name: tableSelected.value,
                type: "ManyToMany",
                primary: false,
                disable: false,
                required: true,
                validation: [],
                alreadyHasPrimary: true,
                mappedBy: "",
                referencedColumnName: "id",
                error: {
                  invalid: false,
                  message: "",
                },
              });
            }
              break;
            default:
              break;
          }
        }
        return item;
      });
};
const checkIsRelation = (value: string) => {
  return relationType.includes(value) ? true : false;
};

const addRow = () => {
  const index = createBoilerplateData.value.entities.findIndex(
      (item) => item.name === tableSelected.value
  );
  if (index === -1) return;
  createBoilerplateData.value.entities[index].templates.push({
    id: createBoilerplateData.value.entities[index].templates.length,
    name: "",
    type: "String",
    primary: false,
    validation: [],
    disable: false,
    mappedBy: "",
    required: false,
    referencedColumnName: "",
    alreadyHasPrimary: true,
    error: {
      invalid: false,
      message: "",
    },
  });
};

const springEntitiesColumns = [
  {
    key: "type",
    label: "Type",
  },
  {
    key: "fieldName",
    label: "Field name",
  },
  {
    key: "required",
    label: "Required",
  },
  /*   {
    key: "validation",
    label: "Validation",
  }, */
  {
    key: "primary",
    label: "Primary",
  },
  {
    key: "actions",
    label: "",
  },
];
/* 
const springEntitiesData = ref<RowTemp[]>([
  {
    id:0,
    type: "String",
    fieldName: "id",
    required: true,
    validation: [],
    primary: true,
    disable:false
  },
]); */
</script>

<style scoped></style>
~/utils/springPostgres.data