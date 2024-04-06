import { NextIntlClientProvider, useMessages } from "next-intl";
import "../../styles/index.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Defily",
};

interface Props {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();

  return (
    
    <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
    </NextIntlClientProvider>
  );
}
