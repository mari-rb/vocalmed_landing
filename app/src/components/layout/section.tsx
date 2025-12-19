import * as React from "react";
import { cn } from "../../lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
	id?: string;
	eyebrow?: string;
	title?: string;
	description?: string;
	align?: "left" | "center";
}

export function Section({
	id,
	eyebrow,
	title,
	description,
	align = "center",
	className,
	children,
	...props
}: SectionProps) {
	const isCenter = align === "center";

	return (
		<section
			id={id}
			className={cn(
				"relative py-16 sm:py-20 lg:py-24",
				"bg-[#ffffff] dark:bg-[#0f0f0f]",
				className
			)}
			{...props}
		>
			<div className="container">
				{(eyebrow || title || description) && (
					<header
						className={cn(
							"mb-12 lg:mb-16",
							isCenter ? "text-center max-w-2xl mx-auto" : "text-left max-w-2xl"
						)}
					>
						{eyebrow && (
							<p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#00a89a]">
								{eyebrow}
							</p>
						)}
						{title && (
							<h2 className="text-2xl font-semibold leading-tight text-[#3b3b3b] dark:text-[#f4f4f4] sm:text-3xl lg:text-4xl">
								{title}
							</h2>
						)}
						{description && (
							<p className="mt-4 text-sm text-[#5e5e5e] dark:text-[#b3b3b3] sm:text-base lg:text-lg">
								{description}
							</p>
						)}
					</header>
				)}

				{children}
			</div>
		</section>
	);
}

