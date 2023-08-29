type ButtonNavType = {
    action: any;
    actionValue: boolean;
    image_clicked: string;
    image_not_clicked: string;
};

function ButtonNav({action, actionValue, image_clicked, image_not_clicked} : ButtonNavType) {
	const not_clicked = "w-full bg-[#242424] hover:bg-amber-800 px-5 py-2 rounded-md flex justify-center";
	const clicked = "w-full bg-[#242424] px-5 py-2 rounded-md flex justify-center";

    return (
        <button onClick={() => action(!actionValue)} className={actionValue ? clicked : not_clicked}>
            <img src={actionValue ? image_clicked : image_not_clicked} />
        </button>
    );
}

export default ButtonNav;