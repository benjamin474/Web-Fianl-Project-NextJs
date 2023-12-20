/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from "next/link";
import Image from "next/image";
import homeBtn from "../../../resources/icon/home_rounded.png";
import "../../../resources/Container.css";

export default function aboutus() {
	return (
		<div>
			<h1>
				<span>此網頁所用素材連結</span>
			</h1>

			<div className="go_home">
				<Link href="/" passHref legacyBehavior>
					<a>
						<Image src={homeBtn} alt="" />
					</a>
				</Link>
			</div>

			<div className="board">
				<table>
					<tbody>
						<tr key="1">
							<td className="inserted">
								<a
									href="https://www.flaticon.com/free-icons/queue"
									title="queue icons"
									target="_blank"
								>
									Queue icons created by Freepik - Flaticon
								</a>
							</td>
						</tr>
						<tr key="2">
							<td className="inserted">
								<a
									href="https://www.flaticon.com/free-icons/bundle"
									title="bundle icons"
									target="_blank"
								>
									Bundle icons created by Amazona Adorada - Flaticon
								</a>
							</td>
						</tr>
						<tr key="3">
							<td className="inserted">
								<a
									href="https://www.flaticon.com/free-icons/info"
									title="info icons"
									target="_blank"
								>
									Info icons created by Freepik - Flaticon
								</a>
							</td>
						</tr>
						<tr key="4">
							<td className="inserted">
								<a
									href="https://www.flaticon.com/free-icons/array"
									title="array icons"
									target="_blank"
								>
									Array icons created by Lizel Arina - Flaticon
								</a>
							</td>
						</tr>
						<tr key="5">
							<td className="inserted">
								<a
									href="https://www.flaticon.com/free-icons/sourcing"
									title="sourcing icons"
									target="_blank"
								>
									Sourcing icons created by Andrean Prabowo - Flaticon
								</a>
							</td>
						</tr>
						<tr key="6">
							<td className="inserted">
								<a
									href="https://www.flaticon.com/free-icons/home"
									title="home icons"
									target="_blank"
								>
									Home icons created by Freepik - Flaticon
								</a>
							</td>
						</tr>
						<tr key="7">
							<td className="inserted">
								<a
									href="https://www.flaticon.com/free-icons/ui"
									title="ui icons"
									target="_blank"
								>
									Ui icons created by NajmunNahar - Flaticon
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
