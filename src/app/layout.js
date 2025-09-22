import 'src/globals.css';
import { primaryFont } from 'src/theme/typography';
import ThemeProvider from 'src/theme';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import { LocalizationProvider } from 'src/locales';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import ProgressBar from 'src/components/progress-bar';
import { AuthProvider } from 'src/auth/context/jwt';
import FacebookPixel from 'src/utils/fbads';
// import PusherListenerPayment from 'src/utils/pusher-listener-payment';
import { CheckoutProvider } from 'src/sections/checkout/context/checkout-context';
import { GoogleTagManager } from '@next/third-parties/google';
import { FloatingButtons } from 'src/sections/floating-icons';
import { CartProvider } from 'src/context/CartContext';
import { YellowAIChatWidget } from 'src/components/chat-widget';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'Liburdulu.id - Teman terbaik liburanmu',
  description:
    'Liburdulu.id adalah layanan digital travel platform terbaik untuk membuat perjalanan kamu lebih mudah dan menyenangkan untuk semua kebutuhan liburan kamu',
  openGraph: {
    title: 'Liburdulu.id - Teman terbaik liburanmu',
    description:
      'Liburdulu.id adalah layanan digital travel platform terbaik untuk membuat perjalanan kamu lebih mudah dan menyenangkan untuk semua kebutuhan liburan kamu',
    url: 'https://liburdulu.com/',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_IMAGE_EDU}/uploads/logo_ldn_small_ace9403a75.png`,
        width: 240,
        height: 146,
        alt: 'Logo Liburdulu',
      },
    ],
  },
  keywords: 'open trip, paket wisata, liburan,liburan murah, liburdulu',
  manifest: '/site.webmanifest',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico?v=4' },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png?v=4',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png?v=4',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png?v=4',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' translate='no' className={primaryFont.className}>
      <body className={primaryFont.className}>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}>
              <CheckoutProvider>
                <CartProvider>
                  <ThemeProvider>
                    <SnackbarProvider>
                      <MotionLazy>
                        <SettingsDrawer />
                        <ProgressBar />
                        {children}
                        {/* <PusherListenerPayment /> */}
                      </MotionLazy>
                    </SnackbarProvider>
                  </ThemeProvider>
                </CartProvider>
              </CheckoutProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>

        <FloatingButtons />

        {/* Facebook Pixel Ads */}
        <FacebookPixel />

        {/* New google Analytics */}
        <GoogleTagManager gtmId={GTM_ID} />

        {/* Floating Buttons */}
        {/* <FloatingButtons /> */}

        {/* Yellow.ai Chat Widget */}
        <YellowAIChatWidget />
      </body>
    </html>
  );
}
