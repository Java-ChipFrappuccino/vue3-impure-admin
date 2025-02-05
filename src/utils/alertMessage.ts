import { ElMessage } from "element-plus";
import { i18n } from "@/locales/index"; // i18n 설정 가져오기

export const openAlert = (status: string) => {
  const config = {
    success: {
      type: "success",
      message: i18n.global.t("alertMessage.success"),
    },
    warning: {
      type: "warning",
      message: i18n.global.t("alertMessage.warning"),
    },
    error: { type: "error", message: i18n.global.t("alertMessage.error") },
  };

  const { type, message } = config[status] || {
    type: "info",
    message: i18n.global.t("alertMessage.default"),
  };

  ElMessage({
    duration: 2000,
    showClose: true,
    message,
    type,
  });
};
