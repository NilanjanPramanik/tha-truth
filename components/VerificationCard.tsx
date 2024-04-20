import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"


interface VerificationCardProps {
    value: string,
    setValue: (value: string) => void
}

const VerificationCard: React.FC<VerificationCardProps> = ({value, setValue}) => {

    return (
        <InputOTP
            value={value}
            onChange={(value: string) => setValue(value)}
            maxLength={6}
        >
            <InputOTPGroup 
                className="w-full flex items-center justify-center"
            >
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>
    )
}

export default VerificationCard