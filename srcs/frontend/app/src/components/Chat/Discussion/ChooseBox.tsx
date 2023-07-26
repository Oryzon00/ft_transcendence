import MessageBox from "./MessageBox";
import ModerationBox from "./ModerationBox";
import SettingsBox from "./SettingsBox";

function ChooseBox({value, setValue, channel, current, me}) {
    if (value == 0) return (<MessageBox channel={channel} current={current} me={me}/>);
    else if (value == 1) return (<ModerationBox current={current} setValue={setValue}/>);
    else if (value == 2) return (<SettingsBox current={current} setValue={setValue}/>);
    return (null)
}

export default ChooseBox;