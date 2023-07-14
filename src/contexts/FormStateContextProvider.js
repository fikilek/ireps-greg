import { createContext, useState } from "react";

export const FormStateContext = createContext();

const FormStateContextProvider = props => {
	// create a state to manage trn form state
		const [formState, setFormState] = useState({});
	// console.log(`formState`, formState);

	return (
		<FormStateContext.Provider value={{ formState, setFormState }}>
			{props.children}
		</FormStateContext.Provider>
	);
};

export default FormStateContextProvider;
