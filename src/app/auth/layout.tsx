import LandingLayout from '@/components/layout/LandingLayout';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LandingLayout>
      <div className="min-h-screen">
        <div className="flex min-h-screen">
          <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 height{100} heightmobile{80}">
            <div className="mx-auto w-full max-w-sm lg:max-w-md">
              {children}
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}

