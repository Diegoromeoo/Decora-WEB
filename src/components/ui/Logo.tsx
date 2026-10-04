import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({
  size = 40,
  withHalo = true,
  className,
  priority = false,
}: {
  size?: number;
  withHalo?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center shrink-0",
        withHalo && "logo-halo",
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Monochrome navy version. For the original multi-color logo, swap src to "/logo-color.svg". */}
      <Image
        src="/logo.svg"
        alt="DECORA TEXTIL"
        width={size}
        height={size}
        priority={priority}
        className="select-none"
      />
    </span>
  );
}
