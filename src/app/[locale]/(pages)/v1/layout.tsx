import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopNavbar } from "@/app/_components/layout/top-navbar";
import { Sidebar } from "@/app/_components/layout/sidebar";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as any)) notFound();

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (e) {
    notFound();
  }

  return (
    <html lang={locale} className="h-full bg-muted">
      <body className="min-h-screen text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TopNavbar />

          <div className="flex h-[calc(100vh-4rem)]">
            <aside className="hidden md:block w-64 shrink-0 border-r p-4 bg-background">
              <Sidebar />
            </aside>
            <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted">
              {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
