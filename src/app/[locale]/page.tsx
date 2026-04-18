import { getTranslations } from "next-intl/server";
import { getSettings } from "@/lib/sanity/queries/settings";

export default async function HomePage() {
  const [settings, t] = await Promise.all([getSettings(), getTranslations("home")]);
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4">{t("lead")}</p>
      {settings?.siteName && (
        <p className="mt-8 text-sm text-neutral-500">Sanity says: {settings.siteName}</p>
      )}
    </main>
  );
}
