import { getPublicAppSettings } from "@/lib/actions/public";
import { RegisterForm } from "./register-form";

export default async function RegisterPage() {
  const settings = await getPublicAppSettings();

  return <RegisterForm siteName={settings.siteName} />;
}
