/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Dispatch, SetStateAction } from "react";

interface prop {
	pushValueStr: string;
	setPushValueStr: Dispatch<SetStateAction<string>>;
	setPushInputHidden: Dispatch<SetStateAction<boolean>>;
	push: () => void;
}

export default function InputValue({
	pushValueStr,
	setPushValueStr,
	setPushInputHidden,
	push,
}: prop) {
	function onChange(val: string) {
		setPushValueStr(val);
	}

	function cancel() {
		setPushInputHidden(true);
	}

	function submit() {
		push();
	}

	return (
		<div className="input" style={{ background: "transparent" }}>
			<input
				type="number"
				id="stackSize"
				placeholder="請輸入1~10之間的數字"
				value={pushValueStr}
				onChange={(e) => onChange(e.target.value)}
			/>
			<button id="submitBtn" onClick={submit}>
				submit
			</button>
			<button id="cancelBtn" onClick={cancel}>
				cancel
			</button>
		</div>
	);
}
