/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface prop {
	deleteIndex: string;
	setDeleteIndex: Dispatch<SetStateAction<string>>;
	setDeleteInputHidden: Dispatch<SetStateAction<boolean>>;
	deleteVal: () => void;
}

export default function DeleteInput({
	deleteIndex,
	setDeleteIndex,
	setDeleteInputHidden,
	deleteVal,
}: prop) {
	function onChange(val: string) {
		setDeleteIndex(val);
	}

	function cancel() {
		setDeleteIndex("");
		setDeleteInputHidden(true);
	}

	function submit() {
		deleteVal();
	}

	return (
		<div className="input" style={{ background: "transparent" }}>
			<input
				type="number"
				id="stackSize"
				placeholder="請輸入要刪除元素的位置"
				value={deleteIndex}
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
