"use client";

import * as React from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
	const [visible, setVisible] = React.useState(false);

	React.useEffect(() => {
		const onScroll = () => {
			setVisible(window.scrollY > 400);
		};
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	if (!visible) return null;

	return (
		<button
			type="button"
			aria-label="Voltar ao topo"
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			className="fixed bottom-6 right-6 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#007c79] text-white shadow-lg transition hover:bg-[#00a89a]"
		>
			<ChevronUp className="h-5 w-5" />
		</button>
	);
}

