"use client";

import Image from "next/image";
// import "../../resources/Start.css"
import Link from "next/link";
import stackImg from "../../resources/icon/stack_picture.png";
import queueImg from "../../resources/icon/queue_picture.png";
import arrayImg from "../../resources/icon/array_picture.png";
import informationImg from "../../resources/icon/information.png";
import sourceImg from "../../resources/icon/source_picture.png";
import { Homebody, H1, ButtonGroup } from "../../components/Home/HomeComponent";

export default function Home() {
	return (
		<Homebody>
			<div>
				<H1>
					<span>資料結構小遊戲</span>
				</H1>

				<ButtonGroup>
					<Link href="/stack" passHref legacyBehavior prefetch={false}>
						<a>
							<div>
								<Image src={stackImg} alt="" /> Stack
							</div>
						</a>
					</Link>
					<br />
					<Link href="/queue" passHref legacyBehavior>
						<a>
							<div>
								<Image src={queueImg} alt="" /> Queue
							</div>
						</a>
					</Link>
					<br />
					<Link href="/array" passHref legacyBehavior>
						<a>
							<div>
								<Image src={arrayImg} alt="" /> Array
							</div>
						</a>
					</Link>
					<br />
					<Link href="/aboutus" passHref legacyBehavior>
						<a>
							<div>
								<Image src={informationImg} alt="" /> About us
							</div>
						</a>
					</Link>
					<br />
					<Link href="/source" passHref legacyBehavior>
						<a>
							<div>
								<Image src={sourceImg} alt="" /> Sources
							</div>
						</a>
					</Link>
				</ButtonGroup>
			</div>
		</Homebody>
	);
}
