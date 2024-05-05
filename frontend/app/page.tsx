import PasswdConfig from '@/components/passwd-config';
import PasswdContent from '@/components/passwd-content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[5/6] lg:w-1/2">
        <CardHeader>
          <CardTitle className="text-center">
            Random Password Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PasswdContent />
          <PasswdConfig />
        </CardContent>
      </Card>
    </main>
  );
}
