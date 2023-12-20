/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface prop {
	arraySize: string;
	setArraySize: Dispatch<SetStateAction<string>>;
	setAssignInputHidden: Dispatch<SetStateAction<boolean>>;
	assignSize: () => void;
}

export default function assignSizeInput({
	arraySize,
	setArraySize,
	setAssignInputHidden,
	assignSize,
}: prop) {
	function onChange(val: string) {
		setArraySize(val);
	}

	function cancel() {
		setArraySize("");
		setAssignInputHidden(true);
	}

	function submit() {
		assignSize();
	}

	return (
		<div className="input" style={{ background: "transparent" }}>
			<input
				type="number"
				id="stackSize"
				placeholder="請輸入1~10之間的數字"
				value={arraySize}
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
