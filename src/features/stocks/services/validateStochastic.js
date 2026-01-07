import { validatePeriod } from "./validatePeriod"

export const validateStochastic = (minK, kPeriod, minD, dPeriod) => {
    if (!validatePeriod(minK, kPeriod) || !validatePeriod(minD, dPeriod)) {
        return false;
    }
    if (dPeriod > kPeriod) {
        return false;
    }
    return true;
}