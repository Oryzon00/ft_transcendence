import CreateChannel from "./CreateChannel/CreateChannel";

type OverlayPopupType = {
    modal: boolean;
    togglemodal: any;
    creation: boolean;
    togglecreation: any;
};

function OverlayPopup({modal, togglemodal, creation, togglecreation} : OverlayPopupType) {
    const overlay : string = "w-screen h-screen fixed top-0 left-0 bg-opacity-30 bg-[#313131cc] flex justify-center items-center";

    if (creation)
    return (
        <div className="flex justify-center items-center">
            <div className={overlay} onClick={togglecreation}></div>
            <CreateChannel togglemodal={togglecreation}/>
        </div>
    );
};

export default OverlayPopup;