type TitleType = {
	name: string;
};
function Title({ name }: TitleType) {
	return <h2 className="text-black text-xl">{name}</h2>;
}

export default Title;
