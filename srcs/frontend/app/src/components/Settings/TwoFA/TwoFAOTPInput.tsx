import OtpInput from "react-otp-input";
import React from "react";


type TwoFAOTPInputProps = {
	OTP: string;
	setOTP: (value: React.SetStateAction<string>) => void;
	callBack: (otp: string) => void;
};

export function TwoFAOTPInput({ OTP, setOTP, callBack }: TwoFAOTPInputProps) {
	if (OTP.length === 6) {
		callBack(OTP);
		setOTP("");
	}
	return (
		<div>
			<h2 className="px-5 py-5 text-white text-lg font-bold">
				Enter your One Time Password
			</h2>
			<div className="py-5 px-5 ">
				<OtpInput
					value={OTP}
					onChange={setOTP}
					numInputs={6}
					renderSeparator={
						<span className="px-2 py-2 text-white text-xl font-bold">
							-
						</span>
					}
					renderInput={(props) => (
						<input
							{...props}
							className="h-12 bg-gray-500 rounded-md text-2xl text-center"
						/>
					)}
					inputStyle={{ width: "3rem" }}
				/>
			</div>
		</div>
	);
}
