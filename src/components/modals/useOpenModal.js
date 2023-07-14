import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

const useOpenModal = () => {
	const { setComponentToOpen, setModalOpened } = useContext(ModalContext);

	const modalToOpen = (nameOfComponentToOpen, payload) => {
		setComponentToOpen({
			name: nameOfComponentToOpen,
			payload: payload,
		});
		setModalOpened(true);
	};

  return { modalToOpen };
};

export default useOpenModal;
