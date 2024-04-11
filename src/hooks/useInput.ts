import { useState } from "react"
type InputProps = {
    value: string,
    isChange?: boolean,
    isDirty?: boolean,
    onChangeText: (value: string) => void
    onBlur?: () => void
}

const useInput = (initialValue: string): InputProps => {
    const [value, setValue] = useState<string>('')
    const [isChange, setIsChange] = useState<boolean>(false)
    const [isDirty, setIsDirty] = useState<boolean>(false)

    const onChangeText = (value: string): void => {
        setValue(value)
        if (value !== '') {
            setIsChange(true)
        }
    }

    const onBlur = () => {
        setIsDirty(true)
    }

    return { value, isChange, isDirty, onChangeText, onBlur }

}
export default useInput