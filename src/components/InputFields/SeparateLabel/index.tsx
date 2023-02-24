import './SeparateLabel.styles.scss';

interface SeparateLabelBaseProps {
    htmlFor: string;
    label: string;
    required?: boolean;
    error?: boolean;
}

const SeparateLabel = ({
    error = false,
    required = false,
    htmlFor,
    label,
}: SeparateLabelBaseProps) => (
    <label className={`${error && 'show-error'} separate-label`} htmlFor={htmlFor}>
        {label}
        {required ? <span className="required-star">*</span> : null}
    </label>
);

export default SeparateLabel;
