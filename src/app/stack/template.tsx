import type { Metadata } from "next";

export default function Template({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}
