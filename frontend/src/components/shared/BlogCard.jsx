import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const BlogCard = ({ blog }) => {
  return (
    <Card className="group flex flex-col overflow-hidden h-full">
      <div className="relative h-48 w-full bg-[var(--muted)] overflow-hidden">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="cyan" size="sm">
            {blog.category}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center space-x-4 text-[11px] text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" />
              {formatDate(blog.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[var(--primary)]" />
              {blog.readTime}
            </span>
          </div>

          <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] leading-snug">
            {blog.title}
          </h3>

          <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[var(--muted-foreground)]">
            By {blog.author}
          </span>
          <Link
            href={`/blog/${blog.slug}`}
            className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
          >
            Read Article <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
};
