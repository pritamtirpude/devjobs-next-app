import ClipLoader from 'react-spinners/ClipLoader';

type SpinnerProps = {
  isPending: boolean;
};

const Spinner = ({ isPending }: SpinnerProps) => {
  return (
    <ClipLoader
      color="#fffff"
      loading={isPending}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;
