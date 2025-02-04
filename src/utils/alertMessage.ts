import { ElMessage } from "element-plus";
import { i18n } from "@/locales/index"; // i18n 설정 가져오기

export const openAlert = (status: string) => {
  switch (status) {
    case "success":
      ElMessage({
        duration: 2000,
        showClose: true,
        message: i18n.global.t("alertMessage.success"),
        type: "success",
      });
      break;
    case "warning":
      ElMessage({
        duration: 2000,
        showClose: true,
        message: i18n.global.t("alertMessage.warning"),
        type: "warning",
      });
      break;
    case "error":
      ElMessage({
        duration: 2000,
        showClose: true,
        message: i18n.global.t("alertMessage.error"),
        type: "error",
      });
      break;
    default:
      ElMessage({
        duration: 2000,
        showClose: true,
        message: i18n.global.t("alertMessage.default"),
      });
  }
};
