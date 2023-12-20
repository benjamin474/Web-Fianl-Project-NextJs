"use client";
import AboutUs from "../../../resources/AboutUs.json"

interface props {
	content: string
}

export default function board({ content }: props) {
	return (
		<table>
			<tbody>
				<tr>
					<td className="inserted">
                        <div>
                            
                            <h2>{(AboutUs as any)[content].title}</h2>
                            <p dangerouslySetInnerHTML={{__html:(AboutUs as any)[content].content}} />
                        </div>
                    </td>
				</tr>
			</tbody>
		</table>
	);
}
