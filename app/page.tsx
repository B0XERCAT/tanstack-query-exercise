import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2">
        <Link href='/posts'>
          <Button>Go to Post List</Button>
        </Link>
      </main>
    </div>
  );
}
