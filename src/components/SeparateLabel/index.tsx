import './SeparareLabel.styles.scss';

interface SeparateLabelBaseProps {
  htmlFor: string;
  label?: string;
}

const SeparateLabel = ({ htmlFor, label }: SeparateLabelBaseProps) => (
  <label className="separate-label" htmlFor={htmlFor}>
    {label}
  </label>
);

SeparateLabel.defaultProps = {
  label: 'Separate Label',
};

export default SeparateLabel;
