import type { IToast } from "~/types/composables";


const TIMEOUT = 4000;

const toastInfo = (prop: IToast) => {
  return {
    title: prop.title,
    timeout: TIMEOUT,
    ...(prop.description && { description: prop.description }),
  };
};
export const useNotification = (useToast: any) => {
  const toast = useToast();
  return {
    Success: (prop: IToast) =>
      toast.add({
        ...toastInfo(prop),
        icon: "i-heroicons-check-circle",
        color: "emerald",
      }),

    Info: (prop: IToast) =>
      toast.add({
        ...toastInfo(prop),
        icon: "i-heroicons-information-circle",
        color: "blue",
      }),
    Warning: (prop: IToast) =>
      toast.add({
        ...toastInfo(prop),
        icon: "i-heroicons-exclamation-triangle",
        color: "yellow",
      }),
    Danger: (prop: IToast) =>
      toast.add({
        ...toastInfo(prop),
        icon: "i-heroicons-face-frown",
        color: "red",
      }),
  };
};


