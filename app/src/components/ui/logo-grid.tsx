import * as React from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";

interface LogoGridProps {
	title?: string;
	logos: { src: string; alt: string }[];
	className?: string;
}

export function LogoGrid({ title, logos, className }: LogoGridProps) {
	return (
		<div className={cn("space-y-4", className)}>
			{title && (
				<p className="text-xs font-medium uppercase tracking-[0.16em] text-[#919191]">
					{title}
				</p>
			)}
			<div className="flex flex-wrap items-center gap-5 opacity-80">
				{logos.map((logo) => (
					<div
						key={logo.src}
						className="relative h-6 w-auto min-w-[72px] grayscale transition hover:grayscale-0"
					>
						<Image
							src={logo.src}
							alt={logo.alt}
							width={120}
							height={24}
							className="h-full w-auto object-contain"
						/>
					</div>
				))}
			</div>
		</div>
	);
}

