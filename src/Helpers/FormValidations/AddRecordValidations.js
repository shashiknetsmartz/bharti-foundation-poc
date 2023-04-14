import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export const validateAddCompanyInputs = (data) => {
    let errors = {};
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    if (!Validator.isEmail(data.email) && !Validator.isEmpty(data.email)) {
        errors.email = "Enter valid email";
    }
    if (Validator.isEmpty(data.rewardPoint)) {
        errors.rewardPoint = "Reward Point is required";
    }
    if (Validator.isEmpty(data.schoolName)) {
        errors.schoolName = "School Name is required";
    }
    if (Validator.isEmpty(data.location)) {
        errors.location = "Location is required";
    }
    if (Validator.isEmpty(data.location)) {
        errors.location = "Location is required";
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
