import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "資料結構小遊戲 | 目錄",
	description: "資料結構小遊戲目錄",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <html>{children}</html>;
}
