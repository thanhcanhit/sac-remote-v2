import React, { Dispatch, createContext, useState } from "react";

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
		console.log("Undefined");
	},
	trans: (_content: MultilangContent) => "",
});

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
	const [lang, setLang] = useState<Language>("vi");

	const getContentCurrentLanguage = (content: MultilangContent) => {
		return content[lang];
	};

	return (
		<LangContext.Provider
			value={{ lang, setLang, trans: getContentCurrentLanguage }}
		>
			{children}
		</LangContext.Provider>
	);
};

export default LanguageProvider;
