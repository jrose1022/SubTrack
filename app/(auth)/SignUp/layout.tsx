// app/Login/layout.tsx
import Image from 'next/image';

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Image
        src="/backgroundAuth.jpg"
        alt="Background"
        fill
        style={{ objectFit: 'cover', zIndex: -1 }}
        priority
        quality={100}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
