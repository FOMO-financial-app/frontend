export const userEditDTO = ((name, smaAlert, bollingerAlert, stochasticAlert, rsiAlert) => {
    if (!name && !smaAlert && !bollingerAlert && !stochasticAlert && !rsiAlert) return {};
    
    const userUpdateDTO = {
        "name": name,
        "smaAlert": smaAlert,
        "bollingerAlert": bollingerAlert,
        "stochasticAlert": stochasticAlert,
        "rsiAlert": rsiAlert
    };

    return userUpdateDTO;
})
