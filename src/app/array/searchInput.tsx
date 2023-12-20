/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface prop {
	searchInddex: string;
	setSearchIndex: Dispatch<SetStateAction<string>>;
	setSearchInputHidden: Dispatch<SetStateAction<boolean>>;
	searchValue: () => void;
}

export default function SearchInput({
	searchInddex,
	setSearchIndex,
	setSearchInputHidden,
	searchValue,
}: prop) {
	function onChange(val: string) {
		setSearchIndex(val);
	}

	function cancel() {
		setSearchIndex("");
		setSearchInputHidden(true);
	}

	function submit() {
		searchValue();
	}

	return (
		<div className="input" style={{ background: "transparent" }}>
			<input
				type="number"
				id="stackSize"
				placeholder="請輸入位置"
				value={searchInddex}
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
