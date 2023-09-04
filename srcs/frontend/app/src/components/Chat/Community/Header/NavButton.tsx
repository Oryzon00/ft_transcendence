type NavButtonType = {
	Image: String;
	description: string;
	action: () => void;
};

function NavButton({ Image, description, action = () => {} }: NavButtonType) {
	const button_style: string = "h-full bg-[#eaecee]";

	return (
		<button className={button_style} onClick={action}>
			<img src={Image} alt={description} />
		</button>
	);
}

export default NavButton;
