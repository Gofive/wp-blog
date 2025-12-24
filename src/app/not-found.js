import Link from "next/link";
import { Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-8xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            404
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            页面不存在
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            抱歉，您访问的页面已被移动或不存在
          </p>
        </div>

        <div className="flex gap-2 justify-center">
          <Button asChild variant="ghost" size="sm">
            <Link href="/article" className="flex items-center gap-2">
              <FileText size={16} />
              浏览文章
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/search" className="flex items-center gap-2">
              <Search size={16} />
              搜索内容
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
