import CharacterGenerator from "@/components/CharacterGenerator";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function Home(props: { params: { locale: string } }) {
  const params = await props.params;
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <CharacterGenerator />
    </NextIntlClientProvider>
  );
}

