import Camera from "../../../../assets/chat/not-clicked/photo-camera.png";

function Photo() {
    return (
        <div className="flex justify-center items-center">
            <button className="rounded-[50%] w-[100px] h-[100px] border-dashed border-3px border-[#808B96] bg-white flex justify-center items-center flex-col">
                <img src={Camera} />
                <p className="text-[#808B96]">UPLOAD</p>
            </button>
        </div>
    );
}

export default Photo;