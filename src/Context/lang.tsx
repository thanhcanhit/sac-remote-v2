import React, { Dispatch, createContext, useEffect, useState } from "react";
import localStorage, { LANG_KEY } from "../storage/storage";

type Language = "vi" | "en";

export type MultilangContent = {
	[key in Language]: string;
};

export const LangContext = createContext<{
	lang: Language;
	setLang: Dispatch<React.SetStateAction<Language>>;
	trans: (content: MultilangContent) => string;
}>({
	lang: "en",
	setLang: () => {
		console.log("Undefined language");
	},
	trans: (_content: MultilangContent) => "",
});

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
	const [lang, setLang] = useState<Language>("en");

	const getContentCurrentLanguage = (content: MultilangContent) => {
		return content[lang];
	};

	useEffect(() => {
		const getSavedLang = async () => {
			const localData = await localStorage.load({ key: LANG_KEY });
			if (localData === "en" || localData === "vi") {
				setLang(localData);
			}
		};

		getSavedLang();
	}, []);

	useEffect(() => {
		const saveLang = async () => {
			localStorage.save({ key: LANG_KEY, data: lang });
		};

		saveLang();
	}, [lang]);

	return (
		<LangContext.Provider
			value={{ lang, setLang, trans: getContentCurrentLanguage }}
		>
			{children}
		</LangContext.Provider>
	);
};

export default LanguageProvider;
