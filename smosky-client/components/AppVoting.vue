<template>
  <ClientOnly>
    <div class="flex items-center">
      <UIcon
        name="i-heroicons-star-solid"
        :class="[
          `w-${votingSize} h-${votingSize} text-gray-200 cursor-pointer `,
          (item.isHover || item.isActive) && 'text-yellow-500',
        ]"
        v-for="item in votings"
        :key="item.star"
        @mouseover="onHover(item)"
        @mouseleave="onLeave"
        @click="onClick(item)"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { IVoting } from "~/types/components";
import { initValue } from "~/utils/components/appVoting.data";

const votings = ref<IVoting[]>(JSON.parse(JSON.stringify(initValue)));

const emit = defineEmits(["ratingSelected"]);
const props = defineProps<{
  ratingValue: number;
  readOnly: boolean;
  size?: number;
}>();

const isValid = computed(() => {
  if (props.readOnly) return false;
  return true;
});

const votingSize = computed(() => {
  return props.size || 4;
});

const handleStarChanging = (item: IVoting, star: number) => {
  item.star <= star ? (item.isActive = true) : (item.isActive = false);
};

watch(
  () => props.ratingValue,
  (ratingValue) => {
    if (ratingValue) {
      const value = votings.value.map((item) => {
        handleStarChanging(item, ratingValue);
        return item;
      });

      votings.value = value;
    }
  },
  {
    immediate: true,
  }
);

const onHover = (data: IVoting) => {
  if (!isValid.value) return;
  votings.value = votings.value.map((item) => {
    handleStarChanging(item, data.star);
    return item;
  });
};

const onLeave = () => {
  if (!isValid.value) return;
  votings.value = votings.value.map((item) => {
    item.isHover = false;
    return item;
  });
};

const onClick = (data: IVoting) => {
  if (!isValid.value) return;
  votings.value = votings.value.map((item) => {
    handleStarChanging(item, data.star);
    return item;
  });
  const itemActiveCounting = votings.value.filter(
    (item) => item.isActive === true
  ).length;
  emit("ratingSelected", itemActiveCounting);
};
</script>

<style scoped></style>~/utils/components/appVoting.data
