interface CustomButtonProps {
  label: string;
}

const CustomButton = ({ label }: CustomButtonProps) => {
  return (
    <button
      id="getStartedButton"
      className="bg-[#FAFAFB] w-1/2 font-medium py-3 text-2xl mb-6 rounded-md 
      hover:bg-[#EBEBEF] active:bg-[#FAFAFB]"
    >
      {label}
    </button>
  );
};

export default CustomButton;
