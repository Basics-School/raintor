import { Button } from "@workspace/ui/components/button";
import { CallIcon } from "@workspace/ui/components/icons/call-icon";

interface ScheduleCallButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const ScheduleCallButton = ({ 
  onClick, 
  className = "", 
  children = "Schedule a Call" 
}: ScheduleCallButtonProps) => {
  return (
    <Button
      size="lg"
      className={`w-min cursor-pointer py-10 px-0 ${className}`}
      onClick={onClick}
    >
      <CallIcon />
      <span className="pr-4">{children}</span>
    </Button>
  );
};

export default ScheduleCallButton;
