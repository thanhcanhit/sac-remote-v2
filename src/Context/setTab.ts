import { Dispatch, createContext } from "react";
import { PageName } from "../../App";

const setTabContext = createContext<
	[PageName, Dispatch<React.SetStateAction<PageName>>]
>(["home", () => {}]);

export default setTabContext;
