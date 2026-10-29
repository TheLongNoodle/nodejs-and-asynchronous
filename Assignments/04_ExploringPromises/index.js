const delayedResolution = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Resolved after [${ms}] milliseconds`);
        }, ms);
    });
};

const delayedRejection = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(`Rejected after [${ms}] milliseconds`);
        }, ms);
    });
};

const handlePromises1 = (promise1) => {
    return promise1.then((result) => result).catch((error) => `ERROR: ${error}`);
};

const handlePromises2 = async (promise2) => {
    try {
        return await promise2;
    } catch (error) {
        return `ERROR: ${error}`;
    }
};

const racePromises = (ms1, ms2) => {
    return Promise.race([delayedResolution(ms1), delayedRejection(ms2)])
        .then((result) => result)
        .catch((error) => error);
};
const handleMultiplePromises = (promisesArr) => {
    return Promise.allSettled(promisesArr).then((results) => {
        let resolved = 0;
        let rejected = 0;
        results.forEach((result) => {
            console.log(result);
            if (result.status === "fulfilled") resolved++;
            else if (result.status === "rejected") rejected++;
        });
        return { resolved, rejected };
    });
};
const handleMultipleResolutions = (promisesArr) => {
    return Promise.all(promisesArr)
        .then(() => "All promises resolved")
        .catch(() => "At least one promise rejected");
};

export {
    delayedRejection,
    delayedResolution,
    handleMultiplePromises,
    handleMultipleResolutions,
    handlePromises1,
    handlePromises2,
    racePromises,
};
