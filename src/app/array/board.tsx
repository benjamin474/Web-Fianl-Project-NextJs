"use client";

import { arrayItem } from "./page";

interface props {
	array: arrayItem[];
	showNow: boolean;
}

export default function board({ array, showNow }: props) {
	return (
		<table className="queue-table">
			<tbody>
				<tr>
					{array.map((e, i) => (
						<td
							key={i}
							className={
								e.hasItem
									? "inserted" + (showNow && e.search ? " getTop" : "")
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
