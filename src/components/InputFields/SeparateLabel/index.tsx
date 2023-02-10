import './SeparateLabel.styles.scss';

interface SeparateLabelBaseProps {
    htmlFor: string;
    label?: string;
    required?: boolean;
    error?: boolean;
}

const SeparateLabel = ({ htmlFor, label, error, required }: SeparateLabelBaseProps) => (
    <label className={`${error && 'show-error'} separate-label`} htmlFor={htmlFor}>
        {label}
        {required ? <span className="required-star">*</span> : null}
    </label>
);

SeparateLabel.defaultProps = {
    label: 'Separate Label',
    required: false,
    error: false,
};

export default SeparateLabel;
