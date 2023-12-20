/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface prop {
	stackSize: string;
	setStackSize: Dispatch<SetStateAction<string>>;
	setHidden: Dispatch<SetStateAction<boolean>>;
	buildStack: () => void;
}

export default function input({
	stackSize,
	setStackSize,
	setHidden,
	buildStack,
}: prop) {
	function onChange(val: string) {
		setStackSize(val);
	}

	function cancel() {
		setStackSize("");
		setHidden(true);
	}

	function submit() {
		buildStack();
	}

	return (
		<div className="input" style={{ background: "transparent" }}>
			<input
				type="number"
				id="stackSize"
				placeholder="請輸入1~10之間的數字"
				value={stackSize.toString()}
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
