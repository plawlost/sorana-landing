import './globals.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>sorana ©</title>
        {/* Add meta tags, styles, fonts, etc. */}
        <style>
        </style>
      </head>
      <body>
        {children} {/* Render the specific page content here */}
      </body>
    </html>
  );
}
