import Header from "./Header";

type CreateDirectType = {
    togglemodal: any;
}
function CreateDirect({togglemodal} : CreateDirectType) {
    return (
		<div
			className="flex flex-col bg-zinc-700 border-4 w-[440px] h-[550px] relative rounded"
		>
            <Header />
        </div>
    );
}

export default CreateDirect;