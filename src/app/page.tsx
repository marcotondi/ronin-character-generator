import { redirect } from "next/navigation";

export default function RootPage() {
  // Altrimenti usa la lingua del browser
  const browserLocale = navigator.language.split("-")[0];
  const locale = ["it", "en"].includes(browserLocale) ? browserLocale : "it";

  redirect(`/${locale}`);
}
