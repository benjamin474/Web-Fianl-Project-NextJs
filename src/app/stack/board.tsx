"use client";
import { stackItem } from "./page";

interface props {
	stack: stackItem[];
	showTop: boolean;
}

export default function board({ stack, showTop }: props) {
	return (
		<table>
			<tbody>
				{stack.toReversed().map((e, i) => (
					<tr key={i}>
						<td
							className={
								e.hasItem
									? "inserted" + (showTop && e.top ? " getTop" : "")
									: "removed"
							}
						>
							{e.num?.toString() ?? "　"}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
