/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from "next/link";
import Image from "next/image";
import homeBtn from "../../../resources/icon/home_rounded.png";
import "../../../resources/Container.css";
import { useState } from "react";
import Board from "./board";

export default function aboutus() {
	const [content, setContent] = useState("motivation");

	function changeContent(id: string) {
		setContent(id);
	}

	return (
		<div>
			<h1>
				<span>關於我們</span>
			</h1>

			<div className="go_home">
				<Link href="/" passHref legacyBehavior>
					<a>
						<Image src={homeBtn} alt="" />
					</a>
				</Link>
			</div>

			<div className="button_group" style={{ float: "left" }}>
				<div
					id="motivation"
					className="button"
					onClick={(e) => changeContent(e.currentTarget.id)}
				>
					創作動機
				</div>
				<br />
				<div
					id="work"
					className="button"
					onClick={(e) => changeContent(e.currentTarget.id)}
				>
					組員分工
				</div>
				<br />
				
				<div
					id="doc"
					className="button"
					onClick={(e) => changeContent(e.currentTarget.id)}
				>
					簡報連結
				</div>
			</div>

			<div className="board" id="board">
				<Board content={content} />
			</div>

			<div className="button_group" style={{ float: "right" }}>
				<div
					id="tech"
					className="button"
					onClick={(e) => changeContent(e.currentTarget.id)}
				>
					Web技術
				</div>
				<br />
				<div
					id="feature"
					className="button"
					onClick={(e) => changeContent(e.currentTarget.id)}
				>
					特色優點
				</div>
			</div>
		</div>
	);
}
