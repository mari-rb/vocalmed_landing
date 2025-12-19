import * as React from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";

interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
	name: string;
	role: string;
	content: string;
	avatarInitials?: string;
	avatarImage?: string;
}

export function Testimonial({
	name,
	role,
	content,
	avatarInitials,
	avatarImage,
	className,
	...props
}: TestimonialProps) {
	return (
		<figure
			className={cn(
				"flex h-full flex-col rounded-2xl border border-[#f4f4f4] bg-[#ffffff] p-6 text-left shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#00ccbd]/30",
				"dark:border-[#2a2a2a] dark:bg-[#0f0f0f] dark:hover:border-[#00ccbd]/40",
				className
			)}
			{...props}
		>
			<div className="mb-4 flex items-center gap-3">
				{avatarImage ? (
					<div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#00ccbd]/20">
						<Image
							src={avatarImage}
							alt={name}
							fill
							className="object-cover"
							sizes="48px"
							quality={95}
							loading="lazy"
						/>
					</div>
				) : (
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00ccbd]/10 text-sm font-semibold text-[#007c79] ring-2 ring-[#00ccbd]/20">
						{avatarInitials}
					</div>
				)}
				<div>
					<figcaption className="text-sm font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
						{name}
					</figcaption>
					<p className="text-xs text-[#919191] dark:text-[#919191]">{role}</p>
				</div>
			</div>
			<blockquote className="text-sm leading-relaxed text-[#5e5e5e] dark:text-[#d1d1d1]">
				“{content}”
			</blockquote>
		</figure>
	);
}

