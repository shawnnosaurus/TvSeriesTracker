import { create } from 'zustand';
import Cookies from 'js-cookie';

import { tryParseStringObject } from '../utils/tryParseStringObject';

const useStore = create((set) => ({
    userAccount: tryParseStringObject(Cookies.get('userAccount')),
}));

export default useStore;
