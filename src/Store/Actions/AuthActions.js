import { notification } from "antd"

const apiSuccessNew = (response) => notification['success']({ description: response?.message || 'Success!' });
const apiErrorNew = (err) => notification['error']({ description: err?.message || 'Something is wrong!' });

export const login = (payload, callback) => (dispatch) => {

};
