"use client";

import { queueItem } from "./page";

interface props {
	queue: queueItem[];
	showFront: boolean;
	showBack: boolean;
}

export default function board({ queue, showFront, showBack }: props) {
	return (
		<table className="queue-table">
			<tbody>
				<tr>
					{queue.map((e, i) => (
						<td
							key={i}
							className={
								e.hasItem
									? "inserted" +
									  ((showFront && e.front) || (showBack && e.back)
											? " getTop"
											: "")
									: "removed"
							}
						>
							{e.num?.toString() ?? "　"}
						</td>
					))}
				</tr>
			</tbody>
		</table>
	);
}
