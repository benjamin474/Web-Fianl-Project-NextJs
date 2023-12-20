/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Dispatch, SetStateAction } from "react";

interface prop {
	enqueueValueStr: string;
	setEnqueueValueStr: Dispatch<SetStateAction<string>>;
	setEnqueueInputHidden: Dispatch<SetStateAction<boolean>>;
	enqueue: () => void;
}

export default function InputValue({
	enqueueValueStr,
	setEnqueueValueStr,
	setEnqueueInputHidden,
	enqueue,
}: prop) {
	function onChange(val: string) {
		setEnqueueValueStr(val);
	}

	function cancel() {
		setEnqueueInputHidden(true);
	}

	function submit() {
		enqueue();
	}

	return (
		<div className="input" style={{ background: "transparent" }}>
			<input
				type="number"
				id="stackSize"
				placeholder="請輸入數字"
				value={enqueueValueStr}
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
