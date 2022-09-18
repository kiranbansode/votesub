import './SeparateLabel.styles.scss';

interface SeparateLabelBaseProps {
    htmlFor: string;
    label?: string;
    required?: boolean;
}

const SeparateLabel = ({ htmlFor, label, required }: SeparateLabelBaseProps) => (
    <label className="separate-label" htmlFor={htmlFor}>
        {label}
        {required ? <span className="required-star">*</span> : null}
    </label>
);

SeparateLabel.defaultProps = {
    label: 'Separate Label',
    required: false,
};

export default SeparateLabel;
