import Select from 'react-select'

function SelectStatus({options, status, setStatus}) {
    return (
                <div >
                    <h2>
                        Status
                    </h2>
                    <Select
                        options={options}
                        defaultValue={status}
                        onChange={setStatus}
                    />
                </div>
    );
}

export default SelectStatus;