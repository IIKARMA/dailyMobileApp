import { useCallback, useState } from "react"

const useBoolean = (initialValue?: boolean) => {
    const [isBool, setIsBool] = useState<boolean>(initialValue || false)

    const onToggle = useCallback(
        () => setIsBool(prevBool => !prevBool), [],)

    const setFalse = useCallback(() => setIsBool(false), [])

    const setTrue = useCallback(() => setIsBool(true), [])

    return { isBool, onToggle, setTrue, setFalse }
}
export default useBoolean