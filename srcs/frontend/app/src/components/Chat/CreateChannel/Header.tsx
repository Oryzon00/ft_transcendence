type HeaderType = {
    title: string;
    description: string;
};

function Header({title, description}: HeaderType) {
    return (
			<div id="header" className="mt-8">
				<div id="header-text" className="flex flex-col items-center">
					<h2 className="text-black text-3xl font-bold">
                        {title}
					</h2>
					<p className="text-slate-400 text-sl">
                        {description}
					</p>
				</div>
			</div>
    );

}

export default Header;