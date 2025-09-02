import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex min-h-screen">
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mx-auto w-full max-w-sm lg:max-w-md">
            <div className="lg:hidden text-center mb-8">
              <Link href="/" className="inline-block">
                <div className="flex items-center justify-center space-x-3">
                  <Image src="/images/logotipo.png" alt="Logo Matices" width={200} height={120} />
                </div>
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

