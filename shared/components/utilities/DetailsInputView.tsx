
type Props = {
    label: string;
    value: string;
}

const DetailsInputView = ({label, value}:Props) => {
    return (
        <div className="col-12 p-0 mb-2">
            <label className="h6">{label}</label>
            <div className="input-view">{value}</div>
        </div>
    );
};

export default DetailsInputView;