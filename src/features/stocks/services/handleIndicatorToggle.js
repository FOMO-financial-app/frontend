import { validatePeriod } from "./";

export const handleIndicatorToggle = (checked, setError, handleCheck, min, max, period, secondParameter) => {
    const hasSecond = Number.isFinite(Number(secondParameter));

    if (!checked) {
        setError(false);
        if (!hasSecond) {
            handleCheck(period, false);
            return;
        }
        handleCheck(period, secondParameter, false);
        return;
    }
    if (!validatePeriod(min, max, period)) {
        setError(true);
        return;
    }
    setError(false);
    if (!hasSecond) {
        handleCheck(period, true);
        return;
    }
    handleCheck(period, secondParameter, true);
};