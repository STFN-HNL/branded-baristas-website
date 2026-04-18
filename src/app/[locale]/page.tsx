import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4">{t("lead")}</p>
    </main>
  );
}
