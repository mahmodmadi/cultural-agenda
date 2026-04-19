import './globals.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const metadata = {
  title: 'الأجندة الثقافية المغربية',
  description: 'دليلك لأهم الفعاليات والأنشطة الثقافية في مختلف المدن المغربية',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
