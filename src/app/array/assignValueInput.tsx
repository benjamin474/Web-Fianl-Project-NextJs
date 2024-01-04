/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Dispatch, SetStateAction } from "react";

interface prop {
	pushIndexStr: string;
	pushValueStr: string;
	setPushIndexStr: Dispatch<SetStateAction<string>>;
	setPushValueStr: Dispatch<SetStateAction<string>>;
	setPushAssignInputHidden: Dispatch<SetStateAction<boolean>>;
	assignValue: () => void;
}

export default function assignValueInput({
	pushIndexStr,
	pushValueStr,
	setPushIndexStr,
	setPushValueStr,
	setPushAssignInputHidden,
	assignValue,
}: prop) {
	function onIndexChange(val: string) {
		setPushIndexStr(val);
	}

	function onValueChange(val: string) {
		setPushValueStr(val);
	}

	function cancel() {
		setPushIndexStr("");
		setPushValueStr("");
		setPushAssignInputHidden(true);
	}

	function submit() {
		assignValue();
	}

	return (
		<div className="input" style={{ background: "transparent" }}>
			<input
				type="number"
				id="assignIndex"
				placeholder="請輸入插入位置"
				value={pushIndexStr}
				onChange={(e) => onIndexChange(e.target.value)}
			/>
			<br />
			<input
				type="number"
				id="assignValue"
				placeholder="請輸入10位數以內的數值"
				value={pushValueStr}
				onChange={(e) => onValueChange(e.target.value)}
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
