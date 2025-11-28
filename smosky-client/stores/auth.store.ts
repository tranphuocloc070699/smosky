import { useHandleError } from "~/composables/useHandleError";
import type { IUser } from "~/types/model";
import { userInitValue } from "~/utils/stores/initValue";

export const useAuthStore = defineStore("auth", () => {
  const { $api } = useNuxtApp();
  const notify = useNotification(useToast);
  const handleError = useHandleError(useToast);
  
  const user = ref<IUser>(userInitValue)
  return { user };
});
