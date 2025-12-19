import * as React from "react";
import { cn } from "../../lib/utils";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
	icon?: React.ReactNode;
	title: string;
	description: string;
}

export function FeatureCard({
	icon,
	title,
	description,
	className,
	...props
}: FeatureCardProps) {
	return (
		<div
			className={cn(
				"group flex h-full flex-col rounded-2xl border border-[#f4f4f4] bg-[#ffffff] p-6 shadow-sm transition-transform transition-shadow hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]",
				"dark:border-[#2a2a2a] dark:bg-[#0f0f0f]",
				className
			)}
			{...props}
		>
			{icon && (
				<div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#00ccbd]/10 text-[#007c79]">
					{icon}
				</div>
			)}
			<h3 className="mb-2 text-base font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
				{title}
			</h3>
			<p className="text-sm text-[#5e5e5e] dark:text-[#919191]">{description}</p>
		</div>
	);
}

